import * as React from "react";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import Title from "./utils/Title";
import Icon from "@mui/material/Icon";
import Image from "mui-image";
import DashboardBanner from "../assets/images/dashboard2.png";
import Toolbar from "@mui/material/Toolbar";
import { axiosInstance } from "./utils/AxiosInstance";

export default function DashBoardContent() {
  const ratesData = { dollar: "575/579", pound: "745/765", euro: "620/635" };
  return (
    <>
      <Image src={DashboardBanner} alt="Logo" height="600px" fit="cover" />
      <Toolbar />
    </>
  );
}
