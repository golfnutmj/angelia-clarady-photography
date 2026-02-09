import Link from 'next/link';
import Reveal from '@/components/Reveal';

// Placeholder prints — replace with Firebase data
const prints = [
  {
    id: '1',
    title: 'Morning Mist Valley',
    price: 285,
    gradient: 'linear-gradient(180deg, #C8B890 0%, #8B9068 40%, #5A6B4A 70%, #3A4A2A 100%)',
  },
  {
    id: '2',
    title: 'Coastal Sunset Cliffs',
    price: 320,
    gradient: 'linear-gradient(180deg, #E8A850 0%, #C88030 30%, #4080A0 60%, #205060 100%)',
  },
  {
    id: '3',
    title: 'Alpine Reflection',
    price: 350,
    gradient: 'linear-gradient(180deg, #7CB0D0 0%, #60A0C0 30%, #A08868 60%, #605040 100%)',
  },
  {
    id: '4',
    title: 'Ancient Oak Canopy',
    price: 265,
    gradient: 'linear-gradient(180deg, #90A078 0%, #6B8050 40%, #4A6035 70%, #2A3A20 100%)',
  },
  {
    id: '5',
    title: 'Desert Dawn',
    price: 295,
    gradient: 'linear-gradient(180deg, #D4B08A 0%, #C09868 40%, #A08058 70%, #806040 100%)',
  },
  {
    id: '6',
    title: 'Waterfall Cascade',
    price: 310,
    gradient: 'linear-gradient(180deg, #90B0A0 0%, #608878 40%, #406858 70%, #305040 100%)',
  },
];

export default function ShopPage() {
  return (
    <div className="pt-[60px]">
      {/* Header */}
      <section className="px-7 md:px-20 pt-20 pb-12 bg-ivory text-center">
        <Reveal>
          <h1 className="section-title mb-3">Fine Art Prints</h1>
          <div className="section-divider mb-6" />
          <p className="text-[0.95rem] font-light text-text-light max-w-lg mx-auto leading-relaxed">
            Museum-quality archival prints, hand-signed and available in limited editions.
            Each piece is printed on premium fine art paper with archival inks.
          </p>
        </Reveal>
      </section>

      {/* Print sizes info */}
      <section className="px-7 md:px-20 pb-8 bg-ivory">
        <Reveal>
          <div className="max-w-3xl mx-auto flex flex-wrap justify-center gap-8 text-center text-sm font-light text-text-light">
            <div>
              <span className="block font-display text-lg text-charcoal mb-1">Small</span>
              12&quot; × 18&quot;
            </div>
            <div>
              <span className="block font-display text-lg text-charcoal mb-1">Medium</span>
              20&quot; × 30&quot;
            </div>
            <div>
              <span className="block font-display text-lg text-charcoal mb-1">Large</span>
              30&quot; × 45&quot;
            </div>
            <div>
              <span className="block font-display text-lg text-charcoal mb-1">Grand</span>
              40&quot; × 60&quot;
            </div>
          </div>
        </Reveal>
      </section>

      {/* Prints grid */}
      <section className="px-7 md:px-20 py-16 pb-24 bg-ivory">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7">
          {prints.map((print, i) => (
            <Reveal key={print.id} delay={i * 80}>
              <div className="group cursor-pointer">
                <div className="relative aspect-[4/3] overflow-hidden mb-4">
                  <div
                    className="w-full h-full transition-transform duration-500 group-hover:scale-105"
                    style={{ background: print.gradient }}
                  />
                </div>
                <div className="flex justify-between items-baseline">
                  <h3 className="font-display text-lg font-normal text-charcoal">
                    {print.title}
                  </h3>
                  <span className="text-sm font-light text-text-light">
                    from ${print.price}
                  </span>
                </div>
                <p className="text-xs font-light text-text-light mt-1 tracking-wide-caps uppercase">
                  Limited Edition
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Custom commissions CTA */}
      <section className="px-7 py-20 bg-sage text-center">
        <Reveal>
          <h2 className="section-title mb-3">Custom Commissions</h2>
          <div className="section-divider mb-8" />
          <p className="text-[0.95rem] font-light text-text-body max-w-xl mx-auto mb-10 leading-relaxed">
            Looking for something specific? I accept commissioned work for private collections,
            corporate spaces, and hospitality projects. Let&apos;s create something unique together.
          </p>
          <Link href="/contact" className="btn-outline-dark">
            Inquire About a Commission
          </Link>
        </Reveal>
      </section>
    </div>
  );
}
