'use client';
import { Html5QrcodeScanner } from 'html5-qrcode';
import { useEffect } from 'react';
export default function ScanPage() {
  useEffect(() => {
    const scanner = new Html5QrcodeScanner('reader', { fps: 10, qrbox: 250 });
    scanner.render(
      (decodedText) => {
        const num = Number(decodedText);
        if (!isNaN(num)) { window.location.href = `/menu?table=${num}`; return; }
        if (decodedText.startsWith('http')) window.location.href = decodedText;
        else alert('Código no reconocido: ' + decodedText);
      },
      () => {}
    );
    return () => { const el = document.getElementById('reader'); if (el) el.innerHTML = ''; };
  }, []);
  return (<div className="card"><h1 className="text-xl font-bold mb-3">Escanear QR de tu mesa</h1><div id="reader" /></div>);
}
