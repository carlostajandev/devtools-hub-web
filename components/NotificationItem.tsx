/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export function NotificationItem({ notification }: { notification: any }) {
  const isSuccess = notification.status === "enviada";

  return (
    <Card className="p-4 shadow-md hover:shadow-lg transition">
      <h3 className="font-semibold text-lg">{notification.title}</h3>
      <p className="text-gray-600 mt-1">{notification.message}</p>
      <div className="flex justify-between items-center mt-3">
        <Badge variant={isSuccess ? "success" : "error"}>
          {notification.status}
        </Badge>
        <span className="text-xs text-gray-500">
          {new Date(notification.createdAt).toLocaleString()}
        </span>
      </div>
    </Card>
  );
}
