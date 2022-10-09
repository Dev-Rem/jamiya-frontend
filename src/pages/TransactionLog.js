import React from "react";
import ResponsiveDrawer from "../components/appbar/AppBar";
import { TransactionList } from "../components/report/TransactionList";
import Title from "../components/utils/Title";
import { Filters } from "../components/utils/Filters";

const data = [
  {
    beneficiaries: "SINGLE_PAYMENT",
    customer_name1: "Aremu Oluwaseyi Festus",
    account_number1: "0235770003",
    bank_name1: "GTB",
    phone_number: "08034164740",
    address: "No. 5 Adiss Aluminium Crescent, Kubwa Anuja",
    recieve_mode: "CASH",
    currency_recieved: "DOLLAR",
    amount_recieved: 100,
    give_mode: "CASH",
    rate: 575,
    currency_given: "NAIRA",
    cash_given: 57500,
    amount_transfered: 0,
    description: "TEST",
    initiator: "FRONTDESK",
    status: "SENT",
    categories: "PURCHASE",
    profit: 0.0,
  },
  {
    beneficiaries: "SINGLE_PAYMENT",
    customer_name1: "Aremu Oluwaseyi Festus",
    account_number1: "0235770003",
    bank_name1: "GTB",
    phone_number: "08034164740",
    address: "No. 5 Adiss Aluminium Crescent, Kubwa Anuja",
    recieve_mode: "CASH",
    currency_recieved: "DOLLAR",
    amount_recieved: 100,
    give_mode: "CASH",
    rate: 575,
    currency_given: "NAIRA",
    cash_given: 57500,
    amount_transfered: 0,
    description: "TEST",
    initiator: "FRONTDESK",
    status: "SENT",
    categories: "PURCHASE",
    profit: 0.0,
  },
];

export default function TransactionLog() {
  return (
    <div>
      {" "}
      <ResponsiveDrawer>
        <Title section="Transaction Log" />
        <Filters />
        <TransactionList data={data} />
      </ResponsiveDrawer>{" "}
    </div>
  );
}
