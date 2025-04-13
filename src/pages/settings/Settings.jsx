import { Box, Typography, Grid, Paper,  } from '@mui/material';
import { Assessment, Description, CheckCircleOutline } from '@mui/icons-material';
import { styled } from '@mui/material/styles';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const Settings = () => {
    // Card data
    const cards = [
        {
            title: "Total Call",
            value: "820",
            icon: <Assessment />,
            iconBg: "#FFD6D9",
            iconColor: "#FF6B7A",
            color: "#000",
            bg: "#FFE2E5"
        },
        {
            title: "Today's Call",
            value: "12",
            icon: <Description />,
            iconBg: "#FFF8E0",
            iconColor: "#FFCE56",
            status: "+5% from yesterday",
            color: "#000",
            bg: "#FFF4DE"
        },
        {
            title: "Pending Call",
            value: "5",
            icon: <CheckCircleOutline />,
            iconBg: "#E0FFE9",
            iconColor: "#4CAF50",
            status: "+1.2% from yesterday",
            color: "#000",
            bg: "#DCFCE7"
        }
    ];

    // Summary data
    const summaryData = [
        { id: "01", title: "Total Completed Call", value: "820", color: "#1890FF" },
        { id: "02", title: "Total Dropped Call", value: "20", color: "#00D097" },
        { id: "03", title: "Total Prescription", value: "20", color: "#8E44AD" },
        { id: "03", title: "Total Hour Spent", value: "120", color: "#FF9800" }
    ];

    const StyledPaper = styled(Paper)(({ theme }) => ({
        padding: theme.spacing(3),
        borderRadius: 16,
        boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.05)',
        height: '100%',
    }));

    const StatusChip = styled(Box)(({ bgcolor }) => ({
        backgroundColor: bgcolor,
        color: '#fff',
        borderRadius: 12,
        padding: '4px 12px',
        fontSize: '0.75rem',
        display: 'inline-block',
    }));

    // Updated chart data to fit the 0-30 scale
    const chartData = [
        { name: 'Monday', earnings: 12 },
        { name: 'Tuesday', earnings: 18 },
        { name: 'Wednesday', earnings: 8 },
        { name: 'Thursday', earnings: 5 },
        { name: 'Friday', earnings: 11 },
        { name: 'Saturday', earnings: 14 },
        { name: 'Sunday', earnings: 22 },
    ];

    const recentPatients = [
        { id: '01', name: 'Sakia Chowdhury', status: 'Completed' },
        { id: '02', name: 'Rakib Anam', status: 'Completed' },
        { id: '03', name: 'Suhel Ahmad', status: 'Pending' },
        { id: '04', name: 'Sinthiya', status: 'Pending' },
        { id: '05', name: 'Kabba', status: 'Completed' },
        { id: '02', name: 'Anonta Aslam', status: 'Completed' },
    ];

    return (
        <div>
            <Box sx={{ p: 3 }}>
                <Grid container spacing={3}>
                    {/* Cards Section */}
                    <Grid item xs={12} md={12} lg={7}>
                        <Box sx={{
                            p: 3,
                            borderRadius: 2,
                            height: "100%",
                            bgcolor: "white",
                            boxShadow: "0px 1px 3px rgba(0, 0, 0, 0.1)"
                        }}>
                            <Grid container spacing={2}>
                                {cards.map((card, index) => (
                                    <Grid item xs={12} sm={4} key={index}>
                                        <Box
                                            sx={{
                                                p: 2,
                                                height: "100%",
                                                bgcolor: card.bg,
                                                borderRadius: 2,
                                                boxShadow: "none",
                                                position: "relative",
                                                overflow: "hidden"
                                            }}
                                        >
                                            <Box
                                                sx={{
                                                    width: 40,
                                                    height: 40,
                                                    borderRadius: "50%",
                                                    bgcolor: card.iconBg,
                                                    display: "flex",
                                                    alignItems: "center",
                                                    justifyContent: "center",
                                                    mb: 1
                                                }}
                                            >
                                                <Box sx={{ color: card.iconColor }}>
                                                    {card.icon}
                                                </Box>
                                            </Box>
                                            <Typography variant="h4" fontWeight="bold" sx={{ my: 1 }}>
                                                {card.value}
                                            </Typography>
                                            <Typography variant="body2" fontWeight="bold" color="text.secondary">
                                                {card.title}
                                            </Typography>
                                            {card.status && (
                                                <Typography variant="caption" fontWeight="bold" color="primary" sx={{ display: "block", mt: 0.5 }}>
                                                    {card.status}
                                                </Typography>
                                            )}
                                        </Box>
                                    </Grid>
                                ))}
                            </Grid>
                        </Box>
                    </Grid>

                    {/* Summary Section */}
                    <Grid item xs={12} md={12} lg={5}>
                        <Box sx={{
                            p: 3,
                            borderRadius: 2,
                            height: "100%",
                            bgcolor: "white",
                            boxShadow: "0px 1px 3px rgba(0, 0, 0, 0.1)"
                        }}>
                            <Typography variant="h6" fontWeight="bold" sx={{ mb: 2 }}>
                                Summary
                            </Typography>

                            {summaryData.map((item, index) => (
                                <Box
                                    key={index}
                                    sx={{
                                        display: "flex",
                                        alignItems: "center",
                                        justifyContent: "space-between",
                                        py: 2,
                                        borderTop: index > 0 ? "1px solid #EDF2F6" : "none"
                                    }}
                                >
                                    <Box sx={{ display: "flex", alignItems: "center" }}>
                                        <Typography variant="body2" color="text.secondary" sx={{ mr: 2, width: 24 }}>
                                            {item.id}
                                        </Typography>
                                        <Typography variant="body2" color="text.secondary">
                                            {item.title}
                                        </Typography>
                                    </Box>
                                    <Typography variant="h6" fontWeight="medium" sx={{ color: item.color }}>
                                        {item.value}
                                    </Typography>
                                </Box>
                            ))}
                        </Box>
                    </Grid>
                </Grid>
            </Box>
            <Box sx={{ p: 3 }}>
                <Grid container spacing={3}>
                    {/* Chart Section */}
                    <Grid item xs={12} md={12} lg={7}>
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
                    </Grid>

                    {/* Recent Patients Section */}
                    <Grid item xs={12} md={12} lg={5}>
                        <Box sx={{
                            p: 3,
                            borderRadius: 2,
                            height: "100%",
                            bgcolor: "white",
                            boxShadow: "0px 1px 3px rgba(0, 0, 0, 0.1)"
                        }}>
                            <Typography variant="h6" fontWeight="bold" sx={{ mb: 2 }}>
                                Recent Patients
                            </Typography>

                            {recentPatients.map((patient, index) => (
                                <Box
                                    key={index}
                                    sx={{
                                        display: "flex",
                                        alignItems: "center",
                                        justifyContent: "space-between",
                                        py: 2,
                                        borderTop: index > 0 ? "1px solid #EDF2F6" : "none"
                                    }}
                                >
                                    <Box sx={{ display: "flex", alignItems: "center" }}>
                                        <Typography variant="body2" color="text.secondary" sx={{ mr: 2, width: 24 }}>
                                            {patient.id}
                                        </Typography>
                                        <Typography variant="body2" color="text.secondary">
                                            {patient.name}
                                        </Typography>
                                    </Box>
                                    <StatusChip
                                        bgcolor={patient.status === 'Completed' ? '#4caf50' : '#ff9800'}
                                    >
                                        {patient.status}
                                    </StatusChip>
                                </Box>
                            ))}
                        </Box>
                    </Grid>
                </Grid>
            </Box>
        </div>
    );
};

export default Settings;