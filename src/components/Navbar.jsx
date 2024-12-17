import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  IconButton,
  Avatar,
  Menu,
  MenuItem,
} from "@mui/material";
import { Menu as MenuIcon } from "@mui/icons-material";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../store/slices/user.slice.js"; // Adjust the path as needed
import { useState } from "react";
import { io } from "socket.io-client";

function Navbar({ isMobile, handleDrawerToggle }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { data, isAuthenticated } = useSelector((state) => state.user.user);
  const [anchorEl, setAnchorEl] = useState(null);

  const handleLogout = () => {
    dispatch(logout());
    setAnchorEl(null);
  };

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const socket = io("http://localhost:8000"); // Backend URL

  socket.on("connection", () => {
    console.log("Connected to the server:", socket.id);
  });

  return (
    <AppBar
      position="static"
      color="default"
      sx={{
        backgroundColor: "background.paper",
        borderColor: "divider",
        boxShadow: "none",
      }}
    >
      <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
        {isMobile && (
          <IconButton
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, color: (theme) => theme.palette.text.primary }}
          >
            <MenuIcon />
          </IconButton>
        )}
        <Typography
          sx={{
            mx: 1,
            fontWeight: "bold",
            color: "text.primary",
            fontSize: "1.5rem",
          }}
        >
          EMS
        </Typography>

        <Box sx={{ display: "flex", alignItems: "center" }}>
          {isAuthenticated ? (
            <>
              <Typography
                sx={{
                  mr: 2,
                  fontWeight: "bold",
                  color: "text.primary",
                }}
              >
                Hi, {data.firstName}
              </Typography>
              <Avatar
                alt={data.firstName}
                src={data.avatarUrl || ""}
                sx={{
                  cursor: "pointer",
                  backgroundColor: (theme) => theme.palette.primary.main,
                }}
                onClick={handleMenuOpen}
              >
                {data.firstName[0]}
                {data.lastName[0]}
              </Avatar>
              <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleMenuClose}
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "right",
                }}
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
              >
                <MenuItem onClick={handleLogout}>Logout</MenuItem>
                <MenuItem onClick={() => navigate("/change-password")}>
                  Change Password
                </MenuItem>
                <MenuItem onClick={() => navigate("/profile")}>
                  Profile
                </MenuItem>
              </Menu>
            </>
          ) : (
            <>
              <Button
                component={Link}
                to="/login"
                color="primary"
                sx={{ fontWeight: "bold", mx: 1 }}
              >
                Login
              </Button>
              <Button
                component={Link}
                to="/register"
                color="primary"
                variant="outlined"
                sx={{ fontWeight: "bold", mx: 1 }}
              >
                Register
              </Button>
            </>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
}

export default Navbar;
