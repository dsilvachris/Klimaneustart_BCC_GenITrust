# Generation iTrust - Climate Dialogue Application

A comprehensive web application for conducting and analyzing climate-focused civic dialogues in Berlin. Built with React, TypeScript, and PostgreSQL.

## Features

- **Multi-step dialogue flow** with topic selection and reflection
- **Real-time analytics dashboard** with interactive pie charts
- **PostgreSQL database** for conversation storage
- **GDPR-compliant** PII handling with encryption
- **Responsive design** with Material-UI components
- **Initiative recommendations** based on user interests

## Tech Stack

- **Frontend:** React 18, TypeScript, Material-UI, Recharts
- **Backend:** Node.js, Express, PostgreSQL
- **Database:** PostgreSQL with JSONB support
- **Styling:** Material-UI with Montserrat font
- **Charts:** Recharts for analytics visualization

## Prerequisites

- Node.js (v16 or higher)
- PostgreSQL (v12 or higher)
- npm or yarn

## Installation & Setup

### 1. Clone and Install Dependencies
```bash
git clone <repository-url>
cd Klimaneustart_BCC
npm install
```

### 2. Database Setup
```bash
# Create PostgreSQL database
psql -d postgres -c "CREATE DATABASE klimaneustart_db;"

# Create tables
psql -d klimaneustart_db -f database/simple_schema.sql
```

### 3. Environment Configuration
Create `.env.local` in the root directory:
```bash
GEMINI_API_KEY=your_gemini_api_key_here
DB_HOST=localhost
DB_PORT=5432
DB_NAME=klimaneustart_db
DB_USER=your_postgres_user
DB_PASSWORD=your_postgres_password
```

Create `server/.env`:
```bash
DB_HOST=localhost
DB_PORT=5432
DB_NAME=klimaneustart_db
DB_USER=your_postgres_user
DB_PASSWORD=your_postgres_password
PORT=3001
CORS_ORIGIN=http://localhost:5173
```

### 4. Install Server Dependencies
```bash
cd server
npm install
```

## Running the Application

### Start Backend Server
```bash
cd server
npm start
```
Server runs on: http://localhost:3001

### Start Frontend
```bash
npm run dev
```
Frontend runs on: http://localhost:5173

## Login Credentials

- **Username:** GenerationITrust
- **Password:** Berlin@2030

## Application Flow

1. **Login** - Authenticate with admin credentials
2. **Welcome** - Introduction to the dialogue process
3. **Core Details** - Main interests and livable city vision
4. **District Selection** - Choose Berlin districts
5. **Topics Discussion** - Select discussed topics with subtopics:
   - Wohnen/Bauwende (Housing/Building Transition)
   - Wohnen/Wärmewende (Housing/Heat Transition)
   - Mobilität (Mobility)
   - Klimaanpassung (Climate Adaptation)
   - Sonstiges/Notizen (Other/Notes)
6. **Initiatives** - Recommend relevant local initiatives
7. **Consent** - Data sharing and contact preferences
8. **Reflection** - Observer insights and metrics
9. **Summary** - Review and submit dialogue
10. **Analytics Dashboard** - View aggregated data

## API Endpoints

- `GET /health` - Health check
- `POST /api/v1/conversations` - Create/update conversation
- `GET /api/v1/conversations/:id` - Get conversation by ID
- `GET /api/v1/analytics` - Get analytics data
- `DELETE /api/v1/conversations/:id/pii` - Delete PII data (GDPR)

## Database Schema

### Conversations Table
- Stores non-PII conversation data
- JSONB fields for flexible topic details
- UUID-based identification

### PII Contacts Table
- Encrypted storage of personal information
- Separate from main conversation data
- Automatic retention policy

## Analytics Features

- **Total Dialogues** and **Participants** count
- **Average Duration** of conversations
- **Pie Charts** for:
  - Top Discussed Topics
  - Dialogues per District
  - Top Interest Areas
- **Initiative Engagement** metrics

## Development

### Testing API
```bash
# Test conversation creation
curl -X POST http://localhost:3001/api/v1/conversations \
  -H "Content-Type: application/json" \
  -d '{"uuid":"test-123","districts":["Mitte"],"numPeople":1,"duration":30}'

# Get analytics
curl http://localhost:3001/api/v1/analytics
```

### Project Structure
```
├── components/          # React components
│   ├── steps/          # Dialogue step components
│   ├── pages/          # Page components
│   └── ui/             # UI components
├── analytics/          # Dashboard components
├── server/             # Backend API
│   ├── src/
│   │   ├── models/     # Database models
│   │   ├── routes/     # API routes
│   │   └── db/         # Database connection
├── database/           # Database schemas
├── services/           # Frontend services
└── public/icons/       # Static assets
```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is licensed under the MIT License.
