import { useState } from "react";
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
} from "@mui/material";
import { ArrowBack } from "@mui/icons-material";
import CameraAltOutlinedIcon from "@mui/icons-material/CameraAltOutlined";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { Link } from "react-router-dom";
import AvatarImage from '../../assets/avatar.png';
const ProfileUpdate = () => {
    const [profileData, setProfileData] = useState({
        name: "",
        age: "",
        sex: "",
        mobile: "",
        email: "",
        location: "",
        bloodGroup: "",
        height: "",
        weight: "",
        subscription: "Monthly Pack", // Static value
        expire: "31 December 2022", // Static value
    });

    const [profileImage, setProfileImage] = useState(null);

    const handleChange = (field) => (event) => {
        setProfileData({
            ...profileData,
            [field]: event.target.value,
        });
    };

    const handleImageChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            setProfileImage(file);
        }
    };

    const handleUpdate = () => {
        console.log("Updated profile data:", profileData);
        console.log("Profile image:", profileImage);
        // Handle update logic here
    };

    return (
        <Container maxWidth="lg" sx={{ py: 2 }}>
            <Box
                sx={{
                    display: "flex",
                    alignItems: "center",
                    mb: 2,
                }}
            >
                <Box sx={{ marginBottom: "16px" }}>
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
                        </Button></Link>
                </Box>
            </Box>

            <Typography
                variant="h4"
                component="h1"
                sx={{
                    color: "#3EDAC5",
                    fontWeight: 700,
                    mb: 0.5,
                }}
            >
                Profile
            </Typography>

            <Typography
                variant="body2"
                sx={{
                    color: "#000000333",
                    fontWeight: 300,
                    mb: 2,
                }}
            >
                List of your electronic prescriptions
            </Typography>

            <Divider sx={{ mb: 3 }} />

            <Paper
                elevation={0}
                sx={{
                    backgroundColor: "#f5f5f5",
                    borderRadius: 2,
                    p: { xs: 2, md: 3 },
                    mb: 3,
                }}
            >
                <Box
                    sx={{
                        display: "flex",
                        flexDirection: { xs: "column", md: "row" },
                        gap: 4,
                    }}
                >
                    <Box
                        sx={{
                            flex: "0 0 auto",
                            width: { xs: "100%", md: "auto" },
                            display: "flex",
                            justifyContent: { xs: "center", md: "flex-start" },
                        }}
                    >
                        <Card
                            sx={{
                                width: 200,
                                height: 200,
                                position: "relative",
                                borderRadius: 2,
                                border: "5px solid #0070C0",
                                boxShadow: "none",
                            }}
                        >
                            <CardMedia
                                component="img"
                                image={
                                    AvatarImage
                                }
                                alt="Profile"
                                sx={{ height: "100%", objectFit: "cover" }}
                            />
                            <IconButton
                                sx={{
                                    position: "absolute",
                                    right: 8,
                                    top: 8,
                                    backgroundColor: "white",
                                    color:'#0052A8',
                                    "&:hover": {
                                        backgroundColor: "white",
                                    },
                                }}
                            >
                                <label htmlFor="profile-image-upload">
                                    <CameraAltOutlinedIcon />
                                </label>
                            </IconButton>
                            <input
                                id="profile-image-upload"
                                type="file"
                                accept="image/*"
                                style={{ display: "none" }}
                                onChange={handleImageChange}
                            />
                        </Card>
                    </Box>

                    <Box sx={{ flex: "1 1 auto" }}>
                        <Typography
                            variant="h6"
                            sx={{
                                color: "#0052A8",
                                fontWeight: 500,
                                mb: 2,
                            }}
                        >
                            Personal Information
                        </Typography>

                        <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
                            <Box sx={{ display: "flex", alignItems: "center" }}>
                                <Typography sx={{ width: 100, color: "#000000" }}>
                                    Name*
                                </Typography>
                                <Typography sx={{ mx: 1 }}>:</Typography>
                                <TextField
                                    size="small"
                                    value={profileData.name}
                                    onChange={handleChange("name")}
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

                            <Box sx={{ display: "flex", alignItems: "center" }}>
                                <Typography sx={{ width: 100, color: "#000000" }}>Age*</Typography>
                                <Typography sx={{ mx: 1 }}>:</Typography>
                                <TextField
                                    size="small"
                                    value={profileData.age}
                                    onChange={handleChange("age")}
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

                            <Box sx={{ display: "flex", alignItems: "center" }}>
                                <Typography sx={{ width: 100, color: "#000000" }}>Sex*</Typography>
                                <Typography sx={{ mx: 1 }}>:</Typography>
                                <Select
                                    size="small"
                                    value={profileData.sex}
                                    onChange={handleChange("sex")}
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
                                    <MenuItem value="Male">Male</MenuItem>
                                    <MenuItem value="Female">Female</MenuItem>
                                    <MenuItem value="Other">Other</MenuItem>
                                </Select>
                            </Box>

                            <Box sx={{ display: "flex", alignItems: "center" }}>
                                <Typography sx={{ width: 100, color: "#000000" }}>
                                    Mobile
                                </Typography>
                                <Typography sx={{ mx: 1 }}>:</Typography>
                                <TextField
                                    size="small"
                                    value={profileData.mobile}
                                    onChange={handleChange("mobile")}
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

                            <Box sx={{ display: "flex", alignItems: "center" }}>
                                <Typography sx={{ width: 100, color: "#000000" }}>
                                    E-mail
                                </Typography>
                                <Typography sx={{ mx: 1 }}>:</Typography>
                                <TextField
                                    size="small"
                                    value={profileData.email}
                                    onChange={handleChange("email")}
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

                            <Box sx={{ display: "flex", alignItems: "center" }}>
                                <Typography sx={{ width: 100, color: "#000000" }}>
                                    Location
                                </Typography>
                                <Typography sx={{ mx: 1 }}>:</Typography>
                                <Select
                                    size="small"
                                    value={profileData.location}
                                    onChange={handleChange("location")}
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
                                    <MenuItem value="Motijheel, Dhaka">Motijheel, Dhaka</MenuItem>
                                    <MenuItem value="Gulshan, Dhaka">Gulshan, Dhaka</MenuItem>
                                    <MenuItem value="Dhanmondi, Dhaka">Dhanmondi, Dhaka</MenuItem>
                                </Select>
                            </Box>
                        </Box>

                        <Typography
                            variant="h6"
                            sx={{
                                color: "#0052A8",
                                fontWeight: 500,
                                mt: 3,
                                mb: 2,
                            }}
                        >
                            Health Information
                        </Typography>

                        <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
                            <Box sx={{ display: "flex", alignItems: "center" }}>
                                <Typography sx={{ width: 100, color: "#000000" }}>
                                    Blood Group
                                </Typography>
                                <Typography sx={{ mx: 1 }}>:</Typography>
                                <Select
                                    size="small"
                                    value={profileData.bloodGroup}
                                    onChange={handleChange("bloodGroup")}
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
                                    <MenuItem value="A+">A+</MenuItem>
                                    <MenuItem value="A-">A-</MenuItem>
                                    <MenuItem value="B+">B+</MenuItem>
                                    <MenuItem value="B-">B-</MenuItem>
                                    <MenuItem value="AB+">AB+</MenuItem>
                                    <MenuItem value="AB-">AB-</MenuItem>
                                    <MenuItem value="O+">O+</MenuItem>
                                    <MenuItem value="O-">O-</MenuItem>
                                </Select>
                            </Box>

                            <Box sx={{ display: "flex", alignItems: "center" }}>
                                <Typography sx={{ width: 100, color: "#000000" }}>
                                    Height
                                </Typography>
                                <Typography sx={{ mx: 1 }}>:</Typography>
                                <TextField
                                    size="small"
                                    value={profileData.height}
                                    onChange={handleChange("height")}
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

                            <Box sx={{ display: "flex", alignItems: "center" }}>
                                <Typography sx={{ width: 100, color: "#000000" }}>
                                    Weight
                                </Typography>
                                <Typography sx={{ mx: 1 }}>:</Typography>
                                <TextField
                                    size="small"
                                    value={profileData.weight}
                                    onChange={handleChange("weight")}
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
                        </Box>

                        <Typography
                            variant="h6"
                            sx={{
                                color: "#C2CCCE",
                                fontWeight: 500,
                                mt: 3,
                                mb: 2,
                                opacity: 0.5,
                            }}
                        >
                            Account Information
                        </Typography>

                        <Box
                            sx={{
                                display: "flex",
                                flexDirection: "column",
                                gap: 2,
                                opacity: 0.5,
                            }}
                        >
                            <Box sx={{ display: "flex", alignItems: "center" }}>
                                <Typography sx={{ width: 100, color: "#C2CCCE" }}>
                                    Subscription
                                </Typography>
                                <Typography sx={{ mx: 1 }}>:</Typography>
                                <Typography>{profileData.subscription}</Typography>
                            </Box>

                            <Box sx={{ display: "flex", alignItems: "center" }}>
                                <Typography sx={{ width: 100, color: "#C2CCCE" }}>
                                    Expire
                                </Typography>
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
                        Update
                    </Button>
                </Box>
            </Paper>
        </Container>
    );
};

export default ProfileUpdate;