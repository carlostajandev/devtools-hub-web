import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export function PaymentCard({
  payment,
  onConfirm,
}: {
  payment: {
    id: number;
    amount: number;
    status: string;
    method: string;
    createdAt: string;
  };
  onConfirm?: () => void;
}) {
  return (
    <Card className="p-4 space-y-2 border-gray-200">
      <h3 className="font-semibold text-lg text-gray-800">
        Pago #{payment.id}
      </h3>
      <p className="text-sm text-gray-500">
        Fecha: {new Date(payment.createdAt).toLocaleDateString()}
      </p>
      <p className="text-sm">
        <strong>Monto:</strong> ${payment.amount}
      </p>
      <p className="text-sm">
        <strong>Método:</strong> {payment.method}
      </p>

      <p
        className={`text-sm font-medium ${
          payment.status === "completed"
            ? "text-green-600"
            : "text-yellow-600"
        }`}
      >
        Estado: {payment.status}
      </p>

      {payment.status !== "completed" && onConfirm && (
        <Button
          onClick={onConfirm}
          variant="outline"
          className="w-full mt-2"
        >
          Confirmar pago
        </Button>
      )}
    </Card>
  );
}
