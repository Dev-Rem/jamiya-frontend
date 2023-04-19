import * as React from "react";
import PageBox from "../utils/Box";
import Title from "../utils/Title";
import { axiosInstance } from "../utils/AxiosInstance";
import Typography from "@mui/material/Typography";

export function UserProfile() {
  const [userInfo, setUserInfo] = React.useState({});
  const getUser = async () => {
    const user = await axiosInstance.get(
      "/users/detail/",
      { headers: { "Content-Type": "application/json" } },
      { withCredentials: true }
    );
    setUserInfo(user.data);
    localStorage.setItem("user", JSON.stringify(user.data));
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
          Name: {userInfo.first_name} {userInfo.last_name}
        </Typography>
        <Typography variant="h6" gutterBottom>
          {" "}
          Username: {userInfo.username}
        </Typography>
        <Typography variant="h6" gutterBottom>
          {" "}
          Email: {userInfo.email}
        </Typography>
        <Typography variant="h6" gutterBottom>
          {" "}
          Role: Front Desk
        </Typography>
      </PageBox>
    </>
  );
}
