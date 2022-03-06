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

export default function App() {
  return (
    <Router basename={"/"}>
      <Routes>
        <Route exact path={"/dashboard"} element={<Dashboard />} />
        <Route exact path={"/front-desk"} element={<FrontDesk />} />
        <Route exact path={"/bank"} element={<Bank />} />
        <Route exact path={"/online"} element={<Online />} />
        <Route exact path={"/marketing"} element={<Marketing />} />
        <Route exact path={"/reports"} element={<Reports />} />
        <Route exact path={"/customer-ledger"} element={<CustomerLedger />} />
        <Route exact path={"/general-ledger"} element={<GeneralLedger />} />
        <Route exact path={"/transaction-log"} element={<TransactionLog />} />
      </Routes>
    </Router>
  );
}
