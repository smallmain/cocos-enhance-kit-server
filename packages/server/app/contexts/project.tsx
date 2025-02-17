"use client";

import { Icon } from "@/components/icon";
import { createContext, useContext, useState } from "react";

export interface Project {
    name: string;
    logo: Icon;
}

interface ProjectContextType {
    activeProject: Project;
    setActiveProject: (project: Project) => void;
}

const ProjectContext = createContext<ProjectContextType | null>(null);

export function ProjectProvider({
    children,
    initialProject,
}: {
    children: React.ReactNode;
    initialProject: Project;
}) {
    const [activeProject, setActiveProject] = useState(initialProject);

    return (
        <ProjectContext.Provider value={{ activeProject, setActiveProject }}>
            {children}
        </ProjectContext.Provider>
    );
}

export function useProject() {
    const context = useContext(ProjectContext);
    if (!context) {
        throw new Error("useProject must be used within ProjectProvider");
    }
    return context;
}
