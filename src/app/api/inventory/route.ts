import { prisma } from '@/lib/prisma';
import { NextResponse } from 'next/server';

export async function GET() {
  const items = await prisma.inventoryItem.findMany({ orderBy: { updatedAt: 'desc' } });
  return NextResponse.json(items);
}

export async function POST(req: Request) {
  const body = await req.json();
  const created = await prisma.inventoryItem.create({ data: { name: body.name, quantity: Number(body.quantity || 0), unit: body.unit || 'unidad', costPerUnit: Number(body.costPerUnit || 0) } });
  return NextResponse.json(created);
}
