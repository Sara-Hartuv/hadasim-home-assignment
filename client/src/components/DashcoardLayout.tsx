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
    <div dir="rtl" className="min-h-screen bg-slate-100 text-slate-900">
      <div className="flex min-h-screen">
        <aside className="relative w-64 border-l border-slate-200 bg-white p-6 shadow-xl">
          <div className="mb-8">
            <h2 className="text-xl font-bold text-slate-950">מערכת ניהול טיול</h2>
            <p className="mt-1 text-sm font-medium text-cyan-700">בנות משה · ירושלים</p>
          </div>

          <nav className="space-y-2">
            {sidebarItems.map((item) => (
              <Button
                key={item.label}
                variant={item.isActive ? "default" : "ghost"}
                className={item.isActive ? "w-full justify-start bg-red-600 text-white hover:bg-red-700" : "w-full justify-start text-slate-700 hover:bg-slate-100 hover:text-red-700"}
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

        <main className="flex-1 bg-slate-100 p-8">
          <header className="mb-8 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
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