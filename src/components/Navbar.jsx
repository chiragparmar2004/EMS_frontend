import { AppBar, Toolbar, Typography, Button, Box } from "@mui/material";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../store/slices/user.slice.js"; // Make sure this path is correct

function Navbar() {
  const dispatch = useDispatch();
  const { data, isAuthenticated } = useSelector((state) => state.user.user);
  console.log("🚀 ~ Navbar ~ user:", data);

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <AppBar
      position="static"
      color="default"
      sx={{
        backgroundColor: "background.paper",
        borderColor: "divider",
      }}
    >
      <Toolbar sx={{ display: "flex", justifyContent: "flex-end" }}>
        <Box sx={{ display: "flex", alignItems: "center" }}>
          {isAuthenticated ? (
            <>
              <Typography
                sx={{ mx: 1, fontWeight: "bold", color: "text.primary" }}
              >
                Hello, {data.firstName}
              </Typography>
              <Button
                onClick={handleLogout}
                color="primary"
                sx={{ fontWeight: "bold", mx: 1 }}
              >
                Logout
              </Button>
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
