import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchLeaveByStatus } from "../store/slices/leave.slice";
import DashboardTable from "./DashboardTable";
import { format } from "date-fns";
import { Dialog, DialogContent, IconButton, Button } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import ViewOrUpdateLeavePage from "../pages/ViewOrUpdateLeavePage";
import PreviewIcon from "@mui/icons-material/Preview";
import { io } from "socket.io-client";
// Initialize Socket.IO client

const socket = io("http://localhost:8000");

const PendingLeaveTable = ({ setEmployeeStats }) => {
  const dispatch = useDispatch();

  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedLeaveId, setSelectedLeaveId] = useState(null);
  const [render, setRender] = useState(false);
  const pendingLeavesData = useSelector(
    (state) => state.leave.leaveActions.fetchPendingLeaves
  );
  console.log("🚀 ~ PendingLeaveTable ~ pendingLeavesData:", pendingLeavesData);

  const loading = useSelector((state) => state.leave.loading);

  const totalRecords = pendingLeavesData?.data?.totalLeaves || 0;
  const currentData = pendingLeavesData?.data?.leaves || [];
  console.log("🚀 ~ PendingLeaveTable ~ currentData:", currentData);
  const [accumulatedData, setAccumulatedData] = useState([]);

  useEffect(() => {
    // Reset accumulated data and page when component mounts or render changes
    setAccumulatedData([]);
    setPage(1);
    setHasMore(true);
  }, [render]);
  const fetchData = async () => {
    console.log("function called");
    dispatch(
      fetchLeaveByStatus({
        status: "Pending",
        page,
        limit: 10,
      })
    );
  };
  useEffect(() => {
    fetchData();
  }, [dispatch, page, render]);

  useEffect(() => {
    if (currentData && currentData.length > 0) {
      // Append new data to accumulated data
      setAccumulatedData((prevData) => [...prevData, ...currentData]);

      // Check if we've loaded all available data
      if (accumulatedData.length + currentData.length >= totalRecords) {
        setHasMore(false);
      }
    }

    // Update employee stats with total records
    setEmployeeStats((prev) => ({ ...prev, pendingLeaves: totalRecords }));
  }, [currentData, totalRecords]);

  const fetchMoreData = () => {
    // Increment page to trigger next data fetch
    setPage((prevPage) => prevPage + 1);
  };

  const handleOpenDialog = (leaveId) => {
    setSelectedLeaveId(leaveId);
    setIsDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setIsDialogOpen(false);
    setSelectedLeaveId(null);
    setRender((prev) => !prev);
  };

  useEffect(() => {
    // Listen to the leaveAdded event
    socket.on("leaveAdded", (updatedLeave) => {
      console.log("Real-time update received:", updatedLeave);

      fetchData();

      setAccumulatedData(currentData);
    });

    // Clean up the socket connection
    return () => {
      socket.off("leaveAdded");
    };
  }, []);

  const columns = [
    {
      field: "employeeName",
      headerName: "Employee Name",
      render: (value, row) => `${row.user.firstName} ${row.user.lastName}`,
    },
    {
      field: "department",
      headerName: "Department",
      render: (value, row) => `${row.user.position}`,
    },
    { field: "leaveType", headerName: "Leave Type" },
    {
      field: "startDate",
      headerName: "Start Date",
      render: (value) =>
        value ? format(new Date(value), "dd/MM/yyyy") : "N/A",
    },
    {
      field: "endDate",
      headerName: "End Date",
      render: (value) =>
        value ? format(new Date(value), "dd/MM/yyyy") : "N/A",
    },
    {
      field: "actions",
      headerName: "Actions",
      render: (value, row) => (
        <Button
          variant="text"
          color="secondary"
          size="small"
          onClick={() => handleOpenDialog(row._id)}
          // sx={{
          //   textTransform: "none",
          //   fontWeight: "bold",
          //   borderRadius: 2,
          //   boxShadow: 2,
          // }}
        >
          <PreviewIcon />
        </Button>
      ),
    },
  ];

  return (
    <>
      <DashboardTable
        data={accumulatedData}
        columns={columns}
        title={`Pending Leaves: ${totalRecords}`}
        loading={loading}
        hasMore={hasMore}
        fetchMoreData={fetchMoreData}
      />

      {/* Dialog for Leave Details */}
      <Dialog
        open={isDialogOpen}
        onClose={handleCloseDialog}
        fullWidth
        sx={{
          "& .MuiPaper-root": {
            backgroundColor: "background.default",
            color: "text.primary",
            borderRadius: 3,
            boxShadow: 4,
          },
        }}
      >
        <IconButton
          onClick={handleCloseDialog}
          aria-label="close"
          sx={{
            position: "absolute",
            top: 8,
            right: 8,
            zIndex: 1300,
            scale: 1.25,
            color: "text.primary",
          }}
        >
          <CloseIcon />
        </IconButton>
        <DialogContent
          sx={{
            padding: 3,
            backgroundColor: "background.paper",
          }}
        >
          {selectedLeaveId && (
            <ViewOrUpdateLeavePage
              leaveId={selectedLeaveId}
              handleCloseDialog={handleCloseDialog}
            />
          )}
        </DialogContent>
      </Dialog>
    </>
  );
};

export default PendingLeaveTable;
