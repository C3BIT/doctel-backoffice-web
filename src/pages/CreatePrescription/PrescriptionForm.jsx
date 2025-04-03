
const PrescriptionForm = ({ formData, handleChange, isGenerating, onSubmit }) => {
  return (
    <div className="form-content-scrollable">
      <div className="form-section">
        <h2>Patient Details</h2>
        <div className="patient-details-form">
          <div>
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
            <input
              name="age"
              value={formData.age}
              onChange={handleChange}
              className="red-input"
              placeholder="Age"
            />
            <select
              name="gender"
              value={formData.gender}
              onChange={handleChange}
            >
              <option>Gender</option>
              <option>Male</option>
              <option>Female</option>
              <option>Other</option>
            </select>
            <input
              name="weight"
              value={formData.weight}
              onChange={handleChange}
              className="red-input"
              placeholder="Weight"
            />
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

      {/* Reason For Calling */}
      <div className="form-section">
        <h2>Reason For Calling</h2>
        <div className="reason-select">
          <select name="reason" value={formData.reason} onChange={handleChange}>
            <option>Second opinion</option>
            <option>Follow up</option>
            <option>New condition</option>
            <option>Emergency</option>
          </select>
        </div>
      </div>

      {/* Present Condition & Current Medication */}
      <div className="form-section">
        <h2>Present Condition & Current Medication</h2>
        <div className="text-area-container">
          <textarea
            name="presentCondition"
            value={formData.presentCondition}
            onChange={handleChange}
            className="red-text"
            placeholder="Write Here"
          />
        </div>
      </div>

      {/* Assessment/Diagnosis */}
      <div className="form-section">
        <h2>Assessment/Diagnosis</h2>
        <div className="text-area-container">
          <textarea
            name="diagnosis"
            value={formData.diagnosis}
            onChange={handleChange}
            className="red-text"
            placeholder="Write Here"
          />
        </div>
      </div>

      {/* Advice & Investigation */}
      <div className="form-section">
        <h2>Advice & Investigation</h2>
        <div className="text-area-container">
          <textarea
            name="advice"
            value={formData.advice}
            onChange={handleChange}
            className="red-text"
            placeholder="Write Here"
          />
        </div>
      </div>

      {/* Prescription Medicine */}
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

