// import React, { useState, useEffect } from "react";
// import {
//   Table,
//   TableBody,
//   TableCell,
//   TableContainer,
//   TableHead,
//   TableRow,
//   Paper,
//   Button,
//   Box,
//   Pagination,
//   CircularProgress,
//   Dialog,
//   DialogContent,
//   IconButton,
//   Avatar,
//   Typography,
//   DialogTitle,
// } from "@mui/material";
// import { useDispatch, useSelector } from "react-redux";
// import { fetchLeaveByStatus } from "../store/slices/leave.slice";
// import { format } from "date-fns";
// import CloseIcon from "@mui/icons-material/Close";

// import ViewOrUpdateLeavePage from "../pages/ViewOrUpdateLeavePage";

// const LeaveTable = ({ filterStatus, rowsPerPage }) => {
//   const dispatch = useDispatch();

//   const data = useSelector((state) => state.leave.leaves.data);
//   console.log("🚀 ~ LeaveTable ~ data:", data);

//   const { loading, error } = useSelector(
//     (state) => state.leave.leaveActions.fetchLeaveByStatus
//   );

//   const [currentPage, setCurrentPage] = useState(1);

//   // Dialog state
//   const [selectedLeaveId, setSelectedLeaveId] = useState(null);
//   const [isDialogOpen, setDialogOpen] = useState(false);

//   // Fetch data whenever `currentPage` or `filterStatus` changes
//   useEffect(() => {
//     dispatch(
//       fetchLeaveByStatus({
//         status: filterStatus === "All" ? undefined : filterStatus,
//         page: currentPage,
//         limit: rowsPerPage,
//       })
//     );
//   }, [dispatch, filterStatus, currentPage, rowsPerPage]);

//   const handlePageChange = (event, value) => {
//     setCurrentPage(value);
//   };

//   const handleViewDetails = (id) => {
//     setSelectedLeaveId(id);
//     setDialogOpen(true);
//   };

//   const handleCloseDialog = () => {
//     setDialogOpen(false);
//     setSelectedLeaveId(null);
//   };

//   return (
//     <Box>
//       {/* Table Header */}
//       <TableContainer component={Paper}>
//         <Table>
//           <TableHead>
//             <TableRow>
//               <TableCell style={{ textAlign: "center" }}>Name</TableCell>
//               <TableCell style={{ textAlign: "center" }}>
//                 Start Date - End Date
//               </TableCell>
//               <TableCell style={{ textAlign: "center" }}>Duration</TableCell>
//               <TableCell style={{ textAlign: "center" }}>Leave Type</TableCell>
//               <TableCell style={{ textAlign: "center" }}>Status</TableCell>
//               <TableCell style={{ textAlign: "center" }}>Actions</TableCell>
//             </TableRow>
//           </TableHead>
//           <TableBody>
//             {loading ? (
//               // Loader shown in the body of the table
//               <TableRow>
//                 <TableCell colSpan={6} align="center">
//                   <Box
//                     sx={{
//                       height: 6 * 48, // Assuming row height is 48px, adjust if needed
//                       display: "flex",
//                       justifyContent: "center",
//                       alignItems: "center",
//                     }}
//                   >
//                     <CircularProgress />
//                   </Box>
//                 </TableCell>
//               </TableRow>
//             ) : data?.leaves?.length > 0 ? (
//               data.leaves.map((leave) => (
//                 <TableRow key={leave._id}>
//                   {console.log("🚀 ~ LeaveTable ~ leave:", leave)}
//                   <TableCell style={{ textAlign: "center" }}>
//                     <Box
//                       display="flex"
//                       alignItems="center"
//                       justifyContent="start"
//                     >
//                       <Avatar
//                         src={leave.user.avatarUrl || ""}
//                         alt={`${leave.user.firstName} ${leave.user.lastName}`}
//                         style={{ marginRight: "8px" }}
//                       >
//                         {leave.user.firstName[0]} {leave.user.lastName[0]}
//                       </Avatar>
//                       <Typography variant="body2">
//                         {leave.user.firstName} {leave.user.lastName}
//                       </Typography>
//                     </Box>
//                   </TableCell>

