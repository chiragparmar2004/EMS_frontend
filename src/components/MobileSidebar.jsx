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

const MobileSidebar = ({ drawerOpen, closeDrawer }) => {
  const location = useLocation();
  const [selectedPath, setSelectedPath] = useState(location.pathname);

  useEffect(() => {
    closeDrawer();
    setSelectedPath(location.pathname);
  }, [location]);

  const menuItems = [
    {
      text: "Dashboard",
      path: "/dashboard",
    },
    {
      text: "Employees",
      path: "/employees",
    },
    {
      text: "Tasks",
      path: "/tasks",
    },
    {
      text: "Settings",
      path: "/settings",
    },
  ];

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
            p: 1,
            textAlign: "center",
            borderColor: "divider",
            mb: 3,
            backgroundColor: "primary.main", // Background color for logo area
            borderRadius: "4px",
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
          {/* Close Button */}
          <Box display="flex" justifyContent="flex-end" p={1}>
            <IconButton
              onClick={closeDrawer}
              sx={{ color: (theme) => theme.palette.text.contrastText }}
            >
              <CloseIcon />
            </IconButton>
          </Box>
        </Box>

        {/* Navigation Items */}
        <List sx={{ flexGrow: 1, px: 2 }}>
          {menuItems.map((item) => {
            const isSelected = selectedPath === item.path;

            return (
              <ListItem
                button
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
