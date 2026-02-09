'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X } from 'lucide-react';

const navItems = [
  { label: 'Home', href: '/' },
  { label: 'Portfolio', href: '/portfolio' },
  { label: 'About', href: '/about' },
  { label: 'Shop', href: '/shop' },
  { label: 'Contact', href: '/contact' },
];

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-7 md:px-14 h-[60px] transition-all duration-300 ${
          scrolled
            ? 'bg-cream/95 backdrop-blur-md border-b border-black/5'
            : 'bg-cream/95 backdrop-blur-md border-b border-black/[0.04]'
        }`}
      >
        <Link href="/" className="font-display text-xl font-normal italic text-charcoal">
          Angelia Clarady
        </Link>

        {/* Desktop links */}
        <ul className="hidden md:flex items-center gap-10">
          {navItems.map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                className={`font-body text-[0.7rem] font-normal tracking-wide-caps uppercase transition-colors duration-300 ${
                  pathname === item.href ? 'text-copper' : 'text-text-light hover:text-copper'
                }`}
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>

        {/* Mobile toggle */}
        <button
          className="md:hidden p-2"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
        >
          {mobileOpen ? (
            <X className="w-5 h-5 text-charcoal" />
          ) : (
            <Menu className="w-5 h-5 text-charcoal" />
          )}
        </button>
      </nav>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="fixed top-[60px] left-0 right-0 z-40 bg-cream/[0.98] backdrop-blur-xl border-b border-black/[0.06] p-8 flex flex-col gap-6 md:hidden">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`font-body text-[0.75rem] font-normal tracking-wide-caps uppercase ${
                pathname === item.href ? 'text-copper' : 'text-text-light'
              }`}
            >
              {item.label}
            </Link>
          ))}
        </div>
      )}
    </>
  );
}
