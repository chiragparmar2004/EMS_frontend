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
} from "@mui/material";
import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";
import { format } from "date-fns";
import { useNavigate } from "react-router-dom";

const EmployeeTable = ({ employees, onToggleStatus }) => {
  const navigate = useNavigate();

  const handleViewEmployee = (id) => {
    navigate(`/view-update-employee/${id}`); // Redirect to the ViewOrUpdatePage with the employee ID
  };

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Full Name</TableCell>
            <TableCell>Status</TableCell>
            <TableCell>Salary</TableCell>
            <TableCell>Position</TableCell>
            <TableCell>Date of Joining</TableCell>
            <TableCell>Phone No</TableCell>
            <TableCell align="center">Active</TableCell>
            <TableCell align="center">View Details</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {employees.map((employee) => (
            <TableRow key={employee._id}>
              <TableCell>{`${employee.firstName} ${employee.lastName}`}</TableCell>
              <TableCell>
                {employee.isActive ? (
                  <FiberManualRecordIcon color="success" fontSize="small" />
                ) : (
                  <FiberManualRecordIcon color="error" fontSize="small" />
                )}
              </TableCell>
              <TableCell>{employee.salary ? employee.salary : " - "}</TableCell>
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
                  onChange={() => onToggleStatus(employee._id)}
                  color="primary"
                />
              </TableCell>
              <TableCell align="center">
                <Button
                  variant="outlined"
                  color="primary"
                  onClick={() => handleViewEmployee(employee._id)}
                >
                  View Details
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default EmployeeTable;
