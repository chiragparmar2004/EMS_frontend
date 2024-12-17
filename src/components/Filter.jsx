import { useFormik } from "formik";
import * as Yup from "yup";
import {
  Box,
  TextField,
  Grid,
  Tooltip,
  IconButton,
  Typography,
} from "@mui/material";
import InfoIcon from "@mui/icons-material/Info";
import { LocalizationProvider, DateRangePicker } from "@mui/x-date-pickers-pro";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { useEffect, useCallback, useRef } from "react";
import debounce from "lodash/debounce";
import CustomSwitchComponent from "./CustomSwitchComponent";

const Filter = ({ onApplyFilters }) => {
  const isMounted = useRef(false);

  const formik = useFormik({
    initialValues: {
      fullName: "",
      isActive: null,
      salary: "",
      dateRange: [null, null],
    },
    validationSchema: Yup.object({
      fullName: Yup.string().trim().max(100, "Name is too long"),
      salary: Yup.number()
        .nullable()
        .positive("Salary must be a positive number")
        .typeError("Salary must be a number"),
      dateRange: Yup.array()
        .of(Yup.date().nullable().typeError("Invalid date format"))
        .test(
          "is-valid-range",
          "Start date must be before end date",
          ([startDate, endDate]) =>
            !startDate || !endDate || startDate <= endDate
        ),
    }),
    onSubmit: () => {}, // Handled via debounce
  });

  // Debounced handler for filter application
  const handleFiltersChange = useCallback(
    debounce((values) => {
      onApplyFilters(values);
    }, 500),
    [onApplyFilters]
  );

  // Watch form values and trigger debounce
  useEffect(() => {
    if (!isMounted.current) {
      // Skip logic on initial render
      isMounted.current = true;
      return;
    }
    handleFiltersChange(formik.values);
  }, [formik.values, handleFiltersChange]);

  return (
    <Box
      sx={{
        p: 2,
        borderRadius: 3,
        backgroundColor: (theme) => theme.palette.background.default,
        boxShadow: 3,
      }}
    >
      <form>
        <Grid container spacing={4}>
          {/* Full Name Filter */}
          <Grid item xs={12} md={6}>
            <Box display="flex" gap={2} alignItems="center">
              <TextField
                label="Full Name"
                variant="outlined"
                name="fullName"
                value={formik.values.fullName}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={
                  formik.touched.fullName && Boolean(formik.errors.fullName)
                }
                helperText={formik.touched.fullName && formik.errors.fullName}
                fullWidth
              />
              <Tooltip title="Filter employees by first name, last name, or full name">
                <IconButton>
                  <InfoIcon
                    sx={{ color: (theme) => theme.palette.text.primary }}
                  />
                </IconButton>
              </Tooltip>
            </Box>
          </Grid>

          {/* Salary Filter */}
          <Grid item xs={12} md={6}>
            <Box display="flex" gap={2} alignItems="center">
              <TextField
                label="Minimum Salary"
                variant="outlined"
                name="salary"
                type="number"
                value={formik.values.salary}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.salary && Boolean(formik.errors.salary)}
                helperText={formik.touched.salary && formik.errors.salary}
                fullWidth
              />
              <Tooltip title="Filter employees with a salary above the minimum amount">
                <IconButton>
                  <InfoIcon
                    sx={{ color: (theme) => theme.palette.text.primary }}
                  />
                </IconButton>
              </Tooltip>
            </Box>
          </Grid>

          {/* Date Range Filter */}
          <Grid item xs={12} md={6}>
            <Box display="flex" gap={2} alignItems="center">
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DateRangePicker
                  startText="Start Date"
                  endText="End Date"
                  value={formik.values.dateRange}
                  onChange={(newValue) =>
                    formik.setFieldValue("dateRange", newValue, true)
                  }
                  renderInput={(startProps, endProps) => (
                    <>
                      <TextField
                        {...startProps}
                        onBlur={formik.handleBlur}
                        error={
                          formik.touched.dateRange &&
                          Boolean(formik.errors.dateRange)
                        }
                        helperText={
                          formik.touched.dateRange && formik.errors.dateRange
                        }
                        fullWidth
                      />
                      <TextField
                        {...endProps}
                        onBlur={formik.handleBlur}
                        error={
                          formik.touched.dateRange &&
                          Boolean(formik.errors.dateRange)
                        }
                        fullWidth
                      />
                    </>
                  )}
                />
              </LocalizationProvider>
              <Tooltip title="Filter employees by selecting a date range for their joining date">
                <IconButton>
                  <InfoIcon
                    sx={{ color: (theme) => theme.palette.text.primary }}
                  />
                </IconButton>
              </Tooltip>
            </Box>
          </Grid>

          {/* Active Status */}
          <Grid item xs={12} md={6}>
            <Box
              display="flex"
              gap={1}
              alignItems="center"
              justifyContent="flex-end"
              sx={{
                padding: 1,
                borderRadius: 2,
                boxShadow: (theme) => theme.shadows[1],
              }}
            >
              <Typography
                variant="body1"
                sx={{
                  fontWeight: 500,
                  color: (theme) => theme.palette.text.primary,
                }}
              >
                Active Status
              </Typography>
              <CustomSwitchComponent
                checked={formik.values.isActive}
                onChange={() =>
                  formik.setFieldValue("isActive", !formik.values.isActive)
                }
                sx={{
                  "& .MuiSwitch-track": {
                    backgroundColor: (theme) =>
                      formik.values.isActive
                        ? theme.palette.success.light
                        : theme.palette.error.light,
                  },
                }}
              />
              <Tooltip title="Filter employee's by active or inactive status">
                <IconButton size="small">
                  <InfoIcon
                    sx={{ color: (theme) => theme.palette.text.secondary }}
                  />
                </IconButton>
              </Tooltip>
            </Box>
          </Grid>
        </Grid>
      </form>
    </Box>
  );
};

export default Filter;
