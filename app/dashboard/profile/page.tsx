"use client";

import { useAuth } from "@/store/useAuth";
import api from "@/lib/axios";
import toast from "react-hot-toast";
import { useState } from "react";
import { Button } from "@/components/ui/button";

export default function ProfilePage() {
  const { user } = useAuth();
  const [name, setName] = useState(user?.name || "");
  const [email, setEmail] = useState(user?.email || "");

  const handleUpdate = async () => {
    try {
      const { data } = await api.patch(`/users/${user?.id}`, { name, email });
      toast.success("Perfil actualizado");
      localStorage.setItem("user", JSON.stringify(data));
    } catch {
      toast.error("Error al actualizar perfil");
    }
  };

  return (
    <div className="max-w-lg mx-auto space-y-6">
      <h2 className="text-2xl font-semibold">Editar perfil</h2>
      <div>
        <label className="block text-sm font-medium">Nombre</label>
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="border rounded w-full p-2"
        />
      </div>

      <div>
        <label className="block text-sm font-medium">Correo</label>
        <input
          value={email}
          disabled
          className="border rounded w-full p-2 bg-gray-100"
        />
      </div>

      <Button onClick={handleUpdate}>Guardar cambios</Button>
    </div>
  );
}
