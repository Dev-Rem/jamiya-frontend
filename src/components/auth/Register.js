import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import FxLogo from "../../assets/images/logo1.png";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Copyright from "../utils/Copyright";
import SimpleBackdrop from "../utils/Backdrop";
import axios from "axios";
import { ErrorAlert } from "../utils/Alerts";
import { Link, useNavigate, useParams } from "react-router-dom";

const theme = createTheme();

export default function SignUp() {
  const navigate = useNavigate();
  // set initialState for register component form
  const [alert, setAlert] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const [value, setValue] = React.useState({
    username: "",
    password: "",
    first_name: "",
    last_name: "",
    confirm_password: "",
  });

  // handle user register submit button
  const handleChange = (event) => {
    const val = event.target.value;
    const key = event.target.name;
    setValue((prevState) => {
      return { ...prevState, [key]: val };
    });
  };

  const handleSubmit = async (event) => {
    if (value.password === value.confirm_password) {
      delete value.confirm_password;
      navigate("/login");
      const response = await axios.post(
        "http://127.0.0.1:8000/api/users/register/",
        value,
        { headers: { "Content-Type": "application/json" } },
        { withCredentials: true }
      );
    } else {
      event.preventDefault();
      setAlert(true);
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <>{alert ? <ErrorAlert message="Passwords do not match" /> : <></>}</>
      {loading ? <SimpleBackdrop /> : <></>}
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar
            src={FxLogo}
            sx={{ width: 75, height: 56 }}
            variant="rounded"
          />

          <Typography component="h1" variant="h5">
            Sign up
          </Typography>
          <Box
            component="form"
            noValidate
            onSubmit={handleSubmit}
            sx={{ mt: 3 }}
          >
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="given-name"
                  name="first_name"
                  required
                  fullWidth
                  label="First Name"
                  autoFocus
                  id="standard-basic"
                  variant="standard"
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="standard-basic"
                  variant="standard"
                  label="Last Name"
                  name="last_name"
                  autoComplete="family-name"
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="standard-basic"
                  variant="standard"
                  label="Username"
                  name="username"
                  autoComplete="username"
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="standard-basic"
                  variant="standard"
                  label="Email"
                  name="email"
                  autoComplete="email"
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="standard-basic"
                  variant="standard"
                  autoComplete="new-password"
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="confirm_password"
                  label="Confirm Password"
                  type="password"
                  id="standard-basic"
                  variant="standard"
                  autoComplete="new-password"
                  onChange={handleChange}
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{
                mt: 3,
                mb: 2,
                background: "linear-gradient(45deg, #C9037F 30%, #000000 90%)",
                bgcolor: "#925098",
                height: 50,
              }}
            >
              Sign Up
            </Button>
            <Grid container justifyContent="center">
              <Grid item>
                Already have an account?
                <Link to="/login" variant="body2">
                  Sign in
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Copyright sx={{ mt: 5 }} />
      </Container>
    </ThemeProvider>
  );
}
