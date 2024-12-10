import React, { useContext } from "react";
import DesktopSidebar from "./DesktopSidebar";
import MobileSidebar from "./MobileSidebar";
import UserContext from "../../context/User/UserContext";
import adminRoutes from "../../routes/admin/adminSidebar";
import postMasterRoutes from "../../routes/postMaster/postMasterSidebar";
import customOfficerRoutes from "../../routes/custom/customSidebar";

function Sidebar() {
  const { state } = useContext(UserContext);

  let routes;

  // Choose routes based on the user's role
  switch (state.user.role) {
    case "Admin":
      routes = adminRoutes;
      break;
    case "Post Master":
      routes = postMasterRoutes;
      break;
    case "Custom Officer":
      routes = customOfficerRoutes;
      break;
    default:
      routes = []; // Handle other roles or set a default route configuration
  }

  return (
    <>
      <DesktopSidebar routes={routes} />
      <MobileSidebar routes={routes} />
    </>
  );
}

export default Sidebar;
