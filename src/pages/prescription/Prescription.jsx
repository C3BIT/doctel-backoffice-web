import {
    Box,
    Paper,
    Typography,
    useTheme,
    useMediaQuery,
    Chip,
} from "@mui/material";
import { styled } from "@mui/material/styles";

const StyledPaper = styled(Paper)(({ theme }) => ({
    padding: theme.spacing(3),
    borderRadius: 16,
    boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.05)",
    height: "100%",
    [theme.breakpoints.down('sm')]: {
        padding: theme.spacing(2),
    },
}));

const StatusChip = styled(Chip)(({ theme, status }) => {
    let bgColor = "#4caf50";
    let textColor = "#ffffff";

    if (status === "Dropped") {
        bgColor = "#ff9800";
    } else if (status === "Pending") {
        bgColor = "#2196f3";
    }

    return {
        backgroundColor: bgColor,
        color: textColor,
        borderRadius: 16,
        fontWeight: 500,
        fontSize: "0.75rem",
        minWidth: 80,
        [theme.breakpoints.down('sm')]: {
            minWidth: 70,
            fontSize: "0.65rem",
        },
    };
});

const PaginationButton = styled(Box)(({ theme, active }) => ({
    padding: theme.spacing(0.5, 1.5),
    border: active ? "none" : "1px solid #e0e0e0",
    borderRadius: 4,
    backgroundColor: active ? "#20ACE2" : "transparent", 
    color: active ? "white" : theme.palette.text.secondary,
    cursor: "pointer",
    fontSize: "0.875rem",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    minWidth: 32,
    height: 32,
    [theme.breakpoints.down('sm')]: {
        padding: theme.spacing(0.5, 1),
        minWidth: 28,
        height: 28,
        fontSize: "0.75rem",
    },
}));

const summaryData = [
    { id: "01", title: "Total Patient", value: 820, color: "#3498db" },
    { id: "02", title: "Call Completed", value: 220, color: "#2ecc71" },
    { id: "03", title: "Call Dropped", value: 20, color: "#f39c12" },
];

const prescriptionData = [
    {
        id: "01",
        name: "Sakila Chowdhury",
        date: "12 December 2023",
        time: "05:44 PM",
        status: "Completed",
    },
    {
        id: "02",
        name: "Ashique Mahmud",
        date: "18 December 2023",
        time: "05:44 PM",
        status: "Completed",
    },
    {
        id: "03",
        name: "Subrata Roy",
        date: "22 December 2023",
        time: "05:44 PM",
        status: "Dropped",
    },
    {
        id: "04",
        name: "Abdul Alim Mia",
        date: "22 December 2023",
        time: "05:44 PM",
        status: "Completed",
    },
    {
        id: "05",
        name: "Sohana Chowdhury",
        date: "22 December 2023",
        time: "05:44 PM",
        status: "Dropped",
    },
    {
        id: "06",
        name: "Rony Saha",
        date: "22 December 2023",
        time: "05:44 PM",
        status: "Dropped",
    },
];

