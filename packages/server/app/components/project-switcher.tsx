"use client";

import { Input } from "@/components/ui/input";
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip";
import { useProject } from "@/contexts/project";
import { Check, ChevronsUpDown, Plus, Trash2 } from "lucide-react";
import { useState } from "react";

import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from "@/components/ui/alert-dialog";
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
import { addProject, removeProject } from "@/db";
import { Icon, XIcon } from "./icon";
import { Button } from "./ui/button";

export function ProjectSwitcher() {
    const { isMobile } = useSidebar();
    const { activeProject, setActiveProjectId, setProjects, projects } =
        useProject();
    const [isAddingProject, setIsAddingProject] = useState(false);
    const [newProjectName, setNewProjectName] = useState("");
    const [isOpen, setIsOpen] = useState(false);
    const [inputError, setInputError] = useState(false);
    const [projectToDelete, setProjectToDelete] = useState<string | null>(null);

    const resetAddProjectState = () => {
        setIsAddingProject(false);
        setNewProjectName("");
        setInputError(false);
    };

    const handleAddProject = async () => {
        const name = newProjectName.trim();

        if (!name) {
            setInputError(true);
            return;
        }

        const project = await addProject(name);
        setProjects([...projects, project]);
        setActiveProjectId(project.id);
        setIsOpen(false);
        resetAddProjectState();
    };

    const handleDeleteProject = async (id: string) => {
        await removeProject(id);
        setProjects(projects.filter(project => project.id !== id));
        setProjectToDelete(null);
    };

    return (
        <SidebarMenu>
            <SidebarMenuItem>
                <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
                    <DropdownMenuTrigger asChild>
                        <SidebarMenuButton
                            size="lg"
                            className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
                        >
                            <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                                <XIcon
                                    icon={activeProject?.logo ?? Icon.Package}
                                    className="size-5"
                                />
                            </div>
                            <div className="ml-1 grid flex-1 text-left text-sm leading-tight">
                                <span className="truncate font-semibold">
                                    {activeProject?.name}
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
                        onCloseAutoFocus={resetAddProjectState}
                    >
                        <DropdownMenuLabel className="text-xs text-muted-foreground">
                            所有项目
                        </DropdownMenuLabel>
                        {projects.map((project, index) => (
                            <DropdownMenuItem
                                key={project.name}
                                onClick={() => setActiveProjectId(project.id)}
                                className="group gap-2 p-3"
                            >
                                <div className="flex size-6 items-center justify-center rounded-sm bg-primary text-primary-foreground">
                                    <XIcon
                                        icon={
                                            activeProject?.logo ?? Icon.Package
                                        }
                                        className="size-4 shrink-0"
                                    />
                                </div>
                                {project.name}
                                {projects.length > 1 && (
                                    <Button
                                        variant="ghost"
                                        className="ml-auto hidden group-hover:inline-flex size-6 hover:bg-gray-200"
                                        onClick={e => {
                                            e.stopPropagation();
                                            setProjectToDelete(project.id);
                                        }}
                                    >
                                        <Trash2 className="text-destructive" />
                                    </Button>
                                )}
                            </DropdownMenuItem>
                        ))}
                        <DropdownMenuSeparator />
                        {isAddingProject ? (
                            <div className="flex gap-2 p-2">
                                <TooltipProvider>
                                    <Tooltip open={inputError}>
                                        <TooltipTrigger asChild>
                                            <Input
                                                value={newProjectName}
                                                onChange={e => {
                                                    setNewProjectName(
                                                        e.target.value,
                                                    );
                                                    setInputError(false);
                                                }}
                                                onPointerMove={e =>
                                                    e.stopPropagation()
                                                }
                                                placeholder="项目名称"
                                                className={
                                                    inputError
                                                        ? "border-red-500"
                                                        : ""
                                                }
                                                autoFocus
                                            />
                                        </TooltipTrigger>
                                        <TooltipContent isError>
                                            <p>项目名称不能为空</p>
                                        </TooltipContent>
                                    </Tooltip>
                                </TooltipProvider>
                                <Button
                                    onClick={handleAddProject}
                                    variant="ghost"
                                    size="icon"
                                >
                                    <Check />
                                </Button>
                                {/* <Button
                                    onClick={() => {
                                        setIsAddingProject(false);
                                        setNewProjectName("");
                                    }}
                                    variant="ghost"
                                    size="icon"
                                >
                                    <X />
                                </Button> */}
                            </div>
                        ) : (
                            <DropdownMenuItem
                                className="gap-2 p-2"
                                onSelect={e => {
                                    setIsAddingProject(true);
                                    e.preventDefault();
                                }}
                            >
                                <Plus className="size-4 text-muted-foreground" />
                                <div className="font-medium text-muted-foreground">
                                    添加项目
                                </div>
                            </DropdownMenuItem>
                        )}
                    </DropdownMenuContent>
                </DropdownMenu>
            </SidebarMenuItem>

            <AlertDialog
                open={!!projectToDelete}
                onOpenChange={() => setProjectToDelete(null)}
            >
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>确认删除项目？</AlertDialogTitle>
                        <AlertDialogDescription>
                            此操作无法撤销，请确认是否要删除该项目。
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel>取消</AlertDialogCancel>
                        <AlertDialogAction
                            variant="destructive"
                            onClick={() =>
                                projectToDelete
                                && handleDeleteProject(projectToDelete)
                            }
                        >
                            确认
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </SidebarMenu>
    );
}
