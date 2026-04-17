// ============================================================
//  HOUSEACCOUNT — CHECKLIST EDITOR
//  This is the only file you need to open to change the checklist.
//  No coding knowledge required — just edit the text in quotes.
// ============================================================


// ============================================================
//  HOW TIMING WORKS
//  Every task gets a timing badge on the printed checklist.
//  You can rename these labels here — they'll update everywhere.
// ============================================================

const TIMING_LABELS = {
  now:    '⚡ First 30 days',
  soon:   '1–3 months',
  mid:    '3–6 months',
  annual: 'Annual',
  custom: 'Custom',
};


// ============================================================
//  TASKS THAT APPEAR ON EVERY CHECKLIST
//  These are included no matter what — regardless of home type,
//  location, or age. Add, remove, or reword any of them freely.
//  All of these are flagged "First 30 days."
// ============================================================

const TASKS_ALWAYS_INCLUDE = [
  "Change all locks and garage codes",
  "Test smoke and CO detectors — replace batteries",
  "Find and label the main water, gas, and electrical shutoffs",
  "Replace all HVAC air filters",
  "Run every faucet and check under sinks for leaks",
];


// ============================================================
//  AGE-BASED RECOMMENDATIONS
//  The AI picks 2–3 tasks based on how old the home is.
//  Edit these sentences to change what gets recommended.
// ============================================================

const AGE_RULES = {

  // Home is less than 5 years old
  new_home: `
    Register all appliances with the manufacturer — most warranties require it.
    Review the builder warranty carefully; most structural warranties expire at year 1.
    Walk the home and look for settling cracks around doors, windows, and the foundation.
  `,

  // Home is 5 to 20 years old
  mid_age: `
    Ask for the roof inspection report and find out how many years are left on it.
    Pull the HVAC service history — if it hasn't been serviced in 2+ years, schedule it now.
    Check the water heater age; most last 10–12 years and should be replaced proactively.
  `,

  // Home is more than 20 years old
  older_home: `
    Have a licensed plumber check for galvanized or outdated pipes that may need replacing.
    Inspect the foundation for cracks, efflorescence, or water intrusion.
    Consider a sewer line camera scope — older clay or cast iron lines can fail without warning.
    Check the electrical panel for outdated wiring types (knob-and-tube, aluminum wiring).
  `,

};


// ============================================================
//  SEASONAL TASK TIMING
//  Tells the AI the best month to do each type of task.
//  Use the month number: January = 1, October = 10, etc.
//  The AI automatically adjusts timing based on move-in date.
// ============================================================

const BEST_MONTH_FOR = {
  winterize_irrigation:  10,  // October  — blow out lines before first freeze
  clean_gutters:         10,  // October  — after leaves fall
  ac_tune_up:             5,  // May      — before summer heat
  chimney_sweep:          9,  // September — before heating season starts
};


// ============================================================
//  CHECKLIST LENGTH
//  How many tasks the AI should aim to generate in total.
//  Keep it between 15 and 25 for best results.
// ============================================================

const TOTAL_TASKS = "18–22";


// ============================================================
//  BACKUP CHECKLIST
//  If the AI is ever unavailable, homeowners get this instead.
//  This is also a good reference for the kinds of tasks we include.
//
//  HOW TO EDIT:
//    title       — the task name (short, action-oriented)
//    description — one sentence explaining why it matters
//    timing      — when to do it:
//                    "now"    = First 30 days
//                    "soon"   = 1–3 months from move-in
//                    "mid"    = 3–6 months from move-in
//                    "annual" = Once a year
//    feature     — (optional) only include if the home has this feature
//                    options: "Pool", "Fireplace", "Basement", "Attached Garage",
//                             "Deck or Patio", "Well Water", "Septic System",
//                             "Solar Panels", "Lawn & Irrigation", "Spa/Hot Tub"
// ============================================================

