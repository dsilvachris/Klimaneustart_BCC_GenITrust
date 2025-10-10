
import React from 'react';
import { Paper, Typography, Box } from '@mui/material';

interface StatCardProps {
    title: string;
    value: string | number;
    icon: React.ReactElement;
}

const StatCard: React.FC<StatCardProps> = ({ title, value, icon }) => {
    return (
        <Paper 
            variant="outlined" 
            sx={{ 
                p: 2, 
                display: 'flex', 
                alignItems: 'center', 
                height: '100%',
                borderRadius: 2
            }}
        >
            <Box sx={{ 
                mr: 2, 
                p: 1.5,
                bgcolor: 'success.main',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'primary.contrastText'
            }}>
                {icon}
            </Box>
            <Box>
                <Typography variant="h4" component="p" fontWeight="bold">
                    {value}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    {title}
                </Typography>
            </Box>
        </Paper>
    );
};

export default StatCard;
