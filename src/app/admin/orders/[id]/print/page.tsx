import { prisma } from '@/lib/prisma';
export const dynamic = 'force-dynamic';
export default async function PrintTicket({ params }: { params: { id: string } }) {
  const id = parseInt(params.id);
  const order = await prisma.order.findUnique({ where: { id }, include: { items: { include: { product: true } }, table: true } });
  if (!order) return <div>Pedido no encontrado</div>;
  return (
    <div className="bg-white text-black p-4 w-[80mm]" style={{ fontFamily: 'monospace' }}>
      <h1 className="text-center font-bold text-lg">Arepas Burguer</h1>
      <div className="text-center text-xs">Ticket cocina</div>
      <hr className="my-2" />
      <div className="text-sm">Pedido: #{order.id}</div>
      <div className="text-sm">Mesa: {order.table.number}</div>
      <div className="text-xs">Fecha: {new Date(order.createdAt).toLocaleString()}</div>
      <hr className="my-2" />
      <ul className="text-sm">
        {order.items.map(it => (<li key={it.id}>{it.quantity} × {it.product.name}</li>))}
      </ul>
      <hr className="my-2" />
      <div className="text-sm font-bold">Total: ${(order.totalCents/100).toLocaleString()}</div>
      <div className="mt-4 text-center text-xs">Gracias</div>
      <script dangerouslySetInnerHTML={{ __html: "window.onload = () => window.print()" }} />
    </div>
  );
}
