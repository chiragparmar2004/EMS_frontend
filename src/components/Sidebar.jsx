import { useState, useEffect } from "react";
import {
  Box,
  Drawer,
  List,
  ListItem,
  ListItemText,
  Typography,
} from "@mui/material";
import { useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";

const Sidebar = () => {
  const location = useLocation();
  const [selectedPath, setSelectedPath] = useState(location.pathname);
  const { data } = useSelector((state) => state.user.user); // Assuming `data.role` contains the user's role

  useEffect(() => {
    setSelectedPath(location.pathname);
  }, [location]);

  // Define menu items for different roles
  const menuItems = [
    {
      text: "Dashboard",
      path: "/dashboard",
      hoverColor: "rgba(255, 209, 102, 0.1)", // primary main with opacity
      roles: ["admin", "employee"], // Accessible by both roles
    },
    {
      text: "Employees",
      path: "/employees",
      hoverColor: "rgba(69, 123, 157, 0.1)", // secondary main with opacity
      roles: ["admin"], // Only accessible by admin
    },
    {
      text: "Leaves",
      path: "/leaves",
      hoverColor: "rgba(67, 153, 111, 0.1)", // success main with opacity
      roles: ["admin", "employee"], // Accessible by both roles
    },
  ];

  // Filter menu items based on the user's role
  const filteredMenuItems = menuItems.filter((item) =>
    item.roles.includes(data.role)
  );

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: 240,
        flexShrink: 0,
        "& .MuiDrawer-paper": {
          width: 240,
          boxSizing: "border-box",
          bgcolor: "background.paper", // This will be #000e32
          borderRight: "none",
        },
      }}
    >
      <Box sx={{ display: "flex", flexDirection: "column", height: "100%" }}>
        {/* Logo Section */}
        <Box
          sx={{
            p: 3,
            textAlign: "center",
            borderColor: "divider",
            mb: 2,
          }}
        >
          <Typography
            variant="h5"
            sx={{
              fontWeight: "bold",
              color: "primary.main", // This will be #ffd166
            }}
          >
            EMS
          </Typography>
        </Box>

        {/* Navigation Items */}
        <List sx={{ flexGrow: 1, px: 2 }}>
          {filteredMenuItems.map((item) => {
            const isSelected = selectedPath === item.path;

            return (
              <ListItem
                button
                component={Link}
                to={item.path}
                key={item.text}
                sx={{
                  borderRadius: 2,
                  mb: 1,
                  p: 1.5,
                  backgroundColor: isSelected ? item.hoverColor : "transparent",
                  transition: "all 0.3s ease",
                  "&:hover": {
                    backgroundColor: item.hoverColor,
                    transform: "translateX(2px)",
                  },
                  "& .MuiListItemText-primary": {
                    fontWeight: isSelected ? 600 : 400,
                    color: isSelected ? "primary.main" : "text.primary",
                    fontSize: "0.875rem",
                  },
                  position: "relative",
                  "&::before": isSelected
                    ? {
                        content: '""',
                        position: "absolute",
                        left: -8,
                        top: "50%",
                        transform: "translateY(-50%)",
                        width: 5,
                        height: "60%",
                        backgroundColor: "primary.main",
                        borderRadius: "0 4px 4px 0",
                      }
                    : {},
                }}
              >
                <ListItemText
                  primary={item.text}
                  sx={{
                    ml: 2,
                    "& .MuiTypography-root": {
                      color: isSelected ? "primary.main" : "text.primary",
                    },
                  }}
                />
              </ListItem>
            );
          })}
        </List>
      </Box>
    </Drawer>
  );
};

export default Sidebar;

// import { useState, useEffect } from "react";
// import {
//   Box,
//   Drawer,
//   List,
//   ListItem,
//   ListItemText,
//   Typography,
//   IconButton,
// } from "@mui/material";
// import { Link, useLocation } from "react-router-dom";
// import { Close as CloseIcon } from "@mui/icons-material";

// const Sidebar = ({ isMobile, closeDrawer }) => {
//   const location = useLocation();
//   const [selectedPath, setSelectedPath] = useState(location.pathname);

