// AdminProtectedRoute.js
import React, { useContext, useEffect } from "react";
import { Route, Redirect } from "react-router-dom";
import UserContext from "../../context/User/UserContext";

const AdminProtectedRoute = ({ component: Component, ...rest }) => {
  const { state } = useContext(UserContext);

  const handleRedirect = () => {
    if (state.isLoggedIn && state.user.role == "PostMaster") {
      return <Redirect to="/app/postMaster/dashboard" />;
    } else if (state.isLoggedIn && state.user.role == "Admin") {
      return <Redirect to="/app/admin/dashboard" />;
    } else if(state.isLoggedIn && state.user.role == "Custom") {
      return <Redirect to="/app/custom/dashboard" />;
    }else {
      return <Redirect to="/login" />;
    }
  };

  return (
    <Route
      {...rest}
      render={(props) =>
        state.isLoggedIn && state.user.role == "Admin" ? (
          <Component {...props} />
        ) : (
          <Redirect to="/login" />
          // handleRedirect()
        )
      }
    />
  );
};

export default AdminProtectedRoute;
