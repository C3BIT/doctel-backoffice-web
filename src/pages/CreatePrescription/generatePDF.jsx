import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import logo from "../../assets/icons/prescriptionlogo.svg";
import footerlogo from "../../assets/icons/footer-logo.svg";
const parsePrescription = (text) => {
  if (!text) return [];
  const plainText = text.replace(/<[^>]*>/g, '\n').replace(/\n+/g, '\n').trim();
  const lines = plainText
    .split("\n")
    .filter(line => line.trim() && !line.includes("Suggestion Matrix"));
  return lines.map(line => line.trim());
};
const formatMedicineLine = (line) => {
  return line
    .replace(/<[^>]*>/g, '')
    .split("+")
    .map(part => part.trim())
    .join("  +  ");
};
const formatSectionContent = (text) => {
  if (!text) return "";
  return text
    .split("\n")
    .filter((line) => line.trim())
    .map((line) => `• ${line.trim()}`)
    .join("\n");
};

const compressPDF = async (pdfBlob, attempts = 3, scale = 1.5, quality = 0.7) => {
  const maxSize = 4.8 * 1024 * 1024;
  let compressedBlob = pdfBlob;

  for (let i = 0; i < attempts; i++) {
    if (compressedBlob.size <= maxSize) break;
    const tempContainer = document.createElement("div");
    tempContainer.style.position = "absolute";
    tempContainer.style.left = "-9999px";
    tempContainer.style.width = "210mm";
    tempContainer.style.padding = "20px";
    tempContainer.style.background = "white";
    document.body.appendChild(tempContainer);
    try {
      const canvas = await html2canvas(tempContainer, {
        scale: scale - i * 0.2,
        quality: quality - i * 0.1,
        logging: false,
        useCORS: true,
        backgroundColor: "#FFFFFF",
      });

      const imgData = canvas.toDataURL("image/jpeg", quality - i * 0.1);
      const pdf = new jsPDF("p", "mm", "a4");
      const imgWidth = 210;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;

      pdf.addImage(imgData, "JPEG", 0, 0, imgWidth, imgHeight);
      compressedBlob = pdf.output("blob");
    } finally {
      document.body.removeChild(tempContainer);
    }
  }

  return compressedBlob;
};

