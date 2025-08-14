import Link from 'next/link';
export default function AdminHome() {
  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
      <div className="card"><h2 className="text-lg font-semibold mb-2">Productos</h2><p className="text-neutral-400 text-sm mb-3">Crear/editar y marcar agotados.</p><Link className="btn btn-outline" href="/admin/products">Abrir</Link></div>
      <div className="card"><h2 className="text-lg font-semibold mb-2">Pedidos / Cocina</h2><p className="text-neutral-400 text-sm mb-3">Recibe pedidos y cambia estados.</p><div className="flex gap-2"><Link className="btn btn-outline" href="/admin/orders">Pedidos</Link><Link className="btn btn-outline" href="/admin/kitchen">Cocina</Link></div></div>
      <div className="card"><h2 className="text-lg font-semibold mb-2">Inventario</h2><p className="text-neutral-400 text-sm mb-3">Existencias y costos.</p><Link className="btn btn-outline" href="/admin/costs">Inventario y gastos</Link></div>
      <div className="card"><h2 className="text-lg font-semibold mb-2">Reportes</h2><p className="text-neutral-400 text-sm mb-3">Resumen de ventas.</p><Link className="btn btn-outline" href="/admin/reports">Abrir</Link></div>
      <div className="card"><h2 className="text-lg font-semibold mb-2">QR Mesas</h2><p className="text-neutral-400 text-sm mb-3">Imprime códigos QR.</p><Link className="btn btn-outline" href="/admin/qrs">Ver QR</Link></div>
    </div>
  );
}
