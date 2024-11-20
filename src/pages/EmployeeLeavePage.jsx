import React, { useState, useEffect } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  Button,
  CircularProgress,
  Box,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchLeavesByEmployee } from "../store/slices/leave.slice";
import { format } from "date-fns";

const EmployeeLeavePage = () => {
  const [employeeLeaves, setEmployeeLeaves] = useState([]);
  console.log("🚀 ~ EmployeeLeavePage ~ employeeLeaves:", employeeLeaves);
  const navigate = useNavigate();

  const dispatch = useDispatch();
  const { data, loading, error } = useSelector(
    (state) => state.leave.leaveActions.fetchByEmployee
  );
  console.log("🚀 ~ EmployeeLeavePage ~ data:", data);
  // const userData = useSelector((state) => state.user.user);
  // console.log("🚀 ~ EmployeeLeavePage ~ userdata:", userData.data._id);
  console.log("🚀 ~ AdminLeavePage ~ loading:", loading);

  useEffect(() => {
    dispatch(fetchLeavesByEmployee()); // Fetch leaves when the component mounts
  }, [dispatch]);

  useEffect(() => {
    if (data) {
      setEmployeeLeaves(data); // Update state when data changes
    }
  }, [data]);

  // Mock Data for Employee Leaves
  // useEffect(() => {
  //   const mockEmployeeLeaves = [
  //     {
  //       id: 1,
  //       status: "Approved",
  //       startDate: "2024-11-10",
  //       endDate: "2024-11-15",
  //       leaveType: "Casual",
  //     },
  //     {
  //       id: 2,
  //       status: "Pending",
  //       startDate: "2024-11-12",
  //       endDate: "2024-11-14",
  //       leaveType: "Sick",
  //     },
  //     {
  //       id: 3,
  //       status: "Rejected",
  //       startDate: "2024-11-08",
  //       endDate: "2024-11-09",
  //       leaveType: "Other",
  //     },
  //   ];
  //   setEmployeeLeaves(mockEmployeeLeaves);
  // }, []);

  const handleViewLeaveDetails = (id) => () => {
    navigate(`/view-update-leave/${id}`);
  };
  // Navigate to the Leave Request Form
  const handleRequestLeave = () => {
    navigate("/request-leave"); // Replace with the actual route for the LeaveRequestForm component
  };
  // Loading State
  if (loading) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        height="100vh"
        width="100vw"
      >
        <CircularProgress />
      </Box>
    );
  }

  return (
    <div
      style={{
        padding: "20px",
        marginTop: "2%",
        width: "100%",
      }}
    >
      <Typography variant="h4" gutterBottom>
        Your Leaves
      </Typography>

      {/* Request Leave Button */}
      <div
        style={{
          marginBottom: "20px",
          display: "flex",
          justifyContent: "end",
        }}
      >
        <Button
          variant="contained"
          color="primary"
          onClick={handleRequestLeave}
          sx={{ color: (theme) => theme.palette.text.contrastText }}
        >
          Request Leave
        </Button>
      </div>

      {/* Employee Leaves Table */}
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Start Date - End Date</TableCell>
              <TableCell>Duration</TableCell>
              <TableCell>Leave Type</TableCell>
              <TableCell>Status</TableCell>
              <TableCell align="center">View Details</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {employeeLeaves.length > 0 ? (
              employeeLeaves.map((leave) => (
                <TableRow key={leave.id}>
                  <TableCell>
                    {format(new Date(leave.startDate), "dd MMM yyyy")} -{" "}
                    {format(new Date(leave.endDate), "dd MMM yyyy")}
                  </TableCell>
                  <TableCell>
                    {Math.ceil(
                      (new Date(leave.endDate) - new Date(leave.startDate)) /
                        (1000 * 60 * 60 * 24)
                    )}{" "}
                    days
                  </TableCell>
                  <TableCell>{leave.leaveType}</TableCell>

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
                      onClick={handleViewLeaveDetails(leave._id)}
                    >
                      View Details
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={5} align="center">
                  No leave requests found
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default EmployeeLeavePage;
