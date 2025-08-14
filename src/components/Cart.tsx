import { Product } from '@prisma/client';
type CartItem = { product: Product; quantity: number };
export default function Cart({ items, onUpdateQty, onSubmit }: { items: CartItem[]; onUpdateQty: (id: number, qty: number) => void; onSubmit: () => void; }) {
  const subtotal = items.reduce((s, it) => s + it.product.priceCents * it.quantity, 0);
  return (
    <div className="card sticky top-4">
      <h3 className="text-lg font-semibold mb-2">Tu pedido</h3>
      <div className="flex flex-col gap-2">
        {items.length === 0 && <p className="text-neutral-400">Vacío</p>}
        {items.map((it) => (
          <div key={it.product.id} className="flex items-center justify-between gap-2">
            <div className="text-sm">
              <div className="font-semibold">{it.product.name}</div>
              <div className="text-neutral-400">${(it.product.priceCents / 100).toLocaleString()}</div>
            </div>
            <div className="flex items-center gap-2">
              <button className="btn btn-outline" onClick={() => onUpdateQty(it.product.id, Math.max(1, it.quantity - 1))}>-</button>
              <span className="w-6 text-center">{it.quantity}</span>
              <button className="btn btn-outline" onClick={() => onUpdateQty(it.product.id, it.quantity + 1)}>+</button>
            </div>
          </div>
        ))}
      </div>
      <div className="border-t border-neutral-800 mt-3 pt-3 flex items-center justify-between">
        <span>Subtotal</span>
        <span className="font-bold">${(subtotal / 100).toLocaleString()}</span>
      </div>
      <button disabled={items.length === 0} onClick={onSubmit} className="btn btn-primary w-full mt-3">Enviar pedido</button>
    </div>
  );
}
