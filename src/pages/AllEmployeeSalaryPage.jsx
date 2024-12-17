import { useEffect, useState, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import debounce from "lodash.debounce";
import { useFormik } from "formik";
import * as Yup from "yup";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Avatar,
  Box,
  Typography,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Pagination,
  CircularProgress,
} from "@mui/material";
import { getAllEmployeesSalary } from "../store/slices/salary.slice";

const AllEmployeeSalaryPage = () => {
  const dispatch = useDispatch();

  // Redux state for salary data
  const { data, totalPages } = useSelector(
    (state) => state.salary.allSalary.data
  );
  const { loading, error } = useSelector((state) => state.salary.allSalary);

  // Local state for pagination
  const [page, setPage] = useState(1);

  // Formik form initialization with validation schema
  const formik = useFormik({
    initialValues: {
      name: "",
      presentDays: "",
      month: new Date().getMonth(),
      year: new Date().getFullYear(), // Default to current year
    },
    validationSchema: Yup.object({
      name: Yup.string().optional(),
      presentDays: Yup.number()
        .min(0, "Present days must be a positive number")
        .optional(),
      month: Yup.number()
        .min(1, "Month must be between 1 and 12")
        .max(12, "Month must be between 1 and 12")
        .required("Month is required"),
      year: Yup.number()
        .min(2000, "Year must be a valid year")
        .max(new Date().getFullYear(), "Year cannot be in the future")
        .required("Year is required"),
    }),
    // validateOnChange: true, // Enable validation on change
    validateOnBlur: true, // Enable validation on blur
    onSubmit: (values) => {
      fetchData(values);
    },
  });

  /**
   * Fetch data from the backend with filters and pagination
   */
  const fetchData = (updatedFilters = {}) => {
    const params = {
      ...updatedFilters,
      page,
      month: updatedFilters.month || formik.values.month,
    };
    console.log("🚀 ~ fetchData ~ params:", params);
    dispatch(getAllEmployeesSalary(params));
  };

  /**
   * Debounced filter handler using Lodash
   */
  const debouncedFetchData = useCallback(
    debounce(async (updatedFilters) => {
      setPage(1); // Reset to the first page on new filters
      fetchData(updatedFilters); // Call fetchData directly
    }, 500), // 500ms delay
    []
  );

  /**
   * Handle filter input changes
   */
  const handleInputChange = (e) => {
    const { name, value } = e.target;

    // Update formik state
    formik.setFieldValue(name, value);

    // Trigger debounced API call with updated values
    debouncedFetchData({
      ...formik.values,
      [name]: value, // Ensure the new value is included
    });
  };

  /**
   * Fetch data on page change
   */
  useEffect(() => {
    fetchData(formik.values);
  }, [page]);

  /**
   * Handle pagination change
   */
  const handlePageChange = (event, value) => {
    setPage(value);
  };

  /**
   * Render loading and error states
   */
  if (error) return <Box p={3}>Error: {error}</Box>;

  return (
    <Box p={3}>
      {/* Filter Form */}
      <form onSubmit={formik.handleSubmit}>
        <Paper sx={{ p: 2, mb: 3 }}>
          <Box
            display="flex"
            flexWrap="wrap"
            gap={2}
            justifyContent="space-between"
            alignItems="center"
          >
            <TextField
              label="Employee Name"
              name="name"
              placeholder="Enter employee name"
              value={formik.values.name}
              onChange={handleInputChange}
              onBlur={formik.handleBlur}
              variant="outlined"
              size="large"
              error={formik.touched.name && Boolean(formik.errors.name)}
              helperText={formik.touched.name && formik.errors.name}
            />
            <TextField
              label="Present Days"
              name="presentDays"
              placeholder="e.g., 20"
              type="number"
              value={formik.values.presentDays}
              onChange={handleInputChange}
              onBlur={formik.handleBlur}
              variant="outlined"
              size="large"
              error={
                formik.touched.presentDays && Boolean(formik.errors.presentDays)
              }
              helperText={
                formik.touched.presentDays && formik.errors.presentDays
              }
            />

            <FormControl variant="outlined" sx={{ minWidth: 130 }} size="large">
              <InputLabel>Month</InputLabel>
              <Select
                labelId="month-label"
                name="month"
                value={formik.values.month}
                onChange={handleInputChange}
                onBlur={formik.handleBlur}
                error={formik.touched.month && Boolean(formik.errors.month)}
              >
                {[
                  "January",
                  "February",
                  "March",
                  "April",
                  "May",
                  "June",
                  "July",
                  "August",
                  "September",
                  "October",
                  "November",
                  "December",
                ].map((month, index) => (
                  <MenuItem
                    key={index + 1}
                    value={index + 1}
                    sx={{ fontSize: "1.25rem" }}
                  >
                    {month}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            <TextField
              label="Year"
              name="year"
              placeholder="e.g., 2024"
              type="number"
              value={formik.values.year}
              onChange={handleInputChange}
              onBlur={formik.handleBlur}
              variant="outlined"
              size="large"
              error={formik.touched.year && Boolean(formik.errors.year)}
              helperText={formik.touched.year && formik.errors.year}
            />
          </Box>
        </Paper>
      </form>

      {/* Employee Salary Table */}
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Employee</TableCell>
              <TableCell>Total Working Days</TableCell>
              <TableCell>Present Days</TableCell>
              <TableCell>Official Holidays</TableCell>
              <TableCell>Total Salary</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {loading ? (
              <TableRow>
                <TableCell colSpan={6} align="center">
                  <Box
                    sx={{
                      height: 6 * 48, // Assuming row height is 48px, adjust if needed
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <CircularProgress />
                  </Box>
                </TableCell>
              </TableRow>
            ) : data?.length === 0 ? ( // Check if there is no data to show
              <TableRow>
                <TableCell colSpan={6} align="center">
                  <Typography>No data available</Typography>
                </TableCell>
              </TableRow>
            ) : (
              data?.map((employee) => (
                <TableRow key={employee.employeeId}>
                  <TableCell>
                    <Box display="flex" alignItems="center" gap={1}>
                      <Avatar>
                        {employee.fullName.split(" ")[0][0]}
                        {employee.fullName.split(" ")[1]?.[0]}
                      </Avatar>
                      <Typography>{employee.fullName}</Typography>
                    </Box>
                  </TableCell>
                  <TableCell>{employee.workingDays}</TableCell>
                  <TableCell>{employee.presentDays}</TableCell>
                  <TableCell>{employee.officialHoliday}</TableCell>
                  <TableCell>{employee.monthlySalary}</TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Pagination */}
      <Box display="flex" justifyContent="center" mt={2}>
        <Pagination
          count={totalPages || 1}
          page={page}
          onChange={handlePageChange}
          color="primary"
        />
      </Box>
    </Box>
  );
};

export default AllEmployeeSalaryPage;
