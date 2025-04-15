"use client";

import { Layout, BarChart, Compass, List  } from "lucide-react";
import { SidebarItem } from "./sidebar-item";
import { usePathname } from "next/navigation";

const guestRoutes = [
    {
        icon: Layout,
        label: "Бақылау тақтасы",
        path: "/",
    },
    {
        icon: Compass,
        label: "Шолу",
        path: "/search",
    }
];

const teacherRoutes = [
    {
        icon: List,
        label: "Курстар",
        path: "/teacher/courses",
    },
    {
        icon: BarChart,
        label: "Аналитика",
        path: "/teacher/analytics",
    }
];
    export const SidebarRoutes = () => {
        const pathname = usePathname();
        const isTeacherPage = pathname?.includes("teacher");

    const routes = isTeacherPage ? teacherRoutes : guestRoutes;
    return (
        <div className="flex flex-col w-full">
            {routes.map((route) =>(
             <SidebarItem
              key={route.path}
              icon={route.icon}
              label={route.label}
              href={route.path}
             />
            ))}
        </div>
    )
}