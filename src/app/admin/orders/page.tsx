'use client';
import { useEffect, useState } from 'react';
type Order = { id: number; tableId: number; status: 'PENDING'|'PREPARING'|'READY'|'SERVED'|'CANCELLED'|string; createdAt: string; totalCents: number; }
export default function OrdersPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  async function load() { const data = await fetch('/api/orders?all=1').then(r => r.json()); setOrders(data); }
  useEffect(() => { load(); const t = setInterval(load, 5000); return () => clearInterval(t); }, []);
  return (
    <div className="card">
      <h2 className="text-lg font-semibold mb-3">Pedidos</h2>
      <div className="flex flex-col gap-2">
        {orders.map(o => (
          <div key={o.id} className="flex items-center justify-between border-b border-neutral-800 pb-2">
            <div>
              <div className="font-semibold"># {o.id} • Mesa {o.tableId}</div>
              <div className="text-xs text-neutral-400">{new Date(o.createdAt).toLocaleString()} • ${(o.totalCents/100).toLocaleString()}</div>
            </div>
            <a className="btn btn-outline" href={`/admin/orders/${o.id}/print`} target="_blank">Imprimir</a>
          </div>
        ))}
      </div>
    </div>
  );
}
