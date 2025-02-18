"use client";

import { NavFeatures } from "@/components/nav-features";
import { ProjectSwitcher } from "@/components/project-switcher";
import {
    Sidebar,
    SidebarContent,
    SidebarHeader,
    SidebarRail,
} from "@/components/ui/sidebar";
import type { Project } from "@/db";
import * as React from "react";
import type { Icon } from "./icon";

export function AppSidebar({
    data,
    ...props
}: React.ComponentProps<typeof Sidebar> & {
    data: {
        projects: Project[];
        features: {
            name: string;
            url: string;
            icon: Icon;
            isActive: boolean;
        }[];
    };
}) {
    return (
        <Sidebar collapsible="icon" {...props}>
            <SidebarHeader>
                <ProjectSwitcher />
            </SidebarHeader>
            <SidebarContent>
                <NavFeatures features={data.features} />
            </SidebarContent>
            <SidebarRail />
        </Sidebar>
    );
}
