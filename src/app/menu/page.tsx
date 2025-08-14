'use client';
import { useEffect, useMemo, useState } from 'react';
import ProductCard from '@/components/ProductCard';
import Cart from '@/components/Cart';

type Product = { id: number; name: string; description?: string | null; priceCents: number; isAvailable: boolean; imageUrl?: string | null; categoryId?: number | null; }

export default function MenuPage({ searchParams }: { searchParams: { table?: string } }) {
  const [products, setProducts] = useState<Product[]>([]);
  const [items, setItems] = useState<{ product: Product; quantity: number }[]>([]);
  const [table, setTable] = useState<number | undefined>(searchParams?.table ? parseInt(searchParams.table) : undefined);

  useEffect(() => { fetch('/api/products').then(r => r.json()).then(setProducts); }, []);

  function addToCart(p: Product) {
    setItems(prev => {
      const i = prev.find(x => x.product.id === p.id);
      if (i) return prev.map(x => x.product.id === p.id ? { ...x, quantity: x.quantity + 1 } : x);
      return [...prev, { product: p, quantity: 1 }];
    });
  }
  function updateQty(id: number, qty: number) { setItems(prev => prev.map(x => x.product.id === id ? { ...x, quantity: qty } : x)); }

  const grouped = useMemo(() => {
    const out: Record<string, Product[]> = {};
    for (const p of products.filter(x => x.isAvailable)) {
      const key = p.categoryId ? String(p.categoryId) : 'Otros';
      out[key] = out[key] || [];
      out[key].push(p);
    }
    return out;
  }, [products]);

  async function submit() {
    if (!table || isNaN(table)) { alert('Escribe o selecciona el número de mesa.'); return; }
    const payload = { tableNumber: table, items: items.map(i => ({ productId: i.product.id, quantity: i.quantity })) };
    const res = await fetch('/api/orders', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) });
    if (!res.ok) { const t = await res.text(); alert('Error al enviar pedido: ' + t); return; }
    const data = await res.json(); alert('¡Pedido enviado! Número: ' + data.id); setItems([]);
  }

  return (
    <div className="grid md:grid-cols-[1fr_320px] gap-6">
      <div className="flex flex-col gap-4">
        <div className="card">
          <h1 className="text-2xl font-bold">Menú {table ? `(Mesa ${table})` : ''}</h1>
          <p className="text-neutral-400 text-sm">Selecciona tus productos y envía el pedido a cocina.</p>
        </div>
        {!table && (
          <div className="card mb-3">
            <h3 className="text-lg font-semibold mb-2">Selecciona tu mesa</h3>
            <div className="flex items-center gap-2">
              <input type="number" placeholder="Número de mesa" className="bg-neutral-800 rounded p-2 w-40" onChange={(e)=> setTable(parseInt(e.target.value || ''))} />
              <button className="btn btn-outline" onClick={()=> { if (!table || isNaN(table)) { alert('Escribe un número de mesa'); return; } alert('Mesa ' + table + ' seleccionada.'); }}>Usar esta mesa</button>
            </div>
            <p className="text-xs text-neutral-400 mt-2">También puedes <a href="/scan" className="underline">escanear el QR</a>.</p>
          </div>
        )}
        {Object.entries(grouped).map(([k, arr]) => (
          <div key={k} className="flex flex-col gap-2">
            <h3 className="text-lg font-semibold mt-2">Categoría {k}</h3>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {arr.map(p => (<ProductCard key={p.id} p={p as any} onAdd={addToCart} />))}
            </div>
          </div>
        ))}
      </div>
      <Cart items={items} onUpdateQty={updateQty} onSubmit={submit} />
    </div>
  );
}
