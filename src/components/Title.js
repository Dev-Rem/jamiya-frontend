import React from "react";
import Typography from "@mui/material/Typography";

function Title(props) {
  return (
    <div>
      <Typography
        variant="h6"
        component="h6"
        sx={{ color: "#303030", marginTop: "30px", marginBottom: "10px" }}
      >
        {props.section} Report
      </Typography>
    </div>
  );
}

export default Title;
