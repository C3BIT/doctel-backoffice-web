import { Box, Grid } from "@mui/material";
import ProfileSection from "./ProfileSection";
import DoctorOnDemand from "./DoctorOnDemand";
import ServiceCard from "./ServiceCard";
import PrescriptionSection from "./PrescriptionSection";
import LabReportSection from "./LabReportSection";
import PaperPrescriptionSection from "./PaperPrescriptionSection";

const Dashboard = () => {
  return (
    <Box sx={{ backgroundColor: "white", minHeight: "100vh", p: 4, borderRadius: 4, fontFamily: "sans-serif" }}>
        <Grid container spacing={4}>
          <Grid item xs={12} md={8}>
            <Box sx={{ display: "flex", flexDirection: "column", gap: 4 }}>
              <ProfileSection />
              <DoctorOnDemand />
              <Grid container spacing={4}>
                <Grid item xs={12} md={6}>
                  <ServiceCard
                    image="https://img.freepik.com/free-vector/videocalling-with-therapist_23-2148517118.jpg?t=st=1741243266~exp=1741246866~hmac=0a1f3acc6e0991a9b58f6284ed0abf4625f2c2317f93c82d5ff0cf04e3102047&w=900"
                    title="Contact Free"
                    description="Connect with us anytime for free"
                    buttonText="Chat Now"
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <ServiceCard
                    image="https://img.freepik.com/free-vector/humanitarian-help-people-donating-sanitary-protection-equipment-concept-illustration_114360-1775.jpg?t=st=1741243717~exp=1741247317~hmac=58a2bee738bc3fecbcdbf5f00372b48b5c19761857af283563dcea7cd8e8aa3a&w=900"
                    title="Buy Package"
                    description="Buy health package & get 24x7 consultation"
                    buttonText="Buy Now"
                  />
                </Grid>
              </Grid>
            </Box>
          </Grid>
          <Grid item xs={12} md={4}>
            <Box sx={{ display: "flex", flexDirection: "column", gap: 4 }}>
              <PrescriptionSection />
              <LabReportSection />
              <PaperPrescriptionSection />
            </Box>
          </Grid>
        </Grid>
    </Box>
  );
};

export default Dashboard;
