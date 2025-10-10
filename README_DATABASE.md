# PostgreSQL Database Setup

## Prerequisites

1. Install PostgreSQL on your system
2. Create a database named `klimaneustart_db`

## Setup Instructions

### 1. Install PostgreSQL (macOS)
```bash
brew install postgresql
brew services start postgresql
```

### 2. Create Database
```bash
createdb klimaneustart_db
```

### 3. Initialize Schema
```bash
cd database
node setup.js
```

### 4. Install Server Dependencies
```bash
cd server
npm install
```

### 5. Start the Server
```bash
cd server
npm run dev
```

## Environment Variables

Update your `.env.local` and `server/.env` files with your PostgreSQL credentials:

```
DB_HOST=localhost
DB_PORT=5432
DB_NAME=klimaneustart_db
DB_USER=postgres
DB_PASSWORD=your_password
```

## Database Schema

The database follows the schema defined in `db and tables.md` with proper GDPR compliance:

- **users**: User information
- **dialogues**: Main conversation data (non-PII)
- **participant_contact**: PII vault (isolated)
- **themes**: Interest areas lookup
- **initiatives**: Partner initiatives
- Various linking tables for many-to-many relationships

## GDPR Compliance

- PII is isolated in the `participant_contact` table
- Only accessible when `is_anonymous = false` AND `consent_share_contact = true`
- All other data is anonymized by design