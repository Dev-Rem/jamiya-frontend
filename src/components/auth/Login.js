import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import FxLogo from "../../assets/images/logo1.png";
import Typography from "@mui/material/Typography";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Copyright from "../utils/Copyright";
import { Link } from "react-router-dom";
import axios from "axios";
import Container from "@mui/material/Container";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import InputAdornment from "@mui/material/InputAdornment";
import Input from "@mui/material/Input";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import IconButton from "@mui/material/IconButton";
import { ErrorAlert } from "../utils/Alerts";
import { useNavigate } from "react-router-dom";

const theme = createTheme();

export default function SignInSide() {
  const navigate = useNavigate();
  const [alert, setAlert] = React.useState(false);
  const [showPassword, setShowPassword] = React.useState(false);
  const [value, setValue] = React.useState({
    username: "",
    password: "",
  });

  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };
  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const { data } = await axios.post(
        `http://127.0.0.1:8000/api/tokens/`,
        value,
        { headers: { "Content-Type": "application/json" } },
        { withCredentials: true }
      );
      navigate("/");
      localStorage.clear();

      localStorage.setItem("access_token", data.access);
      localStorage.setItem("refresh_token", data.refresh);
    } catch (error) {
      console.log(error);
    }
  };

  const handleChange = (event) => {
    const val = event.target.value;
    const key = event.target.name;
    setValue((prevState) => {
      return { ...prevState, [key]: val };
    });
  };
  return (
    <ThemeProvider theme={theme}>
      <>
        {/* {alert ? (
          <ErrorAlert message="Incorrect username or password" />
        ) : (
          <></>
        )} */}
      </>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            my: 8,
            mx: 4,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar
            src={FxLogo}
            sx={{ width: 75, height: 56, margin: 3 }}
            variant="rounded"
          />
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <Box
            component="form"
            noValidate
            onSubmit={handleSubmit}
            sx={{ mt: 1 }}
          >
            <Grid container spacing={2}>
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
                <FormControl variant="standard" fullWidth required>
                  <InputLabel htmlFor="standard-adornment-password">
                    Password
                  </InputLabel>
                  <Input
                    id="standard-adornment-password"
                    type={showPassword ? "text" : "password"}
                    onChange={handleChange}
                    variant="standard"
                    label="Password"
                    name="password"
                    endAdornment={
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={handleClickShowPassword}
                          onMouseDown={handleMouseDownPassword}
                        >
                          {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    }
                  />
                </FormControl>
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{
                mt: 3,
                mb: 2,
                background: "linear-gradient(45deg, #773E7C 30%, #000000 90%)",
                bgcolor: "#925098",
                height: 50,
              }}
            >
              Sign In
            </Button>
            <Grid container>
              <Grid item xs>
                <Link to="#">Forgot password?</Link>
              </Grid>
              <Grid item>
                Don't have an account?
                <Link to="/register">{"Sign Up"}</Link>
              </Grid>
            </Grid>
            <Copyright sx={{ mt: 5 }} />
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
