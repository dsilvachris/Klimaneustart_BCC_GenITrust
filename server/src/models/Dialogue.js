import pool from '../db/connection.js';

export class Dialogue {
  static async create(dialogueData) {
    const {
      user_id,
      notes,
      audio_note_url,
      observer_reflection,
      surprise,
      num_people,
      duration,
      location,
      is_anonymous,
      consent_share_contact
    } = dialogueData;

    const query = `
      INSERT INTO dialogues (
        user_id, notes, audio_note_url, observer_reflection, surprise,
        num_people, duration, location, is_anonymous, consent_share_contact
      ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)
      RETURNING *
    `;

    const values = [
      user_id, notes, audio_note_url, observer_reflection, surprise,
      num_people, duration, location, is_anonymous, consent_share_contact
    ];

    const result = await pool.query(query, values);
    return result.rows[0];
  }

  static async findById(id) {
    const query = 'SELECT * FROM dialogues WHERE id = $1';
    const result = await pool.query(query, [id]);
    return result.rows[0];
  }

  static async findAll() {
    const query = 'SELECT * FROM dialogues ORDER BY created_at DESC';
    const result = await pool.query(query);
    return result.rows;
  }

  static async addTopicSelection(dialogueId, topicData) {
    const { main_topic_id, sub_group_id, selected_option_id, custom_note } = topicData;
    
    const query = `
      INSERT INTO dialogue_topic_selections (
        dialogue_id, main_topic_id, sub_group_id, selected_option_id, custom_note
      ) VALUES ($1, $2, $3, $4, $5)
      RETURNING *
    `;

    const result = await pool.query(query, [
      dialogueId, main_topic_id, sub_group_id, selected_option_id, custom_note
    ]);
    return result.rows[0];
  }

  static async addDistrict(dialogueId, districtName) {
    const query = `
      INSERT INTO dialogue_districts (dialogue_id, district_name)
      VALUES ($1, $2)
      ON CONFLICT DO NOTHING
    `;
    await pool.query(query, [dialogueId, districtName]);
  }

  static async addInterestArea(dialogueId, interestAreaId) {
    const query = `
      INSERT INTO dialogue_interest_areas (dialogue_id, interest_area_id)
      VALUES ($1, $2)
      ON CONFLICT DO NOTHING
    `;
    await pool.query(query, [dialogueId, interestAreaId]);
  }
}

export default Dialogue;