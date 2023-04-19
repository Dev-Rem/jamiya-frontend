import "./assets/css/style.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import FrontDesk from "./pages/FrontDesk";
import Bank from "./pages/Bank";
import Online from "./pages/Online";
import Marketing from "./pages/Marketing";
import {
  CustomerLedgerPage,
  AddCustomerLedger,
  ViewCustomerLedger,
} from "./pages/CustomerLedger";
import { GeneralLedger, Rate } from "./pages/GeneralLedger";
import { Reports, ReportDetails } from "./pages/Reports";
import TransactionLog from "./pages/TransactionLog";
import NewTransaction from "./pages/NewTransaction";
import { NewAccount, EditOrDeleteAccount } from "./pages/NewAccount";
import UpdateMoneyIn from "./pages/UpdateMoneyIn";
import TransactionDetails from "./pages/TransactionDetails";
import { LoginPage, RegisterPage, ProfilePage } from "./pages/Auth";
import { PreviewReceipt } from "./pages/PreviewReceipt";

export default function App() {
  const customerLedger = {
    customer: "",
    naira: "",
    dollar: "",
    pound: "",
    euro: "",
    description: "",
    status: "",
  };
  return (
    <Router basename={"/"}>
      <Routes>
        <Route exact path={"/login"} element={<LoginPage />} />
        <Route exact path={"/register"} element={<RegisterPage />} />
        <Route exact path={"/profile"} element={<ProfilePage />} />

        <Route exact path={"/"} element={<Dashboard />} />

        <Route exact path={"/frontdesk"} element={<FrontDesk />} />
        <Route exact path={"/bank"} element={<Bank />} />
        <Route exact path={"/online"} element={<Online />} />
        <Route exact path={"/marketing"} element={<Marketing />} />

        <Route exact path={"/report-logs"} element={<Reports />} />
        <Route exact path={"/general-ledger"} element={<GeneralLedger />} />
        <Route exact path={"/transaction-logs"} element={<TransactionLog />} />

        <Route exact path={"/:section/add-account"} element={<NewAccount />} />
        <Route exact path={"/:section/update-rates"} element={<Rate />} />
        <Route exact path={"/:receipt"} element={<PreviewReceipt />} />

        <Route
          exact
          path={"/customer-ledger"}
          element={<CustomerLedgerPage />}
        />
        <Route
          exact
          path={"/:section/view-transaction"}
          element={<TransactionDetails />}
        />

        <Route
          exact
          path={"/:section/update-account/:id"}
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
          element={<AddCustomerLedger customerLedger={customerLedger} />}
        />
        <Route
          exact
          path={"/:section/view"}
          element={<ViewCustomerLedger customerLedger={customerLedger} />}
        />
      </Routes>
    </Router>
  );
}
