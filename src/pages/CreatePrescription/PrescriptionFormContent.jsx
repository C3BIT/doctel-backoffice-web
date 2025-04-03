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

const PrescriptionFormContent = () => {
  const { token } = useSelector((state) => state.user);
  const { isLoading, prescriptionsCreated } = useSelector(
    (state) => state.prescriptions
  );
  const dispatch = useDispatch();
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
      const pdfFile = await generatePDF(formData);
      const newformData = new FormData();
      newformData.append("patientId", "DUMMY_PATIENT_ID_123");
      newformData.append("file", pdfFile);
      await dispatch(
        createPrescription({
          token,
          formData: newformData,
        })
      );
    } catch (error) {
      console.error("Error:", error);
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
