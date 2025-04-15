import {Visibility, Edit, Delete, InsertDriveFile } from "@mui/icons-material";
import {
    Box,
    Button,
    Typography,
    Divider,
    Grid,
    Paper,
    Avatar,
    IconButton,
    CircularProgress,
} from "@mui/material";
import {  Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getUserDetails } from "../../redux/auth/authSlice";
import { useEffect } from "react";
import PropTypes from "prop-types";


const SectionHeading = ({ children, ...props }) => (
    <Typography
        variant="h6"
        sx={{ color: "#1d4ed8", fontWeight: "600", marginBottom: "8px" }}
        {...props}
    >
        {children}
    </Typography>
);

const InfoCard = ({ title, children, actionButton = null }) => (
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
                {title}
            </Typography>
            {actionButton}
        </Box>
        {children}
    </Paper>
);

const DocumentItem = ({ title, subtitle, date = null, actions = null }) => (
    <Box
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
                {title}
            </Typography>
            <Typography variant="body2" sx={{ color: "#6b7280" }}>
                {subtitle}
            </Typography>
            {date && (
                <Typography variant="body2" sx={{ color: "#9ca3af" }}>
                    {date}
                </Typography>
            )}
        </Box>
        {actions}
    </Box>
);

const ActionButtons = () => (
    <Box sx={{ display: "flex", gap: "4px" }}>
        {[
            { icon: <Visibility sx={{ fontSize: "14px" }} />, label: "View" },
            { icon: <Edit sx={{ fontSize: "14px" }} />, label: "Edit" },
            { icon: <Delete sx={{ fontSize: "14px" }} />, label: "Delete" },
        ].map((action, index) => (
            <IconButton
                key={`action-${index}`}
                aria-label={action.label}
                sx={{
                    width: "24px",
                    height: "24px",
                    border: "1px solid #3b82f6",
                    color: "#3b82f6",
                }}
            >
                {action.icon}
            </IconButton>
        ))}
    </Box>
);

const InfoItem = ({ label, value }) => (
    <Grid item xs={12}>
        <Typography variant="body2" sx={{ color: "#4b5563" }}>
            <strong>{label} :</strong> {value}
        </Typography>
    </Grid>
);

const UploadButton = () => (
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
);

