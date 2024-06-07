import { Route, Routes } from "react-router-dom";
import "./App.scss";
import { Spinner, ThemeToggle } from "./components";
// import Dashboard from "./pages/Dashboard/Dashboard";
// import Settings from "./pages/Settings/Settings";
import { Suspense, lazy, useEffect } from "react";
// import Testing_1 from "./pages/Testing/Testing_1";
import { useSelector } from "react-redux";
import Alert from "./components/Alert/Alert";
import PublicLayoutPages from "./components/PublicLayoutPages/PublicLayoutPages";
import Logout from "./pages/Logout/Logout";
import { Error403, Error404 } from "./pages/errors";
import { changeLanguage } from "./lang";

const DashboardRouter = lazy(() =>
  import("./pages/DashboardRouter/DashboardRouter")
);
const Login = lazy(() => import("./pages/auth/Login/Login"));
const Register = lazy(() => import("./pages/auth/Register/Register"));

const Home = lazy(() => import("./pages/Home/Home"));
const ShowDividers = lazy(() => import("./pages/ShowDividers/ShowDividers"));
const ReservationForm = lazy(() =>
  import("./pages/ReservationForm/ReservationForm")
);
const ShowMyRequests = lazy(() =>
  import("./pages/ShowMyRequests/ShowMyRequests")
);

const PrintPage = lazy(() => import("./pages/PrintPage/PrintPage"));
const FatoraPayments = lazy(() => import("./pages/FatoraPayments/FatoraPayments"));

function App() {
  const { role } = useSelector((state) => state.auth);
  useEffect(() => {
      document.documentElement.lang = "ar";
      document.documentElement.dir = "rtl";
      changeLanguage("ar");
   
  }, []);

  // useEffect(() => {
  //   setInterval(() => {debugger},3)
  // })
   

  return (
    <Suspense fallback={<Spinner page />}>
      <Routes>
        {role == "employee" ? (
          <Route path="/dashboard/*" element={<DashboardRouter />} />
        ) : null}

        <Route path="/print-page" element={<PrintPage />} />

        <Route element={<PublicLayoutPages />}>
          <Route path="/" element={<Home />} />
          <Route path="/show-dividers" element={<ShowDividers />} />

          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/reservation-form" element={<ReservationForm />} />
          <Route path="/show-my-requests" element={<ShowMyRequests />} />
          <Route path="/fatora-payment" element={<FatoraPayments />} />

          <Route path="/logout" element={<Logout />} />
          <Route
            path="/forbidden"
            element={<Error403 navigateTo={"/"} timer={10000} />}
          />
          <Route
            path="*"
            element={<Error404 navigateTo={"/"} timer={10000} />}
          />
        </Route>
      </Routes>
      <ThemeToggle />
      <Alert />
    </Suspense>
  );
}

export default App;
