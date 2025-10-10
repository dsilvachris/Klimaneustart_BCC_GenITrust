# Sample Inputs - Klimaneustart BCC Application

This document provides sample input data for testing and development of the Klimaneustart civic dialogue application.

## Environment Variables

### .env.local
```bash
GEMINI_API_KEY=AIzaSyBZ89Ra_T0GgBv7KXzDTMZ7Fp0oMNPucWE
DB_HOST=localhost
DB_PORT=5432
DB_NAME=klimaneustart_db
DB_USER=postgres
DB_PASSWORD=password
```

## API Sample Inputs

### 1. Dialogue Submission (POST /api/v1/dialogues)

```json
{
  "mainInterest": "Ich interessiere mich für nachhaltige Mobilität in Berlin",
  "livableCity": "Eine lebenswerte Stadt sollte grüne Räume, gute öffentliche Verkehrsmittel und bezahlbaren Wohnraum haben",
  "notes": "Diskussion über Fahrradwege und E-Mobilität",
  "audioNoteUrl": "https://example.com/audio/note123.mp3",
  "topicDetails": {
    "wohnen_bauwende": {
      "transport": {
        "selectedOptions": ["bicycle", "public_transport", "electric_car"],
        "customNote": "Teilnehmer betonte die Wichtigkeit sicherer Fahrradwege"
      },
      "heating_transition": {
        "selectedOptions": ["district_heating", "costs"],
        "customNote": "Sorgen über steigende Heizkosten"
      }
    },
    "mobilitat": {
      "selectedOptions": ["public_transport", "cycling"],
      "customNote": "ÖPNV sollte günstiger und häufiger fahren"
    }
  },
  "districts": ["Pankow", "Mitte"],
  "selectedInitiatives": ["changing_cities", "pankow_solar"],
  "interestAreas": ["Urban Garden", "Repair Café", "Sustainable Mobility"],
  "interestDistricts": ["Pankow", "Friedrichshain-Kreuzberg"],
  "shareContact": true,
  "contactInfo": "max.mustermann@example.com",
  "isAnonymous": false,
  "observerReflection": "Sehr engagierte Diskussion über Klimaschutz im Kiez",
  "surprise": "Überraschend war das große Interesse an Gemeinschaftsgärten",
  "numPeople": 3,
  "duration": 45,
  "location": "Bürgerzentrum Pankow",
  "firstName": "Max",
  "lastName": "Mustermann",
  "phone": "+49 30 12345678",
  "participantType": "family"
}
```

### 2. New Initiative Creation (POST /api/v1/initiatives)

```json
{
  "name": "Solarkiez Prenzlauer Berg",
  "description": "Gemeinschaftsinitiative für Solaranlagen auf Wohngebäuden im Prenzlauer Berg",
  "districts": ["Pankow"],
  "themes": ["Community Energy", "Solar Power", "Climate Action"],
  "link": "https://solarkiez-prenzlberg.de"
}
```

## Frontend Component Sample Data

### 3. Conversation Data State

```typescript
const sampleConversationData: ConversationData = {
  uuid: "550e8400-e29b-41d4-a716-446655440000",
  mainInterest: "Klimaschutz im Kiez",
  livableCity: "Grüne, verkehrsberuhigte Nachbarschaft",
  notes: "Wichtige Punkte zur Verkehrswende",
  topicDetails: {
    "wohnen_bauwende": {
      "transport": {
        "selectedOptions": ["bicycle", "public_transport"],
        "customNote": "Mehr Fahrradstellplätze benötigt"
      }
    }
  },
  districts: ["Neukölln", "Tempelhof-Schöneberg"],
  selectedInitiatives: ["berliner_tafel", "zero_waste_ev"],
  interestAreas: ["Zero Waste", "Community"],
  interestDistricts: ["Neukölln"],
  shareContact: false,
  contactInfo: "",
  isAnonymous: true,
  observerReflection: "Konstruktive Diskussion",
  surprise: "Hohes Umweltbewusstsein",
  numPeople: 2,
  duration: 30
};
```

### 4. Contact Information

```typescript
const sampleContactInfo: ContactInfo = {
  firstName: "Anna",
  lastName: "Schmidt",
  email: "anna.schmidt@example.com",
  telephone: "+49 176 98765432"
};
```

### 5. Observer Reflection Data

```typescript
const sampleReflection: DeineReflection = {
  observerReflection: "Die Teilnehmer waren sehr interessiert an lokalen Klimaschutzmaßnahmen",
  surprise: "Überraschend war das Interesse an Repair Cafés",
  numPeople: 4,
  duration: 60,
  location: "Nachbarschaftszentrum"
};
```

## Database Sample Data

### 6. Analytics Mock Data

