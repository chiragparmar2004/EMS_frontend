import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Box,
  Typography,
  Card,
  CardContent,
  CircularProgress,
} from "@mui/material";
import Grid from "@mui/material/Grid2"; // Grid v2

import { fetchMonthlyStats } from "../store/slices/leave.slice";

const EmployeeDashboardPage = () => {
  const dispatch = useDispatch();

  // Get the data and loading state from Redux store
  const { data, loading, error } = useSelector(
    (state) => state.leave.leaveActions.fetchMonthlyStats
  );
  console.log("🚀 ~ EmployeeDashboardPage ~ data:", data);

  useEffect(() => {
    dispatch(fetchMonthlyStats());
  }, [dispatch]);

  // Loading State
  if (loading) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        height="100vh"
      >
        <CircularProgress />
      </Box>
    );
  }

  // Error State
  if (error) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        height="100vh"
        textAlign="center"
      >
        <Typography variant="h6" color="error">
          Oops! Something went wrong. <br />
          {error}
        </Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ flexGrow: 1, padding: 3 }}>
      <Typography variant="h4" fontWeight="bold" gutterBottom>
        Employee Dashboard
      </Typography>

      <Grid container spacing={2} justifyContent="start">
        {/* Total Leaves Card */}
        <Grid item xs={12} sm={6} md={4}>
          <Card
            sx={{
              display: "flex",
              flexDirection: "column",
              textAlign: "center",
              p: 3,
              width: 250,
              background: (theme) => theme.palette.background.paper,
            }}
          >
            <CardContent>
              <Typography variant="h6" gutterBottom>
                This month total Leaves
              </Typography>
              <Typography variant="h4" color="primary">
                {data?.totalLeaves || 0}
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        {/* Approved Leaves Card */}
        <Grid item xs={12} sm={6} md={4}>
          <Card
            sx={{
              display: "flex",
              flexDirection: "column",
              p: 3,
              width: 250,
              textAlign: "center",
              background: (theme) => theme.palette.background.paper,
            }}
          >
            <CardContent>
              <Typography variant="h6" gutterBottom>
                This month Approved Leaves
              </Typography>
              <Typography variant="h4" color="primary">
                {data?.approvedLeaves || 0}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default EmployeeDashboardPage;
