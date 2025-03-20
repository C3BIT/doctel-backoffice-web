import { Box, Grid, Paper, Typography, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { useEffect, useRef, useState } from "react";
import ProfileSection from "./ProfileSection";
import DoctorOnDemand from "./DoctorOnDemand";
import ServiceCard from "./ServiceCard";
import PrescriptionSection from "./PrescriptionSection";
import LabReportSection from "./LabReportSection";
import PaperPrescriptionSection from "./PaperPrescriptionSection";
import { useWebSocket } from "../../providers/WebSocketProvider";
import JitsiMeetComponent from "./JitsiMeetComponent";
import CallingScreen from "./Jitsi/CallingScreen";
import ContactFreeSvg from "../../assets/images/onlineDoctor.svg";
import BuyPackageSvg from "../../assets/images/prchase.svg";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const navigate = useNavigate();
  const { socket, incomingCall, setIncomingCall } = useWebSocket();
  const audioRef = useRef(null);
  const [isInCall, setIsInCall] = useState(false);
  const [jitsiRoom, setJitsiRoom] = useState("");
  const [callingScreen, setCallingScreen] = useState(false);
  const [callTarget, setCallTarget] = useState(null);
  const [showEndCallModal, setShowEndCallModal] = useState(false);
  const [callDuration, setCallDuration] = useState(0);
  const callStartTimeRef = useRef(null);
  const durationIntervalRef = useRef(null);

  useEffect(() => {
    if (incomingCall && !isInCall) {
      console.log("📞 Incoming Call Request:", incomingCall);
      setCallTarget({
        name: incomingCall.patientName || `${incomingCall.patientId}`,
        id: incomingCall.patientId,
        image: "https://avatars.githubusercontent.com/u/50502837?v=4"
      });
      setCallingScreen(true);
      playRingtone();
    } else if (!incomingCall && !isInCall) {
      if (callingScreen) {
        console.log("🔄 Call state changed, closing calling screen");
        setCallingScreen(false);
        stopRingtone();
      }
    }
  }, [incomingCall, callingScreen, isInCall]);

  useEffect(() => {
    if (isInCall) {
      stopRingtone();
      setCallingScreen(false);
    }
  }, [isInCall]);

  useEffect(() => {
    if (isInCall && !callStartTimeRef.current) {
      callStartTimeRef.current = new Date();
      durationIntervalRef.current = setInterval(() => {
        const now = new Date();
        const durationInSeconds = Math.floor((now - callStartTimeRef.current) / 1000);
        setCallDuration(durationInSeconds);
      }, 1000);
    }

    return () => {
      if (durationIntervalRef.current) {
        clearInterval(durationIntervalRef.current);
      }
    };
  }, [isInCall]);

  useEffect(() => {
    if (!socket) return;

    const handleCallReassigned = () => {
      setCallingScreen(false);
      setCallTarget(null);
      stopRingtone();
    };

    const handleCallCancelled = (data) => {
      console.log("📱 Call cancelled by patient:", data);
      setIncomingCall(null);
      setCallingScreen(false);

      if (isInCall) {
        handleCallEnd();
      } else {
        setCallTarget(null);
      }

      stopRingtone();
    };

    socket.on("call:reassigned", handleCallReassigned);
    socket.on("call:cancelled", handleCallCancelled);

    return () => {
      socket.off("call:reassigned", handleCallReassigned);
      socket.off("call:cancelled", handleCallCancelled);
    };
  }, [socket, setIncomingCall, isInCall]);

  const playRingtone = () => {
    if (audioRef.current) {
      audioRef.current.play().catch(error => {
        console.warn("Audio playback failed:", error);
      });
    }
  };

  const stopRingtone = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }
  };

  const handleAcceptCall = () => {
    if (!incomingCall) return;
    console.log("✅ Call Accepted. Joining Jitsi Room:", incomingCall.jitsiRoom);
    stopRingtone();
    const roomId = incomingCall.jitsiRoom;
    setJitsiRoom(roomId);
    socket.emit("call:accept", { room: roomId });
    setIsInCall(true);
    setIncomingCall(null);
  };

  const handleRejectCall = () => {
    if (!incomingCall) return;
    console.log("❌ Call Rejected.");
    stopRingtone();

    socket.emit("call:reject", { room: incomingCall.jitsiRoom });
    setIncomingCall(null);
    setCallTarget(null);
    setCallingScreen(false);
  };

  const handleCallEnd = () => {
    console.log("📱 Call Ended.");
    if (durationIntervalRef.current) {
      clearInterval(durationIntervalRef.current);
      durationIntervalRef.current = null;
    }

    setShowEndCallModal(true);
    socket.emit("doctor:free");
    stopRingtone();
  };

  const handleEndCall = () => {
    handleCallEnd();
    setJitsiRoom("");
  };

  const handleCloseModal = () => {
    setShowEndCallModal(false);
    setIsInCall(false);
    setCallTarget(null);
    setCallDuration(0);
    callStartTimeRef.current = null;
    navigate('/');
  };

  const isCallingScreenActive = () => callingScreen && !!incomingCall && !isInCall;

  const formatDuration = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  const renderPatientInfo = () => (
    <Box sx={{ p: 3, height: "100%" }}>
      <Paper elevation={2} sx={{ p: 3, height: "100%", borderRadius: 2 }}>
        <Typography variant="h5" sx={{ mb: 2, fontWeight: "bold" }}>
          Patient Information
        </Typography>
        {callTarget && (
          <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
            <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
              <Box
                component="img"
                src={callTarget.image}
                alt={callTarget.name}
                sx={{
                  width: 80,
                  height: 80,
                  borderRadius: "50%",
                  objectFit: "cover"
                }}
              />
              <Box>
                <Typography variant="h6">{callTarget.name}</Typography>
                <Typography variant="body2" color="text.secondary">
                  ID: {callTarget.id}
                </Typography>
              </Box>
            </Box>

            <Typography variant="body1" sx={{ my: 2 }}>
              Current Session Details:
            </Typography>

            <Box sx={{
              display: "flex",
              flexDirection: "column",
              gap: 1,
              p: 2,
              bgcolor: "background.paper",
              borderRadius: 1
            }}>
              <Typography variant="body2">
                <strong>Room:</strong> {jitsiRoom}
              </Typography>
              <Typography variant="body2">
                <strong>Call Duration:</strong> {formatDuration(callDuration)}
              </Typography>
              <Typography variant="body2">
                <strong>Connection:</strong> Stable
              </Typography>
            </Box>
          </Box>
        )}
      </Paper>
    </Box>
  );

  const renderEndCallModal = () => (
    <Box sx={{
      height: "100%",
      minHeight: "80vh",
      borderRadius: 2,
      overflow: "hidden",
      boxShadow: 3,
      bgcolor: "background.paper",
      p: 4,
      display: "flex",
      flexDirection: "column",
      position: "relative"
    }}>
      <Box sx={{ position: "absolute", top: 12, right: 12 }}>
        <IconButton
          onClick={handleCloseModal}
          aria-label="close"
          sx={{
            bgcolor: "rgba(0,0,0,0.1)",
            "&:hover": { bgcolor: "rgba(0,0,0,0.2)" }
          }}
        >
          <CloseIcon />
        </IconButton>
      </Box>

      <Typography variant="h5" sx={{ mb: 4, fontWeight: "bold", textAlign: "center" }}>
        Call Ended
      </Typography>

      {callTarget && (
        <Box sx={{ display: "flex", alignItems: "center", gap: 2, mb: 4, justifyContent: "center" }}>
          <Box
            component="img"
            src={callTarget.image}
            alt={callTarget.name}
            sx={{
              width: 80,
              height: 80,
              borderRadius: "50%",
              objectFit: "cover"
            }}
          />
          <Box>
            <Typography variant="h6">{callTarget.name}</Typography>
            <Typography variant="body2" color="text.secondary">
              ID: {callTarget.id}
            </Typography>
          </Box>
        </Box>
      )}

      <Box sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        flex: 1
      }}>
        <Typography variant="h6" sx={{ mb: 1 }}>
          Total Call Duration
        </Typography>

        <Box sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          bgcolor: "#f5f5f5",
          borderRadius: "50%",
          width: 180,
          height: 180,
          mb: 4
        }}>
          <Typography variant="h3" sx={{ fontWeight: "bold" }}>
            {formatDuration(callDuration)}
          </Typography>
        </Box>

        <Paper elevation={0} sx={{ p: 3, bgcolor: '#f8f9fa', width: "100%", maxWidth: 400 }}>
          <Typography variant="body2" sx={{ mb: 1 }}>
            <strong>Room:</strong> {jitsiRoom}
          </Typography>
          <Typography variant="body2" sx={{ mb: 1 }}>
            <strong>Date:</strong> {new Date().toLocaleDateString()}
          </Typography>
          <Typography variant="body2">
            <strong>Time:</strong> {new Date().toLocaleTimeString()}
          </Typography>
        </Paper>
      </Box>
    </Box>
  );

  const renderDashboardContent = () => (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 4 }}>
      <ProfileSection />
      <DoctorOnDemand />
      <Grid container spacing={4}>
        <Grid item xs={12} md={6}>
          <ServiceCard
            image={ContactFreeSvg}
            title="Contact Free"
            description="Connect with us anytime for free"
            buttonText="Chat Now"
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <ServiceCard
            image={BuyPackageSvg}
            title="Buy Package"
            description="Buy health package & get 24x7 consultation"
            buttonText="Buy Now"
          />
        </Grid>
      </Grid>
    </Box>
  );

  const renderSidebarContent = () => (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 4 }}>
      <PrescriptionSection />
      <LabReportSection />
      <PaperPrescriptionSection />
    </Box>
  );

  return (
    <Box sx={{ backgroundColor: "white", minHeight: "100vh", p: 4, borderRadius: 4, fontFamily: "sans-serif" }}>
      {isInCall ? (
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            {showEndCallModal ? renderEndCallModal() : (
              <Box sx={{ height: "100%", minHeight: "80vh", borderRadius: 2, overflow: "hidden", boxShadow: 3 }}>
                <JitsiMeetComponent
                  roomName={jitsiRoom}
                  displayName="Doctor"
                  onLeave={handleEndCall}
                  showInHalfScreen={true}
                  isIncoming={false}
                />
              </Box>
            )}
          </Grid>
          <Grid item xs={12} md={6}>
            {renderPatientInfo()}
          </Grid>
        </Grid>
      ) : (
        <Grid container spacing={4}>
          <Grid item xs={12} md={8}>
            {renderDashboardContent()}
          </Grid>
          <Grid item xs={12} md={4}>
            {renderSidebarContent()}
          </Grid>
        </Grid>
      )}

      <Box>
        <audio ref={audioRef} src="/sounds/calling-ringtone.mp3" loop style={{ display: "none" }} preload="auto" />
        <CallingScreen
          open={isCallingScreenActive()}
          callTarget={callTarget}
          isIncoming={!!incomingCall}
          onAccept={handleAcceptCall}
          onReject={handleRejectCall}
          onEnd={handleEndCall}
          onClose={() => setCallingScreen(false)}
        />
      </Box>
    </Box>
  );
};

export default Dashboard;