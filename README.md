📘 README — DevToolsHub Web (Frontend)
# 🚀 DevToolsHub Web — Plataforma FullStack

Interfaz moderna desarrollada con **Next.js 14**, **TypeScript**, y **TailwindCSS**, conectada a un backend NestJS.  
Permite a los usuarios registrarse, iniciar sesión, visualizar planes disponibles, realizar pagos y confirmar suscripciones con confirmacion via email.

---

## 🧠 Tabla de contenido

1. [Características principales](#-características-principales)
2. [Tecnologías utilizadas](#-tecnologías-utilizadas)
3. [Instalación y configuración](#-instalación-y-configuración)
4. [Estructura del proyecto](#-estructura-del-proyecto)
5. [Flujo funcional del sistema](#-flujo-funcional-del-sistema)
6. [Diseño y experiencia de usuario](#-diseño-y-experiencia-de-usuario)
7. [Buenas prácticas aplicadas](#-buenas-prácticas-aplicadas)
8. [Créditos](#-créditos)

---

## ✨ Características principales

- 🔐 **Autenticación segura** con Zustand y Cookies (login, registro).
- 💳 **Módulo de suscripción** con creación y confirmación de pagos.
- 🧩 **Dashboard dinámico**, con animaciones y feedback visual.
- 🎨 **Diseño profesional** con Tailwind + Framer Motion + Shadcn/UI.
- 🌐 Conexión directa con **backend NestJS** vía Axios.
- 🧱 Arquitectura limpia y desacoplada.
- 📱 100% **Responsive Design**.

---

## 🧰 Tecnologías utilizadas

### 🔹 Core
- **Next.js 14 (App Router)**
- **TypeScript**
- **Zustand** → manejo de sesión y estado global
- **Axios** → comunicación con API backend
- **Cookies (js-cookie)** → persistencia de token para middleware

### 🔹 UI / UX
- **TailwindCSS** → sistema de estilos moderno y utilitario
- **Shadcn/UI** → componentes base (`Button`, `Card`, `Dialog`, etc.)
- **Framer Motion** → animaciones suaves y naturales
- **Sonner** → notificaciones modernas y elegantes (toasts)
- **Glassmorphism + Gradients** → estilo visual profesional

### 🔹 Herramientas de desarrollo
- **ESLint / Prettier** → código limpio y formateado
- **PostCSS / Autoprefixer** → compatibilidad de estilos
- **Environment Variables (.env.local)** → configuración flexible

---

## ⚙️ Instalación y configuración

### 1️⃣ Clona el repositorio
```bash
git clone https://github.com/carlostajandev/devtools-hub-web.git
cd devtools-hub-web
```

### 2️⃣ Instala dependencias
```bash
npm install
```

### 3️⃣ Configura las variables de entorno
Crea un archivo `.env.local` en la raíz del proyecto con:

```
NEXT_PUBLIC_API_URL=http://localhost:3000/api
```

⚠️ Asegúrate de tener el backend (NestJS) corriendo en el puerto 3000.

### 4️⃣ Ejecuta el servidor de desarrollo
```bash
npm run dev
```

El proyecto estará disponible en 👉 [http://localhost:3001](http://localhost:3001)

---

## 🧩 Estructura del proyecto
```
📦 devtools-hub-web
├── app/
│   ├── (auth)/
│   │   ├── login/page.tsx
│   │   └── register/page.tsx
│   ├── dashboard/page.tsx
│   └── layout.tsx
├── components/
│   └── ui/ (Shadcn Components)
│       ├── button.tsx
│       ├── card.tsx
│       ├── dialog.tsx
│       └── input.tsx
├── lib/
│   ├── axios.ts
│   └── auth.ts
├── store/
│   └── useAuth.ts
├── styles/
│   └── globals.css
├── public/
└── README.md
```

---

## 💻 Flujo funcional del sistema

### 🔹 1. Autenticación
El usuario puede registrarse o iniciar sesión desde un formulario moderno.  
Los tokens se guardan en **localStorage** y **Cookies**.  
Un **middleware** protege las rutas privadas (Dashboard).

### 🔹 2. Dashboard
Muestra todos los planes activos consumidos desde `/api/plans/all`.  
Cada plan tiene su nombre, descripción y precio.

### 🔹 3. Proceso de suscripción
El usuario selecciona un plan → se abre un modal → llena los datos de su tarjeta → se realiza el pago con `POST /api/payments`.  
Se confirma automáticamente con `PATCH /api/payments/:id/confirm`.  
Aparece un **toast de éxito** y se actualiza la interfaz.

---

## 🎨 Diseño y experiencia de usuario

### 🔹 Login / Register
- Fondo gradiente animado (azul → violeta)
- Formulario con glassmorphism y efectos **backdrop-blur**
- Animaciones sutiles con **Framer Motion**
- Feedback visual con **Sonner Toasts**

### 🔹 Dashboard
- Tarjetas limpias, con hover y sombras suaves
- Grid responsive (1 → 2 → 3 columnas)
- Botones primarios en azul con `hover:bg-blue-700`
- Modales minimalistas con confirmación de pago
- Animaciones de carga con `animate-pulse`

---

## 🧱 Buenas prácticas aplicadas

- 🧩 **Arquitectura modular** → separación entre componentes, lógica y servicios  
- 🔐 **Persistencia segura** con cookies + Zustand  
- 💬 **Validaciones UX** antes de enviar datos al backend  
- 💅 **Consistencia visual** en todos los módulos  
- 📡 **Manejo de errores HTTP centralizado** con Axios y toast  
- ⚙️ **Variables de entorno** para ambientes locales o productivos  

---

