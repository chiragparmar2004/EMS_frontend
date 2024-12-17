import { useState, useEffect } from "react";
import {
  TextField,
  MenuItem,
  Select,
  Button,
  Typography,
  FormHelperText,
  FormControl,
  CircularProgress,
  Box,
} from "@mui/material";
import Grid from "@mui/material/Grid2";
import { Autocomplete } from "@mui/material";
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
  console.log("🚀 ~ LeaveForm ~ users:", users);

  const chirag = useSelector((state) => state.leave.leaves.data);
  console.log("🚀 ~ LeaveForm ~ chirag:", chirag);
  const dispatch = useDispatch();
  const currentUser = useSelector((state) => state.user.user.data);
  const navigate = useNavigate();
  const isAdmin = currentUser?.role === "admin";
  console.log("🚀 ~ LeaveForm ~ initialData:", initialData);

  useEffect(() => {
    if (currentUser?.role === "admin") {
      const loadEmployees = async () => {
        try {
          const response = await dispatch(
            fetchEmployees({ page: 1, limit: 0 })
          ).unwrap();
          console.log("🚀 ~ loadEmployees ~ response:", response.data);
          setUsers(response.data);
        } catch (err) {
          console.error("Error fetching employees:", err);
        }
      };

      loadEmployees();
    }
  }, [dispatch, currentUser]);
  useEffect(() => {
    if (isEdit && initialData) {
      const formattedStartDate = initialData.startDate
        ? new Date(initialData.startDate).toISOString().split("T")[0]
        : "";

      const formattedEndDate = initialData.endDate
        ? new Date(initialData.endDate).toISOString().split("T")[0]
        : "";

      formik.setValues({
        ...initialData,
        startDate: formattedStartDate,
        endDate: formattedEndDate,
      });

      console.log("Formatted Dates:", { formattedStartDate, formattedEndDate });
    }
  }, [isEdit, initialData]);

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
      startDate: Yup.date()
        .required("Start date is required.")
        .min(new Date(), "Start date cannot be before today."),
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
          onCancel();
          navigate("/leaves");
        } else {
          dispatch(
            showSnackbar({
              message:
                resultAction.payload ||
                "Failed to submit the leave. Please try again.",
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
      console.log("🚀 ~ onSubmit: ~ isEdit:", isEdit);
    },
  });

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Typography
        variant="h4"
        gutterBottom
        sx={{
          textAlign: "center",
          color: (theme) => theme.palette.text.main,
          marginBottom: 2,
        }}
      >
        {isEdit ? "Edit Leave Request" : "Submit Leave Request"}
      </Typography>
      <form onSubmit={formik.handleSubmit}>
        <Grid container spacing={2} display="flex" justifyContent="center">
          {isAdmin && !isEdit && (
            <Grid item xs={12} sx={{ width: "100%", rounded: "2px" }}>
              <FormControl
                fullWidth
                error={formik.touched.userId && Boolean(formik.errors.userId)}
              >
                <Autocomplete
                  options={users}
                  getOptionLabel={(user) =>
                    `${user.firstName} ${user.lastName}`
                  }
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="Select User"
                      error={
                        formik.touched.userId && Boolean(formik.errors.userId)
                      }
                      helperText={formik.touched.userId && formik.errors.userId}
                    />
                  )}
                  value={
                    users.find((user) => user._id === formik.values.userId) ||
                    null
                  }
                  onChange={(event, value) => {
                    formik.setFieldValue("userId", value ? value._id : "");
                  }}
                  isOptionEqualToValue={(option, value) =>
                    option._id === value._id
                  }
                />
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
          <Grid container item size={{ xs: 12 }} spacing={2}>
            {isEdit && (
              <Grid item size={{ xs: 6 }}>
                <Button
                  type="button"
                  variant="outlined"
                  color="secondary"
                  onClick={onCancel}
                  fullWidth
                >
                  Cancel
                </Button>
              </Grid>
            )}
            <Grid item size={{ xs: 6 }}>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                disabled={formik.isSubmitting}
                fullWidth
                sx={{
                  "&.Mui-disabled": {
                    backgroundColor: (theme) => theme.palette.primary.main,
                    color: (theme) => theme.palette.text.contrastText,
                  },
                  color: (theme) => theme.palette.text.contrastText,
                }}
              >
                {formik.isSubmitting ? (
                  <CircularProgress
                    size={24}
                    sx={{
                      color: (theme) => theme.palette.text.contrastText,
                    }}
                  />
                ) : isEdit ? (
                  "Save Changes"
                ) : (
                  "Submit"
                )}
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </form>
      {/* </Paper> */}
    </Box>
  );
};

export default LeaveForm;
