// =============================================================================
// HOUSEACCOUNT CHECKLIST CONFIG
// This is the only file you need to edit to change what's on the checklist.
// =============================================================================


// ── TIMING LABELS ─────────────────────────────────────────────────────────────
// Controls how each time bucket appears on the printed checklist.
// Change the label text to adjust what homeowners see.

const TIMING = {
  now:    { label: '⚡ First 30 days', cls: 't-now'  },
  soon:   { label: '1–3 months',       cls: 't-soon' },
  mid:    { label: '3–6 months',       cls: 't-mid'  },
  annual: { label: 'Annual',           cls: 't-ann'  },
  custom: { label: 'Custom',           cls: 't-cust' }
};


// ── TIER 1: ALWAYS-INCLUDED TASKS ────────────────────────────────────────────
// These appear on EVERY checklist regardless of property type or location.
// All are timed "now" (first 30 days). Add, remove, or reword as needed.

const TIER1_TASKS = [
  'Change all locks and garage codes',
  'Test smoke and CO detectors, replace batteries',
  'Locate and label main water, gas, and electrical shutoffs',
  'Replace all HVAC air filter(s)',
  'Run every faucet and check under sinks for leaks'
];


// ── TIER 3: AGE-BASED TASK GUIDANCE ──────────────────────────────────────────
// Claude uses this text to generate 2–3 tasks based on how old the home is.
// Edit the descriptions to change what gets recommended.

const TIER3 = {
  new:  'New home (under 5 years): register appliances with manufacturers, review builder warranty terms, inspect for settling cracks',
  mid:  'Mid-age home (5–20 years): confirm roof condition and estimated remaining life, check HVAC service history, inspect water heater age',
  old:  'Older home (20+ years): check for outdated plumbing or wiring, inspect foundation, consider sewer line scope'
};


// ── SEASONAL MONTH TARGETS ────────────────────────────────────────────────────
// These are the ideal calendar months (0 = January) for common seasonal tasks.
// Adjust if you want to shift when tasks get recommended relative to move-in.

const SEASONAL_MONTHS = {
  winterizeIrrigation: 9,  // October
  cleanGutters:        9,  // October
  acTuneUp:            4,  // May
  chimneySweep:        8   // September (before heating season)
};


// ── CHECKLIST SIZE ────────────────────────────────────────────────────────────
// Total number of AI-generated tasks. Increase for more detail, decrease for brevity.

const CHECKLIST_SIZE = '18–22';


// ── PROMPT BUILDER ────────────────────────────────────────────────────────────
// Assembles the full AI prompt from the config above + the property details.
// You shouldn't need to edit this often — focus on the sections above instead.

function buildPrompt({ address, city, homeType, age, yearBuilt, sqft, moveMonth, moveMonthName, features, monthsAway, distToTiming }) {
  const wm = SEASONAL_MONTHS.winterizeIrrigation;
  const gm = SEASONAL_MONTHS.cleanGutters;
  const am = SEASONAL_MONTHS.acTuneUp;

  const tier3Instruction = age === null
    ? 'Skip — age unknown'
    : age < 5  ? TIER3.new
    : age < 20 ? TIER3.mid
    : TIER3.old;

  return `You are a home maintenance expert. Generate a focused Year 1 checklist: ${CHECKLIST_SIZE} tasks total.

PROPERTY:
- ${address || 'address unknown'}, ${city || 'city unknown'}
- ${homeType}${age ? `, built ${yearBuilt} (${age} years old)` : ''}
- ${sqft ? sqft + ' sq ft' : ''}
- Move-in month: ${moveMonthName} (month index ${moveMonth}, 0=January)
- Features: ${features.length ? features.join(', ') : 'standard'}

TIMING RULES:
Assign each task a timing value based on the move-in month of ${moveMonthName}.
- "now" = do in first 30 days
- "soon" = 1–3 months from move-in
- "mid" = 3–6 months from move-in
- "annual" = recurring yearly task, or more than 6 months away

For geographic seasonal tasks, calculate the ideal calendar month for that task, then figure out how many months away it is from ${moveMonthName}:
- Winterize irrigation: ideally October. That is ${monthsAway(moveMonth, wm)} months away from ${moveMonthName}, so timing = "${distToTiming(monthsAway(moveMonth, wm))}"
- Clean gutters: ideally October. ${monthsAway(moveMonth, gm)} months away = "${distToTiming(monthsAway(moveMonth, gm))}"
- AC tune-up: ideally May. ${monthsAway(moveMonth, am)} months away = "${distToTiming(monthsAway(moveMonth, am))}"
Use this same logic for all other seasonal tasks. Never say "in October" — just use the timing bucket.

TIER 1 — Include ALL of these, timing = "now":
${TIER1_TASKS.map(t => `- ${t}`).join('\n')}

TIER 2 — Geographic (4–5 tasks, based on climate of ${city || 'this location'}):
Include seasonal tasks appropriate to this region. Use the timing calculation above to assign the right bucket.

TIER 3 — Age-based (2–3 tasks, only if age is known):
${tier3Instruction}

TIER 4 — Amenity sections (one section per feature, 2–3 tasks each, only for detected features):
${features.length ? features.join(', ') : 'none'}
For amenities with seasonal tasks (pool closing, fireplace before winter), apply the timing calculation.

Return ONLY valid JSON:
{
  "sections": [
    {
      "title": "section name",
      "icon": "single emoji",
      "items": [
        {"title": "concise task", "description": "one specific sentence for this property", "timing": "now|soon|mid|annual"}
      ]
    }
  ]
}

Be specific to this property — mention the city, climate, home age, specific systems where relevant.`;
}


