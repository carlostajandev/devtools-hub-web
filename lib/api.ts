
import api from "./axios";

export async function getPlans() {
  try {
    const { data } = await api.get("/plans/all");
    return data.data;
  } catch (error) {
    console.error("Error obteniendo planes:", error);
    return [];
  }
}

export async function fetchNotifications() {
  const res = await api.get("/notifications");
  if (res.status !== 200) throw new Error("Error al cargar notificaciones");
  return res.data.data || [];
}
