'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';

export const Header = () => {
  return (
    <header className="border-b">
      <div className="container mx-auto px-4 py-4">
        <h1 className="text-2xl font-bold">Météo Bénin</h1>
      </div>
    </header>
  );
};
