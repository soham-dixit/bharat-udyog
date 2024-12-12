import { lazy } from "react";

// use lazy for better code splitting, a.k.a. load faster
const Dashboard = lazy(() => import("../pages/Dashboard"));
const Orders = lazy(() => import("../pages/Orders"));
const ProductsAll = lazy(() => import("../pages/ProductsAll"));
const SingleProduct = lazy(() => import("../pages/SingleProduct"));
const AddProduct = lazy(() => import("../pages/AddProduct"));
const Customers = lazy(() => import("../pages/Customers"));
const Chats = lazy(() => import("../pages/Chats"));
const Profile = lazy(() => import("../pages/Profile"));
const Settings = lazy(() => import("../pages/Settings"));
const Page404 = lazy(() => import("../pages/404"));
const Blank = lazy(() => import("../pages/Blank"));
const AllOrders = lazy(() => import("../pages/AllOrders"));
const OrderDetails = lazy(() => import("../pages/OrderDetail"));
const EditProduct = lazy(() => import("../pages/EditProduct"));
const InvoiceGenerate = lazy(() => import("../pages/InvoiceGenerate"));
const ExporterInfo = lazy(() => import("../pages/ExporterInfo"));

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
    path: "/orderdetails/:id",
    component: OrderDetails,
  },
  {
    path: "/all-products",
    component: ProductsAll,
  },
  {
    path: "/add-product",
    component: AddProduct,
  },
  {
    path: "/product/:id",
    component: SingleProduct,
  },
  {
    path: "/editproduct/:id",
    component: EditProduct,
  },
  {
    path: "/customers",
    component: Customers,
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
    path: "/invoicegenerate/:id",
    component: InvoiceGenerate,
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
    path: "/exporterInfo",
    component: ExporterInfo,
  },
];

export default routes;
