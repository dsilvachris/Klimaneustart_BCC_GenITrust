import React, { useState } from "react";
import {
  Box,
  Grid,
  Typography,
  TextField,
  Button,
  IconButton,
  InputAdornment,
  Paper,
  Alert,
  Collapse,
} from "@mui/material";
import {
  Person as PersonIcon,
  Lock as LockIcon,
  Visibility,
  VisibilityOff,
} from "@mui/icons-material";

import { COLORS } from "../constants";

interface LoginProps {
  onLoginSuccess: () => void;
}
let AppLogo = "/icons/generation_itrust_logo.svg";

const Login: React.FC<LoginProps> = ({ onLoginSuccess }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");

  const DUMMY_USERNAME = "admin";
  const DUMMY_PASSWORD = "password123";

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (username === DUMMY_USERNAME && password === DUMMY_PASSWORD) {
      onLoginSuccess();
    } else {
      setError("Invalid username or password.");
    }
  };

  const handleUsernameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(e.target.value);
    if (error) {
      setError("");
    }
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
    if (error) {
      setError("");
    }
  };

  return (
    <Grid container component="main" sx={{ height: "100vh" }}>
      {/* Branding Section */}
      <Grid
        item
        xs={false}
        sm={4}
        md={7}
        sx={{
          display: { xs: "none", lg: "flex" },
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          textAlign: "center",
          paddingBottom: 15,
          backgroundColor: "background.paper",
        }}
      >
        <Box display="flex" alignItems="center" justifyContent="center" mb={3}>
          <Box
            component="img"
            src={AppLogo}
            alt="Logo"
            sx={{
              width: { xs: 50, sm: 80 },
              height: { xs: 50, sm: 80 },
              // borderRadius: "16px",
              mb: 4,
            }}
          />
          <Typography
            variant="h2"
            component="h1"
            sx={{ ml: 2, fontWeight: "bold", color: "error.main" }}
          >
            Generation iTrust
          </Typography>
        </Box>
        <Typography variant="h4" color="text.secondary" sx={{ mb: 4 }}>
          Sag doch mal,Berlin
        </Typography>
        <Box
          sx={{
            height: "2px",
            width: "40vw",
            backgroundColor: COLORS.green3,
            opacity: 0.5,
            borderRadius: "2px",
          }}
        />
        <Typography variant="h6" color="text.secondary" sx={{ mb: 4 }}>
          Hören, Reden, Mitgestalten
        </Typography>
      </Grid>

      {/* Form Section */}
      <Grid item xs={12} lg={5} component={Paper} elevation={6} square>
        <Box
          sx={{
            my: 8,
            mx: 4,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Box
            sx={{
              display: { xs: "flex", lg: "none" },
              alignItems: "center",
              mb: 4,
              flexDirection: "column",
            }}
          >
            <Box
              component="img"
              src={AppLogo}
              alt="Logo"
              sx={{
                width: { xs: 150, sm: 200 },
                height: { xs: 150, sm: 200 },
                borderRadius: "16px",
                mb: 2,
              }}
            />
            <Typography
              component="h1"
              variant="h1"
              sx={{ ml: 1, fontWeight: "bold", color: "error.main" }}
            >
              Generation iTrust
            </Typography>
          </Box>
          <Typography component="h2" variant="h4" sx={{ mb: 1 }}>
            Welcome Back
          </Typography>
          <Typography color="text.secondary" sx={{ mb: 2 }}>
            Please login to your account to continue.
          </Typography>
          <Box
            component="form"
            noValidate
            onSubmit={handleLogin}
            sx={{ mt: 1, width: "100%" }}
          >
            <Collapse in={!!error}>
              <Alert
                severity="error"
                sx={{ mb: 2 }}
                onClose={() => setError("")}
              >
                {error}
              </Alert>
            </Collapse>
            <TextField
              margin="normal"
              required
              fullWidth
              id="username"
              label="Username"
              name="username"
              autoComplete="username"
              autoFocus
              variant="filled"
              value={username}
              onChange={handleUsernameChange}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <PersonIcon color="action" />
                  </InputAdornment>
                ),
              }}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type={showPassword ? "text" : "password"}
              id="password"
              autoComplete="current-password"
              variant="filled"
              value={password}
              onChange={handlePasswordChange}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <LockIcon color="action" />
                  </InputAdornment>
                ),
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={() => setShowPassword(!showPassword)}
                      onMouseDown={(e) => e.preventDefault()}
                      edge="end"
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              style={{ backgroundColor: COLORS.green3 }}
              sx={{ mt: 3, mb: 2, py: 1.5 }}
            >
              Login
            </Button>
          </Box>
        </Box>
      </Grid>
    </Grid>
  );
};

export default Login;
