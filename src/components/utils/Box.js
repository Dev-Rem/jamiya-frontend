import React from "react";
import Box from "@mui/material/Box";

export default function PageBox(props) {
  return (
    <Box
      sx={{
        backgroundColor: "white",
        borderRadius: 1,
        padding: 3,
      }}
    >
      {props.children}
    </Box>
  );
}
