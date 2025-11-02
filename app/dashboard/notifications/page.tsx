/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import React, { useEffect, useState } from "react";
import { fetchNotifications } from "@/lib/api";
import { NotificationItem } from "@/components/NotificationItem";

export default function NotificationsPage() {
  const [notifications, setNotifications] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchNotifications()
      .then((data) => setNotifications(data))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <p>Cargando notificaciones...</p>;
  if (!notifications.length) return <p>No hay notificaciones aún.</p>;

  return (
    <div className="grid md:grid-cols-2 gap-4 p-6">
      {notifications.map((n) => (
        <NotificationItem key={n.id} notification={n} />
      ))}
    </div>
  );
}
