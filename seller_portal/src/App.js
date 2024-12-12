import React, { lazy, useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import AccessibleNavigationAnnouncer from "./components/AccessibleNavigationAnnouncer";
import "./assets/css/tailwind.css";
import { Toaster } from "react-hot-toast";
import RegisterModal from "./components/Registermodel";

const Layout = lazy(() => import("./containers/Layout"));
const Login = lazy(() => import("./pages/Login"));
const CreateAccount = lazy(() => import("./pages/CreateAccount"));
const KYC = lazy(() => import("./pages/kyc"));
const otp = lazy(() => import("./pages/OTP"));
const ForgotPassword = lazy(() => import("./pages/ForgotPassword"));

function App() {
  return (
    <>
      <Router>
        <RegisterModal />
        <Toaster position="top-right" reverseOrder={false} />
        <AccessibleNavigationAnnouncer />
        <Switch>
          <Route path="/login" component={Login} />
          <Route path="/create-account" component={CreateAccount} />
          <Route path="/kyc/:exporterId" component={KYC} />
          <Route path="/otp" component={otp} />
          <Route path="/forgot-password" component={ForgotPassword} />

          {/* Place new routes over this */}
          <Route path="/app" component={Layout} />
          {/* If you have an index page, you can remothis Redirect */}
          <Redirect exact from="/" to="/login" />
        </Switch>
      </Router>
    </>
  );
}

export default App;
