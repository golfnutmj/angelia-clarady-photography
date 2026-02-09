import Link from 'next/link';
import Reveal from '@/components/Reveal';

// Placeholder collections — replace with Firebase data
const collections = [
  {
    name: 'Ancient Forests',
    slug: 'ancient-forests',
    description: 'Light filtering through moss-draped canopies in the world\'s oldest woodlands.',
    gradient:
      'radial-gradient(ellipse at 30% 40%, rgba(80,100,50,0.8) 0%, transparent 60%), linear-gradient(180deg, #6B8050 0%, #3A4A2A 70%, #2A3A20 100%)',
  },
  {
    name: 'Coastal Light',
    slug: 'coastal-light',
    description: 'Where land meets sea — dramatic cliffs, golden sunsets, and crashing waves.',
    gradient:
      'radial-gradient(ellipse at 50% 20%, #E8A050 0%, transparent 40%), linear-gradient(180deg, #D4903A 0%, #4080A0 50%, #205060 100%)',
  },
  {
    name: 'Mountain Majesty',
    slug: 'mountain-majesty',
    description: 'Alpine peaks reflected in still waters at the edge of dawn.',
    gradient:
      'radial-gradient(ellipse at 50% 30%, rgba(200,220,240,0.6) 0%, transparent 40%), linear-gradient(180deg, #7CB0D0 0%, #A08868 50%, #305070 100%)',
  },
  {
    name: 'Desert Silence',
    slug: 'desert-silence',
    description: 'Vast, timeless landscapes shaped by wind and time.',
    gradient:
      'radial-gradient(ellipse at 40% 40%, rgba(220,180,140,0.7) 0%, transparent 50%), linear-gradient(180deg, #D4B08A 0%, #C09868 40%, #8A7050 80%)',
  },
  {
    name: 'Northern Lights',
    slug: 'northern-lights',
    description: 'The aurora dancing above frozen wilderness under starlit skies.',
    gradient:
      'radial-gradient(ellipse at 50% 30%, rgba(100,200,150,0.5) 0%, transparent 50%), linear-gradient(180deg, #1A2040 0%, #203050 40%, #2A4040 70%, #102030 100%)',
  },
  {
    name: 'Wildflower Meadows',
    slug: 'wildflower-meadows',
    description: 'Bursts of color across rolling hillsides in spring and summer.',
    gradient:
      'radial-gradient(ellipse at 40% 50%, rgba(180,120,160,0.5) 0%, transparent 50%), linear-gradient(180deg, #90C080 0%, #70A060 40%, #608050 70%, #507040 100%)',
  },
];

export default function PortfolioPage() {
  return (
    <div className="pt-[60px]">
      {/* Header */}
      <section className="px-7 md:px-20 pt-20 pb-12 bg-ivory text-center">
        <Reveal>
          <h1 className="section-title mb-3">Portfolio</h1>
          <div className="section-divider mb-6" />
          <p className="text-[0.95rem] font-light text-text-light max-w-lg mx-auto leading-relaxed">
            Explore curated collections from my journeys across wild landscapes.
          </p>
        </Reveal>
      </section>

      {/* Collections grid */}
      <section className="px-7 md:px-20 pb-24 bg-ivory">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7">
          {collections.map((col, i) => (
            <Reveal key={col.slug} delay={i * 80}>
              <Link href={`/portfolio/${col.slug}`} className="group block">
                <div className="relative aspect-[3/4] overflow-hidden mb-4">
                  <div
                    className="w-full h-full transition-transform duration-500 group-hover:scale-105"
                    style={{ background: col.gradient }}
                  />
                  <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/50 to-transparent text-white">
                    <h3 className="font-display text-xl font-normal mb-1">{col.name}</h3>
                    <span className="font-body text-[0.65rem] tracking-wide-caps uppercase text-white/80">
                      View Collection →
                    </span>
                  </div>
                </div>
                <p className="text-sm font-light text-text-body leading-relaxed">{col.description}</p>
              </Link>
            </Reveal>
          ))}
        </div>
      </section>
    </div>
  );
}
