import React, { Suspense } from "react";
import ReactDOM from "react-dom";
import "./assets/css/tailwind.output.css";
import App from "./App";
import { SidebarProvider } from "./context/SidebarContext";
import ThemedSuspense from "./components/ThemedSuspense";
import { Windmill } from "@windmill/react-ui";
import windmillTheme from "./windmillTheme";
import myTheme from "./myTheme";
import UserContextProvider from "./context/User/UserContextProvider";
import ModalContextProvider from "./context/modal/ModalContext";

ReactDOM.render(
  <SidebarProvider>
    <UserContextProvider>
      <ModalContextProvider>
        <Suspense fallback={<ThemedSuspense />}>
          <Windmill theme={myTheme}>
            <App />
          </Windmill>
        </Suspense>
      </ModalContextProvider>
    </UserContextProvider>
  </SidebarProvider>,
  document.getElementById("root")
);
