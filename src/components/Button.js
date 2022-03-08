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
      sx={{
        bgcolor: "white",
        color: "#773E7C",
        borderColor: "#773E7C",
        "&:hover": {
          bgColor: "#EBEBEB",
          borderColor: "#773E7C",
        },
        height: "30px",
      }}
    >
      {props.name}
    </Button>
  );
}
