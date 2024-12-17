import React, { useState } from "react";
import { Container, Typography, Button, Box } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { useNavigate } from "react-router-dom";
import EmployeeTable from "../components/EmployeeTable";
import Filter from "../components/Filter";

const EmployeePage = () => {
  const [filterQuery, setFilterQuery] = useState({
    firstName: "",
    lastName: "",
    isActive: null,
    salary: "",
    startDate: null,
    endDate: null,
  });
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/add-employee");
  };

  const handleApplyFilters = (filters) => {
    console.log("🚀 ~ handleApplyFilters ~ filters:", filters);
    setFilterQuery(filters);
  };

  return (
    <Container>
      {/* Header */}
      <Box sx={{ mb: 2, display: "flex", justifyContent: "space-between" }}>
        <Typography variant="h4">Employees</Typography>
        <Button
          variant="contained"
          color="primary"
          startIcon={<AddIcon />}
          onClick={handleClick}
          sx={{ color: (theme) => theme.palette.text.contrastText }}
        >
          Add Employee
        </Button>
      </Box>

      {/* Filters */}
      <Filter onApplyFilters={handleApplyFilters} />

      {/* Employee Table */}
      <EmployeeTable filterQuery={filterQuery} />
    </Container>
  );
};

export default EmployeePage;
