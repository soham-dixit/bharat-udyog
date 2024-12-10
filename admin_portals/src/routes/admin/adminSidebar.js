/**
 * ⚠ These are used just to render the Sidebar!
 * You can include any link here, local or external.
 *
 * If you're looking to actual Router routes, go to
 * `routes/index.js`
 */
const routes = [
  {
    path: "/app/admin/dashboard", // the url
    icon: "HomeIcon", // the component being exported from icons/index.js
    name: "Dashboard", // name that appear in Sidebar
  },
  {
    icon: "MoneyIcon",
    name: "Post Office",
    routes: [
      {
        path: "/app/admin/DnkList",
        name: "Post Office List",
      },
      {
        path: "/app/admin/addDnkCentre",
        name: "Add Post Office",
      },
    ],
  },
  {
    icon: "MoneyIcon",
    name: "Customs Office",
    routes: [
      {
        path: "/app/admin/customOfficeList",
        name: "Customs Office List",
      },
      {
        path: "/app/admin/addCustomOffice",
        name: "Add Customs Office",
      },
    ],
  },
  // {
  //   icon: "MoneyIcon",
  //   name: "Operational Countries",
  //   path: "/app/admin/operationalCountries",
  // },
  {
    icon: "ChartsIcon",
    name: "Statistics",
    routes: [
      {
        path: "/app/admin/blank",
        name: "District",
      },
      {
        path: "/app/admin/blank",
        name: "State",
      },
      {
        path: "/app/admin/blank",
        name: "International",
      },
      {
        path: "/app/admin/blank",
        name: "Category",
      },
    ],
  },
  // {
  //   path: "/app/admin/blank",
  //   icon: "ChatIcon",
  //   name: "Messages",
  // },
  // {
  //   path: "/app/admin/settings",
  //   icon: "OutlineCogIcon",
  //   name: "Settings",
  // },
  {
    path: "/app/admin/logout",
    icon: "OutlineLogoutIcon",
    name: "Logout",
  },
];

export default routes;
