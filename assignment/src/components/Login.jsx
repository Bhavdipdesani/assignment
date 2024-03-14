import React from "react";
import {
  TextField,
  Button,
  InputAdornment,
  IconButton,
  Box,
  Card,
  CardContent,
  Typography,
} from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import axios from "axios";

function Login() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = React.useState(false);



  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
    },
    validationSchema: Yup.object({
      username: Yup.string()
        .required("Username is required"),
      password: Yup.string().required("Password is required"),
    }),
    onSubmit: async (values) => {
      try {
        if (values.username && values.password) {
          const response = await axios.post('http://3.227.101.169:8020/api/v1/login', {
            "email": "string",
            "phone_number": "string",
            "input_code": 0, password: values.password, username: values.username
          });

          if (response.data.message === "Incorrect Username" || response.data.message === "Incorrect Password") {
            alert(response.data.message);
          } else {
            // Handle success
            localStorage.removeItem('userLogin');
            localStorage.setItem('userLogin', 'Y');
            navigate('/');
          }
        } else {
          // Login failed
          alert("Username and password are required.");
        }
      } catch (error) {
        // Handle error
        alert(error.message);
      }
    },
  });


  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  return (
    <Box
      width="100%"
      height="auto"
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Card
        sx={{
          width: "25rem",
          height: "22rem",
          mt: "4.3rem",
        }}
      >
        <Typography sx={{ fontSize: "1.5rem", m: "0.8rem" }}>Login</Typography>
        <CardContent>
          <form onSubmit={formik.handleSubmit}>
            <Box component={"label"} name="Email" sx={{ fontWeight: 700 }}>
              Username
            </Box>
            <TextField
              sx={{
                mb: "0.5rem",
                "&>div": {
                  height: "2rem",
                },
              }}
              name="username"
              //   label="Email"
              variant="outlined"
              fullWidth
              value={formik.values.username}
              onChange={formik.handleChange}
              error={formik.touched.username && Boolean(formik.errors.username)}
              helperText={formik.touched.username && formik.errors.username}
            />
            <Box component={"label"} name="Password" sx={{ fontWeight: 700 }}>
              Password
            </Box>
            <TextField
              sx={{
                mb: "1rem",
                "&>div": {
                  height: "2rem",
                },
              }}
              type={showPassword ? "text" : "password"}
              name="password"
              variant="outlined"
              fullWidth
              value={formik.values.password}
              onChange={formik.handleChange}
              error={formik.touched.password && Boolean(formik.errors.password)}
              helperText={formik.touched.password && formik.errors.password}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton onClick={togglePasswordVisibility}>
                      {showPassword ? <Visibility /> : <VisibilityOff />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
            <Button
              type="submit"
              color="primary"
              variant="outlined"
              sx={{
                width: "100%",
                bgcolor: "#f0c040",
                mb: "1rem",
                "&:hover": {
                  bgcolor: `#f0c040 !important`,
                },
              }}
            >
              Login
            </Button>
            <Typography sx={{ m: "10px", textAlign: "left" }}>
              No account?<Link to="/register">SignUp!</Link>
            </Typography>
          </form>
        </CardContent>
      </Card>
    </Box>
  );
}

export default Login;
