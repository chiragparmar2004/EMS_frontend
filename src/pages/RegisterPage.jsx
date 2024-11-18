import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import {
  Container,
  TextField,
  Button,
  Typography,
  Box,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormLabel,
} from "@mui/material";
import { register, clearErrors } from "../store/slices/user.slice.js";
import { showSnackbar } from "../store/slices/snackbar.slice.js";

function RegisterPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const loading = useSelector((state) => state.user.auth.loading);

  const validationSchema = Yup.object({
    firstName: Yup.string().required("First name is required"),
    lastName: Yup.string().required("Last name is required"),
    email: Yup.string()
      .email("Enter a valid email")
      .required("Email is required"),
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

    position: Yup.string().required("Position is required"),
    phoneNumber: Yup.string()
      .matches(/^[0-9]+$/, "Phone number must contain only digits")
      .matches(/^\d{10}$/, "Phone number must be exactly 10 digits")
      .required("Phone number is required"),
    gender: Yup.string().required("Gender is required"), // Add gender validation
  });

  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      position: "",
      phoneNumber: "",
      gender: "",
    },
    validationSchema,
    onSubmit: async (values) => {
      const resultAction = await dispatch(register(values));
      if (register.fulfilled.match(resultAction)) {
        dispatch(
          showSnackbar({
            message: resultAction.payload,
            severity: "success",
          })
        );
        navigate("/login");
      } else if (register.rejected.match(resultAction)) {
        dispatch(
          showSnackbar({
            message:
              resultAction.payload || "Registration failed. Please try again.",
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
          Register
        </Typography>
        <form onSubmit={formik.handleSubmit}>
          <TextField
            label="First Name"
            name="firstName"
            variant="outlined"
            fullWidth
            margin="normal"
            required
            value={formik.values.firstName}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.firstName && Boolean(formik.errors.firstName)}
            helperText={formik.touched.firstName && formik.errors.firstName}
          />
          <TextField
            label="Last Name"
            name="lastName"
            variant="outlined"
            fullWidth
            margin="normal"
            required
            value={formik.values.lastName}
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            error={formik.touched.lastName && Boolean(formik.errors.lastName)}
            helperText={formik.touched.lastName && formik.errors.lastName}
          />
          <FormLabel component="legend" sx={{ mt: 2 }}>
            Gender
          </FormLabel>
          <RadioGroup
            name="gender"
            value={formik.values.gender}
            onChange={formik.handleChange}
            row
          >
            <FormControlLabel
              value="Male"
              control={<Radio color="primary" />}
              label="Male"
            />
            <FormControlLabel
              value="Female"
              control={<Radio color="primary" />}
              label="Female"
            />
            <FormControlLabel
              value="Other"
              control={<Radio color="primary" />}
              label="Other"
            />
          </RadioGroup>
          {formik.touched.gender && formik.errors.gender && (
            <Typography color="error" variant="body2">
              {formik.errors.gender}
            </Typography>
          )}

          <TextField
            label="Email"
            name="email"
            type="email"
            variant="outlined"
            fullWidth
            margin="normal"
            required
            value={formik.values.email}
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            error={formik.touched.email && Boolean(formik.errors.email)}
            helperText={formik.touched.email && formik.errors.email}
          />
          <TextField
            label="Password"
            name="password"
            type="password"
            variant="outlined"
            fullWidth
            margin="normal"
            required
            onBlur={formik.handleBlur}
            value={formik.values.password}
            onChange={formik.handleChange}
            error={formik.touched.password && Boolean(formik.errors.password)}
            helperText={formik.touched.password && formik.errors.password}
          />
          <FormLabel component="legend" sx={{ mt: 2 }}>
            Position
          </FormLabel>
          <RadioGroup
            name="position"
            value={formik.values.position}
            onChange={formik.handleChange}
            row
          >
            <FormControlLabel
              value="hr"
              control={<Radio color="primary" />}
              label="HR"
            />
            <FormControlLabel
              value="manager"
              control={<Radio color="primary" />}
              label="Manager"
            />
            <FormControlLabel
              value="admin"
              control={<Radio color="primary" />}
              label="Admin"
            />
          </RadioGroup>
          {formik.touched.position && formik.errors.position && (
            <Typography color="error" variant="body2">
              {formik.errors.position}
            </Typography>
          )}
          <TextField
            label="Phone Number"
            name="phoneNumber"
            type="tel"
            variant="outlined"
            fullWidth
            margin="normal"
            value={formik.values.phoneNumber}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={
              formik.touched.phoneNumber && Boolean(formik.errors.phoneNumber)
            }
            helperText={formik.touched.phoneNumber && formik.errors.phoneNumber}
          />

          <Button
            variant="contained"
            color="primary"
            fullWidth
            sx={{
              mt: 3,
              mb: 2,
              color: (theme) => theme.palette.text.contrastText,
              "&.Mui-disabled": {
                backgroundColor: (theme) => theme.palette.primary.main,
                color: (theme) => theme.palette.text.contrastText,
              },
            }}
            type="submit"
            disabled={loading}
          >
            {loading ? "Registering..." : "Register"}
          </Button>
        </form>
      </Box>
    </Container>
  );
}

export default RegisterPage;
