import { useEffect, useState, lazy, Suspense } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import {
  deleteLeave,
  fetchLeaveById,
  updateLeaveStatus,
} from "../store/slices/leave.slice";
import {
  Button,
  Typography,
  Dialog,
  DialogContent,
  DialogActions,
  CircularProgress,
  Box,
  Paper,
  Grid,
} from "@mui/material";
import { showSnackbar } from "../store/slices/snackbar.slice";
import Loader from "../components/Loader";
import LeaveForm from "../components/LeaveForm";

const ViewOrUpdateLeavePage = ({ leaveId, handleCloseDialog }) => {
  console.log(
    "🚀 ~ ViewOrUpdateLeavePage ~ handleCloseDialog:",
    handleCloseDialog
  );
  console.log("🚀 ~ ViewOrUpdateLeavePage ~ leaveId:", leaveId);
  const [actionLoading, setActionLoading] = useState({
    approve: false,
    reject: false,
  });
  const [isEditing, setIsEditing] = useState(false);
  console.log("🚀 ~ ViewOrUpdateLeavePage ~ isEditing:", isEditing);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const currentUser = useSelector((state) => state.user.user.data);
  const IsAdmin = currentUser.role === "admin";

  const { error, data } = useSelector(
    (state) => state.leave.leaveActions.fetchById
  );

  useEffect(() => {
    const fetchData = async () => {
      await dispatch(fetchLeaveById(leaveId));
    };
    fetchData();
  }, [dispatch, leaveId]);

  // const handleCloseDialog = () => {
  //   navigate("/leaves");
  // };

  const handleEditToggle = () => setIsEditing((prev) => !prev);

  const handleApprove = async () => {
    setActionLoading({ ...actionLoading, approve: true });
    try {
      const resultAction = await dispatch(
        updateLeaveStatus({ leaveId, status: "Approved" }) // Use leaveId here
      );

      if (updateLeaveStatus.fulfilled.match(resultAction)) {
        dispatch(
          showSnackbar({
            message: "Leave approved successfully!",
            severity: "success",
          })
        );
        handleCloseDialog();
      } else {
        dispatch(
          showSnackbar({
            message: resultAction.payload || "Failed to approve leave.",
            severity: "error",
          })
        );
      }
    } catch (error) {
      console.log("🚀 ~ handleApprove ~ error:", error);
      dispatch(
        showSnackbar({
          message: "An unexpected error occurred. Please try again later.",
          severity: "error",
        })
      );
    } finally {
      setActionLoading({ ...actionLoading, approve: false });
    }
  };

  const handleReject = async () => {
    setActionLoading({ ...actionLoading, reject: true });
    try {
      const resultAction = await dispatch(
        updateLeaveStatus({ leaveId, status: "Rejected" }) // Use leaveId here
      );
      console.log("🚀 ~ handleReject ~ resultAction:", resultAction);

      if (updateLeaveStatus.fulfilled.match(resultAction)) {
        dispatch(
          showSnackbar({
            message: "Leave rejected successfully!",
            severity: "success",
          })
        );
        handleCloseDialog();
      } else {
        dispatch(
          showSnackbar({
            message: resultAction.payload || "Failed to reject leave.",
            severity: "error",
          })
        );
      }
    } catch (error) {
      console.log("🚀 ~ handleReject ~ error:", error);
      dispatch(
        showSnackbar({
          message: "An unexpected error occurred. Please try again later.",
          severity: "error",
        })
      );
    } finally {
      setActionLoading({ ...actionLoading, reject: false });
    }
  };

  if (error)
    return (
      <Typography variant="h6" color="error">
        Failed to load leave details: {error}
      </Typography>
    );

  return (
    <Box
      sx={{
        //backgroundColor: "background.default",
        padding: 4,
        borderRadius: 2,
      }}
    >
      {!isEditing ? (
        <Box>
          <Typography
            variant="h4"
            sx={{
              color: "primary.secondary",
              textAlign: "center",
              fontWeight: "bold",
              marginBottom: 5,
            }}
          >
            Leave Details
          </Typography>
          <Paper
            elevation={4}
            sx={{
              padding: 4,
              borderRadius: 2,
              backgroundColor: "background.default",
              color: "text.primary",
            }}
          >
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <Typography variant="h6">
                  <strong>Leave Type:</strong> {data?.leaveType}
                </Typography>
              </Grid>
              <Grid item xs={12}>
                <Typography variant="h6">
                  <strong>Date:</strong>{" "}
                  {new Date(data?.startDate).toLocaleDateString()} -{" "}
                  {new Date(data?.endDate).toLocaleDateString()}
                </Typography>
              </Grid>
              <Grid item xs={12}>
                <Typography variant="h6">
                  <strong>Reason:</strong> {data?.reason}
                </Typography>
              </Grid>
              <Grid item xs={12}>
                <Typography variant="h6">
                  <strong>Status:</strong> {data?.status}
                </Typography>
              </Grid>
            </Grid>
          </Paper>
        </Box>
      ) : (
        <LeaveForm
          isEdit={true}
          initialData={data}
          onCancel={() => setIsEditing(false)}
        />
      )}
      <Box
        sx={{ display: "flex", gap: 2, marginTop: 4, justifyContent: "center" }}
      >
        {!isEditing ? (
          <>
            {data?.status === "Pending" && (
              <Button
                variant="contained"
                color="primary"
                onClick={handleEditToggle}
                sx={{
                  fontWeight: "bold",
                  boxShadow: 2,
                  "&:hover": {
                    backgroundColor: "secondary.main",
                  },
                }}
              >
                Edit
              </Button>
            )}
            {IsAdmin && (
              <>
                <Button
                  variant="contained"
                  color="success"
                  onClick={handleApprove}
                  disabled={actionLoading.approve}
                  sx={{
                    fontWeight: "bold",
                    boxShadow: 2,
                    backgroundColor: (theme) => theme.palette.success.main,
                  }}
                >
                  {actionLoading.approve ? (
                    <CircularProgress size={24} />
                  ) : (
                    "Approve"
                  )}
                </Button>
                <Button
                  variant="contained"
                  color="error"
                  onClick={handleReject}
                  disabled={actionLoading.reject}
                  sx={{
                    fontWeight: "bold",
                    boxShadow: 2,
                  }}
                >
                  {actionLoading.reject ? (
                    <CircularProgress size={24} />
                  ) : (
                    "Reject"
                  )}
                </Button>
              </>
            )}
          </>
        ) : null}
      </Box>
    </Box>
  );
};

export default ViewOrUpdateLeavePage;
