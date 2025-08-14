import { prisma } from '@/lib/prisma';
import { NextResponse } from 'next/server';

export async function GET() {
  const rows = await prisma.expense.findMany({ orderBy: { date: 'desc' } });
  return NextResponse.json(rows);
}

export async function POST(req: Request) {
  const body = await req.json();
  const created = await prisma.expense.create({ data: { description: body.description, amountCents: Number(body.amountCents || 0) } });
  return NextResponse.json(created);
}
