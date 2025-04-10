import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import logo from "../../assets/icons/logo-frame.svg";
import footerlogo from "../../assets/icons/footer-logo.svg";
import headerlogoSvg from '../../assets/icons/header-bg.svg';
import RxLogo from '../../assets/icons/Rx.svg'
const parsePrescription = (text) => {
  if (!text) return [];
  // Preserve basic HTML formatting but remove unwanted tags
  const cleanedText = text.replace(/<\/?(div|span|p|br)[^>]*>/gi, '\n')
    .replace(/<[^>]*>/g, ' ')
    .replace(/\n+/g, '\n')
    .trim();
  return cleanedText.split("\n").filter(line => line.trim());
};

const formatSectionContent = (htmlContent) => {
  if (!htmlContent) return "";
  // Convert paragraphs to bullet points while preserving other formatting
  return htmlContent
    .replace(/<p[^>]*>/gi, '• ')
    .replace(/<\/p>/gi, '\n')
    .replace(/<br[^>]*>/gi, '\n');
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
      .header-logo {
        width: 140px;
        height: 40px;
        object-fit: contain;
      }
      .footer-section {
        border-top: 1px solid #0063AF;
        padding-left:40px;
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



<div style="
  background-image: url(${headerlogoSvg});
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  padding: 0px 20px 20px;
  position: relative;
  display: flex;
  align-items: center;
  height:150px
">
  <div style="
    background-color: white;
    border-radius: 50%;
    width: 150px;
    height: 150px;
    display: flex;
    justify-content: center;
    align-items: center;
    border: 5px solid #203A71;
    position: absolute;
    left: 40px;
    top: 20px;
    z-index: 2;
    margin-top: 15px;
  ">
    <img src="${logo}" alt="DOCTEL Logo" style="width: 80px; height: 80px;" />
  </div>
  <div style="margin-left: 250px; flex: 1;">
    <div style="font-size: 20px; font-weight: 400; margin-bottom: 5px;">${doctorName}</div>
    <div style="font-size: 9px; margin: 3px 0; color:#070707;"> ${doctorQualifications}</div>
    <div style="font-size: 9px; margin: 3px 0; color:#070707;"> ${specialization}</div>
    <div style="font-size: 9px; margin: 3px 0; color:#070707;">${clinicAddress} </div>
  </div>
</div>


    <div style="display: flex; justify-content: flex-end; padding: 15px 20px; background: white;">
      <div style="display: flex; gap: 30px;">
        <div style="display: flex; align-items: center; gap: 5px; font-size: 12px;">
          <span style="font-weight: 400; color: #20ACE2; font-size: 12px;">Date :</span>
          <span style="font-weight: 400; color:#1A1818; font-size: 12px;">09 June 2024</span>
        </div>
        <div style="display: flex; align-items: center; gap: 5px;">
          <span style="font-weight: 400; color: #20ACE2; font-size: 12px;">Time :</span>
          <span style="font-weight: 400; color:#1A1818; font-size: 12px;">02:25 PM</span>
        </div>
      </div>
    </div>


   <div style="width: 90%; margin: 0 auto; margin-top: 30px;">
    <div style="background-color: #F1F0F0; padding: 10px 10px 20px 10px; display: flex; flex-direction: column; border-radius: 6px;">
      <div style="margin-bottom: 15px; text-align: start;">
        <span style="font-weight: 400; color: #0465AF; margin-right: 5px; font-size: 12px;"">Patient:</span>
        <span style="color: #0465AF; font-size: 12px;"">${formData.patientName || "Not provided"}</span>
      </div>
      <div style="display: flex; justify-content: space-between; flex-wrap: wrap;">
        ${formData.gender ? `
          <div style="display: flex; align-items: center;">
            <span style="font-weight: 400; color:#1A1818; margin-right: 5px; font-size: 12px;"">Gender:</span>
            <span style="color:#1A1818; font-size: 12px;"">${formData.gender}</span>
          </div>
        ` : ''}
        ${formData.age ? `
          <div style="display: flex; align-items: center;">
            <span style="font-weight: 400; color:#1A1818; margin-right: 5px; font-size: 12px;"">Age:</span>
            <span style="color:#1A1818; font-size: 12px;"">${formData.age} Year(s)</span>
          </div>
        ` : ''}
        ${formData.weight ? `
          <div style="display: flex; align-items: center;">
            <span style="font-weight: 400; color:#1A1818; margin-right: 5px; font-size: 12px;">Weight:</span>
            <span style="color:#1A1818; font-size: 12px;">${formData.weight}kg</span>
          </div>
        ` : ''}
      </div>
    </div>
  </div>


<div style="
  color: #0057a8;
  font-weight: bold;
  margin-left:40px;
  margin-top:40px
">
 <img src="${RxLogo}" alt="Rx" />
</div>

  


${formData.presentCondition ? `
  <div style="margin-top: 30px;">
    <h3 style="color: #0465AF; font-size: 14px; font-weight: 700; padding-left: 40px;">
      Problem / Issue
    </h3>
    <div style="font-size: 12px; font-weight: 400; line-height: 1.6; color: #1A1818; padding-left: 40px; padding-top:10px;">
      ${formatSectionContent(formData.presentCondition)}
    </div>
  </div>
` : ""}



${formData.prescription ? `
  <h3 style="color: #0063AF; margin: 20px 0 0 40px; font-size: 14px; font-weight: 700;">Medicine :</h3>
  <div style="padding-left: 40px; padding-top:10px; margin-top:10px; font-size: 12px; font-weight: 400; line-height: 1.6; color: #1A1818;">
    ${parsePrescription(formData.prescription)
        .map(medicine => `<div style="margin-bottom: 8px;">${medicine}</div>`)
        .join("")}
  </div>
` : ""}
   


${formData.advice ? `
  <div style="margin-top: 30px;">
    <h3 style="color: #0465AF; font-size: 14px; font-weight: 700; padding-left: 40px;">
      Advice :
    </h3>
    <div style="font-size: 12px; font-weight: 400; line-height: 1.6; color: #1A1818; padding-left: 40px; padding-top:10px;">
      ${formatSectionContent(formData.advice)}
    </div>
  </div>
` : ""}
 


${formData.investigation ? `
  <div style="margin-top: 30px;">
    <h3 style="color: #0465AF; font-size: 14px; font-weight: 700; padding-left: 40px;">
      Investigation :
    </h3>
    <div style="font-size: 12px; font-weight: 400; line-height: 1.6; color: #1A1818; padding-left: 40px; padding-top:10px;">
      ${formatSectionContent(formData.investigation)}
    </div>
  </div>
` : ""}
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
    throw new Error("Failed to generate prescription: " + error.message);
  } finally {
    document.body.removeChild(pdfContainer);
  }
};

export default generatePDF;