// ── FALLBACK CHECKLIST ────────────────────────────────────────────────────────
// Used only if the AI call fails. Edit tasks here to change the backup checklist.

function buildFallback(features, mm, monthsAway, distToTiming) {
  const irrT = distToTiming(monthsAway(mm, SEASONAL_MONTHS.winterizeIrrigation));
  const acT  = distToTiming(monthsAway(mm, SEASONAL_MONTHS.acTuneUp));
  const gutT = distToTiming(monthsAway(mm, SEASONAL_MONTHS.cleanGutters));
  const chimT = distToTiming(monthsAway(mm, SEASONAL_MONTHS.chimneySweep));

  const sections = [
    { title: 'Safety & Security', icon: '🔒', items: [
      { title: 'Change all locks and garage codes',             description: 'Previous owners may still have access. Do this on move-in day — it\'s the single most important task.', timing: 'now' },
      { title: 'Test smoke and CO detectors',                   description: 'Replace all batteries and swap out any detectors older than 10 years.',                                  timing: 'now' },
      { title: 'Locate main water, gas, and electrical shutoffs', description: 'Walk the property and label each one clearly. You need to know these instantly in an emergency.',        timing: 'now' }
    ]},
    { title: 'Systems', icon: '🔧', items: [
      { title: 'Replace all HVAC air filters',       description: 'Check every air handler in the home. Set a 90-day calendar reminder to do it again.',          timing: 'now'  },
      { title: 'Check under every sink for leaks',   description: 'Run each faucet and inspect inside every cabinet below. Small drips become big mold problems.', timing: 'now'  },
      { title: 'Schedule HVAC tune-up',              description: 'Annual professional service keeps the system efficient and the warranty valid.',                 timing: 'soon' }
    ]},
    { title: 'Seasonal Prep', icon: '🍂', items: [
      { title: 'Winterize outdoor irrigation and hose bibs', description: 'Blow out irrigation lines and disconnect hoses before the first hard freeze.',                            timing: irrT },
      { title: 'Schedule AC check before cooling season',    description: 'Have refrigerant levels and coil efficiency checked before peak heat.',                                   timing: acT  },
      { title: 'Clean gutters',                              description: 'Remove debris and check that downspouts extend at least 6 feet from the foundation.', timing: gutT }
    ]}
  ];

  if (features.includes('Pool')) sections.push({
    title: 'Pool & Spa', icon: '🏊', items: [
      { title: 'Test and balance pool water chemistry',     description: 'pH 7.4–7.6, chlorine 1–3 ppm. Imbalanced water damages the shell and equipment fast.', timing: 'now' },
      { title: 'Check pool safety fence and gate latch',   description: 'Self-closing, self-latching gates are legally required. Check all hinges and gap clearances.', timing: 'now' },
      { title: 'Schedule seasonal pool close or service',  description: 'Plan ahead for winterization or the summer opening depending on your move-in timing.', timing: gutT }
    ]
  });

  if (features.includes('Fireplace')) sections.push({
    title: 'Fireplace & Chimney', icon: '🔥', items: [
      { title: 'Schedule chimney inspection and sweep', description: 'Required annually before first use. Creosote buildup is a leading cause of house fires.', timing: chimT },
      { title: 'Test damper operation',                 description: 'The damper must open and close fully. A stuck-open damper loses significant heat in winter.', timing: 'now' }
    ]
  });

  return { sections };
}
