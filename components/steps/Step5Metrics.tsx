import React from "react";
import {
  Box,
  Typography,
  TextField,
  Button,
  Paper,
  FormGroup,
  FormControlLabel,
  Checkbox,
} from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2";
import { AppProps } from "../../types";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";

type ParticipantType = "single" | "family" | "couple";

const Step5Metrics: React.FC<AppProps> = ({
  data,
  updateData,
  onNext,
  onBack,
}) => {
  const handleParticipantTypeChange = (type: ParticipantType) => {
    // Enforce single selection like a radio group
    updateData({ participantType: type });
  };

  return (
    <Box
      sx={{ display: "flex", flexDirection: "column", height: "100%", gap: 3 }}
    >
      <Paper
        elevation={0}
        sx={{
          p: { xs: 2, sm: 3 },
          bgcolor: "info.main",
          color: "info.contrastText",
          borderRadius: 2,
          textAlign: "center",
        }}
      >
        <Typography variant="h4" component="h1">
          Dialog
        </Typography>
        <Typography variant="h6">Allgemeine Infos</Typography>
      </Paper>

      <Grid container spacing={2}>
        <Grid xs={6}>
          <Typography variant="body2" align="center" sx={{ mb: 1 }}>
            Dialogpartner:innen
          </Typography>
          <TextField
            fullWidth
            type="number"
            value={data.numPeople}
            onChange={(e) =>
              updateData({ numPeople: parseInt(e.target.value, 10) || 0 })
            }
            inputProps={{
              style: {
                textAlign: "center",
                fontSize: "1.5rem",
                fontWeight: "bold",
              },
              min: 1,
            }}
            variant="outlined"
            sx={{
              "& .MuiOutlinedInput-root": {
                height: "100px",
                alignItems: "center",
                justifyContent: "center",
              },
            }}
          />
        </Grid>
        <Grid xs={6}>
          <Typography variant="body2" align="center" sx={{ mb: 1 }}>
            Dauer (MIN)
          </Typography>
          <TextField
            fullWidth
            type="number"
            value={data.duration}
            onChange={(e) =>
              updateData({ duration: parseInt(e.target.value, 10) || 0 })
            }
            inputProps={{
              style: {
                textAlign: "center",
                fontSize: "1.5rem",
                fontWeight: "bold",
              },
              min: 1,
            }}
            variant="outlined"
            sx={{
              "& .MuiOutlinedInput-root": {
                height: "100px",
                alignItems: "center",
                justifyContent: "center",
              },
            }}
          />
        </Grid>
      </Grid>

      <Paper variant="outlined" sx={{ p: 1, borderRadius: 2 }}>
        <FormGroup row sx={{ justifyContent: "space-around" }}>
          <FormControlLabel
            control={
              <Checkbox
                checked={data.participantType === "single"}
                onChange={() => handleParticipantTypeChange("single")}
              />
            }
            label="Single"
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={data.participantType === "family"}
                onChange={() => handleParticipantTypeChange("family")}
              />
            }
            label="Family"
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={data.participantType === "couple"}
                onChange={() => handleParticipantTypeChange("couple")}
              />
            }
            label="Couple"
          />
        </FormGroup>
      </Paper>

      <TextField
        fullWidth
        label="Standort.         soon"
        value={data.location || ""}
        onChange={(e) => updateData({ location: e.target.value })}
        variant="outlined"
      />

      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          pt: 2,
          mt: "auto",
        }}
      >
        <Button variant="text" onClick={onBack}>
          Zurück
        </Button>
        <Button
          variant="contained"
          onClick={onNext}
          endIcon={<ArrowForwardIcon />}
        >
          Weiter
        </Button>
      </Box>
    </Box>
  );
};

export default Step5Metrics;
