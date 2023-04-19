import React from "react";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";

export const purpleButton = {
  bgcolor: "#773E7C",
  color: "#EBEBEB",
  "&:hover": {
    color: "#773E7C",
    backgroundColor: "#EBEBEB",
  },
  height: "30px",
};

export const deleteButton = {
  bgcolor: "#EBEBEB",
  color: "#773E7C",
  borderColor: "#773E7C",
  "&:hover": {
    bgColor: "white",
    borderColor: "#773E7C",
  },
  height: "30px",
};

export function CancelButton(props) {
  const navigate = useNavigate();
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
      onClick={() => navigate(-1)}
    >
      {props.name}
    </Button>
  );
}
