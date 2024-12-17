import { useState, useEffect } from "react";
import {
  Box,
  Drawer,
  List,
  ListItem,
  ListItemText,
  Typography,
  IconButton,
} from "@mui/material";
import { Link, useLocation } from "react-router-dom";
import { Close as CloseIcon } from "@mui/icons-material";
import { useSelector } from "react-redux";

const MobileSidebar = ({ drawerOpen, closeDrawer }) => {
  const location = useLocation();
  const [selectedPath, setSelectedPath] = useState(location.pathname);
  const { data } = useSelector((state) => state.user.user); // Accessing user's role

  useEffect(() => {
    setSelectedPath(location.pathname);
    closeDrawer();
  }, [location]);

  // Define menu items with role filtering
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
      anchor="left"
      open={drawerOpen}
      onClose={closeDrawer}
      variant="temporary"
      sx={{
        display: { xs: "block", sm: "none" },
        "& .MuiDrawer-paper": {
          width: 240,
          boxSizing: "border-box",
          bgcolor: "background.paper",
          borderRight: "none",
          boxShadow: "2px 0px 8px rgba(0, 0, 0, 0.1)", // subtle shadow effect
        },
      }}
    >
      <Box sx={{ display: "flex", flexDirection: "column", height: "100%" }}>
        {/* Logo Section */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            p: 1.5,
            backgroundColor: "primary.main",
            borderRadius: "4px",
            mb: 2,
          }}
        >
          <Typography
            variant="h5"
            sx={{
              fontWeight: "bold",
              color: (theme) => theme.palette.text.contrastText,
            }}
          >
            EMS
          </Typography>
          <IconButton
            onClick={closeDrawer}
            sx={{ color: (theme) => theme.palette.text.contrastText }}
          >
            <CloseIcon />
          </IconButton>
        </Box>

        {/* Navigation Items */}
        <List sx={{ flexGrow: 1, px: 2 }}>
          {filteredMenuItems.map((item) => {
            const isSelected = selectedPath === item.path;

            return (
              <ListItem
                // button
                component={Link}
                to={item.path}
                key={item.text}
                sx={{
                  borderRadius: 2,
                  mb: 1.5,
                  p: 1.5,
                  backgroundColor: isSelected ? item.hoverColor : "transparent",
                  transition: "all 0.3s ease",
                  "&:hover": {
                    backgroundColor: item.hoverColor,
                    transform: "translateX(4px)", // Slight shift for hover effect
                  },
                  "& .MuiListItemText-primary": {
                    fontWeight: isSelected ? 600 : 400,
                    color: isSelected ? "primary.main" : "text.primary",
                    fontSize: "0.9rem",
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

export default MobileSidebar;