//   useEffect(() => {
//     setSelectedPath(location.pathname);
//   }, [location]);

//   const menuItems = [
//     {
//       text: "Dashboard",
//       path: "/dashboard",
//       hoverColor: "rgba(255, 209, 102, 0.1)", // primary main with opacity
//     },
//     {
//       text: "Employees",
//       path: "/employees",
//       hoverColor: "rgba(69, 123, 157, 0.1)", // secondary main with opacity
//     },
//     {
//       text: "Tasks",
//       path: "/tasks",
//       hoverColor: "rgba(67, 153, 111, 0.1)", // success main with opacity
//     },
//     {
//       text: "Settings",
//       path: "/settings",
//       hoverColor: "rgba(255, 209, 102, 0.1)", // primary main with opacity
//     },
//   ];

//   return (
//     <Drawer
//       variant={isMobile ? "temporary" : "permanent"}
//       open={!isMobile || undefined} // Only control open state in mobile view
//       onClose={closeDrawer} // Close drawer in mobile view
//       sx={{
//         width: 240,
//         flexShrink: 0,
//         "& .MuiDrawer-paper": {
//           width: 240,
//           boxSizing: "border-box",
//           bgcolor: "background.paper",
//           borderRight: "none",
//         },
//       }}
//     >
//       <Box sx={{ display: "flex", flexDirection: "column", height: "100%" }}>
//         {/* Mobile Close Icon */}
//         {isMobile &&
//           (console.log("isMobile", isMobile),
//           (
//             <Box
//               display="flex"
//               justifyContent="flex-end"
//               p={1}
//               sx={{ backgroundColor: "#ffffff" }}
//             >
//               <IconButton onClick={closeDrawer} sx={{ color: "#ffffff" }}>
//                 <CloseIcon />
//               </IconButton>
//             </Box>
//           ))}

//         {/* Logo Section */}
//         <Box
//           sx={{
//             p: 3,
//             textAlign: "center",
//             borderColor: "divider",
//             mb: 2,
//           }}
//         >
//           <Typography
//             variant="h5"
//             sx={{
//               fontWeight: "bold",
//               color: "primary.main",
//             }}
//           >
//             EMS
//           </Typography>
//         </Box>

//         {/* Navigation Items */}
//         <List sx={{ flexGrow: 1, px: 2 }}>
//           {menuItems.map((item) => {
//             const isSelected = selectedPath === item.path;

//             return (
//               <ListItem
//                 button
//                 component={Link}
//                 to={item.path}
//                 key={item.text}
//                 sx={{
//                   borderRadius: 2,
//                   mb: 1,
//                   p: 1.5,
//                   backgroundColor: isSelected ? item.hoverColor : "transparent",
//                   transition: "all 0.3s ease",
//                   "&:hover": {
//                     backgroundColor: item.hoverColor,
//                     transform: "translateX(2px)",
//                   },
//                   "& .MuiListItemText-primary": {
//                     fontWeight: isSelected ? 600 : 400,
//                     color: isSelected ? "primary.main" : "text.primary",
//                     fontSize: "0.875rem",
//                   },
//                   position: "relative",
//                   "&::before": isSelected
//                     ? {
//                         content: '""',
//                         position: "absolute",
//                         left: -8,
//                         top: "50%",
//                         transform: "translateY(-50%)",
//                         width: 5,
//                         height: "60%",
//                         backgroundColor: "primary.main",
//                         borderRadius: "0 4px 4px 0",
//                       }
//                     : {},
//                 }}
//                 onClick={isMobile ? closeDrawer : undefined} // Close drawer when item clicked on mobile
//               >
//                 <ListItemText
//                   primary={item.text}
//                   sx={{
//                     ml: 2,
//                     "& .MuiTypography-root": {
//                       color: isSelected ? "primary.main" : "text.primary",
//                     },
//                   }}
//                 />
//               </ListItem>
//             );
//           })}
//         </List>
//       </Box>
//     </Drawer>
//   );
// };

// export default Sidebar;
