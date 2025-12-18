import pkg from 'pg';
const { Pool } = pkg;

// Database connection
const pool = new Pool({
  connectionString: process.env.DATABASE_URL || process.env.POSTGRES_URL,
  ssl: { rejectUnauthorized: false }
});

export default async function handler(req, res) {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  const { url, method } = req;
  
  try {
    // Health check
    if (url === '/api/health' && method === 'GET') {
      try {
        await pool.query('SELECT NOW()');
        return res.json({ status: 'ok', database: 'connected' });
      } catch (error) {
        return res.json({ status: 'ok', database: 'disconnected', error: error.message });
      }
    }
    
    // Analytics endpoint
    if (url === '/api/v1/analytics' && method === 'GET') {
      try {
        const totalDialoguesResult = await pool.query('SELECT COUNT(*) as count FROM conversations');
        const totalDialogues = parseInt(totalDialoguesResult.rows[0].count);
        
        const totalParticipantsResult = await pool.query('SELECT SUM(num_people) as total FROM conversations');
        const totalParticipants = parseInt(totalParticipantsResult.rows[0].total) || 0;
        
        const avgDurationResult = await pool.query('SELECT AVG(duration) as avg FROM conversations WHERE duration > 0');
        const avgDuration = Math.round(parseFloat(avgDurationResult.rows[0].avg)) || 0;
        
        // Get districts data
        const districtsResult = await pool.query(`
          SELECT jsonb_array_elements_text(districts) as district, COUNT(*) as count
          FROM conversations WHERE districts != '[]'
          GROUP BY district ORDER BY count DESC LIMIT 10
        `);
        const dialoguesByDistrict = districtsResult.rows.map(r => ({ name: r.district, value: parseInt(r.count) }));
        
        // Get topic details data
        const topicsResult = await pool.query(`
          SELECT jsonb_object_keys(topic_details) as topic, COUNT(*) as count
          FROM conversations WHERE topic_details != '{}'
          GROUP BY topic ORDER BY count DESC LIMIT 10
        `);
        const topTopics = topicsResult.rows.map(r => ({ name: r.topic, value: parseInt(r.count) }));
        
        // Get interest areas data
        const interestResult = await pool.query(`
          SELECT jsonb_array_elements_text(interest_areas) as area, COUNT(*) as count
          FROM conversations WHERE interest_areas != '[]'
          GROUP BY area ORDER BY count DESC LIMIT 10
        `);
        const topInterestAreas = interestResult.rows.map(r => ({ name: r.area, value: parseInt(r.count) }));
        
        // Get initiative engagement
        const initiativesResult = await pool.query(`
          SELECT 
            SUM(jsonb_array_length(selected_initiatives)) as selected
          FROM conversations WHERE selected_initiatives != '[]'
        `);
        const selectedCount = parseInt(initiativesResult.rows[0]?.selected) || 0;
        
        return res.json({
          totalDialogues,
          totalParticipants,
          avgDuration,
          dialoguesByDistrict,
          topTopics,
          topInterestAreas,
          initiativeEngagement: { recommended: totalDialogues, selected: selectedCount }
        });
      } catch (error) {
        console.error('Analytics error:', error);
        return res.json({
          totalDialogues: 0,
          totalParticipants: 0,
          avgDuration: 0,
          dialoguesByDistrict: [],
          topTopics: [],
          topInterestAreas: [],
          initiativeEngagement: { recommended: 0, selected: 0 },
          _debug: { error: error.message }
        });
      }
    }
    
    // Get all conversations endpoint
    if (url === '/api/v1/conversations' && method === 'GET') {
      try {
        const result = await pool.query(`
          SELECT id, uuid, main_interest, livable_city, notes, topic_details, 
                 districts, selected_initiatives, interest_areas, observer_reflection,
                 surprise, num_people, duration, location, is_anonymous, share_contact,
                 created_at
          FROM conversations ORDER BY created_at DESC
        `);
        return res.json(result.rows);
      } catch (error) {
        return res.status(500).json({ error: 'Failed to fetch conversations', details: error.message });
      }
    }
    
    // Conversations endpoint
    if (url === '/api/v1/conversations' && method === 'POST') {
      try {
        const data = req.body;
        const uuid = data.uuid || 'conv-' + Date.now();
        
        const query = `
          INSERT INTO conversations (
            uuid, main_interest, livable_city, notes, topic_details, districts,
            selected_initiatives, interest_areas, interest_districts, share_contact,
            is_anonymous, observer_reflection, surprise, num_people, duration, location
          ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16)
          RETURNING id, uuid
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
          JSON.stringify(data.interestDistricts || []),
          data.shareContact || false,
          data.isAnonymous !== false,
          data.observerReflection || '',
          data.surprise || '',
          data.numPeople || 1,
          data.duration || 0,
          data.location || ''
        ];
        
        const result = await pool.query(query, values);
        return res.json({ success: true, id: result.rows[0].id, uuid: result.rows[0].uuid });
      } catch (error) {
        console.error('Conversation save error:', error);
        return res.status(500).json({ error: 'Failed to save conversation', details: error.message });
      }
    }
    
    // 404 for unknown routes
    return res.status(404).json({ error: 'Route not found', path: url });
    
  } catch (error) {
    console.error('Handler error:', error);
    return res.status(500).json({ error: 'Internal server error', details: error.message });
  }
}