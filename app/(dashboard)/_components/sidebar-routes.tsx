"use client";

import { Layout, BarChart, Compass, List ,Users } from "lucide-react";
import  SidebarItem  from "./sidebar-item";
import { usePathname } from "next/navigation";

const STUDENTRoutes = [
    {
        icon: Layout,
        label: "Курстарым",
        href: "/home",
    },
    {
        icon: Compass,
        label: "Категория",
        href: "/search",
    }
];

const teacherRoutes = [
    {
        icon: List,
        label: "Курстар",
        href: "/teacher/courses",
    },
    {
        icon: BarChart,
        label: "Аналитика",
        href: "/teacher/analytics",
    },
    {
        icon: Users,
        label: "Басқару",
        href: "/teacher/users",
    }
]

export const SidebarRoutes = () => {

    const pathname = usePathname();
    
    const isTeacherPage = pathname?.startsWith("/teacher");

    const routes = isTeacherPage ? teacherRoutes : STUDENTRoutes;

    return (
        <div className="flex flex-col w-full">
            {routes.map((route, index) => (
                <SidebarItem 
                    key={index}
                    icon={route.icon}
                    label={route.label}
                    href={route.href}
                />
            ))}            
        </div>
    )
}