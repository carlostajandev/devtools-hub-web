/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import toast from "react-hot-toast";
import { useAuth } from "@/store/useAuth";
import { loginUser, registerUser } from "@/lib/auth";

export function AuthForm({ mode }: { mode: "login" | "register" }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { login } = useAuth();

const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  setLoading(true);

  try {
    if (mode === "login") {
      const res = await loginUser(email, password);

      // 🧠 Soporta ambas estructuras (según backend o Axios)
      const token =
        res.data?.data?.data?.token ||
        res.data?.data?.token ||
        res.data?.token;

      console.log("Token recibido del servidor:", token);
      console.log("Respuesta completa:", res.data);

      if (!token) {
        toast.error("No se recibió token del servidor");
        return;
      }

      // 🟢 Guarda token en Zustand/localStorage
      login(token, { email });

      // 🔐 Guarda también en cookies (para middleware)
      Cookies.set("token", token, {
        expires: 1, // 1 día
        sameSite: "strict",
      });

      toast.success("Inicio de sesión exitoso");

      // ⏱️ Delay para permitir que se guarde la cookie
      setTimeout(() => {
        router.push("/dashboard");
      }, 100);
    } else {
      await registerUser(name, email, password);
      toast.success("Registro exitoso. Ahora inicia sesión.");
      router.push("/login");
    }
  } catch (err: any) {
    console.error("Error en login:", err);
    toast.error("Error en el inicio de sesión");
  } finally {
    setLoading(false);
  }
};

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-sm mx-auto mt-12 p-6 border rounded-lg shadow bg-white"
    >
      <h2 className="text-xl font-bold mb-4 text-center text-gray-800">
        {mode === "login" ? "Iniciar sesión" : "Crear cuenta"}
      </h2>

      {mode === "register" && (
        <input
          type="text"
          placeholder="Nombre completo"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full mb-3 p-2 border rounded"
          required
        />
      )}

      <input
        type="email"
        placeholder="Correo electrónico"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="w-full mb-3 p-2 border rounded"
        required
      />

      <input
        type="password"
        placeholder="Contraseña"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="w-full mb-3 p-2 border rounded"
        required
      />

      <button
        type="submit"
        disabled={loading}
        className="w-full bg-indigo-600 text-white p-2 rounded hover:bg-indigo-700 transition"
      >
        {loading
          ? "Procesando..."
          : mode === "login"
          ? "Entrar"
          : "Registrarse"}
      </button>

      <p className="text-center text-sm mt-4 text-gray-600">
        {mode === "login" ? (
          <>
            ¿No tienes cuenta?{" "}
            <a href="/register" className="text-indigo-600 font-medium">
              Regístrate
            </a>
          </>
        ) : (
          <>
            ¿Ya tienes cuenta?{" "}
            <a href="/login" className="text-indigo-600 font-medium">
              Inicia sesión
            </a>
          </>
        )}
      </p>
    </form>
  );
}
