import { Box, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const StyledPaper = styled(Box)(({ theme }) => ({
    padding: theme.spacing(3),
    borderRadius: 16,
    boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.05)',
    height: '100%',
    backgroundColor: 'white'
}));

const ChartSection = () => {
    const chartData = [
        { name: 'Monday', earnings: 12 },
        { name: 'Tuesday', earnings: 18 },
        { name: 'Wednesday', earnings: 8 },
        { name: 'Thursday', earnings: 5 },
        { name: 'Friday', earnings: 11 },
        { name: 'Saturday', earnings: 14 },
        { name: 'Sunday', earnings: 22 },
    ];

    return (
        <StyledPaper>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                    Daily Earning
                </Typography>
            </Box>
            <Box sx={{ height: 300 }}>
                <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={chartData}>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} />
                        <XAxis dataKey="name" />
                        <YAxis ticks={[0, 5, 10, 15, 20, 25, 30]} />
                        <Tooltip />
                        <Bar dataKey="earnings" fill="#0096da" radius={[4, 4, 0, 0]} />
                    </BarChart>
                </ResponsiveContainer>
            </Box>
        </StyledPaper>
    );
};

export default ChartSection;