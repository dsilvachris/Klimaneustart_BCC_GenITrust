import pool from '../db/connection.js';

class PIIContact {
    static async create(data) {
        const {
            conversationUuidHash,
            firstNameEnc = '',
            lastNameEnc = '',
            emailEnc = '',
            phoneEnc = '',
            consentGiven = false,
            consentScope = [],
            consentTimestamp,
            retentionUntil
        } = data;

        const query = `
            INSERT INTO pii_contacts (
                conversation_uuid_hash, first_name_enc, last_name_enc, email_enc, phone_enc,
                consent_given, consent_scope, consent_timestamp, retention_until
            ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
            RETURNING *
        `;

        const values = [
            conversationUuidHash, firstNameEnc, lastNameEnc, emailEnc, phoneEnc,
            consentGiven, JSON.stringify(consentScope), consentTimestamp, retentionUntil
        ];

        const result = await pool.query(query, values);
        return { _id: result.rows[0].id, ...result.rows[0] };
    }

    static async findByIdAndDelete(id) {
        const query = 'DELETE FROM pii_contacts WHERE id = $1 RETURNING *';
        const result = await pool.query(query, [id]);
        return result.rows[0] || null;
    }
}

export default PIIContact;


