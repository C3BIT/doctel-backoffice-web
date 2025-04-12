import { Box, Typography, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

const CallEndModal = ({ callTarget, jitsiRoom, callDuration, onClose }) => {
  const formatDuration = (duration) => {
    const minutes = Math.floor(duration / 60);
    const seconds = duration % 60;
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  };

  return (
    <Box 
      sx={{ 
        width: "100%", 
        height: "100%", 
        position: "relative", 
        display: "flex", 
        flexDirection: "column" 
      }}
    >
      <Box sx={{ position: "absolute", top: 12, right: 12, zIndex: 10 }}>
        <IconButton
          onClick={onClose}
          aria-label="close"
          sx={{
            bgcolor: "rgba(0,0,0,0.1)",
            "&:hover": { bgcolor: "rgba(0,0,0,0.2)" },
          }}
        >
          <CloseIcon />
        </IconButton>
      </Box>

      <Box sx={{ display: "flex", alignItems: "center", gap: 2, mb: 4, justifyContent: "center", mt: 4 }}>
        <Box
          component="img"
          src={callTarget.image}
          alt={callTarget.name}
          sx={{
            width: 80,
            height: 80,
            borderRadius: "50%",
            objectFit: "cover",
          }}
        />
        <Box>
          <Typography variant="h6">{callTarget.name}</Typography>
          <Typography variant="body2" color="text.secondary">
            Phone: {callTarget.phone}
          </Typography>
        </Box>
      </Box>

      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          flex: 1,
        }}
      >
        <Typography variant="h6" sx={{ mb: 1 }}>
          Total Call Duration
        </Typography>

        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            bgcolor: "#f5f5f5",
            borderRadius: "50%",
            width: 180,
            height: 180,
            mb: 4,
          }}
        >
          <Typography variant="h3" sx={{ fontWeight: "bold" }}>
            {formatDuration(callDuration)}
          </Typography>
        </Box>

        <Box sx={{ p: 3, bgcolor: "#f8f9fa", width: "100%", maxWidth: 400 }}>
          <Typography variant="body2" sx={{ mb: 1 }}>
            <strong>Date:</strong> {new Date().toLocaleDateString()}
          </Typography>
          <Typography variant="body2">
            <strong>Time:</strong> {new Date().toLocaleTimeString()}
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default CallEndModal;