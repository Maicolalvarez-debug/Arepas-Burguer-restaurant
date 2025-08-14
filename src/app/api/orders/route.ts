import { prisma } from '@/lib/prisma';
import { NextResponse } from 'next/server';
import { startOfDay, subDays } from 'date-fns';

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const status = searchParams.get('status');
  const all = searchParams.get('all');
  const summary = searchParams.get('summary');

  if (summary) {
    const now = new Date();
    let start: Date;
    if (summary === 'day') start = startOfDay(now);
    else if (summary === 'week') start = subDays(startOfDay(now), 6);
    else start = subDays(startOfDay(now), 29);
    const orders = await prisma.order.findMany({ where: { createdAt: { gte: start } } });
    const salesCents = orders.reduce((s, o) => s + o.totalCents, 0);
    const avgTicketCents = orders.length ? Math.round(salesCents / orders.length) : 0;
    const expenses = await prisma.expense.findMany({ where: { date: { gte: start } } });
    const expensesCents = expenses.reduce((s, e) => s + e.amountCents, 0);
    const products = await prisma.product.findMany();
    const costMap = Object.fromEntries(products.map(p => [p.id, p.costCents]));
    const items = await prisma.orderItem.findMany({ where: { order: { createdAt: { gte: start } } } });
    const costCents = items.reduce((s, it) => s + (costMap[it.productId] || 0) * it.quantity, 0);
    const profitCents = salesCents - costCents - expensesCents;
    return NextResponse.json({ salesCents, orders: orders.length, avgTicketCents, expensesCents, profitCents });
  }

  if (all) {
    const orders = await prisma.order.findMany({ orderBy: { createdAt: 'desc' } });
    return NextResponse.json(orders);
  }

  const where: any = {};
  if (status) where.status = status;
  const orders = await prisma.order.findMany({
    where,
    include: { items: { include: { product: true } } },
    orderBy: { createdAt: 'asc' },
  });
  return NextResponse.json(orders);
}

export async function POST(req: Request) {
  const body = await req.json();
  if (!body.tableNumber || !Array.isArray(body.items)) return new NextResponse('Datos inválidos', { status: 400 });

  let table = await prisma.table.findUnique({ where: { number: Number(body.tableNumber) } });
  if (!table) table = await prisma.table.create({ data: { number: Number(body.tableNumber) } });

  const ids = body.items.map((i: any) => Number(i.productId));
  const products = await prisma.product.findMany({ where: { id: { in: ids } } });
  const priceMap = Object.fromEntries(products.map(p => [p.id, p.priceCents]));

  const created = await prisma.order.create({
    data: {
      tableId: table.id,
      status: 'PENDING',
      items: { create: body.items.map((i: any) => ({ productId: Number(i.productId), quantity: Number(i.quantity), priceCents: priceMap[Number(i.productId)] || 0 })) },
    },
    include: { items: true, table: true },
  });

  const total = created.items.reduce((s, it) => s + it.priceCents * it.quantity, 0);
  await prisma.order.update({ where: { id: created.id }, data: { totalCents: total } });
  return NextResponse.json({ id: created.id, totalCents: total });
}