const ProfileContent = ({ userDetails }) => {
    return (
        <Box
        sx={{
            backgroundColor: "white",
            minHeight: "100vh",
            p: 4,
            borderRadius: 4,
            fontFamily: "sans-serif",
          }}
        >
            

            <Box sx={{ marginBottom: "16px" }}>
                <Typography variant="h5" sx={{ color: "#10b981", fontWeight: "500" }}>
                    Profile
                </Typography>
                <Divider sx={{ borderColor: "#d1d5db", marginTop: "8px" }} />
            </Box>

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
                            <img
                                src={userDetails?.profileImage}
                                alt="Profile"
                                style={{ width: "100%" }}
                                onError={(e) => {
                                    e.target.onerror = null;
                                    e.target.src = "https://via.placeholder.com/140x140?text=Profile";
                                }}
                            />
                        </Box>
                    </Grid>

                    <Grid item xs={12} md={9}>
                        <Box
                            sx={{
                                display: "flex",
                                justifyContent: "space-between",
                                alignItems: "center",
                                marginBottom: "8px",
                            }}
                        >
                            <SectionHeading>Personal Information</SectionHeading>
                            <Link to="/update/profile" style={{ textDecoration: "none" }}>
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
                        </Box>

                        <Grid container spacing={1} sx={{ marginBottom: "16px" }}>
                            <InfoItem
                                label="Name"
                                value={`${userDetails?.firstName || ""} ${userDetails?.lastName || ""}`}
                            />
                            <InfoItem
                                label="Mobile"
                                value={userDetails?.phone || ""}
                            />
                            <InfoItem
                                label="Clinic Address"
                                value={userDetails?.profile?.clinicAddress || ""}
                            />
                        </Grid>

                        <SectionHeading>Profile Information</SectionHeading>
                        <Grid container spacing={1} sx={{ marginBottom: "16px" }}>
                            <InfoItem
                                label="Qualification"
                                value={userDetails?.profile?.qualification || ""}
                            />
                            <InfoItem
                                label="Specialization"
                                value={userDetails?.profile?.specialization || ""}
                            />
                            <InfoItem
                                label="Experience"
                                value={userDetails?.profile?.experience || ""}
                            />
                            <InfoItem
                                label="Consultation Fee"
                                value={userDetails?.profile?.consultationFee || ""}
                            />
                        </Grid>

                        <SectionHeading>Account Information</SectionHeading>
                        <Grid container spacing={1}>
                            <InfoItem
                                label="Subscription"
                                value="Monthly Pack"
                            />
                            <InfoItem
                                label="Expire"
                                value="31 December 2022"
                            />
                        </Grid>
                    </Grid>
                </Grid>
            </Paper>

            <Grid container spacing={3}>
                <Grid item xs={12} md={4}>
                    <InfoCard title="E-Prescription">
                        {[1, 2, 3].map((item) => (
                            <DocumentItem
                                key={`e-prescription-${item}`}
                                title="Dr. Shariar Islam"
                                subtitle="Patient: Kazi Ruksana"
                                date="10 Jan 22"
                            />
                        ))}
                    </InfoCard>
                </Grid>

                <Grid item xs={12} md={4}>
                    <InfoCard
                        title="Lab Report"
                        actionButton={<UploadButton />}
                    >
                        {[1, 2, 3].map((item) => (
                            <DocumentItem
                                key={`lab-report-${item}`}
                                title="12 Oct 2022"
                                subtitle="01:33 pm"
                                actions={<ActionButtons />}
                            />
                        ))}
                    </InfoCard>
                </Grid>

                <Grid item xs={12} md={4}>
                    <InfoCard
                        title="Paper Prescription"
                        actionButton={<UploadButton />}
                    >
                        {[1, 2, 3].map((item) => (
                            <DocumentItem
                                key={`paper-prescription-${item}`}
                                title="12 Oct 2022"
                                subtitle="01:33 pm"
                                actions={<ActionButtons />}
                            />
                        ))}
                    </InfoCard>
                </Grid>
            </Grid>
        </Box>
    );
};

const Profile = () => {
    const dispatch = useDispatch();
    const { userDetails, isLoading, token } = useSelector((state) => state.user);

    useEffect(() => {
        if (token) {
            dispatch(getUserDetails(token));
        }
    }, [dispatch, token]);


    return isLoading ? <CircularProgress color="primary" /> : <ProfileContent userDetails={userDetails} />;
};

SectionHeading.propTypes = {
    children: PropTypes.node.isRequired,
};

InfoCard.propTypes = {
    title: PropTypes.string.isRequired,
    children: PropTypes.node.isRequired,
    actionButton: PropTypes.node,
};

InfoCard.defaultProps = {
    actionButton: null,
};

DocumentItem.propTypes = {
    title: PropTypes.string.isRequired,
    subtitle: PropTypes.string.isRequired,
    date: PropTypes.string,
    actions: PropTypes.node,
};

DocumentItem.defaultProps = {
    date: null,
    actions: null,
};

InfoItem.propTypes = {
    label: PropTypes.string.isRequired,
    value: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number,
    ]),
};

InfoItem.defaultProps = {
    value: '',
};

ProfileContent.propTypes = {
    userDetails: PropTypes.shape({
        firstName: PropTypes.string,
        lastName: PropTypes.string,
        phone: PropTypes.string,
        profileImage: PropTypes.string,
        profile: PropTypes.shape({
            clinicAddress: PropTypes.string,
            qualification: PropTypes.string,
            specialization: PropTypes.string,
            experience: PropTypes.string,
            consultationFee: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
        }),
    }),
};

ProfileContent.defaultProps = {
    userDetails: {},
};

export default Profile;