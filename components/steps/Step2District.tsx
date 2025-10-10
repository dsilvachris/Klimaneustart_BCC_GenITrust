import React from "react";
import {
  Box,
  Typography,
  Button,
  Paper,
} from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { AppProps } from "../../types";
import { BERLIN_DISTRICTS } from "../../constants";
import { getString } from "../../stringutils";

const Step2District: React.FC<AppProps> = ({
  data,
  updateData,
  onNext,
  onBack,
}) => {
  const handleDistrictSelect = (districtName: string) => {
    // Single district selection
    updateData({ districts: [districtName] });
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
          Step 8 of 9: Select Reflection Districts
        </Typography>
      </Box>

      {/* Red header box */}
      <Paper
        elevation={0}
        sx={{
          p: { xs: 2, sm: 3 },
          bgcolor: "#e70000",
          color: "#FFFFFF",
          borderRadius: 2,
          textAlign: "center",
          mb: 3,
        }}
      >
        <Typography variant="h4" component="h1" gutterBottom>
          Besprochen...
        </Typography>
        <Typography variant="h6">
          Dokumentiere die Essenz deines Dialogs
        </Typography>
      </Paper>

      {/* District selection grid */}
      <Grid container spacing={2} sx={{ mb: 4 }}>
        {BERLIN_DISTRICTS.map((district) => (
          <Grid xs={6} sm={4} md={3} key={district}>
            <Button
              fullWidth
              variant="contained"
              onClick={() => handleDistrictSelect(district)}
              sx={{ 
                height: 60,
                bgcolor: data.districts[0] === district ? "#4CAF50" : "#FFFFFF",
                color: data.districts[0] === district ? "#FFFFFF" : "#333",
                border: "1px solid #ddd",
                borderRadius: 2,
                "&:hover": { 
                  bgcolor: data.districts[0] === district ? "#388E3C" : "#F5F5F5" 
                },
                fontSize: "0.875rem",
                fontWeight: "normal"
              }}
            >
              {district}
            </Button>
          </Grid>
        ))}
      </Grid>

      {/* Weiter button */}
      <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
        <Button
          variant="contained"
          onClick={onNext}
          endIcon={<ArrowForwardIcon />}
          sx={{ 
            bgcolor: "#FFFFFF", 
            color: "#333",
            border: "1px solid #ddd",
            "&:hover": { bgcolor: "#F5F5F5" },
            px: 3
          }}
        >
          Weiter →
        </Button>
      </Box>
    </Box>
  );
};

export default Step2District;
