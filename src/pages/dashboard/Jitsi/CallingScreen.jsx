import { useEffect, useRef, useState } from "react";
import PropTypes from "prop-types";
import { Box, Modal, Typography, IconButton, Avatar } from "@mui/material";
import CallEndIcon from "@mui/icons-material/CallEnd";
import SettingsIcon from "@mui/icons-material/Settings";
import FlipCameraAndroidIcon from "@mui/icons-material/FlipCameraAndroid";
import CallIcon from "@mui/icons-material/Call";

const CallingScreen = ({ 
  open, 
  callTarget, 
  isIncoming, 
  onAccept, 
  onReject, 
  onEnd, 
  onClose 
}) => {
  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    const audioElement = audioRef.current;

    if (open && audioElement && !isPlaying) {
      audioElement
        .play()
        .then(() => {
          setIsPlaying(true);
          console.log("Ringtone started");
        })
        .catch((err) => console.error("Audio play failed:", err));
    }

    return () => {
      if (audioElement) {
        audioElement.pause();
        audioElement.currentTime = 0;
        setIsPlaying(false);
        console.log("Ringtone stopped (cleanup)");
      }
    };
  }, [open, isPlaying]);

  const stopAudio = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
      setIsPlaying(false);
    }
  };

  const handleAccept = () => {
    console.log("Accept button pressed");
    stopAudio();
    onAccept();
    onClose();
  };

  const handleReject = () => {
    console.log("Reject button pressed");
    stopAudio();
    onReject();
  };

  const handleEnd = () => {
    console.log("End button pressed");
    stopAudio();
    onEnd();
  };

  return (
    <Modal open={open} disableEscapeKeyDown disableAutoFocus>
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: "100%",
          maxWidth: 400,
          height: 550,
          bgcolor: "#1e3a5f",
          color: "white",
          borderRadius: 4,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "space-between",
          p: 2,
          boxShadow: 24,
          outline: "none",
        }}
      >
        <Box sx={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", mt: 8 }}>
          {callTarget?.image ? (
            <Avatar src={callTarget.image} sx={{ width: 120, height: 120, mb: 2 }} alt={callTarget.name} />
          ) : (
            <Avatar sx={{ width: 120, height: 120, bgcolor: "white", mb: 2 }}>
              <Typography variant="h3" color="primary">
                {callTarget?.name?.[0] || "?"}
              </Typography>
            </Avatar>
          )}

          <Typography variant="h5" sx={{ mb: 1, fontWeight: "bold" }}>
            {callTarget?.name || "Unknown Caller"}
          </Typography>
          <Typography variant="body1" sx={{ mb: 4 }}>
            {isIncoming ? "Incoming call..." : "Calling..."}
          </Typography>
        </Box>

        <Box sx={{ display: "flex", justifyContent: "center", gap: 2, mb: 4, width: "100%" }}>
          {isIncoming ? (
            <>
              <IconButton sx={{ bgcolor: "error.main", "&:hover": { bgcolor: "error.dark" }, p: 2 }} onClick={handleReject}>
                <CallEndIcon sx={{ color: "white", fontSize: 32 }} />
              </IconButton>
              <IconButton sx={{ bgcolor: "success.main", "&:hover": { bgcolor: "success.dark" }, p: 2 }} onClick={handleAccept}>
                <CallIcon sx={{ color: "white", fontSize: 32 }} />
              </IconButton>
            </>
          ) : (
            <IconButton sx={{ bgcolor: "error.main", "&:hover": { bgcolor: "error.dark" }, p: 2 }} onClick={handleEnd}>
              <CallEndIcon sx={{ color: "white", fontSize: 32 }} />
            </IconButton>
          )}
        </Box>

        <Box sx={{ width: "100%", display: "flex", justifyContent: "space-between", px: 4, mb: 2 }}>
          <IconButton sx={{ color: "white" }}>
            <FlipCameraAndroidIcon />
          </IconButton>
          <Typography sx={{ color: "white" }}>
            {new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
          </Typography>
          <IconButton sx={{ color: "white" }}>
            <SettingsIcon />
          </IconButton>
        </Box>
      </Box>
    </Modal>
  );
};

CallingScreen.propTypes = {
  open: PropTypes.bool.isRequired,
  callTarget: PropTypes.shape({
    name: PropTypes.string,
    image: PropTypes.string,
  }),
  isIncoming: PropTypes.bool.isRequired,
  onAccept: PropTypes.func.isRequired,
  onReject: PropTypes.func.isRequired,
  onEnd: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired, 
};

export default CallingScreen;
