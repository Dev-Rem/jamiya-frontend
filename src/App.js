import "./assets/css/style.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Dashboard from "./components/Dashboard";
import FrontDesk from "./components/FrontDesk";
function App() {
  return (
    <Router basename={"/"}>
      <Routes>
        <Route exact path={"/dashboard"} element={<Dashboard />} />
        <Route exact path={"/front-desk"} element={<FrontDesk />} />
      </Routes>
    </Router>
  );
}

export default App;
