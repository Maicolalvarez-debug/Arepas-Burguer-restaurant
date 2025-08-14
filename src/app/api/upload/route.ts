// @ts-nocheck
import { NextResponse } from 'next/server';
export const runtime = 'nodejs';
export async function POST(req: Request) {
  try {
    const form = await req.formData();
    const file = form.get('file') as File | null;
    if (!file) return new NextResponse('No file', { status: 400 });
    const cloud = process.env.CLOUDINARY_CLOUD_NAME;
    const preset = process.env.CLOUDINARY_UNSIGNED_PRESET;
    if (cloud && preset) {
      const cForm = new FormData();
      cForm.append('file', file);
      cForm.append('upload_preset', preset);
      const res = await fetch(`https://api.cloudinary.com/v1_1/${cloud}/image/upload`, { method: 'POST', body: cForm as any });
      if (!res.ok) return new NextResponse('Cloudinary error: ' + await res.text(), { status: 500 });
      const data = await res.json();
      return NextResponse.json({ url: data.secure_url || data.url });
    } else {
      const arrayBuffer = await file.arrayBuffer();
      const buffer = Buffer.from(arrayBuffer);
      const fs = await import('fs'); const path = await import('path');
      const now = Date.now();
      const ext = (file.name?.split('.').pop() || 'jpg').toLowerCase();
      const filename = `${now}-${Math.random().toString(36).slice(2)}.${ext}`;
      const dir = path.join(process.cwd(), 'public', 'uploads');
      if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
      const full = path.join(dir, filename);
      fs.writeFileSync(full, buffer);
      const url = `/uploads/${filename}`;
      return NextResponse.json({ url });
    }
  } catch (e: any) {
    return new NextResponse('Upload error: ' + e?.message, { status: 500 });
  }
}
