import { useEffect } from "react";
import {
  Container,
  Typography,
  TextField,
  Button,
  Box,
  Stack,
  RadioGroup,
  FormControlLabel,
  Radio,
  FormLabel,
  Paper,
  CircularProgress,
} from "@mui/material";
import Grid from "@mui/material/Grid2"; // Use Grid2 for better spacing and responsive layout
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useFormik } from "formik";
import * as Yup from "yup";
import { addEmployee, updateEmployee } from "../store/slices/employee.slice.js";
import { showSnackbar } from "../store/slices/snackbar.slice.js";

const EmployeeForm = ({ isEdit, setIsEditing, initialData, employeeId }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const loading = useSelector(
    (state) =>
      state.employee.employeesActions.create.loading ||
      state.employee.employeesActions.update.loading
  );
  const validationSchema = Yup.object({
    firstName: Yup.string().required("First name is required"),
    lastName: Yup.string().required("Last name is required"),
    position: Yup.string().required("Position is required"),
    salary: Yup.number()
      .required("Salary is required")
      .positive("Salary must be positive"),
    dateOfJoining: Yup.date().required("Date of joining is required"),
    address: Yup.string().required("Address is required"),
    phoneNumber: Yup.string()
      .matches(/^[0-9]+$/, "Must be only digits")
      .min(10, "Must be exactly 10 digits")
      .max(10, "Must be exactly 10 digits")
      .required("Phone number is required"),
    email: Yup.string()
      .email("Invalid email format")
      .required("Email is required"),
    gender: Yup.string().required("Gender is required"),
  });

  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      position: "",
      salary: "",
      dateOfJoining: "",
      address: "",
      phoneNumber: "",
      email: "",
      gender: "",
      isActive: true,
    },
    validationSchema,
    onSubmit: async (values) => {
      try {
        let resultAction;
        if (isEdit) {
          resultAction = await dispatch(
            updateEmployee({ ...values, id: employeeId })
          );
        } else {
          resultAction = await dispatch(addEmployee(values));
        }

        if (
          addEmployee.fulfilled.match(resultAction) ||
          updateEmployee.fulfilled.match(resultAction)
        ) {
          dispatch(
            showSnackbar({
              message: isEdit
                ? "Employee updated successfully!"
                : "Employee added successfully!",
              severity: "success",
            })
          );
          navigate("/employees");
        } else {
          dispatch(
            showSnackbar({
              message:
                resultAction.payload || "Operation failed. Please try again.",
              severity: "error",
            })
          );
        }
      } catch (error) {
        console.error("Unexpected error:", error);
        dispatch(
          showSnackbar({
            message: "Unexpected error occurred. Please try again.",
            severity: "error",
          })
        );
      }
    },
  });

  useEffect(() => {
    if (isEdit && initialData) {
      const formattedDate = initialData.dateOfJoining
        ? new Date(initialData.dateOfJoining).toISOString().split("T")[0]
        : "";

      formik.setValues({ ...initialData, dateOfJoining: formattedDate });
    }
  }, [isEdit, initialData]);

  return (
    <Container maxWidth="md">
      <Paper elevation={3} sx={{ p: 3, mt: 4, borderRadius: 2 }}>
        <Typography variant="h5" sx={{ mb: 3, textAlign: "center" }}>
          {isEdit ? "Edit Employee" : "Add New Employee"}
        </Typography>
        <Box component="form" onSubmit={formik.handleSubmit} sx={{ p: 2 }}>
          <Grid container spacing={2} display="flex" justifyContent="center">
            {/* Personal Information */}
            <Grid item size={{ xs: 12 }}>
              <Typography variant="h6">Personal Information</Typography>
            </Grid>
            <Grid item size={{ xs: 12, sm: 6 }}>
              <TextField
                label="First Name"
                name="firstName"
                value={formik.values.firstName}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                fullWidth
                error={
                  formik.touched.firstName && Boolean(formik.errors.firstName)
                }
                helperText={formik.touched.firstName && formik.errors.firstName}
              />
            </Grid>
            <Grid item size={{ xs: 12, sm: 6 }}>
              <TextField
                label="Last Name"
                name="lastName"
                value={formik.values.lastName}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                fullWidth
                error={
                  formik.touched.lastName && Boolean(formik.errors.lastName)
                }
                helperText={formik.touched.lastName && formik.errors.lastName}
              />
            </Grid>
            <Grid item size={{ xs: 12 }}>
              <FormLabel component="legend">Gender</FormLabel>
              <RadioGroup
                row
                name="gender"
                value={formik.values.gender}
                onChange={formik.handleChange}
              >
                <FormControlLabel
                  value="Male"
                  control={<Radio />}
                  label="Male"
                />
                <FormControlLabel
                  value="Female"
                  control={<Radio />}
                  label="Female"
                />
                <FormControlLabel
                  value="Other"
                  control={<Radio />}
                  label="Other"
                />
              </RadioGroup>
              {formik.touched.gender && formik.errors.gender && (
                <Typography variant="caption" color="error">
                  {formik.errors.gender}
                </Typography>
              )}
            </Grid>
            {/* Contact Information */}
            <Grid item size={{ xs: 12 }}>
              <Typography variant="h6">Contact Information</Typography>
            </Grid>
            <Grid item size={{ xs: 12, sm: 6 }}>
              <TextField
                label="Phone Number"
                name="phoneNumber"
                type="tel"
                value={formik.values.phoneNumber}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                fullWidth
                error={
                  formik.touched.phoneNumber &&
                  Boolean(formik.errors.phoneNumber)
                }
                helperText={
                  formik.touched.phoneNumber && formik.errors.phoneNumber
                }
              />
            </Grid>
            <Grid item size={{ xs: 12, sm: 6 }}>
              <TextField
                label="Email"
                name="email"
                type="email"
                value={formik.values.email}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                fullWidth
                error={formik.touched.email && Boolean(formik.errors.email)}
                helperText={formik.touched.email && formik.errors.email}
              />
            </Grid>
            {/* Job Information */}
            <Grid item size={{ xs: 12 }}>
              <Typography variant="h6">Job Information</Typography>
            </Grid>
            <Grid item size={{ xs: 12, sm: 6 }}>
              <TextField
                label="Position"
                name="position"
                value={formik.values.position}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                fullWidth
                error={
                  formik.touched.position && Boolean(formik.errors.position)
                }
                helperText={formik.touched.position && formik.errors.position}
              />
            </Grid>
            <Grid item size={{ xs: 12, sm: 6 }}>
              <TextField
                label="Salary"
                name="salary"
                type="number"
                value={formik.values.salary}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                fullWidth
                error={formik.touched.salary && Boolean(formik.errors.salary)}
                helperText={formik.touched.salary && formik.errors.salary}
              />
            </Grid>
            <Grid item size={{ xs: 12 }}>
              <TextField
                label="Date of Joining"
                name="dateOfJoining"
                type="date"
                InputLabelProps={{ shrink: true }}
                value={formik.values.dateOfJoining}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                fullWidth
                error={
                  formik.touched.dateOfJoining &&
                  Boolean(formik.errors.dateOfJoining)
                }
                helperText={
                  formik.touched.dateOfJoining && formik.errors.dateOfJoining
                }
              />
            </Grid>
            {/* Address */}
            <Grid item size={{ xs: 12 }}>
              <Typography variant="h6">Address</Typography>
              <TextField
                label="Address"
                name="address"
                value={formik.values.address}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                fullWidth
                multiline
                rows={3}
                error={formik.touched.address && Boolean(formik.errors.address)}
                helperText={formik.touched.address && formik.errors.address}
              />
            </Grid>
            {/* Buttons */}
            {isEdit && (
              <Grid item size={{ xs: 12, sm: 6 }}>
                <Button
                  variant="outlined"
                  onClick={() => setIsEditing((prev) => !prev)}
                  fullWidth
                >
                  Cancel
                </Button>
              </Grid>
            )}
            <Grid item size={{ xs: 12, sm: 6 }} sx={{ width: "100%" }}>
              <Button
                variant="contained"
                color="primary"
                type="submit"
                fullWidth
                disabled={loading}
                sx={{
                  color: (theme) => theme.palette.text.contrastText,
                  "&.Mui-disabled": {
                    backgroundColor: (theme) => theme.palette.primary.main,
                    color: (theme) => theme.palette.text.contrastText,
                  },
                }}
              >
                {loading ? (
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <CircularProgress size={24} color="inherit" />
                  </Box>
                ) : isEdit ? (
                  "Update Employee"
                ) : (
                  "Add Employee"
                )}{" "}
              </Button>
            </Grid>
          </Grid>
        </Box>
      </Paper>
    </Container>
  );
};

export default EmployeeForm;
