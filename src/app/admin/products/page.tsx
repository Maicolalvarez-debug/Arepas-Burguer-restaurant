'use client';
import { useEffect, useState } from 'react';

type Product = { id: number; name: string; description?: string | null; priceCents: number; costCents: number; imageUrl?: string | null; isAvailable: boolean; }

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [form, setForm] = useState<Partial<Product>>({ name: '', description: '', priceCents: 0, costCents: 0, imageUrl: '', isAvailable: true });
  const [editId, setEditId] = useState<number | null>(null);
  const [editForm, setEditForm] = useState<Partial<Product>>({});

  async function load() { const data = await fetch('/api/products').then(r => r.json()); setProducts(data); }
  useEffect(() => { load(); }, []);

  async function create() {
    const res = await fetch('/api/products', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(form) });
    if (res.ok) { setForm({ name: '', description: '', priceCents: 0, costCents: 0, imageUrl: '', isAvailable: true }); load(); } else alert(await res.text());
  }

  async function toggle(id: number, value: boolean) {
    const res = await fetch('/api/products', { method: 'PATCH', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ id, isAvailable: value }) });
    if (res.ok) load();
  }

  function startEdit(p: Product) {
    setEditId(p.id);
    setEditForm({ name: p.name, description: p.description || '', priceCents: p.priceCents, costCents: p.costCents, imageUrl: p.imageUrl || '', isAvailable: p.isAvailable });
  }
  function cancelEdit() { setEditId(null); setEditForm({}); }

  async function saveEdit() {
    if (!editId) return;
    const body = { id: editId, name: editForm.name, description: editForm.description, priceCents: Number(editForm.priceCents), costCents: Number(editForm.costCents), imageUrl: editForm.imageUrl, isAvailable: editForm.isAvailable };
    const res = await fetch('/api/products', { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body) });
    if (!res.ok) { alert(await res.text()); return; }
    setEditId(null); setEditForm({}); load();
  }

  async function handleUpload(file: File, set: (url: string)=>void) {
    const fd = new FormData();
    fd.append('file', file);
    const res = await fetch('/api/upload', { method: 'POST', body: fd });
    if (!res.ok) { alert(await res.text()); return; }
    const data = await res.json();
    set(data.url);
  }

  return (
    <div className="grid md:grid-cols-2 gap-6">
      <div className="card">
        <h2 className="text-lg font-semibold mb-3">Crear producto</h2>
        <div className="flex flex-col gap-2">
          <input className="bg-neutral-800 rounded p-2" placeholder="Nombre" value={form.name || ''} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} />
          <input className="bg-neutral-800 rounded p-2" placeholder="Descripción" value={form.description || ''} onChange={e => setForm(f => ({ ...f, description: e.target.value }))} />
          <input className="bg-neutral-800 rounded p-2" placeholder="Precio (pesos)" type="number" value={(form.priceCents||0)/100} onChange={e => setForm(f => ({ ...f, priceCents: parseInt(e.target.value || '0') * 100 }))} />
          <input className="bg-neutral-800 rounded p-2" placeholder="Costo (pesos)" type="number" value={(form.costCents||0)/100} onChange={e => setForm(f => ({ ...f, costCents: parseInt(e.target.value || '0') * 100 }))} />
          <input className="bg-neutral-800 rounded p-2" placeholder="Imagen (URL opcional)" value={form.imageUrl || ''} onChange={e => setForm(f => ({ ...f, imageUrl: e.target.value }))} />
          <input type="file" accept="image/*" className="bg-neutral-800 rounded p-2" onChange={e => { const file = e.target.files?.[0]; if (file) handleUpload(file, (url)=> setForm(f=>({ ...f, imageUrl: url }))); }} />
          <button className="btn btn-primary" onClick={create}>Guardar</button>
        </div>
      </div>
      <div className="card">
        <h2 className="text-lg font-semibold mb-3">Productos</h2>
        <div className="flex flex-col gap-2">
          {products.map(p => (
            <div key={p.id} className="flex flex-col border-b border-neutral-800 pb-2">
              {editId === p.id ? (
                <div className="grid grid-cols-1 md:grid-cols-6 gap-2 items-center">
                  <input className="bg-neutral-800 rounded p-2 md:col-span-1" value={editForm.name as string || ''} onChange={e => setEditForm(f=>({...f, name: e.target.value}))} />
                  <input className="bg-neutral-800 rounded p-2 md:col-span-1" value={editForm.description as string || ''} onChange={e => setEditForm(f=>({...f, description: e.target.value}))} />
                  <input className="bg-neutral-800 rounded p-2 md:col-span-1" type="number" value={Number(editForm.priceCents||0)/100} onChange={e => setEditForm(f=>({...f, priceCents: parseInt(e.target.value||'0')*100}))} />
                  <input className="bg-neutral-800 rounded p-2 md:col-span-1" type="number" value={Number(editForm.costCents||0)/100} onChange={e => setEditForm(f=>({...f, costCents: parseInt(e.target.value||'0')*100}))} />
                  <input className="bg-neutral-800 rounded p-2 md:col-span-1" value={(editForm.imageUrl as string)||''} onChange={e=>setEditForm(f=>({...f,imageUrl: e.target.value}))} placeholder="Imagen (URL)" />
                  <input className="bg-neutral-800 rounded p-2 md:col-span-1" type="file" accept="image/*" onChange={e=>{ const file = e.target.files?.[0]; if (file) handleUpload(file, (url)=> setEditForm(f=>({...f, imageUrl: url}))); }} />
                  <div className="flex gap-2 md:col-span-6">
                    <button className="btn btn-primary" onClick={saveEdit}>Guardar</button>
                    <button className="btn btn-outline" onClick={cancelEdit}>Cancelar</button>
                  </div>
                </div>
              ) : (
                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-semibold">{p.name}</div>
                    <div className="text-xs text-neutral-400">${(p.priceCents / 100).toLocaleString()} • Costo ${(p.costCents / 100).toLocaleString()}</div>
                  </div>
                  <div className="flex items-center gap-2">
                    <label className="text-sm">Disponible</label>
                    <input type="checkbox" checked={p.isAvailable} onChange={e => toggle(p.id, e.target.checked)} />
                    <button className="btn btn-outline" onClick={() => startEdit(p)}>Editar</button>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
