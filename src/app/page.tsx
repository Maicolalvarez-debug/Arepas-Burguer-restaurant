import Link from 'next/link';
export default function Home() {
  return (
    <div className="grid md:grid-cols-2 gap-6">
      <div className="card">
        <h2 className="text-xl font-bold mb-2">Clientes</h2>
        <p className="text-neutral-300 mb-3">Escanea el QR o entra al menú para ordenar.</p>
        <div className="flex gap-2">
          <Link className="btn btn-outline" href="/scan">Escanear QR</Link>
          <Link className="btn btn-primary" href="/menu">Ver menú</Link>
        </div>
      </div>
      <div className="card">
        <h2 className="text-xl font-bold mb-2">Administración</h2>
        <p className="text-neutral-300 mb-3">Gestiona productos, inventario, pedidos y reportes.</p>
        <Link className="btn btn-outline" href="/admin">Ir al panel</Link>
      </div>
    </div>
  );
}
