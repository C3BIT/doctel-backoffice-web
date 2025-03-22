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
    Skeleton, // Import Skeleton component
} from "@mui/material";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getUserDetails } from "../../redux/auth/authSlice";
import { useEffect } from "react";

const Profile = () => {
    const dispatch = useDispatch();
    const { userDetails, isLoading, token } = useSelector((state) => state.user);

    useEffect(() => {
        dispatch(getUserDetails(token));
    }, [dispatch, token]);

    const theme = useTheme();
    const isSmallDevice = useMediaQuery(theme.breakpoints.down("sm"));

    return (
        <Box
            sx={{
                backgroundColor: "white",
                padding: "16px",
                width: isSmallDevice ? "95%" : "80%",
                margin: "0 auto",
            }}
        >
            {/* Back Button */}
            <Box sx={{ marginBottom: "16px" }}>
                <Link to="/">
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
                </Link>
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
                                margin: "0 auto",
                            }}
                        >
                            {isLoading ? (
                                <Skeleton variant="rectangular" width="100%" height="100%" />
                            ) : (
                                <img
                                    src={userDetails?.profileImage}
                                    alt="Profile"
                                    style={{ width: "100%" }}
                                />
                            )}
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
                            {isLoading ? (
                                <Skeleton variant="rectangular" width={100} height={36} />
                            ) : (
                                <Link to='/update/profile'>
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
                                </Link>
                            )}
                        </Box>

                        {/* Personal Information Skeleton */}
                        <Grid container spacing={1} sx={{ marginBottom: "16px" }}>
                            <Grid item xs={12}>
                                {isLoading ? (
                                    <Skeleton variant="text" width="60%" />
                                ) : (
                                    <Typography variant="body2" sx={{ color: "#4b5563" }}>
                                        <strong>Name :</strong> {userDetails?.firstName || ""} {userDetails?.lastName || ""}
                                    </Typography>
                                )}
                            </Grid>

                            <Grid item xs={12}>
                                {isLoading ? (
                                    <Skeleton variant="text" width="50%" />
                                ) : (
                                    <Typography variant="body2" sx={{ color: "#4b5563" }}>
                                        <strong>Mobile :</strong> {userDetails?.phone}
                                    </Typography>
                                )}
                            </Grid>
                            <Grid item xs={12}>
                                {isLoading ? (
                                    <Skeleton variant="text" width="70%" />
                                ) : (
                                    <Typography variant="body2" sx={{ color: "#4b5563" }}>
                                        <strong>Clinic Address :</strong> {userDetails?.profile?.clinicAddress}
                                    </Typography>
                                )}
                            </Grid>
                        </Grid>

                        {/* Profile Information Skeleton */}
                        <Typography
                            variant="h6"
                            sx={{ color: "#1d4ed8", fontWeight: "600", marginBottom: "8px" }}
                        >
                            Profile Information
                        </Typography>
                        <Grid container spacing={1} sx={{ marginBottom: "16px" }}>
                            <Grid item xs={12}>
                                {isLoading ? (
                                    <Skeleton variant="text" width="50%" />
                                ) : (
                                    <Typography variant="body2" sx={{ color: "#4b5563" }}>
                                        <strong>Qualification :</strong> {userDetails?.profile?.qualification}
                                    </Typography>
                                )}
                            </Grid>
                            <Grid item xs={12}>
                                {isLoading ? (
                                    <Skeleton variant="text" width="60%" />
                                ) : (
                                    <Typography variant="body2" sx={{ color: "#4b5563" }}>
                                        <strong>Specialization :</strong> {userDetails?.profile?.specialization}
                                    </Typography>
                                )}
                            </Grid>
                            <Grid item xs={12}>
                                {isLoading ? (
                                    <Skeleton variant="text" width="40%" />
                                ) : (
                                    <Typography variant="body2" sx={{ color: "#4b5563" }}>
                                        <strong>Experience :</strong> {userDetails?.profile?.experience}
                                    </Typography>
                                )}
                            </Grid>
                            <Grid item xs={12}>
                                {isLoading ? (
                                    <Skeleton variant="text" width="40%" />
                                ) : (
                                    <Typography variant="body2" sx={{ color: "#4b5563" }}>
                                        <strong>Consultation Fee :</strong> {userDetails?.profile?.consultationFee}
                                    </Typography>
                                )}
                            </Grid>
                        </Grid>

                        {/* Account Information Skeleton */}
                        <Typography
                            variant="h6"
                            sx={{ color: "#1d4ed8", fontWeight: "600", marginBottom: "8px" }}
                        >
                            Account Information
                        </Typography>
                        <Grid container spacing={1}>
                            <Grid item xs={12}>
                                {isLoading ? (
                                    <Skeleton variant="text" width="40%" />
                                ) : (
                                    <Typography variant="body2" sx={{ color: "#4b5563" }}>
                                        <strong>Subscription :</strong> Monthly Pack
                                    </Typography>
                                )}
                            </Grid>
                            <Grid item xs={12}>
                                {isLoading ? (
                                    <Skeleton variant="text" width="50%" />
                                ) : (
                                    <Typography variant="body2" sx={{ color: "#4b5563" }}>
                                        <strong>Expire :</strong> 31 December 2022
                                    </Typography>
                                )}
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
                            height: "100%",
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
                            height: "100%",
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
                            height: "100%",
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