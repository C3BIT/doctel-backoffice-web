import { ArrowBack, Visibility, Edit, Delete, InsertDriveFile } from "@mui/icons-material";
import {
    Box,
    Button,
    Typography,
    Divider,
    Grid,
    Paper,
    Avatar,
    IconButton,
    useMediaQuery,
    useTheme,
} from "@mui/material";

const Profile = () => {
    // Responsive width
    const theme = useTheme();
    const isSmallDevice = useMediaQuery(theme.breakpoints.down("sm"));

    return (
        <Box
            sx={{
                backgroundColor: "white",
                padding: "16px",
                width: isSmallDevice ? "95%" : "80%", // 95% for small devices, 80% for larger devices
                margin: "0 auto", // Center horizontally
            }}
        >
            {/* Back Button */}
            <Box sx={{ marginBottom: "16px" }}>
                <Button
                    startIcon={<ArrowBack />}
                    sx={{
                        color: "#3b82f6",
                        backgroundColor: "#e5e7eb",
                        borderRadius: "6px",
                        textTransform: "none",
                        fontSize: "14px",
                        padding: "8px 12px",
                    }}
                >
                    Back
                </Button>
            </Box>

            {/* Profile Header */}
            <Box sx={{ marginBottom: "16px" }}>
                <Typography variant="h5" sx={{ color: "#10b981", fontWeight: "500" }}>
                    Profile
                </Typography>
                <Typography variant="body2" sx={{ color: "#6b7280", fontSize: "12px" }}>
                    List of your electronic prescriptions
                </Typography>
                <Divider sx={{ borderColor: "#d1d5db", marginTop: "8px" }} />
            </Box>

            {/* Profile Card */}
            <Paper
                sx={{
                    backgroundColor: "#F5F6F8",
                    borderRadius: "8px",
                    padding: "16px",
                    marginBottom: "24px",
                    boxShadow: "0 1px 2px rgba(0, 0, 0, 0.05)",
                }}
            >
                <Grid container spacing={3}>
                    {/* Profile Image */}
                    <Grid item xs={12} md={3}>
                        <Box
                            sx={{
                                width: "140px",
                                height: "140px",
                                border: "4px solid #1d4ed8",
                                borderRadius: "8px",
                                overflow: "hidden",
                                backgroundColor: "#fbbf24",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                margin: "0 auto", // Center the image on small devices
                            }}
                        >
                            <img
                                src="https://s3-alpha-sig.figma.com/img/0488/c066/a9c9336892f34822ffc715bfc5d072a0?Expires=1742774400&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=Ur0Oydujx~-t1FjZ~ReVRqvj-PhTNqneddZzRPuaiT1FdigklmercDdU~HhQ~O0fa5CYETcRA63IavmCy4m0zs2cs8Fiq0Srnf1rgZ6b5T~F7WMvPXxJ42q9yf7NLsuMaX1TWEUrqJLrQLZ~n-w8~51eAE~MwWjH9JH748fcGpEcRNIehyJWnKM8FRVuYV451bcRlRlxOIxmvREsMLenbXpAOEVhxKZT9Nb0jU7YDb0jH7qH4E~H8ff746Uu5uDusyKd4m3VaC1TK-P794WoqAMMTEYWUHzsUvxhHk9ENwfByGEDeqqXbWaWZ~pim8V5zV0zNZo-ncdt9Uen2QX5sg__"
                                alt="Profile"
                                style={{ width: "100%" }}
                            />
                        </Box>
                    </Grid>

                    {/* Profile Information */}
                    <Grid item xs={12} md={9}>
                        <Box
                            sx={{
                                display: "flex",
                                justifyContent: "space-between",
                                alignItems: "center",
                                marginBottom: "8px",
                            }}
                        >
                            <Typography
                                variant="h6"
                                sx={{ color: "#1d4ed8", fontWeight: "600" }}
                            >
                                Personal Information
                            </Typography>
                            <Button
                                variant="outlined"
                                startIcon={<Edit />}
                                sx={{
                                    color: "#1d4ed8",
                                    borderColor: "#1d4ed8",
                                    borderRadius: "6px",
                                    textTransform: "none",
                                    fontSize: "12px",
                                    padding: "4px 8px",
                                }}
                            >
                                Edit Profile
                            </Button>
                        </Box>

                        <Grid container spacing={1} sx={{ marginBottom: "16px" }}>
                            <Grid item xs={12}>
                                <Typography variant="body2" sx={{ color: "#4b5563" }}>
                                    <strong>Name:</strong> Ahmed Saif Reza
                                </Typography>
                            </Grid>
                            <Grid item xs={12}>
                                <Typography variant="body2" sx={{ color: "#4b5563" }}>
                                    <strong>Age:</strong> 35
                                </Typography>
                            </Grid>
                            <Grid item xs={12}>
                                <Typography variant="body2" sx={{ color: "#4b5563" }}>
                                    <strong>Sex:</strong> Male
                                </Typography>
                            </Grid>
                            <Grid item xs={12}>
                                <Typography variant="body2" sx={{ color: "#4b5563" }}>
                                    <strong>Mobile:</strong> 0171 101 101 101
                                </Typography>
                            </Grid>
                            <Grid item xs={12}>
                                <Typography variant="body2" sx={{ color: "#4b5563" }}>
                                    <strong>E-mail:</strong>
                                </Typography>
                            </Grid>
                            <Grid item xs={12}>
                                <Typography variant="body2" sx={{ color: "#4b5563" }}>
                                    <strong>Location:</strong> Motijhil, Dhaka
                                </Typography>
                            </Grid>
                        </Grid>

                        <Typography
                            variant="h6"
                            sx={{ color: "#1d4ed8", fontWeight: "600", marginBottom: "8px" }}
                        >
                            Health Information
                        </Typography>
                        <Grid container spacing={1} sx={{ marginBottom: "16px" }}>
                            <Grid item xs={12}>
                                <Typography variant="body2" sx={{ color: "#4b5563" }}>
                                    <strong>Blood Group:</strong> A+
                                </Typography>
                            </Grid>
                            <Grid item xs={12}>
                                <Typography variant="body2" sx={{ color: "#4b5563" }}>
                                    <strong>Height:</strong> 5'7"
                                </Typography>
                            </Grid>
                            <Grid item xs={12}>
                                <Typography variant="body2" sx={{ color: "#4b5563" }}>
                                    <strong>Weight:</strong> 85 Kg
                                </Typography>
                            </Grid>
                        </Grid>

                        <Typography
                            variant="h6"
                            sx={{ color: "#1d4ed8", fontWeight: "600", marginBottom: "8px" }}
                        >
                            Account Information
                        </Typography>
                        <Grid container spacing={1}>
                            <Grid item xs={12}>
                                <Typography variant="body2" sx={{ color: "#4b5563" }}>
                                    <strong>Subscription:</strong> Monthly Pack
                                </Typography>
                            </Grid>
                            <Grid item xs={12}>
                                <Typography variant="body2" sx={{ color: "#4b5563" }}>
                                    <strong>Expire:</strong> 31 December 2022
                                </Typography>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </Paper>

            {/* Prescriptions Section */}
            <Grid container spacing={3}>
                {/* E-Prescription */}
                <Grid item xs={12} md={4}>
                    <Paper
                        sx={{
                            backgroundColor: "#F5F6F8",
                            borderRadius: "8px",
                            padding: "16px",
                            boxShadow: "0 1px 2px rgba(0, 0, 0, 0.05)",
                            height: "100%", // Ensure same height for all sections
                        }}
                    >
                        <Typography
                            variant="subtitle1"
                            sx={{ color: "#374151", fontWeight: "500", marginBottom: "12px" }}
                        >
                            E-Prescription
                        </Typography>
                        {[1, 2, 3].map((item) => (
                            <Box
                                key={`e-prescription-${item}`}
                                sx={{
                                    display: "flex",
                                    alignItems: "center",
                                    paddingBottom: "12px",
                                    marginBottom: "12px",
                                    borderBottom: "1px solid #e5e7eb",
                                    "&:last-child": {
                                        borderBottom: "none",
                                        marginBottom: "0",
                                    },
                                }}
                            >
                                <Avatar
                                    variant="square"
                                    sx={{
                                        width: "24px",
                                        height: "32px",
                                        border: "1px solid #3b82f6",
                                        borderRadius: "4px",
                                        backgroundColor: "transparent",
                                        color: "#3b82f6",
                                        marginRight: "8px",
                                    }}
                                >
                                    <InsertDriveFile fontSize="small" />
                                </Avatar>
                                <Box>
                                    <Typography variant="body2" sx={{ fontWeight: "500" }}>
                                        Dr. Shariar Islam
                                    </Typography>
                                    <Typography variant="body2" sx={{ color: "#6b7280" }}>
                                        Patient: Kazi Ruksana
                                    </Typography>
                                    <Typography variant="body2" sx={{ color: "#9ca3af" }}>
                                        10 Jan 22
                                    </Typography>
                                </Box>
                            </Box>
                        ))}
                    </Paper>
                </Grid>

                {/* Lab Report */}
                <Grid item xs={12} md={4}>
                    <Paper
                        sx={{
                            backgroundColor: "#F5F6F8",
                            borderRadius: "8px",
                            padding: "16px",
                            boxShadow: "0 1px 2px rgba(0, 0, 0, 0.05)",
                            height: "100%", // Ensure same height for all sections
                        }}
                    >
                        <Box
                            sx={{
                                display: "flex",
                                justifyContent: "space-between",
                                alignItems: "center",
                                marginBottom: "12px",
                            }}
                        >
                            <Typography
                                variant="subtitle1"
                                sx={{ color: "#374151", fontWeight: "500" }}
                            >
                                Lab Report
                            </Typography>
                            <Button
                                variant="contained"
                                sx={{
                                    backgroundColor: "#3b82f6",
                                    color: "#ffffff",
                                    borderRadius: "6px",
                                    textTransform: "none",
                                    fontSize: "12px",
                                    padding: "6px 12px",
                                }}
                            >
                                Upload
                            </Button>
                        </Box>
                        {[1, 2, 3].map((item) => (
                            <Box
                                key={`lab-report-${item}`}
                                sx={{
                                    display: "flex",
                                    alignItems: "center",
                                    paddingBottom: "12px",
                                    marginBottom: "12px",
                                    borderBottom: "1px solid #e5e7eb",
                                    "&:last-child": {
                                        borderBottom: "none",
                                        marginBottom: "0",
                                    },
                                }}
                            >
                                <Avatar
                                    variant="square"
                                    sx={{
                                        width: "24px",
                                        height: "32px",
                                        border: "1px solid #3b82f6",
                                        borderRadius: "4px",
                                        backgroundColor: "transparent",
                                        color: "#3b82f6",
                                        marginRight: "8px",
                                    }}
                                >
                                    <InsertDriveFile fontSize="small" />
                                </Avatar>
                                <Box sx={{ flexGrow: 1 }}>
                                    <Typography variant="body2" sx={{ fontWeight: "500" }}>
                                        12 Oct 2022
                                    </Typography>
                                    <Typography variant="body2" sx={{ color: "#6b7280" }}>
                                        01:33 pm
                                    </Typography>
                                </Box>
                                <Box sx={{ display: "flex", gap: "4px" }}>
                                    <IconButton
                                        sx={{
                                            width: "24px",
                                            height: "24px",
                                            border: "1px solid #3b82f6",
                                            color: "#3b82f6",
                                        }}
                                    >
                                        <Visibility sx={{ fontSize: "14px" }} />
                                    </IconButton>
                                    <IconButton
                                        sx={{
                                            width: "24px",
                                            height: "24px",
                                            border: "1px solid #3b82f6",
                                            color: "#3b82f6",
                                        }}
                                    >
                                        <Edit sx={{ fontSize: "14px" }} />
                                    </IconButton>
                                    <IconButton
                                        sx={{
                                            width: "24px",
                                            height: "24px",
                                            border: "1px solid #3b82f6",
                                            color: "#3b82f6",
                                        }}
                                    >
                                        <Delete sx={{ fontSize: "14px" }} />
                                    </IconButton>
                                </Box>
                            </Box>
                        ))}
                    </Paper>
                </Grid>

                {/* Paper Prescription */}
                <Grid item xs={12} md={4}>
                    <Paper
                        sx={{
                            backgroundColor: "#F5F6F8",
                            borderRadius: "8px",
                            padding: "16px",
                            boxShadow: "0 1px 2px rgba(0, 0, 0, 0.05)",
                            height: "100%", // Ensure same height for all sections
                        }}
                    >
                        <Box
                            sx={{
                                display: "flex",
                                justifyContent: "space-between",
                                alignItems: "center",
                                marginBottom: "12px",
                            }}
                        >
                            <Typography
                                variant="subtitle1"
                                sx={{ color: "#374151", fontWeight: "500" }}
                            >
                                Paper Prescription
                            </Typography>
                            <Button
                                variant="contained"
                                sx={{
                                    backgroundColor: "#3b82f6",
                                    color: "#ffffff",
                                    borderRadius: "6px",
                                    textTransform: "none",
                                    fontSize: "12px",
                                    padding: "6px 12px",
                                }}
                            >
                                Upload
                            </Button>
                        </Box>
                        {[1, 2, 3].map((item) => (
                            <Box
                                key={`paper-prescription-${item}`}
                                sx={{
                                    display: "flex",
                                    alignItems: "center",
                                    paddingBottom: "12px",
                                    marginBottom: "12px",
                                    borderBottom: "1px solid #e5e7eb",
                                    "&:last-child": {
                                        borderBottom: "none",
                                        marginBottom: "0",
                                    },
                                }}
                            >
                                <Avatar
                                    variant="square"
                                    sx={{
                                        width: "24px",
                                        height: "32px",
                                        border: "1px solid #3b82f6",
                                        borderRadius: "4px",
                                        backgroundColor: "transparent",
                                        color: "#3b82f6",
                                        marginRight: "8px",
                                    }}
                                >
                                    <InsertDriveFile fontSize="small" />
                                </Avatar>
                                <Box sx={{ flexGrow: 1 }}>
                                    <Typography variant="body2" sx={{ fontWeight: "500" }}>
                                        12 Oct 2022
                                    </Typography>
                                    <Typography variant="body2" sx={{ color: "#6b7280" }}>
                                        01:33 pm
                                    </Typography>
                                </Box>
                                <Box sx={{ display: "flex", gap: "4px" }}>
                                    <IconButton
                                        sx={{
                                            width: "24px",
                                            height: "24px",
                                            border: "1px solid #3b82f6",
                                            color: "#3b82f6",
                                        }}
                                    >
                                        <Visibility sx={{ fontSize: "14px" }} />
                                    </IconButton>
                                    <IconButton
                                        sx={{
                                            width: "24px",
                                            height: "24px",
                                            border: "1px solid #3b82f6",
                                            color: "#3b82f6",
                                        }}
                                    >
                                        <Edit sx={{ fontSize: "14px" }} />
                                    </IconButton>
                                    <IconButton
                                        sx={{
                                            width: "24px",
                                            height: "24px",
                                            border: "1px solid #3b82f6",
                                            color: "#3b82f6",
                                        }}
                                    >
                                        <Delete sx={{ fontSize: "14px" }} />
                                    </IconButton>
                                </Box>
                            </Box>
                        ))}
                    </Paper>
                </Grid>
            </Grid>
        </Box>
    );
};

export default Profile;