//                   <TableCell style={{ textAlign: "center" }}>
//                     {format(new Date(leave.startDate), "dd MMM yyyy")} -{" "}
//                     {format(new Date(leave.endDate), "dd MMM yyyy")}
//                   </TableCell>
//                   <TableCell style={{ textAlign: "center" }}>
//                     {Math.ceil(
//                       (new Date(leave.endDate) - new Date(leave.startDate)) /
//                         (1000 * 60 * 60 * 24)
//                     )}{" "}
//                     days
//                   </TableCell>
//                   <TableCell style={{ textAlign: "center" }}>
//                     {leave.leaveType}
//                   </TableCell>
//                   <TableCell style={{ textAlign: "center" }}>
//                     <span
//                       style={{
//                         backgroundColor:
//                           leave.status === "Approved"
//                             ? "#1be29a"
//                             : leave.status === "Pending"
//                             ? "#ffd166"
//                             : "#e63946",
//                         color: "#000",
//                         borderRadius: "4px",
//                         padding: "4px 8px",
//                       }}
//                     >
//                       {leave.status}
//                     </span>
//                   </TableCell>
//                   <TableCell align="center">
//                     <Button
//                       variant="outlined"
//                       color="primary"
//                       onClick={() => handleViewDetails(leave._id)}
//                     >
//                       View Details
//                     </Button>
//                   </TableCell>
//                 </TableRow>
//               ))
//             ) : (
//               <TableRow>
//                 <TableCell colSpan={6} align="center">
//                   No leaves found
//                 </TableCell>
//               </TableRow>
//             )}
//           </TableBody>
//         </Table>
//       </TableContainer>

//       {/* Pagination */}
//       {data?.totalPages > 1 && (
//         <Box sx={{ display: "flex", justifyContent: "center", marginTop: 2 }}>
//           <Pagination
//             count={data.totalPages}
//             page={currentPage}
//             onChange={handlePageChange}
//             color="primary"
//             variant="outlined"
//             shape="rounded"
//           />
//         </Box>
//       )}

//       {/* Dialog for Leave Details */}
//       <Dialog
//         open={isDialogOpen}
//         onClose={handleCloseDialog}
//         fullWidth
//         sx={{
//           "& .MuiPaper-root": {
//             backgroundColor: "background.default", // Set the dialog background color
//             color: "text.primary", // Adjust text color
//             borderRadius: 3, // Optional: Add rounding for a softer appearance
//             boxShadow: 4, // Add shadow for a subtle elevation effect
//           },
//         }}
//       >
//         <IconButton
//           onClick={handleCloseDialog}
//           aria-label="close"
//           sx={{
//             position: "absolute",
//             top: 8,
//             right: 8,
//             zIndex: 1300,
//             scale: 1.25, // Increase the icon size for better visibility
//             color: "text.primary", // Ensure the icon matches the theme text color
//           }}
//         >
//           <CloseIcon />
//         </IconButton>
//         <DialogContent
//           sx={{
//             padding: 3, // Add padding for better spacing
//             backgroundColor: "background.paper", // Match the theme's paper background
//           }}
//         >
//           {selectedLeaveId && (
//             <ViewOrUpdateLeavePage
//               leaveId={selectedLeaveId}
//               handleCloseDialog={handleCloseDialog}
//             />
//           )}
//         </DialogContent>
//       </Dialog>
//     </Box>
//   );
// };

// export default LeaveTable;
import { useState, useEffect, useRef } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  Box,
  Pagination,
  CircularProgress,
  Dialog,
  DialogContent,
  IconButton,
  Avatar,
  Typography,
} from "@mui/material";
import debounce from "lodash.debounce";

import { useDispatch, useSelector } from "react-redux";
import { fetchLeaveByStatus } from "../store/slices/leave.slice";
import { format } from "date-fns";
import CloseIcon from "@mui/icons-material/Close";
import ViewOrUpdateLeavePage from "../pages/ViewOrUpdateLeavePage";
import { io } from "socket.io-client";
// Initialize Socket.IO client

const socket = io("http://localhost:8000");

