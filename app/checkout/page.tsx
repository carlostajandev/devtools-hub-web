/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import api from "@/lib/axios";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import toast from "react-hot-toast";
import { useAuth } from "@/store/useAuth";

export default function CheckoutPage() {
  const params = useSearchParams();
  const router = useRouter();
  const { user } = useAuth();

  const [plan, setPlan] = useState<any>(null);
  const planId = params.get("planId");

  useEffect(() => {
    const fetchPlan = async () => {
      if (!planId) return;
      try {
        const { data } = await api.get(`/plans/${planId}`);
        setPlan(data.data);
      } catch (err) {
        toast.error("No se pudo cargar el plan");
      }
    };
    fetchPlan();
  }, [planId]);

  const handlePayment = async () => {
    try {
      await api.post("/payments", {
        userId: user?.id,
        planId: plan.id,
        amount: plan.price,
      });
      toast.success("Pago procesado exitosamente 🎉");
      router.push("/dashboard/subscription");
    } catch {
      toast.error("Error procesando el pago");
    }
  };

  if (!plan) return <p className="text-center">Cargando...</p>;

  return (
    <Card className="p-8 space-y-6">
      <h1 className="text-2xl font-semibold text-indigo-700 text-center">
        Confirmar compra
      </h1>

      <div className="border rounded-lg p-6 space-y-3 bg-gray-50">
        <p><strong>Plan:</strong> {plan.name}</p>
        <p><strong>Descripción:</strong> {plan.description}</p>
        <p><strong>Precio:</strong> ${parseFloat(plan.price).toFixed(2)}</p>
      </div>

      <div className="flex justify-center gap-4">
        <Button onClick={handlePayment} className="bg-indigo-600 hover:bg-indigo-700">
          Confirmar pago
        </Button>
        <Button variant="outline" onClick={() => router.push("/")}>
          Cancelar
        </Button>
      </div>
    </Card>
  );
}
