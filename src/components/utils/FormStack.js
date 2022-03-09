import React from "react";
import Stack from "@mui/material/Stack";

export default function FormStack(props) {
  return (
    <Stack direction="row" spacing={3} mt={1.8}>
      {props.children}
    </Stack>
  );
}
