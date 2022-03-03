import * as React from "react";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import { createTheme, ThemeProvider, styled } from "@mui/material/styles";
import "../assets/css/style.css";

const Item = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  textAlign: "center",
  color: "black",
  height: 60,
  lineHeight: "60px",
  marginRight: "30px",
}));

const lightTheme = createTheme({ palette: { mode: "light" } });

export default function Rates() {
  return (
    <Grid container>
      {[lightTheme].map((theme, index) => (
        <Grid item xs={3} key={index}>
          <ThemeProvider theme={theme}>
            <Item>
              <h2 className="rates">Todays Rates =&gt; </h2>
            </Item>
          </ThemeProvider>
        </Grid>
      ))}
      {[lightTheme].map((theme, index) => (
        <Grid item xs={3} key={index}>
          <ThemeProvider theme={theme}>
            <Item>
              <h2 className="rates">Dollar: 575/580</h2>
            </Item>
          </ThemeProvider>
        </Grid>
      ))}
      {[lightTheme].map((theme, index) => (
        <Grid item xs={3} key={index}>
          <ThemeProvider theme={theme}>
            <Item>
              {" "}
              <h2 className="rates">Pound: 740/790</h2>
            </Item>
          </ThemeProvider>
        </Grid>
      ))}
      {[lightTheme].map((theme, index) => (
        <Grid item xs={3} key={index}>
          <ThemeProvider theme={theme}>
            <Item>
              <Typography variant="h5" component="div">
                Euro: 635/650
              </Typography>
            </Item>
          </ThemeProvider>
        </Grid>
      ))}
    </Grid>
  );
}
