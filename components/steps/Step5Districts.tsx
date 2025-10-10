import React from "react";
import { Box, Typography, Button, Paper, Grid } from "@mui/material";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { AppProps } from "../../types";
import { BERLIN_DISTRICTS } from "../../constants";
import { getString } from "../../stringutils";

const Step5District: React.FC<AppProps> = ({
  data,
  updateData,
  onNext,
  onBack,
}) => {
  const handleLocalBack = () => {
    onBack();
  };

  const handleDistrictSelect = (districtName: string) => {
    const newDistricts = data.interestDistricts.includes(districtName)
      ? data.interestDistricts.filter((d) => d !== districtName)
      : [...data.interestDistricts, districtName];
    updateData({ interestDistricts: newDistricts });
    console.log("new districts", newDistricts);
  };

  return (
    <Box
      sx={{ display: "flex", flexDirection: "column", height: "100%", gap: 3 }}
    >
      <Box
        sx={{
          p: { xs: 2, sm: 4 },
          bgcolor: "info.main",
          color: "info.contrastText",
          borderRadius: 2,
          textAlign: "center",
        }}
      >
        <Typography variant="h4" component="h1" gutterBottom>
          {getString("dialogue.headerTitle")}
        </Typography>
        <Typography variant="h6">
          {getString("dialogue.headerSubtitle")}
        </Typography>
      </Box>
      <Grid container spacing={2}>
        {BERLIN_DISTRICTS.map((district) => (
          <Grid item xs={6} sm={4} md={3} key={district}>
            <Button
              fullWidth
              variant={
                data.interestDistricts.includes(district)
                  ? "contained"
                  : "outlined"
              }
              onClick={() => handleDistrictSelect(district)}
              sx={{ height: "100%" }}
            >
              {district}
            </Button>
          </Grid>
        ))}
      </Grid>
      <Box sx={{ display: "flex", justifyContent: "flex-end", pt: 2 }}>
        <Button
          variant="contained"
          onClick={() => onNext()}
          endIcon={<ArrowForwardIcon />}
        >
          Weiter
        </Button>
      </Box>
    </Box>
  );
};

export default Step5District;
