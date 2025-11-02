"use client";

import { useEffect } from "react";
import { useAuth } from "@/store/useAuth";
import { Providers } from "./providers"; // si ya lo tienes
import "../styles/globals.css";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { initialize, loading, user } = useAuth();

  // ⚙️ Rehidratar sesión desde localStorage cuando carga la app
  useEffect(() => {
    initialize();
  }, [initialize]);

  // ⏳ Mostrar un loader breve mientras se rehidrata la sesión
  if (loading) {
    return (
      <html lang="es">
        <body className="flex items-center justify-center h-screen bg-gray-50 text-gray-700">
          <p className="text-lg animate-pulse">Cargando sesión...</p>
        </body>
      </html>
    );
  }

  return (
    <html lang="es">
      <body className="bg-gray-50 text-gray-900">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
