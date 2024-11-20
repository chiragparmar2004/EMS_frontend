import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import {
  deleteLeave,
  fetchLeaveById,
  updateLeave,
  updateLeaveStatus,
} from "../store/slices/leave.slice";
import {
  Button,
  Typography,
  Paper,
  CircularProgress,
  Box,
  Container,
} from "@mui/material";

import Grid from "@mui/material/Grid2"; // Use Grid2 for better spacing and responsive layout

import LeaveForm from "../components/LeaveForm";

const ViewOrUpdateLeavePage = () => {
  const { id } = useParams();
  const dispatch = useDispatch();

  const [isEditing, setIsEditing] = useState(false);
  const currentUser = useSelector((state) => state.user.user.data);
  let IsAdmin = currentUser.role === "admin";

  const { loading, error, data } = useSelector(
    (state) => state.leave.leaveActions.fetchById
  );

  useEffect(() => {
    dispatch(fetchLeaveById(id));
  }, [dispatch, id]);

  const handleEditToggle = () => setIsEditing((prev) => !prev);
  const handleApprove = async () => {
    try {
      await dispatch(
        updateLeaveStatus({ leaveId: id, status: "Approved" })
      ).unwrap();
      alert("Leave approved successfully!");
    } catch (err) {
      alert("Failed to approve leave.");
    }
  };
  const handleReject = async () => {
    try {
      await dispatch(
        updateLeaveStatus({ leaveId: id, status: "Rejected" })
      ).unwrap();
      alert("Leave rejected successfully!");
    } catch (err) {
      alert("Failed to reject leave.");
    }
  };

  const handleDelete = async () => {
    try {
      await dispatch(deleteLeave({ id })).unwrap();
      alert("Leave deleted successfully!");
    } catch (err) {
      alert("Failed to delete leave.");
    }
  };

  const handleSubmit = async (values) => {
    try {
      await dispatch(updateLeave({ id, ...values })).unwrap();
      alert("Leave updated successfully!");
      setIsEditing(false);
    } catch (err) {
      alert("Failed to update leave.");
    }
  };

  if (loading) return <CircularProgress size={60} />;
  if (error)
    return (
      <Typography variant="h6" color="error">
        Failed to load leave details: {error}
      </Typography>
    );

  return (
    <Container>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
          padding: "20px",
          height: "100vh",
          minWidth: "50%",
        }}
      >
        <Paper
          elevation={6}
          sx={{
            width: "100%",
            maxWidth: "800px",
            padding: "30px",
            borderRadius: "8px",
          }}
        >
          {!isEditing ? (
            <>
              <Grid container spacing={4}>
                <Grid item size={{ xs: 12 }}>
                  <Typography variant="h3" color="primary" textAlign={"center"}>
                    Leave Details
                  </Typography>
                </Grid>
                <Grid item size={{ xs: 12 }}>
                  <Typography variant="body1">
                    <strong>Leave Type:</strong> {data?.leaveType}
                  </Typography>
                </Grid>
                <Grid item size={{ xs: 12 }}>
                  <Typography variant="body1">
                    <strong>Date:</strong>{" "}
                    {new Date(data?.startDate).toLocaleDateString()} -
                    {/* </Typography>
                </Grid>
                <Grid item size={{ xs: 12 }}>
                  <Typography variant="body1">
                    <strong>End Date:</strong>{" "} */}{" "}
                    {new Date(data?.endDate).toLocaleDateString()}
                  </Typography>
                </Grid>
                <Grid item size={{ xs: 12 }}>
                  <Typography variant="body1">
                    <strong>Reason:</strong> {data?.reason}
                  </Typography>
                </Grid>
                <Grid item size={{ xs: 12 }}>
                  <Typography variant="body1">
                    <strong>Status:</strong> {data?.status}
                  </Typography>
                </Grid>
              </Grid>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-evenly",
                  gap: 2,
                }}
              >
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleEditToggle}
                  sx={{
                    width: "120px",
                    color: (theme) => theme.palette.text.contrastText,
                  }}
                >
                  Edit
                </Button>
                {IsAdmin ? (
                  <Box sx={{ display: "flex", gap: 2 }}>
                    <Button
                      variant="contained"
                      color="success"
                      onClick={handleApprove}
                      sx={{ width: "120px" }}
                    >
                      Approve
                    </Button>
                    <Button
                      variant="contained"
                      color="error"
                      onClick={handleReject}
                      sx={{ width: "120px" }}
                    >
                      Reject
                    </Button>
                  </Box>
                ) : (
                  <Button
                    variant="contained"
                    color="error"
                    onClick={handleDelete}
                    sx={{ width: "120px" }}
                  >
                    Delete
                  </Button>
                )}
              </Box>
            </>
          ) : (
            <LeaveForm
              isEdit={true}
              setIsEditing={setIsEditing}
              initialData={data}
              leaveId={id}
              onCancel={() => setIsEditing(false)}
              onSubmit={handleSubmit}
            />
          )}
        </Paper>
      </Box>
    </Container>
  );
};

export default ViewOrUpdateLeavePage;
