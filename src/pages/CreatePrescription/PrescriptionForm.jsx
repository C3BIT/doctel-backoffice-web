import { useRef, useMemo } from "react";
import JoditEditor from "jodit-react";
import './PrescriptionForm.css';

const PrescriptionForm = ({ formData, handleChange, isGenerating, onSubmit }) => {
  const editorRef = useRef(null);
  const config = useMemo(
    () => ({
      readonly: false,
      height: 200,
      toolbarAdaptive: false,
      toolbarButtonSize: 'medium',
      buttons: 'bold,italic,underline,ul,ol,font,fontsize,paragraph,lineHeight,superscript,subscript,image,table,link,align,undo,redo',
      removeButtons: ['source', 'fullsize', 'about', 'print', 'file'],
      disablePlugins: "paste,table,media",
      showCharsCounter: false,
      showWordsCounter: false,
      showXPathInStatusbar: false,
      color: 'black',
      style: {
        color: 'black', 
      },
      maxLength: false,
      maxCharsCount: -1,
      maxWordsCount: -1,
    }),
    []
  );

  const handleJoditChange = (fieldName) => (newContent) => {
    handleChange({
      target: {
        name: fieldName,
        value: newContent
      }
    });
  };
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
        <h2>Present Condition</h2>
        <div className="text-area-container">
          <JoditEditor
            ref={editorRef}
            value={formData.presentCondition}
            config={config}
            tabIndex={1}
            onBlur={handleJoditChange('presentCondition')}
            onChange={handleJoditChange('presentCondition')}
          />
        </div>
      </div>

      <div className="form-section">
        <h2>Advice</h2>
        <div className="text-area-container">
          <JoditEditor
            ref={editorRef}
            value={formData.advice}
            config={config}
            tabIndex={2}
            onBlur={handleJoditChange('advice')}
            onChange={handleJoditChange('advice')}
          />
        </div>
      </div>

      <div className="form-section">
        <h2>Prescription Medicine</h2>
        <div className="text-area-container">
          <JoditEditor
            ref={editorRef}
            value={formData.prescription}
            config={config}
            tabIndex={3}
            onBlur={handleJoditChange('prescription')}
            onChange={handleJoditChange('prescription')}
          />
        </div>
      </div>

      <div className="form-section">
        <h2>Investigation</h2>
        <div className="text-area-container">
          <JoditEditor
            ref={editorRef}
            value={formData.investigation}
            config={config}
            tabIndex={4}
            onBlur={handleJoditChange('investigation')}
            onChange={handleJoditChange('investigation')}
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