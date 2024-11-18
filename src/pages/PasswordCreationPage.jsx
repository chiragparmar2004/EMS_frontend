import { useEffect, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import {
  TextField,
  Button,
  Typography,
  Box,
  IconButton,
  InputAdornment,
} from "@mui/material";

import { Visibility, VisibilityOff } from "@mui/icons-material";
import { useDispatch } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";

import { showSnackbar } from "../store/slices/snackbar.slice";
import {
  checkResetToken,
  clearErrors,
  setPassword,
} from "../store/slices/user.slice";

const PasswordCreationPage = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const token = searchParams.get("token");
  console.log("🚀 ~ PasswordCreationPage ~ token:", token);

  const [showPassword, setShowPassword] = useState({
    password: false,
    confirmPassword: false,
  });
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTokenStatus = async () => {
      try {
        const response = await dispatch(checkResetToken({ token }));

        // Log the response for debugging
        console.log("🚀 ~ fetchTokenStatus ~ response:", response);

        // Check if the status is 200
        if (response?.meta?.requestStatus === "fulfilled") {
          console.log("Token is valid");
          // You can stay on the current page or perform additional actions here
        } else {
          // If response is not successful, navigate to the error page
          console.log("Token is invalid or expired, redirecting...");
          navigate("/create-password-token-invalid");
        }
      } catch (error) {
        console.error("Error checking token:", error);
        // Navigate to an error page in case of any issues with the fetch
        navigate("/create-password-token-invalid");
      }
    };

    fetchTokenStatus();
  }, [dispatch, navigate, token]);

  const validationSchema = Yup.object({
    password: Yup.string()
      .required("Password is required")
      .matches(/[a-z]/, "Password must contain at least one lowercase letter")
      .matches(/[A-Z]/, "Password must contain at least one uppercase letter")
      .matches(/\d/, "Password must contain at least one number")
      .matches(
        /[@$!%*?&]/,
        "Password must contain at least one special character (@$!%*?&)"
      )
      .min(8, "Password must be at least 8 characters long"),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("password"), null], "Passwords must match")
      .required("Confirm Password is required"),
  });

  const formik = useFormik({
    initialValues: {
      password: "",
      confirmPassword: "",
    },
    validationSchema,
    onSubmit: async (values) => {
      try {
        const resultAction = await dispatch(
          setPassword({
            token: token,
            password: values.password,
          })
        );

        if (setPassword.fulfilled.match(resultAction)) {
          dispatch(
            showSnackbar({
              message: "Password created successfully!",
              severity: "success",
            })
          );
          navigate("/dashboard");
        } else if (setPassword.rejected.match(resultAction)) {
          dispatch(
            showSnackbar({
              message:
                resultAction.payload ||
                "Password creation failed. Please try again.",
              severity: "error",
            })
          );
          dispatch(clearErrors());
        }
      } catch (error) {
        console.error("Unexpected error during password creation:", error);
        dispatch(
          showSnackbar({
            message: "An unexpected error occurred. Please try again later.",
            severity: "error",
          })
        );
        dispatch(clearErrors());
      }
    },
  });

  const handleClickShowPassword = (field) => {
    setShowPassword((prevShow) => ({
      ...prevShow,
      [field]: !prevShow[field],
    }));
  };

  return (
    <Box
      component="form"
      onSubmit={formik.handleSubmit}
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: 5,
        width: "500px",
        margin: "auto",
        mt: 8,
        p: 3,
        backgroundColor: "background.paper",
        borderRadius: 2,
        boxShadow: 1,
      }}
    >
      <Typography variant="h5" align="center">
        Create Password
      </Typography>

      <TextField
        label="Password"
        type={showPassword.password ? "text" : "password"}
        name="password"
        value={formik.values.password}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        error={formik.touched.password && Boolean(formik.errors.password)}
        helperText={formik.touched.password && formik.errors.password}
        fullWidth
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton
                onClick={() => handleClickShowPassword("password")}
                edge="end"
                sx={{ color: "text.primary" }}
              >
                {showPassword.password ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            </InputAdornment>
          ),
        }}
      />

      <TextField
        label="Confirm Password"
        type={showPassword.confirmPassword ? "text" : "password"}
        name="confirmPassword"
        value={formik.values.confirmPassword}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        error={
          formik.touched.confirmPassword &&
          Boolean(formik.errors.confirmPassword)
        }
        helperText={
          formik.touched.confirmPassword && formik.errors.confirmPassword
        }
        fullWidth
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton
                onClick={() => handleClickShowPassword("confirmPassword")}
                edge="end"
                sx={{ color: "text.primary" }}
              >
                {showPassword.confirmPassword ? (
                  <VisibilityOff />
                ) : (
                  <Visibility />
                )}
              </IconButton>
            </InputAdornment>
          ),
        }}
      />

      <Button type="submit" variant="contained" fullWidth>
        Create Password
      </Button>
    </Box>
  );
};

export default PasswordCreationPage;
