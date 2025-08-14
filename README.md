# Arepas Burguer — Sistema de Pedidos con QR (Next.js + Prisma)

Incluye:
- Menú clientes con QR por mesa y también selección/escritura de mesa sin QR
- Carrito, envío a cocina, estados (PENDING→PREPARING→READY)
- Panel Admin: productos (con imagen), inventario, gastos, reportes
- Tickets imprimibles (80mm)
- Generador/impresión de QR por mesa
- Subida de imágenes local o Cloudinary

## Instalación local rápida
```bash
npm install
npm run db:push
npm run db:seed
npm run dev
```
o usa los scripts en `/scripts` (Windows/Mac/Linux).

## Variables de entorno
Ver `.env.example` y `.env.production.example`.


> Este paquete está ya configurado para **PostgreSQL** por defecto (Neon recomendado). Ajusta `DATABASE_URL` en Vercel y ejecuta `npm run db:push && npm run db:seed`.
