'use client';
import { useEffect, useRef, useState } from 'react';
import QRCode from 'qrcode';
export default function QR({ value, label }: { value: string; label?: string }) {
  const ref = useRef<HTMLCanvasElement | null>(null);
  const [ready, setReady] = useState(false);
  useEffect(() => { if (ref.current) QRCode.toCanvas(ref.current, value, { margin: 1, scale: 6 }).then(() => setReady(true)); }, [value]);
  return (
    <div className="flex flex-col items-center gap-2 p-4 bg-white rounded-lg text-black">
      <canvas ref={ref} />
      {label && <div className="text-sm font-semibold">{label}</div>}
      {ready && <div className="text-xs text-neutral-600 break-all max-w-[200px]">{value}</div>}
    </div>
  );
}
