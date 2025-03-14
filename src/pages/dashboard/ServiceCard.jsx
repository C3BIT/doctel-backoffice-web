import PropTypes from "prop-types";
import { Card, CardContent, Typography, Button, Box } from "@mui/material";

const ServiceCard = ({ image, title, description, buttonText }) => {
  return (
    <Card
      sx={{
        backgroundColor: "#F5F6F8",
        borderRadius: 2,
        p: 3,
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        boxShadow: "none",
        textAlign: "left",
      }}
    >
      {/* Image at the top, centered */}
      <Box sx={{ display: "flex", justifyContent: "center", mb: 2 }}>
        <img
          src={image}
          alt={title}
          style={{
            height: 100,
            width: "auto",
            objectFit: "contain",
          }}
        />
      </Box>

      {/* Text Content */}
      <CardContent sx={{ padding: 0 }}>
        <Typography variant="h6" sx={{ fontWeight: 500, color: "#374151" }}>
          {title}
        </Typography>
        <Typography
          variant="body2"
          sx={{
            color: "#6B7280",
            marginBottom: 3,
          }}
        >
          {description}
        </Typography>
      </CardContent>

      {/* Button at the bottom right */}
      <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
        <Button
          variant="outlined"
          sx={{
            borderColor: "#3B82F6",
            color: "#374151",
            fontWeight: 600,
            borderRadius: 2,
            backgroundColor: "#E2F1FF",
            textTransform: "none",
            fontSize: "0.875rem",
            padding: "6px 16px",
            minWidth: "auto",
          }}
        >
          {buttonText}
        </Button>
      </Box>
    </Card>
  );
};

ServiceCard.propTypes = {
  image: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  buttonText: PropTypes.string.isRequired,
};

export default ServiceCard;
