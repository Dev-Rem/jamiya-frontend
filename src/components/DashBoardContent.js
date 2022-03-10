import * as React from "react";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import Title from "./utils/Title";
import Icon from "@mui/material/Icon";
import Image from "mui-image";
import DashboardBanner from "../assets/images/dashboard1.jpeg";

function Boxes(props) {
  return (
    <>
      <Stack
        direction={{ xs: "column", sm: "row" }}
        spacing={{ xs: 1, sm: 2, md: 2 }}
        mt={1.8}
      >
        <Paper sx={{ height: 100, minWidth: 280, padding: 2 }}>
          <Stack width={80} sx={{ margin: 0 }}>
            <Icon
              align="left"
              width={3}
              sx={{ fontSize: "50px", color: "#773E7C" }}
            >
              $
            </Icon>
          </Stack>
          <Typography sx={{ textAlign: "right", mt: -4, fontSize: "25px" }}>
            {props.data.dollar}
          </Typography>
        </Paper>
        <Paper sx={{ height: 100, minWidth: 280, padding: 2 }}>
          <Stack width={80} sx={{ margin: 0 }}>
            <Icon
              align="left"
              width={3}
              sx={{ fontSize: "50px", color: "#773E7C" }}
            >
              £
            </Icon>
          </Stack>
          <Typography sx={{ textAlign: "right", mt: -4, fontSize: "25px" }}>
            {props.data.pound}
          </Typography>
        </Paper>
        <Paper sx={{ height: 100, minWidth: 280, padding: 2 }}>
          <Stack width={80} sx={{ margin: 0 }}>
            <Icon
              align="left"
              width={3}
              sx={{ fontSize: "50px", color: "#773E7C" }}
            >
              €
            </Icon>
          </Stack>
          <Typography sx={{ textAlign: "right", mt: -4, fontSize: "25px" }}>
            {props.data.euro}
          </Typography>
        </Paper>
      </Stack>
    </>
  );
}

export default function DashBoardContent() {
  const ratesData = { dollar: "575/579", pound: "745/765", euro: "620/635" };
  const purchasesData = { dollar: 23434, pound: 3400, euro: 10200 };
  return (
    <>
      <Image src={DashboardBanner} alt="Logo" height="500px" fit="fit" />

      <Title section="Rates for Today" />
      <Boxes data={ratesData} />

      <Title section="Total purchases" />
      <Boxes data={purchasesData} />
      <Title section="Total Sales" />
      <Boxes data={purchasesData} />
    </>
  );
}
