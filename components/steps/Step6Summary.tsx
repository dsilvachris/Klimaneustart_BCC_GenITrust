import React, { useState } from "react";
import {
  Box,
  Typography,
  Paper,
  List,
  ListItem,
  ListItemText,
  Button,
  Alert,
  FormControlLabel,
  Checkbox,
  IconButton,
  ListItemSecondaryAction,
} from "@mui/material";
import { LoadingButton } from "@mui/lab";
import EditIcon from "@mui/icons-material/Edit";
import { AppProps, StepId } from "../../types";
import { INITIATIVES, STEPS } from "../../constants";
import { saveConversation } from "../../services/conversationService";

interface SummaryItemProps {
  label: string;
  value: React.ReactNode;
  onEdit?: () => void;
  editable?: boolean;
}

const SummaryItem: React.FC<SummaryItemProps> = ({
  label,
  value,
  onEdit,
  editable = false,
}) => {
  const displayValue = value || (
    <Typography component="span" fontStyle="italic" color="text.secondary">
      Not provided
    </Typography>
  );

  return (
    <ListItem divider>
      <ListItemText
        primary={label}
        secondary={displayValue}
        primaryTypographyProps={{ fontWeight: "bold" }}
        secondaryTypographyProps={{
          component: "div",
          color: "text.primary",
          mt: 0.5,
        }}
      />
      {editable && (
        <ListItemSecondaryAction>
          <IconButton edge="end" onClick={onEdit}>
            <EditIcon />
          </IconButton>
        </ListItemSecondaryAction>
      )}
    </ListItem>
  );
};

