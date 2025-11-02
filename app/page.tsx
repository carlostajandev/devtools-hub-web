/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useEffect, useState } from "react";
import { useAuth } from "@/store/useAuth";
import { useRouter } from "next/navigation";
import { getPlans } from "@/lib/api";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

export default function DashboardPage() {
  const { user, logout } = useAuth();
  const router = useRouter();
  const [plans, setPlans] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Si no hay usuario autenticado, redirige al login
    if (!user) {
      router.push("/login");
      return;
    }

    const fetchPlans = async () => {
      try {
        const data = await getPlans();
        setPlans(data);
      } catch (err) {
        console.error("Error al cargar los planes:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchPlans();
  }, [user, router]);

  // Mientras carga
  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center text-gray-600">
        Cargando información...
      </div>
    );
  }

  // Si no hay usuario (seguridad adicional)
  if (!user) return null;

  return (
    <main className="min-h-screen bg-gray-50 p-8">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-indigo-600">DevToolsHub</h1>
        <Button
          onClick={() => {
            logout();
            router.push("/login");
          }}
          variant="danger"
        >
          Cerrar sesión
        </Button>
      </div>

      {/* Bienvenida */}
      <section className="bg-white shadow rounded-lg p-6 mb-10">
        <h2 className="text-2xl font-semibold mb-2">Bienvenido 👋</h2>
        <p className="text-gray-700">
          <strong>Email:</strong> {user.email}
        </p>
        <p className="text-gray-700">
          <strong>Fecha de registro:</strong>{" "}
          {user.registrationDate
            ? new Date(user.registrationDate).toLocaleDateString()
            : "No disponible"}
        </p>
      </section>

      {/* Plan actual */}
      <section className="bg-white shadow rounded-lg p-6 mb-10">
        <h2 className="text-xl font-semibold mb-4 text-indigo-700">
          Plan activo
        </h2>

        {user.activePlan ? (
          <p className="text-gray-700">
            Estás suscrito al plan:{" "}
            <strong className="text-indigo-600">{user.activePlan}</strong>
          </p>
        ) : (
          <div>
            <p className="text-gray-600 mb-4">
              No tienes un plan activo actualmente.
            </p>
            <h3 className="text-lg font-semibold mb-2">
              Elige un plan para comenzar 🚀
            </h3>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 w-full mt-6">
              {plans.map((plan) => (
                <Card
                  key={plan.id}
                  className="text-center p-6 border border-gray-200"
                >
                  <h2 className="text-2xl font-semibold text-indigo-700">
                    {plan.name}
                  </h2>
                  <p className="text-gray-500 mt-2">{plan.description}</p>
                  <p className="text-3xl font-bold text-gray-800 mt-4">
                    ${plan.price}
                    <span className="text-sm text-gray-400 ml-1">/mes</span>
                  </p>

                  <Button
                    onClick={() => router.push(`/checkout?planId=${plan.id}`)}
                    className="mt-6 w-full bg-indigo-600 hover:bg-indigo-700"
                  >
                    Suscribirme
                  </Button>
                </Card>
              ))}
            </div>
          </div>
        )}
      </section>

      <footer className="text-center text-sm text-gray-500 mt-16">
        © {new Date().getFullYear()} DevToolsHub — Todos los derechos reservados.
      </footer>
    </main>
  );
}
