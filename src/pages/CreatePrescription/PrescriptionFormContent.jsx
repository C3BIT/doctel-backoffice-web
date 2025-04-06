import { useState, useEffect } from "react";
import PrescriptionForm from "./PrescriptionForm";
import generatePDF from "./generatePDF";
import "./PrescriptionForm.css";
import { useDispatch, useSelector } from "react-redux";
import {
  createPrescription,
  resetPrescriptionsState,
} from "../../redux/prescription/prescriptionSlice";
import { Snackbar, Alert } from "@mui/material";
import { getUserDetails } from "../../redux/auth/authSlice";
import { getPatientInfo } from "../../redux/patient/patientInfoSlice";

const PrescriptionFormContent = ({ patient }) => {
  const { token } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const { userDetails } = useSelector((state) => state.user);

  useEffect(() => {
    dispatch(getUserDetails(token));
  }, [dispatch, token]);

  const { patientInfo } = useSelector((state) => state.patientInfo);
  useEffect(() => {
    const phone = patient?.phone;
    dispatch(getPatientInfo({ token, phone }));
  }, [dispatch, token, patient]);

  const { isLoading, prescriptionsCreated } = useSelector(
    (state) => state.prescriptions
  );

  const [formData, setFormData] = useState({
    patientName: "",
    age: "",
    gender: "Gender",
    weight: "",
    temperature: "",
    reason: "Second opinion",
    presentCondition: "",
    diagnosis: "",
    advice: "",
    prescription: "",
  });

  const [isGenerating, setIsGenerating] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("success");

  // Calculate age from date of birth
  const calculateAge = (dateOfBirth) => {
    if (!dateOfBirth) return '';
    const birthDate = new Date(dateOfBirth);
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    return age.toString();
  };
  useEffect(() => {
    if (patientInfo) {
      setFormData(prev => ({
        ...prev,
        patientName: `${patientInfo.firstName} ${patientInfo.lastName}`,
        age: calculateAge(patientInfo.dateOfBirth),
        gender: patientInfo.gender || "Gender",
        weight: patientInfo.weight || ""
      }));
    }
  }, [patientInfo]);

  const handleSnackbarClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setSnackbarOpen(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsGenerating(true);
    try {
      const pdfFile = await generatePDF({
        ...formData,
        doctorInfo: userDetails,
        patientInfo: patientInfo
      });

      const url = URL.createObjectURL(pdfFile);
      const a = document.createElement("a");
      a.href = url;
      a.download = `prescription_${new Date().toISOString().split("T")[0]}.pdf`;
      document.body.appendChild(a);
      a.click();
      setTimeout(() => {
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
      }, 100);
      const newformData = new FormData();
      newformData.append("phone", patient.phone);
      newformData.append("file", pdfFile);
      await dispatch(
        createPrescription({
          token,
          formData: newformData,
        })
      );
    } catch (error) {
    } finally {
      setIsGenerating(false);
    }
  };

  useEffect(() => {
    if (prescriptionsCreated) {
      setSnackbarMessage("Prescription Created Successfully");
      setSnackbarSeverity("success");
      setSnackbarOpen(true);
      dispatch(resetPrescriptionsState());
    }
  }, [prescriptionsCreated, dispatch]);

  return (
    <div className="medical-form-container">
      <form className="form-layout">
        <PrescriptionForm
          formData={formData}
          handleChange={handleChange}
          isGenerating={isGenerating}
          onSubmit={handleSubmit}
        />
      </form>

      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={handleSnackbarClose}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <Alert
          onClose={handleSnackbarClose}
          severity={snackbarSeverity}
          sx={{ width: "100%" }}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </div>
  );
};

export default PrescriptionFormContent;