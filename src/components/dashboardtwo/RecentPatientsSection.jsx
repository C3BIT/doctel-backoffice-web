import { Box, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';

const StatusChip = styled(Box)(({ bgcolor }) => ({
    backgroundColor: bgcolor,
    color: '#fff',
    borderRadius: 12,
    padding: '4px 12px',
    fontSize: '0.75rem',
    display: 'inline-block',
}));

const RecentPatientsSection = () => {
    const recentPatients = [
        { id: '01', name: 'Sakia Chowdhury', status: 'Completed' },
        { id: '02', name: 'Rakib Anam', status: 'Completed' },
        { id: '03', name: 'Suhel Ahmad', status: 'Pending' },
        { id: '04', name: 'Sinthiya', status: 'Pending' },
        { id: '05', name: 'Kabba', status: 'Completed' },
        { id: '02', name: 'Anonta Aslam', status: 'Completed' },
    ];

    return (
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
    );
};

export default RecentPatientsSection;