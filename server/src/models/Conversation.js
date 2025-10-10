import pool from '../db/connection.js';

class Conversation {
    static async create(data) {
        const {
            uuid,
            status = 'in_progress',
            notes = '',
            mainInterest = '',
            livableCity = '',
            topicDetails = {},
            districts = [],
            selectedInitiatives = [],
            interestAreas = [],
            interestDistricts = [],
            isAnonymous = true,
            shareContact = false,
            observerReflection = '',
            surprise = '',
            numPeople = 0,
            duration = 0,
            location = ''
        } = data;

        const query = `
            INSERT INTO conversations (
                uuid, status, notes, main_interest, livable_city, topic_details,
                districts, selected_initiatives, interest_areas, interest_districts,
                is_anonymous, share_contact, observer_reflection, surprise,
                num_people, duration, location
            ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17)
            RETURNING *
        `;

        const values = [
            uuid, status, notes, mainInterest, livableCity, JSON.stringify(topicDetails),
            JSON.stringify(districts), JSON.stringify(selectedInitiatives),
            JSON.stringify(interestAreas), JSON.stringify(interestDistricts),
            isAnonymous, shareContact, observerReflection, surprise,
            numPeople, duration, location
        ];

        const result = await pool.query(query, values);
        return result.rows[0];
    }

    static async findOne(criteria) {
        let query, values;
        
        if (criteria.uuid) {
            query = 'SELECT * FROM conversations WHERE uuid = $1';
            values = [criteria.uuid];
        } else if (criteria._id) {
            query = 'SELECT * FROM conversations WHERE id = $1';
            values = [criteria._id];
        } else {
            return null;
        }

        const result = await pool.query(query, values);
        return result.rows[0] || null;
    }

    static async findById(id) {
        const query = 'SELECT * FROM conversations WHERE id = $1';
        const result = await pool.query(query, [id]);
        return result.rows[0] || null;
    }

    static async findByIdAndDelete(id) {
        const query = 'DELETE FROM conversations WHERE id = $1 RETURNING *';
        const result = await pool.query(query, [id]);
        return result.rows[0] || null;
    }
}

export default Conversation;