function Prescription() {
    const theme = useTheme();
    const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));

    return (
        <Box sx={{
            minHeight: "100vh",
            p: { xs: 2, sm: 3, md: 4 },
            borderRadius: 4,
            fontFamily: "sans-serif",
        }}>
            <Box
                sx={{
                    display: "flex",
                    flexDirection: { xs: "column", lg: "row" },
                    gap: 3,
                }}
            >
                {/* Prescription List - 70% on lg+, full width on smaller screens */}
                <Box sx={{ 
                    flex: { xs: 1, lg: 7 },
                    minWidth: 0,
                    width: { xs: "100%", lg: "70%" },
                }}>
                    <StyledPaper>
                        {prescriptionData.map((item, index) => (
                            <Box key={item.id} sx={{ py: 1.5 }}>
                                <Box
                                    sx={{
                                        display: "flex",
                                        flexDirection: { xs: "column", sm: "row" },
                                        justifyContent: "space-between",
                                        alignItems: { xs: "flex-start", sm: "center" },
                                        gap: { xs: 1, sm: 0 },
                                    }}
                                >
                                    <Box sx={{ 
                                        display: "flex", 
                                        gap: { xs: 1, sm: 3 }, 
                                        alignItems: "center",
                                        width: { xs: "100%", sm: "auto" },
                                    }}>
                                        <Typography
                                            variant="body2"
                                            sx={{ 
                                                color: "text.secondary", 
                                                width: "30px",
                                                fontSize: { xs: "0.875rem", sm: "1rem" },
                                            }}
                                        >
                                            {item.id}
                                        </Typography>
                                        <Typography 
                                            variant="body1" 
                                            sx={{ 
                                                fontWeight: 500,
                                                fontSize: { xs: "0.875rem", sm: "1rem" },
                                            }}
                                        >
                                            {item.name}
                                        </Typography>
                                    </Box>

                                    <Box sx={{ 
                                        display: "flex", 
                                        gap: { xs: 1, sm: 3 }, 
                                        alignItems: "center",
                                        flexWrap: "wrap",
                                    }}>
                                        <Typography
                                            variant="body2"
                                            sx={{ 
                                                color: "text.secondary",
                                                fontSize: { xs: "0.75rem", sm: "0.875rem" },
                                            }}
                                        >
                                            {isSmallScreen ? item.date.split(' ')[0] : item.date}
                                        </Typography>
                                        <Typography
                                            variant="body2"
                                            sx={{ 
                                                color: "text.secondary",
                                                fontSize: { xs: "0.75rem", sm: "0.875rem" },
                                            }}
                                        >
                                            {item.time}
                                        </Typography>
                                        <StatusChip
                                          sx={{  color: item.status === 'Completed' ? '#4ade80' : '#f97316',
                                            bgcolor: item.status === 'Completed' ? '#F0FDF4' : '#ffedd5',
                                            border: item.status === 'Completed' ? '1px solid #00E58F' : '1px solid #f97316',}}
                                            label={item.status}
                                            status={item.status}
                                            size="small"
                                        />
                                    </Box>
                                </Box>
                                {index < prescriptionData.length - 1 && (
                                    <Box sx={{ borderBottom: "1px solid #eee", mt: 1.5 }} />
                                )}
                            </Box>
                        ))}

                        {/* Pagination - Updated to show only 1, 2, 3 pages */}
                        <Box
                            sx={{
                                display: "flex",
                                flexDirection: { xs: "column", sm: "row" },
                                justifyContent: "space-between",
                                alignItems: { xs: "flex-start", sm: "center" },
                                mt: 3,
                                gap: { xs: 2, sm: 0 },
                            }}
                        >
                            <Box sx={{ 
                                order: { xs: 2, sm: 1 },
                                alignSelf: { xs: "flex-end", sm: "center" },
                            }}>
                                <Typography variant="body2" sx={{ color: "text.secondary" }}>
                                    1-50 of 1,250
                                </Typography>
                            </Box>

                            <Box sx={{ 
                                display: "flex", 
                                alignItems: "center", 
                                gap: 1,
                                order: { xs: 1, sm: 2 },
                                flexWrap: "wrap",
                            }}>
                                <PaginationButton>
                                    ‹ Back
                                </PaginationButton>

                                {[1, 2, 3].map((page) => (
                                    <PaginationButton key={page} active={page === 1}>
                                        {page}
                                    </PaginationButton>
                                ))}

                                <PaginationButton>
                                    Next ›
                                </PaginationButton>
                            </Box>

                            {!isSmallScreen && (
                                <Box sx={{ 
                                    display: "flex", 
                                    alignItems: "center", 
                                    gap: 1,
                                    order: 3,
                                }}>
                                    <Typography variant="body2" sx={{ color: "text.secondary" }}>
                                        Results per page
                                    </Typography>
                                    <PaginationButton>
                                        50 ▾
                                    </PaginationButton>
                                </Box>
                            )}
                        </Box>
                    </StyledPaper>
                </Box>

                {/* Summary - 30% on lg+, full width on smaller screens */}
                <Box sx={{ 
                    flex: { xs: 1, lg: 3 },
                    minWidth: 0,
                    width: { xs: "100%", lg: "30%" },
                }}>
                    <StyledPaper>
                        <Typography variant="h6" sx={{ 
                            fontWeight: "bold", 
                            mb: 2,
                            borderBottom: "1px solid #eee",
                            pb: 1,
                            fontSize: { xs: "1.1rem", sm: "1.25rem" },
                        }}>
                            Summary
                        </Typography>

                        {summaryData.map((item, index) => (
                            <Box key={item.id} sx={{ py: 1 }}>
                                <Box
                                    sx={{
                                        display: "flex",
                                        justifyContent: "space-between",
                                        alignItems: "center",
                                    }}
                                >
                                    <Box sx={{ display: "flex", gap: { xs: 1, sm: 2 } }}>
                                        <Typography variant="body1" sx={{ 
                                            fontSize: { xs: "0.875rem", sm: "1rem" },
                                        }}>
                                            {item.id}
                                        </Typography>
                                        <Typography variant="body1" sx={{ 
                                            fontSize: { xs: "0.875rem", sm: "1rem" },
                                        }}>
                                            {item.title}
                                        </Typography>
                                    </Box>
                                    <Typography
                                        variant="h6"
                                        sx={{ 
                                            fontWeight: "bold", 
                                            color: item.color,
                                            fontSize: { xs: "1rem", sm: "1.25rem" },
                                        }}
                                    >
                                        {item.value}
                                    </Typography>
                                </Box>
                                {index < summaryData.length - 1 && (
                                    <Box sx={{ borderBottom: "1px solid #eee", mt: 1 }} />
                                )}
                            </Box>
                        ))}
                    </StyledPaper>
                </Box>
            </Box>
        </Box>
    );
}

export default Prescription;