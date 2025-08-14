import './globals.css';
import Link from 'next/link';
export const metadata = { title: 'Arepas Burguer - Pedidos', description: 'Sistema de pedidos con QR' };
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <body>
        <header className="border-b border-neutral-800">
          <div className="container flex items-center justify-between py-4">
            <Link href="/" className="text-xl font-bold">Arepas Burguer</Link>
            <nav className="flex gap-3 text-sm">
              <Link href="/scan" className="btn btn-outline">Escanear QR</Link>
              <Link href="/menu" className="btn btn-primary">Hacer pedido</Link>
              <Link href="/admin" className="btn btn-outline">Admin</Link>
            </nav>
          </div>
        </header>
        <main className="container py-6">{children}</main>
        <footer className="container py-6 text-sm text-neutral-400">© {new Date().getFullYear()} Arepas Burguer</footer>
      </body>
    </html>
  );
}
