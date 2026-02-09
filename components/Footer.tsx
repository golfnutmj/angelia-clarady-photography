import Link from 'next/link';
import { Instagram, Mail } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-brown-footer text-white/80">
      <div className="px-7 md:px-20 pt-16 pb-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-12">
          {/* Brand */}
          <div>
            <h3 className="font-display text-xl font-medium text-white mb-4">
              Angelia Clarady
            </h3>
            <p className="text-sm font-light leading-relaxed text-white/60">
              Nature & landscape photographer capturing the beauty of our wild world.
            </p>
          </div>

          {/* Explore */}
          <div>
            <h4 className="font-display text-lg font-medium text-white mb-5">Explore</h4>
            <ul className="flex flex-col gap-2.5">
              {[
                { label: 'Portfolio', href: '/portfolio' },
                { label: 'Shop', href: '/shop' },
                { label: 'About', href: '/about' },
                { label: 'Contact', href: '/contact' },
              ].map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-sm font-light text-white/60 hover:text-white transition-colors duration-300"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Connect */}
          <div>
            <h4 className="font-display text-lg font-medium text-white mb-5">Connect</h4>
            <div className="flex gap-4 mb-4">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white/70 hover:text-white transition-colors duration-300"
                aria-label="Instagram"
              >
                <Instagram className="w-5 h-5" />
              </a>
              <a
                href="mailto:hello@aclarady.com"
                className="text-white/70 hover:text-white transition-colors duration-300"
                aria-label="Email"
              >
                <Mail className="w-5 h-5" />
              </a>
            </div>
            <p className="text-sm font-light text-white/60">hello@aclarady.com</p>
          </div>
        </div>
      </div>

      <div className="border-t border-white/10 px-7 md:px-20 py-7 text-center">
        <p className="text-xs font-light text-white/40">
          © {new Date().getFullYear()} Angelia Clarady. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
