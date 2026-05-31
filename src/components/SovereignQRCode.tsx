/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useEffect, useRef } from 'react';
import QRCode from 'qrcode';

interface SovereignQRCodeProps {
  value: string;
}

export default function SovereignQRCode({ value }: SovereignQRCodeProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    if (canvasRef.current) {
      QRCode.toCanvas(
        canvasRef.current,
        value,
        {
          width: 140,
          margin: 1,
          color: {
            dark: '#121215',
            light: '#ffffff',
          },
        },
        (error) => {
          if (error) {
            console.error('QR Code Generation Error:', error);
          }
        }
      );
    }
  }, [value]);

  return (
    <div className="flex flex-col items-center justify-center p-3 bg-white rounded-xl border border-gray-200 shadow-sm">
      <canvas ref={canvasRef} className="max-w-full" />
    </div>
  );
}
