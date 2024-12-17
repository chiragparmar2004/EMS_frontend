import * as React from "react";
import { LineChart } from "@mui/x-charts/LineChart";
import { useTheme } from "@mui/material/styles";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { fetchAbsentEmployeesLast7Days } from "../store/slices/employee.slice";

export default function TestingChart() {
  const theme = useTheme(); // Access the MUI theme
  const dispatch = useDispatch();
  const { data, loading, error } = useSelector(
    (state) => state.employee.absentEmployeesLast7Days
  );
  console.log("🚀 ~ TestingChart ~ data:", data);

  useEffect(() => {
    dispatch(fetchAbsentEmployeesLast7Days());
  }, [dispatch]);

  // Map the received absentData to the chart's format
  const xLabels = data?.map((item) => item.date); // Extract the dates for the X-axis
  const pData = data?.map((item) => item.count); // Extract the count of absent employees for the Y-axis

  // Fallback data if data is still loading or error occurs
  const loadingData = Array(7).fill(0); // Placeholder data for loading state
  const xLabelsFallback = Array(7).fill("Loading...");

  return (
    <LineChart
      width={450}
      height={400}
      series={[
        {
          data: pData || loadingData, // Use absent data or loading data
          label: "Absent Employees",
          color: theme.palette.primary.main, // Use primary color for the line
        },
      ]}
      xAxis={[
        {
          scaleType: "point",
          data: xLabels || xLabelsFallback, // Use actual dates or fallback labels
          tick: {
            stroke: theme.palette.text.secondary, // Axis label color
          },
          grid: {
            stroke: theme.palette.divider, // Grid line color
          },
        },
      ]}
      yAxis={[
        {
          grid: {
            stroke: theme.palette.divider, // Y-axis grid line color
          },
          tick: {
            stroke: theme.palette.text.secondary, // Y-axis tick color
          },
        },
      ]}
    />
  );
}
