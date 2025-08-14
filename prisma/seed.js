/* eslint-disable */
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function main() {
  const burgers = await prisma.category.upsert({
    where: { id: 1 }, update: {}, create: { name: 'Hamburguesas' },
  });
  const arepas = await prisma.category.upsert({
    where: { id: 2 }, update: {}, create: { name: 'Arepas' },
  });
  const drinks = await prisma.category.upsert({
    where: { id: 3 }, update: {}, create: { name: 'Bebidas' },
  });

  const P = (n) => n * 100;

  const items = [
    { name: 'Sencilla', description: 'Carne, vegetales y salsas', priceCents: P(12000), costCents: P(7000), categoryId: burgers.id },
    { name: 'Clásica', description: 'Queso doble crema, jamón, papa perro', priceCents: P(16000), costCents: P(9000), categoryId: burgers.id },
    { name: 'Doble Carne', description: 'Doble carne, doble queso, jamón', priceCents: P(22000), costCents: P(13000), categoryId: burgers.id },
    { name: 'Hawaiana', description: 'Piña asada, jamón, queso, tocineta', priceCents: P(18000), costCents: P(10000), categoryId: burgers.id },
    { name: 'Costeña', description: 'Papa cabello de ángel, costra de queso, jamón, plátano, suero', priceCents: P(20000), costCents: P(12000), categoryId: burgers.id },
    { name: 'Especial', description: 'Carne + desmechada + pollo + maíz + tocineta', priceCents: P(20000), costCents: P(12000), categoryId: burgers.id },
    { name: 'Champiñones', description: 'Champiñones en salsa, jamón, queso', priceCents: P(17000), costCents: P(10000), categoryId: burgers.id },
    { name: 'Malcriada', description: 'Huevos revueltos con tocineta, jamón, queso', priceCents: P(19000), costCents: P(11000), categoryId: burgers.id },
    { name: 'Chesseburguer', description: 'Cheddar + salsa cheddar con tocineta', priceCents: P(18000), costCents: P(11000), categoryId: burgers.id },

    { name: 'Arepa pollo y queso', description: 'Arepa paisa con pollo y queso costeño', priceCents: P(8000), costCents: P(5305), categoryId: arepas.id },
    { name: 'Arepa solo queso', description: 'Arepa paisa con queso costeño', priceCents: P(7000), costCents: P(4500), categoryId: arepas.id },

    { name: 'Coca-Cola 500ml', description: 'Bebida', priceCents: P(3500), costCents: P(2417), categoryId: drinks.id },
    { name: 'Postobón 400ml', description: 'Bebida', priceCents: P(3000), costCents: P(1833), categoryId: drinks.id },
  ];

  for (const p of items) {
    await prisma.product.create({ data: p });
  }

  for (let n = 1; n <= 12; n++) {
    await prisma.table.upsert({ where: { number: n }, update: {}, create: { number: n } });
  }

  console.log('Seed listo con menú oficial ✅');
}

main().catch(e => { console.error(e); process.exit(1); }).finally(async () => { await prisma.$disconnect(); });
