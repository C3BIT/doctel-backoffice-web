import { Box, Grid, Paper, Typography } from "@mui/material";
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

const Dashboard = () => {
  const { socket, incomingCall, setIncomingCall } = useWebSocket();
  const audioRef = useRef(null);
  const [isInCall, setIsInCall] = useState(false);
  const [jitsiRoom, setJitsiRoom] = useState("");
  const [callingScreen, setCallingScreen] = useState(false);
  const [callTarget, setCallTarget] = useState(null);

  useEffect(() => {
    if (incomingCall) {
      console.log("📞 Incoming Call Request:", incomingCall);
      setCallTarget({
        name: incomingCall.patientName || `${incomingCall.patientId}`,
        id: incomingCall.patientId,
        image: "https://avatars.githubusercontent.com/u/50502837?v=4"
      });
      setCallingScreen(true);
      playRingtone();
    } else {
      if (callingScreen) {
        console.log("🔄 Call state changed, closing calling screen");
        setCallingScreen(false);
        stopRingtone();
      }
    }
  }, [callingScreen, incomingCall]);

  useEffect(() => {
    if (!socket) return;
    const handleCallReassigned = () => {
      setCallingScreen(false);
      setCallTarget(null);
      stopRingtone();
    };

    const handleCallCancelled = () => {
      console.log("===============cancelled from patient==============")
      setIncomingCall(null);
      setCallingScreen(false);
      setCallTarget(null);
      stopRingtone();
    };
    socket.on("call:reassigned", handleCallReassigned);
    socket.on("call:cancelled", handleCallCancelled);
    return () => {
      socket.off("call:reassigned", handleCallReassigned);
      socket.off("call:cancelled", handleCallCancelled);
    };
  }, [socket, setIncomingCall]);


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
    setJitsiRoom(incomingCall.jitsiRoom);
    setIsInCall(true);
    socket.emit("call:accept", { room: incomingCall.jitsiRoom });
    setIncomingCall(null);
    stopRingtone();
  };

  const handleRejectCall = () => {
    if (!incomingCall) return;
    console.log("❌ Call Rejected.");
    socket.emit("call:reject", { room: incomingCall.jitsiRoom });
    setIncomingCall(null);
    setCallTarget(null);
    setCallingScreen(false);
    stopRingtone();
  };

  const handleEndCall = () => {
    console.log("📱 Call Ended.");
    setIsInCall(false);
    setJitsiRoom("");
    setCallingScreen(false);
    setCallTarget(null);
    socket.emit("doctor:free");
    stopRingtone();
  };

  const isCallingScreenActive = () => callingScreen && !!incomingCall;


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
                <strong>Call Duration:</strong> Active
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
            <Box sx={{ height: "100%", minHeight: "80vh", borderRadius: 2, overflow: "hidden", boxShadow: 3 }}>
              <JitsiMeetComponent
                roomName={jitsiRoom}
                displayName="Doctor"
                onLeave={handleEndCall}
                showInHalfScreen={true}
                isIncoming={false}
              />
            </Box>
          </Grid>
          <Grid item xs={12} md={6}>
            {renderPatientInfo()}
          </Grid>
        </Grid>
      ) : (
        // Normal dashboard view
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