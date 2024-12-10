import React from "react";

import SidebarContent from "./SidebarContent";

function DesktopSidebar({ routes }) {
  return (
    <aside className="z-35 flex-shrink-0 hidden w-64 overflow-y-auto bg-white shadow-xl dark:bg-gray-800 lg:block">
      <SidebarContent routes={routes} />
    </aside>
  );
}

export default DesktopSidebar;
