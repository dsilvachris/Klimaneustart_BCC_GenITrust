import React, { useMemo, useState } from "react";
import {
  Box,
  Typography,
  Button,
  Card,
  CardActionArea,
  Modal,
  Paper,
} from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2";
import { QRCodeCanvas } from "qrcode.react";
import { AppProps } from "../../types";
import { INTEREST_AREAS2, INITIATIVES } from "../../constants";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { saveConversation } from "../../services/conversationService";

const modalStyle = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
  textAlign: "center",
};

// Frontend route base for the public QR page
const PUBLIC_QR_BASE =
  typeof window !== "undefined" ? window.location.origin : "";

const Step3Initiatives: React.FC<AppProps> = ({
  data,
  updateData,
  onNext,
  onBack,
}) => {
  const [qrCodeValue, setQrCodeValue] = useState<string | null>(null);
  const [showInitiatives, setShowInitiatives] = useState(false);
  const [isSavingDraft, setIsSavingDraft] = useState(false);
  console.log("UUID=", data.uuid);

  const handleLocalBack = () => {
    if (showInitiatives) setShowInitiatives(false);
    else onBack();
  };

  const handleInterestToggle = (interestId: string) => {
    const newInterests = data.interestAreas.includes(interestId)
      ? data.interestAreas.filter((i) => i !== interestId)
      : [...data.interestAreas, interestId];
    updateData({ interestAreas: newInterests });
  };

  const handleInitiativeToggle = (initiativeId: string) => {
    const newInitiatives = data.selectedInitiatives.includes(initiativeId)
      ? data.selectedInitiatives.filter((i) => i !== initiativeId)
      : [...data.selectedInitiatives, initiativeId];
    updateData({ selectedInitiatives: newInitiatives });
  };

  const handleSkip = () => {
    // Clear any selected interests/initiatives and move to next step
    updateData({
      interestAreas: [],
      selectedInitiatives: [],
    });
    onNext();
  };

  const filteredInitiatives = useMemo(() => {
    if (!showInitiatives) return [];
    return INITIATIVES.filter((initiative) => {
      const districtMatch =
        data.districts.length === 0 ||
        initiative.district.some((d) => data.districts.includes(d));
      const interestMatch =
        data.interestAreas.length === 0 ||
        initiative.themes.some((theme) => data.interestAreas.includes(theme));
      return districtMatch && interestMatch;
    });
  }, [data.districts, data.interestAreas, showInitiatives]);

  const renderInterestSelection = () => (
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
          Step 4 of 9: Initiatives
        </Typography>
      </Box>

      {/* Green header box */}
      <Paper
        elevation={0}
        sx={{
          p: { xs: 2, sm: 3 },
          bgcolor: "#4CAF50",
          color: "#FFFFFF",
          borderRadius: 2,
          textAlign: "center",
          mb: 3,
        }}
      >
        <Typography variant="h4" component="h1" gutterBottom>
          Initiativen-Matching
        </Typography>
        <Typography variant="h6">
          Interessensgebiete auswählen
        </Typography>
      </Paper>

      {/* Interest areas grid */}
      <Grid container spacing={2} sx={{ mb: 4 }}>
        {INTEREST_AREAS2.map((interest) => {
          const Icon = interest.icon;
          const isSelected = data.interestAreas.includes(interest.id);
          return (
            <Grid xs={12} sm={6} md={4} key={interest.id}>
              <Card
                variant="outlined"
                sx={{
                  height: 140,
                  bgcolor: "#FFFFFF",
                  border: isSelected ? "3px solid #4CAF50" : "1px solid #ddd",
                  borderRadius: 2,
                  cursor: "pointer",
                  "&:hover": { bgcolor: "#F5F5F5" }
                }}
              >
                <CardActionArea
                  onClick={() => handleInterestToggle(interest.id)}
                  sx={{ p: 2, textAlign: "center", height: "100%", display: "flex", flexDirection: "column", justifyContent: "center" }}
                >
                  <Icon sx={{ fontSize: 32, mb: 1, color: "#666" }} />
                  <Typography variant="h6" sx={{ fontSize: "0.9rem", fontWeight: "bold", mb: 0.5 }}>
                    {interest.name}
                  </Typography>
                  <Typography variant="body2" sx={{ fontSize: "0.75rem", color: "text.secondary" }}>
                    {interest.description}
                  </Typography>
                </CardActionArea>
              </Card>
            </Grid>
          );
        })}
      </Grid>

      {/* Navigation buttons */}
      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <Button
          variant="contained"
          onClick={onBack}
          sx={{ 
            bgcolor: "#F44336", 
            color: "#FFFFFF",
            "&:hover": { bgcolor: "#D32F2F" },
            px: 3
          }}
        >
          Zurück
        </Button>
        
        <Typography variant="body2" sx={{ color: "#666" }}>
          Überspringen
        </Typography>
        
        <Button
          variant="contained"
          onClick={() => setShowInitiatives(true)}
          disabled={data.interestAreas.length === 0}
          endIcon={<ArrowForwardIcon />}
          sx={{ 
            bgcolor: "#4CAF50", 
            color: "#FFFFFF",
            "&:hover": { bgcolor: "#388E3C" },
            px: 3
          }}
        >
          Initiativen finden →
        </Button>
      </Box>
    </Box>
  );

  const renderInitiativeList = () => (
    <Box>
      <Button
        onClick={handleLocalBack}
        startIcon={<ArrowBackIcon />}
        sx={{ mb: 2 }}
      >
        Change Interests
      </Button>
      <Typography variant="h4" gutterBottom>
        Relevant Initiatives{" "}
        {data.districts.length > 0 && `in ${data.districts.join(", ")}`}
      </Typography>
      <Box sx={{ display: "flex", flexDirection: "column", gap: 2, mb: 4 }}>
        {filteredInitiatives.length > 0 ? (
          filteredInitiatives.map((initiative) => {
            const isSelected = data.selectedInitiatives.includes(initiative.id);
            return (
              <Card
                key={initiative.id}
                variant="outlined"
                sx={{
                  borderColor: isSelected ? "#007043" : "grey.300",
                  borderWidth: 2,
                  borderRadius: 2,
                  ...(isSelected && {
                    bgcolor: "#007043",
                    color: "#FFFFFF"
                  })
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "stretch",
                    justifyContent: "space-between",
                  }}
                >
                  <CardActionArea
                    onClick={() => handleInitiativeToggle(initiative.id)}
                    sx={{ flexGrow: 1, p: 2 }}
                  >
                    <Typography variant="h6" component="div">
                      {initiative.name}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {initiative.description}
                    </Typography>
                  </CardActionArea>

                  <Box
                    sx={{ display: "flex", alignItems: "center", p: 1, pr: 2 }}
                  >
                    <Button
                      variant="outlined"
                      onClick={(e) => {
                        e.stopPropagation();
                        setQrCodeValue(`${initiative.link}`);
                      }}
                      sx={{
                        width: 80,
                        height: 80,
                        flexShrink: 0,
                      }}
                    >
                      QR Code
                    </Button>
                  </Box>
                </Box>
              </Card>
            );
          })
        ) : (
          <Typography color="text.secondary" fontStyle="italic">
            No initiatives match the current filters.
          </Typography>
        )}

        <Card
          variant="outlined"
          sx={{
            mt: 4,
            textAlign: "center",
          }}
        >
          <CardActionArea
            onClick={async () => {
              try {
                setIsSavingDraft(true);
                await saveConversation({
                  uuid: data.uuid,
                  status: "in_progress" as any,
                  selectedInitiatives: data.selectedInitiatives,
                  interestAreas: data.interestAreas,
                  districts: data.districts,
                  isAnonymous: data.isAnonymous,
                  shareContact: false,
                } as any);
              } catch (e) {
                // Non-blocking: still show QR to avoid UX dead-end
                console.error("Failed to save draft before showing QR", e);
              } finally {
                setIsSavingDraft(false);
                setQrCodeValue(`${PUBLIC_QR_BASE}/dialogue/${data.uuid}`);
              }
            }}
            sx={{ p: 2 }}
          >
            <Typography variant="h6">
              {isSavingDraft ? "Preparing QR..." : "Show QR"}
            </Typography>
          </CardActionArea>
        </Card>
      </Box>
      <Box sx={{ display: "flex", justifyContent: "space-between", pt: 2 }}>
        <Button 
          variant="contained" 
          onClick={handleLocalBack}
          sx={{ bgcolor: "#e70000", "&:hover": { bgcolor: "#cc0000" } }}
        >
          Zurück
        </Button>
        <Button
          variant="contained"
          onClick={onNext}
          endIcon={<ArrowForwardIcon />}
          sx={{ bgcolor: "#00bb70", "&:hover": { bgcolor: "#009960" } }}
        >
          Weiter
        </Button>
      </Box>
    </Box>
  );

  return (
    <Box>
      {!showInitiatives ? renderInterestSelection() : (
        <Box sx={{ bgcolor: "#C8E6C9", minHeight: "100vh", p: 2 }}>
          {renderInitiativeList()}
        </Box>
      )}
      <Modal open={!!qrCodeValue} onClose={() => setQrCodeValue(null)}>
        <Box sx={modalStyle}>
          <Typography variant="h6" component="h2" gutterBottom>
            Scan for more info
          </Typography>
          {qrCodeValue && (
            <QRCodeCanvas
              value={qrCodeValue}
              size={256}
              style={{ height: "auto", maxWidth: "100%", width: "100%" }}
            />
          )}
          <Button onClick={() => setQrCodeValue(null)} sx={{ mt: 2 }}>
            Close
          </Button>
        </Box>
      </Modal>
    </Box>
  );
};

export default Step3Initiatives;
