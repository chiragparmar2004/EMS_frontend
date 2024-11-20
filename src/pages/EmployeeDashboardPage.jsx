import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Box,
  Typography,
  Card,
  CardContent,
  Grid,
  CircularProgress,
} from "@mui/material";
import { fetchMonthlyStats } from "../store/slices/leave.slice";

const EmployeeDashboardPage = () => {
  const dispatch = useDispatch();

  // Get the data and loading state from Redux store
  const { data, loading, error } = useSelector(
    (state) => state.leave.leaveActions.fetchMonthlyStats
  );

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
    <Box sx={{ padding: 3 }}>
      <Typography variant="h4" fontWeight="bold" gutterBottom>
        Employee Dashboard
      </Typography>
      <Grid
        container
        spacing={3}
        justifyContent="center"
        alignItems="center"
        sx={{
          gap: 3, // Adds space between grid items
        }}
      >
        {/* Total Leave Card */}
        <Grid
          item
          sx={{
            width: "300px", // Fixed width
            height: "200px", // Fixed height
          }}
        >
          <Card
            sx={{
              borderRadius: 2,
              boxShadow: 2,
              backgroundColor: "#000e32",
              textAlign: "center",
              height: "100%",
            }}
          >
            <CardContent>
              <Typography variant="h3" color="textSecondary">
                Total Leaves
              </Typography>
              <Typography
                variant="h3"
                color="primary"
                fontWeight="bold"
                sx={{ textAlign: "center", marginTop: 2 }}
              >
                {data?.totalLeaves || 0}
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        {/* This Month's Leave Card */}
        <Grid
          item
          sx={{
            width: "300px", // Fixed width
            height: "200px", // Fixed height
          }}
        >
          <Card
            sx={{
              borderRadius: 2,
              boxShadow: 2,
              textAlign: "center",
              height: "100%",
            }}
          >
            <CardContent>
              <Typography variant="h6" color="textSecondary">
                This Month's Leaves
              </Typography>
              <Typography
                variant="h2"
                color="primary"
                fontWeight="bold"
                sx={{ textAlign: "center", marginTop: 2 }}
              >
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
