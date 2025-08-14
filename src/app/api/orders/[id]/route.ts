import { prisma } from '@/lib/prisma';
import { NextResponse } from 'next/server';

export async function GET(_: Request, { params }: { params: { id: string } }) {
  const id = Number(params.id);
  const order = await prisma.order.findUnique({ where: { id }, include: { items: { include: { product: true } }, table: true } });
  if (!order) return new NextResponse('Not found', { status: 404 });
  return NextResponse.json(order);
}

export async function PATCH(req: Request, { params }: { params: { id: string } }) {
  const id = Number(params.id);
  const data = await req.json();
  const updated = await prisma.order.update({ where: { id }, data: { status: data.status } });
  return NextResponse.json(updated);
}
