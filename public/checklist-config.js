// ============================================================
//  CHECKLIST CONFIG — edit this file (or use /editor.html)
// ============================================================

// Tasks that appear on EVERY checklist, regardless of property
const TASKS_ALWAYS_INCLUDE = [
  "Change all locks and garage codes",
  "Test smoke and CO detectors — replace batteries",
  "Replace HVAC filters every 3 months — set a recurring calendar reminder",
];

// Instructions to the AI for each age bracket (plain English)
const AGE_RULES = {
  new_home:   "Home is under 5 years old. Focus on warranty walkthroughs, builder punch lists, and registering appliances. Check caulking and grout. Remind them that most builder warranties expire at year 1.",
  mid_age:    "Home is 5–20 years old. Check HVAC age and efficiency, water heater age (typical lifespan 10–12 years), roof condition, and whether any original appliances are due for replacement.",
  older_home: "Home is over 20 years old. Prioritize electrical panel inspection (older homes may have Federal Pacific or Zinsco panels), plumbing (galvanized pipes), insulation, and windows. Mention that knob-and-tube wiring is a red flag if present.",
};

// Best calendar month for seasonal tasks (1 = January, 12 = December)
const BEST_MONTH_FOR = {
  winterize_irrigation: 10,  // October
  clean_gutters:        10,  // October
  ac_tune_up:            5,  // May
  chimney_sweep:         9,  // September
};

// Total number of tasks the AI should generate
let TOTAL_TASKS = 20;

// Timing label display config (used by checklist-engine.js)
const TIMING_LABELS = {
  now:    "First 30 days",
  soon:   "1–3 months",
  mid:    "3–6 months",
  annual: "Annual",
  custom: "Agent's note",
};

// ── BACKUP CHECKLIST ─────────────────────────────────────────────────
// Used when the AI is unavailable. Also the reference for task types.
// Fields: section, icon, title, description, timing, feature (optional)
// timing options: now | soon | mid | annual | seasonal:winterize_irrigation | seasonal:clean_gutters | seasonal:ac_tune_up | seasonal:chimney_sweep
// feature: only show this task if the property has this feature (e.g. "Pool")

