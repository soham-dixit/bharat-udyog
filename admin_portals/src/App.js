import React, { lazy, useContext } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import { Toaster } from "react-hot-toast";

import AccessibleNavigationAnnouncer from "./components/AccessibleNavigationAnnouncer";
import AdminProtectedRoute from "./routes/admin/AdminProtectedRoute";
import adminRoutes from "./routes/admin/adminRoutes";
import PostMasterProtectedRoute from "./routes/postMaster/postMasterProtectedRoute";
import postMasterRoutes from "./routes/postMaster/postMasterRoutes";
import CustomProtectedRoute from "./routes/custom/customProtectedRoute";
import customRoutes from "./routes/custom/customRoutes";
import Register from "./pages/Register";
import RegisterModal from "./components/Registermodel";
// import UserContext from "./context/User/UserContext";

const Layout = lazy(() => import("./containers/Layout"));
const Login = lazy(() => import("./pages/Login"));

const otp = lazy(() => import("./pages/OTP"));
const ForgotPassword = lazy(() => import("./pages/ForgotPassword"));

function App() {
  return (
    <>
      {/* <ModalPage /> */}
      <RegisterModal />
      <Toaster position="top-right" reverseOrder={false} />
      <Router>
        <AccessibleNavigationAnnouncer />
        <Switch>
          <Route path="/login" component={Login} />
          <Route path="/forgot-password" component={ForgotPassword} />
          <Route path="/otp" component={otp} />
          <Route path="/register" component={Register} />

          <AdminProtectedRoute
            path="/app/admin"
            component={(props) => <Layout routes={adminRoutes} role="admin" />}
          />

          <PostMasterProtectedRoute
            path="/app/postMaster"
            component={(props) => (
              <Layout routes={postMasterRoutes} role="postMaster" />
            )}
          />

          <CustomProtectedRoute
            path="/app/custom"
            component={(props) => (
              <Layout routes={customRoutes} role="custom" />
            )}
          />

          {/* If you have an index page, you can remove this Redirect */}
          <Redirect exact from="/" to="/login" />
        </Switch>
      </Router>
    </>
  );
}

export default App;
