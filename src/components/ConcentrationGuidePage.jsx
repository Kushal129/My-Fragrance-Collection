import React, { useState } from 'react';
import { ArrowLeftIcon } from 'lucide-animated';
import LuxuryPerfumeBottle2D from './LuxuryPerfumeBottle2D';

export const CONCENTRATIONS = [
  {
    id: 'edc',
    code: 'EDC',
    name: 'Eau de Cologne',
    tagline: 'Ultra-Light Effervescent Awakening & Immediate Refresh',
    oilPercent: 4,
    oilRange: '2% – 5%',
    alcoholPercent: 96,
    leadSummary:
      'The lightest historical formulation in European perfumery. Designed for brisk, invigorating daytime splashes rather than multi-hour sillage.',
    detailedBreakdown:
      'Engineered with 96% high-proof volatile perfumer\'s alcohol and a delicate 2%–5% concentration of pure citrus and herbal essential oils. The high alcohol proportion vaporizes rapidly upon skin contact, projecting sparkling top notes (bergamot, neroli, petitgrain) outward in a vibrant initial burst before settling swiftly into a clean, intimate skin whisper.',
    metrics: {
      longevity: {
        val: '2 – 3',
        unit: 'HOURS',
        label: 'Skin Longevity',
        detail: 'Fast volatile vaporization'
      },
      sillage: {
        val: '0.5',
        unit: 'METER',
        label: 'Projection Radius',
        detail: 'Intimate personal skin scent'
      },
      application: {
        val: '5 – 8',
        unit: 'SPRAYS',
        label: 'Application Dose',
        detail: 'Generous splash across neck & torso'
      },
      density: {
        val: '2% – 5%',
        unit: 'ESSENCE',
        label: 'Oil vs Carrier',
        detail: '96% volatile propellant alcohol'
      }
    },
    occasions: ['High Summer Heat', 'Post-Shower Splash', 'Gym & Athletic Wear', 'Morning Awakening'],
    seasons: ['Peak Summer', 'Humid Tropical Days', 'Warm Spring'],
    evolution: [
      {
        phase: 'Initial 30 Mins',
        title: 'Explosive Citrus Sparkle',
        desc: 'Rapid alcohol flash lifts volatile zesty terpenes, invigorating the senses immediately.'
      },
      {
        phase: 'Hour 1 – 2',
        title: 'Airy Aromatic Cleanliness',
        desc: 'Light florals, neroli, and petitgrain provide a crisp, freshly laundered aura.'
      },
      {
        phase: 'Drydown (Hour 2+)',
        title: 'Whispering Skin Scent',
        desc: 'Fades gently to an intimate, whisper-soft clean musk close to pulse points.'
      }
    ]
  },
  {
    id: 'edt',
    code: 'EDT',
    name: 'Eau de Toilette',
    tagline: 'Dynamic Daytime Projection & Vibrant Radiance',
    oilPercent: 10,
    oilRange: '5% – 15%',
    alcoholPercent: 90,
    leadSummary:
      'The modern daytime workhorse. Delivers explosive room-filling opening projection with comfortable half-day longevity.',
    detailedBreakdown:
      'Formulated with approximately 90% perfumer\'s alcohol and 10% essential fragrance oils. The generous alcohol volume acts as an energetic kinetic propellant, projecting aromatic heart accords and zesty top notes across a 1 to 1.5-meter radius during the first 2 hours. As the alcohol evaporates, smooth cedar, lavender, and pepper settle into a vibrant daytime aura.',
    metrics: {
      longevity: {
        val: '4 – 6',
        unit: 'HOURS',
        label: 'Skin Longevity',
        detail: 'Comfortable half-day wear'
      },
      sillage: {
        val: '1.0 – 1.5',
        unit: 'METERS',
        label: 'Projection Radius',
        detail: 'Radiant room-introducing wake'
      },
      application: {
        val: '4 – 6',
        unit: 'SPRAYS',
        label: 'Application Dose',
        detail: 'Pulse points, collar & shirt'
      },
      density: {
        val: '5% – 15%',
        unit: 'ESSENCE',
        label: 'Oil vs Carrier',
        detail: '90% perfumer alcohol carrier'
      }
    },
    occasions: ['Daily Casual Wear', 'College & University', 'Open-Air Daytime', 'Warm Weather Commute'],
    seasons: ['Spring Awakening', 'Warm Summer', 'Early Autumn'],
    evolution: [
      {
        phase: 'Initial 90 Mins',
        title: 'High-Impact Projection',
        desc: 'Ethanol propellant disperses energetic top notes into the surrounding room.'
      },
      {
        phase: 'Hours 2 – 4',
        title: 'Aromatic Heart Diffusion',
        desc: 'Spices, florals, and marine chords radiate with smooth, approachable elegance.'
      },
      {
        phase: 'Drydown (Hour 4 – 6)',
        title: 'Light Woody Trace',
        desc: 'Dry cedar, vetiver, and clean ambroxan linger close to fabric and skin.'
      }
    ]
  },
  {
    id: 'edp',
    code: 'EDP',
    name: 'Eau de Parfum',
    tagline: 'The Gold Standard of Modern Luxury Perfumery',
    oilPercent: 18,
    oilRange: '15% – 20%',
    alcoholPercent: 82,
    leadSummary:
      'The undisputed industry benchmark. Striking the ideal mathematical balance between authoritative projection and full workday endurance.',
    detailedBreakdown:
      'Holding an authoritative 15%–20% concentration of pure essential oils in 82% perfumer\'s alcohol. This equilibrium gives sufficient alcohol to project with commanding authority throughout the morning, while the heavy molecular weight of natural resins, ambers, and oud oils bond directly to skin lipids, ensuring continuous aromatic evolution through evening hours.',
    metrics: {
      longevity: {
        val: '8 – 10',
        unit: 'HOURS',
        label: 'Skin Longevity',
        detail: 'Complete full workday tenacity'
      },
      sillage: {
        val: '1.5 – 2.0',
        unit: 'METERS',
        label: 'Projection Radius',
        detail: 'Authoritative arm-length scent bubble'
      },
      application: {
        val: '3 – 5',
        unit: 'SPRAYS',
        label: 'Application Dose',
        detail: 'Collarbones, nape & wrists'
      },
      density: {
        val: '15% – 20%',
        unit: 'ESSENCE',
        label: 'Oil vs Carrier',
        detail: '82% volatile alcohol carrier'
      }
    },
    occasions: ['Corporate Office', 'Date Night', 'Evening Gatherings', 'Versatile Signature Daily'],
    seasons: ['Autumn & Winter', 'Cool Spring Evenings', 'Year-Round Air Conditioning'],
    evolution: [
      {
        phase: 'Hours 1 – 2',
        title: 'Authoritative Scent Bubble',
        desc: 'Controlled alcohol lift projects complex spices and citruses without sharpness.'
      },
      {
        phase: 'Hours 3 – 7',
        title: 'Rich Core Heart Bloom',
        desc: 'Dense florals, leather, vanilla, and iris project steadily at conversational distance.'
      },
      {
        phase: 'Drydown (Hour 8 – 10+)',
        title: 'Deep Resin & Amber Anchor',
        desc: 'Base oils cling to skin lipids and fabrics, persisting until the evening shower.'
      }
    ]
  },
  {
    id: 'pp',
    code: 'PP',
    name: 'Parfum / Pure Parfum',
    tagline: 'Opulent Density with Magnetic Close-Quarter Aura',
    oilPercent: 26,
    oilRange: '20% – 30%',
    alcoholPercent: 74,
    leadSummary:
      'Rich, velvety, and sophisticated. Trades aggressive room projection for an alluring, magnetic personal halo that endures from dusk till dawn.',
    detailedBreakdown:
      'Formulated with 20%–30% precious perfume absolutes and natural extracts. With low alcohol content, there is minimal initial sting or harsh chemical lift. Instead of announcing itself loudly across a room, Pure Parfum develops a warm, hypnotic scent cloud within your personal space that mesmerizes anyone entering your immediate proximity.',
    metrics: {
      longevity: {
        val: '10 – 14',
        unit: 'HOURS',
        label: 'Skin Longevity',
        detail: 'Effortless dusk-to-dawn endurance'
      },
      sillage: {
        val: '1.0',
        unit: 'METER',
        label: 'Projection Radius',
        detail: 'Dense, magnetic intimate halo'
      },
      application: {
        val: '2 – 3',
        unit: 'SPRAYS',
        label: 'Application Dose',
        detail: 'Pulse points only: neck & wrists'
      },
      density: {
        val: '20% – 30%',
        unit: 'ESSENCE',
        label: 'Oil vs Carrier',
        detail: '74% carrier; negligible alcohol sting'
      }
    },
    occasions: ['Formal Black Tie', 'Luxury Dinners', 'Special Celebrations', 'Intimate Encounters'],
    seasons: ['Late Autumn', 'Cold Winter', 'Formal Night Out'],
    evolution: [
      {
        phase: 'Initial 2 Hours',
        title: 'Velvety Smooth Release',
        desc: 'Gentle alcohol vaporization releases warm, rounded top notes with zero nasal sting.'
      },
      {
        phase: 'Hours 3 – 8',
        title: 'Hypnotic Heart Density',
        desc: 'Heavy woods, rare florals, and sweet ambers weave an opulent personal aura.'
      },
      {
        phase: 'Drydown (Hour 9 – 14+)',
        title: 'Skin-Melting Resonance',
        desc: 'Absorbs deeply into skin warmth, gently re-radiating whenever your body temperature rises.'
      }
    ]
  },
  {
    id: 'extrait',
    code: 'Extrait',
    name: 'Extrait de Parfum',
    tagline: 'The Absolute Pinnacle of Artisanal Niche Perfumery',
    oilPercent: 36,
    oilRange: '25% – 40%+',
    alcoholPercent: 64,
    leadSummary:
      'The most potent formulation in spray perfumery. Saturated with concentrated natural absolutes and resins for multi-day fabric permanence.',
    detailedBreakdown:
      'Extrait represents the master perfumer\'s unfiltered artistic vision, loaded with 25%–40%+ raw essence. Due to extreme oil viscosity, it adheres tenaciously to skin keratin and fabric fibers. A single spray leaves a lingering olfactory signature that hangs in rooms long after departure and remains perceptible on coats and scarves for days.',
    metrics: {
      longevity: {
        val: '14 – 18+',
        unit: 'HOURS',
        label: 'Skin Longevity',
        detail: 'Multi-day fabric permanence'
      },
      sillage: {
        val: '2.0+',
        unit: 'METERS',
        label: 'Projection Radius',
        detail: 'Unshakable, persistent scent trail'
      },
      application: {
        val: '1 – 2',
        unit: 'SPRAYS MAX',
        label: 'Application Dose',
        detail: 'Single mist on nape or collar'
      },
      density: {
        val: '25% – 40%+',
        unit: 'ESSENCE',
        label: 'Oil vs Carrier',
        detail: 'Heaviest spray oil formulation'
      }
    },
    occasions: ['VIP Galas & Receptions', 'Extreme Weather', 'Connoisseur Events', 'Cold Winter Nights'],
    seasons: ['Sub-Zero Winter', 'Crisp Cold Autumn'],
    evolution: [
      {
        phase: 'Hours 1 – 3',
        title: 'Deep Concentrated Impact',
        desc: 'Dense botanical extracts diffuse steadily without volatile explosive dissipation.'
      },
      {
        phase: 'Hours 4 – 10',
        title: 'Pure Note Preservation',
        desc: 'Heart and base chords maintain rich multi-faceted complexity without thinning.'
      },
      {
        phase: 'Drydown (14 – 24+ Hours)',
        title: 'Indelible Molecular Tenacity',
        desc: 'Dense oud, leather, and vanilla lock permanently into clothing fibers for days.'
      }
    ]
  },
  {
    id: 'attar',
    code: 'Attar',
    name: 'Pure Perfume Oil / Ittar',
    tagline: '100% Pure Botanical Distillation — Zero Alcohol',
    oilPercent: 100,
    oilRange: '100% Pure Oil',
    alcoholPercent: 0,
    leadSummary:
      'Centuries-old artisanal hydro-distillation into pure sandalwood carrier oil. Completely alcohol-free, skin-nourishing, and eternal.',
    detailedBreakdown:
      'Crafted with 100% pure steam-distilled botanicals, spices, and resins suspended in natural carrier oil with zero synthetic solvents or alcohol. Without ethanol to flash evaporate, an attar melts directly into skin lipids. Its molecules are energized exclusively by your body heat, releasing a radiant, soul-soothing aura that endures well past 24 hours.',
    metrics: {
      longevity: {
        val: '24+',
        unit: 'HOURS',
        label: 'Skin Longevity',
        detail: 'Eternal skin-lipid bonding'
      },
      sillage: {
        val: 'Intimate',
        unit: 'HEAT-RAD',
        label: 'Projection Radius',
        detail: 'Skin-close radiant warmth'
      },
      application: {
        val: '1 – 2',
        unit: 'DABS',
        label: 'Application Dose',
        detail: 'Glass wand on pulse points & beard'
      },
      density: {
        val: '100%',
        unit: 'PURE OIL',
        label: 'Oil vs Carrier',
        detail: '0% alcohol; 100% pure essence'
      }
    },
    occasions: ['Traditional Celebrations', 'Spiritual Gatherings', 'Layering Foundation', 'Daily Meditation'],
    seasons: ['All Seasons Universal', 'Adapts to Body Temperature'],
    evolution: [
      {
        phase: 'Application',
        title: 'Pure Oil Absorption',
        desc: 'Absorbs instantly into pulse points without drying out skin or evaporating away.'
      },
      {
        phase: 'Hours 2 – 12',
        title: 'Thermodynamic Radiance',
        desc: 'Body warmth activates pure botanical molecules, blooming stronger during activity.'
      },
      {
        phase: 'Drydown (24+ Hours)',
        title: 'Eternal Natural Essence',
        desc: 'Earthy sandalwood, rose, and amber remains noticeable on skin even after washing.'
      }
    ]
  }
];

