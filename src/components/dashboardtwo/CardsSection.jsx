import { Box, Grid, Typography } from '@mui/material';
import edictIconSvg from '../../assets/icons/call-statistics.svg';
import CallListIconSvg from '../../assets/icons/call-list.svg';
import CallTableIconSvg from '../../assets/icons/edit-icon.svg';

const CardsSection = () => {
    const cards = [
        {
            title: "Total Call",
            value: "820",
            icon: CallTableIconSvg,

            color: "#000",
            bg: "#FFE2E5"
        },
        {
            title: "Today's Call",
            value: "12",
            icon: CallListIconSvg,
            status: "+5% from yesterday",
            color: "#000",
            bg: "#FFF4DE"
        },
        {
            title: "Pending Call",
            value: "5",
            icon: edictIconSvg,
            status: "+1.2% from yesterday",
            color: "#000",
            bg: "#DCFCE7"
        }
    ];

    return (
        <Box sx={{
            p: 3,
            borderRadius: 2,
            height: "100%",
            bgcolor: "white",
            boxShadow: "0px 1px 3px rgba(0, 0, 0, 0.1)"
        }}>
            <Grid container spacing={2}>
                {cards.map((card, index) => (
                    <Grid item xs={12} sm={4} key={index}>
                        <Box
                            sx={{
                                p: 2,
                                height: "100%",
                                bgcolor: card.bg,
                                borderRadius: 2,
                                boxShadow: "none",
                                position: "relative",
                                overflow: "hidden"
                            }}
                        >
                            <Box
                                sx={{
                                    width: 40,
                                    height: 40,
                                    borderRadius: "50%",
                                    bgcolor: card.iconBg,
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    mb: 1
                                }}
                            >
                                <Box 
                                    component="img" 
                                    src={card.icon} 
                                    alt={card.title}
                                    sx={{ 
                                        width: 51, 
                                        height: 51,
                                        filter: `drop-shadow(0px 2px 2px rgba(0,0,0,0.1))`
                                    }} 
                                />
                            </Box>
                            <Typography variant="h4" fontWeight="bold" sx={{ my: 1 }}>
                                {card.value}
                            </Typography>
                            <Typography variant="body2" fontWeight="bold" color="text.secondary">
                                {card.title}
                            </Typography>
                            {card.status && (
                                <Typography variant="caption" fontWeight="bold" color="primary" sx={{ display: "block", mt: 0.5 }}>
                                    {card.status}
                                </Typography>
                            )}
                        </Box>
                    </Grid>
                ))}
            </Grid>
        </Box>
    );
};

export default CardsSection;