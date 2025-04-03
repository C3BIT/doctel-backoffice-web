import { useState } from "react";
import PrescriptionForm from "./PrescriptionForm";
import generatePDF from "./generatePDF";
import "./PrescriptionForm.css";
import { useDispatch, useSelector } from "react-redux";
import { createPrescription } from "../../redux/prescription/prescriptionSlice";

const PrescriptionFormContent = () => {
  const { token } = useSelector((state) => state.user);
  const { isLoading, prescriptionsCreated} = useSelector(
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
    </div>
  );
};

export default PrescriptionFormContent;
