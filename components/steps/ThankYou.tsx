import React from "react";
import { Box, Typography, Button, Paper } from "@mui/material";
import { AppProps } from "../../types";

interface ThankYouProps extends AppProps {
  onNavigateToDashboard?: () => void;
}

const ThankYou: React.FC<ThankYouProps> = ({ onRestart, data, onNavigateToDashboard }) => {
  console.log("Submitting Data: ", data);
  const initiativeCount = data.selectedInitiatives.length;
  console.log("initiativeCount", initiativeCount);

  const handleDashboard = () => {
    if (onNavigateToDashboard) {
      onNavigateToDashboard();
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        textAlign: "center",
        py: { xs: 2, sm: 4 },
        height: "100%",
        gap: 3,
        bgcolor: "#FFFFFF", // White background
      }}
    >
      {/* Logo */}
      <Paper
        elevation={0}
        sx={{
          bgcolor: "#e70000",
          color: "#FFFFFF",
          p: 2,
          borderRadius: 1,
          mb: 2,
        }}
      >
        <Typography variant="h6" sx={{ fontWeight: "bold" }}>
          KLIMA
        </Typography>
        <Typography variant="h6" sx={{ fontWeight: "bold" }}>
          NEU
        </Typography>
        <Typography variant="h6" sx={{ fontWeight: "bold" }}>
          START
        </Typography>
      </Paper>

      {/* Main Thank You Message */}
      <Paper
        elevation={0}
        sx={{
          bgcolor: "#00bb70",
          color: "#FFFFFF",
          p: { xs: 3, sm: 4 },
          width: "100%",
          borderRadius: 2,
        }}
      >
        <Typography variant="h2" component="h1" gutterBottom>
          Vielen Dank!
        </Typography>
        <Typography variant="h6" component="p">
          Ihre Antwort wurde aufgezeichnet und wird zu Erkenntnissen der Gemeinschaft beitragen
        </Typography>
      </Paper>

      <Box sx={{ flexGrow: 1 }} /> {/* Spacer */}

      {/* Action Buttons */}
      <Box sx={{ width: "100%", display: "flex", flexDirection: "column", gap: 2 }}>
        {onNavigateToDashboard && (
          <Button
            onClick={handleDashboard}
            variant="contained"
            size="large"
            sx={{
              width: "100%",
              bgcolor: "#e70000",
              color: "#FFFFFF",
              "&:hover": { bgcolor: "#cc0000" },
            }}
          >
            Dashboard
          </Button>
        )}
        
        <Button
          onClick={onRestart}
          variant="contained"
          size="large"
          sx={{
            width: "100%",
            bgcolor: "#00bb70",
            color: "#FFFFFF",
            "&:hover": { bgcolor: "#009960" },
          }}
        >
          Nächster Dialog
        </Button>
      </Box>
    </Box>
  );
};

export default ThankYou;
