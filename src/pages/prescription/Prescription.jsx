// components/Prescription.js
import {
  Box,
  Paper,
  Typography,
  useTheme,
  useMediaQuery,
  Chip,
} from "@mui/material";
import { styled } from "@mui/material/styles";

const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(3),
  borderRadius: 16,
  boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.05)",
  height: "100%",
}));
const StatusChip = styled(Chip)(({ status }) => {
  let bgColor = "#4caf50";
  let textColor = "#ffffff";

  if (status === "Dropped") {
    bgColor = "#ff9800";
  } else if (status === "Pending") {
    bgColor = "#2196f3";
  }

  return {
    backgroundColor: bgColor,
    color: textColor,
    borderRadius: 16,
    fontWeight: 500,
    fontSize: "0.75rem",
  };
});

const summaryData = [
  { id: "01", title: "Total Patient", value: 820, color: "#3498db" },
  { id: "02", title: "Call Completed", value: 220, color: "#2ecc71" },
  { id: "03", title: "Call Dropped", value: 20, color: "#f39c12" },
];

const prescriptionData = [
  {
    id: "01",
    name: "Sakila Chowdhury",
    date: "12 December 2023",
    time: "05:44 PM",
    status: "Completed",
  },
  {
    id: "02",
    name: "Ashique Mahmud",
    date: "18 December 2023",
    time: "05:44 PM",
    status: "Completed",
  },
  {
    id: "03",
    name: "Subrata Roy",
    date: "22 December 2023",
    time: "05:44 PM",
    status: "Dropped",
  },
  {
    id: "04",
    name: "Abdul Alim Mia",
    date: "22 December 2023",
    time: "05:44 PM",
    status: "Completed",
  },
  {
    id: "05",
    name: "Sohana Chowdhury",
    date: "22 December 2023",
    time: "05:44 PM",
    status: "Dropped",
  },
  {
    id: "06",
    name: "Rony Saha",
    date: "22 December 2023",
    time: "05:44 PM",
    status: "Dropped",
  },
];

function Prescription() {
  const theme = useTheme();
  const isMediumScreen = useMediaQuery(theme.breakpoints.up("md"));

  return (
    <Box sx={{ maxWidth: "2xl", margin: "0 auto" }}>
      <Box
        sx={{
          display: "flex",
          flexDirection: isMediumScreen ? "row" : "column",
          gap: 3,
        }}
      >
        {/* Stats Section - 50% width on md+ */}
        <Box
          sx={{
            flex: isMediumScreen ? 1 : "auto",
            width: isMediumScreen ? "50%" : "100%",
          }}
        >
          <StyledPaper>
            <Typography variant="h6" sx={{ fontWeight: "bold", mb: 3 }}>
              Recent Prescriptions
            </Typography>

            {prescriptionData.map((item, index) => (
              <Box key={item.id} sx={{ py: 1.5 }}>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <Box sx={{ display: "flex", gap: 3, alignItems: "center" }}>
                    <Typography
                      variant="body2"
                      sx={{ color: "text.secondary", width: "30px" }}
                    >
                      {item.id}
                    </Typography>
                    <Typography variant="body1" sx={{ fontWeight: 500 }}>
                      {item.name}
                    </Typography>
                  </Box>

                  <Box sx={{ display: "flex", gap: 3, alignItems: "center" }}>
                    <Typography
                      variant="body2"
                      sx={{ color: "text.secondary" }}
                    >
                      {item.date}
                    </Typography>
                    <Typography
                      variant="body2"
                      sx={{ color: "text.secondary" }}
                    >
                      {item.time}
                    </Typography>
                    <StatusChip
                      label={item.status}
                      status={item.status}
                      size="small"
                    />
                  </Box>
                </Box>
                {index < prescriptionData.length - 1 && (
                  <Box sx={{ borderBottom: "1px solid #eee", mt: 1.5 }} />
                )}
              </Box>
            ))}

            {/* Pagination */}
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                mt: 3,
              }}
            >
              {/* <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                <Typography variant="body2" sx={{ color: "text.secondary" }}>
                  1-50 of 1,250
                </Typography>
              </Box> */}

              <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                <Box
                  sx={{
                    p: "5px 10px",
                    border: "1px solid #e0e0e0",
                    borderRadius: "4px",
                    color: "text.secondary",
                  }}
                >
                  ‹ Back
                </Box>

                {[1, 2, 3, 4, 5, 6, 7, 8].map((page) => (
                  <Box
                    key={page}
                    sx={{
                      p: "5px 10px",
                      border: page === 1 ? "none" : "1px solid #e0e0e0",
                      borderRadius: "4px",
                      backgroundColor: page === 1 ? "#3498db" : "transparent",
                      color: page === 1 ? "white" : "text.secondary",
                    }}
                  >
                    {page}
                  </Box>
                ))}

                <Box sx={{ color: "text.secondary" }}>...</Box>

                <Box
                  sx={{
                    p: "5px 10px",
                    border: "1px solid #e0e0e0",
                    borderRadius: "4px",
                    color: "text.secondary",
                  }}
                >
                  25
                </Box>

                <Box
                  sx={{
                    p: "5px 10px",
                    border: "1px solid #e0e0e0",
                    borderRadius: "4px",
                    color: "text.secondary",
                  }}
                >
                  Next ›
                </Box>
              </Box>

              <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                <Typography variant="body2" sx={{ color: "text.secondary" }}>
                  Result per page
                </Typography>
                <Box
                  sx={{
                    p: "5px 10px",
                    border: "1px solid #e0e0e0",
                    borderRadius: "4px",
                    display: "flex",
                    alignItems: "center",
                    gap: 1,
                    color: "text.secondary",
                  }}
                >
                  50 ▾
                </Box>
              </Box>
            </Box>
            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
              <Typography variant="body2" sx={{ color: "text.secondary" }}>
                1-50 of 1,250
              </Typography>
            </Box>
          </StyledPaper>
        </Box>

        {/* Summary Section - 50% width on md+ */}
        <Box
          sx={{
            flex: isMediumScreen ? 1 : "auto",
            width: isMediumScreen ? "50%" : "100%",
          }}
        >
          <StyledPaper>
            <Typography variant="h6" sx={{ fontWeight: "bold", mb: 2 }}>
              Summary
            </Typography>

            {summaryData.map((item, index) => (
              <Box key={item.id} sx={{ py: 1 }}>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <Box sx={{ display: "flex", gap: 2 }}>
                    <Typography variant="body1">{item.id}</Typography>
                    <Typography variant="body1">{item.title}</Typography>
                  </Box>
                  <Typography
                    variant="h6"
                    sx={{ fontWeight: "bold", color: item.color }}
                  >
                    {item.value}
                  </Typography>
                </Box>
                {index < summaryData.length - 1 && (
                  <Box sx={{ borderBottom: "1px solid #eee", mt: 1 }} />
                )}
              </Box>
            ))}
          </StyledPaper>
        </Box>
      </Box>

      {/* Prescription List Section - 100% width */}
    </Box>
  );
}

export default Prescription;
