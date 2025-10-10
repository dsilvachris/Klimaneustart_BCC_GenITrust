import React, { useState } from "react";
import {
  Box,
  Typography,
  Button,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Checkbox,
  FormControlLabel,
  TextField,
  IconButton,
  Paper,
  useTheme,
  Grow,
} from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { AppProps } from "../../types";
import { TOPIC_DEFINITIONS } from "../../constants";
import { getString } from "../../stringutils";
import { TransitionGroup } from "react-transition-group";

const Step2Topics: React.FC<AppProps> = ({
  data,
  updateData,
  onNext,
  onBack,
}) => {
  const [activeTopicId, setActiveTopicId] = useState<string | null>(null);
  const theme = useTheme();

  const handleOptionToggle = (
    topicId: string,
    subGroupId: string,
    optionId: string
  ) => {
    const topicDetails = data.topicDetails?.[topicId] ?? {};
    const subGroupDetails = (topicDetails as any)?.[subGroupId] ?? {
      selectedOptions: [],
      customNote: "",
    };
    const selectedOptions = subGroupDetails.selectedOptions.includes(optionId)
      ? subGroupDetails.selectedOptions.filter((id: string) => id !== optionId)
      : [...subGroupDetails.selectedOptions, optionId];
    updateData({
      topicDetails: {
        ...data.topicDetails,
        [topicId]: {
          ...(topicDetails as any),
          [subGroupId]: { ...subGroupDetails, selectedOptions },
        },
      },
    });
  };

  const handleNoteChange = (
    topicId: string,
    subGroupId: string,
    text: string
  ) => {
    const topicDetails = data.topicDetails?.[topicId] ?? {};
    const subGroupDetails = (topicDetails as any)?.[subGroupId] ?? {
      selectedOptions: [],
      customNote: "",
    };
    updateData({
      topicDetails: {
        ...data.topicDetails,
        [topicId]: {
          ...(topicDetails as any),
          [subGroupId]: { ...subGroupDetails, customNote: text },
        },
      },
    });
  };

  const renderTopicDetails = (topicId: string) => {
    const topic = TOPIC_DEFINITIONS.find((t) => t.id === topicId);
    if (!topic) return null;

    // A simple note-taking topic
    if (topic.type === "notes") {
      return (
        <Box>
          <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
            <IconButton onClick={() => setActiveTopicId(null)}>
              <ArrowBackIcon />
            </IconButton>
            <Typography variant="h5" component="h2">
              {topic.name}
            </Typography>
          </Box>
          <TextField
            fullWidth
            multiline
            rows={8}
            label="Notizen..."
            value={(data.topicDetails[topic.id] as any)?.customNote || ""}
            onChange={(e) =>
              updateData({
                topicDetails: {
                  ...data.topicDetails,
                  [topic.id]: { customNote: e.target.value, selectedOptions: [] },
                },
              })
            }
            margin="normal"
            variant="outlined"
          />
        </Box>
      );
    }

    return (
      <Box>
        <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
          <IconButton onClick={() => setActiveTopicId(null)}>
            <ArrowBackIcon />
          </IconButton>
          <Typography variant="h5" component="h2">
            {topic.name}
          </Typography>
        </Box>
        {topic.subGroups?.map((sub) => (
          <Accordion key={sub.id} defaultExpanded>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Typography variant="h6">{sub.name}</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Grid container spacing={1}>
                {sub.options.map((option) => (
                  <Grid xs={12} sm={6} key={option.id}>
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={
                            (data.topicDetails[topic.id] as any)?.[
                              sub.id
                            ]?.selectedOptions.includes(option.id) || false
                          }
                          onChange={() =>
                            handleOptionToggle(topic.id, sub.id, option.id)
                          }
                        />
                      }
                      label={option.name}
                    />
                  </Grid>
                ))}
              </Grid>
              <TextField
                fullWidth
                multiline
                rows={2}
                label="Notizen..."
                value={
                  (data.topicDetails?.[topic.id] as any)?.[sub.id]
                    ?.customNote || ""
                }
                onChange={(e) =>
                  handleNoteChange(topic.id, sub.id, e.target.value)
                }
                margin="normal"
                variant="outlined"
              />
            </AccordionDetails>
          </Accordion>
        ))}
      </Box>
    );
  };

  const isSidebarMode = activeTopicId !== null;
  const ANIMATION_SPEED = "0.5s";

  const sidebarContainerStyles = {
    display: "grid",
    gridTemplateColumns: { xs: "1fr", sm: isSidebarMode ? "1fr" : "1fr 1fr" },
    gap: 2,
    transition: `all ${ANIMATION_SPEED} ease-in-out`,
    width: isSidebarMode ? { xs: "100px", sm: "140px" } : "100%",
    flexShrink: 0,
    ...(isSidebarMode && {
      display: "flex",
      flexDirection: "column",
      backgroundColor: "grey.100",
      borderRight: 1,
      borderColor: "divider",
      padding: 1,
      height: "100%",
      overflow: "auto",
    }),
  };

  const topicItemStyles = (topicId: string) => {
    const isActive = activeTopicId === topicId;
    return {
      display: "flex",
      alignItems: "center",
      p: 2,
      cursor: "pointer",
      borderRadius: 2,
      transition: `all ${ANIMATION_SPEED} ease-in-out`,
      border: "1px solid",
      borderColor: "grey.300",

      // Sidebar Mode Styles
      ...(isSidebarMode
        ? {
            flexDirection: "column",
            justifyContent: "center",
            height: { xs: "80px", sm: "100px" },
            width: { xs: "80px", sm: "100px" },
            p: 1,
            backgroundColor: isActive ? "primary.main" : "transparent",
            color: isActive ? "primary.contrastText" : "text.secondary",
            borderColor: isActive ? "primary.main" : "transparent",
            position: "relative",
            "::after": {
              content: '""',
              display: isActive ? "block" : "none",
              position: "absolute",
              top: "50%",
              right: { sm: "-9px" },
              left: { xs: "auto", sm: "auto" },
              transform: "translateY(-50%)",
              width: 0,
              height: 0,
              borderTop: "8px solid transparent",
              borderBottom: "8px solid transparent",
              borderLeft: { sm: `8px solid ${theme.palette.primary.main}` },
              transition: `opacity 0.3s ${ANIMATION_SPEED}`,
            },
            "&:hover": {
              backgroundColor: isActive ? "primary.dark" : "action.hover",
            },
          }
        : {
            // Grid Mode Styles
            flexDirection: "row",
            justifyContent: "flex-start",
            "&:hover": {
              backgroundColor: "action.hover",
              borderColor: "primary.main",
            },
          }),
    };
  };

  const topicIconStyles = {
    transition: `font-size ${ANIMATION_SPEED} ease-in-out`,
    fontSize: isSidebarMode ? 32 : 24,
  };

  const topicTextStyles = {
    transition: `opacity 0.2s, max-width ${ANIMATION_SPEED} ease-in-out, margin-left ${ANIMATION_SPEED} ease-in-out`,
    opacity: isSidebarMode ? 0 : 1,
    maxWidth: isSidebarMode ? "0px" : "200px",
    marginLeft: isSidebarMode ? 0 : theme.spacing(2),
    overflow: "hidden",
    whiteSpace: "nowrap",
    fontWeight: "bold",
    lineHeight: 1.2,
    textAlign: "center",
    color: "text.primary",
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
          Step 3 of 9: Besprochen...
        </Typography>
      </Box>

      <Box
        sx={{
          display: "flex",
          flexDirection: isSidebarMode ? { xs: "column", sm: "row" } : "column",
          minHeight: "calc(100vh - 120px)",
        }}
      >
        {/* Header for Grid mode */}
        {!isSidebarMode && (
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
              Wähle alle Themen, die im Dialog erwähnt wurden
            </Typography>
          </Paper>
        )}

        <Box sx={{ display: "flex", flexGrow: 1, gap: 2, minHeight: 0 }}>
          {/* Topic Selection Container */}
          <Box sx={{
            display: isSidebarMode ? "flex" : "grid",
            gridTemplateColumns: { xs: "1fr", sm: "1fr 1fr" },
            flexDirection: isSidebarMode ? "column" : undefined,
            gap: 2,
            width: isSidebarMode ? { xs: "100px", sm: "140px" } : "100%",
            flexShrink: 0,
            ...(isSidebarMode && {
              backgroundColor: "grey.100",
              borderRight: 1,
              borderColor: "divider",
              padding: 1,
              height: "100%",
              overflow: "auto",
            }),
          }}>
            {TOPIC_DEFINITIONS.map((topic) => {
              const Icon = topic.icon;
              const isSelected = activeTopicId === topic.id;
              return (
                <Paper
                  key={topic.id}
                  elevation={0}
                  onClick={() => setActiveTopicId(topic.id)}
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    p: 2,
                    cursor: "pointer",
                    borderRadius: 2,
                    bgcolor: "#FFFFFF",
                    border: "1px solid #ddd",
                    height: isSidebarMode ? { xs: "80px", sm: "100px" } : "auto",
                    width: isSidebarMode ? { xs: "80px", sm: "100px" } : "auto",
                    flexDirection: isSidebarMode ? "column" : "row",
                    justifyContent: isSidebarMode ? "center" : "flex-start",
                    "&:hover": { bgcolor: "#F5F5F5" }
                  }}
                >
                  <Icon sx={{ 
                    fontSize: isSidebarMode ? 32 : 24, 
                    mr: isSidebarMode ? 0 : 2,
                    color: "#666"
                  }} />
                  {!isSidebarMode && (
                    <Typography variant="h6" sx={{ fontWeight: "normal" }}>
                      {topic.name}
                    </Typography>
                  )}
                </Paper>
              );
            })}
          </Box>

          {/* Details Pane */}
          <Box
            sx={{
              flex: 1,
              backgroundColor: "background.paper",
              position: "relative",
              overflow: "hidden",
            }}
          >
            <TransitionGroup component={null}>
              {activeTopicId && (
                <Grow key={activeTopicId} timeout={500} appear>
                  <Box
                    sx={{
                      position: "absolute",
                      top: 0,
                      left: 0,
                      right: 0,
                      bottom: 0,
                      p: { xs: 1, sm: 2 },
                      overflowY: "auto",
                    }}
                  >
                    {renderTopicDetails(activeTopicId)}
                  </Box>
                </Grow>
              )}
            </TransitionGroup>
          </Box>
        </Box>
      </Box>

      {/* Navigation buttons */}
      <Box sx={{ display: "flex", justifyContent: "space-between", mt: 4 }}>
        <Button
          variant="contained"
          onClick={onBack}
          sx={{ 
            bgcolor: "#FFFFFF", 
            color: "#333",
            border: "1px solid #ddd",
            "&:hover": { bgcolor: "#F5F5F5" },
            px: 3
          }}
        >
          Zurück
        </Button>
        
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

export default Step2Topics;