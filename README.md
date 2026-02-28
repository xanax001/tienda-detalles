# GEYDABLOOMS

Web de pedidos: detalles y arreglos de flores eternas, rosas preservadas y maquillaje. Carrito y envío del pedido por WhatsApp.

## Desplegar en Vercel (gratis)

### Opción 1: Desde la web de Vercel

1. Entra en [vercel.com](https://vercel.com) y crea cuenta (o inicia sesión con GitHub).
2. Click en **Add New** → **Project**.
3. Importa tu repositorio de Git donde esté este proyecto, o sube la carpeta con **Import Third-Party Git Repository** / **Upload** (si no usas Git, mejor crea un repo en GitHub primero y sube el código).
4. Vercel detectará que es un proyecto Vite:
   - **Build Command:** `npm run build`
   - **Output Directory:** `dist`
5. Click en **Deploy**. En unos minutos tendrás una URL tipo `tu-proyecto.vercel.app`.

### Opción 2: Con Vercel CLI

```bash
# Instalar Vercel CLI (una vez)
npm i -g vercel

# Desde la carpeta del proyecto
cd tienda-detalles
npm install
vercel
```

Sigue los pasos (login si hace falta, nombre del proyecto, etc.). Al final te dará la URL de despliegue.

### Rutas y dominio

- El archivo `vercel.json` ya está configurado para que todas las rutas (`/`, `/rosas-eternas`, `/maquillaje`, `/carrito`) funcionen al recargar o al entrar por enlace.
- En el panel de Vercel puedes añadir un dominio propio si lo tienes.

## Desarrollo local

```bash
npm install
npm run dev
```

Abre [http://localhost:5174](http://localhost:5174).
