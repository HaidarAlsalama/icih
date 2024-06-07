// Routes.jsx
import { Link, Route } from "react-router-dom";

// const Login = lazy(() => import("./../../pages/auth/Login/Login"));
// const Register = lazy(() => import("./../../pages/auth/Register/Register"));

const AppRoutes = () => {
  return (
    <>
      <Route
        path="/"
        element={
          <>
            <Link className="btn btn-primary" to="/dashboard">
              Go to Dashboard
            </Link>
            <br />
            <Link className="btn btn-danger" to="/login">
              Login
            </Link>
            <br />
            <Link className="btn btn-success" to="/register">
              Register
            </Link>
          </>
        }
      />
      {/* <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} /> */}
    </>
  );
};

export default AppRoutes;
