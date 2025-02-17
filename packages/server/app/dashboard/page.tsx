import { auth } from "@/auth";
import { AppSidebar } from "@/components/app-sidebar";
import { Icon } from "@/components/icon";
import { SidebarProvider } from "@/components/ui/sidebar";
import { FeatureProvider } from "@/contexts/feature";
import { ProjectProvider } from "@/contexts/project";
import { redirect } from "next/navigation";
import DashboardContent from "./content";

// This is sample data.
const data = {
    projects: [
        {
            name: "哈局大话骰",
            logo: Icon.Package,
        },
        {
            name: "Acme Corp.",
            logo: Icon.Package,
        },
        {
            name: "Evil Corp.",
            logo: Icon.Package,
        },
    ],
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

    return (
        <SidebarProvider>
            <ProjectProvider initialProject={data.projects[0]}>
                <FeatureProvider initialFeature={data.features[0]}>
                    <AppSidebar data={data} />
                    <DashboardContent />
                </FeatureProvider>
            </ProjectProvider>
        </SidebarProvider>
    );
}