const BACKUP_CHECKLIST = [

  // ── Move-in Essentials ──
  { section: "Move-in Essentials", icon: "🔑", title: "Change all locks and garage codes", description: "Replace or rekey every exterior lock — you don't know who has copies of the old keys.", timing: "now" },
  { section: "Move-in Essentials", icon: "🔑", title: "Test smoke and CO detectors", description: "Test every unit, replace batteries, and replace any detector older than 10 years.", timing: "now" },
  { section: "Move-in Essentials", icon: "🔑", title: "Replace HVAC filters", description: "Start fresh and set a recurring calendar reminder to replace every 3 months.", timing: "now" },
  { section: "Move-in Essentials", icon: "🔑", title: "Label the electrical panel", description: "Go room by room and label every breaker — saves time and stress during any outage.", timing: "now" },
  { section: "Move-in Essentials", icon: "🔑", title: "Locate main water and gas shutoffs", description: "Know exactly where these are before you ever need them in an emergency.", timing: "now" },
  { section: "Move-in Essentials", icon: "🔑", title: "Register all appliances and locate warranties", description: "Register with manufacturers for warranty coverage and recall notifications.", timing: "now" },

  // ── HVAC ──
  { section: "HVAC", icon: "❄️", title: "Schedule furnace or heating system tune-up", description: "Have a tech inspect the heat exchanger, clean burners, and check for carbon monoxide leaks before heating season.", timing: "seasonal:chimney_sweep" },
  { section: "HVAC", icon: "❄️", title: "Schedule AC tune-up", description: "Clean coils, check refrigerant, and test the system before peak cooling season.", timing: "seasonal:ac_tune_up" },
  { section: "HVAC", icon: "❄️", title: "Clean dryer vent", description: "A clogged dryer vent is a leading cause of house fires — have it professionally cleaned once a year.", timing: "annual" },

  // ── Exterior & Roof ──
  { section: "Exterior & Roof", icon: "🏠", title: "Get a professional roof inspection", description: "A licensed roofer can spot issues invisible from the ground — especially important in the first year of ownership.", timing: "soon" },
  { section: "Exterior & Roof", icon: "🏠", title: "Clean gutters and downspouts", description: "Clear debris to prevent water damage to the fascia, siding, and foundation.", timing: "seasonal:clean_gutters" },
  { section: "Exterior & Roof", icon: "🏠", title: "Check grading and drainage around foundation", description: "Soil should slope away from the house. Poor drainage is the #1 cause of basement water issues.", timing: "soon" },
  { section: "Exterior & Roof", icon: "🏠", title: "Seal driveway cracks", description: "Fill cracks before winter — freeze-thaw cycles turn small cracks into major repairs fast.", timing: "seasonal:clean_gutters" },

  // ── Plumbing ──
  { section: "Plumbing", icon: "💧", title: "Check water heater age", description: "Water heaters last 10–12 years. If yours is approaching that, budget for a replacement this year.", timing: "now" },
  { section: "Plumbing", icon: "💧", title: "Test toilets and under-sink supply lines for leaks", description: "Slow leaks cause mold and structural damage — a 5-minute check now prevents expensive repairs later.", timing: "now" },
  { section: "Plumbing", icon: "💧", title: "Test all GFCI outlets", description: "Press the test/reset button on every GFCI in bathrooms, kitchen, garage, and exterior. Replace any that don't trip.", timing: "now" },

  // ── Lawn & Irrigation ──
  { section: "Lawn & Irrigation", icon: "🌱", title: "Winterize irrigation system", description: "Blow out irrigation lines before the first freeze to prevent costly burst pipes.", timing: "seasonal:winterize_irrigation", feature: "Lawn & Irrigation" },
  { section: "Lawn & Irrigation", icon: "🌱", title: "Spring irrigation startup and zone check", description: "Turn on the system, run every zone, and replace any heads damaged over winter.", timing: "soon", feature: "Lawn & Irrigation" },

  // ── Pool & Spa ──
  { section: "Pool & Spa", icon: "🏊", title: "Open pool and balance water chemistry", description: "Test and adjust pH, alkalinity, and sanitizer before swim season begins.", timing: "soon", feature: "Pool" },
  { section: "Pool & Spa", icon: "🏊", title: "Winterize pool", description: "Lower water level, add winterizing chemicals, and cover before temperatures drop.", timing: "seasonal:winterize_irrigation", feature: "Pool" },

  // ── Fireplace & Chimney ──
  { section: "Fireplace & Chimney", icon: "🔥", title: "Schedule chimney sweep before first use", description: "Creosote buildup is a fire hazard — a certified sweep cleans and inspects before heating season.", timing: "seasonal:chimney_sweep", feature: "Fireplace" },
  { section: "Fireplace & Chimney", icon: "🔥", title: "Test damper and check for drafts", description: "Open and close the damper fully — a leaky damper wastes heat all winter.", timing: "now", feature: "Fireplace" },

  // ── Garage ──
  { section: "Garage", icon: "🚗", title: "Test garage door auto-reverse safety feature", description: "Place a 2x4 flat under the door — it must reverse on contact. If it doesn't, call a technician immediately.", timing: "now", feature: "Attached Garage" },
  { section: "Garage", icon: "🚗", title: "Lubricate garage door rollers and hinges", description: "Apply silicone spray annually to prevent wear, noise, and premature failure.", timing: "annual", feature: "Attached Garage" },

  // ── New Home (under 5 years) ──
  { section: "New Construction", icon: "🏗", title: "Complete your builder warranty walkthrough", description: "Most workmanship warranties expire at year 1 — schedule a walkthrough with your builder before it lapses.", timing: "now", maxAge: 4 },
  { section: "New Construction", icon: "🏗", title: "Check for settling cracks in drywall and door frames", description: "Minor settling is normal in new construction — document any cracks now so you can track if they grow.", timing: "now", maxAge: 4 },
  { section: "New Construction", icon: "🏗", title: "Confirm all builder punch list items were completed", description: "Review your closing punch list and follow up on any outstanding items before your warranty window closes.", timing: "now", maxAge: 4 },

  // ── Mid-Age Home (5–20 years) ──
  { section: "Home Systems Review", icon: "🔧", title: "Check HVAC system age and plan ahead", description: "If the system is original to the home, it may be approaching the end of its lifespan — get it inspected and budget accordingly.", timing: "soon", minAge: 5, maxAge: 20 },
  { section: "Home Systems Review", icon: "🔧", title: "Assess roof age and condition", description: "15–20 year asphalt shingles are nearing end of life in many climates — a roofer can tell you how many years you have left.", timing: "soon", minAge: 5, maxAge: 20 },
  { section: "Home Systems Review", icon: "🔧", title: "Recaulk tubs, showers, and windows", description: "Caulk typically fails around year 7–10 — resealing now prevents water intrusion and mold behind walls.", timing: "soon", minAge: 5, maxAge: 20 },

  // ── Older Home (over 20 years) ──
  { section: "Older Home Priorities", icon: "🔩", title: "Inspect plumbing for galvanized pipes", description: "Homes built before 2000 may have galvanized steel pipes that corrode over time, causing low pressure and rust-colored water.", timing: "soon", minAge: 21 },

  // ── Deck & Patio ──
  { section: "Deck & Patio", icon: "🪵", title: "Inspect deck boards and railings", description: "Check for soft spots, rot, and loose railings — especially important on older wood decks.", timing: "soon", feature: "Deck or Patio" },
  { section: "Deck & Patio", icon: "🪵", title: "Seal or stain the deck", description: "Apply a fresh coat of sealant or stain to protect against moisture and UV damage.", timing: "soon", feature: "Deck or Patio" },

];

// ── APPLY SAVED EDITOR CHANGES ────────────────────────────────────────
// If you've used the visual editor, those changes are loaded here
(function () {
  try {
    const saved = JSON.parse(localStorage.getItem('ha_checklist_config') || 'null');
    if (!saved) return;
    if (saved.alwaysInclude) { TASKS_ALWAYS_INCLUDE.length = 0; saved.alwaysInclude.forEach(t => TASKS_ALWAYS_INCLUDE.push(t)); }
    if (saved.ageRules) { Object.assign(AGE_RULES, saved.ageRules); }
    if (saved.bestMonthFor) { Object.assign(BEST_MONTH_FOR, saved.bestMonthFor); }
    if (saved.totalTasks) { TOTAL_TASKS = saved.totalTasks; }
    if (saved.backupChecklist) { BACKUP_CHECKLIST.length = 0; saved.backupChecklist.forEach(t => BACKUP_CHECKLIST.push(t)); }
  } catch(e) {}
})();
