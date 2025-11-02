/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useAuth } from "@/store/useAuth";
import { useEffect, useState } from "react";
import api from "@/lib/axios";
import { Card } from "@/components/ui/card";

export default function DashboardPage() {
  const { user } = useAuth();
  const [plan, setPlan] = useState<any>(null);

  useEffect(() => {
    const fetchPlan = async () => {
      if (!user?.activePlan) return;
      const { data } = await api.get(`/plans/${user.activePlan}`);
      setPlan(data);
    };
    fetchPlan();
  }, [user]);

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-semibold">Bienvenido, {user?.name}</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card className="p-6">
          <h3 className="text-lg font-semibold mb-2">Tu información</h3>
          <p><strong>Email:</strong> {user?.email}</p>
          <p><strong>Fecha de registro:</strong> {new Date(user?.registrationDate).toLocaleDateString()}</p>
        </Card>

        <Card className="p-6">
          <h3 className="text-lg font-semibold mb-2">Plan activo</h3>
          {plan ? (
            <>
              <p><strong>Nombre:</strong> {plan.name}</p>
              <p><strong>Precio:</strong> ${plan.price}</p>
              <p><strong>Descripción:</strong> {plan.description}</p>
            </>
          ) : (
            <p>No tienes un plan activo actualmente.</p>
          )}
        </Card>
      </div>
    </div>
  );
}
