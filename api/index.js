import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import pkg from 'pg';

const { Pool } = pkg;

// Database connection
const pool = new Pool({
  connectionString: process.env.DATABASE_URL || process.env.POSTGRES_URL,
  ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false
});

const app = express();

app.use(helmet());
app.use(cors());
app.use(express.json({ limit: '1mb' }));

// Health check
app.get('/api/health', async (req, res) => {
  try {
    await pool.query('SELECT NOW()');
    res.json({ status: 'ok', database: 'connected' });
  } catch (error) {
    res.json({ status: 'ok', database: 'disconnected', error: error.message });
  }
});

// Analytics endpoint
app.get('/api/v1/analytics', async (req, res) => {
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

    // Dialogues by district
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

    // Top topics
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

    // Top interest areas
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

    // Initiative engagement
    const initiativeEngagementResult = await pool.query(`
      SELECT COUNT(DISTINCT uuid) as conversations_with_initiatives,
             COUNT(*) as total_initiatives_selected
      FROM (
        SELECT uuid, jsonb_array_elements_text(selected_initiatives) as initiative 
        FROM conversations 
        WHERE jsonb_array_length(selected_initiatives) > 0
      ) initiatives_expanded
    `);

    const analyticsData = {
      totalDialogues,
      totalParticipants,
      avgDuration,
      dialoguesByDistrict: dialoguesByDistrictResult.rows.map(row => ({ name: row.district, value: parseInt(row.value) })),
      topTopics: topTopicsResult.rows.map(row => ({ name: row.topic, value: parseInt(row.value) })),
      topInterestAreas: topInterestAreasResult.rows.map(row => ({ name: row.name, value: parseInt(row.value) })),
      initiativeEngagement: {
        recommended: totalDialogues,
        selected: parseInt(initiativeEngagementResult.rows[0]?.total_initiatives_selected) || 0
      }
    };

    res.json(analyticsData);
  } catch (error) {
    console.error('Analytics error:', error);
    res.status(500).json({ error: 'Failed to fetch analytics data' });
  }
});

// Conversations endpoint
app.post('/api/v1/conversations', async (req, res) => {
  try {
    const data = req.body;
    const uuid = data.uuid || 'conv-' + Date.now();
    
    const query = `
      INSERT INTO conversations (
        uuid, main_interest, livable_city, notes, topic_details, districts,
        selected_initiatives, interest_areas, share_contact, contact_info,
        is_anonymous, observer_reflection, surprise, num_people, duration
      ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15)
      RETURNING id
    `;
    
    const values = [
      uuid,
      data.mainInterest || '',
      data.livableCity || '',
      data.notes || '',
      JSON.stringify(data.topicDetails || {}),
      JSON.stringify(data.districts || []),
      JSON.stringify(data.selectedInitiatives || []),
      JSON.stringify(data.interestAreas || []),
      data.shareContact || false,
      data.contactInfo || '',
      data.isAnonymous || false,
      data.observerReflection || '',
      data.surprise || '',
      data.numPeople || 1,
      data.duration || 0
    ];
    
    const result = await pool.query(query, values);
    res.json({ success: true, id: result.rows[0].id, dialogue_id: uuid });
  } catch (error) {
    console.error('Conversation save error:', error);
    res.status(500).json({ error: 'Failed to save conversation' });
  }
});

app.get('/api/v1/conversations/:id', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM conversations WHERE uuid = $1', [req.params.id]);
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Conversation not found' });
    }
    res.json(result.rows[0]);
  } catch (error) {
    console.error('Conversation fetch error:', error);
    res.status(500).json({ error: 'Failed to fetch conversation' });
  }
});

export default app;