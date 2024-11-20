// import { useEffect, useState } from "react";
// import {
//   Container,
//   Typography,
//   Button,
//   Box,
//   CircularProgress,
// } from "@mui/material";
// import AddIcon from "@mui/icons-material/Add";
// import { useNavigate } from "react-router-dom"; // Import useNavigate for navigation
// import { useDispatch, useSelector } from "react-redux"; // Import Redux hooks
// import EmployeeTable from "../components/EmployeeTable";
// import { fetchEmployees } from "../store/slices/employee.slice.js"; // Import the fetchEmployees action

// const EmployeePage = () => {
//   const navigate = useNavigate();
//   const dispatch = useDispatch();
//   const {
//     data: employees,
//     loading,
//     error,
//   } = useSelector((state) => state.employee.employeesActions.fetchAll);

//   // const employee = useSelector((state) => state.employee.data);
//   // console.log("🚀 ~ EmployeePage ~ employee:", employee);
//   useEffect(() => {
//     dispatch(fetchEmployees());
//   }, [dispatch]);

//   if (loading) {
//     return (
//       <Container>
//         <Box sx={{ display: "flex", justifyContent: "center", mt: 5 }}>
//           <CircularProgress />
//         </Box>
//       </Container>
//     );
//   }

//   if (error) {
//     return (
//       <Container>
//         <Box sx={{ mt: 4 }}>
//           <Typography variant="h6" color="error">
//             Error: {error}
//           </Typography>
//         </Box>
//       </Container>
//     );
//   }

//   return (
//     <Container>
//       <Box
//         sx={{ mt: 4, mb: 2, display: "flex", justifyContent: "space-between" }}
//       >
//         <Typography variant="h4">Employees</Typography>
//         <Button
//           variant="contained"
//           color="primary"
//           startIcon={<AddIcon />}
//           onClick={() => navigate("/add-employee")}
//           sx={{ color: (theme) => theme.palette.text.contrastText }}
//         >
//           Add Employee
//         </Button>
//       </Box>
//       <EmployeeTable employees={employees} />
//     </Container>
//   );
// };

// export default EmployeePage;

import { useEffect, useState } from "react";
import {
  Container,
  Typography,
  Button,
  Box,
  CircularProgress,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { useNavigate } from "react-router-dom"; // Import useNavigate for navigation
import { useDispatch, useSelector } from "react-redux"; // Import Redux hooks
import EmployeeTable from "../components/EmployeeTable";
import {
  fetchEmployees,
  updateEmployee,
} from "../store/slices/employee.slice.js";

const EmployeePage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [employees, setEmployees] = useState([]);
  const { loading, error } = useSelector(
    (state) => state.employee.employeesActions.fetchAll
  );

  useEffect(() => {
    const loadEmployees = async () => {
      try {
        const response = await dispatch(fetchEmployees()).unwrap();
        setEmployees(response);
      } catch (err) {
        console.error("Error fetching employees:", err);
      }
    };

    loadEmployees();
  }, [dispatch]);

  const handleToggleStatus = async (id) => {
    const updatedEmployees = employees.map((employee) => {
      if (employee._id === id) {
        return { ...employee, isActive: !employee.isActive };
      }
      return employee;
    });

    // Optimistically update local state
    setEmployees(updatedEmployees);

    try {
      const toggledEmployee = updatedEmployees.find((emp) => emp._id === id);
      await dispatch(
        updateEmployee({ id, isActive: toggledEmployee.isActive })
      ).unwrap();
    } catch (error) {
      console.error("Error updating employee status:", error);
      // Revert state on failure
      setEmployees(employees);
    }
  };

  if (loading) {
    return (
      <Container>
        <Box sx={{ display: "flex", justifyContent: "center", mt: 5 }}>
          <CircularProgress />
        </Box>
      </Container>
    );
  }

  if (error) {
    return (
      <Container>
        <Box sx={{ mt: 4 }}>
          <Typography variant="h6" color="error">
            Error: {error}
          </Typography>
        </Box>
      </Container>
    );
  }

  return (
    <Container>
      <Box
        sx={{ mt: 4, mb: 2, display: "flex", justifyContent: "space-between" }}
      >
        <Typography variant="h4">Employees</Typography>
        <Button
          variant="contained"
          color="primary"
          startIcon={<AddIcon />}
          onClick={() => navigate("/add-employee")}
          sx={{ color: (theme) => theme.palette.text.contrastText }}
        >
          Add Employee
        </Button>
      </Box>
      <EmployeeTable
        employees={employees}
        onToggleStatus={handleToggleStatus}
      />
    </Container>
  );
};

export default EmployeePage;
