import React from "react";
import ResponsiveDrawer from "../components/appbar/AppBar";
import { TransactionList } from "../components/report/TransactionList";
import Title from "../components/utils/Title";
import { Filters } from "../components/utils/Filters";
import { axiosInstance } from "../components/utils/AxiosInstance";

export default function TransactionLog() {
  const [value, setValue] = React.useState([]);

  const fetchTransactionData = async () => {
    try {
      const transactionData = await axiosInstance.get(`/transactions`);
      setValue(transactionData.data.results);
    } catch (error) {
      console.log(error);
    }
  };
  React.useEffect(() => {
    fetchTransactionData();
  }, []);
  return (
    <div>
      {" "}
      <ResponsiveDrawer>
        <Title section="Transaction Log" />
        <Filters />
        <TransactionList data={value} />
      </ResponsiveDrawer>{" "}
    </div>
  );
}
