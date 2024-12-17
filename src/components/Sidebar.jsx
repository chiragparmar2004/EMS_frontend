import { useState, useEffect } from "react";
import {
  Box,
  Drawer,
  List,
  ListItem,
  ListItemText,
  Typography,
} from "@mui/material";
import { Link, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";

const Sidebar = () => {
  const location = useLocation();
  const { data } = useSelector((state) => state.user.user); // Assuming `data.role` contains the user's role
  // const [selectedPath, setSelectedPath] = useState(location.pathname);

  // Sync selected path with route changes
  // useEffect(() => {
  //   setSelectedPath(location.pathname);
  // }, [location]);

  // Define menu items for different roles
  const menuItems = [
    {
      text: "Dashboard",
      paths: ["/dashboard"],
      hoverColor: "rgba(255, 209, 102, 0.1)",
      roles: ["admin", "employee"], // Accessible by both roles
    },
    {
      text: "Employees",
      paths: ["/employees", "/add-employee", "/view-update-employee/:id"],
      hoverColor: "rgba(69, 123, 157, 0.1)",
      roles: ["admin"], // Only accessible by admin
    },
    {
      text: "Leaves",
      paths: [
        "/leaves",
        "/add-leave",
        "/request-leave",
        "/view-update-leave/:id",
      ],
      hoverColor: "rgba(67, 153, 111, 0.1)",
      roles: ["admin", "employee"], // Accessible by both roles
    },
    {
      text: "Salary",
      paths: ["/all-emp-salary"],
      hoverColor: "rgba(65, 88, 139, 0.1)",
      roles: ["admin"], // Accessible by both roles
    },
  ];

  // Filter menu items based on user role
  const filteredMenuItems = menuItems.filter((item) =>
    item.roles.includes(data.role)
  );

  // Helper to determine active menu item
  const isActive = (paths) =>
    paths.some((path) =>
      path.includes(":") // Check dynamic paths
        ? location.pathname.startsWith(path.split("/:")[0]) // Match base path
        : location.pathname === path
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
          bgcolor: "background.paper",
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
              color: "primary.main",
            }}
          >
            EMS
          </Typography>
        </Box>

        {/* Navigation Items */}
        <List sx={{ flexGrow: 1, px: 2 }}>
          {filteredMenuItems.map((item) => {
            const active = isActive(item.paths);

            return (
              <ListItem
                component={Link}
                to={item.paths[0]} // Default path for the menu item
                key={item.text}
                sx={{
                  borderRadius: 2,
                  mb: 1,
                  p: 1.5,
                  backgroundColor: active ? item.hoverColor : "transparent",
                  transition: "all 0.3s ease",
                  "&:hover": {
                    backgroundColor: item.hoverColor,
                    transform: "translateX(2px)",
                  },
                  "& .MuiListItemText-primary": {
                    fontWeight: active ? 600 : 400,
                    color: active ? "primary.main" : "text.primary",
                    fontSize: "0.875rem",
                  },
                  position: "relative",
                  "&::before": active
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
                      color: active ? "primary.main" : "text.primary",
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
