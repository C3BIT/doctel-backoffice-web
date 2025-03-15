import { Box, Button, Card, Divider, IconButton, Typography } from "@mui/material";
import { styled } from "@mui/system";
import PrescriptionIcon from "../../assets/icons/prescription.svg";
import EyeIcon from "../../assets/icons/eye.svg";
import EditIcon from "../../assets/icons/edit.svg";
import DeleteIcon from "../../assets/icons/delete.svg";

const StyledButton = styled(Button)({
  textTransform: "none",
  fontSize: "0.875rem",
  borderRadius: 8,
  padding: "6px 12px",
});

const LabReportSection = () => {
  return (
    <Card sx={{ backgroundColor: "#F5F6F8", borderRadius: 2, p: 3, boxShadow: "none" }}>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
        <Typography variant="h6" sx={{ fontWeight: 500, color: "#374151" }}>
          Lab Report
        </Typography>
        <Box display="flex" gap={1}>
          <StyledButton variant="contained" sx={{ backgroundColor: "#E2F1FF", color: "#2563EB" }}>
            Upload
          </StyledButton>
          <IconButton sx={{ border: "1px solid #3B82F6", backgroundColor: "#E2F1FF" }}>
            <img src={PrescriptionIcon} alt="Expand" width="16" height="16" />
          </IconButton>
        </Box>
      </Box>

      {Array(4)
        .fill(null)
        .map((_, index) => (
          <Box key={index}>
            <Divider />
            <Box display="flex" justifyContent="space-between" alignItems="center" py={2}>
              <Box display="flex" alignItems="center">
                <Box mr={2}>
                  <img src={PrescriptionIcon} alt="Prescription" width="24" height="24" />
                </Box>
                <Box>
                  <Typography variant="body1" sx={{ fontWeight: 500, color: "#374151" }}>
                    12 Oct 2022
                  </Typography>
                  <Typography variant="body2" sx={{ color: "#6B7280" }}>
                    01:33 pm
                  </Typography>
                </Box>
              </Box>

              <Box display="flex" gap={1}>
                <IconButton sx={{ border: "1px solid #3B82F6", backgroundColor: "#E2F1FF" }}>
                  <img src={EyeIcon} alt="View" width="16" height="16" />
                </IconButton>
                <IconButton sx={{ border: "1px solid #F97316", backgroundColor: "#FFEAD8" }}>
                  <img src={EditIcon} alt="Edit" width="16" height="16" />
                </IconButton>
                <IconButton sx={{ border: "1px solid #EF4444", backgroundColor: "#FFECEA" }}>
                  <img src={DeleteIcon} alt="Delete" width="16" height="16" />
                </IconButton>
              </Box>
            </Box>
          </Box>
        ))}

      <Divider />
      <Box textAlign="right" pt={2}>
        <Button sx={{ color: "#6B7280", textTransform: "none", fontSize: "0.875rem" }}>
          View all
        </Button>
      </Box>
    </Card>
  );
};

export default LabReportSection;
