import React from "react";
import {
  Grid,
  TextField,
  Button,
  Typography,
  Paper,
  Avatar,
  List,
  ListItem,
  ListItemText,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  IconButton,
  Box,
} from "@mui/material";
import { Add, Delete } from "@mui/icons-material";
import jsPDF from "jspdf";
import { DatePicker } from "antd";

// Dummy medicine data for suggestions
const dummyMedicines = [
  { medname: "Paracetamol" },
  { medname: "Ibuprofen" },
  { medname: "Amoxicillin" },
  { medname: "Cetirizine" },
  { medname: "Omeprazole" },
  { medname: "Metformin" },
];

const PrescriptionForm = () => {
  const [medicines, setMedicines] = React.useState([]);
  const [doctorAdvice, setDoctorAdvice] = React.useState("");
  const [followUp, setFollowUp] = React.useState("");
  const [medicineInput, setMedicineInput] = React.useState({
    medname: "",
    dailyUse: "",
    days: "",
    quantity: "",
  });
  const [suggestions, setSuggestions] = React.useState([]);

  // Fixed doctor information - not editable
  const doctorName = "Dr. John Doe";
  const licenseNumber = "12345";

  // Handle input changes
  const handleInputChange = (field, value) => {
    const updatedInput = { ...medicineInput, [field]: value };

    // Auto-calculate quantity if dailyUse or days changes
    if (field === "dailyUse" || field === "days") {
      const dailyUse = updatedInput.dailyUse.match(/\d+/g)?.[0] || 0;
      const days = updatedInput.days || 0;
      updatedInput.quantity = dailyUse * days;
    }

    setMedicineInput(updatedInput);
  };

  // Handle medicine name input for suggestions
  const handleMedicineNameInput = (value) => {
    setMedicineInput({ ...medicineInput, medname: value });
    if (value) {
      const filteredSuggestions = dummyMedicines.filter((med) =>
        med.medname.toLowerCase().includes(value.toLowerCase())
      );
      setSuggestions(filteredSuggestions);
    } else {
      setSuggestions([]);
    }
  };

  // Handle selecting a suggestion
  const handleSelectSuggestion = (suggestion) => {
    setMedicineInput({ ...medicineInput, medname: suggestion.medname });
    setSuggestions([]);
  };

  // Add a new medicine to the list
  const handleAddMedicine = (e) => {
    e.preventDefault();
    if (medicineInput.medname && medicineInput.dailyUse && medicineInput.days) {
      setMedicines([...medicines, medicineInput]);
      setMedicineInput({ medname: "", dailyUse: "", days: "", quantity: "" });
    } else {
      alert("Please fill all fields (Medicine Name, Daily Use, and Days).");
    }
  };

  // Remove a medicine from the list
  const handleRemoveMedicine = (index) => {
    const updatedMedicines = [...medicines];
    updatedMedicines.splice(index, 1);
    setMedicines(updatedMedicines);
  };

  // Generate PDF
  const generatePDF = () => {
    const doc = new jsPDF();

    // Doctor Information
    doc.setFontSize(18);
    doc.text("Prescription", 10, 20);
    doc.setFontSize(12);
    doc.text(`Doctor: ${doctorName}`, 10, 30);
    doc.text(`License: ${licenseNumber}`, 10, 40);

    // Medicines Table
    doc.setFontSize(14);
    doc.text("Medications", 10, 50);
    let y = 60;
    medicines.forEach((med, index) => {
      doc.text(
        `${index + 1}. ${med.medname} - ${med.dailyUse} (${med.days} days) - Qty: ${med.quantity}`,
        10,
        y
      );
      y += 10;
    });

    // Doctor's Advice
    doc.setFontSize(14);
    doc.text("Doctor's Advice", 10, y + 10);
    doc.setFontSize(12);
    doc.text(doctorAdvice, 10, y + 20);

    // Follow-up Date
    doc.setFontSize(14);
    doc.text("Follow-up Date", 10, y + 30);
    doc.setFontSize(12);
    doc.text(followUp, 10, y + 40);

    // Save the PDF
    doc.save("prescription.pdf");
  };

  // Handle form submission
  const handleCreate = () => {
    console.log("Medicines:", medicines);
    console.log("Doctor Advice:", doctorAdvice);
    console.log("Follow Up:", followUp);
    generatePDF();
    alert("Prescription created and PDF downloaded successfully!");
  };

  return (
    <Grid container spacing={4} sx={{ maxWidth: "7xl", margin: "auto", p: 2 }}>
      {/* Left Section - Video Chat */}
      <Grid item xs={12} md={5}>
        <Paper
          sx={{
            p: 2,
            height: "100%",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Typography variant="h6" gutterBottom>
            Video Chat
          </Typography>
          <Avatar
            sx={{ width: 100, height: 100, mb: 2 }}
            src="/api/placeholder/100/100"
          />
          <Typography variant="body1" color="textSecondary">
            Video chat placeholder
          </Typography>
        </Paper>
      </Grid>

      {/* Right Section - Prescription Form */}
      <Grid item xs={12} md={7}>
        <Paper sx={{ p: 3 }}>
          <Typography variant="h5" gutterBottom>
            Create Prescription
          </Typography>

          {/* Doctor Information */}
          <Paper sx={{ p: 2, mb: 3, bgcolor: "background.default" }}>
            <Grid container alignItems="center" spacing={2}>
              <Grid item>
                <Avatar
                  sx={{ width: 60, height: 60 }}
                  src="/api/placeholder/100/100"
                />
              </Grid>
              <Grid item>
                <Typography variant="h6">{doctorName}</Typography>
                <Typography variant="body2" color="textSecondary">
                  License: {licenseNumber}
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  General Physician
                </Typography>
              </Grid>
            </Grid>
          </Paper>

          {/* Medicine Input Section */}
          <Typography variant="h6" gutterBottom>
            Add Medication
          </Typography>
          <Grid container spacing={2} alignItems="center">
            <Grid item xs={12} sm={5} sx={{ position: "relative" }}>
              <TextField
                fullWidth
                label="Medicine Name"
                value={medicineInput.medname}
                onChange={(e) => handleMedicineNameInput(e.target.value)}
              />
              {suggestions.length > 0 && (
                <Paper
                  sx={{
                    position: "absolute",
                    zIndex: 1,
                    width: "100%",
                    maxHeight: 150,
                    overflow: "auto",
                    mt: 1,
                    boxShadow: 3,
                    "&::-webkit-scrollbar": {
                      display: "none",
                    },
                    scrollbarWidth: "none",
                    msOverflowStyle: "none",
                  }}
                >
                  <List sx={{ bgcolor: "background.paper" }}>
                    {suggestions.map((suggestion, i) => (
                      <ListItem
                        key={i}
                        button
                        onClick={() => handleSelectSuggestion(suggestion)}
                        sx={{ "&:hover": { bgcolor: "action.hover" } }}
                      >
                        <ListItemText primary={suggestion.medname} />
                      </ListItem>
                    ))}
                  </List>
                </Paper>
              )}
            </Grid>
            <Grid item xs={12} sm={2}>
              <TextField
                fullWidth
                label="Daily Use"
                value={medicineInput.dailyUse}
                onChange={(e) => handleInputChange("dailyUse", e.target.value)}
              />
            </Grid>
            <Grid item xs={12} sm={2}>
              <TextField
                fullWidth
                label="Days"
                value={medicineInput.days}
                onChange={(e) => handleInputChange("days", e.target.value)}
              />
            </Grid>
            <Grid item xs={12} sm={2}>
              <TextField
                fullWidth
                label="Quantity"
                value={medicineInput.quantity}
                InputProps={{ readOnly: true }}
              />
            </Grid>
            <Grid item xs={12} sm={1}>
              <Button
                fullWidth
                variant="contained"
                color="primary"
                onClick={handleAddMedicine}
                startIcon={<Add />}
              >
                Add
              </Button>
            </Grid>
          </Grid>

          {/* Medications Table */}
          <TableContainer component={Paper} sx={{ mt: 3 }}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Medicine</TableCell>
                  <TableCell>Dosage</TableCell>
                  <TableCell>Days</TableCell>
                  <TableCell>Quantity</TableCell>
                  <TableCell>Action</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {medicines.map((med, index) => (
                  <TableRow key={index}>
                    <TableCell>{med.medname}</TableCell>
                    <TableCell>{med.dailyUse}</TableCell>
                    <TableCell>{med.days}</TableCell>
                    <TableCell>{med.quantity}</TableCell>
                    <TableCell>
                      <IconButton onClick={() => handleRemoveMedicine(index)}>
                        <Delete color="error" />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
                {medicines.length === 0 && (
                  <TableRow>
                    <TableCell colSpan={5} align="center">
                      No medications added yet
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>

          {/* Doctor's Advice and Follow-up */}
          <TextField
            fullWidth
            label="Doctor's Advice"
            multiline
            rows={4}
            value={doctorAdvice}
            onChange={(e) => setDoctorAdvice(e.target.value)}
            sx={{ mt: 3 }}
          />

          {/* Follow-up Date with Label */}
          <Box sx={{ mt: 3 }}>
            <Typography variant="body1" sx={{ mb: 1 }}>
              Follow-up Date
            </Typography>
            <DatePicker
              style={{ width: "auto" }} // Adjust width to minimum required
              onChange={(date, dateString) => setFollowUp(dateString)}
            />
          </Box>

          {/* Submit Button */}
          <Grid container justifyContent="center" sx={{ mt: 3 }}>
  <Grid item xs={12} sm={6} md={5}> {/* Adjust width for different screen sizes */}
    <Button
      fullWidth
      variant="contained"
      color="primary"
      onClick={handleCreate}
    >
      Generate Prescription
    </Button>
  </Grid>
</Grid>
        </Paper>
      </Grid>
    </Grid>
  );
};

export default PrescriptionForm;