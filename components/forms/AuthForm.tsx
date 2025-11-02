/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import { motion } from "framer-motion";
import { toast } from "sonner";
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

        const token =
          res.data?.data?.data?.token ||
          res.data?.data?.token ||
          res.data?.token;

        if (!token) {
          toast.error("No se recibió token del servidor");
          return;
        }

        login(token, { email });
        Cookies.set("token", token, { expires: 1, sameSite: "strict" });

        toast.success("Inicio de sesión exitoso");
        setTimeout(() => router.push("/dashboard"), 200);
      } else {
        await registerUser(name, email, password);
        toast.success("Registro exitoso. Ahora inicia sesión.");
        router.push("/login");
      }
    } catch (err: any) {
      console.error("❌ Error en login/register:", err);
      toast.error("Error al procesar tu solicitud.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-600 via-indigo-700 to-purple-700 p-6">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl shadow-xl p-8"
      >
        <h2 className="text-3xl font-bold text-white text-center mb-6">
          {mode === "login" ? "Bienvenido de nuevo" : "Crea tu cuenta"}
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          {mode === "register" && (
            <div>
              <label className="block text-white/80 text-sm mb-1">
                Nombre completo
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full p-3 rounded-lg bg-white/20 text-white placeholder-white/60 focus:ring-2 focus:ring-indigo-400 outline-none"
                placeholder="Ej. Carlos Tajan"
                required
              />
            </div>
          )}

          <div>
            <label className="block text-white/80 text-sm mb-1">
              Correo electrónico
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-3 rounded-lg bg-white/20 text-white placeholder-white/60 focus:ring-2 focus:ring-indigo-400 outline-none"
              placeholder="tu@correo.com"
              required
            />
          </div>

          <div>
            <label className="block text-white/80 text-sm mb-1">
              Contraseña
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-3 rounded-lg bg-white/20 text-white placeholder-white/60 focus:ring-2 focus:ring-indigo-400 outline-none"
              placeholder="••••••••"
              required
            />
          </div>

          <motion.button
            type="submit"
            whileTap={{ scale: 0.97 }}
            disabled={loading}
            className="w-full py-3 mt-4 bg-blue-600 hover:bg-blue-700 transition-all rounded-lg text-white font-semibold shadow-lg"
          >
            {loading
              ? "Procesando..."
              : mode === "login"
              ? "Iniciar sesión"
              : "Registrarme"}
          </motion.button>
        </form>

        <p className="text-center text-sm text-white/70 mt-6">
          {mode === "login" ? (
            <>
              ¿No tienes cuenta?{" "}
              <a href="/register" className="text-blue-300 font-medium">
                Regístrate
              </a>
            </>
          ) : (
            <>
              ¿Ya tienes cuenta?{" "}
              <a href="/login" className="text-blue-300 font-medium">
                Inicia sesión
              </a>
            </>
          )}
        </p>
      </motion.div>
    </div>
  );
}
