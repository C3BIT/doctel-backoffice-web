import { Box, Grid } from '@mui/material';
import SummarySection from '../../components/dashboardtwo/SummarySection';
import CallDataTable from '../../components/CallHistory/CallDataTable';
const CallHistory = () => {
    return (
        <Box  sx={{
            minHeight: "100vh",
            p: 4,
            borderRadius: 4,
            fontFamily: "sans-serif",
          }}>
            <Box >
                <Grid container spacing={3}>
                    <Grid item xs={12} md={12} lg={8}xl={7}>
                        <CallDataTable />
                    </Grid>
                    <Grid item xs={12} md={12} lg={4} xl={5}>
                    <Box sx={{ 
                        height: { xs: 'auto', lg: '60%' }, // Half height on lg and up
                        display: 'flex',
                        flexDirection: 'column'
                    }}>
                        <SummarySection />
                    </Box>
                    </Grid>
                </Grid>
            </Box>

        </Box>
    );
};

export default CallHistory;