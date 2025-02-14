import { auth } from "@/auth";
import { ThemeSwitcher } from "@/components/theme-switcher";
import { redirect } from "next/navigation";

export default async function DashboardPage() {
    const session = await auth();

    if (!session?.user) {
        redirect("/");
    }

    return (
        <>
            <div className="absolute right-4 top-4">
                <ThemeSwitcher />
            </div>
        </>
    );
}
