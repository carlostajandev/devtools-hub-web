"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useAuth } from "@/store/useAuth";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import {
  Home,
  User,
  CreditCard,
  Package,
  Settings,
  LogOut,
} from "lucide-react";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const { logout } = useAuth();

  const handleLogout = () => {
    logout();
    router.push("/login");
  };

  const menuItems = [
    { name: "Inicio", href: "/dashboard", icon: Home },
    { name: "Mi Perfil", href: "/dashboard/profile", icon: User },
    { name: "Suscripción", href: "/dashboard/subscription", icon: CreditCard },

  ];

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar */}
      <aside className="w-64 bg-gradient-to-b from-slate-900 to-slate-800 text-white flex-col justify-between hidden md:flex">
        <div>
          <div className="p-6 border-b border-slate-700">
            <h1 className="text-xl font-bold tracking-wide">DevToolsHub</h1>
          </div>
          <nav className="flex flex-col mt-6 space-y-1">
            {menuItems.map(({ name, href, icon: Icon }) => (
              <Link
                key={name}
                href={href}
                className={cn(
                  "flex items-center px-6 py-2 hover:bg-slate-700/70 transition-all",
                  pathname === href
                    ? "bg-slate-700 text-white font-medium"
                    : "text-gray-300 hover:text-white"
                )}
              >
                <Icon className="w-5 h-5 mr-3" />
                {name}
              </Link>
            ))}
          </nav>
        </div>

        <div className="p-6 border-t border-slate-700">
          <Button
            variant="danger"
            className="w-full flex items-center justify-center gap-2 bg-slate-700 hover:bg-slate-600"
            onClick={handleLogout}
          >
            <LogOut className="w-4 h-4" />
            Cerrar sesión
          </Button>
        </div>
      </aside>

      {/* Main content */}
      <main className="flex-1 p-6 md:p-10">
        <header className="flex justify-between items-center mb-6 md:hidden">
          <h1 className="text-lg font-semibold">DevToolsHub</h1>
          <Button variant="outline" onClick={handleLogout}>
            <LogOut className="w-4 h-4" />
          </Button>
        </header>
        {children}
      </main>
    </div>
  );
}
