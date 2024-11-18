// import { Outlet, Navigate } from "react-router-dom";
// import { Box, CssBaseline, Snackbar, Alert } from "@mui/material";

// import Navbar from "./Navbar";
// import { useSelector, useDispatch } from "react-redux";
// import { hideSnackbar } from "../store/slices/snackbar.slice.js"; // Import the action to close snackbar
// import Sidebar from "./Sidebar.jsx";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Navigate } from "react-router-dom";
import {
  Box,
  CssBaseline,
  Snackbar,
  Alert,
  useMediaQuery,
  IconButton,
  Drawer,
} from "@mui/material";
// import { Menu as MenuIcon } from "@mui/icons-material";
import { Menu as MenuIcon, Close as CloseIcon } from "@mui/icons-material"; // Import CloseIcon
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import { hideSnackbar } from "../store/slices/snackbar.slice";
import { Outlet } from "react-router-dom";
import MobileSidebar from "./MobileSidebar";

const Layout = () => {
  const dispatch = useDispatch();
  const { open, message, severity } = useSelector((state) => state.snackbar);
  const { isAuthenticated } = useSelector((state) => state.user.user);

  const handleSnackbarClose = () => {
    dispatch(hideSnackbar());
  };

  // Redirect authenticated users away from public routes
  if (isAuthenticated) {
    return <Navigate to="/dashboard" replace />;
  }

  return (
    <Box sx={{ width: "100vw", height: "100vh", overflowX: "hidden" }}>
      <CssBaseline />
      <Box
        component="header"
        height="60px"
        width="100%"
        position="fixed"
        zIndex={10}
      >
        <Navbar />
      </Box>
      <Box
        component="main"
        flexGrow={1}
        display="flex"
        flexDirection="column"
        p={2}
        pt="60px"
        overflow="auto"
      >
        <Outlet />
      </Box>

      <Snackbar
        open={open}
        autoHideDuration={3000}
        onClose={handleSnackbarClose}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
      >
        <Alert onClose={handleSnackbarClose} severity={severity}>
          {message}
        </Alert>
      </Snackbar>
    </Box>
  );
};

//TODO  TEST THIS

// const Layout = () => {
//   const dispatch = useDispatch();
//   const { open, message, severity } = useSelector((state) => state.snackbar);
//   const { isAuthenticated } = useSelector((state) => state.user.user);

//   const theme = useTheme();
//   const isMobile = useMediaQuery(theme.breakpoints.down("md")); // Check if screen size is mobile

//   const [drawerOpen, setDrawerOpen] = React.useState(false); // For mobile sidebar

//   const handleSnackbarClose = () => {
//     dispatch(hideSnackbar());
//   };

//   // Redirect authenticated users away from public routes
//   if (isAuthenticated) {
//     return <Navigate to="/dashboard" replace />;
//   }

//   // Toggle Drawer on Mobile
//   const toggleDrawer = () => {
//     setDrawerOpen(!drawerOpen);
//   };

//   return (
//     <Box sx={{ display: "flex" }}>
//       <CssBaseline />

//       {/* Sidebar for larger screens */}
//       <Drawer
//         variant={isMobile ? "temporary" : "permanent"}
//         open={drawerOpen}
//         onClose={toggleDrawer}
//         sx={{
//           width: 240,
//           flexShrink: 0,
//           "& .MuiDrawer-paper": {
//             width: 240,
//             boxSizing: "border-box",
//           },
//         }}
//       >
//         <List>
//           <ListItem button>
//             <ListItemText primary="Home" />
//           </ListItem>
//           <ListItem button>
//             <ListItemText primary="About" />
//           </ListItem>
//           <ListItem button>
//             <ListItemText primary="Contact" />
//           </ListItem>
//         </List>
//       </Drawer>

//       {/* Main Content */}
//       <Box
//         component="main"
//         sx={{
//           flexGrow: 1,
//           bgcolor: "background.default",
//           p: 2,
//           transition: theme.transitions.create("margin", {
//             easing: theme.transitions.easing.sharp,
//             duration: theme.transitions.duration.leavingScreen,
//           }),
//           marginLeft: isMobile && drawerOpen ? 240 : 0, // Adjust margin for mobile
//         }}
//       >
//         {/* Navbar */}
//         <AppBar position="fixed" sx={{ zIndex: theme.zIndex.drawer + 1 }}>
//           <Toolbar>
//             {isMobile && (
//               <IconButton
//                 color="inherit"
//                 edge="start"
//                 onClick={toggleDrawer}
//                 sx={{ mr: 2 }}
//               >
//                 <MenuIcon />
//               </IconButton>
//             )}
//             <Navbar />
//           </Toolbar>
//         </AppBar>

