import React, { useState } from "react";
import {
  Typography,
  Box,
  TextField,
  Paper,
  Button,
  Modal,
  Alert,
} from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2";
import { ToggleButton, ToggleButtonGroup } from "@mui/material";
import { QRCodeCanvas } from "qrcode.react";
import { AppProps } from "../../types";
import QrCode2Icon from "@mui/icons-material/QrCode2";

const modalStyle = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: { xs: "90%", sm: 400 },
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
  textAlign: "center",
};

const Step4Consent: React.FC<AppProps> = ({
  data,
  updateData,
  onNext,
  onBack,
}) => {
  const [showQR, setShowQR] = useState(false);
  const [contactPreference, setContactPreference] = useState<
    "contact" | "anonymous"
  >(data.isAnonymous ? "anonymous" : "contact");

  const handlePreferenceChange = (
    event: React.MouseEvent<HTMLElement>,
    newPreference: "contact" | "anonymous" | null
  ) => {
    if (newPreference !== null) {
      setContactPreference(newPreference);
      if (newPreference === "anonymous") {
        updateData({
          isAnonymous: true,
          shareContact: false,
          contactInfo: "",
          phone: "",
          firstName: "",
          lastName: "",
        });
      } else {
        updateData({
          isAnonymous: false,
          shareContact: true,
        });
      }
    }
  };

  return (
    <Box
      sx={{ display: "flex", flexDirection: "column", height: "100%", gap: 3 }}
    >
      <Paper
        elevation={0}
        sx={{
          p: { xs: 2, sm: 3 },
          bgcolor: "#e70000",
          color: "#FFFFFF",
          borderRadius: 2,
          textAlign: "center",
        }}
      >
        <Typography variant="h4" component="h1">
          In Kontakt bleiben
        </Typography>
        <Typography variant="h6">
          Bleib auf dem Laufendem Verbinde dich mit Initiativen
        </Typography>
      </Paper>

      <ToggleButtonGroup
        color="primary"
        value={contactPreference}
        exclusive
        onChange={handlePreferenceChange}
        aria-label="contact preference"
        fullWidth
      >
        <ToggleButton value="contact">Kontakt teilen</ToggleButton>
        <ToggleButton value="anonymous">Anonym bleiben</ToggleButton>
      </ToggleButtonGroup>

      {contactPreference === "contact" && (
        <Paper variant="outlined" sx={{ p: 3, mt: 1 }}>
          <Typography variant="h6" gutterBottom>
            Welche Kontaktdaten möchtest du teilen?
          </Typography>
          <Grid container spacing={2}>
            <Grid xs={12} sm={6}>
              <TextField
                fullWidth
                label="Vorname"
                value={data.firstName}
                onChange={(e) => updateData({ firstName: e.target.value })}
              />
            </Grid>
            <Grid xs={12} sm={6}>
              <TextField
                fullWidth
                label="Nachname"
                value={data.lastName}
                onChange={(e) => updateData({ lastName: e.target.value })}
              />
            </Grid>
            <Grid xs={12}>
              <TextField
                fullWidth
                label="E-mail"
                type="email"
                value={data.contactInfo}
                onChange={(e) => updateData({ contactInfo: e.target.value })}
              />
            </Grid>
            <Grid xs={12}>
              <TextField
                fullWidth
                label="Telefon"
                type="tel"
                value={data.phone}
                onChange={(e) => updateData({ phone: e.target.value })}
              />
            </Grid>
          </Grid>
        </Paper>
      )}

      {contactPreference === "anonymous" && (
        <Alert severity="info" sx={{ mt: 1 }}>
          Deine Privatsphäre ist geschützt. Es werden nur Dialogdaten mit
          ausdrücklicher Zustimmung gespeichert.
        </Alert>
      )}

      <Paper variant="outlined" sx={{ p: 2, mt: 2 }}>
        <Button
          fullWidth
          startIcon={<QrCode2Icon />}
          onClick={() => setShowQR(true)}
        >
          Unser QR Code
        </Button>
      </Paper>
      <Typography variant="body2" color="text.secondary" sx={{ mt: 2 }}>
        Deine Angaben bleiben vertraulich und werden ausschließlich dazu
        genutzt, dich über lokale Initiativen zu informieren, die dich
        interessieren.
      </Typography>

      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          pt: 2,
          mt: "auto",
        }}
      >
        <Button 
          variant="contained" 
          onClick={onBack}
          sx={{ bgcolor: "#e70000", "&:hover": { bgcolor: "#cc0000" } }}
        >
          Zurück
        </Button>
        <Button 
          variant="contained" 
          onClick={onNext}
          sx={{ bgcolor: "#00bb70", "&:hover": { bgcolor: "#009960" } }}
        >
          Weiter
        </Button>
      </Box>

      <Modal open={showQR} onClose={() => setShowQR(false)}>
        <Box sx={modalStyle}>
          <Typography variant="h6" component="h2" gutterBottom>
            Organisation QR Code
          </Typography>
          <QRCodeCanvas
            value={"https://klimaneustart.berlin/"}
            size={256}
            style={{ height: "auto", maxWidth: "100%", width: "100%" }}
          />
          <Button onClick={() => setShowQR(false)} sx={{ mt: 2 }}>
            Close
          </Button>
        </Box>
      </Modal>
    </Box>
  );
};

export default Step4Consent;
