import React, { useContext } from "react";
// import routes from "../../routes/sidebar";
import { NavLink, Route } from "react-router-dom";
import * as Icons from "../../icons";
import SidebarSubmenu from "./SidebarSubmenu";
import { Button } from "@windmill/react-ui";
import DNKlogo from "../../assets/img/logo.png";
import UserContext from "../../context/User/UserContext";
import toast from "react-hot-toast";
import { useHistory } from "react-router-dom";
function Icon({ icon, ...props }) {
  const Icon = Icons[icon];
  return <Icon {...props} />;
}

function SidebarContent({ routes }) {
  const { state } = useContext(UserContext);
  const history = useHistory();

  const { dispatch } = useContext(UserContext);
  const logoutUser = () => {
    
    dispatch({
      type: "LOGOUT",
    });
    toast.success("Logged Out Successfully");

    history.push("/login");
  };

  return (
    <div className="py-4 text-gray-500 dark:text-gray-400">
      <div className="flex items-center">
        <a
          className="ml-6 text-xl font-bold text-gray-800 dark:text-gray-200"
          href="#"
        >
          {state.user.role == "Admin" && "Super Admin"}
          {state.user.role == "Custom Officer" && "Custom Officer"}
          {state.user.role == "Post Master" && "Post Master"}
        </a>
      </div>

      <ul className="mt-6">
        {routes.slice(0, -1).map((route) =>
          route.routes ? (
            <SidebarSubmenu route={route} key={route.name} />
          ) : (
            <li className="relative px-6 py-3" key={route.name}>
              <NavLink
                exact
                to={route.path}
                className="inline-flex items-center w-full text-sm font-semibold transition-colors duration-150 hover:text-gray-800 dark:hover:text-gray-200"
                // activeClassName="text-gray-800 dark:text-gray-100"
              >
                <Route path={route.path} exact={route.exact}>
                  <span
                    className="absolute inset-y-0 left-0 w-1 bg-red-600 rounded-tr-lg rounded-br-lg"
                    aria-hidden="true"
                  ></span>
                </Route>
                <Icon
                  className="w-5 h-5"
                  aria-hidden="true"
                  icon={route.icon}
                />
                <span className="ml-4">{route.name}</span>
              </NavLink>
            </li>
          )
        )}

        <hr className="customeDivider mx-4 my-5" />

        {routes.slice(-1, -4).map((route) => (
          <li className="relative px-6 py-3" key={route.name}>
            <NavLink
              exact
              to={route.path}
              className="inline-flex items-center w-full text-sm font-semibold transition-colors duration-150 hover:text-gray-800 dark:hover:text-gray-200"
              // activeClassName="text-gray-800 dark:text-gray-100"
            >
              <Route path={route.path} exact={route.exact}>
                <span
                  className="absolute inset-y-0 left-0 w-1 bg-red-600 rounded-tr-lg rounded-br-lg"
                  aria-hidden="true"
                ></span>
              </Route>
              <Icon className="w-5 h-5" aria-hidden="true" icon={route.icon} />
              <span className="ml-4">{route.name}</span>
            </NavLink>
          </li>
        ))}
        <li className="relative px-6 py-3">
          <p
            className="inline-flex items-center w-full text-sm font-semibold transition-colors duration-150 hover:text-gray-800 dark:hover:text-gray-200 cursor-pointer"
            // activeClassName="text-gray-800 dark:text-gray-100"
            onClick={logoutUser}
          >
            <span
              className="absolute inset-y-0 left-0 w-1 rounded-tr-lg rounded-br-lg"
              aria-hidden="true"
            ></span>
            <Icon
              className="w-5 h-5"
              aria-hidden="true"
              icon="OutlineLogoutIcon"
            />
            <span className="ml-4">Logout</span>
          </p>
        </li>
      </ul>
    </div>
  );
}

export default SidebarContent;
