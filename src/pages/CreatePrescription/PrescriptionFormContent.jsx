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
import PropTypes from "prop-types";

const PrescriptionFormContent = ({ patient }) => {
  const { token, userDetails } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  
  useEffect(() => {
    if (token && !userDetails) {
      dispatch(getUserDetails(token));
    }
  }, [dispatch, token, userDetails]);

  const { isLoading: isPrescriptionGenerating, prescriptionsCreated } = useSelector(
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
    investigation: "",
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
    
    if (!userDetails) {
      setSnackbarMessage("Doctor information not loaded yet. Please try again.");
      setSnackbarSeverity("error");
      setSnackbarOpen(true);
      return;
    }
    
    setIsGenerating(true);
    try {
      const pdfFile = await generatePDF({
        ...formData,
        doctorInfo: userDetails,
      });
      
      const newFormData = new FormData();
      newFormData.append("phone", patient.phone);
      newFormData.append("file", pdfFile);
      
      await dispatch(
        createPrescription({
          token,
          formData: newFormData,
        })
      );
    } catch (error) {
      console.log(error)
      setSnackbarMessage("Failed to generate prescription ");
      setSnackbarSeverity("error");
      setSnackbarOpen(true);
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
          isGenerating={isGenerating || isPrescriptionGenerating}
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

PrescriptionFormContent.propTypes = {
  patient: PropTypes.shape({
    phone: PropTypes.string.isRequired
  }).isRequired
};
export default PrescriptionFormContent;