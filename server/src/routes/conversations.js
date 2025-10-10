import { Router } from 'express';
import Joi from 'joi';
import pool from '../db/connection.js';
import Conversation from '../models/Conversation.js';
import PIIContact from '../models/PIIContact.js';
import { encrypt, hash } from '../utils/crypto.js';

const router = Router();

// Validation schema derived from frontend types
const conversationSchema = Joi.object({
    uuid: Joi.string().required(),
    status: Joi.string().valid('in_progress', 'completed').default('in_progress'),
    mainInterest: Joi.string().allow(''),
    livableCity: Joi.string().allow(''),
    notes: Joi.string().allow(''),
    topicDetails: Joi.object().unknown(true).default({}),
    districts: Joi.array().items(Joi.string()).default([]),
    selectedInitiatives: Joi.array().items(Joi.string()).default([]),
    interestAreas: Joi.array().items(Joi.string()).default([]),
    interestDistricts: Joi.array().items(Joi.string()).default([]),
    shareContact: Joi.boolean().default(false),
    contactInfo: Joi.string().email().allow(''), // legacy single email field
    isAnonymous: Joi.boolean().default(true),
    observerReflection: Joi.string().allow(''),
    surprise: Joi.string().allow(''),
    numPeople: Joi.number().integer().min(0).default(0),
    duration: Joi.number().integer().min(0).default(0),
    location: Joi.string().allow(''),

    // optional richer PII fields if sent by frontend
    firstName: Joi.string().allow(''),
    lastName: Joi.string().allow(''),
    phone: Joi.string().allow(''),
    participantType: Joi.string().allow(''),
    sendCopy: Joi.boolean().optional()
});

// Create conversation
router.post('/', async (req, res, next) => {
    try {
        const { value, error } = conversationSchema.validate(req.body, { stripUnknown: true });
        if (error) {
            return res.status(400).json({ error: error.message });
        }

        const {
            uuid,
            status,
            shareContact,
            isAnonymous,
            firstName,
            lastName,
            phone,
            contactInfo,
            sendCopy,
            ...content
        } = value;

        // Save conversation (non-PII content)
        let conversation = await Conversation.findOne({ uuid });
        if (!conversation) {
            conversation = await Conversation.create({
                uuid,
                shareContact,
                isAnonymous,
                status,
                ...content
            });
        } else {
            // Update existing conversation
            const updateQuery = `
                UPDATE conversations SET 
                    share_contact = $1, is_anonymous = $2, status = $3,
                    notes = $4, main_interest = $5, livable_city = $6,
                    topic_details = $7, districts = $8, selected_initiatives = $9,
                    interest_areas = $10, interest_districts = $11,
                    observer_reflection = $12, surprise = $13, num_people = $14,
                    duration = $15, location = $16, updated_at = CURRENT_TIMESTAMP
                WHERE uuid = $17 RETURNING *
            `;
            const updateValues = [
                shareContact, isAnonymous, status, content.notes || '',
                content.mainInterest || '', content.livableCity || '',
                JSON.stringify(content.topicDetails || {}),
                JSON.stringify(content.districts || []),
                JSON.stringify(content.selectedInitiatives || []),
                JSON.stringify(content.interestAreas || []),
                JSON.stringify(content.interestDistricts || []),
                content.observerReflection || '', content.surprise || '',
                content.numPeople || 0, content.duration || 0,
                content.location || '', uuid
            ];
            const result = await pool.query(updateQuery, updateValues);
            conversation = result.rows[0];
        }

        // If contact is shared, store PII separately
        if (shareContact && !isAnonymous && (firstName || lastName || contactInfo || phone)) {
            const pii = await PIIContact.create({
                conversationUuidHash: uuid,
                firstNameEnc: firstName || '',
                lastNameEnc: lastName || '',
                emailEnc: contactInfo || '',
                phoneEnc: phone || '',
                consentGiven: true,
                consentScope: ['contact'],
                consentTimestamp: new Date(),
                retentionUntil: new Date(Date.now() + (365 * 24 * 60 * 60 * 1000))
            });
            // Update conversation with PII reference
            const updatePiiRef = 'UPDATE conversations SET pii_ref = $1 WHERE id = $2';
            await pool.query(updatePiiRef, [pii._id, conversation.id]);
        }

        return res.status(201).json({ id: conversation._id, dialogue_id: conversation.uuid });
    } catch (e) {
        next(e);
    }
});

// Get conversation content (without PII)
router.get('/:id', async (req, res, next) => {
    try {
        // Support both ObjectId and UUID lookup
        const id = req.params.id;
        const query = /^[a-f\d]{24}$/i.test(id) ? { _id: id } : { uuid: id };
        const convo = await Conversation.findOne(query).lean();
        if (!convo) return res.status(404).json({ error: 'Not found' });
        // Exclude piiRef value when responding to public API
        const { piiRef, ...rest } = convo;
        res.json(rest);
    } catch (e) {
        next(e);
    }
});

// GDPR: Erase PII by conversation ID
router.delete('/:id/pii', async (req, res, next) => {
    try {
        const convo = await Conversation.findById(req.params.id);
        if (!convo) return res.status(404).json({ error: 'Not found' });
        if (convo.piiRef) {
            await PIIContact.findByIdAndDelete(convo.piiRef);
            convo.piiRef = null;
            await convo.save();
        }
        res.json({ ok: true });
    } catch (e) {
        next(e);
    }
});

// GDPR: Anonymize conversation content on request
router.delete('/:id', async (req, res, next) => {
    try {
        const convo = await Conversation.findById(req.params.id);
        if (!convo) return res.status(404).json({ error: 'Not found' });
        if (convo.piiRef) await PIIContact.findByIdAndDelete(convo.piiRef);
        await Conversation.findByIdAndDelete(req.params.id);
        res.json({ ok: true });
    } catch (e) {
        next(e);
    }
});

export default router;


