'use client';
import { useEffect, useState } from 'react';
type Inv = { id: number; name: string; quantity: number; unit: string; costPerUnit: number };
type Exp = { id: number; description: string; amountCents: number; date: string };
export default function CostsPage() {
  const [inv, setInv] = useState<Inv[]>([]);
  const [exp, setExp] = useState<Exp[]>([]);
  const [invForm, setInvForm] = useState<Partial<Inv>>({ name:'', quantity:0, unit:'unidad', costPerUnit:0 });
  const [expForm, setExpForm] = useState<Partial<Exp>>({ description:'', amountCents:0 });
  async function load() { const [i, e] = await Promise.all([ fetch('/api/inventory').then(r=>r.json()), fetch('/api/expenses').then(r=>r.json()) ]); setInv(i); setExp(e); }
  useEffect(() => { load(); }, []);
  async function addInv() { await fetch('/api/inventory', { method:'POST', headers:{'Content-Type':'application/json'}, body: JSON.stringify(invForm) }); setInvForm({ name:'', quantity:0, unit:'unidad', costPerUnit:0 }); load(); }
  async function addExp() { await fetch('/api/expenses', { method:'POST', headers:{'Content-Type':'application/json'}, body: JSON.stringify(expForm) }); setExpForm({ description:'', amountCents:0 }); load(); }
  return (
    <div className="grid md:grid-cols-2 gap-6">
      <div className="card">
        <h2 className="text-lg font-semibold mb-3">Inventario</h2>
        <div className="flex flex-col gap-2 mb-3">
          <input className="bg-neutral-800 rounded p-2" placeholder="Nombre" value={invForm.name||''} onChange={e=>setInvForm(f=>({...f,name:e.target.value}))} />
          <div className="grid grid-cols-3 gap-2">
            <input className="bg-neutral-800 rounded p-2" placeholder="Cantidad" type="number" value={invForm.quantity||0} onChange={e=>setInvForm(f=>({...f,quantity:parseFloat(e.target.value||'0')}))} />
            <input className="bg-neutral-800 rounded p-2" placeholder="Unidad (g, kg, ml, unidad)" value={invForm.unit||'unidad'} onChange={e=>setInvForm(f=>({...f,unit:e.target.value}))} />
            <input className="bg-neutral-800 rounded p-2" placeholder="Costo por unidad (ej 5000)" type="number" value={(invForm.costPerUnit||0)/100} onChange={e=>setInvForm(f=>({...f,costPerUnit:parseInt(e.target.value||'0')*100}))} />
          </div>
          <button className="btn btn-primary" onClick={addInv}>Agregar</button>
        </div>
        <div className="flex flex-col gap-2">
          {inv.map(i => (
            <div key={i.id} className="flex items-center justify-between border-b border-neutral-800 pb-2">
              <div><div className="font-semibold">{i.name}</div><div className="text-xs text-neutral-400">{i.quantity} {i.unit} • ${((i.costPerUnit||0)/100).toLocaleString()} c/u</div></div>
            </div>
          ))}
        </div>
      </div>
      <div className="card">
        <h2 className="text-lg font-semibold mb-3">Gastos</h2>
        <div className="flex gap-2 mb-3">
          <input className="flex-1 bg-neutral-800 rounded p-2" placeholder="Descripción" value={expForm.description||''} onChange={e=>setExpForm(f=>({...f,description:e.target.value}))} />
          <input className="w-40 bg-neutral-800 rounded p-2" placeholder="Monto (ej 15000)" type="number" value={(expForm.amountCents||0)/100} onChange={e=>setExpForm(f=>({...f,amountCents:parseInt(e.target.value||'0')*100}))} />
          <button className="btn btn-primary" onClick={addExp}>Agregar</button>
        </div>
        <div className="flex flex-col gap-2">
          {exp.map(e => (<div key={e.id} className="flex items-center justify-between border-b border-neutral-800 pb-2"><div>{e.description}</div><div className="text-sm">${(e.amountCents/100).toLocaleString()}</div></div>))}
        </div>
      </div>
    </div>
  );
}
