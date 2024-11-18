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
} from "@mui/material";

const AdminLeavePage = () => {
  const [leaves, setLeaves] = useState([]);
  const [filteredLeaves, setFilteredLeaves] = useState([]);
  const [statusFilter, setStatusFilter] = useState("All");

  // Mock Data for Leaves
  useEffect(() => {
    const mockLeaves = [
      { id: 1, name: "John Doe", status: "Approved", reason: "Vacation" },
      { id: 2, name: "Jane Smith", status: "Pending", reason: "Medical" },
      {
        id: 3,
        name: "Mike Johnson",
        status: "Rejected",
        reason: "Family Emergency",
      },
      { id: 4, name: "Emma Brown", status: "Pending", reason: "Conference" },
    ];
    setLeaves(mockLeaves);
    setFilteredLeaves(mockLeaves);
  }, []);

  // Filter Leaves by Status
  useEffect(() => {
    if (statusFilter === "All") {
      setFilteredLeaves(leaves);
    } else {
      setFilteredLeaves(
        leaves.filter((leave) => leave.status === statusFilter)
      );
    }
  }, [statusFilter, leaves]);

  return (
    <div style={{ padding: "20px" }}>
      <Typography variant="h4" gutterBottom>
        Admin Leave Page
      </Typography>

      {/* Status Filter */}
      <div style={{ marginBottom: "20px" }}>
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
        >
          <MenuItem value="All">All</MenuItem>
          <MenuItem value="Approved">Approved</MenuItem>
          <MenuItem value="Pending">Pending</MenuItem>
          <MenuItem value="Rejected">Rejected</MenuItem>
        </Select>
      </div>

      {/* Leaves Table */}
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Reason</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredLeaves.length > 0 ? (
              filteredLeaves.map((leave) => (
                <TableRow key={leave.id}>
                  <TableCell>{leave.name}</TableCell>
                  <TableCell>{leave.status}</TableCell>
                  <TableCell>{leave.reason}</TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={3} align="center">
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
