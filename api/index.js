import express from 'express';
import cors from 'cors';
import helmet from 'helmet';

// Mock database for serverless deployment
const mockAnalyticsData = {
  totalDialogues: 12,
  totalParticipants: 28,
  avgDuration: 45,
  dialoguesByDistrict: [
    { name: 'Mitte', value: 5 },
    { name: 'Kreuzberg', value: 3 },
    { name: 'Prenzlauer Berg', value: 2 },
    { name: 'Charlottenburg', value: 2 }
  ],
  topTopics: [
    { name: 'Wohnen/Bauwende', value: 8 },
    { name: 'Mobilität', value: 6 },
    { name: 'Klimaanpassung', value: 4 },
    { name: 'Wohnen/Wärmewende', value: 3 }
  ],
  topInterestAreas: [
    { name: 'Nachhaltiges Wohnen', value: 7 },
    { name: 'Öffentlicher Verkehr', value: 5 },
    { name: 'Grüne Energie', value: 4 },
    { name: 'Stadtplanung', value: 3 }
  ],
  initiativeEngagement: {
    recommended: 24,
    selected: 18
  }
};

const app = express();

app.use(helmet());
app.use(cors());
app.use(express.json({ limit: '1mb' }));

// Health check
app.get('/api/health', (req, res) => res.json({ status: 'ok' }));

// Analytics endpoint
app.get('/api/v1/analytics', (req, res) => {
  res.json(mockAnalyticsData);
});

// Conversations endpoint (mock)
app.post('/api/v1/conversations', (req, res) => {
  res.json({ success: true, id: 'mock-' + Date.now() });
});

export default app;