const generatePDF = async (formData) => {
  const { doctorInfo } = formData;
  const doctorName =
    `${doctorInfo?.firstName || ""} ${doctorInfo?.lastName || ""}`.trim() || "";
  const doctorQualifications = doctorInfo?.profile?.qualification || "";
  const specialization = doctorInfo?.profile?.specialization || "";
  const clinicAddress = doctorInfo?.profile?.clinicAddress || "";

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
        border-bottom: 2px solid #0063AF;
      }
      .doctor-info {
        text-align: right;
      }
      .doctor-name {
        margin: 0;
        color: #0064B0;
        font-size: 14px;
        font-weight: bold;
      }
      .doctor-details {
        font-size: 10px;
        color: #040504;
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
        font-size: 10px;
        color: #0064B0;
      }
      .detail-row {
        display: flex;
        gap: 20px;
        margin-top: 8px;
        flex-wrap: wrap;
      }
      .detail-row p {
        margin: 0;
        font-size: 10px;
      }
      .detail-label {
        font-weight: normal;
        color: #0063AF;
        font-size: 10px;
      }
      .detail-value {
        font-weight: bold;
        color: #0d1b2a;
        font-size: 10px;
      }
      .date-time {
        text-align: right;
      }
      .date-time p {
        margin: 0;
        font-size: 10px;
        color: #0063AF;
      }
      .date-label {
        font-weight: normal;
        color: #0063AF;
         font-size: 10px;
      }
      .date-value {
        font-weight: bold;
        color: #0063AF;
         font-size: 10px;
      }
      .time-label {
        font-weight: normal;
        color: #0063AF;
         font-size: 10px;
      }
      .time-value {
        font-weight: bold;
        color: #0063AF;
         font-size: 10px;
      }
      .section-title {
        color: #0063AF;
        margin: 25px 0 15px 0;
        font-size: 14px;
        font-weight: 700;
      }
      .section-content {
        white-space: pre-wrap;
        margin: 15px 0 25px 0;
        font-size: 10px;
        line-height: 1.6;
        color:#1A1818;
      }
      .medicine-title {
        color: #0063AF;
        margin: 25px 0 15px 0;
        font-size: 14px;
        font-weight: 700;
      }
      .medicine-list {
        white-space: pre-wrap;
        margin: 15px 0 25px 0;
        font-size: 10px;
        line-height: 1.6;
        color: #0063AF;
      }
      .medicine-item {
        margin-bottom: 8px;
      }
      .header-logo {
        width: 140px;
        height: 40px;
        object-fit: contain;
      }
      .footer-section {
        border-top: 1px solid #0063AF;
      }
      .footer-content {
        display: flex;
        justify-content: flex-start;
        gap: 10px;
      }
      .footer-powered-by {
        font-size: 10px;
        color: #191717;
        font-weight: 400; 
        display: flex;
        align-items: center;
      }
      .footer-logo {
        width: 96px;
        height: 23px;
        margin-top: 10px;
      }
    </style>

    <div class="pdf-header">
      <div>
        <img src="${logo}" class="header-logo" />
      </div>
      <div class="doctor-info">
        <h2 class="doctor-name">${doctorName}</h2>
        <div class="doctor-details">
          <p>${doctorQualifications}</p>
          <p>${specialization}</p>
          <p>${clinicAddress}</p>
        </div>
      </div>
    </div>

    <div class="patient-info-section">
      <div class="patient-details">
        <div>
          <p class="patient-name">Patient: <span class="detail-value">${formData.patientName || "Not provided"
    }</span></p>
          <div class="detail-row">
            ${formData.gender !== "Gender"
      ? `<p><span class="detail-label">Gender: </span><span class="detail-value">${formData.gender}</span></p>`
      : ""
    }
            ${formData.age
      ? `<p><span class="detail-label">Age: </span><span class="detail-value">${formData.age} years old </span></p>`
      : ""
    }
            ${formData.weight
      ? `<p><span class="detail-label">Weight: </span><span class="detail-value">${formData.weight} kg</span></p>`
      : ""
    }
            ${formData.temperature
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
        (medicine) =>
          `<div class="medicine-item"> ${formatMedicineLine(
            medicine
          )}</div>`
      )
      .join("")}
    </div>
   
    ${formData.presentCondition
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

    ${formData.diagnosis
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

    ${formData.advice
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
    <div class="footer-section">
      <div class="footer-content">
        <span class="footer-powered-by">Powered by</span>
        <img src="${footerlogo}" class="footer-logo" />
      </div>
    </div>
  `;

  pdfContainer.appendChild(mainContent);
  pdfContainer.appendChild(footer);
  document.body.appendChild(pdfContainer);

  try {
    // Initial render with moderate quality
    const canvas = await html2canvas(pdfContainer, {
      scale: 1.8,
      quality: 0.8,
      logging: false,
      useCORS: true,
      backgroundColor: "#FFFFFF",
    });

    const imgData = canvas.toDataURL("image/jpeg", 0.8);
    const pdf = new jsPDF("p", "mm", "a4");
    const imgWidth = 210;
    const imgHeight = (canvas.height * imgWidth) / canvas.width;

    pdf.addImage(imgData, "JPEG", 0, 0, imgWidth, imgHeight);

    // Generate initial PDF blob
    const pdfBlob = pdf.output("blob");

    // Compress if needed
    const finalBlob = await compressPDF(pdfBlob);

    // Validate size
    if (finalBlob.size > 5 * 1024 * 1024) {
      throw new Error("Failed to reduce PDF under 5MB");
    }
    return new File([finalBlob], "prescription.pdf", {
      type: "application/pdf",
      lastModified: Date.now(),
    });

  } catch (error) {
    console.error("PDF generation error:", error);
    throw new Error("Failed to generate prescription: " + error.message);
  } finally {
    document.body.removeChild(pdfContainer);
  }
};

export default generatePDF;