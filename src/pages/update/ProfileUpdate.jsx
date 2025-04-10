import { useState, useEffect } from "react";
import {
    Box,
    Typography,
    TextField,
    Button,
    Container,
    Card,
    CardMedia,
    IconButton,
    Select,
    MenuItem,
    Divider,
    Paper,
    TextareaAutosize,
    CircularProgress,
    Snackbar,
    Alert,
} from "@mui/material";
import { ArrowBack } from "@mui/icons-material";
import CameraAltOutlinedIcon from "@mui/icons-material/CameraAltOutlined";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { useNavigate } from "react-router-dom";
import AvatarImage from "../../assets/avatar.png";
import { useDispatch, useSelector } from "react-redux";
import { errorClean, updateUserProfile } from "../../redux/auth/authSlice";

const ProfileUpdate = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { token, updatedUser, isLoading, userDetails } = useSelector((state) => state.user);
    // Initialize state with default values
    const [profileData, setProfileData] = useState({
        firstName: "",
        lastName: "",
        status: "",
        qualification: "",
        experience: "",
        specialization: "",
        clinicAddress: "",
        consultationFee: "",
        bio: "",
    });
    const [initialProfileData, setInitialProfileData] = useState({}); // To store initial values
    const [profileImage, setProfileImage] = useState(null);
    const [imagePreview, setImagePreview] = useState(AvatarImage);
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState("");
    const [snackbarSeverity, setSnackbarSeverity] = useState("success");

    const handleSnackbarClose = (event, reason) => {
        if (reason === "clickaway") {
            return;
        }
        setSnackbarOpen(false);
    };
    useEffect(() => {
        if (userDetails) {
            const initialData = {
                firstName: userDetails?.firstName || "",
                lastName: userDetails?.lastName || "",
                status: userDetails?.status || "",
                qualification: userDetails?.profile?.qualification || "",
                experience: userDetails?.profile?.experience || "",
                specialization: userDetails?.profile?.specialization || "",
                clinicAddress: userDetails?.profile?.clinicAddress || "",
                consultationFee: userDetails?.profile?.consultationFee || "",
                bio: userDetails?.profile?.bio || "",
            };
            setProfileData(initialData);
            setInitialProfileData(initialData);

            if (userDetails?.profileImage) {
                setImagePreview(userDetails.profileImage);
            }
        }
    }, [userDetails]);
    useEffect(() => {
        if (updatedUser) {
            setSnackbarMessage("Profile Successfully Updated");
            setSnackbarSeverity("success");
            setSnackbarOpen(true);
            dispatch(errorClean());
        }
    }, [updatedUser, dispatch]);
    const isFormModified = () => {
        const isDataModified = Object.keys(profileData).some(
            (key) => profileData[key] !== initialProfileData[key]
        );
        const isImageModified = profileImage !== null; // Check if a new image is selected
        return isDataModified || isImageModified;
    };
    const handleChange = (field) => (event) => {
        setProfileData({
            ...profileData,
            [field]: event.target.value,
        });
    };
    const handleImageChange = (event) => {
        const file = event.target.files[0];
        if (file && file.type.startsWith("image/")) {
            setProfileImage(file);
            setImagePreview(URL.createObjectURL(file));
        }
    };
    const handleUpdate = async () => {
        try {
            const formData = new FormData();
            if (profileData?.firstName) formData.append("firstName", profileData.firstName);
            if (profileData?.lastName) formData.append("lastName", profileData.lastName);
            if (profileData?.status) formData.append("status", profileData.status);
            if (profileData?.qualification) formData.append("qualification", profileData.qualification);
            if (profileData?.experience) formData.append("experience", profileData.experience);
            if (profileData?.specialization) formData.append("specialization", profileData.specialization);
            if (profileData?.clinicAddress) formData.append("clinicAddress", profileData.clinicAddress);
            if (profileData?.consultationFee) formData.append("consultationFee", profileData.consultationFee);
            if (profileData?.bio) formData.append("bio", profileData.bio);
            if (profileImage) {
                formData.append("file", profileImage);
            }
            dispatch(updateUserProfile({ token, formData }));
        } catch (error) {
            setSnackbarMessage("Error updating profile");
            setSnackbarSeverity("error");
            setSnackbarOpen(true);
        }
    };
    return (
        <Container maxWidth="lg" sx={{ py: 2 }}>
            <Snackbar
                open={snackbarOpen}
                autoHideDuration={6000}
                onClose={handleSnackbarClose}
                anchorOrigin={{ vertical: "top", horizontal: "right" }}
            >
                <Alert
                    onClose={handleSnackbarClose}
                    severity={snackbarSeverity}
                    sx={{ width: "100%" }}
                >
                    {snackbarMessage}
                </Alert>
            </Snackbar>
            <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                <Button
                    startIcon={<ArrowBack />}
                    onClick={() => navigate(-1)}
                    sx={{
                        color: "#0052A8",
                        backgroundColor: "#E2F1FF",
                        borderRadius: "6px",
                        textTransform: "none",
                        fontSize: "14px",
                        padding: "8px 12px",
                    }}
                >
                    Back
                </Button>
            </Box>

            <Typography variant="h4" component="h1" sx={{ color: "#3EDAC5", fontWeight: 700, mb: 0.5 }}>
                Profile
            </Typography>
            
            <Divider sx={{ mb: 3 }} />

            <Paper elevation={0} sx={{ backgroundColor: "#f5f5f5", borderRadius: 2, p: { xs: 2, md: 3 }, mb: 3 }}>
                <Box sx={{ display: "flex", flexDirection: { xs: "column", md: "row" }, gap: 4 }}>
                    <Box sx={{ flex: "0 0 auto", width: { xs: "100%", md: "auto" }, display: "flex", justifyContent: { xs: "center", md: "flex-start" } }}>
                        <Card sx={{ width: 200, height: 200, position: "relative", borderRadius: 2, border: "5px solid #0070C0", boxShadow: "none" }}>
                            <CardMedia component="img" image={imagePreview} alt="Profile" sx={{ height: "100%", objectFit: "cover" }} />
                            <IconButton sx={{ position: "absolute", right: 8, top: 8, backgroundColor: "white", color: "#0052A8", "&:hover": { backgroundColor: "white", borderRadius: 8, } }}>
                                <label htmlFor="profile-image-upload">
                                    <CameraAltOutlinedIcon />
                                </label>
                            </IconButton>
                            <input id="profile-image-upload" type="file" accept="image/*" style={{ display: "none" }} onChange={handleImageChange} />
                        </Card>
                    </Box>

                    <Box sx={{ flex: "1 1 auto" }}>
                        <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
                            <Typography variant="h6" sx={{ color: "#0052A8", fontWeight: 500, mb: 1 }}>
                                Personal Information
                            </Typography>

                            <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
                                <Box sx={{ display: "flex", alignItems: "center" }}>
                                    <Typography sx={{ width: 120, flexShrink: 0, color: "#000000" }}>First Name*</Typography>
                                    <TextField
                                        variant="standard"
                                        fullWidth
                                        size="small"
                                        value={profileData.firstName}
                                        onChange={handleChange("firstName")}
                                        InputProps={{
                                            disableUnderline: false,
                                        }}
                                        sx={{
                                            maxWidth: { xs: "100%", md: "60%" },
                                            "& .MuiInput-underline:before": { borderBottom: "1px solid #829498" },
                                            "& .MuiInput-underline:after": { borderBottom: "1px solid #829498" },
                                            "& .MuiInput-underline:hover:not(.Mui-disabled):before": { borderBottom: "1px solid #829498" },
                                        }}
                                    />
                                </Box>

                                <Box sx={{ display: "flex", alignItems: "center" }}>
                                    <Typography sx={{ width: 120, flexShrink: 0, color: "#000000" }}>Last Name*</Typography>
                                    <TextField
                                        variant="standard"
                                        fullWidth
                                        size="small"
                                        value={profileData.lastName}
                                        onChange={handleChange("lastName")}
                                        InputProps={{
                                            disableUnderline: false,
                                        }}
                                        sx={{
                                            maxWidth: { xs: "100%", md: "60%" },
                                            "& .MuiInput-underline:before": { borderBottom: "1px solid #829498" },
                                            "& .MuiInput-underline:after": { borderBottom: "1px solid #829498" },
                                            "& .MuiInput-underline:hover:not(.Mui-disabled):before": { borderBottom: "1px solid #829498" },
                                        }}
                                    />
                                </Box>

                                <Box sx={{ display: "flex", alignItems: "center" }}>
                                    <Typography sx={{ width: 120, flexShrink: 0, color: "#000000" }}>Status*</Typography>
                                    <Select
                                        size="small"
                                        value={profileData.status}
                                        onChange={handleChange("status")}
                                        variant="standard"
                                        fullWidth
                                        displayEmpty
                                        renderValue={(selected) => {
                                            if (!selected) {
                                                return <Typography sx={{ color: "#829498" }}>Select status</Typography>;
                                            }
                                            return selected === "online" ? "online" : "offline";
                                        }}
                                        IconComponent={KeyboardArrowDownIcon}
                                        sx={{
                                            maxWidth: { xs: "100%", md: "60%" },
                                            "& .MuiInput-underline:before": { borderBottom: "1px solid #829498" },
                                            "& .MuiInput-underline:after": { borderBottom: "1px solid #829498" },
                                            "& .MuiInput-underline:hover:not(.Mui-disabled):before": { borderBottom: "1px solid #829498" },
                                        }}
                                    >
                                        <MenuItem value="online">online</MenuItem>
                                        <MenuItem value="offline">offline</MenuItem>
                                    </Select>
                                </Box>
                            </Box>

                            <Typography variant="h6" sx={{ color: "#0052A8", fontWeight: 500, mt: 2, mb: 1 }}>
                                Professional Information
                            </Typography>

                            <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
                                <Box sx={{ display: "flex", alignItems: "center" }}>
                                    <Typography sx={{ width: 120, flexShrink: 0, color: "#000000" }}>Qualification*</Typography>
                                    <TextField
                                        variant="standard"
                                        fullWidth
                                        size="small"
                                        value={profileData.qualification}
                                        onChange={handleChange("qualification")}
                                        InputProps={{
                                            disableUnderline: false,
                                        }}
                                        sx={{
                                            maxWidth: { xs: "100%", md: "60%" },
                                            "& .MuiInput-underline:before": { borderBottom: "1px solid #829498" },
                                            "& .MuiInput-underline:after": { borderBottom: "1px solid #829498" },
                                            "& .MuiInput-underline:hover:not(.Mui-disabled):before": { borderBottom: "1px solid #829498" },
                                        }}
                                    />
                                </Box>

                                <Box sx={{ display: "flex", alignItems: "center" }}>
                                    <Typography sx={{ width: 120, flexShrink: 0, color: "#000000" }}>Experience*</Typography>
                                    <TextField
                                        variant="standard"
                                        fullWidth
                                        size="small"
                                        value={profileData.experience}
                                        onChange={handleChange("experience")}
                                        InputProps={{
                                            disableUnderline: false,
                                        }}
                                        sx={{
                                            maxWidth: { xs: "100%", md: "60%" },
                                            "& .MuiInput-underline:before": { borderBottom: "1px solid #829498" },
                                            "& .MuiInput-underline:after": { borderBottom: "1px solid #829498" },
                                            "& .MuiInput-underline:hover:not(.Mui-disabled):before": { borderBottom: "1px solid #829498" },
                                        }}
                                    />
                                </Box>

                                <Box sx={{ display: "flex", alignItems: "center" }}>
                                    <Typography sx={{ width: 120, flexShrink: 0, color: "#000000" }}>Specialization*</Typography>
                                    <TextField
                                        variant="standard"
                                        fullWidth
                                        size="small"
                                        value={profileData.specialization}
                                        onChange={handleChange("specialization")}
                                        InputProps={{
                                            disableUnderline: false,
                                        }}
                                        sx={{
                                            maxWidth: { xs: "100%", md: "60%" },
                                            "& .MuiInput-underline:before": { borderBottom: "1px solid #829498" },
                                            "& .MuiInput-underline:after": { borderBottom: "1px solid #829498" },
                                            "& .MuiInput-underline:hover:not(.Mui-disabled):before": { borderBottom: "1px solid #829498" },
                                        }}
                                    />
                                </Box>

                                <Box sx={{ display: "flex", alignItems: "center" }}>
                                    <Typography sx={{ width: 120, flexShrink: 0, color: "#000000" }}>Clinic Address*</Typography>
                                    <TextField
                                        variant="standard"
                                        fullWidth
                                        size="small"
                                        value={profileData.clinicAddress}
                                        onChange={handleChange("clinicAddress")}
                                        InputProps={{
                                            disableUnderline: false,
                                        }}
                                        sx={{
                                            maxWidth: { xs: "100%", md: "60%" },
                                            "& .MuiInput-underline:before": { borderBottom: "1px solid #829498" },
                                            "& .MuiInput-underline:after": { borderBottom: "1px solid #829498" },
                                            "& .MuiInput-underline:hover:not(.Mui-disabled):before": { borderBottom: "1px solid #829498" },
                                        }}
                                    />
                                </Box>

                                <Box sx={{ display: "flex", alignItems: "center" }}>
                                    <Typography sx={{ width: 120, flexShrink: 0, color: "#000000" }}>Consultation Fee*</Typography>
                                    <TextField
                                        variant="standard"
                                        fullWidth
                                        size="small"
                                        value={profileData.consultationFee}
                                        onChange={handleChange("consultationFee")}
                                        InputProps={{
                                            disableUnderline: false,
                                        }}
                                        sx={{
                                            maxWidth: { xs: "100%", md: "60%" },
                                            "& .MuiInput-underline:before": { borderBottom: "1px solid #829498" },
                                            "& .MuiInput-underline:after": { borderBottom: "1px solid #829498" },
                                            "& .MuiInput-underline:hover:not(.Mui-disabled):before": { borderBottom: "1px solid #829498" },
                                        }}
                                    />
                                </Box>

                                <Box sx={{ display: "flex", alignItems: "flex-start" }}>
                                    <Typography sx={{ width: 120, flexShrink: 0, color: "#000000", mt: 1 }}>Bio*</Typography>
                                    <TextareaAutosize
                                        minRows={3}
                                        value={profileData.bio}
                                        onChange={handleChange("bio")}
                                        style={{
                                            width: "100%",
                                            maxWidth: "60%",
                                            padding: "8px",
                                            borderRadius: "4px",
                                            border: "1px solid #829498",
                                            fontFamily: "inherit",
                                            fontSize: "inherit",
                                        }}
                                    />
                                </Box>
                            </Box>

                            <Typography variant="h6" sx={{ color: "#0052A8", fontWeight: 500, mt: 2, mb: 1 }}>
                                Account Information
                            </Typography>

                            <Box sx={{ display: "flex", flexDirection: "column", gap: 2, opacity: 0.5 }}>
                                <Box sx={{ display: "flex", alignItems: "center" }}>
                                    <Typography sx={{ width: 120, flexShrink: 0, color: "#000000" }}>Subscription</Typography>
                                    <Typography>{profileData.subscription}</Typography>
                                </Box>
                                <Box sx={{ display: "flex", alignItems: "center" }}>
                                    <Typography sx={{ width: 120, flexShrink: 0, color: "#000000" }}>Expire</Typography>
                                    <Typography>{profileData.expire}</Typography>
                                </Box>
                            </Box>
                            <Box
                                sx={{
                                    mt: 4,
                                    display: "flex",
                                    justifyContent: "center",
                                    width: "100%",
                                }}
                            >
                                <Button
                                    variant="contained"
                                    onClick={handleUpdate}
                                    disabled={!isFormModified() || isLoading} // Disable if no changes or loading
                                    sx={{
                                        width: { xs: "100%", md: "60%", lg: "400px" },
                                        maxWidth: 400,

                                        py: 1.5,
                                        textTransform: "none",
                                        fontSize: "1rem",
                                        color: "#fff",
                                        backgroundColor: "#0052A8",
                                        "&:hover": {
                                            backgroundColor: "#003D7A",
                                        },
                                        "&:disabled": {
                                            backgroundColor: "#B0BEC5",
                                        },
                                    }}
                                >
                                    {isLoading ? (
                                        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                                            <CircularProgress size={20} sx={{ color: "#fff" }} />
                                            Loading...
                                        </Box>
                                    ) : (
                                        "Update"
                                    )}
                                </Button>
                            </Box>
                        </Box>
                    </Box>
                </Box>
            </Paper>
        </Container>
    );
};
export default ProfileUpdate;