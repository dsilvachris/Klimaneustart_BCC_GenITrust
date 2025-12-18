import React, { useState, useEffect } from "react";
import { Box, Typography, CircularProgress, Paper, Button } from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2";
import { AnalyticsData } from "./mock_analytics_data";
import StatCard from "./StatCard";
import SimpleBarChart from "./SimpleBarChart";
import SimplePieChart from "./SimplePieChart";
import { DialerSipOutlined, PictureAsPdf } from "@mui/icons-material";
import { generateAnalyticsReport } from "../utils/pdfGenerator";
// import { Assessment, PeopleAlt, AccessTimeFilled } from '@mui/icons-material';

const API_BASE_URL = import.meta.env.PROD ? '' : 'http://localhost:3001';

const mockData: AnalyticsData = {
  totalDialogues: 12,
  totalParticipants: 28,
  avgDuration: 45,
  dialoguesByDistrict: [
    { name: 'Mitte', value: 5 },
    { name: 'Kreuzberg', value: 3 },
    { name: 'Prenzlauer Berg', value: 2 },
    { name: 'Charlottenburg', value: 2 }
  ],
  topTopics: [
    { name: 'Wohnen/Bauwende', value: 8 },
    { name: 'Mobilität', value: 6 },
    { name: 'Klimaanpassung', value: 4 },
    { name: 'Wohnen/Wärmewende', value: 3 }
  ],
  topInterestAreas: [
    { name: 'Nachhaltiges Wohnen', value: 7 },
    { name: 'Öffentlicher Verkehr', value: 5 },
    { name: 'Grüne Energie', value: 4 },
    { name: 'Stadtplanung', value: 3 }
  ],
  initiativeEngagement: {
    recommended: 24,
    selected: 18
  }
};

const getAnalyticsData = async (): Promise<AnalyticsData> => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/v1/analytics`);
    if (!response.ok) {
      throw new Error('API not available');
    }
    return response.json();
  } catch (error) {
    console.warn('Using mock data - API not available:', error);
    return mockData;
  }
};

const AnalyticsDashboard: React.FC = () => {
  const [data, setData] = useState<AnalyticsData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    getAnalyticsData()
      .then((res) => {
        setData(res);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Failed to load analytics:', err);
        setError(err.message);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "80vh",
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box sx={{ p: 3, textAlign: "center" }}>
        <Typography variant="h6" color="error" gutterBottom>
          Failed to load analytics data
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {error}
        </Typography>
      </Box>
    );
  }

  if (!data) {
    return (
      <Box sx={{ p: 3, textAlign: "center" }}>
        <Typography variant="h6" gutterBottom>
          No analytics data available
        </Typography>
      </Box>
    );
  }

  const engagementRate =
    data.initiativeEngagement.recommended > 0
      ? (
          (data.initiativeEngagement.selected /
            data.initiativeEngagement.recommended) *
          100
        ).toFixed(1)
      : 0;

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h4" component="h1" fontWeight="bold">
          Analytics Dashboard
        </Typography>
        <Button
          variant="contained"
          startIcon={<PictureAsPdf />}
          onClick={() => generateAnalyticsReport(data)}
          sx={{ bgcolor: '#e70000', '&:hover': { bgcolor: '#cc0000' } }}
        >
          Export PDF Report
        </Button>
      </Box>

      {/* Stat Cards */}
      <Grid container spacing={3} sx={{ mb: 3 }}>
        <Grid xs={12} sm={6} md={4}>
          <StatCard
            title="Total Dialogues"
            value={data.totalDialogues}
            icon={<DialerSipOutlined />}
            // icon={<Assessment />}
          />
        </Grid>
        <Grid xs={12} sm={6} md={4}>
          <StatCard
            title="Total Participants"
            value={data.totalParticipants}
            icon={<DialerSipOutlined />}
            // icon={<PeopleAlt />}
          />
        </Grid>
        <Grid xs={12} sm={6} md={4}>
          <StatCard
            title="Avg. Duration (min)"
            value={data.avgDuration}
            icon={<DialerSipOutlined />}
            // icon={<AccessTimeFilled />}
          />
        </Grid>
      </Grid>

      {/* Charts */}
      <Grid container spacing={3}>
        <Grid xs={12} md={6}>
          <SimplePieChart title="Top Discussed Topics" data={data.topTopics} />
        </Grid>
        <Grid xs={12} md={6}>
          <SimplePieChart
            title="Dialogues per District"
            data={data.dialoguesByDistrict}
          />
        </Grid>
        <Grid xs={12} md={6}>
          <SimplePieChart
            title="Top Interest Areas"
            data={data.topInterestAreas}
          />
        </Grid>
        <Grid xs={12} md={6}>
          <Paper
            variant="outlined"
            sx={{
              p: 2,
              borderRadius: 2,
              height: "100%",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
            }}
          >
            <Typography variant="h6" gutterBottom>
              Initiative Engagement
            </Typography>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-around",
                flexWrap: "wrap",
                gap: 2,
                mt: 2,
              }}
            >
              <Box sx={{ textAlign: "center" }}>
                <Typography variant="h4" fontWeight="bold">
                  {data.initiativeEngagement.recommended}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Recommended
                </Typography>
              </Box>
              <Box sx={{ textAlign: "center" }}>
                <Typography variant="h4" fontWeight="bold">
                  {data.initiativeEngagement.selected}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Selected
                </Typography>
              </Box>
              <Box sx={{ textAlign: "center" }}>
                <Typography variant="h4" fontWeight="bold" color="success.main">
                  {engagementRate}%
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Engagement Rate
                </Typography>
              </Box>
            </Box>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default AnalyticsDashboard;
