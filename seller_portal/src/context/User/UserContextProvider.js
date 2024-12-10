import React, { useEffect, useReducer, useState } from "react";
import UserContext from "./UserContext";
import reducer from "./Reducer";

const initialState = {
  isLoggedIn: false,
  user: null,
};

const UserContextProvider = ({ children }) => {
  const persistedState =
    JSON.parse(localStorage.getItem("user")) || initialState;
  const [state, dispatch] = useReducer(reducer, persistedState);

  useEffect(() => {
    localStorage.setItem("user", JSON.stringify(state));
  }, [state]);

  return (
    <UserContext.Provider value={{ state, dispatch }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserContextProvider;
