'use client';
import { useEffect, useState } from 'react';
type Summary = { salesCents: number; orders: number; avgTicketCents: number; expensesCents: number; profitCents: number; }
export default function ReportsPage() {
  const [d, setD] = useState<Summary | null>(null);
  const [range, setRange] = useState<'day'|'week'|'month'>('day');
  useEffect(() => { fetch('/api/orders?summary=' + range).then(r => r.json()).then(setD); }, [range]);
  return (
    <div className="card">
      <h2 className="text-lg font-semibold mb-3">Resumen de ventas</h2>
      <div className="flex items-center gap-2 mb-3">
        <button className={`btn ${range==='day'?'btn-primary':'btn-outline'}`} onClick={()=>setRange('day')}>Hoy</button>
        <button className={`btn ${range==='week'?'btn-primary':'btn-outline'}`} onClick={()=>setRange('week')}>Semana</button>
        <button className={`btn ${range==='month'?'btn-primary':'btn-outline'}`} onClick={()=>setRange('month')}>Mes</button>
      </div>
      {d && (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
          <div className="card"><div className="text-neutral-400 text-sm">Ventas</div><div className="text-2xl font-bold">${(d.salesCents/100).toLocaleString()}</div></div>
          <div className="card"><div className="text-neutral-400 text-sm">Pedidos</div><div className="text-2xl font-bold">{d.orders}</div></div>
          <div className="card"><div className="text-neutral-400 text-sm">Ticket Prom.</div><div className="text-2xl font-bold">${(d.avgTicketCents/100).toLocaleString()}</div></div>
          <div className="card"><div className="text-neutral-400 text-sm">Gastos</div><div className="text-2xl font-bold">${(d.expensesCents/100).toLocaleString()}</div></div>
          <div className="card"><div className="text-neutral-400 text-sm">Utilidad</div><div className="text-2xl font-bold">${(d.profitCents/100).toLocaleString()}</div></div>
        </div>
      )}
    </div>
  );
}
