import { Box, Grid } from "@mui/material";
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
        name: incomingCall.patientName || `Patient ${incomingCall.patientId}`,
        id: incomingCall.patientId,
        image: "https://avatars.githubusercontent.com/u/50502837?v=4"
      });
      setCallingScreen(true);
      playRingtone();
    }
  }, [incomingCall]);

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

  const handleCallDoctor = (doctor) => {
    setCallTarget({
      name: doctor.name,
      id: doctor.id,
      image: doctor.image
    });
    setCallingScreen(true);
    playRingtone();
    socket.emit("call:initiate");
    socket.once("call:initiated", (data) => {
      console.log("Call initiated with data:", data);
      setJitsiRoom(data.jitsiRoom);
      socket.once("call:accepted", () => {
        console.log("Call was accepted by the doctor");
        setIsInCall(true);
        setCallingScreen(false);
        stopRingtone();
      });
    });
  };

  const isCallingScreenActive = () => callingScreen || !!incomingCall;

  return (
    <Box sx={{ backgroundColor: "white", minHeight: "100vh", p: 4, borderRadius: 4, fontFamily: "sans-serif" }}>
      <Grid container spacing={4}>
        <Grid item xs={12} md={isInCall ? 6 : 8}>
          <Box sx={{ display: "flex", flexDirection: "column", gap: 4 }}>
            <ProfileSection />
            <DoctorOnDemand onCallDoctor={handleCallDoctor} />
            <Grid container spacing={4}>
              <Grid item xs={12} md={6}>
                <ServiceCard
                  image="https://img.freepik.com/free-vector/videocalling-with-therapist_23-2148517118.jpg"
                  title="Contact Free"
                  description="Connect with us anytime for free"
                  buttonText="Chat Now"
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <ServiceCard
                  image="https://img.freepik.com/free-vector/humanitarian-help-people-donating-sanitary-protection-equipment_114360-1775.jpg"
                  title="Buy Package"
                  description="Buy health package & get 24x7 consultation"
                  buttonText="Buy Now"
                />
              </Grid>
            </Grid>
          </Box>
        </Grid>

        {isInCall && (
          <Grid item xs={12} md={6}>
            <Box sx={{ height: "100%", minHeight: "70vh", borderRadius: 2, overflow: "hidden", boxShadow: 3 }}>
              <JitsiMeetComponent
                roomName={jitsiRoom}
                displayName="Doctor"
                onLeave={handleEndCall}
                showInHalfScreen={true}
                isIncoming={!!incomingCall}
              />
            </Box>
          </Grid>
        )}

        {!isInCall && (
          <Grid item xs={12} md={4}>
            <Box sx={{ display: "flex", flexDirection: "column", gap: 4 }}>
              <PrescriptionSection />
              <LabReportSection />
              <PaperPrescriptionSection />
            </Box>
          </Grid>
        )}
      </Grid>

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
