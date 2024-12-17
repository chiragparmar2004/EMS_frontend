import { Box, Button, Container } from "@mui/material";
import EmployeeForm from "../components/EmployeeForm";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useNavigate } from "react-router-dom";

const AddEmployeePage = () => {
  const navigate = useNavigate();
  const handleBackClick = () => {
    navigate("/employees");
  };
  return (
    <Container>
      <Box sx={{ mb: 3, display: "flex", justifyContent: "flex-start" }}>
        <Button
          variant="outlined"
          color="primary"
          onClick={handleBackClick}
          sx={{
            fontWeight: "bold",
            borderWidth: 1,
            display: "flex",
            alignItems: "center",
            gap: 1, // Adds space between the icon and text
          }}
        >
          <ArrowBackIcon />
          Back
        </Button>
      </Box>
      <EmployeeForm isEdit={false} />;
    </Container>
  );
};

export default AddEmployeePage;
