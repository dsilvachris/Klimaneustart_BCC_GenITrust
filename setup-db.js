import pkg from 'pg';
const { Pool } = pkg;

// Database setup script for Vercel
const setupDatabase = async () => {
  const pool = new Pool({
    connectionString: process.env.POSTGRES_URL,
    ssl: { rejectUnauthorized: false }
  });

  try {
    console.log('Setting up database tables...');
    
    // Create conversations table
    await pool.query(`
      CREATE TABLE IF NOT EXISTS conversations (
        id SERIAL PRIMARY KEY,
        uuid VARCHAR(255) UNIQUE NOT NULL,
        status VARCHAR(50) DEFAULT 'in_progress',
        notes TEXT DEFAULT '',
        main_interest TEXT DEFAULT '',
        livable_city TEXT DEFAULT '',
        topic_details JSONB DEFAULT '{}',
        districts JSONB DEFAULT '[]',
        selected_initiatives JSONB DEFAULT '[]',
        interest_areas JSONB DEFAULT '[]',
        interest_districts JSONB DEFAULT '[]',
        is_anonymous BOOLEAN DEFAULT true,
        share_contact BOOLEAN DEFAULT false,
        observer_reflection TEXT DEFAULT '',
        surprise TEXT DEFAULT '',
        num_people INTEGER DEFAULT 0,
        duration INTEGER DEFAULT 0,
        location TEXT DEFAULT '',
        pii_ref INTEGER,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);

    // Create PII contacts table
    await pool.query(`
      CREATE TABLE IF NOT EXISTS pii_contacts (
        id SERIAL PRIMARY KEY,
        conversation_uuid_hash VARCHAR(255),
        first_name_enc TEXT DEFAULT '',
        last_name_enc TEXT DEFAULT '',
        email_enc TEXT DEFAULT '',
        phone_enc TEXT DEFAULT '',
        consent_given BOOLEAN DEFAULT false,
        consent_scope JSONB DEFAULT '[]',
        consent_timestamp TIMESTAMP,
        retention_until TIMESTAMP,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);

    // Create indexes
    await pool.query(`CREATE INDEX IF NOT EXISTS idx_conversations_uuid ON conversations(uuid);`);
    await pool.query(`CREATE INDEX IF NOT EXISTS idx_conversations_created_at ON conversations(created_at);`);
    await pool.query(`CREATE INDEX IF NOT EXISTS idx_pii_contacts_uuid_hash ON pii_contacts(conversation_uuid_hash);`);

    console.log('✅ Database setup completed successfully!');
    
  } catch (error) {
    console.error('❌ Database setup failed:', error);
  } finally {
    await pool.end();
  }
};

setupDatabase();