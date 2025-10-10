import express from 'express';
import pool from '../db/connection.js';

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    // Total dialogues
    const totalDialoguesResult = await pool.query('SELECT COUNT(*) as count FROM conversations');
    const totalDialogues = parseInt(totalDialoguesResult.rows[0].count);

    // Total participants
    const totalParticipantsResult = await pool.query('SELECT SUM(num_people) as total FROM conversations');
    const totalParticipants = parseInt(totalParticipantsResult.rows[0].total) || 0;

    // Average duration
    const avgDurationResult = await pool.query('SELECT AVG(duration) as avg FROM conversations WHERE duration > 0');
    const avgDuration = Math.round(parseFloat(avgDurationResult.rows[0].avg)) || 0;

    // Dialogues by district - extract from JSONB array
    const dialoguesByDistrictResult = await pool.query(`
      SELECT district, COUNT(*) as value 
      FROM (
        SELECT jsonb_array_elements_text(districts) as district 
        FROM conversations 
        WHERE jsonb_array_length(districts) > 0
      ) districts_expanded
      GROUP BY district 
      ORDER BY value DESC
    `);

    // Top topics - extract from topic_details JSONB
    const topTopicsResult = await pool.query(`
      SELECT topic, COUNT(*) as value 
      FROM (
        SELECT jsonb_object_keys(topic_details) as topic 
        FROM conversations 
        WHERE topic_details != '{}'
      ) topics_expanded
      GROUP BY topic 
      ORDER BY value DESC 
      LIMIT 5
    `);

    // Top interest areas - extract from JSONB array
    const topInterestAreasResult = await pool.query(`
      SELECT area as name, COUNT(*) as value 
      FROM (
        SELECT jsonb_array_elements_text(interest_areas) as area 
        FROM conversations 
        WHERE jsonb_array_length(interest_areas) > 0
      ) areas_expanded
      GROUP BY area 
      ORDER BY value DESC 
      LIMIT 5
    `);

    // Initiative engagement - count selected initiatives
    const initiativeEngagementResult = await pool.query(`
      SELECT COUNT(DISTINCT uuid) as conversations_with_initiatives,
             COUNT(*) as total_initiatives_selected
      FROM (
        SELECT uuid, jsonb_array_elements_text(selected_initiatives) as initiative 
        FROM conversations 
        WHERE jsonb_array_length(selected_initiatives) > 0
      ) initiatives_expanded
    `);

    const initiativeEngagement = {
      recommended: totalDialogues, // All conversations get recommendations
      selected: parseInt(initiativeEngagementResult.rows[0]?.total_initiatives_selected) || 0
    };

    const analyticsData = {
      totalDialogues,
      totalParticipants,
      avgDuration,
      dialoguesByDistrict: dialoguesByDistrictResult.rows.map(row => ({ name: row.district, value: parseInt(row.value) })),
      topTopics: topTopicsResult.rows.map(row => ({ name: row.topic, value: parseInt(row.value) })),
      topInterestAreas: topInterestAreasResult.rows.map(row => ({ name: row.name, value: parseInt(row.value) })),
      initiativeEngagement
    };

    res.json(analyticsData);
  } catch (error) {
    console.error('Analytics error:', error);
    res.status(500).json({ error: 'Failed to fetch analytics data' });
  }
});

export default router;