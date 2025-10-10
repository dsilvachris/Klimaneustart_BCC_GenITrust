import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Paper,
  Card,
  CardContent,
  Button,
  Stack,
  CircularProgress,
} from '@mui/material';
import { QRCodeCanvas } from 'qrcode.react';
import { INITIATIVES } from '../../constants';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import EmailIcon from '@mui/icons-material/Email';
import { styled } from '@mui/material/styles';

const QRCard = styled(Card)(({ theme }) => ({
  backgroundColor: theme.palette.info.main,
  color: theme.palette.info.contrastText,
  marginBottom: theme.spacing(2),
  borderRadius: theme.shape.borderRadius,
  '& .MuiCardContent-root': {
    display: 'flex',
    alignItems: 'center',
    gap: theme.spacing(2),
    padding: theme.spacing(2),
  },
}));

const ActionButton = styled(Button)(({ theme }) => ({
  borderRadius: theme.shape.borderRadius,
  padding: theme.spacing(1, 3),
  fontWeight: 'bold',
  flex: 1,
}));

interface DialogueQRProps {
  dialogueId: string;
}

interface DialogueData {
  selectedInitiatives: string[];
}

const DialogueQR: React.FC<DialogueQRProps> = ({ dialogueId }) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [dialogueData, setDialogueData] = useState<DialogueData | null>(null);

  useEffect(() => {
    const fetchDialogueData = async () => {
      try {
        const rawBase = (import.meta as any).env?.VITE_API_BASE_URL;
        const apiBase = typeof rawBase === 'string' && rawBase.trim().length > 0 ? rawBase.trim() : '';
        const url = apiBase ? `${apiBase}/api/v1/conversations/${dialogueId}` : `/api/v1/conversations/${dialogueId}`;
        const response = await fetch(url, { headers: { Accept: 'application/json' } });

        const contentType = response.headers.get('content-type') || '';
        const isJson = contentType.includes('application/json');

        if (response.ok && isJson) {
          const data = await response.json();
          setDialogueData(data);
          return;
        }

        // Handle non-200 or non-JSON gracefully
        if (!isJson) {
          const text = await response.text();
          throw new Error('Invalid server response while loading dialogue');
        }

        const maybeError = await response.json().catch(() => null as any);
        if (maybeError && (maybeError.error || maybeError.message)) {
          throw new Error(maybeError.error || maybeError.message);
        }
        throw new Error('Failed to load dialogue');
      } catch (err) {
        // Fallback to localStorage draft on same device
        const draft = localStorage.getItem(`dialogue_${dialogueId}`);
        if (draft) {
          try {
            const parsed = JSON.parse(draft);
            setDialogueData({ selectedInitiatives: parsed.selectedInitiatives || [] });
            setError(null);
            return;
          } catch {}
        }
        setError(err instanceof Error ? err.message : 'An error occurred');
      } finally {
        setLoading(false);
      }
    };

    fetchDialogueData();
  }, [dialogueId]);

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <CircularProgress />
      </Box>
    );
  }

  if (error || !dialogueData) {
    return (
      <Box sx={{ p: 3, textAlign: 'center' }}>
        <Typography color="error">
          {error || 'Failed to load dialogue data'}
        </Typography>
      </Box>
    );
  }

  const selectedInitiatives = INITIATIVES.filter(initiative => 
    dialogueData.selectedInitiatives.includes(initiative.id)
  );

  const handleShare = (type: 'whatsapp' | 'email') => {
    const url = window.location.href;
    if (type === 'whatsapp') {
      window.open(`https://wa.me/?text=${encodeURIComponent(url)}`, '_blank');
    } else {
      window.open(`mailto:?subject=Climate Initiatives&body=${encodeURIComponent(url)}`, '_blank');
    }
  };

  return (
    <Box sx={{ p: 2, maxWidth: 600, mx: 'auto' }}>
      <Paper 
        elevation={0}
        sx={{ 
          p: 3, 
          mb: 4,
          bgcolor: 'info.main',
          color: 'info.contrastText',
          textAlign: 'center',
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', mb: 2 }}>
          <Box 
            component="img"
            src="/icons/generation_itrust_logo.svg"
            alt="Logo"
            sx={{ width: 40, height: 40, mr: 2 }}
          />
          <Typography variant="h4" component="h1">
            Klimaneustart
          </Typography>
        </Box>
        <Typography variant="h6">
          Berlin
        </Typography>
      </Paper>

      <Typography variant="h5" gutterBottom sx={{ mb: 3 }}>
        Initiatives that you are interested in!
      </Typography>

      {selectedInitiatives.map((initiative) => (
        <QRCard key={initiative.id} variant="outlined">
          <CardContent>
            <Box sx={{ flexGrow: 1 }}>
              <Typography variant="h6" gutterBottom>
                {initiative.name}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {initiative.description}
              </Typography>
            </Box>
            <QRCodeCanvas
              value={`${window.location.origin}/initiatives/${initiative.id}`}
              size={100}
              level="H"
              includeMargin={true}
            />
          </CardContent>
        </QRCard>
      ))}

      <Stack
        direction="row"
        spacing={2}
        sx={{ mt: 4, mb: 2 }}
      >
        <ActionButton
          variant="contained"
          color="success"
          startIcon={<WhatsAppIcon />}
          onClick={() => handleShare('whatsapp')}
        >
          WhatsApp
        </ActionButton>
        <ActionButton
          variant="contained"
          color="primary"
          startIcon={<EmailIcon />}
          onClick={() => handleShare('email')}
        >
          E-Mail Us
        </ActionButton>
      </Stack>
    </Box>
  );
};

export default DialogueQR;
