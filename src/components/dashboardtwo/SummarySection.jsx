import { Box, Typography } from '@mui/material';

const SummarySection = () => {
    const summaryData = [
        { id: "01", title: "Total Completed Call", value: "820", color: "#1890FF" },
        { id: "02", title: "Total Dropped Call", value: "20", color: "#00D097" },
        { id: "03", title: "Total Prescription", value: "20", color: "#8E44AD" },
        { id: "03", title: "Total Hour Spent", value: "120", color: "#FF9800" }
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
    );
};

export default SummarySection;