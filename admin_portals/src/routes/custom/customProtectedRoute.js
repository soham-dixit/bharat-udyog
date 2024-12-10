// PostMasterProtectedRoute.js
import React, { useContext, useEffect } from "react";
import { Route, Redirect } from "react-router-dom";
import UserContext from "../../context/User/UserContext";

const PostMasterProtectedRoute = ({ component: Component, ...rest }) => {
  const { state } = useContext(UserContext);

  return (
    <Route
      {...rest}
      render={(props) =>
        state.isLoggedIn && state.user.role == "Custom Officer" ? (
          <Component {...props} />
        ) : (
          <Redirect to="/login" />
        )
      }
    />
  );
};

export default PostMasterProtectedRoute;
