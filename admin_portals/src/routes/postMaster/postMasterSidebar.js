/**
 * ⚠ These are used just to render the Sidebar!
 * You can include any link here, local or external.
 *
 * If you're looking to actual Router routes, go to
 * `routes/index.js`
 */
const routes = [
  {
    path: "/app/postMaster/dashboard", // the url
    icon: "HomeIcon", // the component being exported from icons/index.js
    name: "Dashboard", // name that appear in Sidebar
  },
  {
    icon: "GroupIcon",
    name: "Postman",
    routes: [
      {
        path: "/app/postMaster/PostmanList",
        name: "Postman List",
      },
      {
        path: "/app/postMaster/addPostman",
        name: "Add Postman",
      },
    ],
  },
  {
    icon: "MoneyIcon",
    name: "Exporter",
    routes: [
      {
        path: "/app/postMaster/ExporterList",
        name: "Registered Exporter",
      },
      {
        path: "/app/postMaster/addExporter",
        name: "Pending Exporters",
      },
    ],
  },
  {
    icon: "CartIcon",
    name: "Orders",
    path: "/app/postMaster/orders",
  },
  // {
  //   path: "/blank",
  //   icon: "ChatIcon",
  //   name: "Messages",
  // },
  // {
  //   path: "/app/postMaster/manage-profile",
  //   icon: "UserIcon",
  //   name: "Profile",
  // },
  {
    path: "/app/postMaster/settings",
    icon: "OutlineCogIcon",
    name: "Settings",
  },
  
];

export default routes;
