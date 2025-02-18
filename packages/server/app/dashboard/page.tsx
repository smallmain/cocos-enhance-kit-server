import { auth } from "@/auth";
import { AppSidebar } from "@/components/app-sidebar";
import { Icon } from "@/components/icon";
import { SidebarProvider } from "@/components/ui/sidebar";
import { FeatureProvider } from "@/contexts/feature";
import { ProjectProvider } from "@/contexts/project";
import { getProjects } from "@/db";
import { redirect } from "next/navigation";
import DashboardContent from "./content";

const data = {
    features: [
        {
            name: "文本烘焙",
            url: "#",
            icon: Icon.Type,
            isActive: true,
        },
    ],
};

export default async function DashboardPage() {
    const session = await auth();

    if (!session?.user) {
        redirect("/");
    }

    const projects = await getProjects();

    return (
        <SidebarProvider>
            <ProjectProvider
                initialProjects={projects}
                initialProjectId={projects[0].id}
            >
                <FeatureProvider initialFeature={data.features[0]}>
                    <AppSidebar
                        data={{
                            projects: projects,
                            features: data.features,
                        }}
                    />
                    <DashboardContent />
                </FeatureProvider>
            </ProjectProvider>
        </SidebarProvider>
    );
}
