import * as React from "react";
import Image from "mui-image";
import DashboardBanner from "../assets/images/dashboard2.png";
import Toolbar from "@mui/material/Toolbar";

export default function DashBoardContent() {
  React.useEffect(() => {
    console.log(JSON.parse(localStorage.getItem("user")).is_admin);
  }, []);
  return (
    <>
      <Image src={DashboardBanner} alt="Logo" height="600px" fit="cover" />
      <Toolbar />
    </>
  );
}
