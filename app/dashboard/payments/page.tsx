"use client";

import { useEffect, useState } from "react";
import api from "@/lib/axios";
import { useAuth } from "@/store/useAuth";
import { Button } from "@/components/ui/button";
import { PaymentCard } from "./components/paymentCard";
import toast from "react-hot-toast";

interface Payment {
  id: number;
  userId: number;
  subscriptionId: number;
  amount: number;
  status: string;
  method: string;
  createdAt: string;
}

export default function PaymentsPage() {
  const { user } = useAuth();
  const [payments, setPayments] = useState<Payment[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchPayments = async () => {
    try {
      const { data } = await api.get(`/payments/user/${user.id}`);
      setPayments(data);
    } catch (err) {
      toast.error("Error al obtener pagos");
    } finally {
      setLoading(false);
    }
  };

  const confirmPayment = async (payment: Payment) => {
    try {
      const { data } = await api.patch(`/payments/${payment.id}/confirm`, {
        userId: payment.userId,
        subscriptionId: payment.subscriptionId,
        amount: payment.amount,
        method: payment.method,
      });

      toast.success("Pago confirmado con éxito ✅");

      // Actualizamos el estado local con la nueva info del pago
      setPayments((prev) =>
        prev.map((p) => (p.id === data.data.id ? data.data : p))
      );
    } catch (err) {
      toast.error("Error al confirmar el pago");
    }
  };

  useEffect(() => {
    if (user?.id) fetchPayments();
  }, [user]);

  if (loading)
    return <p className="text-gray-600 text-center mt-8">Cargando pagos...</p>;

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-semibold">Mis Pagos</h2>

      {payments.length === 0 ? (
        <p className="text-gray-500">No tienes pagos registrados aún.</p>
      ) : (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {payments.map((payment) => (
            <PaymentCard
              key={payment.id}
              payment={payment}
              onConfirm={() => confirmPayment(payment)}
            />
          ))}
        </div>
      )}
    </div>
  );
}
