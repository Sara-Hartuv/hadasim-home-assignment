import type { ReactNode } from "react";
import { Button } from "@/components/ui/button";

interface SidebarItem {
    label: string;
    isActive?: boolean;
    onClick: () => void;
}

interface DashboardLayoutProps {
    title: string;
    subtitle: string;
    onLogout: () => void;
    sidebarItems: SidebarItem[];
    children: ReactNode;
}

const DashboardLayout = ({title, subtitle, onLogout, sidebarItems, children,}: DashboardLayoutProps) => {
  return (
    <div dir="rtl" className="min-h-screen bg-slate-50 text-slate-900">
      <div className="flex min-h-screen">
        <aside className="w-64 border-l bg-white p-5 shadow-sm">
          <div className="mb-8">
            <h2 className="text-xl font-bold">מערכת ניהול</h2>
            <p className="mt-1 text-sm text-slate-500">מורות ותלמידות</p>
          </div>

          <nav className="space-y-2">
            {sidebarItems.map((item) => (
              <Button
                key={item.label}
                variant={item.isActive ? "default" : "ghost"}
                className="w-full justify-start"
                onClick={item.onClick}
              >
                {item.label}
              </Button>
            ))}
          </nav>

          <div className="absolute bottom-5 right-5 left-5">
            <Button variant="outline" className="w-full" onClick={onLogout}>
              התנתקות
            </Button>
          </div>
        </aside>

        <main className="flex-1 p-8">
          <header className="mb-8">
            <h1 className="text-3xl font-bold">{title}</h1>
            <p className="mt-2 text-slate-500">{subtitle}</p>
          </header>

          {children}
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;