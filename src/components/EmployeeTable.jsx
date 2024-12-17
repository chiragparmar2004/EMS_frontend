import { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Switch,
  Button,
  Pagination,
  Box,
  CircularProgress,
  Avatar,
  Typography,
} from "@mui/material";
import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";
import { format } from "date-fns";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchEmployees,
  updateEmployee,
} from "../store/slices/employee.slice.js";
import { useNavigate } from "react-router-dom";
import ConfirmationPopUp from "./ConfirmationPopUp.jsx";

const EmployeeTable = ({ filterQuery }) => {
  // console.log("🚀 ~ EmployeeTable ~ filterQuery:", filterQuery);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [confirmPopup, setConfirmPopup] = useState({
    open: false,
    employeeId: null,
    isActive: false,
  });

  // Pagination state
  const [page, setPage] = useState(1);
  // console.log("🚀 ~ EmployeeTable ~ page:", page);
  const [limit] = useState(6); // Employees per page
  const [totalPages, setTotalPages] = useState(1);
  // console.log("🚀 ~ EmployeeTable ~ totalPages:", totalPages);
  const [employees, setEmployees] = useState([]);
  // console.log("🚀 ~ EmployeeTable ~ employees:", employees);
  const { loading, error } = useSelector(
    (state) => state.employee.employeesActions.fetchAll
  );

  // Fetch employee data when page changes
  useEffect(() => {
    console.log("🚀 ~ EmployeeTable ~ filterQuery:");
    const loadEmployees = async () => {
      try {
        const response = await dispatch(
          fetchEmployees({ page, limit, ...filterQuery })
        ).unwrap();
        // console.log("🚀 ~ loadEmployees ~ response:", response);

        setEmployees(response.data); // Set employees for the current page
        setTotalPages(response.totalPages); // Set total pages
      } catch (err) {
        console.error("Error fetching employees:", err);
      }
    };

    loadEmployees();
  }, [dispatch, page, filterQuery]);

  const handleToggleStatus = (id, isActive) => {
    setConfirmPopup({ open: true, employeeId: id, isActive });
  };

  const confirmToggleStatus = async () => {
    const { employeeId, isActive } = confirmPopup;
    setConfirmPopup({ open: false, employeeId: null, isActive: false });

    const updatedEmployees = employees.map((employee) =>
      employee._id === employeeId
        ? { ...employee, isActive: !isActive }
        : employee
    );

    setEmployees(updatedEmployees);

    try {
      await dispatch(
        updateEmployee({ id: employeeId, isActive: !isActive })
      ).unwrap();
    } catch (error) {
      console.error("Error updating employee status:", error);
      setEmployees(employees);
    }
  };

  const handleViewEmployee = (id) => {
    navigate(`/view-update-employee/${id}`); // Redirect to the ViewOrUpdatePage with the employee ID
  };

  return (
    <>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell style={{ textAlign: "center" }}>Full Name</TableCell>
              <TableCell style={{ textAlign: "center" }}>Status</TableCell>
              <TableCell style={{ textAlign: "center" }}>Salary</TableCell>
              <TableCell style={{ textAlign: "center" }}>Position</TableCell>
              <TableCell style={{ textAlign: "center" }}>
                Date of Joining
              </TableCell>
              <TableCell style={{ textAlign: "center" }}>Phone No</TableCell>
              <TableCell align="center">Active</TableCell>
              <TableCell align="center">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {loading ? (
              // Loader row with height equivalent to 6 rows
              <TableRow>
                <TableCell colSpan={8} align="center">
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
            ) : employees.length > 0 ? (
              employees.map((employee) => (
                <TableRow key={employee._id}>
                  <TableCell style={{ textAlign: "center" }}>
                    <Box
                      display="flex"
                      alignItems="center"
                      justifyContent="start"
                    >
                      <Avatar
                        src={""}
                        alt={`${employee.firstName} ${employee.lastName}`}
                        style={{ marginRight: "8px" }}
                      >
                        {employee.firstName[0]} {employee.lastName[0]}
                      </Avatar>
                      <Typography variant="body2">
                        {employee.firstName} {employee.lastName}
                      </Typography>
                    </Box>
                  </TableCell>
                  <TableCell>
                    {employee.isActive ? (
                      <FiberManualRecordIcon color="success" fontSize="small" />
                    ) : (
                      <FiberManualRecordIcon color="error" fontSize="small" />
                    )}
                  </TableCell>
                  <TableCell>
                    {employee.salary ? employee.salary : " - "}
                  </TableCell>
                  <TableCell>{employee.position}</TableCell>
                  <TableCell>
                    {employee.dateOfJoining
                      ? format(new Date(employee.dateOfJoining), "dd-MM-yyyy")
                      : " - "}
                  </TableCell>
                  <TableCell>{employee.phoneNumber}</TableCell>
                  <TableCell align="center">
                    <Switch
                      checked={employee.isActive}
                      onChange={() =>
                        handleToggleStatus(employee._id, employee.isActive)
                      }
                      color="primary"
                    />
                  </TableCell>
                  <TableCell align="center">
                    <Button
                      variant="outlined"
                      color="primary"
                      onClick={() => handleViewEmployee(employee._id)}
                    >
                      View
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={8}
                  align="center"
                  sx={{
                    width: "100px",
                    height: "100%",
                  }}
                >
                  <img
                    src="/No data-amico.svg" // Replace with your image path
                    alt="No data available"
                    width="400"
                    height={400}
                    style={{ objectFit: "cover" }}
                  />
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Pagination */}
      <Box sx={{ display: "flex", justifyContent: "center", mt: 2 }}>
        <Pagination
          count={totalPages}
          page={page}
          onChange={(event, value) => setPage(value)}
          color="primary"
          variant="outlined"
          shape="rounded"
        />
      </Box>

      <ConfirmationPopUp
        open={confirmPopup.open}
        setOpen={(open) => setConfirmPopup({ ...confirmPopup, open })}
        title="Confirm Status Change"
        content={`Are you sure you want to ${
          confirmPopup.isActive ? "deactivate" : "activate"
        } this employee?`}
        onAgree={confirmToggleStatus}
        onDisagree={() =>
          setConfirmPopup({ open: false, employeeId: null, isActive: false })
        }
        type="warning"
      />
    </>
  );
};

export default EmployeeTable;
