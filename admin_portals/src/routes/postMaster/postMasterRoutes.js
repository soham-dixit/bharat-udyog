import { lazy } from "react";

// use lazy for better code splitting, a.k.a. load faster
const Dashboard = lazy(() =>
  import("../../pages/Dashboard/PostmasterDashboard")
);
const Orders = lazy(() => import("../../pages/Orders"));
const Chats = lazy(() => import("../../pages/Chats"));
const Profile = lazy(() => import("../../pages/Profile"));
const Settings = lazy(() => import("../../pages/Settings"));
const Page404 = lazy(() => import("../../pages/404"));
const Blank = lazy(() => import("../../pages/Blank"));
const AllOrders = lazy(() => import("../../pages/AllOrders"));
const ConsumerOrderDetails = lazy(() =>
  import("../../pages/ConsumerOrderDetails")
);
const Dnk = lazy(() => import("../../pages/Dnk"));
const Postman = lazy(() => import("../../pages/PostmanList"));
const addPostman = lazy(() => import("../../pages/addPostman"));
const ExporterList = lazy(() => import("../../pages/ExporterList"));
const addExporter = lazy(() => import("../../pages/addExporter"));
const ExporterDetails = lazy(() => import("../../pages/ExporterDetails"));

/**
 * ⚠ These are internal routes!
 * They will be rendered inside the app, using the default `containers/Layout`.
 * If you want to add a route to, let's say, a landing page, you should add
 * it to the `App`'s router, exactly like `Login`, `CreateAccount` and other pages
 * are routed.
 *
 * If you're looking for the links rendered in the SidebarContent, go to
 * `routes/sidebar.js`
 */
const routes = [
  {
    path: "/dashboard", // the url
    component: Dashboard,
  },

  {
    path: "/orders",
    component: Orders,
  },
  {
    path: "/allorders",
    component: AllOrders,
  },
  {
    path: "/consumerOrderDetails/:id",
    component: ConsumerOrderDetails,
  },
  {
    path: "/chats",
    component: Chats,
  },
  {
    path: "/manage-profile",
    component: Profile,
  },
  {
    path: "/settings",
    component: Settings,
  },
  {
    path: "/404",
    component: Page404,
  },
  {
    path: "/blank",
    component: Blank,
  },
  {
    path: "/Dnk",
    component: Dnk,
  },
  {
    path: "/PostmanList",
    component: Postman,
  },
  {
    path: "/addPostman",
    component: addPostman,
  },
  {
    path: "/ExporterList",
    component: ExporterList,
  },
  {
    path: "/addExporter",
    component: addExporter,
  },
  {
    path: "/ExporterDetails/:id",
    component: ExporterDetails,
  },
];

export default routes;
