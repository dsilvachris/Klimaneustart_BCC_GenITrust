
import React from 'react';
import { Box, Typography, LinearProgress, Paper } from '@mui/material';

interface BarChartProps {
    title: string;
    data: { name: string; value: number }[];
}

const SimpleBarChart: React.FC<BarChartProps> = ({ title, data }) => {
    const maxValue = Math.max(...data.map(item => item.value), 0);

    return (
        <Paper variant="outlined" sx={{ p: 2, borderRadius: 2, height: '100%' }}>
            <Typography variant="h6" gutterBottom>{title}</Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                {data.map(item => (
                    <Box key={item.name}>
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.5 }}>
                            <Typography variant="body2">{item.name}</Typography>
                            <Typography variant="body2" fontWeight="bold">{item.value}</Typography>
                        </Box>
                        <LinearProgress
                            value={(item.value / maxValue) * 100}
                            variant="determinate"
                            color="success"
                            sx={{ height: 8, borderRadius: 4, backgroundColor:"error.dark"}}
                        />
                    </Box>
                ))}
            </Box>
        </Paper>
    );
};

export default SimpleBarChart;
