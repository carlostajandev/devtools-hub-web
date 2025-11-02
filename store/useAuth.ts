/* eslint-disable @typescript-eslint/no-explicit-any */
import { create } from "zustand";
import Cookies from "js-cookie";

interface AuthState {
  token: string | null;
  user: any | null;
  loading: boolean;
  login: (token: string, user: any) => void;
  logout: () => void;
  initialize: () => void;
}

export const useAuth = create<AuthState>((set) => ({
  token: null,
  user: null,
  loading: true,

  // 🟢 Guardar datos de sesión
  login: (token, user) => {
    localStorage.setItem("token", token);
    localStorage.setItem("user", JSON.stringify(user));
    set({ token, user, loading: false });
  },

  // 🔴 Cerrar sesión
logout: () => {
  Cookies.remove("token");
  localStorage.removeItem("token");
  localStorage.removeItem("user");
  set({ token: null, user: null, loading: false });
},

  // ⚙️ Rehidratar sesión al recargar la página
  initialize: () => {
    const token = localStorage.getItem("token");
    const user = localStorage.getItem("user");
    if (token && user) {
      set({ token, user: JSON.parse(user), loading: false });
    } else {
      set({ loading: false });
    }
  },
}));
