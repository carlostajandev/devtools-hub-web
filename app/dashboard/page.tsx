/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import api from "@/lib/axios";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { toast } from "sonner";
import { useAuth } from "@/store/useAuth";

interface Plan {
  id: number;
  name: string;
  description: string;
  price: string;
}

export default function DashboardPage() {
  const { user } = useAuth();
  const [plans, setPlans] = useState<Plan[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedPlan, setSelectedPlan] = useState<Plan | null>(null);
  const [processingPlan, setProcessingPlan] = useState<number | null>(null);
  const [showPaymentForm, setShowPaymentForm] = useState(false);

  // Datos del formulario de pago
  const [cardData, setCardData] = useState({
    name: "",
    cardNumber: "",
    expiry: "",
    cvv: "",
  });

  // 🧩 Cargar planes desde el backend
  useEffect(() => {
    const fetchPlans = async () => {
      try {
        const { data } = await api.get("/plans/all");
        if (data?.data && Array.isArray(data.data)) {
          setPlans(data.data);
        } else {
          console.warn("⚠️ Respuesta inesperada del backend:", data);
        }
      } catch (err) {
        console.error("❌ Error al cargar planes:", err);
        toast.error("No se pudieron cargar los planes.");
      } finally {
        setLoading(false);
      }
    };

    fetchPlans();
  }, []);

  // 💳 Crear y confirmar pago
  const handleCreateAndConfirmPayment = async () => {
    if (!selectedPlan || !user) {
      toast.error("Usuario o plan no seleccionado.");
      return;
    }

    if (!cardData.name || !cardData.cardNumber || !cardData.expiry || !cardData.cvv) {
      toast.error("Por favor completa todos los campos del pago.");
      return;
    }

    try {
      setProcessingPlan(selectedPlan.id);
      setLoading(true);

      const paymentData = {
        userId: String(user.id || 3), // temporal
        subscriptionId: selectedPlan.id,
        amount: parseFloat(selectedPlan.price),
        method: "credit_card",
      };

      console.log("➡️ Enviando datos al backend:", paymentData);

      // Paso 1️⃣ Crear el pago
      const { data: paymentResponse } = await api.post("/payments", paymentData);
      const paymentId = paymentResponse?.data?.id;

      if (!paymentId) {
        toast.error("❌ No se pudo crear el pago.");
        return;
      }

      console.log("✅ Pago creado correctamente:", paymentResponse);

      // Paso 2️⃣ Confirmar pago
      toast.loading("Confirmando pago...");
      const { data: confirmResponse } = await api.patch(`/payments/${paymentId}/confirm`, paymentData);

      console.log("✅ Pago confirmado correctamente:", confirmResponse);
      toast.dismiss();
      toast.success("✅ Pago confirmado correctamente. Revisa tu correo 📧");

      // Cerrar modal y limpiar
      setShowPaymentForm(false);
      setSelectedPlan(null);
      setCardData({ name: "", cardNumber: "", expiry: "", cvv: "" });
    } catch (error: any) {
      console.error("❌ Error en el flujo de pago:", error);
      toast.dismiss();
      toast.error("Error al procesar o confirmar el pago.");
    } finally {
      setLoading(false);
      setProcessingPlan(null);
    }
  };

  // 🕓 Loader visual
  if (loading && plans.length === 0) {
    return (
      <div className="flex justify-center items-center h-[70vh]">
        <p className="text-gray-500 animate-pulse text-lg">
          Cargando planes disponibles...
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-10 p-6 md:p-10">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h1 className="text-3xl font-bold text-gray-800">Planes disponibles</h1>
        <p className="text-gray-500">
          Elige el plan que mejor se adapte a tus necesidades 💼
        </p>
      </div>

      {/* 🧱 Grid de planes */}
      {plans.length === 0 ? (
        <p className="text-gray-500">No hay planes disponibles.</p>
      ) : (
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
          initial="hidden"
          animate="visible"
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: { staggerChildren: 0.15 },
            },
          }}
        >
          {plans.map((plan) => (
            <motion.div
              key={plan.id}
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0 },
              }}
            >
              <Card className="p-6 bg-white border border-gray-200 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300 rounded-2xl">
                <h3 className="text-xl font-semibold capitalize text-gray-800 mb-2">
                  {plan.name}
                </h3>
                <p className="text-gray-600 mb-4 h-16">{plan.description}</p>

                <div className="text-4xl font-bold text-gray-900 mb-4">
                  ${plan.price}
                  <span className="text-base text-gray-500 ml-1">/mes</span>
                </div>

                <Button
                  className="w-full bg-blue-600 hover:bg-blue-700 transition-all"
                  onClick={() => setSelectedPlan(plan)}
                >
                  Suscribirme
                </Button>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      )}

      {/* 🪟 Modal 1 — Confirmación */}
      <Dialog open={!!selectedPlan && !showPaymentForm} onOpenChange={() => setSelectedPlan(null)}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Confirmar suscripción</DialogTitle>
            <DialogDescription>
              ¿Deseas suscribirte al plan{" "}
              <span className="font-semibold text-gray-900">{selectedPlan?.name}</span>{" "}
              por{" "}
              <span className="font-semibold text-blue-600">
                ${selectedPlan?.price}/mes
              </span>
              ?
            </DialogDescription>
          </DialogHeader>

          <DialogFooter className="flex justify-end gap-2 mt-4">
            <Button variant="outline" onClick={() => setSelectedPlan(null)}>
              Cancelar
            </Button>
            <Button
              onClick={() => setShowPaymentForm(true)}
              className="bg-blue-600 hover:bg-blue-700"
            >
              Continuar al pago
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* 💳 Modal 2 — Formulario de pago */}
      <Dialog open={showPaymentForm} onOpenChange={setShowPaymentForm}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Detalles del pago</DialogTitle>
            <DialogDescription>
              Ingresa la información de tu tarjeta para completar la compra.
            </DialogDescription>
          </DialogHeader>

          <form className="space-y-4 mt-4">
            <div>
              <label className="block text-sm font-medium mb-1 text-gray-700">
                Nombre en la tarjeta
              </label>
              <input
                type="text"
                className="w-full border rounded-lg p-2 focus:ring-2 focus:ring-blue-500"
                value={cardData.name}
                onChange={(e) => setCardData({ ...cardData, name: e.target.value })}
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1 text-gray-700">
                Número de tarjeta
              </label>
              <input
                type="text"
                maxLength={16}
                className="w-full border rounded-lg p-2 focus:ring-2 focus:ring-blue-500"
                value={cardData.cardNumber}
                onChange={(e) => setCardData({ ...cardData, cardNumber: e.target.value })}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-1 text-gray-700">
                  Fecha de expiración
                </label>
                <input
                  type="text"
                  placeholder="MM/AA"
                  className="w-full border rounded-lg p-2 focus:ring-2 focus:ring-blue-500"
                  value={cardData.expiry}
                  onChange={(e) => setCardData({ ...cardData, expiry: e.target.value })}
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1 text-gray-700">
                  CVV
                </label>
                <input
                  type="password"
                  maxLength={3}
                  className="w-full border rounded-lg p-2 focus:ring-2 focus:ring-blue-500"
                  value={cardData.cvv}
                  onChange={(e) => setCardData({ ...cardData, cvv: e.target.value })}
                />
              </div>
            </div>
          </form>

          <DialogFooter className="flex justify-end gap-2 mt-6">
            <Button variant="outline" onClick={() => setShowPaymentForm(false)} disabled={loading}>
              Cancelar
            </Button>
            <Button
              onClick={handleCreateAndConfirmPayment}
              disabled={loading}
              className="bg-blue-600 hover:bg-blue-700"
            >
              {loading ? "Procesando..." : "Pagar ahora"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
