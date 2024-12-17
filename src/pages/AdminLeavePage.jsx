import { useState } from "react";
import {
  Box,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Button,
  Container,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import LeaveTable from "../components/LeaveTable";
import { useNavigate } from "react-router-dom";

const AdminLeavePage = () => {
  const navigate = useNavigate();
  const [filterStatus, setFilterStatus] = useState("All");

  const handleStatusChange = (event) => {
    setFilterStatus(event.target.value);
  };

  return (
    <Container sx={{ width: "100%" }}>
      {/* Header Section */}
      <Box
        sx={{
          marginBottom: 2,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        {/* Status Filter */}
        <FormControl variant="outlined" size="small" sx={{ minWidth: 150 }}>
          <InputLabel>Status</InputLabel>
          <Select
            value={filterStatus}
            onChange={handleStatusChange}
            label="Status"
          >
            <MenuItem value="All">All</MenuItem>
            <MenuItem value="Approved">Approved</MenuItem>
            <MenuItem value="Pending">Pending</MenuItem>
            <MenuItem value="Rejected">Rejected</MenuItem>
          </Select>
        </FormControl>

        {/* Add Leave Button */}
        <Button
          variant="contained"
          color="primary"
          startIcon={<AddIcon />}
          onClick={() => navigate("/add-leave")}
          sx={{ color: (theme) => theme.palette.text.contrastText }}
        >
          Add Leave
        </Button>
      </Box>

      {/* Leave Table */}
      <LeaveTable filterStatus={filterStatus} rowsPerPage={6} />
    </Container>
  );
};

export default AdminLeavePage;
