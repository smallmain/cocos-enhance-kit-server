"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { SITE_NAME } from "@/constants";
import { doSignIn } from "@/lib/login";
import { cn } from "@/lib/utils";
import { Server } from "lucide-react";

export function LoginForm({
    className,
    ...props
}: React.ComponentPropsWithoutRef<"div">) {
    return (
        <div className={cn("flex flex-col gap-6 -mt-12", className)} {...props}>
            <form
                action={async formData => {
                    try {
                        formData.append("redirectTo", "/dashboard");
                        await doSignIn(formData);
                    } catch (error) {}
                }}
            >
                <div className="flex flex-col gap-6">
                    <div className="flex flex-col items-center gap-2">
                        <a
                            href="#"
                            className="flex flex-col items-center gap-2 font-medium"
                        >
                            <div className="flex h-8 w-8 items-center justify-center rounded-md">
                                <Server className="size-6" />
                            </div>
                            <span className="sr-only">{SITE_NAME}</span>
                        </a>
                        <h1 className="text-xl font-bold">{SITE_NAME}</h1>
                        <div className="text-center text-sm text-muted-foreground">
                            请先验证您的身份，以便继续。
                        </div>
                    </div>
                    <div className="relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t after:border-border"></div>
                    <div className="flex flex-col gap-8">
                        <div className="grid gap-4">
                            <Label htmlFor="password">密码</Label>
                            <Input
                                id="password"
                                name="password"
                                type="password"
                                required
                            />
                        </div>
                        <Button type="submit" className="w-full">
                            验证
                        </Button>
                    </div>
                </div>
            </form>
        </div>
    );
}
