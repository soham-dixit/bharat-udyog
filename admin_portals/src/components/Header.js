import React, { useContext, useState } from "react";
import { SidebarContext } from "../context/SidebarContext";
import {
  SearchIcon,
  MoonIcon,
  SunIcon,
  BellIcon,
  MenuIcon,
  OutlinePersonIcon,
  OutlineCogIcon,
  OutlineLogoutIcon,
  PeopleIcon,
  ChartsIcon,
  ChatIcon,
  UserIcon,
} from "../icons";
import {
  Avatar,
  Badge,
  Input,
  Dropdown,
  DropdownItem,
  WindmillContext,
} from "@windmill/react-ui";
import { Link } from "react-router-dom";
import response from "../utils/demo/profileData";
import UserContext from "../context/User/UserContext";

function Header() {

  const { state } = useContext(UserContext);

  const { mode, toggleMode } = useContext(WindmillContext);
  const { toggleSidebar } = useContext(SidebarContext);

  const [isNotificationsMenuOpen, setIsNotificationsMenuOpen] = useState(false);
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);

  function handleNotificationsClick() {
    setIsNotificationsMenuOpen(!isNotificationsMenuOpen);
  }

  function handleProfileClick() {
    setIsProfileMenuOpen(!isProfileMenuOpen);
  }

  return (
    <header className="z-40 py-4 bg-white shadow-bottom dark:bg-gray-800">
      <div className="container flex items-center justify-between h-full px-6 mx-auto text-red-600 dark:text-purple-300">
        {/* <!-- Mobile hamburger --> */}
        <button
          className="p-1 mr-5 -ml-1 rounded-md lg:hidden focus:outline-none focus:shadow-outline-purple"
          onClick={toggleSidebar}
          aria-label="Menu"
        >
          <MenuIcon color="black" className="w-6 h-6" aria-hidden="true" />
        </button>
        {/* <!-- Search input --> */}
        <div className="flex justify-center flex-1 lg:mr-32">
          <div className="relative w-full max-w-xl mr-6 focus-within:text-purple-500">
            <div className="absolute inset-y-0 flex items-center pl-2">
              <SearchIcon
                color="bg-red-700"
                className="w-6 h-6"
                aria-hidden="true"
              />
            </div>
            <Input
      className="pl-8 text-medium text-gray-700"
      placeholder={`   Search for ${
        state?.user?.role === "Admin"
          ? "Post Offices"
          : state?.user?.role === "Post Master"
          ? "Postmen"
          : "Parcels"
      }`}
          aria-label="Search"
        />
          </div>
        </div>
        <ul className="flex items-center flex-shrink-0 space-x-6">
          {/* <!-- Theme toggler --> */}
          {/* <li className="flex">
            <button
              className="rounded-md focus:outline-none focus:shadow-outline-purple"
              to="/app/chats"
              aria-label="Toggle color mode"
            >
              <ChatIcon color="black" className="w-6 h-6" aria-hidden="true" />
            </button>
          </li> */}
          {/* <!-- Notifications menu --> */}
          <li className="relative">
            <button
              className="relative align-middle rounded-md focus:outline-none focus:shadow-outline-purple"
              onClick={handleNotificationsClick}
              aria-label="Notifications"
              aria-haspopup="true"
            >
              <BellIcon color="black" className="w-6 h-6" aria-hidden="true" />
              {/* <!-- Notification badge --> */}
              <span
                aria-hidden="true"
                className="absolute top-0 right-0 inline-block w-3 h-3 transform translate-x-1 -translate-y-1 bg-red-600 border-2 border-white rounded-full dark:border-gray-800"
              ></span>
            </button>

            <Dropdown
              align="right"
              isOpen={isNotificationsMenuOpen}
              onClose={() => setIsNotificationsMenuOpen(false)}
            >
              <DropdownItem
                tag="a"
                onClick="/app/addExporter"
                className="justify-between"
              >
                <span className="mr-2">Exporter Registration Request</span>
                <Badge type="danger">2</Badge>
              </DropdownItem>
              <DropdownItem
                tag="a"
                onClick="/app/addPostman"
                className="justify-between"
              >
                <span className="mr-2">Postman Registration Request</span>
                <Badge type="danger">1</Badge>
              </DropdownItem>
              <DropdownItem onClick={() => alert("Alerts!")}>
                <span>Alerts</span>
              </DropdownItem>
            </Dropdown>
          </li>
          {/* <!-- Profile menu --> */}
          <li className="relative">
            <button
              className="rounded-full focus:shadow-outline-purple focus:outline-none"
              onClick={handleProfileClick}
              aria-label="Account"
              aria-haspopup="true"
            >
              <UserIcon color="black" className="w-6 h-6" aria-hidden="true" />
            </button>
            <Dropdown
              align="right"
              isOpen={isProfileMenuOpen}
              onClose={() => setIsProfileMenuOpen(false)}
            >
              <DropdownItem tag="a" href="/app/manage-profile">
                <OutlinePersonIcon
                  color="black"
                  className="w-5 h-5 mr-3"
                  aria-hidden="true"
                />
                <span>Profile</span>
              </DropdownItem>
              <DropdownItem tag="a" href="/app/settings">
                <OutlineCogIcon
                  color="black"
                  className="w-5 h-5 mr-3"
                  aria-hidden="true"
                />
                <span>Settings</span>
              </DropdownItem>
              <DropdownItem onClick={() => alert("Log out!")}>
                <OutlineLogoutIcon
                  color="black"
                  className="w-5 h-5 mr-3"
                  aria-hidden="true"
                />
                <span>Log out</span>
              </DropdownItem>
            </Dropdown>
          </li>
        </ul>
      </div>
    </header>
  );
}

export default Header;
