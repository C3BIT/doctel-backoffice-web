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
    CircularProgress
} from "@mui/material";
import { ArrowBack } from "@mui/icons-material";
import CameraAltOutlinedIcon from "@mui/icons-material/CameraAltOutlined";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { Link } from "react-router-dom";
import AvatarImage from "../../assets/avatar.png";
import { useDispatch, useSelector } from "react-redux";
import { errorClean, updateUserProfile } from "../../redux/auth/authSlice";

const ProfileUpdate = () => {
    const dispatch = useDispatch();
    const { user, token, updatedUser, isLoading } = useSelector((state) => state.user);
    const [profileData, setProfileData] = useState({
        firstName: "",
        lastName: "",
        phone: "",
        status: "",
        qualification: "",
        experience: "",
        specialization: "",
        clinicAddress: "",
        consultationFee: "",
        bio: "",
        subscription: "",
        expire: "",
    });
    const [profileImage, setProfileImage] = useState(null);
    const [imagePreview, setImagePreview] = useState(AvatarImage);
    useEffect(() => {
        if (user) {
            setProfileData({
                firstName: user.firstName,
                lastName: user.lastName,
                phone: user.phone,
                status: user.status,
                qualification: user.qualification,
                experience: user.experience,
                specialization: user.specialization,
                clinicAddress: user.clinicAddress,
                consultationFee: user.consultationFee,
                bio: user.bio,
                subscription: user.subscription,
                expire: user.expire,
            });
            if (user.profileImage) {
                setImagePreview(user.profileImage);
            }
        }
        if (updatedUser) {
            alert("Profile Successfully Updated");
            dispatch(errorClean());
        }
    }, [user, updatedUser, dispatch]);

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
        } else {
            alert("Please select a valid image file.");
        }
    };
    const handleUpdate = async () => {
        try {
            const formData = new FormData();
            if (profileData?.firstName) formData.append("firstName", profileData.firstName);
            if (profileData?.lastName) formData.append("lastName", profileData.lastName);
            if (profileData?.phone) formData.append("phone", profileData.phone);
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
            dispatch(updateUserProfile({ token, data: formData }));
        } catch (error) {
            console.error("Error updating profile:", error);
        }
    };
    const renderTextField = (label, field) => (
        <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
            <Typography sx={{ width: 100, color: "#000000" }}>{label}</Typography>
            <Typography sx={{ mx: 1 }}>:</Typography>
            <TextField
                size="small"
                value={profileData[field]}
                onChange={handleChange(field)}
                variant="standard"
                sx={{
                    width: { xs: "100%", lg: "50%" },
                    "& .MuiInput-underline:before": {
                        borderBottom: "1px solid #829498",
                    },
                    "& .MuiInput-underline:after": {
                        borderBottom: "1px solid #829498",
                    },
                    "& .MuiInput-underline:hover:not(.Mui-disabled):before": {
                        borderBottom: "1px solid #829498",
                    },
                    "& .Mui-focused": {
                        outline: "none",
                    },
                }}
            />
        </Box>
    );

    return (
        <Container maxWidth="lg" sx={{ py: 2 }}>
            <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                <Link to="/">
                    <Button
                        startIcon={<ArrowBack />}
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
                </Link>
            </Box>

            <Typography variant="h4" component="h1" sx={{ color: "#3EDAC5", fontWeight: 700, mb: 0.5 }}>
                Profile
            </Typography>
            <Typography variant="body2" sx={{ color: "#000000333", fontWeight: 300, mb: 2 }}>
                List of your electronic prescriptions
            </Typography>
            <Divider sx={{ mb: 3 }} />

            <Paper elevation={0} sx={{ backgroundColor: "#f5f5f5", borderRadius: 2, p: { xs: 2, md: 3 }, mb: 3 }}>
                <Box sx={{ display: "flex", flexDirection: { xs: "column", md: "row" }, gap: 4 }}>
                    <Box sx={{ flex: "0 0 auto", width: { xs: "100%", md: "auto" }, display: "flex", justifyContent: { xs: "center", md: "flex-start" } }}>
                        <Card sx={{ width: 200, height: 200, position: "relative", borderRadius: 2, border: "5px solid #0070C0", boxShadow: "none" }}>
                            <CardMedia component="img" image={imagePreview} alt="Profile" sx={{ height: "100%", objectFit: "cover" }} />
                            <IconButton sx={{ position: "absolute", right: 8, top: 8, backgroundColor: "white", color: "#0052A8", "&:hover": { backgroundColor: "white" } }}>
                                <label htmlFor="profile-image-upload">
                                    <CameraAltOutlinedIcon />
                                </label>
                            </IconButton>
                            <input id="profile-image-upload" type="file" accept="image/*" style={{ display: "none" }} onChange={handleImageChange} />
                        </Card>
                    </Box>

                    <Box sx={{ flex: "1 1 auto" }}>
                        <Typography variant="h6" sx={{ color: "#0052A8", fontWeight: 500, mb: 2 }}>
                            Personal Information
                        </Typography>
                        {renderTextField("First Name*", "firstName")}
                        {renderTextField("Last Name*", "lastName")}
                        {renderTextField("Phone*", "phone")}
                        <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                            <Typography sx={{ width: 100, color: "#000000" }}>Status*</Typography>
                            <Typography sx={{ mx: 1 }}>:</Typography>
                            <Select
                                size="small"
                                value={profileData.status}
                                onChange={handleChange("status")}
                                variant="standard"
                                IconComponent={KeyboardArrowDownIcon}
                                sx={{
                                    width: { xs: "100%", lg: "50%" },
                                    "& .MuiInput-underline:before": {
                                        borderBottom: "1px solid #829498",
                                    },
                                    "& .MuiInput-underline:after": {
                                        borderBottom: "1px solid #829498",
                                    },
                                    "& .MuiInput-underline:hover:not(.Mui-disabled):before": {
                                        borderBottom: "1px solid #829498",
                                    },
                                    "& .Mui-focused": {
                                        outline: "none",
                                    },
                                }}
                            >
                                <MenuItem value="Active">Active</MenuItem>
                                <MenuItem value="Inactive">Inactive</MenuItem>
                            </Select>
                        </Box>

                        <Typography variant="h6" sx={{ color: "#0052A8", fontWeight: 500, mt: 3, mb: 2 }}>
                            Professional Information
                        </Typography>
                        {renderTextField("Qualification*", "qualification")}
                        {renderTextField("Experience*", "experience")}
                        {renderTextField("Specialization*", "specialization")}
                        {renderTextField("Clinic Address*", "clinicAddress")}
                        {renderTextField("Consultation Fee*", "consultationFee")}
                        <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                            <Typography sx={{ width: 100, color: "#000000" }}>Bio*</Typography>
                            <Typography sx={{ mx: 1 }}>:</Typography>
                            <TextareaAutosize
                                minRows={3}
                                value={profileData.bio}
                                onChange={handleChange("bio")}
                                style={{
                                    width: "100%",
                                    maxWidth: "50%",
                                    padding: "8px",
                                    borderRadius: "4px",
                                    border: "1px solid #829498",
                                    fontFamily: "inherit",
                                    fontSize: "inherit",
                                }}
                            />
                        </Box>

                        <Typography variant="h6" sx={{ color: "#0052A8", fontWeight: 500, mt: 3, mb: 2 }}>
                            Account Information
                        </Typography>
                        <Box sx={{ display: "flex", flexDirection: "column", gap: 2, opacity: 0.5 }}>
                            <Box sx={{ display: "flex", alignItems: "center" }}>
                                <Typography sx={{ width: 100, color: "#000000" }}>Subscription</Typography>
                                <Typography sx={{ mx: 1 }}>:</Typography>
                                <Typography>{profileData.subscription}</Typography>
                            </Box>
                            <Box sx={{ display: "flex", alignItems: "center" }}>
                                <Typography sx={{ width: 100, color: "#000000" }}>Expire</Typography>
                                <Typography sx={{ mx: 1 }}>:</Typography>
                                <Typography>{profileData.expire}</Typography>
                            </Box>
                        </Box>
                    </Box>
                </Box>

                <Box sx={{ mt: 3, display: "flex", justifyContent: "center" }}>
                    <Button
                        variant="outlined"
                        onClick={handleUpdate}
                        disabled={isLoading} // Disable button when loading
                        sx={{
                            width: "100%",
                            maxWidth: 400,
                            borderRadius: 2,
                            py: 1,
                            textTransform: "none",
                            fontSize: "1rem",
                            color: "#375560",
                            borderColor: "#0052A8",
                            backgroundColor: "#FFECEA",
                        }}
                    >
                        {isLoading ? ( // Show loading text and spinner when isLoading is true
                            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                                <CircularProgress size={20} sx={{ color: "#375560" }} />
                                Loading...
                            </Box>
                        ) : (
                            "Update"
                        )}
                    </Button>
                </Box>
            </Paper>
        </Container>
    );
};
export default ProfileUpdate;