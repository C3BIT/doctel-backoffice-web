import React from "react";
import {
    ChevronLeft,
    Visibility,
    Edit,
    Delete,
} from "@mui/icons-material";
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
import vector5 from '../../assets/Vector(5).png';
import vector6 from '../../assets/Vector (6).png';
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
    const [currentPage, setCurrentPage] = React.useState(1);
    const itemsPerPage = 4;
    const totalPages = Math.ceil(labReports.length / itemsPerPage);
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = labReports.slice(indexOfFirstItem, indexOfLastItem);
    const paginate = (pageNumber) => setCurrentPage(pageNumber);
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
            {/* Header with back button */}
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
                        sx={{
                            color: "#10b981",
                            fontWeight: "500",
                            marginBottom: "4px",
                            marginTop: "15px",
                        }}
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
                            <Box
                                sx={{
                                    width: "30px",
                                    height: "30px",
                                    borderRadius: "6px",
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",

                                }}
                            >
                                <Box
                                    sx={{
                                        position: "relative",
                                        display: "inline-block",
                                    }}
                                >
                                    <Box
                                        component="img"
                                        src={vector5}
                                        alt="Document"
                                        sx={{
                                            width: "30px",
                                            height: "30px",
                                        }}
                                    />
                                    <Box
                                        component="img"
                                        src={vector6}
                                        alt="Rx Symbol"
                                        sx={{
                                            position: "absolute",
                                            top: "50%",
                                            left: "50%",
                                            transform: "translate(-50%, -50%)",
                                            width: "20px",
                                            height: "20px",
                                        }}
                                    />
                                </Box>
                            </Box>
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
                }}
            >
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
                            margin: "0 4px",
                            "&:hover": { backgroundColor: "#f3f4f6" },
                        },
                        "& .Mui-selected": {
                            backgroundColor: "#0052A8",
                            color: "white",
                            border: "none",
                            "&:hover": { backgroundColor: "#2563eb" },
                        },
                    }}
                />
            </Box>
        </Box>
    );
};
export default LabReport;