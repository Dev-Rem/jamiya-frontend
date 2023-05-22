import * as React from "react";
import PageBox from "../utils/Box";
import Title from "../utils/Title";
import { axiosInstance } from "../utils/AxiosInstance";
import Typography from "@mui/material/Typography";

export function UserProfile() {
  const [user, setUser] = React.useState({});
  const getUser = async () => {
    const response = await axiosInstance.get(
      "/users/detail/",
      { headers: { "Content-Type": "application/json" } },
      { withCredentials: true }
    );
    setUser(response.data);
    localStorage.setItem("user", JSON.stringify(response.data));
  };
  React.useEffect(() => {
    getUser();
  });
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
          Role: Front Desk
        </Typography>
      </PageBox>
    </>
  );
}
