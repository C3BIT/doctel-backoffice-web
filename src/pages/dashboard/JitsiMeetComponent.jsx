import PropTypes from "prop-types";
import { useEffect, useRef, useState } from "react";
import { Box, IconButton, Typography } from "@mui/material";
import MicIcon from "@mui/icons-material/Mic";
import MicOffIcon from "@mui/icons-material/MicOff";
import VideocamIcon from "@mui/icons-material/Videocam";
import VideocamOffIcon from "@mui/icons-material/VideocamOff";
import CallEndIcon from "@mui/icons-material/CallEnd";

const callingRingtone = "/sounds/calling-ringtone.mp3";

const JitsiMeetComponent = ({
  roomName,
  displayName = "User",
  onLeave,
  showInHalfScreen = false,
  isIncoming = false,
}) => {
  const jitsiContainerRef = useRef(null);
  const audioRef = useRef(null);
  const jitsiApiRef = useRef(null);
  const [isAudioMuted, setIsAudioMuted] = useState(false);
  const [isVideoMuted, setIsVideoMuted] = useState(false);
  const [isCallConnected, setIsCallConnected] = useState(false);

  useEffect(() => {
    const loadJitsiScript = () => {
      return new Promise((resolve, reject) => {
        if (window.JitsiMeetExternalAPI) {
          resolve();
          return;
        }

        const script = document.createElement("script");
        script.src = "https://call.bloomattires.com/external_api.js";
        script.async = true;
        script.onload = resolve;
        script.onerror = reject;
        document.body.appendChild(script);
      });
    };

    const initializeJitsi = async () => {
      try {
        if (jitsiApiRef.current) {
          console.warn("Jitsi already initialized, skipping duplicate initialization.");
          return;
        }

        await loadJitsiScript();

        if (!window.JitsiMeetExternalAPI || !jitsiContainerRef.current) {
          console.error("Jitsi API not loaded or container not ready");
          return;
        }

        if (audioRef.current) {
          audioRef.current.play().catch((e) => console.log("Audio autoplay prevented:", e));
        }

        const cleanRoomName = roomName.includes("/") ? roomName.split("/").pop() : roomName;
        const domain = "call.bloomattires.com";
        const options = {
          roomName: cleanRoomName,
          width: "100%",
          height: "100%",
          parentNode: jitsiContainerRef.current,
          configOverwrite: {
            prejoinPageEnabled: false,
            disableDeepLinking: true,
            defaultLanguage: "en",
            toolbarButtons: ["microphone", "camera", "hangup"],
          },
          interfaceConfigOverwrite: {
            SHOW_JITSI_WATERMARK: false,
            SHOW_WATERMARK_FOR_GUESTS: false,
            DEFAULT_BACKGROUND: "#1e3a5f",
            DISABLE_JOIN_LEAVE_NOTIFICATIONS: true,
            HIDE_INVITE_MORE_HEADER: true,
            MOBILE_APP_PROMO: false,
            SHOW_CHROME_EXTENSION_BANNER: false,
            TOOLBAR_BUTTONS: ["microphone", "camera", "hangup"],
            TOOLBAR_ALWAYS_VISIBLE: false,
          },
          userInfo: { displayName },
        };

        const api = new window.JitsiMeetExternalAPI(domain, options);
        jitsiApiRef.current = api;

        api.addEventListener("videoConferenceJoined", () => {
          console.log("Joined conference!");
          setIsCallConnected(true);
          if (audioRef.current) {
            audioRef.current.pause();
            audioRef.current.currentTime = 0;
          }
        });

        api.addEventListener("audioMuteStatusChanged", (muted) => {
          setIsAudioMuted(muted.muted);
        });

        api.addEventListener("videoMuteStatusChanged", (muted) => {
          setIsVideoMuted(muted.muted);
        });

        api.addEventListener("readyToClose", () => {
          if (onLeave) onLeave();
        });

        api.executeCommand("subject", "");
      } catch (error) {
        console.error("Error initializing Jitsi:", error);
      }
    };

    initializeJitsi();

    return () => {
      if (jitsiApiRef.current) {
        jitsiApiRef.current.dispose();
        jitsiApiRef.current = null;
      }
      if (audioRef.current) {
        audioRef.current.pause();
      }
    };
  }, [roomName, displayName, onLeave]);

  const toggleAudio = () => {
    jitsiApiRef.current?.executeCommand("toggleAudio");
  };

  const toggleVideo = () => {
    jitsiApiRef.current?.executeCommand("toggleVideo");
  };

  const leaveCall = () => {
    jitsiApiRef.current?.executeCommand("hangup");
    if (onLeave) onLeave();
  };

  return (
    <Box
      sx={{
        position: showInHalfScreen ? "relative" : "fixed",
        top: showInHalfScreen ? "auto" : 0,
        left: showInHalfScreen ? "auto" : 0,
        width: showInHalfScreen ? "100%" : "100vw",
        height: showInHalfScreen ? "70vh" : "100vh",
        zIndex: 1000,
        display: "flex",
        flexDirection: "column",
        overflow: "hidden",
        borderRadius: showInHalfScreen ? 2 : 0,
        boxShadow: showInHalfScreen ? 3 : "none",
      }}
    >
      <audio ref={audioRef} src={callingRingtone} loop style={{ display: "none" }} />

      <Box
        ref={jitsiContainerRef}
        sx={{
          flex: 1,
          position: "relative",
          "& iframe": {
            border: "none",
            width: "100%",
            height: "100%",
          },
        }}
      />

      <Box
        sx={{
          position: "absolute",
          bottom: 16,
          left: "50%",
          transform: "translateX(-50%)",
          display: "flex",
          justifyContent: "center",
          gap: 2,
          zIndex: 1001,
          backgroundColor: "rgba(0,0,0,0.5)",
          borderRadius: 8,
          padding: "8px 16px",
        }}
      >
        <IconButton
          onClick={toggleAudio}
          sx={{
            bgcolor: isAudioMuted ? "error.main" : "success.main",
            color: "white",
            "&:hover": {
              bgcolor: isAudioMuted ? "error.dark" : "success.dark",
            },
            width: 48,
            height: 48,
          }}
        >
          {isAudioMuted ? <MicOffIcon /> : <MicIcon />}
        </IconButton>

        <IconButton
          onClick={toggleVideo}
          sx={{
            bgcolor: isVideoMuted ? "error.main" : "success.main",
            color: "white",
            "&:hover": {
              bgcolor: isVideoMuted ? "error.dark" : "success.dark",
            },
            width: 48,
            height: 48,
          }}
        >
          {isVideoMuted ? <VideocamOffIcon /> : <VideocamIcon />}
        </IconButton>

        <IconButton
          onClick={leaveCall}
          sx={{
            bgcolor: "error.main",
            color: "white",
            "&:hover": { bgcolor: "error.dark" },
            width: 48,
            height: 48,
          }}
        >
          <CallEndIcon />
        </IconButton>
      </Box>

      {!isCallConnected && (
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            bgcolor: "rgba(0,0,0,0.7)",
            color: "white",
            padding: 2,
            borderRadius: 2,
            zIndex: 1001,
          }}
        >
          <Typography variant="h6">
            {isIncoming ? "Connecting to call..." : "Calling..."}
          </Typography>
        </Box>
      )}
    </Box>
  );
};

JitsiMeetComponent.propTypes = {
  roomName: PropTypes.string.isRequired,
  displayName: PropTypes.string,
  onLeave: PropTypes.func,
  showInHalfScreen: PropTypes.bool,
  isIncoming: PropTypes.bool,
};

export default JitsiMeetComponent;
