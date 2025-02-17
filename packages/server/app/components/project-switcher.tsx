"use client";

import { useProject } from "@/contexts/project";
import { ChevronsUpDown, Plus } from "lucide-react";

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    useSidebar,
} from "@/components/ui/sidebar";
import { XIcon, type Icon } from "./icon";

export function ProjectSwitcher({
    projects,
}: {
    projects: {
        name: string;
        logo: Icon;
    }[];
}) {
    const { isMobile } = useSidebar();
    const { activeProject, setActiveProject } = useProject();

    return (
        <SidebarMenu>
            <SidebarMenuItem>
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <SidebarMenuButton
                            size="lg"
                            className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
                        >
                            <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                                <XIcon
                                    icon={activeProject.logo}
                                    className="size-5"
                                />
                            </div>
                            <div className="ml-1 grid flex-1 text-left text-sm leading-tight">
                                <span className="truncate font-semibold">
                                    {activeProject.name}
                                </span>
                                {/* <span className="truncate text-xs">
                                    {activeProject.plan}
                                </span> */}
                            </div>
                            <ChevronsUpDown className="ml-auto" />
                        </SidebarMenuButton>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent
                        className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg"
                        align="start"
                        side={isMobile ? "bottom" : "right"}
                        sideOffset={4}
                    >
                        <DropdownMenuLabel className="text-xs text-muted-foreground">
                            所有项目
                        </DropdownMenuLabel>
                        {projects.map((project, index) => (
                            <DropdownMenuItem
                                key={project.name}
                                onClick={() => setActiveProject(project)}
                                className="gap-2 p-3"
                            >
                                <div className="flex size-6 items-center justify-center rounded-sm bg-primary text-primary-foreground">
                                    <XIcon
                                        icon={activeProject.logo}
                                        className="size-4 shrink-0"
                                    />
                                </div>
                                {project.name}
                            </DropdownMenuItem>
                        ))}
                        <DropdownMenuSeparator />
                        <DropdownMenuItem className="gap-2 p-2">
                            <Plus className="size-4 text-muted-foreground" />
                            <div className="font-medium text-muted-foreground">
                                添加项目
                            </div>
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </SidebarMenuItem>
        </SidebarMenu>
    );
}
