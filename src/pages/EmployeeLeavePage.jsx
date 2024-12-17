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
  Dialog,
  DialogContent,
  IconButton,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchLeavesByEmployee } from "../store/slices/leave.slice";
import { format } from "date-fns";
import CloseIcon from "@mui/icons-material/Close";
import socket from "../lib/socket";
import ViewOrUpdateLeavePage from "./ViewOrUpdateLeavePage"; // Adjust import path

const EmployeeLeavePage = () => {
  const [employeeLeaves, setEmployeeLeaves] = useState([]);
  const [isDialogOpen, setDialogOpen] = useState(false);
  const [selectedLeaveId, setSelectedLeaveId] = useState(null);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  // const { data, loading, error } = useSelector(
  //   (state) => state.leave.leaveActions.fetchByEmployee
  // );

  const LeaveData = useSelector((state) => state.leave);

  const data = LeaveData.leaves.data;
  const loading = LeaveData.leaves.loading;

  useEffect(() => {
    dispatch(fetchLeavesByEmployee()); // Fetch leaves when the component mounts
  }, [dispatch]);

  useEffect(() => {
    if (data) {
      setEmployeeLeaves(data); // Update state when data changes
    }
  }, [data]);

  // Handle real-time updates
  useEffect(() => {
    socket.on("leaveRequestModified", (updatedLeave) => {
      dispatch(fetchLeavesByEmployee());
    });

    // Clean up the socket connection
    return () => {
      socket.off("leaveRequestModified");
    };
  }, []);

  // Open the dialog and set the selected leave ID
  const handleViewLeaveDetails = (id) => () => {
    setSelectedLeaveId(id);
    setDialogOpen(true);
  };

  // Close the dialog
  const handleCloseDialog = () => {
    setSelectedLeaveId(null);
    setDialogOpen(false);
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
      <TableContainer>
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
                            ? "#1be29a"
                            : leave.status === "Pending"
                            ? "#ffd166"
                            : "#e63946",
                        color: "#000",
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

      {/* Dialog for Leave Details */}
      <Dialog
        open={isDialogOpen}
        onClose={handleCloseDialog}
        fullWidth
        sx={{
          "& .MuiPaper-root": {
            backgroundColor: "background.default",
            color: "text.primary",
            borderRadius: 3,
            boxShadow: 4,
          },
        }}
      >
        <IconButton
          onClick={handleCloseDialog}
          aria-label="close"
          sx={{
            position: "absolute",
            top: 8,
            right: 8,
            zIndex: 1300,
            scale: 1.25,
            color: "text.primary",
          }}
        >
          <CloseIcon />
        </IconButton>
        <DialogContent
          sx={{
            padding: 3,
            backgroundColor: "background.paper",
          }}
        >
          {selectedLeaveId && (
            <ViewOrUpdateLeavePage
              leaveId={selectedLeaveId}
              handleCloseDialog={handleCloseDialog}
            />
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default EmployeeLeavePage;
