import React, { useState, useEffect } from "react";
import {
  TextField,
  MenuItem,
  Select,
  Button,
  Typography,
  Paper,
  FormHelperText,
  FormControl,
} from "@mui/material";
import Grid from "@mui/material/Grid2";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { fetchEmployees } from "../store/slices/employee.slice";
import {
  addLeaveAsAdmin,
  createLeave,
  updateLeave,
} from "../store/slices/leave.slice";
import { showSnackbar } from "../store/slices/snackbar.slice";
import { useNavigate } from "react-router-dom";

const LeaveForm = ({ isEdit = false, onCancel, initialData = {} }) => {
  const [users, setUsers] = useState([]);
  const [isAdmin, setIsAdmin] = useState(false);
  const dispatch = useDispatch();
  const currentUser = useSelector((state) => state.user.user.data);
  const navigate = useNavigate();

  console.log("🚀 ~ LeaveForm ~ initialData:", initialData);

  useEffect(() => {
    setIsAdmin(currentUser?.role === "admin");

    if (currentUser?.role === "admin") {
      const loadEmployees = async () => {
        try {
          const response = await dispatch(fetchEmployees()).unwrap();
          setUsers(response);
        } catch (err) {
          console.error("Error fetching employees:", err);
        }
      };

      loadEmployees();
    }
  }, [dispatch, currentUser]);

  // const formik = useFormik({
  //   initialValues: {
  //     userId: isAdmin ? initialData.userId || "" : currentUser?.id,
  //     leaveType: initialData.leaveType || "",
  //     startDate: initialData.startDate || "",
  //     endDate: initialData.endDate || "",
  //     reason: initialData.reason || "",
  //   },
  //   validationSchema: Yup.object({
  //     userId: Yup.string().when("isAdmin", {
  //       is: true,
  //       then: Yup.string().required("User is required."),
  //     }),
  //     leaveType: Yup.string().required("Leave type is required."),
  //     startDate: Yup.date().required("Start date is required."),
  //     endDate: Yup.date()
  //       .required("End date is required.")
  //       .min(Yup.ref("startDate"), "End date cannot be before start date."),
  //     reason: Yup.string()
  //       .max(200, "Reason cannot exceed 200 characters.")
  //       .required("Reason is required."),
  //   }),
  //   onSubmit: async (values) => {
  //     try {
  //       let resultAction = isAdmin
  //         ? await dispatch(addLeaveAsAdmin(values))
  //         : await dispatch(createLeave(values));

  //       if (
  //         (isAdmin && addLeaveAsAdmin.fulfilled.match(resultAction)) ||
  //         (!isAdmin && createLeave.fulfilled.match(resultAction))
  //       ) {
  //         dispatch(
  //           showSnackbar({
  //             message: isEdit
  //               ? "Leave updated successfully!"
  //               : "Leave submitted successfully!",
  //             severity: "success",
  //           })
  //         );
  //         formik.resetForm();
  //         navigate("/leaves");
  //       } else {
  //         dispatch(
  //           showSnackbar({
  //             message: "Failed to submit the leave. Please try again.",
  //             severity: "error",
  //           })
  //         );
  //       }
  //     } catch (error) {
  //       console.error("Error during leave submission:", error);
  //       dispatch(
  //         showSnackbar({
  //           message: "An unexpected error occurred. Please try again.",
  //           severity: "error",
  //         })
  //       );
  //     }
  //   },
  // });
  const formik = useFormik({
    initialValues: {
      userId: isAdmin ? initialData.userId || "" : currentUser?.id,
      leaveType: initialData.leaveType || "",
      startDate: initialData.startDate || "",
      endDate: initialData.endDate || "",
      reason: initialData.reason || "",
    },
    validationSchema: Yup.object({
      userId: Yup.string().when("isAdmin", {
        is: true,
        then: Yup.string().required("User is required."),
      }),
      leaveType: Yup.string().required("Leave type is required."),
      startDate: Yup.date().required("Start date is required."),
      endDate: Yup.date()
        .required("End date is required.")
        .min(Yup.ref("startDate"), "End date cannot be before start date."),
      reason: Yup.string()
        .max(200, "Reason cannot exceed 200 characters.")
        .required("Reason is required."),
    }),
    onSubmit: async (values) => {
      try {
        let resultAction;

        if (isEdit) {
          resultAction = await dispatch(
            updateLeave({ leaveId: initialData._id, leaveData: values })
          );
        } else {
          if (isAdmin) {
            resultAction = await dispatch(addLeaveAsAdmin(values));
          } else {
            resultAction = await dispatch(createLeave(values));
          }
        }

        if (
          (isEdit && updateLeave.fulfilled.match(resultAction)) ||
          (isAdmin && addLeaveAsAdmin.fulfilled.match(resultAction)) ||
          (!isAdmin && createLeave.fulfilled.match(resultAction))
        ) {
          dispatch(
            showSnackbar({
              message: isEdit
                ? "Leave updated successfully!"
                : "Leave submitted successfully!",
              severity: "success",
            })
          );
          formik.resetForm();
          navigate("/leaves");
        } else {
          dispatch(
            showSnackbar({
              message: "Failed to submit the leave. Please try again.",
              severity: "error",
            })
          );
        }
      } catch (error) {
        console.error("Error during leave submission:", error);
        dispatch(
          showSnackbar({
            message: "An unexpected error occurred. Please try again.",
            severity: "error",
          })
        );
      }
    },
  });

  return (
    <div
      style={{
        padding: "20px",
        marginTop: "2%",
        width: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Typography variant="h4" gutterBottom sx={{ textAlign: "center" }}>
        {isEdit ? "Edit Leave Request" : "Submit Leave Request"}
      </Typography>
      <Paper style={{ padding: "20px", maxWidth: "600px" }}>
        <form onSubmit={formik.handleSubmit}>
          <Grid container spacing={3}>
            {isAdmin && !isEdit && (
              <Grid item size={{ xs: 12 }}>
                <FormControl
                  fullWidth
                  error={formik.touched.userId && Boolean(formik.errors.userId)}
                >
                  <Select
                    value={formik.values.userId}
                    name="userId"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    displayEmpty
                  >
                    <MenuItem value="" disabled>
                      Select User
                    </MenuItem>
                    {users.map((user) => (
                      <MenuItem key={user._id} value={user._id}>
                        {user.firstName} {user.lastName}
                      </MenuItem>
                    ))}
                  </Select>
                  {formik.touched.userId && formik.errors.userId && (
                    <FormHelperText>{formik.errors.userId}</FormHelperText>
                  )}
                </FormControl>
              </Grid>
            )}

            <Grid item size={{ xs: 12 }}>
              <FormControl
                fullWidth
                error={
                  formik.touched.leaveType && Boolean(formik.errors.leaveType)
                }
              >
                <Select
                  value={formik.values.leaveType}
                  name="leaveType"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  displayEmpty
                >
                  <MenuItem value="" disabled>
                    Select Leave Type
                  </MenuItem>
                  <MenuItem value="Sick">Sick</MenuItem>
                  <MenuItem value="Casual">Casual</MenuItem>
                  <MenuItem value="Maternity">Maternity</MenuItem>
                  <MenuItem value="Other">Other</MenuItem>
                </Select>
                {formik.touched.leaveType && formik.errors.leaveType && (
                  <FormHelperText>{formik.errors.leaveType}</FormHelperText>
                )}
              </FormControl>
            </Grid>
            <Grid item size={{ xs: 12 }}>
              <TextField
                fullWidth
                type="date"
                label="Start Date"
                InputLabelProps={{ shrink: true }}
                name="startDate"
                value={formik.values.startDate}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={
                  formik.touched.startDate && Boolean(formik.errors.startDate)
                }
                helperText={formik.touched.startDate && formik.errors.startDate}
              />
            </Grid>
            <Grid item size={{ xs: 12 }}>
              <TextField
                fullWidth
                type="date"
                label="End Date"
                InputLabelProps={{ shrink: true }}
                name="endDate"
                value={formik.values.endDate}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.endDate && Boolean(formik.errors.endDate)}
                helperText={formik.touched.endDate && formik.errors.endDate}
              />
            </Grid>
            <Grid item size={{ xs: 12 }}>
              <TextField
                fullWidth
                label="Reason"
                name="reason"
                value={formik.values.reason}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.reason && Boolean(formik.errors.reason)}
                helperText={formik.touched.reason && formik.errors.reason}
                multiline
                rows={3}
              />
            </Grid>
            <Grid item size={{ xs: 12 }}>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                fullWidth
                disabled={formik.isSubmitting}
              >
                {isEdit ? "Save Changes" : "Submit"}
              </Button>
              {isEdit && (
                <Button
                  type="button"
                  variant="outlined"
                  color="secondary"
                  fullWidth
                  onClick={onCancel}
                  style={{ marginTop: "10px" }}
                >
                  Cancel
                </Button>
              )}
            </Grid>
          </Grid>
        </form>
      </Paper>
    </div>
  );
};

export default LeaveForm;
