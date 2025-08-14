'use client';
import { useEffect, useState } from 'react';
type Item = { product: { name: string }, quantity: number };
type KOrder = { id: number; tableId: number; status: string; createdAt: string; items: Item[]; }
export default function KitchenPage() {
  const [orders, setOrders] = useState<KOrder[]>([]);
  async function load() { const data = await fetch('/api/orders?status=PENDING').then(r => r.json()); setOrders(data); }
  async function setStatus(id: number, status: string) { await fetch(`/api/orders/${id}`, { method: 'PATCH', headers: {'Content-Type':'application/json'}, body: JSON.stringify({ status }) }); load(); }
  useEffect(() => { load(); const t = setInterval(load, 3000); return () => clearInterval(t); }, []);
  return (
    <div className="grid lg:grid-cols-2 gap-4">
      {orders.map(o => (
        <div key={o.id} className="card">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-lg font-semibold">Mesa {o.tableId} • #{o.id}</h3>
            <span className="text-xs text-neutral-400">{new Date(o.createdAt).toLocaleTimeString()}</span>
          </div>
          <ul className="list-disc pl-5">{o.items.map((it, idx) => (<li key={idx}>{it.quantity} × {it.product.name}</li>))}</ul>
          <div className="flex gap-2 mt-3">
            <button className="btn btn-outline" onClick={() => setStatus(o.id, 'PREPARING')}>Preparando</button>
            <button className="btn btn-primary" onClick={() => setStatus(o.id, 'READY')}>Listo</button>
          </div>
        </div>
      ))}
    </div>
  );
}