```typescript
const mockAnalyticsData: AnalyticsData = {
  totalDialogues: 127,
  totalParticipants: 284,
  avgDuration: 42,
  dialoguesByDistrict: [
    { name: "Mitte", value: 23 },
    { name: "Pankow", value: 19 },
    { name: "Neukölln", value: 17 },
    { name: "Friedrichshain-Kreuzberg", value: 15 }
  ],
  topTopics: [
    { name: "Mobilität", value: 45 },
    { name: "Wohnen/Bauwende", value: 38 },
    { name: "Klimaanpassung", value: 32 }
  ],
  topInterestAreas: [
    { name: "Urban Garden", value: 28 },
    { name: "Repair Café", value: 24 },
    { name: "Sustainable Mobility", value: 21 }
  ],
  initiativeEngagement: {
    recommended: 89,
    selected: 67
  }
};
```

## Test Scenarios

### 7. Complete Dialogue Flow Test Data

```json
{
  "scenario": "Family with children interested in sustainable living",
  "steps": {
    "welcome": {
      "acknowledged": true
    },
    "core": {
      "mainInterest": "Nachhaltige Erziehung und Umweltschutz für Kinder",
      "livableCity": "Sichere Spielplätze, saubere Luft, Bildungsangebote zu Nachhaltigkeit"
    },
    "district": {
      "selectedDistricts": ["Charlottenburg-Wilmersdorf"]
    },
    "topics": {
      "wohnen_bauwende": {
        "climate_adaptation": {
          "selectedOptions": ["trees", "heat"],
          "customNote": "Mehr Schatten auf Spielplätzen"
        }
      },
      "sonstiges_notizen": {
        "selectedOptions": [],
        "customNote": "Umweltbildung in Schulen wichtig"
      }
    },
    "initiatives": {
      "selected": ["repair_cafe_klausenerplatz", "fridays_for_future_berlin"]
    },
    "consent": {
      "shareContact": true,
      "isAnonymous": false
    },
    "reflection": {
      "observerReflection": "Familie sehr engagiert, Kinder stellten viele Fragen",
      "surprise": "Kinder wussten bereits viel über Klimawandel",
      "numPeople": 4,
      "duration": 35,
      "location": "Familienzentrum"
    }
  }
}
```

### 8. Anonymous Single Participant

```json
{
  "scenario": "Anonymous individual focused on mobility",
  "data": {
    "mainInterest": "Bessere Fahrradinfrastruktur",
    "livableCity": "Autofreie Innenstadt",
    "topicDetails": {
      "mobilitat": {
        "selectedOptions": ["bicycle", "public_transport"],
        "customNote": "Radwege oft blockiert von Autos"
      }
    },
    "districts": ["Mitte"],
    "selectedInitiatives": ["changing_cities"],
    "interestAreas": ["Sustainable Mobility"],
    "shareContact": false,
    "isAnonymous": true,
    "observerReflection": "Kurzes aber fokussiertes Gespräch",
    "numPeople": 1,
    "duration": 15
  }
}
```

## API Response Examples

### 9. Successful Dialogue Creation Response

```json
{
  "status": "success",
  "message": "Dialogue created successfully",
  "dialogue_id": 42,
  "uuid": "550e8400-e29b-41d4-a716-446655440000",
  "created_at": "2024-01-15T14:30:00Z"
}
```

### 10. Error Response Examples

```json
{
  "status": "error",
  "message": "Validation failed",
  "errors": [
    {
      "field": "mainInterest",
      "message": "Main interest is required"
    },
    {
      "field": "numPeople",
      "message": "Number of people must be greater than 0"
    }
  ]
}
```

## Testing Commands

### 11. cURL Examples

```bash
# Test dialogue submission
curl -X POST http://localhost:3001/api/v1/dialogues \
  -H "Content-Type: application/json" \
  -d @sample-dialogue.json

# Get analytics data
curl http://localhost:3001/api/v1/analytics

# Get all initiatives
curl http://localhost:3001/api/v1/lookup/initiatives

# Get districts
curl http://localhost:3001/api/v1/lookup/districts
```

### 12. Frontend Testing Data

```typescript
// For testing step navigation
const testStepProgression = [
  StepId.Welcome,
  StepId.Core,
  StepId.District,
  StepId.Topics,
  StepId.Initiatives,
  StepId.Consent,
  StepId.Reflection,
  StepId.Metrics,
  StepId.Summary
];

// For testing topic selection
const testTopicSelections = {
  "wohnen_bauwende": ["transport", "heating_transition"],
  "mobilitat": ["public_transport"],
  "klimaanpassung": ["trees", "heat"]
};
```

## Notes

- All sample data uses realistic German content appropriate for Berlin climate discussions
- UUIDs should be generated dynamically in production
- Phone numbers use German format
- Email addresses use example.com domain for testing
- Timestamps follow ISO 8601 format
- All monetary values would be in EUR if applicable