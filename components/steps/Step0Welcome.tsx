import React from "react";
import { Box, Typography, Button, IconButton } from "@mui/material";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import TrendingFlatIcon from "@mui/icons-material/TrendingFlat";
import BottomNavigationBar from "../ui/BottomNavigationBar";
import SchoolIcon from "@mui/icons-material/School"; // Placeholder for 'brain' icon

let logo = "/icons/generation_itrust_logo.svg";

interface Step0WelcomeProps {
  onNext: () => void;
}

const Step0Welcome: React.FC<Step0WelcomeProps> = ({ onNext }) => {
  const handleTabChange = (tabName: "dialogue" | "dashboard") => {
    console.log("Tab changed to:", tabName);
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        textAlign: "center",
        p: 3,
        height: "100%",
        justifyContent: "center",
      }}
    >
      <IconButton sx={{ position: "absolute", top: 16, right: 16 }}>
        <InfoOutlinedIcon />
      </IconButton>

      <Box
        component="img"
        src={logo}
        alt="Logo"
        sx={{
          width: { xs: 200, sm: 250 },
          height: { xs: 200, sm: 250 },
          borderRadius: "16px",
          mb: 4,
        }}
      />

      <Typography variant="h3" component="h1" gutterBottom>
        Berliner Gespräche Klimaneustart
      </Typography>

      <Typography
        variant="h6"
        color="text.secondary"
        sx={{ mb: 4, maxWidth: "500px" }}
      >
        Bürger:innen Dialog dokumentiere zu gesellschaftsrelevanten Theme
      </Typography>

      <Box sx={{ display: "flex", alignItems: "center", mb: 4 }}>
        <SchoolIcon color="action" />
        <Typography variant="body1" sx={{ ml: 1 }}>
          cared for by Generation iTrust
        </Typography>
      </Box>

      <Button
        variant="contained"
        color="primary"
        size="large"
        onClick={onNext}
        endIcon={<TrendingFlatIcon />}
      >
        Starte den Dialog
      </Button>

      <BottomNavigationBar
        currentView={"dialogue"}
        onTabChange={handleTabChange}
      />
    </Box>
  );
};

export default Step0Welcome;
