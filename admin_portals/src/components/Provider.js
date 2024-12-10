import React from "react";
import { SidebarProvider } from "../context/SidebarContext";
import ModalContextProvider from "../context/modal/ModalContext";
import UserContextProvider from "../context/User/UserContextProvider";

const Provider = ({ children }) => {
  return (
    <SidebarProvider>
      <UserContextProvider>
        <ModalContextProvider>{children}</ModalContextProvider>
      </UserContextProvider>
    </SidebarProvider>
  );
};

export default Provider;
