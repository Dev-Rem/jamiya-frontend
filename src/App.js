import "./assets/css/style.css";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Redirect,
} from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import DailyReport from "./pages/DailyReport";
import NewTransaction from "./pages/NewTransaction";
import { NewAccount, EditOrDeleteAccount } from "./pages/NewAccount";
import UpdateBalances from "./pages/UpdateBalances";
import { TransactionDetails } from "./pages/TransactionDetails";
import { LoginPage, RegisterPage, ProfilePage } from "./pages/Auth";
import { PreviewReceipt } from "./pages/PreviewReceipt";
import { GeneralLedger, Rate, ViewGeneralLedger } from "./pages/GeneralLedger";
import {
  CustomerLedgerPage,
  AddCustomerLedger,
  ViewCustomerLedger,
} from "./pages/CustomerLedger";
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

export default function App() {
  return (
    <Router basename={"/"}>
      <Routes>
        {/* Public routes */}
        <Route exact path={"/"} element={<LoginPage />} />
        <Route exact path={"/register"} element={<RegisterPage />} />
        <Route exact path={"/profile"} element={<ProfilePage />} />
        <Route exact path={"/dashboard"} element={<Dashboard />} />
        <Route
          exact
          path={"/:section/view-transaction"}
          element={<TransactionDetails />}
        />

        <Route
          exact
          path={"/:receiptnumber/transaction-receipt"}
          element={<PreviewReceipt />}
        />

        {/* {JSON.parse(localStorage.getItem("user")).is_staff === false ? ( */}
        <>
          <Route
            exact
            path={"/:section/update-balances"}
            element={<UpdateBalances />}
          />
          <Route exact path={"/report"} element={<DailyReport />} />

          <Route exact path={"/new-transaction"} element={<NewTransaction />} />
          <Route exact path={"/my-transactions"} element={<MyTransactions />} />
        </>
        {/* ) : (
          <></>
        )} */}

        {/* admin  routes */}
        {/* {JSON.parse(localStorage.getItem("user")).is_admin === true ? ( */}
        <>
          <Route exact path={"/report-logs"} element={<ReportList />} />
          <Route
            exact
            path={"/transaction-logs"}
            element={<TransactionLog />}
          />
          <Route exact path={"/report-details"} element={<ReportDetails />} />
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
        </>
        {/* ) : (
          <></>
        )} */}

        {/* admin and staff routes */}
        {/* {JSON.parse(localStorage.getItem("user")).is_admin === true &&
        JSON.parse(localStorage.getItem("user")).is_staff === true ? ( */}
        <>
          <Route exact path={"/general-ledger"} element={<GeneralLedger />} />
          <Route
            exact
            path={"/ledger-details"}
            element={<ViewGeneralLedger />}
          />
          <Route
            exact
            path={"/:section/add-account"}
            element={<NewAccount />}
          />
          <Route exact path={"/:section/update-rates"} element={<Rate />} />
          <Route exact path={"/:section/add"} element={<AddCustomerLedger />} />
          <Route
            exact
            path={"/:section/view"}
            element={<ViewCustomerLedger />}
          />
          <Route
            exact
            path={"/:section/update-account"}
            element={<EditOrDeleteAccount />}
          />
          <Route
            exact
            path={"/customer-ledger"}
            element={<CustomerLedgerPage />}
          />
        </>
        {/* ) : (
          <></>
        )} */}
      </Routes>
    </Router>
  );
}
