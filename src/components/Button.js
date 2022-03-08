import React from "react";
import Button from "@mui/material/Button";

export function PurpleButton(props) {
  return (
    <Button
      variant="text"
      sx={{
        bgcolor: "#773E7C",
        color: "#EBEBEB",
        "&:hover": {
          color: "#773E7C",
          backgroundColor: "#EBEBEB",
        },
        height: "30px",
      }}
    >
      {props.name}
    </Button>
  );
}

export function CancelButton(props) {
  return (
    <Button
      variant="outlined"
      // color="#EBEBEB"
      sx={{
        bgcolor: "#EBEBEB",
        color: "#773E7C",
        borderColor: "#773E7C",
        "&:hover": {
          borderColor: "#773E7C",
        },
        height: "30px",
      }}
    >
      {props.name}
    </Button>
  );
}
