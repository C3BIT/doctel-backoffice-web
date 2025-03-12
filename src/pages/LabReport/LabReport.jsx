import React from "react";
import {
    ChevronLeft,
    ChevronRight,
    Visibility,
    Edit,
    Delete,
} from "@mui/icons-material";
import PermIdentityIcon from "@mui/icons-material/PermIdentity";
import {
    Box,
    Button,
    Typography,
    Divider,
    Paper,
    IconButton,
    Pagination,
    useMediaQuery,
    useTheme,
} from "@mui/material";

const LabReport = () => {
    const labReports = [
        { id: 1, date: "12 October 2022" },
        { id: 2, date: "22 October 2022" },
        { id: 3, date: "27 October 2022" },
        { id: 4, date: "31 October 2022" },
        { id: 5, date: "5 November 2022" },
        { id: 6, date: "10 November 2022" },
        { id: 7, date: "15 November 2022" },
        { id: 8, date: "22 November 2022" },
        { id: 9, date: "29 November 2022" },
        { id: 10, date: "5 December 2022" },
        { id: 11, date: "12 December 2022" },
        { id: 12, date: "19 December 2022" },
    ];

    // Current page state
    const [currentPage, setCurrentPage] = React.useState(1);
    const itemsPerPage = 4;

    // Calculate total pages
    const totalPages = Math.ceil(labReports.length / itemsPerPage);

    // Get current lab reports
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = labReports.slice(indexOfFirstItem, indexOfLastItem);

    // Change page
    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    // Previous page
    const goToPreviousPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };

    // Next page
    const goToNextPage = () => {
        if (currentPage < totalPages) {
            setCurrentPage(currentPage + 1);
        }
    };

    // Responsive width
    const theme = useTheme();
    const isLargeDevice = useMediaQuery(theme.breakpoints.up("lg"));

    return (
        <Box
            sx={{
                width: isLargeDevice ? "80%" : "100%",
                margin: "0 auto",
                padding: "16px",
                fontFamily: "sans-serif",
            }}
        >
            <Box
                sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "flex-start",
                    marginBottom: "16px",
                }}
            >
                <Box>
                    <Button
                        startIcon={<ChevronLeft />}
                        sx={{
                            color: "#3b82f6",
                            backgroundColor: "#e5e7eb",
                            borderRadius: "6px",
                            textTransform: "none",
                            fontSize: "14px",
                            padding: "8px 12px",
                            marginBottom: "8px",
                        }}
                    >
                        Back
                    </Button>
                    <Typography
                        variant="h4"
                        sx={{ color: "#10b981", fontWeight: "500", marginBottom: "4px", marginTop: "15px" }}
                    >
                        Lab Report
                    </Typography>
                    <Typography
                        variant="body2"
                        sx={{ color: "#6b7280", fontSize: "14px" }}
                    >
                        List of your lab reports
                    </Typography>
                </Box>
                <Button
                    variant="contained"
                    sx={{
                        backgroundColor: "#3b82f6",
                        color: "#ffffff",
                        borderRadius: "6px",
                        textTransform: "none",
                        fontSize: "14px",
                        padding: "8px 16px",
                    }}
                >
                    Upload
                </Button>
            </Box>

            {/* Divider */}
            <Divider sx={{ borderColor: "#d1d5db", marginBottom: "16px" }} />

            {/* Lab Reports list */}
            <Box sx={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                {currentItems.map((report) => (
                    <Paper
                        key={report.id}
                        sx={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "space-between",
                            backgroundColor: "#f3f4f6",
                            borderRadius: "8px",
                            padding: "16px",
                            boxShadow: "none",
                        }}
                    >
                        <Box sx={{ display: "flex", alignItems: "center", gap: "16px" }}>
                            <PermIdentityIcon
                                sx={{
                                    width: "40px",
                                    height: "40px",
                                    backgroundColor: "white",
                                    border: "1px solid #3b82f6",
                                    borderRadius: "6px",
                                    color: "#3b82f6",
                                    padding: "8px",
                                }}
                            />
                            <Typography
                                variant="body1"
                                sx={{ color: "#3b82f6", fontWeight: "500" }}
                            >
                                {report.date}
                            </Typography>
                        </Box>
                        <Box sx={{ display: "flex", gap: "8px" }}>
                            <IconButton
                                sx={{
                                    width: "40px",
                                    height: "40px",
                                    backgroundColor: "#ECFFFA",
                                    color: "#3b82f6",
                                    borderRadius: 1,
                                    "&:hover": { backgroundColor: "#d1d5db" },
                                }}
                            >
                                <Visibility fontSize="small" />
                            </IconButton>
                            <IconButton
                                sx={{
                                    width: "40px",
                                    height: "40px",
                                    backgroundColor: "#FFEAD8",
                                    color: "#f59e0b",
                                    borderRadius: 1,
                                    "&:hover": { backgroundColor: "#fde68a" },
                                }}
                            >
                                <Edit fontSize="small" />
                            </IconButton>
                            <IconButton
                                sx={{
                                    width: "40px",
                                    height: "40px",
                                    backgroundColor: "#FFECEA",
                                    color: "#ef4444",
                                    borderRadius: 1,
                                    "&:hover": { backgroundColor: "#fecaca" },
                                }}
                            >
                                <Delete fontSize="small" />
                            </IconButton>
                        </Box>
                    </Paper>
                ))}
            </Box>

            {/* Pagination */}
            <Box
                sx={{
                    display: "flex",
                    justifyContent: "flex-end",
                    alignItems: "center",
                    marginTop: "24px",
                    gap: "8px",
                }}
            >
                {/* Previous Button */}
                <IconButton
                    onClick={goToPreviousPage}
                    disabled={currentPage === 1}
                    sx={{
                        width: "32px",
                        height: "32px",
                        border: "1px solid #d1d5db",
                        color: "#6b7280",
                        borderRadius: "4px",
                        "&:hover": { backgroundColor: "#f3f4f6" },
                    }}
                >
                    <ChevronLeft fontSize="small" />
                </IconButton>

                {/* Pagination */}
                <Pagination
                    count={totalPages}
                    page={currentPage}
                    onChange={(event, page) => paginate(page)}
                    shape="rounded"
                    size="small"
                    sx={{
                        "& .MuiPaginationItem-root": {
                            border: "1px solid #d1d5db",
                            color: "#6b7280",
                            minWidth: "32px",
                            height: "32px",
                            borderRadius: "4px",
                            "&:hover": { backgroundColor: "#f3f4f6" },
                        },
                        "& .Mui-selected": {
                            backgroundColor: "#3b82f6",
                            color: "white",
                            border: "none",
                            "&:hover": { backgroundColor: "#2563eb" },
                        },
                    }}
                />

                {/* Next Button */}
                <IconButton
                    onClick={goToNextPage}
                    disabled={currentPage === totalPages}
                    sx={{
                        width: "32px",
                        height: "32px",
                        border: "1px solid #d1d5db",
                        color: "#6b7280",
                        borderRadius: "4px",
                        "&:hover": { backgroundColor: "#f3f4f6" },
                    }}
                >
                    <ChevronRight fontSize="small" />
                </IconButton>
            </Box>
        </Box>
    );
};

export default LabReport;