//         {/* Main Content Area */}
//         <Box sx={{ mt: 8 }}>
//           <Outlet />
//         </Box>
//       </Box>

//       {/* Snackbar */}
//       <Snackbar
//         open={open}
//         autoHideDuration={3000}
//         onClose={handleSnackbarClose}
//         anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
//       >
//         <Alert onClose={handleSnackbarClose} severity={severity}>
//           {message}
//         </Alert>
//       </Snackbar>
//     </Box>
//   );
// };

// export default Layout;

// const ProtectedLayout = () => {
//   const { isAuthenticated } = useSelector((state) => state.user.user);
//   const dispatch = useDispatch();
//   const { open, message, severity } = useSelector((state) => state.snackbar);

//   const handleSnackbarClose = () => {
//     dispatch(hideSnackbar());
//   };

//   if (!isAuthenticated) {
//     return <Navigate to="/login" replace />;
//   }

//   return (
//     <Box display="flex" flexDirection="column" minHeight="100vh">
//       <CssBaseline />
//       <Box
//         component="header"
//         height="60px"
//         width="100%"
//         position="fixed"
//         zIndex={10}
//       >
//         <Navbar />
//       </Box>
//       <Box
//         component="main"
//         flexGrow={1}
//         display="flex"
//         flexDirection="column"
//         p={2}
//         pt="60px"
//         overflow="auto"
//       >
//         <Box display="flex" flexDirection="row">
//           <Sidebar />
//           <Outlet />
//         </Box>
//       </Box>

//       <Snackbar
//         open={open}
//         autoHideDuration={3000}
//         onClose={handleSnackbarClose}
//         anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
//       >
//         <Alert onClose={handleSnackbarClose} severity={severity}>
//           {message}
//         </Alert>
//       </Snackbar>
//     </Box>
//   );
// };

const ProtectedLayout = () => {
  const { isAuthenticated } = useSelector((state) => state.user.user);
  const dispatch = useDispatch();
  const { open, message, severity } = useSelector((state) => state.snackbar);

  // Media query to detect mobile screen size
  const isMobile = useMediaQuery((theme) => theme.breakpoints.down("sm"));
  console.log("🚀 ~ ProtectedLayout ~ isMobile:", isMobile);

  // State to handle drawer (hamburger menu) open/close
  const [drawerOpen, setDrawerOpen] = useState(false);

  const handleSnackbarClose = () => {
    dispatch(hideSnackbar());
  };

  const handleDrawerToggle = () => {
    setDrawerOpen(!drawerOpen);
  };

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return (
    <Box display="flex" flexDirection="column" minHeight="100vh">
      <CssBaseline />

      {/* Navbar */}
      <Box
        component="header"
        height="60px"
        width="100%"
        position="fixed"
        zIndex={10}
      >
        {/* Mobile Navbar with Hamburger Menu */}
        {isMobile && (
          <Box
            component="header"
            position="fixed"
            top={0}
            left={0}
            zIndex={11}
            display="flex"
            justifyContent="flex-start"
            alignItems="center"
            height="60px"
            pr={2}
          >
            <IconButton onClick={handleDrawerToggle} color="inherit">
              <MenuIcon />
            </IconButton>
          </Box>
        )}

        <Navbar />
      </Box>

      {/* Sidebar for mobile */}

      {/* Sidebar for desktop */}

      <Box
        component="main"
        flexGrow={1}
        display="flex"
        flexDirection="column"
        p={2}
        pt="60px"
        overflow="auto"
      >
        <Box display="flex" flexDirection="row">
          {isMobile && (
            <MobileSidebar
              drawerOpen={drawerOpen}
              closeDrawer={handleDrawerToggle}
            />
          )}
          {!isMobile && <Sidebar />}
          <Outlet />
        </Box>
      </Box>

      {/* Main content area */}
      {/* <Box
        component="main"
        flexGrow={1}
        display="flex"
        flexDirection="column"
        p={2}
        pt="60px"
        overflow="auto"
      >
        <Box display="flex" flexDirection="row">
          <Outlet />
        </Box>
      </Box> */}

      {/* Snackbar */}
      <Snackbar
        open={open}
        autoHideDuration={3000}
        onClose={handleSnackbarClose}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
      >
        <Alert onClose={handleSnackbarClose} severity={severity}>
          {message}
        </Alert>
      </Snackbar>
    </Box>
  );
};

// export default ProtectedLayout;

export default Layout;
export { ProtectedLayout };
