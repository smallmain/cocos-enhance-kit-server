import { LoginForm } from "@/components/login-form";
import { ThemeSwitcher } from "@/components/theme-switcher";
import { redirect } from "next/navigation";
import { auth } from "./auth";

export default async function RootPage() {
    const session = await auth();

    if (session?.user) {
        redirect("/dashboard");
    }

    return (
        <>
            <div className="absolute right-4 top-4">
                <ThemeSwitcher />
            </div>
            <div className="flex min-h-svh flex-col items-center justify-center gap-6 bg-background p-6 md:p-10">
                <div className="w-full max-w-sm">
                    <LoginForm />
                </div>
            </div>
        </>
    );
}
