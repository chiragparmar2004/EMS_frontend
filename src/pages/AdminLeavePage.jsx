import React, { useState, useEffect } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Select,
  MenuItem,
  Typography,
  Button,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllLeaves } from "../store/slices/leave.slice";
import { format } from "date-fns";

const AdminLeavePage = () => {
  const [leaves, setLeaves] = useState([]);
  const [filteredLeaves, setFilteredLeaves] = useState([]);
  const [statusFilter, setStatusFilter] = useState("All");
  const navigate = useNavigate();

  const dispatch = useDispatch();
  const { data, loading, error } = useSelector(
    (state) => state.leave.leaveActions.fetchAll
  );
  console.log("🚀 ~ AdminLeavePage ~ loading:", loading);

  useEffect(() => {
    dispatch(fetchAllLeaves()); // Fetch leaves when the component mounts
  }, [dispatch]);

  // Mock Data for Leaves
  useEffect(() => {
    const mockLeaves = [
      {
        id: 1,
        userName: "John Doe",
        status: "Approved",
        startDate: "2024-11-10",
        endDate: "2024-11-15",
        leaveType: "Casual",
      },
      {
        id: 2,
        userName: "Jane Smith",
        status: "Pending",
        startDate: "2024-11-12",
        endDate: "2024-11-14",
        leaveType: "Sick",
      },
      {
        id: 3,
        userName: "Mike Johnson",
        status: "Rejected",
        startDate: "2024-11-08",
        endDate: "2024-11-09",
        leaveType: "Other",
      },
      {
        id: 4,
        userName: "Emma Brown",
        status: "Pending",
        startDate: "2024-11-20",
        endDate: "2024-11-22",
        leaveType: "Casual",
      },
    ];

    setLeaves(mockLeaves);
    setFilteredLeaves(mockLeaves);
  }, []);

  // Filter Leaves by Status
  useEffect(() => {
    if (statusFilter === "All") {
      setFilteredLeaves(data);
    } else {
      setFilteredLeaves(data.filter((data) => data.status === statusFilter));
    }
  }, [statusFilter, leaves]);

  // Navigate to the Add Leave page
  const handleAddLeave = () => {
    navigate("/add-leave"); // Replace with your actual route for the LeaveForm component
  };

  const handleViewDetails = (id) => () => {
    navigate(`/view-update-leave/${id}`);
  };
  return (
    <div
      style={{
        padding: "20px",
        marginTop: "2%",
        width: "100%",
      }}
    >
      <Typography variant="h4" gutterBottom>
        Admin Leave Page
      </Typography>

      {/* Add Leave Button */}
      <div
        style={{
          marginBottom: "20px",
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <div>
          <Typography
            variant="subtitle1"
            display="inline"
            style={{ marginRight: "10px" }}
          >
            Filter by Status:
          </Typography>
          <Select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            sx={{ minWidth: "150px", textAlign: "center" }}
          >
            <MenuItem value="All">All</MenuItem>
            <MenuItem value="Approved">Approved</MenuItem>
            <MenuItem value="Pending">Pending</MenuItem>
            <MenuItem value="Rejected">Rejected</MenuItem>
          </Select>
        </div>
        <Button
          variant="contained"
          color="primary"
          onClick={handleAddLeave}
          sx={{ color: (theme) => theme.palette.text.contrastText }}
        >
          Add Leave
        </Button>
      </div>
      {/* Leaves Table */}
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell style={{ textAlign: "center" }}>Name</TableCell>
              <TableCell style={{ textAlign: "center" }}>
                Start Date - End Date
              </TableCell>
              <TableCell style={{ textAlign: "center" }}>Duration</TableCell>
              <TableCell style={{ textAlign: "center" }}>Leave Type</TableCell>
              <TableCell style={{ textAlign: "center" }}>Status</TableCell>
              <TableCell style={{ textAlign: "center" }} align="center">
                View Details
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredLeaves.length > 0 ? (
              filteredLeaves.map((leave) => (
                <TableRow key={leave._id}>
                  <TableCell style={{ textAlign: "center" }}>
                    {leave.user.firstName} {leave.user.lastName}
                  </TableCell>
                  <TableCell style={{ textAlign: "center" }}>
                    {format(new Date(leave.startDate), "dd MMM yyyy")} -{" "}
                    {format(new Date(leave.endDate), "dd MMM yyyy")}
                  </TableCell>
                  <TableCell style={{ textAlign: "center" }}>
                    {Math.ceil(
                      (new Date(leave.endDate) - new Date(leave.startDate)) /
                        (1000 * 60 * 60 * 24)
                    )}{" "}
                    days
                  </TableCell>
                  <TableCell style={{ textAlign: "center" }}>
                    {leave.leaveType}
                  </TableCell>
                  <TableCell style={{ textAlign: "center" }}>
                    <span
                      style={{
                        backgroundColor:
                          leave.status === "Approved"
                            ? "#1be29a" // Green for approved
                            : leave.status === "Pending"
                            ? "#ffd166" // Yellow for pending
                            : "#e63946", // Red for rejected
                        color: "#000", // Text color
                        textAlign: "center",
                        borderRadius: "4px",
                        padding: "4px 8px",
                      }}
                    >
                      {leave.status}
                    </span>
                  </TableCell>
                  <TableCell align="center">
                    <Button
                      variant="outlined"
                      color="primary"
                      onClick={handleViewDetails(leave._id)}
                    >
                      View Details
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={6}
                  align="center"
                  style={{ textAlign: "center" }}
                >
                  No leaves found
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default AdminLeavePage;
