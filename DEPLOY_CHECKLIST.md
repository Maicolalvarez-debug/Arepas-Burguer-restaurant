# Checklist de Publicación
- GitHub listo con el código
- Cloudinary: tienes CLOUDINARY_CLOUD_NAME y un Upload Preset (Unsigned)
- (Opcional) Neon: tienes tu DATABASE_URL
- Vercel: agregaste todas las Environment Variables
- Pruebas: /menu, /admin, /admin/qrs


> Este paquete está ya configurado para **PostgreSQL** por defecto (Neon recomendado). Ajusta `DATABASE_URL` en Vercel y ejecuta `npm run db:push && npm run db:seed`.
