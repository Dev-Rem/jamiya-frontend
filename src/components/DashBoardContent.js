import * as React from "react";
import Image from "mui-image";
import DashboardBanner from "../assets/images/dashboard2.png";
import Toolbar from "@mui/material/Toolbar";
import { TransactionList } from "./report/TransactionList";
import { axiosInstance } from "./utils/AxiosInstance";
import Pagination from "@mui/material/Pagination";
import FormStack from "./utils/FormStack";

export default function DashBoardContent() {
  const [transactions, setTransactions] = React.useState([]);
  const [currentPage, setCurrentPage] = React.useState(1);
  const [totalPages, setTotalPages] = React.useState(0);
  const [todaysDate, setTodaysDate] = React.useState();

  const getTransactions = async (page) => {
    try {
      const response = await axiosInstance.get(`/transactions`, {
        params: {
          page: page,
        },
      });
      setTransactions(response.data.results);
      setTotalPages(Math.ceil(response.data.count / 10));
    } catch (error) {
      console.log(error);
    }
  };

  const handlePageChange = (event, page) => {
    setCurrentPage(page);
    getTransactions(page);
  };
  React.useEffect(() => {
    setTodaysDate(() => {
      const today = new Date();
      const year = today.getFullYear();
      const month = String(today.getMonth() + 1).padStart(2, "0");
      const day = String(today.getDate()).padStart(2, "0");
      return `${year}-${month}-${day}`;
    });
    setTimeout(getTransactions, 2000);
  }, []);
  return (
    <>
      {JSON.parse(localStorage.getItem("user"))?.station === "ONLINE" ? (
        <>
          <TransactionList
            data={transactions.filter(
              (transaction) =>
                transaction.status === "SENT" &&
                transaction.date_created === todaysDate
            )}
          />
          <FormStack />
          <Pagination
            count={totalPages}
            page={currentPage}
            onChange={handlePageChange}
          />
        </>
      ) : JSON.parse(localStorage.getItem("user"))?.station ===
        "HEAD OF OPERATIONS" ? (
        <>
          <TransactionList
            data={transactions.filter(
              (transaction) =>
                (transaction.status === "SENT" ||
                  transaction.status === "INITIATED") &&
                transaction.date_created === todaysDate
            )}
          />
          <FormStack />
          <Pagination
            count={totalPages}
            page={currentPage}
            onChange={handlePageChange}
          />
        </>
      ) : (
        <Image src={DashboardBanner} alt="Logo" height="600px" fit="cover" />
      )}
      <Toolbar />
    </>
  );
}
