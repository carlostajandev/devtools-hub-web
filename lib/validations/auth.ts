import { z } from "zod";

export const LoginSchema = z.object({
  email: z.string().email({ message: "Correo electrónico inválido" }),
  password: z.string().min(6, { message: "Mínimo 6 caracteres" }),
});

export const RegisterSchema = z.object({
  name: z.string().min(2, { message: "El nombre es obligatorio" }),
  email: z.string().email({ message: "Correo electrónico inválido" }),
  password: z.string().min(6, { message: "Mínimo 6 caracteres" }),
});
