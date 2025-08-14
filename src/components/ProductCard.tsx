import { Product } from '@prisma/client';
export default function ProductCard({ p, onAdd }: { p: Product & { imageUrl?: string | null }; onAdd: (p: Product) => void }) {
  return (
    <div className="card flex flex-col gap-2">
      {p.imageUrl && <img src={p.imageUrl} alt={p.name} className="w-full h-40 object-cover rounded-xl" />}
      <div className="flex items-center justify-between">
        <div>
          <h3 className="font-semibold">{p.name}</h3>
          {p.description && <p className="text-sm text-neutral-400">{p.description}</p>}
        </div>
        <span className="font-bold">${(p.priceCents / 100).toLocaleString()}</span>
      </div>
      <button disabled={!p.isAvailable} onClick={() => onAdd(p)} className={`btn btn-primary ${!p.isAvailable ? 'opacity-50 cursor-not-allowed' : ''}`}>
        {p.isAvailable ? 'Agregar' : 'Agotado'}
      </button>
    </div>
  );
}
