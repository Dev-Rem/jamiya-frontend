import "./assets/css/style.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import DailyReport from "./pages/DailyReport";
import {
  CustomerLedgerPage,
  AddCustomerLedger,
  ViewCustomerLedger,
} from "./pages/CustomerLedger";
import { GeneralLedger, Rate, ViewGeneralLedger } from "./pages/GeneralLedger";
import {
  ReportList,
  ReportDetails,
  SearchedReportResults,
} from "./pages/Reports";
import {
  TransactionLog,
  SearchedTransactionResults,
  MyTransactions,
} from "./pages/TransactionLog";
import NewTransaction from "./pages/NewTransaction";
import { NewAccount, EditOrDeleteAccount } from "./pages/NewAccount";
import UpdateMoneyIn from "./pages/UpdateMoneyIn";
import { TransactionDetails } from "./pages/TransactionDetails";
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

        <Route exact path={"/report"} element={<DailyReport />} />

        <Route exact path={"/report-logs"} element={<ReportList />} />
        <Route exact path={"/report-details"} element={<ReportDetails />} />
        <Route exact path={"/transaction-logs"} element={<TransactionLog />} />
        <Route exact path={"/new-transaction"} element={<NewTransaction />} />
        <Route exact path={"/my-transactions"} element={<MyTransactions />} />

        <Route exact path={"/general-ledger"} element={<GeneralLedger />} />
        <Route exact path={"/ledger-details"} element={<ViewGeneralLedger />} />
        <Route exact path={"/:section/add-account"} element={<NewAccount />} />
        <Route exact path={"/:section/update-rates"} element={<Rate />} />

        <Route exact path={"/:section/add"} element={<AddCustomerLedger />} />
        <Route exact path={"/:section/view"} element={<ViewCustomerLedger />} />
        <Route
          exact
          path={"/:search/report/search-results"}
          element={<SearchedReportResults />}
        />
        <Route
          exact
          path={"/:search/transaction/search-results"}
          element={<SearchedTransactionResults />}
        />

        <Route
          exact
          path={"/:receiptNumber/receipt"}
          element={<PreviewReceipt />}
        />

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
          path={"/:section/update-balances"}
          element={<UpdateMoneyIn />}
        />
      </Routes>
    </Router>
  );
}
