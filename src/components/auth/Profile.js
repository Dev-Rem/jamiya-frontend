import * as React from "react";
import PageBox from "../utils/Box";
import Title from "../utils/Title";
import Typography from "@mui/material/Typography";

export function UserProfile() {
  const [user, setUser] = React.useState(
    JSON.parse(localStorage.getItem("user"))
  );
  return (
    <>
      <Title section="User Profile" />
      <PageBox>
        <Typography variant="h6" gutterBottom>
          {" "}
          Name: {user.first_name} {user.last_name}
        </Typography>
        <Typography variant="h6" gutterBottom>
          {" "}
          Username: {user.username}
        </Typography>
        <Typography variant="h6" gutterBottom>
          {" "}
          Email: {user.email}
        </Typography>
        <Typography variant="h6" gutterBottom>
          {" "}
          Station: {user.station}
        </Typography>
      </PageBox>
    </>
  );
}
