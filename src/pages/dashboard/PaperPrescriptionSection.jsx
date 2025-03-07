import { Box, Button, IconButton, Typography } from "@mui/material";
import { CloudUpload, ArrowRight } from "lucide-react";

const PaperPrescriptionSection = () => {
  return (
    <Box sx={{ backgroundColor: "#F5F6F8", borderRadius: 2, p: 3 }}>
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Box>
          <Typography variant="body1"   sx={{ fontWeight: "bold" }} color="textSecondary">
            Paper Prescription
          </Typography>
          <Typography variant="body2" color="textSecondary">
            List of your electronic prescriptions.
          </Typography>
        </Box>
        <Box display="flex" gap={1}>
          <Button
            variant="outlined"
            color="primary"
            startIcon={<CloudUpload size={18} />}
            sx={{ textTransform: "none" }}
          >
            Upload
          </Button>
          <IconButton color="primary" sx={{ border: "1px solid", borderColor: "primary.main" }}>
            <ArrowRight size={18} />
          </IconButton>
        </Box>
      </Box>
    </Box>
  );
};

export default PaperPrescriptionSection;