'use client';
import { useEffect, useState } from 'react';
import QR from '@/components/QRCode';
type T = { id: number; number: number };
export default function QRPage() {
  const [tables, setTables] = useState<T[]>([]);
  const [base, setBase] = useState<string>('');
  useEffect(() => {
    fetch('/api/tables').then(r=>r.json()).then(setTables);
    if (typeof window !== 'undefined') setBase(process.env.NEXT_PUBLIC_BASE_URL || window.location.origin);
  }, []);
  return (
    <div className="flex flex-col gap-3">
      <h1 className="text-xl font-semibold">Códigos QR para Mesas</h1>
      <p className="text-neutral-400 text-sm">Imprime esta página. Cada QR abre el menú con la mesa asignada.</p>
      <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 bg-white p-4 rounded-xl text-black">
        {tables.map(t => {
          const url = `${base}/menu?table=${t.number}`;
          return <QR key={t.id} value={url} label={`Mesa ${t.number}`} />;
        })}
      </div>
    </div>
  );
}
