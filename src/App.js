import "./assets/css/style.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import FrontDesk from "./pages/FrontDesk";
import Bank from "./pages/Bank";
import Online from "./pages/Online";
import Marketing from "./pages/Marketing";
import CustomerLedger from "./pages/CustomerLedger";
import GeneralLedger from "./pages/GeneralLedger";
import Reports from "./pages/Reports";
import TransactionLog from "./pages/TransactionLog";
import NewTransaction from "./pages/NewTransaction";
import NewCustomerLedger from "./pages/NewCustomerLedger";
import { NewAccount, EditOrDeleteAccount } from "./pages/NewAccount";
import UpdateMoneyIn from "./pages/UpdateMoneyIn";
import { ReportDetails } from "./pages/ReportDetails";
import TransactionDetails from "./pages/TransactionDetails";
import { LoginPage, RegisterPage } from "./pages/Auth";

export default function App() {
  const customerLedger = {
    customer: "Aremu",
    naira: "300",
    dollar: "",
    pound: "",
    euro: "",
    description: "",
    status: "",
  };
  return (
    <Router basename={"/"}>
      <Routes>
        <Route exact path={"/"} element={<LoginPage />} />
        <Route exact path={"/register"} element={<RegisterPage />} />
        <Route exact path={"/dashboard"} element={<Dashboard />} />
        <Route exact path={"/front-desk"} element={<FrontDesk />} />
        <Route exact path={"/bank"} element={<Bank />} />
        <Route exact path={"/online"} element={<Online />} />
        <Route exact path={"/marketing"} element={<Marketing />} />
        <Route exact path={"/report-logs"} element={<Reports />} />
        <Route exact path={"/customer-ledger"} element={<CustomerLedger />} />
        <Route exact path={"/general-ledger"} element={<GeneralLedger />} />
        <Route exact path={"/transaction-logs"} element={<TransactionLog />} />
        <Route exact path={"/:section/add-account"} element={<NewAccount />} />
        <Route
          exact
          path={"/:section/view-transaction-details"}
          element={<TransactionDetails />}
        />

        <Route
          exact
          path={"/:section/update-account"}
          element={<EditOrDeleteAccount />}
        />

        <Route
          exact
          path={"/:section/report-details"}
          element={<ReportDetails />}
        />

        <Route
          exact
          path={"/:section/new-transaction"}
          element={<NewTransaction />}
        />
        <Route
          exact
          path={"/:section/update-balances"}
          element={<UpdateMoneyIn />}
        />
        <Route
          exact
          path={"/:section/add"}
          element={<NewCustomerLedger customerLedger={customerLedger} />}
        />
      </Routes>
    </Router>
  );
}
