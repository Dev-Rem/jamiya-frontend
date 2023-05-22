import React from "react";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";

export const purpleButton = {
  bgcolor: "#C9037F",
  color: "#EBEBEB",
  "&:hover": {
    color: "#C9037F",
    backgroundColor: "#EBEBEB",
  },
  height: "30px",
};

export const deleteButton = {
  bgcolor: "red",
  color: "#ffffff",
  "&:hover": {
    backgroundColor: "#EBEBEB",
    color: "red",
  },
  height: "30px",
};

export function CancelButton(props) {
  const navigate = useNavigate();
  return (
    <Button
      variant="outlined"
      sx={{
        bgcolor: "#ffffff",
        color: "#C9037F",
        borderColor: "#C9037F",
        "&:hover": {
          backgroundColor: "#EBEBEB",
          borderColor: "#ffffff",
        },
        height: "30px",
      }}
      onClick={() => navigate(-1)}
    >
      {props.name}
    </Button>
  );
}
