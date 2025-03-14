import React from "react";
import {ChevronLeft } from "@mui/icons-material";
import {
    Box,
    Button,
    Typography,
    Divider,
    Paper,
    Pagination,
    useMediaQuery,
    useTheme,
} from "@mui/material";
import DocumentSymbol from '../../assets/Vector(5).png';
import RxSymbol from '../../assets/Vector (6).png';
const PrescriptionReport = () => {
    const prescriptions = [
        {
            id: 1,
            doctor: "Dr. Shahriar Alam",
            patient: "Selina Sharmin",
            date: "12 Oct 2022 11:32 AM",
        },
        {
            id: 2,
            doctor: "Dr. Alamin",
            patient: "Shanta Islam",
            date: "12 Oct 2022 11:32 AM",
        },
        {
            id: 3,
            doctor: "Dr. Rana Islam",
            patient: "Ashfaqul Islam",
            date: "12 Oct 2022 11:32 AM",
        },
        {
            id: 4,
            doctor: "Dr. Shahriar Alam",
            patient: "Selina Sharmin",
            date: "12 Oct 2022 11:32 AM",
        },
        {
            id: 5,
            doctor: "Dr. Alamin",
            patient: "Shanta Islam",
            date: "12 Oct 2022 11:32 AM",
        },
        {
            id: 6,
            doctor: "Dr. Karim Ahmed",
            patient: "Nusrat Jahan",
            date: "12 Oct 2022 11:32 AM",
        },
        {
            id: 7,
            doctor: "Dr. Fatima Khan",
            patient: "Mohammad Rahman",
            date: "12 Oct 2022 11:32 AM",
        },
        {
            id: 8,
            doctor: "Dr. Hassan Ali",
            patient: "Tahmina Begum",
            date: "12 Oct 2022 11:32 AM",
        },
        {
            id: 9,
            doctor: "Dr. Nargis Akter",
            patient: "Kabir Ahmed",
            date: "12 Oct 2022 11:32 AM",
        },
        {
            id: 10,
            doctor: "Dr. Zahid Hossain",
            patient: "Rumana Akter",
            date: "12 Oct 2022 11:32 AM",
        },
    ];
    const [currentPage, setCurrentPage] = React.useState(1);
    const itemsPerPage = 5;
    const totalPages = Math.ceil(prescriptions.length / itemsPerPage);
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = prescriptions.slice(indexOfFirstItem, indexOfLastItem);
    const paginate = (pageNumber) => setCurrentPage(pageNumber);
    const theme = useTheme();
    const isLargeDevice = useMediaQuery(theme.breakpoints.up("lg"));

    return (
        <Box
            sx={{
                width: isLargeDevice ? "80%" : "95%",
                margin: "0 auto",
                padding: "16px",
                fontFamily: "sans-serif",
            }}
        >
            <Box sx={{ marginBottom: "16px" }}>
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
                    sx={{ color: "#10b981", fontWeight: "500", marginBottom: "4px", marginTop: "20px" }}
                >
                    E-Prescription
                </Typography>
                <Typography variant="body2" sx={{ color: "#6b7280", fontSize: "14px" }}>
                    List of your electronic prescriptions
                </Typography>
            </Box>

            {/* Divider */}
            <Divider sx={{ borderColor: "#d1d5db", marginBottom: "16px" }} />

            {/* Prescriptions list */}
            <Box sx={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                {currentItems.map((prescription) => (
                    <Paper
                        key={prescription.id}
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
                                        src={DocumentSymbol}
                                        alt="Document"
                                        sx={{
                                            width: "30px", 
                                            height: "30px", 
                                        }}
                                    />
                                    <Box
                                        component="img"
                                        src={RxSymbol}
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
                            <Box>
                                <Typography
                                    variant="body1"
                                    sx={{ color: "#3b82f6", fontWeight: "500" }}
                                >
                                    {prescription.doctor}
                                </Typography>
                                <Typography variant="body2" sx={{ color: "#6b7280" }}>
                                    Patient: {prescription.patient}
                                </Typography>
                            </Box>
                        </Box>
                        <Typography variant="body2" sx={{ color: "#9ca3af" }}>
                            {prescription.date}
                        </Typography>
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
                            color: "#0052A8",
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

export default PrescriptionReport;