import React, { createContext, useReducer } from "react";
import ModalReducer from "./ModalReducer";

export const ModalContext = createContext();

const initialState = {
  isModalOpen: false,
  modalHeader: "",
  modalBody: "",
};

const ModalContextProvider = ({ children }) => {
  const [modalState, dispatchModal] = useReducer(ModalReducer, initialState);
  return (
    <ModalContext.Provider value={{ modalState, dispatchModal }}>
      {children}
    </ModalContext.Provider>
  );
};

export default ModalContextProvider;
