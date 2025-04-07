import { useState, useEffect, useRef, useMemo } from "react";
import { CKEditor, useCKEditorCloud } from "@ckeditor/ckeditor5-react";
import './PrescriptionForm.css';

const PrescriptionForm = ({ formData, handleChange, isGenerating, onSubmit }) => {
  const LICENSE_KEY =
    "eyJhbGciOiJFUzI1NiJ9.eyJleHAiOjE3NDUyNzk5OTksImp0aSI6IjhmYmEyYmFkLTA5YTUtNGNiYi1iNzQ0LTZjYjgwYThhMTkxMyIsInVzYWdlRW5kcG9pbnQiOiJodHRwczovL3Byb3h5LWV2ZW50LmNrZWRpdG9yLmNvbSIsImRpc3RyaWJ1dGlvbkNoYW5uZWwiOlsiY2xvdWQiLCJkcnVwYWwiLCJzaCJdLCJ3aGl0ZUxhYmVsIjp0cnVlLCJsaWNlbnNlVHlwZSI6InRyaWFsIiwiZmVhdHVyZXMiOlsiKiJdLCJ2YyI6Ijc3OTY2ZTYzIn0.QAWN8_du5XYi27kp7S6fkO96qAbJuNfzz36h-HcLFIzYWwSn2NI-EI1xP1VU31uWLkeasTFW4V9d5ylXtPo2hg";

  const CLOUD_SERVICES_TOKEN_URL =
    "https://bbjbq_xw7eug.cke-cs.com/token/dev/33968b4567501247dc57f8f41582c3056fd73c8e853d1897f9a32cc59bf6?limit=10";
  const cloud = useCKEditorCloud({
    version: "45.0.0",
    ckbox: { version: "2.6.1" },
  });

  const [isLayoutReady, setIsLayoutReady] = useState(false);
  const editorContainerRef = useRef(null);
  const editorRef = useRef(null);
  useEffect(() => {
    setIsLayoutReady(true);
    return () => setIsLayoutReady(false);
  }, []);
  const handleEditorChange = (event, editor) => {
    const data = editor.getData();
    const plainText = data.replace(/<[^>]*>/g, '\n').replace(/\n+/g, '\n').trim();
    handleChange({
      target: {
        name: "prescription",
        value: plainText,
      },
    });
  };
  const { ClassicEditor, editorConfig } = useMemo(() => {
    if (cloud.status !== "success" || !isLayoutReady) {
      return {};
    }

    const {
      ClassicEditor,
      Autoformat,
      AutoImage,
      Autosave,
      BlockQuote,
      Bold,
      CKBox,
      CKBoxImageEdit,
      CloudServices,
      Emoji,
      Essentials,
      Heading,
      ImageBlock,
      ImageCaption,
      ImageInline,
      ImageInsert,
      ImageInsertViaUrl,
      ImageResize,
      ImageStyle,
      ImageTextAlternative,
      ImageToolbar,
      ImageUpload,
      Indent,
      IndentBlock,
      Italic,
      Link,
      LinkImage,
      List,
      ListProperties,
      MediaEmbed,
      Mention,
      Paragraph,
      PasteFromOffice,
      PictureEditing,
      Table,
      TableCaption,
      TableCellProperties,
      TableColumnResize,
      TableProperties,
      TableToolbar,
      TextTransformation,
      TodoList,
      Underline,
    } = cloud.CKEditor;

    return {
      ClassicEditor,
      editorConfig: {
        toolbar: {
          items: [
            "heading",
            "|",
            "bold",
            "italic",
            "underline",
            "|",
            "emoji",
            "link",
            "insertImage",
            "ckbox",
            "mediaEmbed",
            "insertTable",
            "blockQuote",
            "|",
            "bulletedList",
            "numberedList",
            "todoList",
            "outdent",
            "indent",
          ],
          shouldNotGroupWhenFull: false,
        },
        plugins: [
          Autoformat,
          AutoImage,
          Autosave,
          BlockQuote,
          Bold,
          CKBox,
          CKBoxImageEdit,
          CloudServices,
          Emoji,
          Essentials,
          Heading,
          ImageBlock,
          ImageCaption,
          ImageInline,
          ImageInsert,
          ImageInsertViaUrl,
          ImageResize,
          ImageStyle,
          ImageTextAlternative,
          ImageToolbar,
          ImageUpload,
          Indent,
          IndentBlock,
          Italic,
          Link,
          LinkImage,
          List,
          ListProperties,
          MediaEmbed,
          Mention,
          Paragraph,
          PasteFromOffice,
          PictureEditing,
          Table,
          TableCaption,
          TableCellProperties,
          TableColumnResize,
          TableProperties,
          TableToolbar,
          TextTransformation,
          TodoList,
          Underline,
        ],
        cloudServices: {
          tokenUrl: CLOUD_SERVICES_TOKEN_URL,
        },
        heading: {
          options: [
            {
              model: "paragraph",
              title: "Paragraph",
              class: "ck-heading_paragraph",
            },
            {
              model: "heading1",
              view: "h1",
              title: "Heading 1",
              class: "ck-heading_heading1",
            },
            {
              model: "heading2",
              view: "h2",
              title: "Heading 2",
              class: "ck-heading_heading2",
            },
            {
              model: "heading3",
              view: "h3",
              title: "Heading 3",
              class: "ck-heading_heading3",
            },
          ],
        },
        image: {
          toolbar: [
            "toggleImageCaption",
            "imageTextAlternative",
            "|",
            "imageStyle:inline",
            "imageStyle:wrapText",
            "imageStyle:breakText",
            "|",
            "resizeImage",
            "|",
            "ckboxImageEdit",
          ],
        },
        initialData: formData.prescription || "",
        licenseKey: LICENSE_KEY,
        link: {
          addTargetToExternalLinks: true,
          defaultProtocol: "https://",
          decorators: {
            toggleDownloadable: {
              mode: "manual",
              label: "Downloadable",
              attributes: {
                download: "file",
              },
            },
          },
        },
        list: {
          properties: {
            styles: true,
            startIndex: true,
            reversed: true,
          },
        },
        mention: {
          feeds: [
            {
              marker: "@",
              feed: [],
            },
          ],
        },
        placeholder: "Type or paste your prescription here!",
        table: {
          contentToolbar: [
            "tableColumn",
            "tableRow",
            "mergeTableCells",
            "tableProperties",
            "tableCellProperties",
          ],
        },
      },
    };
  }, [cloud, isLayoutReady, formData.prescription]);

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
              {formData.gender && formData.gender !== "Gender" ? (
                <input
                  name="gender"
                  value={formData.gender}
                  readOnly
                  className="red-input readonly-input"
                />
              ) : (
                <select
                  name="gender"
                  value={formData.gender}
                  disabled
                  className="gender-select"
                >
                  <option value="Gender">Select Gender</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </select>
              )}
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
        <div className="text-area-container ckeditor-prescription-container">
          <div ref={editorContainerRef}>
            <div className="editor-container__editor">
              <div ref={editorRef}>
                {ClassicEditor && editorConfig && (
                  <CKEditor
                    editor={ClassicEditor}
                    config={editorConfig}
                    onChange={handleEditorChange}
                  />
                )}
              </div>
            </div>
          </div>
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