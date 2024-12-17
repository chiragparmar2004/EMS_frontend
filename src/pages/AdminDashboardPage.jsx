import { Card, Container, Typography, Box } from "@mui/material";
import Grid from "@mui/material/Grid2";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchEmployeeStats } from "../store/slices/employee.slice";
import { useTheme } from "@mui/material/styles";

import AbsentLeaveTable from "../components/AbsentLeaveTable";
import Loader from "../components/Loader";
import PendingLeaveTable from "../components/PendingLeavesTable";
import TestingChart from "../components/TestingChart";

const AdminDashboardPage = () => {
  const [EmployeeStats, setEmployeeStats] = useState({
    totalEmployees: 0,
    activeEmployees: 0,
    pendingLeaves: 0,
  });
  const dispatch = useDispatch();
  const leave2 = useSelector((state) => state.leave);
  console.log("🚀 ~ AdminDashboardPage ~ leave2:", leave2);

  const employeeStats = useSelector((state) => state.employee.employeeStats);

  const loading = employeeStats.loading;

  useEffect(() => {
    dispatch(fetchEmployeeStats());
  }, [dispatch]);

  const theme = useTheme();

  if (loading) {
    return <Loader />;
  }

  return (
    <Container sx={{ width: "100%" }}>
      {/* Header Cards */}
      <Grid container spacing={1} justifyContent="space-between" mb={4}>
        {/* Total Employees */}
        <Grid item xs={12} sm={4}>
          <Card
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              textAlign: "center",
              p: 3,
              background: theme.palette.background.paper,
              boxShadow: "0px 4px 10px rgba(0,0,0,0.3)",
              borderRadius: 3,
            }}
          >
            <Typography
              variant="h6"
              gutterBottom
              color={theme.palette.text.secondary}
            >
              Total Employees
            </Typography>
            <Typography variant="h4" color="primary">
              {employeeStats?.data?.totalEmployees || 0}
            </Typography>
          </Card>
        </Grid>

        {/* Active Members */}
        <Grid item xs={12} sm={4}>
          <Card
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              textAlign: "center",
              p: 3,
              background: theme.palette.background.paper,
              boxShadow: "0px 4px 10px rgba(0,0,0,0.3)",
              borderRadius: 3,
            }}
          >
            <Typography
              variant="h6"
              gutterBottom
              color={theme.palette.text.secondary}
            >
              Active Members
            </Typography>
            <Typography variant="h4" color="primary">
              {employeeStats?.data?.activeEmployees || 0}
            </Typography>
          </Card>
        </Grid>

        {/* Pending Leaves */}
        <Grid item xs={12} sm={4}>
          <Card
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              textAlign: "center",
              p: 3,
              background: theme.palette.background.paper,
              boxShadow: "0px 4px 10px rgba(0,0,0,0.3)",
              borderRadius: 3,
            }}
          >
            <Typography
              variant="h6"
              gutterBottom
              color={theme.palette.text.secondary}
            >
              Pending Leaves
            </Typography>
            <Typography variant="h4" color="primary">
              {EmployeeStats?.pendingLeaves || 0}
            </Typography>
          </Card>
        </Grid>

        {/* Active Members */}
        <Grid item xs={12} sm={4}>
          <Card
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              textAlign: "center",
              p: 3,
              background: theme.palette.background.paper,
              boxShadow: "0px 4px 10px rgba(0,0,0,0.3)",
              borderRadius: 3,
            }}
          >
            <Typography
              variant="h6"
              gutterBottom
              color={theme.palette.text.secondary}
            >
              Active Members
            </Typography>
            <Typography variant="h4" color="primary">
              {employeeStats?.data?.activeEmployees || 0}
            </Typography>
          </Card>
        </Grid>

        {/* Pending Leaves */}
        <Grid item xs={12} sm={4}>
          <Card
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              textAlign: "center",
              p: 3,
              background: theme.palette.background.paper,
              boxShadow: "0px 4px 10px rgba(0,0,0,0.3)",
              borderRadius: 3,
            }}
          >
            <Typography
              variant="h6"
              gutterBottom
              color={theme.palette.text.secondary}
            >
              Pending Leaves
            </Typography>
            <Typography variant="h4" color="primary">
              {EmployeeStats?.pendingLeaves || 0}
            </Typography>
          </Card>
        </Grid>
        <Grid item xs={12} sm={4}>
          <Card
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              textAlign: "center",
              p: 3,
              background: theme.palette.background.paper,
              boxShadow: "0px 4px 10px rgba(0,0,0,0.3)",
              borderRadius: 3,
            }}
          >
            <Typography
              variant="h6"
              gutterBottom
              color={theme.palette.text.secondary}
            >
              Pending Leaves
            </Typography>
            <Typography variant="h4" color="primary">
              {EmployeeStats?.pendingLeaves || 0}
            </Typography>
          </Card>
        </Grid>
      </Grid>

      {/* Tables Section */}
      <Box mt={4}>
        <Grid container spacing={1}>
          {/* Absent Employees Table */}
          <Grid item size={{ xs: 12, md: 6 }}>
            <Card
              sx={{
                background: theme.palette.background.paper,
                boxShadow: "0px 4px 10px rgba(0,0,0,0.3)",
                borderRadius: 3,
              }}
            >
              <AbsentLeaveTable />
            </Card>
          </Grid>

          {/* Pending Leaves Table / Chart */}
          <Grid item size={{ xs: 12, md: 6 }}>
            {" "}
            <Card
              sx={{
                p: 2,
                background: theme.palette.background.paper,
                boxShadow: "0px 4px 10px rgba(0,0,0,0.3)",
                borderRadius: 3,
              }}
            >
              <TestingChart />
            </Card>
          </Grid>
        </Grid>
      </Box>

      <Box mt={4}>
        <Grid container spacing={3}>
          <Grid item xs={12} sx={{ width: "100%" }}>
            <Card
              sx={{
                background: theme.palette.background.paper,
                boxShadow: "0px 4px 10px rgba(0,0,0,0.3)",
                borderRadius: 3,
                width: "100%",
              }}
            >
              <PendingLeaveTable setEmployeeStats={setEmployeeStats} />
            </Card>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
};

export default AdminDashboardPage;
