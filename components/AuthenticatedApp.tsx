import React, { useState } from "react";
import { Box, Container } from "@mui/material";
import MainApp from "./MainApp";
import AnalyticsDashboard from "../analytics/AnalyticsDashboard";
import ConversationsList from "./ConversationsList";
import BottomNavigationBar from "./ui/BottomNavigationBar";
import { useStepNavigation } from "../hooks/hooks";

const AuthenticatedApp: React.FC = () => {
  const [view, setView] = useState<"dialogue" | "dashboard" | "reports">("dialogue");
  const { restart } = useStepNavigation();

  const handleViewChange = (newView: "dialogue" | "dashboard" | "reports") => {
    if (newView === "dialogue" && view === "dashboard") {
      // When switching from dashboard to start a new dialogue, reset the survey state
      restart();
    }
    setView(newView);
  };

  const handleNavigateToDashboard = () => {
    setView("dashboard");
  };

  return (
    <Box sx={{ pb: "56px" }}>
      {" "}
      {/* Padding at the bottom to avoid content being hidden by the nav bar */}
      <Container maxWidth="md" sx={{ mt: 2, mb: 2 }}>
        {view === "dialogue" ? (
          <MainApp onNavigateToDashboard={handleNavigateToDashboard} />
        ) : view === "dashboard" ? (
          <AnalyticsDashboard />
        ) : (
          <ConversationsList />
        )}
      </Container>
      <BottomNavigationBar currentView={view} onTabChange={handleViewChange} />
    </Box>
  );
};

export default AuthenticatedApp;
