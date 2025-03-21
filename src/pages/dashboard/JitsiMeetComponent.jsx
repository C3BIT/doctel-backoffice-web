/* eslint-disable react-hooks/exhaustive-deps */
import PropTypes from "prop-types";
import { useEffect, useRef, useState } from "react";
import { Box, IconButton, Typography } from "@mui/material";
import MicIcon from "@mui/icons-material/Mic";
import MicOffIcon from "@mui/icons-material/MicOff";
import VideocamIcon from "@mui/icons-material/Videocam";
import VideocamOffIcon from "@mui/icons-material/VideocamOff";
import CallEndIcon from "@mui/icons-material/CallEnd";
import { useWebSocket } from "../../providers/WebSocketProvider";

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
  const initializationAttemptedRef = useRef(false);
  const [isAudioMuted, setIsAudioMuted] = useState(false);
  const [isVideoMuted, setIsVideoMuted] = useState(false);
  const [isCallConnected, setIsCallConnected] = useState(false);
  const { socket } = useWebSocket();

  useEffect(() => {
    if (initializationAttemptedRef.current) {
      return;
    }
    
    initializationAttemptedRef.current = true;
    
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
            enableClosePage: false,
            disableInviteFunctions: true,
            toolbarButtons: [],
            notifications: [],
            disableInitialGUM: false,
          },
          interfaceConfigOverwrite: {
            SHOW_JITSI_WATERMARK: false,
            SHOW_WATERMARK_FOR_GUESTS: false,
            DEFAULT_BACKGROUND: "#1e3a5f",
            DISABLE_JOIN_LEAVE_NOTIFICATIONS: true,
            HIDE_INVITE_MORE_HEADER: true,
            MOBILE_APP_PROMO: false,
            SHOW_CHROME_EXTENSION_BANNER: false,
            TOOLBAR_BUTTONS: [],
            TOOLBAR_ALWAYS_VISIBLE: false,
            DISABLE_FOCUS_INDICATOR: true,
            DISABLE_VIDEO_BACKGROUND: false,
            DISABLE_DOMINANT_SPEAKER_INDICATOR: true,
            DISPLAY_WELCOME_PAGE_CONTENT: false,
            DISPLAY_WELCOME_PAGE_TOOLBAR_ADDITIONAL_CONTENT: false,
            SETTINGS_SECTIONS: [],
            VIDEO_LAYOUT_FIT: 'both',
            HIDE_KICK_BUTTON_FOR_GUESTS: true,
            DISABLE_TRANSCRIPTION_SUBTITLES: true,
            DISABLE_REMOTE_VIDEO_MENU: true,
            DISABLE_RINGING: true,
            filmStripOnly: false,
            VERTICAL_FILMSTRIP: true,
            CLOSE_PAGE_GUEST_HINT: false,
            SHOW_PROMOTIONAL_CLOSE_PAGE: false,
            SHOW_BRAND_WATERMARK: false,
            GENERATE_ROOMNAMES_ON_WELCOME_PAGE: false,
            DISPLAY_WELCOME_FOOTER: false,
            SHOW_POWERED_BY: false,
            APP_NAME: 'Video Call',
            NATIVE_APP_NAME: 'Video Call',
            PROVIDER_NAME: '',
            LANG_DETECTION: false,
            INVITATION_POWERED_BY: false,
            AUTHENTICATION_ENABLE: false,
            RECENT_LIST_ENABLED: false,
          },
          userInfo: { 
            displayName,
            email: '',
          },
          jwt: null,
          noSsl: false,
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
          
          api.executeCommand("subject", "");
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
        api.executeCommand("setNotificationsEnabled", false);
        api.executeCommand("setFilmstripConfig", { 
          filmstripConfig: { 
            enabled: true,
            persistentLabels: false
          }
        });
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
      initializationAttemptedRef.current = false;
    };
  }, [roomName, displayName, onLeave]);

  useEffect(() => {
    if (jitsiApiRef.current && onLeave) {
      const handleReadyToClose = () => onLeave();
      jitsiApiRef.current.addListener("readyToClose", handleReadyToClose);
      
      return () => {
        if (jitsiApiRef.current) {
          jitsiApiRef.current.removeListener("readyToClose", handleReadyToClose);
        }
      };
    }
  }, [onLeave]);

  const toggleAudio = () => {
    if (jitsiApiRef.current) {
      jitsiApiRef.current.executeCommand("toggleAudio");
    }
  };

  const toggleVideo = () => {
    if (jitsiApiRef.current) {
      jitsiApiRef.current.executeCommand("toggleVideo");
    }
  };

  const leaveCall = () => {
    socket.emit("doctor:callend");
    if (jitsiApiRef.current) {
      jitsiApiRef.current.executeCommand("hangup");
    }
    if (onLeave) onLeave();
  };

  useEffect(() => {
    const handlePatientEndedCall = () => {
      if (jitsiApiRef.current) {
        jitsiApiRef.current.executeCommand("hangup");
      }
      if (onLeave) onLeave();
    };

    socket.on("patient:ended_call", handlePatientEndedCall);

    return () => {
      socket.off("patient:ended_call", handlePatientEndedCall);
    };
  }, [socket, onLeave]);
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
          "& .new-toolbox, & .toolbox-button-wth-dialog": {
            display: "none !important",
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
            {isIncoming ?  "Calling..." : "Connecting to call..."}
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