import { prisma } from '@/lib/prisma';
import { NextResponse } from 'next/server';

export async function GET() {
  const products = await prisma.product.findMany({ orderBy: { id: 'asc' } });
  return NextResponse.json(products);
}

export async function POST(req: Request) {
  const data = await req.json();
  if (!data.name || !data.priceCents) return new NextResponse('Nombre/precio requeridos', { status: 400 });
  const created = await prisma.product.create({
    data: {
      name: data.name,
      description: data.description || null,
      priceCents: Number(data.priceCents),
      costCents: Number(data.costCents || 0),
      imageUrl: data.imageUrl || null,
      isAvailable: data.isAvailable !== false,
    },
  });
  return NextResponse.json(created);
}

export async function PATCH(req: Request) {
  const data = await req.json();
  if (!data.id) return new NextResponse('ID requerido', { status: 400 });
  const updated = await prisma.product.update({
    where: { id: Number(data.id) },
    data: { isAvailable: Boolean(data.isAvailable) },
  });
  return NextResponse.json(updated);
}

export async function PUT(req: Request) {
  const data = await req.json();
  if (!data.id) return new NextResponse('ID requerido', { status: 400 });
  const patch: any = {};
  if (typeof data.name === 'string') patch.name = data.name;
  if (typeof data.description === 'string' || data.description === null) patch.description = data.description ?? null;
  if (typeof data.priceCents === 'number') patch.priceCents = Number(data.priceCents);
  if (typeof data.costCents === 'number') patch.costCents = Number(data.costCents);
  if (typeof data.isAvailable === 'boolean') patch.isAvailable = data.isAvailable;
  if (typeof data.imageUrl === 'string' || data.imageUrl === null) patch.imageUrl = data.imageUrl ?? null;
  const updated = await prisma.product.update({ where: { id: Number(data.id) }, data: patch });
  return NextResponse.json(updated);
}
