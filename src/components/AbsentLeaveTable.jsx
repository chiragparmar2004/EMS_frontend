import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAbsentEmployees } from "../store/slices/employee.slice";
import DashboardTable from "./DashboardTable";
import { Box } from "@mui/material";

const AbsentLeaveTable = () => {
  const dispatch = useDispatch();

  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  const absentEmployeesData = useSelector(
    (state) => state.employee.absentEmployees
  );
  const loading = useSelector((state) => state.employee.loading);

  const totalRecords = absentEmployeesData?.data?.totalLeaves || 0;
  const currentData = absentEmployeesData?.data?.data || [];

  // State to accumulate data across page loads
  const [accumulatedData, setAccumulatedData] = useState([]);

  useEffect(() => {
    // Reset accumulated data and page when component mounts or data changes
    setAccumulatedData([]);
    setPage(1);
    setHasMore(true);
  }, []);

  useEffect(() => {
    dispatch(fetchAbsentEmployees({ page, limit: 10 }));
  }, [dispatch, page]);

  useEffect(() => {
    if (currentData && currentData.length > 0) {
      // Append new data to accumulated data
      setAccumulatedData((prevData) => [...prevData, ...currentData]);

      // Check if we've loaded all available data
      if (accumulatedData.length + currentData.length >= totalRecords) {
        setHasMore(false);
      }
    }
  }, [currentData, totalRecords]);

  const fetchMoreData = () => {
    // Increment page to trigger next data fetch
    setPage((prevPage) => prevPage + 1);
  };

  const columns = [
    {
      field: "firstName",
      headerName: "Name",
      render: (value, row) => `${row.firstName} ${row.lastName}`,
    },
    { field: "position", headerName: "Department" },
  ];

  return (
    <Box sx={{ maxHeight: 400, minHeight: 400 }}>
      <DashboardTable
        data={accumulatedData}
        columns={columns}
        title={`Today Absent Employees: ${totalRecords}`}
        loading={loading}
        hasMore={hasMore}
        fetchMoreData={fetchMoreData}
      />
    </Box>
  );
};

export default AbsentLeaveTable;
