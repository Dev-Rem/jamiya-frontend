import React from "react";
import Typography from "@mui/material/Typography";

function Title(props) {
  return (
    <div>
      <Typography
        variant="h6"
        component="h6"
        sx={{ color: "#303030", marginBottom: "10px" }}
      >
        {props.section}
      </Typography>
    </div>
  );
}

export default Title;
