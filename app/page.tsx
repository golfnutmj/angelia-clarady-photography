import Link from 'next/link';
import Image from 'next/image';
import Reveal from '@/components/Reveal';
import { getCollections } from '@/lib/collections';

export default async function HomePage() {
  // Fetch real collections from Firebase
  const collections = await getCollections();

  return (
    <>
      {/* ===== HERO ===== */}
      <section className="relative w-full h-screen min-h-[600px] flex items-center justify-center text-center overflow-hidden">
        {/* Hero Background Image */}
        <Image
          src="https://firebasestorage.googleapis.com/v0/b/aclaradyphotos.firebasestorage.app/o/photos%2Fhero-landscape.jpg?alt=media&token=d8c4d155-75e0-4b52-92c4-81c64eeafbca"
          alt="Landscape Photography"
          fill
          className="object-cover"
          priority
        />
        {/* Dark overlay for text readability */}
        <div className="absolute inset-0 bg-black/30" />

        <div className="relative z-10 text-white px-6">
          <h1 className="font-display text-5xl md:text-7xl lg:text-8xl font-normal tracking-tight mb-4"
              style={{ textShadow: '0 2px 30px rgba(0,0,0,0.15)' }}>
            Angelia Clarady
          </h1>
          <p className="font-body text-xs font-light tracking-wider-caps uppercase text-white/85 mb-10">
            Nature &amp; Landscape Photography
          </p>
          <div className="flex gap-5 justify-center flex-wrap">
            <Link href="/portfolio" className="btn-outline-white">
              View Portfolio
            </Link>
            <Link href="/shop" className="btn-filled-copper">
              Shop Prints
            </Link>
          </div>
        </div>
      </section>

      {/* ===== FEATURED COLLECTIONS ===== */}
      <section className="px-7 md:px-20 py-24 bg-ivory">
        <Reveal>
          <div className="section-header">
            <h2 className="section-title">Featured Collections</h2>
            <div className="section-divider" />
          </div>
        </Reveal>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-7 mb-12">
          {collections.map((col, i) => (
            <Reveal key={col.slug} delay={i * 100}>
              <Link href={`/portfolio/${col.slug}`} className="group block">
                <div className="relative aspect-[3/4] overflow-hidden">
                  <Image
                    src={col.coverImage}
                    alt={col.name}
                    fill
                    className="object-cover transition-transform duration-600 group-hover:scale-105"
                  />
                  <div className="absolute bottom-0 left-0 right-0 p-8 bg-gradient-to-t from-black/50 to-transparent text-white">
                    <h3 className="font-display text-2xl font-normal mb-1">{col.name}</h3>
                    <span className="font-body text-[0.65rem] font-normal tracking-wide-caps uppercase text-white/80">
                      View Collection →
                    </span>
                  </div>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>

        <Reveal>
          <div className="text-center">
            <Link href="/portfolio" className="caps-link">
              View All Collections →
            </Link>
          </div>
        </Reveal>
      </section>

      {/* ===== ABOUT PREVIEW ===== */}
      <section className="px-7 md:px-20 py-24 bg-sage">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-20 max-w-6xl mx-auto items-center">
          <Reveal>
            <div className="relative w-full max-w-[420px] aspect-[3/4] mx-auto md:mx-0 overflow-hidden">
              <Image
                src="https://firebasestorage.googleapis.com/v0/b/aclaradyphotos.firebasestorage.app/o/photos%2Fabout-portrait.jpg?alt=media&token=1bf2dd81-4b2b-4c1b-a181-a3e8affd5e6c"
                alt="Angelia Clarady"
                fill
                className="object-cover"
              />
            </div>
          </Reveal>

          <Reveal delay={150}>
            <div className="text-center md:text-left">
              <h2 className="font-display text-3xl md:text-4xl font-normal text-charcoal mb-3">
                About Angelia
              </h2>
              <div className="w-12 h-0.5 bg-copper-light mb-8 mx-auto md:mx-0" />
              <p className="text-[0.95rem] font-light leading-relaxed text-text-body mb-5">
                With a deep reverence for the natural world, I spend my days chasing light through
                ancient forests, along rugged coastlines, and across sweeping mountain ranges. Every
                photograph is a love letter to the wild places that still remain.
              </p>
              <p className="text-[0.95rem] font-light leading-relaxed text-text-body mb-6">
                My work invites you to slow down, to breathe, and to see the extraordinary beauty in
                the quiet moments of nature.
              </p>
              <Link
                href="/about"
                className="inline-block font-body text-[0.7rem] font-medium tracking-wide-caps uppercase text-copper hover:text-brown-dark transition-colors duration-300"
              >
                Read My Story →
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ===== CTA ===== */}
      <section className="px-7 py-24 bg-ivory text-center">
        <Reveal>
          <h2 className="section-title mb-3">Let&apos;s Work Together</h2>
          <div className="section-divider mb-8" />
        </Reveal>
        <Reveal delay={100}>
          <p className="text-[0.95rem] font-light text-text-light max-w-xl mx-auto mb-10 leading-relaxed">
            Whether you&apos;re looking for a fine art print to bring nature into your home, or
            interested in commissioning a project — I&apos;d love to hear from you.
          </p>
        </Reveal>
        <Reveal delay={200}>
          <Link href="/contact" className="btn-outline-dark">
            Get in Touch
          </Link>
        </Reveal>
      </section>
    </>
  );
}
