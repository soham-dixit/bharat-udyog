import { lazy } from "react";

// use lazy for better code splitting, a.k.a. load faster
const Dashboard = lazy(() => import("../../pages/Dashboard/AdminDashboard"));
const Chats = lazy(() => import("../../pages/Chats"));
const Profile = lazy(() => import("../../pages/Profile"));
const Settings = lazy(() => import("../../pages/Settings"));
const Page404 = lazy(() => import("../../pages/404"));
const Blank = lazy(() => import("../../pages/Blank"));
const DnkCenterDetails = lazy(() => import("../../pages/DnkCenterDetails"));
const DnkCenterList = lazy(() => import("../../pages/DnkList"));
const AddDnkCentre = lazy(() => import("../../pages/AddDnkCentre"));
const AddCustomOffice = lazy(() => import("../../pages/AddCustomOffice"));
const CustomOfficeList = lazy(() => import("../../pages/CustomOfficeList"));
const OperationalCountries = lazy(() =>
  import("../../pages/OperationalCountries")
);

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
const adminRoutes = [
  {
    path: "/dashboard", // the url
    component: Dashboard,
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
    path: "/404",
    component: Page404,
  },
  {
    path: "/blank",
    component: Blank,
  },
  {
    path: "/DnkCenterDetails/:id",
    component: DnkCenterDetails,
  },
  {
    path: "/DnkList",
    component: DnkCenterList,
  },
  {
    path: "/addDnkCentre",
    component: AddDnkCentre,
  },
  {
    path: "/addCustomOffice",
    component: AddCustomOffice,
  },
  {
    path: "/customOfficeList",
    component: CustomOfficeList,
  },
  {
    path: "/operationalCountries",
    component: OperationalCountries,
  },
];

export default adminRoutes;
