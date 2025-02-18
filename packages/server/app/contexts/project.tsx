"use client";

import type { Project } from "@/db";
import { createContext, useContext, useState } from "react";

interface ProjectContextType {
    projects: Project[];
    activeProjectId: string;
    activeProject: Project | null;
    setActiveProjectId: (project: string) => void;
    setProjects: (projects: Project[]) => void;
}

const ProjectContext = createContext<ProjectContextType | null>(null);

export function ProjectProvider({
    children,
    initialProjects,
    initialProjectId,
}: {
    children: React.ReactNode;
    initialProjects: Project[];
    initialProjectId: string;
}) {
    const [projects, setProjects] = useState(initialProjects);
    const [activeProjectId, setActiveProjectId] = useState(initialProjectId);
    const activeProject = projects.find(p => p.id === activeProjectId) || null;

    return (
        <ProjectContext.Provider
            value={{
                projects,
                activeProject,
                activeProjectId,
                setActiveProjectId,
                setProjects,
            }}
        >
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
