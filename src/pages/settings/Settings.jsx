import { Box, Grid } from '@mui/material';
import SummarySection from '../../components/dashboardtwo/SummarySection';
import ChartSection from '../../components/dashboardtwo/ChartSection';
import RecentPatientsSection from '../../components/dashboardtwo/RecentPatientsSection';
import CardsSection from '../../components/dashboardtwo/CardsSection';
const Settings = () => {
    return (
        <div>
            <Box sx={{ p: 3 }}>
                <Grid container spacing={3}>
                    <Grid item xs={12} md={12} lg={7}>
                        <CardsSection />
                    </Grid>
                    <Grid item xs={12} md={12} lg={5}>
                        <SummarySection />
                    </Grid>
                </Grid>
            </Box>
            <Box sx={{ p: 3 }}>
                <Grid container spacing={3}>
                    <Grid item xs={12} md={12} lg={7}>
                        <ChartSection />
                    </Grid>
                    <Grid item xs={12} md={12} lg={5}>
                        <RecentPatientsSection />
                    </Grid>
                </Grid>
            </Box>
        </div>
    );
};

export default Settings;