const BACKUP_CHECKLIST = [


  // ── SAFETY & SECURITY ────────────────────────────────────────
  {
    section:     "Safety & Security",
    icon:        "🔒",
    title:       "Change all locks and garage codes",
    description: "Previous owners may still have copies of keys — do this on move-in day.",
    timing:      "now",
  },
  {
    section:     "Safety & Security",
    icon:        "🔒",
    title:       "Test all smoke and CO detectors",
    description: "Replace batteries now and swap out any detector that is more than 10 years old.",
    timing:      "now",
  },
  {
    section:     "Safety & Security",
    icon:        "🔒",
    title:       "Find and label the main water, gas, and electrical shutoffs",
    description: "Walk every inch of the property and label each one — you need to find these fast in an emergency.",
    timing:      "now",
  },


  // ── SYSTEMS ──────────────────────────────────────────────────
  {
    section:     "Systems",
    icon:        "🔧",
    title:       "Replace all HVAC air filters",
    description: "Check every air handler in the home and set a 90-day calendar reminder to replace them again.",
    timing:      "now",
  },
  {
    section:     "Systems",
    icon:        "🔧",
    title:       "Check under every sink for leaks",
    description: "Run each faucet and look inside the cabinet below — small drips turn into big mold problems fast.",
    timing:      "now",
  },
  {
    section:     "Systems",
    icon:        "🔧",
    title:       "Schedule a professional HVAC tune-up",
    description: "Annual service keeps the system efficient, extends its life, and keeps the warranty valid.",
    timing:      "soon",
  },


  // ── SEASONAL PREP ────────────────────────────────────────────
  {
    section:     "Seasonal Prep",
    icon:        "🍂",
    title:       "Winterize outdoor irrigation and hose bibs",
    description: "Have a pro blow out the irrigation lines and disconnect garden hoses before the first hard freeze.",
    timing:      "seasonal:winterize_irrigation",
  },
  {
    section:     "Seasonal Prep",
    icon:        "🍂",
    title:       "Schedule AC tune-up before summer",
    description: "Have refrigerant levels and coil efficiency checked before you need it — appointments fill up fast in spring.",
    timing:      "seasonal:ac_tune_up",
  },
  {
    section:     "Seasonal Prep",
    icon:        "🍂",
    title:       "Clean gutters and check downspouts",
    description: "Clear debris after leaves fall and make sure downspouts direct water at least 6 feet from the foundation.",
    timing:      "seasonal:clean_gutters",
  },


  // ── POOL & SPA (only if home has a pool) ─────────────────────
  {
    section:     "Pool & Spa",
    icon:        "🏊",
    feature:     "Pool",
    title:       "Test and balance pool water chemistry",
    description: "Target pH 7.4–7.6 and chlorine 1–3 ppm — imbalanced water damages the shell and equipment fast.",
    timing:      "now",
  },
  {
    section:     "Pool & Spa",
    icon:        "🏊",
    feature:     "Pool",
    title:       "Inspect pool safety fence and gate latches",
    description: "Self-closing, self-latching gates are legally required in most states — check all hinges and gap clearances.",
    timing:      "now",
  },
  {
    section:     "Pool & Spa",
    icon:        "🏊",
    feature:     "Pool",
    title:       "Schedule seasonal pool opening or closing",
    description: "Book ahead — pool service companies fill up quickly at the start and end of each season.",
    timing:      "seasonal:winterize_irrigation",
  },


  // ── FIREPLACE & CHIMNEY (only if home has a fireplace) ───────
  {
    section:     "Fireplace & Chimney",
    icon:        "🔥",
    feature:     "Fireplace",
    title:       "Schedule a chimney inspection and sweep",
    description: "Required before first use every year — creosote buildup is one of the leading causes of house fires.",
    timing:      "seasonal:chimney_sweep",
  },
  {
    section:     "Fireplace & Chimney",
    icon:        "🔥",
    feature:     "Fireplace",
    title:       "Test damper open and close",
    description: "A stuck or missing damper wastes significant heat all winter and lets pests in during warmer months.",
    timing:      "now",
  },


  // ── GARAGE (only if home has a garage) ───────────────────────
  {
    section:     "Garage",
    icon:        "🚗",
    feature:     "Attached Garage",
    title:       "Test the garage door auto-reverse safety feature",
    description: "Place a 2x4 flat on the ground under the door — it must reverse on contact. This is a required safety standard.",
    timing:      "now",
  },
  {
    section:     "Garage",
    icon:        "🚗",
    feature:     "Attached Garage",
    title:       "Lubricate garage door springs and tracks",
    description: "Use garage-door-specific lubricant (not WD-40) on springs, rollers, and hinges once a year.",
    timing:      "annual",
  },


  // ── DECK / PATIO (only if home has one) ──────────────────────
  {
    section:     "Deck & Patio",
    icon:        "🪵",
    feature:     "Deck or Patio",
    title:       "Inspect deck boards and railings for rot or loose fasteners",
    description: "Walk every board and shake every railing post — soft spots and loose railings are safety hazards.",
    timing:      "soon",
  },
  {
    section:     "Deck & Patio",
    icon:        "🪵",
    feature:     "Deck or Patio",
    title:       "Seal or stain wood decking",
    description: "Unsealed wood absorbs moisture and splits — plan to seal every 2–3 years starting in year one.",
    timing:      "mid",
  },

];
