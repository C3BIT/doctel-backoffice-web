import  { useState } from "react";
import VideoCallSection from "./VideoCallSection";
import PrescriptionForm from "./PrescriptionForm";
import generatePDF from "./generatePDF";
import "./PrescriptionForm.css";
const PrescriptionFormContent = () => {
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
      await generatePDF(formData);
    } catch (error) {
      console.error("PDF generation failed:", error);
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="medical-form-container">
      <form className="form-layout">
        <VideoCallSection />
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