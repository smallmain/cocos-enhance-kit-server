"use client";

import { NavFeatures } from "@/components/nav-features";
import { ProjectSwitcher } from "@/components/project-switcher";
import {
    Sidebar,
    SidebarContent,
    SidebarHeader,
    SidebarRail,
} from "@/components/ui/sidebar";
import { Package, Type } from "lucide-react";
import * as React from "react";

// This is sample data.
const data = {
    projects: [
        {
            name: "哈局大话骰",
            logo: Package,
        },
        {
            name: "Acme Corp.",
            logo: Package,
        },
        {
            name: "Evil Corp.",
            logo: Package,
        },
    ],
    features: [
        {
            name: "文本烘焙",
            url: "#",
            icon: Type,
            isActive: true,
        },
    ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
    return (
        <Sidebar collapsible="icon" {...props}>
            <SidebarHeader>
                <ProjectSwitcher projects={data.projects} />
            </SidebarHeader>
            <SidebarContent>
                <NavFeatures features={data.features} />
            </SidebarContent>
            <SidebarRail />
        </Sidebar>
    );
}