const LeaveTable = ({ filterStatus }) => {
  const dispatch = useDispatch();
  const tableContainerRef = useRef(null);

  const data = useSelector((state) => state.leave.leaves.data);
  const { loading } = useSelector(
    (state) => state.leave.leaveActions.fetchLeaveByStatus
  );

  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [selectedLeaveId, setSelectedLeaveId] = useState(null);
  const [isDialogOpen, setDialogOpen] = useState(false);

  // Fetch data whenever `currentPage` or `filterStatus` changes
  useEffect(() => {
    fetchData();
  }, [dispatch, filterStatus, currentPage, rowsPerPage]);

  const fetchData = () => {
    dispatch(
      fetchLeaveByStatus({
        status: filterStatus === "All" ? undefined : filterStatus,
        page: currentPage,
        limit: rowsPerPage,
      })
    );
  };

  // Adjust rows per page based on available height
  useEffect(() => {
    const updateRowsPerPage = () => {
      const containerHeight = tableContainerRef.current?.clientHeight || 0;
      const rowHeight = 48;
      const calculatedRowsPerPage = Math.max(
        6,
        Math.min(Math.floor(containerHeight / rowHeight), 15)
      );

      setRowsPerPage(calculatedRowsPerPage > 0 ? calculatedRowsPerPage : 5);
    };

    const debouncedUpdateRowsPerPage = debounce(updateRowsPerPage, 100);

    updateRowsPerPage();
    window.addEventListener("resize", debouncedUpdateRowsPerPage);

    return () => {
      window.removeEventListener("resize", debouncedUpdateRowsPerPage);
    };
  }, []);

  // Handle real-time updates
  useEffect(() => {
    socket.on("leaveAdded", (updatedLeave) => {
      console.log("Real-time update received:", updatedLeave);
      // fetchData(); // Refetch data on real-time updates
    });

    // Clean up the socket connection
    return () => {
      socket.off("leaveAdded");
    };
  }, []);

  const handlePageChange = (event, value) => {
    setCurrentPage(value);
  };

  const handleViewDetails = (id) => {
    setSelectedLeaveId(id);
    setDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setDialogOpen(false);
    setSelectedLeaveId(null);
  };
  return (
    <Box>
      {/* Table Header */}
      <TableContainer component={Paper} ref={tableContainerRef}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell style={{ textAlign: "center" }}>Name</TableCell>
              <TableCell style={{ textAlign: "center" }}>
                Start Date - End Date
              </TableCell>
              <TableCell style={{ textAlign: "center" }}>Duration</TableCell>
              <TableCell style={{ textAlign: "center" }}>Leave Type</TableCell>
              <TableCell style={{ textAlign: "center" }}>Status</TableCell>
              <TableCell style={{ textAlign: "center" }}>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {loading ? (
              // Loader shown in the body of the table
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
            ) : data?.leaves?.length > 0 ? (
              data.leaves.map((leave) => (
                <TableRow key={leave._id}>
                  {/* {console.log("🚀 ~ LeaveTable ~ leave:", leave)} */}
                  <TableCell style={{ textAlign: "center" }}>
                    <Box
                      display="flex"
                      alignItems="center"
                      justifyContent="start"
                    >
                      <Avatar
                        src={""}
                        alt={`${leave.user.firstName} ${leave.user.lastName}`}
                        style={{ marginRight: "8px" }}
                      >
                        {leave.user.firstName[0]} {leave.user.lastName[0]}
                      </Avatar>
                      <Typography variant="body2">
                        {leave.user.firstName} {leave.user.lastName}
                      </Typography>
                    </Box>
                  </TableCell>

                  <TableCell style={{ textAlign: "center" }}>
                    {format(new Date(leave.startDate), "dd MMM yyyy")} -{" "}
                    {format(new Date(leave.endDate), "dd MMM yyyy")}
                  </TableCell>
                  <TableCell style={{ textAlign: "center" }}>
                    {Math.ceil(
                      (new Date(leave.endDate) - new Date(leave.startDate)) /
                        (1000 * 60 * 60 * 24)
                    )}{" "}
                    days
                  </TableCell>
                  <TableCell style={{ textAlign: "center" }}>
                    {leave.leaveType}
                  </TableCell>
                  <TableCell style={{ textAlign: "center" }}>
                    <span
                      style={{
                        backgroundColor:
                          leave.status === "Approved"
                            ? "#1be29a"
                            : leave.status === "Pending"
                            ? "#ffd166"
                            : "#e63946",
                        color: "#000",
                        borderRadius: "4px",
                        padding: "4px 8px",
                      }}
                    >
                      {leave.status}
                    </span>
                  </TableCell>
                  <TableCell align="center">
                    <Button
                      variant="outlined"
                      color="primary"
                      onClick={() => handleViewDetails(leave._id)}
                    >
                      View
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={6} align="center">
                  No leaves found
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Pagination */}
      {data?.totalPages > 1 && (
        <Box sx={{ display: "flex", justifyContent: "center", marginTop: 2 }}>
          <Pagination
            count={data.totalPages}
            page={currentPage}
            onChange={handlePageChange}
            color="primary"
            variant="outlined"
            shape="rounded"
          />
        </Box>
      )}

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
            scale: 1.25, // Increase the icon size for better visibility
            color: "text.primary", // Ensure the icon matches the theme text color
          }}
        >
          <CloseIcon />
        </IconButton>
        <DialogContent
          sx={{
            padding: 3, // Add padding for better spacing
            backgroundColor: "background.paper", // Match the theme's paper background
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
    </Box>
  );
};

export default LeaveTable;
