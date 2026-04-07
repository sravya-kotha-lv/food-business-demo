import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  LayoutDashboard, Users, ShoppingBag, GitBranch, IndianRupee,
  Menu, X, ChevronDown, Bell, Search, LogOut, Settings, User
} from "lucide-react";

const navItems = [
  { path: "/", label: "Dashboard", icon: LayoutDashboard },
  { path: "/network", label: "My Network", icon: GitBranch },
  { path: "/products", label: "Products", icon: ShoppingBag },
  { path: "/members", label: "Members", icon: Users },
  { path: "/commissions", label: "Commissions", icon: IndianRupee },
];

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();

  return (
    <div className="min-h-screen flex bg-background">
      {/* Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 w-64 gradient-hero text-sidebar-foreground transform transition-transform duration-300 lg:translate-x-0 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex items-center gap-3 px-6 py-5 border-b border-sidebar-border">
          <div className="w-10 h-10 rounded-lg gradient-primary flex items-center justify-center text-lg font-bold text-primary-foreground">
            🌿
          </div>
          <div>
            <h1 className="font-bold text-lg tracking-tight">NutriNet</h1>
            <p className="text-xs text-sidebar-foreground/60">MLM Food Business</p>
          </div>
        </div>

        <nav className="mt-6 px-3 space-y-1">
          {navItems.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <Link
                key={item.path}
                to={item.path}
                onClick={() => setSidebarOpen(false)}
                className={`flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-all duration-200 ${
                  isActive
                    ? "bg-sidebar-primary text-sidebar-primary-foreground shadow-lg"
                    : "text-sidebar-foreground/70 hover:bg-sidebar-accent hover:text-sidebar-foreground"
                }`}
              >
                <item.icon className="w-5 h-5" />
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-sidebar-border">
          <div className="flex items-center gap-3 px-3">
            <div className="w-9 h-9 rounded-full gradient-secondary flex items-center justify-center text-sm font-bold text-secondary-foreground">
              AD
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium truncate">Admin User</p>
              <p className="text-xs text-sidebar-foreground/50">Diamond Rank</p>
            </div>
          </div>
        </div>
      </aside>

      {/* Overlay */}
      {sidebarOpen && (
        <div className="fixed inset-0 z-40 bg-foreground/50 lg:hidden" onClick={() => setSidebarOpen(false)} />
      )}

      {/* Main Content */}
      <div className="flex-1 lg:ml-64">
        {/* Top Bar */}
        <header className="sticky top-0 z-30 bg-card/80 backdrop-blur-lg border-b border-border px-4 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <button onClick={() => setSidebarOpen(true)} className="lg:hidden p-2 rounded-lg hover:bg-muted">
                <Menu className="w-5 h-5" />
              </button>
              <div className="relative hidden md:block">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <input
                  placeholder="Search members, products..."
                  className="pl-10 pr-4 py-2 w-72 rounded-lg bg-muted border-0 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20"
                />
              </div>
            </div>
            <div className="flex items-center gap-3">
              <button className="relative p-2 rounded-lg hover:bg-muted">
                <Bell className="w-5 h-5 text-muted-foreground" />
                <span className="absolute top-1 right-1 w-2 h-2 bg-destructive rounded-full" />
              </button>
              <div className="w-9 h-9 rounded-full gradient-primary flex items-center justify-center text-sm font-bold text-primary-foreground">
                AD
              </div>
            </div>
          </div>
        </header>

        <main className="p-4 lg:p-8">{children}</main>
      </div>
    </div>
  );
};

export default DashboardLayout;
