import { ThemeProvider } from "@/components/theme-provider";
import { SITE_NAME } from "@/constants";
import "@/globals.css";
import type { Metadata } from "next";

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en" suppressHydrationWarning>
            <body>
                <ThemeProvider
                    attribute="class"
                    defaultTheme="system"
                    enableSystem
                    disableTransitionOnChange
                >
                    {children}
                </ThemeProvider>
            </body>
        </html>
    );
}

export const metadata: Metadata = {
    title: SITE_NAME,
};
