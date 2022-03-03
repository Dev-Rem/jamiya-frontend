import "./assets/css/style.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import FrontDesk from "./pages/FrontDesk";
import Bank from "./pages/Bank";
import Online from "./pages/Online";
import Hom from "./pages/Hom";
export default function App() {
  return (
    <Router basename={"/"}>
      <Routes>
        <Route exact path={"/dashboard"} element={<Dashboard />} />
        <Route exact path={"/front-desk"} element={<FrontDesk />} />
        <Route exact path={"/bank"} element={<Bank />} />
        <Route exact path={"/online"} element={<Online />} />
        <Route exact path={"/head-of-marketing"} element={<Hom />} />
      </Routes>
    </Router>
  );
}
