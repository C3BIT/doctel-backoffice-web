import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import logo from '../../assets/icons/prescriptionlogo.svg'
const formatMedicineLine = (line) => {
  return line
    .split("+")
    .map((part) => part.trim())
    .join("  +  ");
};

const parsePrescription = (text) => {
  if (!text) return [];
  const lines = text
    .split("\n")
    .filter((line) => line.trim() && !line.includes("Suggestion Matrix"));
  return lines.map((line) => line.trim());
};

const formatSectionContent = (text) => {
  if (!text) return "";
  return text
    .split("\n")
    .filter((line) => line.trim())
    .map((line) => `• ${line.trim()}`)
    .join("\n");
};

const generatePDF = async (formData) => {
  const pdfContainer = document.createElement("div");
  pdfContainer.style.position = "absolute";
  pdfContainer.style.left = "-9999px";
  pdfContainer.style.width = "210mm";
  pdfContainer.style.minHeight = "297mm";
  pdfContainer.style.padding = "20px";
  pdfContainer.style.background = "white";
  pdfContainer.style.fontFamily = "Arial, sans-serif";
  pdfContainer.style.display = "flex";
  pdfContainer.style.flexDirection = "column";

  const now = new Date();
  const dateStr = now.toLocaleDateString();
  const timeStr = now.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });

  const mainContent = document.createElement("div");
  mainContent.style.flexGrow = "1";
  mainContent.innerHTML = `
    <style>
      .pdf-header {
        display: flex;
        justify-content: space-between;
        margin-bottom: 30px;
        padding-bottom: 15px;
        border-bottom: 2px solid #0064B0;
      }
      .doctor-info {
        text-align: right;
      }
      .doctor-name {
        margin: 0;
        color: #0063AF;
        font-size: 24px;
        font-weight: bold;
      }
      .doctor-details {
        font-size: 10px;
        color: #555;
        line-height: 1.5;
      }
      .doctor-details p {
        margin: 5px 0;
      }
      .patient-info-section {
        margin-bottom: 25px;
      }
      .patient-details {
        display: flex;
        justify-content: space-between;
      }
      .patient-name {
        margin: 5px 0;
        font-weight: bold;
        font-size: 18px;
        color: #0063AF;
      }
      .detail-row {
        display: flex;
        gap: 20px;
        margin-top: 8px;
        flex-wrap: wrap;
      }
      .detail-row p {
        margin: 0;
        font-size: 14px;
      }
      .detail-label {
        font-weight: normal;
      }
      .detail-value {
        font-weight: bold;
      }
      .date-time {
        text-align: right;
      }
      .date-time p {
        margin: 0;
        font-size: 14px;
      }
      .date-label {
        font-weight: normal;
      }
      .date-value {
        font-weight: bold;
      }
      .time-label {
        font-weight: normal;
      }
      .time-value {
        font-weight: bold;
      }
      .section-title {
        color: #0063AF;
        margin: 25px 0 15px 0;
        font-size: 18px;
        font-weight: bold;
      }
      .section-content {
        white-space: pre-wrap;
        margin: 15px 0 25px 0;
        font-size: 14px;
        line-height: 1.6;
      }
      .medicine-title {
        color: #0063AF;
        margin: 25px 0 15px 0;
        font-size: 18px;
        font-weight: bold;
      }
      .medicine-list {
        white-space: pre-wrap;
        margin: 15px 0 25px 0;
        font-size: 14px;
        line-height: 1.6;
      }
      .medicine-item {
        margin-bottom: 8px;
      }
      .header-logo {
        width: 180px;
        height: 60px;
        object-fit: contain;
      }
      .footer-content {
        display: flex;
        justify-content: flex-start;
        align-items: center;
        margin-top: 20px;
        padding-top: 15px;
        border-top: 2px solid #0064B0;
        gap: 10px;
      }
      .footer-powered-by {
        font-size: 12px;
        color: #555;
        font-weight: bold;
        display: flex;
        align-items: center;
      }
      .footer-logo {
        width: 131px;
        height: 38px;
      }
    </style>

    <div class="pdf-header">
      <div>
        <img src="${logo}" class="header-logo" />
      </div>
      <div class="doctor-info">
        <h2 class="doctor-name">Dr. John Doe</h2>
        <div class="doctor-details">
          <p>MBBS, BCS (Health), MS (ORTHO)</p>
          <p>Fellowship Training in Oncology & Arthroplasty (England, UK)</p>
          <p>Orthopedics, Trauma, Bone Tumor & Sarcoma Surgeon</p>
          <p>National Institute of Cancer Research & Hospital</p>
        </div>
      </div>
    </div>

    <div class="patient-info-section">
      <div class="patient-details">
        <div>
          <p class="patient-name">Patient: <span class="detail-value">${
            formData.patientName || "Not provided"
          }</span></p>
          <div class="detail-row">
            ${
              formData.gender !== "Gender"
                ? `<p><span class="detail-label">Gender: </span><span class="detail-value">${formData.gender}</span></p>`
                : ""
            }
            ${
              formData.age
                ? `<p><span class="detail-label">Age: </span><span class="detail-value">${formData.age} years old </span></p>`
                : ""
            }
            ${
              formData.weight
                ? `<p><span class="detail-label">Weight: </span><span class="detail-value">${formData.weight} kg</span></p>`
                : ""
            }
            ${
              formData.temperature
                ? `<p><span class="detail-label">Temp: </span><span class="detail-value">${formData.temperature}°F</span></p>`
                : ""
            }
          </div>
        </div>
        <div class="date-time">
          <p><span class="date-label">Date: </span><span class="date-value">${dateStr}</span></p>
          <p><span class="time-label">Time: </span><span class="time-value">${timeStr}</span></p>
        </div>
      </div>
    </div>

    <h3 class="medicine-title">Medicine : </h3>
    <div class="medicine-list">
      ${parsePrescription(formData.prescription)
        .map(
          (medicine, index) =>
            `<div class="medicine-item">${
              index + 1
            }. ${formatMedicineLine(medicine)}</div>`
        )
        .join("")}
    </div>

    ${
      formData.reason && formData.reason !== "Second opinion"
        ? `
      <div>
        <h3 class="section-title">Reason For Visit</h3>
        <p class="section-content">${formatSectionContent(
          formData.reason
        ).replace(/\n/g, "<br>")}</p>
      </div>
    `
        : ""
    }

    ${
      formData.presentCondition
        ? `
      <div>
        <h3 class="section-title">Present Condition & Current Medication</h3>
        <p class="section-content">${formatSectionContent(
          formData.presentCondition
        ).replace(/\n/g, "<br>")}</p>
      </div>
    `
        : ""
    }

    ${
      formData.diagnosis
        ? `
      <div>
        <h3 class="section-title">Assessment/Diagnosis</h3>
        <p class="section-content">${formatSectionContent(
          formData.diagnosis
        ).replace(/\n/g, "<br>")}</p>
      </div>
    `
        : ""
    }

    ${
      formData.advice
        ? `
      <div>
        <h3 class="section-title">Advice & Investigation</h3>
        <p class="section-content">${formatSectionContent(
          formData.advice
        ).replace(/\n/g, "<br>")}</p>
      </div>
    `
        : ""
    }
  `;

  const footer = document.createElement("div");
  footer.innerHTML = `
    <div class="footer-content">
      <span class="footer-powered-by">Powered by</span>
      <img src="${logo}" class="footer-logo" />
    </div>
  `;

  pdfContainer.appendChild(mainContent);
  pdfContainer.appendChild(footer);
  document.body.appendChild(pdfContainer);

  try {
    const canvas = await html2canvas(pdfContainer, {
      scale: 2,
      logging: false,
      useCORS: true,
    });

    const imgData = canvas.toDataURL("image/png");
    const pdf = new jsPDF("p", "mm", "a4");
    const imgWidth = 210;
    const imgHeight = (canvas.height * imgWidth) / canvas.width;

    pdf.addImage(imgData, "PNG", 0, 0, imgWidth, imgHeight);
    const pdfBlob = pdf.output("blob");
    const pdfUrl = URL.createObjectURL(pdfBlob);
    window.open(pdfUrl, "_blank");
  } catch (error) {
    console.error("Error generating PDF:", error);
    throw error;
  } finally {
    document.body.removeChild(pdfContainer);
  }
};

export default generatePDF;