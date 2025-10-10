import React, { useState } from "react";
import MainApp from "./components/MainApp";
import { ThemeProvider } from "@mui/material/styles";
import { AppProvider } from "./AppContext";
import { CssBaseline, Container } from "@mui/material";
import { theme } from "./theme";
import SplashScreenComponent from "./components/SplashScreenComponent";
import Login from "./components/Login";
import AuthenticatedApp from "./components/AuthenticatedApp";
import DialogueQR from "./components/pages/DialogueQR";

export default function App() {
  const [showSplash, setShowSplash] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLoginSuccess = () => {
    setIsLoggedIn(true);
  };

  // Public route: /dialogue/:id renders share page without auth
  const dialogueMatch = typeof window !== 'undefined'
    ? window.location.pathname.match(/^\/dialogue\/([^/]+)$/)
    : null;
  if (dialogueMatch) {
    const dialogueId = dialogueMatch[1];
    return (
      <AppProvider>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Container maxWidth="md" sx={{ mt: 2, mb: 2 }}>
            <DialogueQR dialogueId={dialogueId} />
          </Container>
        </ThemeProvider>
      </AppProvider>
    );
  }

  return (
    <AppProvider>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {/* {showSplash ? (
                <SplashScreenComponent onFinish={() => setShowSplash(false)} />
            ) : !isLoggedIn ? (
                <Login onLoginSuccess={handleLoginSuccess} />
            ) : (
                <Container maxWidth="md" sx={{ mt: 2, mb: 2 }}>
                    <MainApp />
                </Container>
            )} */}
        {showSplash ? (
          <SplashScreenComponent onFinish={() => setShowSplash(false)} />
        ) : !isLoggedIn ? (
          <Login onLoginSuccess={handleLoginSuccess} />
        ) : (
          <AuthenticatedApp />
        )}
      </ThemeProvider>
    </AppProvider>
  );
}
