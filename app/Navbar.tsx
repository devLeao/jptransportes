'use client';

import { useState, useEffect } from 'react';
import { useTheme } from './providers';
import Image from 'next/image';
import { Moon, Sun, Menu, X } from 'lucide-react';

export default function Navbar() {
  const { theme, setTheme } = useTheme();
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    if (!menuOpen) return;

    const original = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    return () => {
      document.body.style.overflow = original;
    };
  }, [menuOpen]);

  const closeMenu = () => setMenuOpen(false);

  const logoSrc = theme === 'dark' ? '/logobranca.png' : '/logopreta.png';

  return (
    <>
      <nav className="fixed top-0 left-0 w-full z-[200] border-b transition-all duration-300 bg-white/95 backdrop-blur-md border-zinc-200 dark:bg-black/95 dark:border-zinc-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-20 flex justify-between items-center relative">
          <a href="#inicio" className="flex-shrink-0">
            <Image
              src={logoSrc}
              alt="JP Transportes"
              width={120}
              height={49}
              priority
              className="h-9 sm:h-10 w-auto object-contain"
            />
          </a>

          <div className="hidden md:flex absolute left-1/2 -translate-x-1/2 space-x-10">
            <a href="#inicio" className="text-[11px] font-black uppercase tracking-[0.2em] text-zinc-800 dark:text-zinc-200 hover:text-red-700 transition-colors">
              Início
            </a>
            <a href="#solucoes" className="text-[11px] font-black uppercase tracking-[0.2em] text-zinc-800 dark:text-zinc-200 hover:text-red-700 transition-colors">
              Soluções
            </a>
            <a href="#servicos" className="text-[11px] font-black uppercase tracking-[0.2em] text-zinc-800 dark:text-zinc-200 hover:text-red-700 transition-colors">
              Serviços
            </a>
            <a href="#frota" className="text-[11px] font-black uppercase tracking-[0.2em] text-zinc-800 dark:text-zinc-200 hover:text-red-700 transition-colors">
              Frota
            </a>
            <a href="#contato" className="text-[11px] font-black uppercase tracking-[0.2em] text-zinc-800 dark:text-zinc-200 hover:text-red-700 transition-colors">
              Contato
            </a>
          </div>

          <div className="hidden md:flex items-center space-x-4">
            <button
              type="button"
              onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
              className="p-2 rounded-full hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
              aria-label="Alternar tema"
            >
              {theme === 'dark' ? (
                <Sun size={18} className="text-yellow-500 fill-yellow-500" />
              ) : (
                <Moon size={18} className="text-zinc-600 fill-zinc-600" />
              )}
            </button>

            <a
              href="#contato"
              className="bg-red-700 hover:bg-red-800 text-white px-5 py-2 rounded-sm text-[10px] font-black uppercase tracking-widest shadow-lg active:scale-95 transition-all"
            >
              Orçamento
            </a>
          </div>

          <div className="md:hidden flex items-center gap-2">
            <button
              type="button"
              onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
              className="p-2 rounded-full hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
              aria-label="Alternar tema"
            >
              {theme === 'dark' ? (
                <Sun size={18} className="text-yellow-500 fill-yellow-500" />
              ) : (
                <Moon size={18} className="text-zinc-600 fill-zinc-600" />
              )}
            </button>

            <button
              type="button"
              onClick={() => setMenuOpen(true)}
              className="w-11 h-11 rounded-full border border-zinc-200 dark:border-zinc-800 flex items-center justify-center text-zinc-900 dark:text-white bg-white dark:bg-zinc-950"
              aria-label="Abrir menu"
            >
              <Menu size={20} />
            </button>
          </div>
        </div>
      </nav>

      <div
        className={`md:hidden fixed inset-0 z-[250] transition-all duration-300 ${
          menuOpen ? 'pointer-events-auto opacity-100' : 'pointer-events-none opacity-0'
        }`}
      >
        <div
          className="absolute inset-0 bg-black/60"
          onClick={closeMenu}
        />

        <div
          className={`absolute top-0 right-0 h-full w-[84%] max-w-[340px] bg-white dark:bg-zinc-950 border-l border-zinc-200 dark:border-zinc-800 shadow-2xl transition-transform duration-300 ${
            menuOpen ? 'translate-x-0' : 'translate-x-full'
          }`}
        >
          <div className="h-20 px-5 flex items-center justify-between border-b border-zinc-200 dark:border-zinc-800">
            <Image
              src={logoSrc}
              alt="JP Transportes"
              width={108}
              height={44}
              className="h-9 w-auto object-contain"
            />

            <button
              type="button"
              onClick={closeMenu}
              className="w-10 h-10 rounded-full border border-zinc-200 dark:border-zinc-800 flex items-center justify-center text-zinc-900 dark:text-white"
              aria-label="Fechar menu"
            >
              <X size={18} />
            </button>
          </div>

          <div className="px-6 py-8 flex flex-col gap-5">
            <a onClick={closeMenu} href="#inicio" className="text-sm font-black uppercase tracking-[0.18em] text-zinc-900 dark:text-white">
              Início
            </a>
            <a onClick={closeMenu} href="#solucoes" className="text-sm font-black uppercase tracking-[0.18em] text-zinc-900 dark:text-white">
              Soluções
            </a>
            <a onClick={closeMenu} href="#servicos" className="text-sm font-black uppercase tracking-[0.18em] text-zinc-900 dark:text-white">
              Serviços
            </a>
            <a onClick={closeMenu} href="#frota" className="text-sm font-black uppercase tracking-[0.18em] text-zinc-900 dark:text-white">
              Frota
            </a>
            <a onClick={closeMenu} href="#contato" className="text-sm font-black uppercase tracking-[0.18em] text-zinc-900 dark:text-white">
              Contato
            </a>

            <a
              onClick={closeMenu}
              href="#contato"
              className="mt-4 inline-flex items-center justify-center bg-red-700 hover:bg-red-800 text-white px-5 py-4 rounded-xl text-[11px] font-black uppercase tracking-[0.22em] shadow-lg"
            >
              Solicitar orçamento
            </a>
          </div>
        </div>
      </div>
    </>
  );
}
