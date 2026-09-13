import type { Metadata } from "next";
import "./globals.css";
import { SchoolStoreProvider } from "@/lib/store";
import { ThemeProvider } from "@/components/providers/ThemeProvider";
import { ToastProvider } from "@/components/providers/ToastProvider";

export const metadata: Metadata = {
  title: "EduSphere | Enterprise Multi-Tenant School Management System",
  description: "Next.js Multi-Tenant School Management System with portals for Super Admin, School Admin, Teachers, and Students.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="h-full" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              try {
                const savedMode = localStorage.getItem('edusphere-theme');
                if (savedMode === 'dark' || (!savedMode && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
                  document.documentElement.classList.add('dark');
                } else {
                  document.documentElement.classList.remove('dark');
                }
                document.documentElement.removeAttribute('data-palette');
              } catch (e) {}
            `,
          }}
        />
      </head>
      <body className="min-h-full flex flex-col antialiased bg-[var(--canvas-bg)] text-[var(--text-main)] transition-colors duration-200">
        <ThemeProvider>
          <ToastProvider>
            <SchoolStoreProvider>{children}</SchoolStoreProvider>
          </ToastProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
