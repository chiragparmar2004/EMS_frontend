import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import {
  deleteEmployee,
  fetchEmployeeById,
} from "../store/slices/employee.slice.js";
import {
  Button,
  Box,
  Typography,
  Dialog,
  DialogActions,
  DialogTitle,
  Divider,
  Grid,
  Container,
  CircularProgress,
  Paper,
} from "@mui/material";
import { format } from "date-fns";
import EmployeeForm from "../components/EmployeeForm";
import { showSnackbar } from "../store/slices/snackbar.slice.js";
import { resendVerificationEmail } from "../store/slices/user.slice.js";
import App from "../App.jsx";
import ConfirmationPopUp from "../components/ConfirmationPopUp.jsx";

const ViewOrUpdatePage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isEditing, setIsEditing] = useState(false);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [isResending, setIsResending] = useState(false);

  console.log("🚀 ~ ViewOrUpdatePage ~ id:", id);
  const handleResendEmail = async () => {
    setIsResending(true); // Set loading state to true
    try {
      const resultAction = await dispatch(resendVerificationEmail({ id }));

      if (resendVerificationEmail.fulfilled.match(resultAction)) {
        dispatch(
          showSnackbar({
            message: "Verification email sent successfully!",
            severity: "success",
          })
        );
      } else if (resendVerificationEmail.rejected.match(resultAction)) {
        dispatch(
          showSnackbar({
            message:
              resultAction.payload || "Failed to resend verification email.",
            severity: "error",
          })
        );
      }
    } catch (error) {
      console.error("Unexpected error during email resend:", error);
      dispatch(
        showSnackbar({
          message: "An unexpected error occurred. Please try again later.",
          severity: "error",
        })
      );
    } finally {
      setIsResending(false); // Reset loading state
    }
  };

  const handleBackClick = () => {
    navigate(-1);
  };

  const { data: employee, loading } = useSelector(
    (state) => state.employee.employeesActions.fetchById
  );
  console.log("🚀 ~ ViewOrUpdatePage ~ loading:", loading);

  useEffect(() => {
    dispatch(fetchEmployeeById(id));
  }, [dispatch, id]);

  const handleDelete = async () => {
    try {
      const resultAction = await dispatch(deleteEmployee(id));
      console.log("🚀 ~ handleDelete ~ resultAction:", resultAction);

      if (deleteEmployee.fulfilled.match(resultAction)) {
        dispatch(
          showSnackbar({
            message: "Employee deleted successfully!",
            severity: "success",
          })
        );
        navigate("/employees");
      } else if (deleteEmployee.rejected.match(resultAction)) {
        dispatch(
          showSnackbar({
            message: resultAction.payload || "Failed to delete employee.",
            severity: "error",
          })
        );
      }
    } catch (error) {
      console.error("Unexpected error during delete:", error);
      dispatch(
        showSnackbar({
          message: "An unexpected error occurred. Please try again later.",
          severity: "error",
        })
      );
    }
  };

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
  };

  if (loading) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", mt: 5 }}>
        <CircularProgress />
      </Box>
    );
  }

  if (!employee) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", mt: 5 }}>
        <Typography variant="h6">Employee not found</Typography>
      </Box>
    );
  }

  return (
    <Container maxWidth="md" overflow="auto">
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

      {isEditing ? (
        <EmployeeForm
          isEdit={true}
          setIsEditing={setIsEditing}
          initialData={employee}
          employeeId={id}
          onCancel={handleCancelEdit}
        />
      ) : (
        <Paper
          elevation={3}
          sx={{ mt: 3, p: 4, borderRadius: 3, boxShadow: 5 }}
        >
          <Box sx={{ mb: 3, display: "flex", justifyContent: "flex-end" }}>
            <Button
              variant="outlined"
              color="secondary"
              onClick={handleResendEmail}
              disabled={isResending}
              sx={{
                fontWeight: "bold",
                border: "1px solid", // Ensure the border remains visible
                "&.Mui-disabled": {
                  color: (theme) => theme.palette.text.primary,
                  borderColor: (theme) => theme.palette.text.secondary,
                },
              }}
            >
              {isResending ? "Sending..." : "Resend Verification Email"}
            </Button>
          </Box>

          {/* Section Title */}
          <Typography
            variant="h5"
            sx={{ mb: 3, textAlign: "center", fontWeight: "bold" }}
          >
            Employee Details
          </Typography>

          <Divider sx={{ mb: 3 }} />

          {/* Employee Information */}
          <Grid container spacing={2}>
            {[
              { label: "First Name", value: employee.firstName },
              { label: "Last Name", value: employee.lastName },
              { label: "Position", value: employee.position },
              { label: "Salary", value: employee.salary },
              {
                label: "Date of Joining",
                value: format(new Date(employee.dateOfJoining), "dd-MM-yyyy"),
              },
              { label: "Phone Number", value: employee.phoneNumber },
              { label: "Email", value: employee.email },
              { label: "Gender", value: employee.gender },
              { label: "Address", value: employee.address },
            ].map((detail, index) => (
              <Grid item xs={12} sm={6} key={detail.label}>
                <Typography
                  variant="body1"
                  sx={{ display: "flex", justifyContent: "space-between" }}
                >
                  <strong>{detail.label}:</strong> {detail.value}
                </Typography>
              </Grid>
            ))}
          </Grid>

          <Box sx={{ mt: 3, display: "flex", justifyContent: "space-between" }}>
            {/* Edit and Delete Buttons */}
            <Button
              variant="contained"
              color="primary"
              onClick={handleEditClick}
              sx={{
                width: "48%",
                color: (theme) => theme.palette.text.contrastText,
                fontWeight: "bold",
                borderRadius: 2,
              }}
            >
              Edit
            </Button>
            <Button
              variant="contained"
              color="error"
              onClick={() => setOpenDeleteDialog(true)}
              sx={{
                width: "48%",
                color: (theme) => theme.palette.text.contrastText,
                fontWeight: "bold",
                borderRadius: 2,
              }}
            >
              Delete
            </Button>
          </Box>
        </Paper>
      )}

      <ConfirmationPopUp
        open={openDeleteDialog}
        setOpen={setOpenDeleteDialog}
        title="Delete Employee"
        content="Are you sure you want to delete this employee? This action cannot be undone."
        type="error"
        onAgree={handleDelete}
        onDisagree={() => setOpenDeleteDialog(false)}
        agreeText="Delete"
        disagreeText="Cancel"
      />
    </Container>
  );
};

export default ViewOrUpdatePage;
