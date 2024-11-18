// import { useState } from "react";
import { Container, TextField, Button, Typography, Box } from "@mui/material";
import { useFormik } from "formik";
import { useDispatch } from "react-redux";
import * as Yup from "yup";
import { clearErrors, resetPassword } from "../store/slices/user.slice";
import { showSnackbar } from "../store/slices/snackbar.slice";
import { useNavigate } from "react-router-dom";

const ForgotPasswordPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const formik = useFormik({
    initialValues: {
      email: "",
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email("Invalid email format")
        .required("Email is required"),
    }),
    onSubmit: async (values) => {
      try {
        const resultAction = await dispatch(
          resetPassword({ email: values.email })
        );
        if (resetPassword.fulfilled.match(resultAction)) {
          dispatch(
            showSnackbar({
              message: "Password reset link sent to email!",
              severity: "success",
            })
          );
          navigate("/login");
        } else if (resetPassword.rejected.match(resultAction)) {
          dispatch(
            showSnackbar({
              message:
                resultAction.payload ||
                "An error occurred while resetting your password. Please try again later.",
              severity: "error",
            })
          );
          dispatch(clearErrors());
        }
      } catch (error) {
        console.error("Unexpected error during reset:", error);
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

  return (
    <Container maxWidth="sm">
      <Box
        sx={{
          mt: 8,
          p: 3,
          backgroundColor: "background.paper",
          borderRadius: 2,
          boxShadow: 1,
        }}
      >
        <Typography variant="h4" align="center" gutterBottom>
          Forgot Password
        </Typography>

        <form onSubmit={formik.handleSubmit}>
          <TextField
            label="Email"
            name="email"
            type="email"
            variant="outlined"
            fullWidth
            margin="normal"
            required
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            helperText={
              formik.touched.email && formik.errors.email
                ? formik.errors.email
                : ""
            }
            error={formik.touched.email && Boolean(formik.errors.email)}
          />
          <Button
            variant="contained"
            color="primary"
            fullWidth
            sx={{ mt: 3, mb: 2 }}
            type="submit"
          >
            Submit
          </Button>
        </form>
      </Box>
    </Container>
  );
};

export default ForgotPasswordPage;
