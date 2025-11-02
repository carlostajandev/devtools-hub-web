"use client";

import { useAuth } from "@/store/useAuth";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { token, logout } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!token) router.push("/login");
  }, [token, router]);

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-md p-4 flex justify-between items-center">
        <h1 className="text-xl font-semibold text-gray-800">DevToolsHub</h1>
        <Button variant="outline" onClick={logout}>
          Cerrar sesión
        </Button>
      </header>
      <main className="p-6">{children}</main>
    </div>
  );
}
