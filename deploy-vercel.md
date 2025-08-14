# Publicar tu restaurante en Vercel

1) Sube el proyecto a GitHub (Add file → Upload files).
2) En Vercel: Add New Project → importa el repo.
3) Variables (Project Settings → Environment Variables):
   - NEXT_PUBLIC_BASE_URL=https://TU_PROYECTO.vercel.app
   - NEXT_PUBLIC_ADMIN_KEY=tu_clave
   - CLOUDINARY_CLOUD_NAME=dxldcjcot
   - CLOUDINARY_UNSIGNED_PRESET=tu_preset
   - DATABASE_URL=postgresql://... (si usas Neon)
4) Deploy. Luego inicializa BD si usas Postgres:
```bash
npm run db:push
npm run db:seed
```
