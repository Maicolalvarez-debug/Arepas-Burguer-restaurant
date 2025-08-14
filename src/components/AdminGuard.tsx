'use client';
import { useEffect, useState } from 'react';
export default function AdminGuard({ children }: { children: React.ReactNode }) {
  const [ok, setOk] = useState<boolean | null>(null);
  const [val, setVal] = useState('');
  useEffect(() => {
    const saved = typeof window !== 'undefined' ? localStorage.getItem('admin_key') : null;
    const NEED = process.env.NEXT_PUBLIC_ADMIN_KEY || 'arepas123';
    if (saved === NEED) setOk(true); else setOk(false);
  }, []);
  const NEED = process.env.NEXT_PUBLIC_ADMIN_KEY || 'arepas123';
  if (ok === null) return null;
  if (!ok) {
    return (
      <div className="max-w-sm mx-auto card">
        <h1 className="text-xl font-semibold mb-2">Acceso Admin</h1>
        <p className="text-sm text-neutral-400 mb-3">Ingresa la clave para abrir el panel.</p>
        <input type="password" placeholder="Clave admin" className="w-full bg-neutral-800 rounded p-2 mb-2" value={val} onChange={e => setVal(e.target.value)} />
        <button className="btn btn-primary w-full" onClick={() => { if (val === NEED) { localStorage.setItem('admin_key', val); setOk(true); } else alert('Clave incorrecta'); }}>Entrar</button>
      </div>
    );
  }
  return <>{children}</>;
}
