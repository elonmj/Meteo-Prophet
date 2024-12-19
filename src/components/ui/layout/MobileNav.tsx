'use client';

import Link from 'next/link';
import { useState } from 'react';
import { X } from 'lucide-react';

export function MobileNav() {
  const [isOpen, setIsOpen] = useState(false);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 md:hidden">
      <div className="fixed inset-0 bg-black/60" onClick={() => setIsOpen(false)} />
      <div className="fixed top-0 right-0 w-3/4 h-full bg-background p-6 shadow-xl">
        <div className="flex justify-end mb-8">
          <button onClick={() => setIsOpen(false)} className="p-2">
            <X size={24} />
          </button>
        </div>

        <nav className="space-y-6">
          <Link
            href="/weather"
            className="block py-2 text-lg hover:text-primary"
            onClick={() => setIsOpen(false)}
          >
            Prévisions
          </Link>
          <Link
            href="/statistics"
            className="block py-2 text-lg hover:text-primary"
            onClick={() => setIsOpen(false)}
          >
            Statistiques
          </Link>
          <Link
            href="/about"
            className="block py-2 text-lg hover:text-primary"
            onClick={() => setIsOpen(false)}
          >
            À propos
          </Link>
        </nav>
      </div>
    </div>
  );
}
