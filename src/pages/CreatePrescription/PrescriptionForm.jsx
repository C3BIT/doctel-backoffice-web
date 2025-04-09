import { useState } from "react";
import './PrescriptionForm.css';

const PrescriptionForm = ({ formData, handleChange, isGenerating, onSubmit }) => {
  return (
    <div className="form-content-scrollable">
      <div className="form-section">
        <h2>Patient Details</h2>
        <div className="patient-details-form">
          <div className="form-group">
            <label>Patient Name</label>
            <input
              name="patientName"
              value={formData.patientName}
              onChange={handleChange}
              className="red-input"
              placeholder="Patient Name"
              required
            />
          </div>
          <div className="patient-details-grid mt-4">
            <div className="form-group">
              <label>Age</label>
              <input
                type="number"
                name="age"
                value={formData.age}
                onChange={handleChange}
                className="red-input"
                placeholder="Age"
                min="0"
                max="120"
              />
            </div>

            <div className="form-group">
              <label>Gender</label>
              <select
                name="gender"
                value={formData.gender}
                onChange={handleChange}
                className="red-input gender-select"
                required
              >
                <option value="">Select Gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>
            </div>

            <div className="form-group">
              <label>Weight (kg)</label>
              <input
                name="weight"
                value={formData.weight}
                onChange={handleChange}
                className="red-input"
                placeholder="Weight"
              />
            </div>

            <div className="form-group">
              <label>Temperature (°F)</label>
              <input
                name="temperature"
                value={formData.temperature}
                onChange={handleChange}
                className="red-input"
                placeholder="Temp °F"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="form-section">
        <h2>Present Condition & Current Medication</h2>
        <div className="text-area-container">
          <textarea
            name="presentCondition"
            value={formData.presentCondition}
            onChange={handleChange}
            className="red-text"
            placeholder="Describe the patient's current condition and medications"
          />
        </div>
      </div>

      <div className="form-section">
        <h2>Advice</h2>
        <div className="text-area-container">
          <textarea
            name="advice"
            value={formData.advice}
            onChange={handleChange}
            className="red-text"
            placeholder="Provide advice and recommended investigations"
          />
        </div>
      </div>

      <div className="form-section">
        <h2>Prescription Medicine</h2>
        <div className="text-area-container">
          <textarea
            name="prescription"
            value={formData.prescription}
            onChange={handleChange}
            className="red-text"
            placeholder="Enter medicines (one per line)"
            rows={8}
          />
        </div>
      </div>

      <div className="form-section">
        <h2>Investigation</h2>
        <div className="text-area-container">
          <textarea
            name="investigation"
            value={formData.investigation}
            onChange={handleChange}
            className="red-text"
            placeholder="Provide investigations"
          />
        </div>
      </div>

      <button
        type="button"
        className="submit-button"
        disabled={isGenerating}
        onClick={onSubmit}
      >
        {isGenerating ? "Generating PDF..." : "Finish"}
      </button>
    </div>
  );
};

export default PrescriptionForm;