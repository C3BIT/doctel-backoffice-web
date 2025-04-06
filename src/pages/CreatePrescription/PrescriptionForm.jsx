import './PrescriptionForm.css'
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
              readOnly
              className="red-input readonly-input"
              placeholder="Patient Name"
              required
            />
          </div>
          <div className="patient-details-grid mt-4">
            <div className="form-group">
              <label>Age</label>
              <input
                name="age"
                value={formData.age}
                readOnly
                className="red-input readonly-input"
                placeholder="Age"
              />
            </div>

            <div className="form-group">
  <label>Gender</label>
  <select
    name="gender"
    value={formData.gender}
    disabled
    className="gender-select"
  >
    <option>Gender</option>
    <option>Male</option>
    <option>Female</option>
    <option>Other</option>
  </select>
</div>

            <div className="form-group">
              <label>Weight (kg)</label>
              <input
                name="weight"
                value={formData.weight}
                readOnly
                className="red-input readonly-input"
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

      {/* Other sections remain the same */}
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
        <h2>Assessment/Diagnosis</h2>
        <div className="text-area-container">
          <textarea
            name="diagnosis"
            value={formData.diagnosis}
            onChange={handleChange}
            className="red-text"
            placeholder="Enter your diagnosis"
          />
        </div>
      </div>

      <div className="form-section">
        <h2>Advice & Investigation</h2>
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
            placeholder={`Suggestion Matrix\n1. Medicine Name + After Meal/Before Meal + 1+0+1 + 5 Days\n2. Medicine Name + After Meal/Before Meal + 1+0+1 + 5 Days`}
            rows={6}
          />
        </div>
      </div>
      <button
        type="submit"
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