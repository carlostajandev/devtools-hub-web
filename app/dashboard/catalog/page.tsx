"use client";

import { Card } from "@/components/ui/card";

const tools = [
  { id: 1, name: "API Tester", desc: "Simula y prueba tus endpoints fácilmente." },
  { id: 2, name: "Code Formatter", desc: "Formatea código automáticamente." },
  { id: 3, name: "Docs Viewer", desc: "Visualiza documentación Swagger o Postman." },
];

export default function CatalogPage() {
  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
      {tools.map((tool) => (
        <Card key={tool.id} className="p-6 shadow hover:shadow-lg transition">
          <h3 className="font-semibold text-lg">{tool.name}</h3>
          <p className="text-gray-600 mt-2">{tool.desc}</p>
        </Card>
      ))}
    </div>
  );
}
