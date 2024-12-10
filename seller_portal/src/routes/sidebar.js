/**
 * ⚠ These are used just to render the Sidebar!
 * You can include any link here, local or external.
 *
 * If you're looking to actual Router routes, go to
 * `routes/index.js`
 */
const routes = [
  {
    path: "/app/dashboard", // the url
    icon: "HomeIcon", // the component being exported from icons/index.js
    name: "Dashboard", // name that appear in Sidebar
  },
  {
    path: "/app/allorders",
    icon: "CartIcon",
    name: "Orders",
  },
  {
    icon: "TruckIcon",
    name: "Products",
    routes: [
      {
        path: "/app/all-products",
        name: "All Products",
      },
      {
        path: "/app/add-product",
        name: "Add Product",
      },
    ],
  },
  {
    path: "/app/customers",
    icon: "GroupIcon",
    name: "Customers",
  },
  // {
  //   path: "/app/blank",
  //   icon: "GroupIcon",
  //   name: "Collaboration",
  // },
  {
    path: "/app/chats",
    icon: "ChatIcon",
    name: "Message",
  },

  // {
  //   path: "/app/manage-profile",
  //   icon: "UserIcon",
  //   name: "Profile",
  // },
  // {
  //   path: "/app/settings",
  //   icon: "OutlineCogIcon",
  //   name: "Settings",
  // },
];

export default routes;
