"use client";

import Link from "next/link";
import { Logo } from "./logo";
import { SidebarRoutes } from "./sidebar-routes";

export const Sidebar = () => {
  return (
    <div className="h-full border-r flex flex-col overflow-y-auto bg-white shadow-sm">
      <div className="p-4">
        <Link href="/">
          <Logo />
        </Link>
      </div>
      <div className="flex flex-col w-fill">
        <SidebarRoutes />
      </div>
    </div>
  );
};

export default Sidebar;
