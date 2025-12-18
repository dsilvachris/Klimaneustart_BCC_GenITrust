import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Paper,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  IconButton,
  Chip,
  CircularProgress,
  Button
} from '@mui/material';
import { PictureAsPdf, Visibility } from '@mui/icons-material';
import { generateConversationReport } from '../utils/pdfGenerator';

const API_BASE_URL = import.meta.env.PROD ? '' : 'http://localhost:3001';

interface Conversation {
  id: number;
  uuid: string;
  main_interest: string;
  livable_city: string;
  notes: string;
  topic_details: any;
  districts: string[];
  selected_initiatives: string[];
  interest_areas: string[];
  observer_reflection: string;
  surprise: string;
  num_people: number;
  duration: number;
  location: string;
  is_anonymous: boolean;
  share_contact: boolean;
  created_at: string;
}

const ConversationsList: React.FC = () => {
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchConversations();
  }, []);

  const fetchConversations = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/v1/conversations`);
      if (!response.ok) throw new Error('Failed to fetch conversations');
      const data = await response.json();
      setConversations(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error');
    } finally {
      setLoading(false);
    }
  };

  const handleGenerateReport = (conversation: Conversation) => {
    const reportData = {
      id: conversation.id,
      uuid: conversation.uuid,
      mainInterest: conversation.main_interest,
      livableCity: conversation.livable_city,
      notes: conversation.notes,
      topicDetails: conversation.topic_details,
      districts: conversation.districts,
      selectedInitiatives: conversation.selected_initiatives,
      interestAreas: conversation.interest_areas,
      observerReflection: conversation.observer_reflection,
      surprise: conversation.surprise,
      numPeople: conversation.num_people,
      duration: conversation.duration,
      location: conversation.location,
      isAnonymous: conversation.is_anonymous,
      shareContact: conversation.share_contact,
      createdAt: conversation.created_at
    };
    generateConversationReport(reportData);
  };

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', p: 4 }}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Paper sx={{ p: 3, textAlign: 'center' }}>
        <Typography color="error">Error: {error}</Typography>
      </Paper>
    );
  }

  return (
    <Box>
      <Typography variant="h4" component="h1" gutterBottom fontWeight="bold">
        Conversations Reports
      </Typography>
      
      <Paper sx={{ mt: 2 }}>
        <List>
          {conversations.map((conversation) => (
            <ListItem key={conversation.id} divider>
              <ListItemText
                primary={
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <Typography variant="subtitle1">
                      {conversation.main_interest || 'Untitled Conversation'}
                    </Typography>
                    {conversation.is_anonymous && (
                      <Chip label="Anonymous" size="small" color="default" />
                    )}
                  </Box>
                }
                secondary={
                  <Box>
                    <Typography variant="body2" color="text.secondary">
                      Created: {new Date(conversation.created_at).toLocaleString('de-DE')}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Participants: {conversation.num_people} | Duration: {conversation.duration}min
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Districts: {conversation.districts.join(', ') || 'None'}
                    </Typography>
                  </Box>
                }
              />
              <ListItemSecondaryAction>
                <IconButton
                  edge="end"
                  onClick={() => handleGenerateReport(conversation)}
                  sx={{ color: '#e70000' }}
                >
                  <PictureAsPdf />
                </IconButton>
              </ListItemSecondaryAction>
            </ListItem>
          ))}
        </List>
        
        {conversations.length === 0 && (
          <Box sx={{ p: 4, textAlign: 'center' }}>
            <Typography variant="body1" color="text.secondary">
              No conversations found
            </Typography>
          </Box>
        )}
      </Paper>
    </Box>
  );
};

export default ConversationsList;