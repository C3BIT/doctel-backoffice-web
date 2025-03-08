import { Box, Button, Typography, IconButton } from "@mui/material";
import { Phone, Person } from "@mui/icons-material";

const DoctorOnDemand = () => {
  return (
    <Box
      sx={{
        backgroundColor: "#0052A8",
        borderRadius: 2,
        p: 3,
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        color: "white",
      }}
    >
      <Box display="flex" alignItems="center">
        <IconButton
          sx={{
            backgroundColor: "#003D80",
            color: "white",
            mr: 2,
            "&:hover": { backgroundColor: "#002A5E" },
          }}
        >
          <Person />
        </IconButton>
        <Box>
          <Typography variant="h6" fontWeight="medium">
            Doctor on Demand
          </Typography>
          <Typography variant="body2" color="rgba(255, 255, 255, 0.8)">
            24x7 Consultation without appointment.
          </Typography>
        </Box>
      </Box>
      <Button
        variant="contained"
        sx={{
          backgroundColor: "#F5F6F8",
          color: "#2563EB",
          fontWeight: "medium",
          textTransform: "none",
          "&:hover": { backgroundColor: "#E0E1E5" },
        }}
        startIcon={<Phone />}
      >
        Call Now
      </Button>
    </Box>
  );
};

export default DoctorOnDemand;