const Step6Summary: React.FC<AppProps> = ({
  data,
  onNext,
  onBack,
  updateData,
  navigateToStep,
}) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [sendCopy, setSendCopy] = useState(false);

  const handleEdit = (stepId: StepId) => {
    if (navigateToStep) {
      navigateToStep(stepId);
    }
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    setError("");
    try {
      const payload = { ...data, sendCopy, status: "completed" };
      console.log("Payload: ", payload);
      const result = await saveConversation(payload);
      console.log("Conversation saved:", result);

      if (sendCopy) {
        console.log("User requested a copy. Triggering email service...");
      }

      onNext();
    } catch (e) {
      const errorMessage = e instanceof Error ? e.message : "Failed to submit conversation. Please try again.";
      setError(errorMessage);
      console.error("Submission error:", e);
    } finally {
      setIsSubmitting(false);
    }
  };

  const renderTopicDetails = () => {
    const mainTopicEntries = Object.entries(data.topicDetails).filter(
      ([, details]) =>
        Object.keys(details).length > 0 &&
        ((details as any).customNote ||
          Object.values(details).some(
            (d: any) => d.selectedOptions?.length > 0 || d.customNote
          ))
    );
    if (mainTopicEntries.length === 0) return null;

    return (
      <Box sx={{ display: "flex", flexDirection: "column", gap: 1.5 }}>
        {mainTopicEntries.map(([topicId, subGroups]) => {
          const details = subGroups as any;
          return (
            <Box key={topicId}>
              <Typography variant="subtitle1" fontWeight="bold">
                {topicId}
              </Typography>
              {details.customNote && (
                <Typography variant="body2">{details.customNote}</Typography>
              )}
              {Object.entries(details)
                .filter(([key]) => key !== "customNote")
                .map(([subGroupId, subGroupDetails]: [string, any]) => (
                  <Box key={subGroupId} sx={{ ml: 2, mt: 1 }}>
                    <Typography variant="subtitle2">{subGroupId}</Typography>
                    {subGroupDetails.selectedOptions?.length > 0 && (
                      <Typography variant="body2">
                        Selected: {subGroupDetails.selectedOptions.join(", ")}
                      </Typography>
                    )}
                    {subGroupDetails.customNote && (
                      <Typography variant="body2" color="text.secondary">
                        Note: {subGroupDetails.customNote}
                      </Typography>
                    )}
                  </Box>
                ))}
            </Box>
          );
        })}
      </Box>
    );
  };

  return (
    <Box sx={{ bgcolor: "#C8E6C9", minHeight: "100vh", p: 2 }}>
      {/* Header with back button and step indicator */}
      <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
        <Button 
          onClick={onBack}
          sx={{ mr: 2, color: "#333" }}
        >
          ← Back
        </Button>
        <Typography variant="body2" sx={{ ml: "auto", color: "#666" }}>
          Step 9 of 9: Summary
        </Typography>
      </Box>
      
      <Typography variant="h4" component="h1" gutterBottom sx={{ color: "#333", mb: 3 }}>
        Zusammenfassung
      </Typography>
      
      <Paper
        elevation={0}
        sx={{
          bgcolor: "#FFFFFF",
          borderRadius: 2,
          p: 3,
          mb: 3
        }}
      >
        <List dense>
          <SummaryItem
            label="Bezirk auswählen"
            value={data.districts.join(", ") || "Not provided"}
            editable
            onEdit={() => handleEdit(StepId.District)}
          />
          <SummaryItem
            label="Topic Details"
            value={renderTopicDetails() || "Not provided"}
            editable
            onEdit={() => handleEdit(StepId.Topics)}
          />
          <SummaryItem
            label="Initiativen"
            value={data.selectedInitiatives
              .map((id) => INITIATIVES.find((i) => i.id === id)?.name)
              .join(", ") || "Not provided"}
            editable
            onEdit={() => handleEdit(StepId.Initiatives)}
          />
          <SummaryItem
            label="Anonym bleiben"
            value={data.isAnonymous ? "Yes" : "No"}
            editable
            onEdit={() => handleEdit(StepId.Consent)}
          />
          <SummaryItem
            label="Kontakt teilen"
            value={data.shareContact ? `Yes (${data.contactInfo})` : "Not provided"}
            editable
            onEdit={() => handleEdit(StepId.Consent)}
          />
          <SummaryItem
            label="Resonanz, Essenz, Takeaway..."
            value={data.observerReflection || "Not provided"}
            editable
            onEdit={() => handleEdit(StepId.Reflection)}
          />
          <SummaryItem
            label="Deine Reflexion"
            value={data.surprise || "Not provided"}
            editable
            onEdit={() => handleEdit(StepId.Reflection)}
          />
          <SummaryItem
            label="Dauer (Min.)"
            value={`${data.duration || 0} minutes`}
            editable
            onEdit={() => handleEdit(StepId.Metrics)}
          />
        </List>
      </Paper>

      {error && (
        <Alert severity="error" sx={{ mt: 2 }}>
          {error}
        </Alert>
      )}

      {data.shareContact && data.contactInfo && (
        <Box sx={{ mt: 2, display: "flex", justifyContent: "flex-start" }}>
          <FormControlLabel
            control={
              <Checkbox
                checked={sendCopy}
                onChange={(e) => setSendCopy(e.target.checked)}
                name="sendCopy"
                color="primary"
              />
            }
            label={`Send a copy of this summary to ${data.contactInfo}`}
          />
        </Box>
      )}

      <Box sx={{ display: "flex", justifyContent: "center", gap: 2, mt: 4 }}>
        <Button
          variant="contained"
          sx={{ 
            bgcolor: "#FFB74D", 
            color: "#333",
            "&:hover": { bgcolor: "#FFA726" },
            minWidth: 120
          }}
        >
          📧
        </Button>
        <LoadingButton
          variant="contained"
          onClick={handleSubmit}
          loading={isSubmitting}
          sx={{ 
            bgcolor: "#81C784", 
            color: "#333",
            "&:hover": { bgcolor: "#66BB6A" },
            minWidth: 120
          }}
        >
          📊 Analytics Dashboard
        </LoadingButton>
      </Box>
    </Box>
  );
};

export default Step6Summary;
