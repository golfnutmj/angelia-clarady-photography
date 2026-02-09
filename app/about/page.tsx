import Link from 'next/link';
import Image from 'next/image';
import Reveal from '@/components/Reveal';

export default function AboutPage() {
  return (
    <div className="pt-[60px]">
      {/* Hero banner */}
      <section
        className="relative h-[40vh] min-h-[300px] flex items-center justify-center text-center"
        style={{
          background:
            'linear-gradient(180deg, rgba(180,155,120,0.2) 0%, rgba(60,80,50,0.25) 60%, rgba(40,50,35,0.4) 100%), linear-gradient(135deg, #C8B090 0%, #8B9068 50%, #5A6B4A 100%)',
        }}
      >
        <Reveal>
          <h1 className="font-display text-4xl md:text-5xl font-normal text-white"
              style={{ textShadow: '0 2px 20px rgba(0,0,0,0.15)' }}>
            About Angelia
          </h1>
        </Reveal>
      </section>

      {/* Bio section */}
      <section className="px-7 md:px-20 py-24 bg-ivory">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-20 max-w-6xl mx-auto items-start">
          <Reveal>
            <div className="relative w-full max-w-[480px] aspect-[3/4] mx-auto md:mx-0 sticky top-24 overflow-hidden">
              <Image
                src="https://firebasestorage.googleapis.com/v0/b/aclaradyphotos.firebasestorage.app/o/photos%2Fabout-portrait.jpg?alt=media&token=1bf2dd81-4b2b-4c1b-a181-a3e8affd5e6c"
                alt="Angelia Clarady Portrait"
                fill
                className="object-cover"
              />
            </div>
          </Reveal>

          <Reveal delay={150}>
            <div>
              <h2 className="font-display text-3xl font-normal text-charcoal mb-3">My Story</h2>
              <div className="w-12 h-0.5 bg-copper-light mb-8" />

              <div className="space-y-5 text-[0.95rem] font-light leading-relaxed text-text-body">
                <p>
                  With a deep reverence for the natural world, I spend my days chasing light through
                  ancient forests, along rugged coastlines, and across sweeping mountain ranges.
                  Every photograph is a love letter to the wild places that still remain.
                </p>
                <p>
                  My journey into photography began on a solo backpacking trip through the Pacific
                  Northwest. Standing at the edge of a fog-wrapped valley at dawn, I felt an
                  overwhelming need to capture not just what I saw, but what I felt — the stillness,
                  the scale, the sacred quiet of an untouched landscape.
                </p>
                <p>
                  Since then, I&apos;ve traveled to over 30 countries and every corner of North
                  America, always seeking those fleeting moments where light and landscape converge
                  into something extraordinary. I shoot primarily with natural light, often during
                  the golden and blue hours, when the world feels most alive.
                </p>
                <p>
                  My work invites you to slow down, to breathe, and to see the extraordinary beauty
                  in the quiet moments of nature. Each print is produced on museum-quality archival
                  paper, ensuring the richness and depth of every image endures for generations.
                </p>
                <p>
                  When I&apos;m not behind the camera, you&apos;ll find me hiking with my dog,
                  tending my garden, or planning the next expedition to a wild corner of the world.
                </p>
              </div>

              <div className="mt-10 pt-8 border-t border-black/[0.06]">
                <h3 className="font-display text-xl font-normal text-charcoal mb-4">
                  Awards & Features
                </h3>
                <ul className="space-y-2 text-sm font-light text-text-body">
                  <li>International Landscape Photographer of the Year — Finalist 2024</li>
                  <li>National Geographic — Featured Photographer</li>
                  <li>Outdoor Photography Magazine — Cover Feature</li>
                  <li>Sony World Photography Awards — Shortlist 2023</li>
                </ul>
              </div>

              <div className="mt-10">
                <Link href="/contact" className="btn-outline-dark inline-block">
                  Get in Touch
                </Link>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </div>
  );
}
