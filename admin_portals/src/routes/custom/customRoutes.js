import { lazy } from "react";

// use lazy for better code splitting, a.k.a. load faster
const Dashboard = lazy(() => import("../../pages/Custompages/CustomDashboard"));
const OrderDetail = lazy(() => import("../../pages/Custompages/OrderDetail"));
const AllOrder = lazy(() => import("../../pages/Custompages/OrderTable"));

const routes = [
  {
    path: "/dashboard", // the url
    component: Dashboard,
  },

  {
    path: "/orderdetails",
    component: OrderDetail,
  },
  {
    path: "/allorders",
    component: AllOrder,
  },
];

export default routes;