const ConcentrationGuidePage = ({ onBack, returnPerfume }) => {
  const [activeId, setActiveId] = useState('edp');

  const active =
    CONCENTRATIONS.find((c) => c.id === activeId) || CONCENTRATIONS[2];

  return (
    <div className="space-y-6 pb-16 animate-fadeIn max-w-7xl mx-auto">
      {/* Top Navigation */}
      <div className="flex items-center justify-between border-b border-white/10 pb-4">
        <button
          onClick={onBack}
          className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-black hover:bg-white/10 text-neutral-300 hover:text-white border border-white/10 transition text-xs font-semibold active:scale-95"
        >
          <ArrowLeftIcon size={14} />
          <span>{returnPerfume ? `Back to ${returnPerfume.name}` : 'Back to Collection'}</span>
        </button>
      </div>

      {/* Pure Black Segmented Concentration Selector Tabs */}
      <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
        {CONCENTRATIONS.map((c) => {
          const isSelected = c.id === activeId;
          return (
            <button
              key={c.id}
              onClick={() => setActiveId(c.id)}
              className={`flex flex-col items-center justify-center py-3 px-2 rounded-xl border text-center transition-all active:scale-95 ${
                isSelected
                  ? 'bg-black border-amber-400 text-amber-300 shadow-md shadow-amber-400/10 ring-1 ring-amber-400/40'
                  : 'bg-black border-white/10 hover:border-white/25 text-neutral-400 hover:text-white'
              }`}
            >
              <span className="text-xs font-bold tracking-tight">{c.code}</span>
              <span className="text-[10px] text-neutral-500 mt-0.5">{c.oilRange}</span>
              <span
                className="w-1.5 h-1.5 rounded-full mt-2 transition-all"
                style={{
                  backgroundColor: isSelected ? '#f59e0b' : 'transparent'
                }}
              />
            </button>
          );
        })}
      </div>

      {/* Main Studio Card - Pure Dark Theme */}
      <div className="bg-black border border-white/10 rounded-2xl p-5 sm:p-8 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center shadow-2xl">
        {/* Left Column: Masterpiece 2D Luxury Atelier Flacon with Interactive Cap & Mist */}
        <div className="lg:col-span-5 flex flex-col items-center justify-center select-none py-2">
          <LuxuryPerfumeBottle2D
            oilPercent={active.oilPercent}
            alcoholPercent={active.alcoholPercent}
            concentrationCode={active.code}
            isAttar={active.id === 'attar'}
          />
        </div>

        {/* Right Column: Professional Clean Minimalist Layout (Zero Card Bloat) */}
        <div className="lg:col-span-7 flex flex-col justify-center space-y-6 px-1 sm:px-4">
          {/* 1. Full Formulation Name */}
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="text-xs font-black px-2 py-0.5 rounded bg-amber-400 text-black font-mono tracking-wider">
                {active.code}
              </span>
              <span className="text-[11px] font-mono uppercase tracking-widest text-neutral-400">
                Fragrance Formulation
              </span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              {active.name}
            </h2>
          </div>

          {/* 2. Clean Professional Spec List (Bordered Rows, No Cards) */}
          <div className="divide-y divide-white/10 border-y border-white/10">
            {/* Skin Longevity */}
            <div className="py-4 flex flex-col sm:flex-row sm:items-baseline justify-between gap-1">
              <span className="text-xs font-mono uppercase tracking-widest text-neutral-400">
                Skin Longevity
              </span>
              <div className="text-left sm:text-right">
                <span className="text-xl sm:text-2xl font-bold text-white font-mono">
                  {active.metrics.longevity.val} {active.metrics.longevity.unit}
                </span>
                <p className="text-[11px] text-neutral-400 mt-0.5">
                  *Varies upon specific perfumes & attars based on formulation & skin chemistry
                </p>
              </div>
            </div>

            {/* Projection Radius */}
            <div className="py-4 flex flex-col sm:flex-row sm:items-baseline justify-between gap-1">
              <span className="text-xs font-mono uppercase tracking-widest text-neutral-400">
                Projection Radius
              </span>
              <div className="text-left sm:text-right">
                <span className="text-xl sm:text-2xl font-bold text-amber-400 font-mono">
                  {active.metrics.sillage.val} {active.metrics.sillage.unit}
                </span>
                <p className="text-[11px] text-neutral-400 mt-0.5">
                  *Varies upon specific perfumes & attars, note density, and room airflow
                </p>
              </div>
            </div>

            {/* Apply Spray / Dose */}
            <div className="py-4 flex flex-col sm:flex-row sm:items-baseline justify-between gap-1">
              <span className="text-xs font-mono uppercase tracking-widest text-neutral-400">
                {active.id === 'attar' ? 'Apply Dab' : 'Apply Spray'}
              </span>
              <div className="text-left sm:text-right">
                <span className="text-xl sm:text-2xl font-bold text-white font-mono">
                  {active.metrics.application.val} {active.metrics.application.unit}
                </span>
                <p className="text-[11px] text-neutral-400 mt-0.5">
                  {active.id === 'attar'
                    ? 'Pulse points & wrists'
                    : 'Collarbones, nape & pulse points'}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConcentrationGuidePage;
