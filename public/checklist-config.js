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
  { section: "Move-in Essentials", icon: "🔑", title: "Test smoke and CO detectors", description: "Test every unit and replace batteries. Replace any detector older than 10 years.", timing: "now" },
  { section: "Move-in Essentials", icon: "🔑", title: "Locate main water, gas, and electrical shutoffs", description: "Know where these are before you need them in an emergency.", timing: "now" },
  { section: "Move-in Essentials", icon: "🔑", title: "Replace HVAC filters", description: "Start fresh and set a calendar reminder to replace every 3 months.", timing: "now" },

  // ── HVAC & Air Quality ──
  { section: "HVAC & Air Quality", icon: "❄️", title: "Schedule AC tune-up", description: "Have an HVAC tech clean coils, check refrigerant, and inspect the system before peak cooling season.", timing: "seasonal:ac_tune_up" },
  { section: "HVAC & Air Quality", icon: "❄️", title: "Clean dryer vent", description: "A clogged dryer vent is a leading cause of house fires. Have it professionally cleaned.", timing: "soon" },
  { section: "HVAC & Air Quality", icon: "❄️", title: "Check attic insulation and ventilation", description: "Proper insulation and airflow reduce energy bills and prevent ice dams in cold climates.", timing: "mid" },

  // ── Exterior & Roof ──
  { section: "Exterior & Roof", icon: "🏠", title: "Inspect roof condition", description: "Look for missing or curling shingles, damaged flashing, and signs of moss or algae.", timing: "soon" },
  { section: "Exterior & Roof", icon: "🏠", title: "Clean gutters and downspouts", description: "Remove leaves and debris to prevent water damage to fascia and foundation.", timing: "seasonal:clean_gutters" },
  { section: "Exterior & Roof", icon: "🏠", title: "Check caulking around windows and doors", description: "Recaulk any gaps to prevent drafts and water intrusion.", timing: "mid" },
  { section: "Exterior & Roof", icon: "🏠", title: "Inspect driveway and walkways", description: "Seal cracks in concrete or asphalt before winter freeze-thaw cycles make them worse.", timing: "annual" },

  // ── Plumbing ──
  { section: "Plumbing", icon: "💧", title: "Check water heater age and condition", description: "Water heaters last 10–12 years. If yours is older, budget for a replacement soon.", timing: "now" },
  { section: "Plumbing", icon: "💧", title: "Test all faucets and toilets for leaks", description: "Check supply lines and shutoff valves under every sink and behind toilets.", timing: "now" },
  { section: "Plumbing", icon: "💧", title: "Flush water heater", description: "Drain a few gallons to remove sediment buildup and extend the unit's life.", timing: "annual" },

  // ── Lawn & Irrigation ──
  { section: "Lawn & Irrigation", icon: "🌱", title: "Winterize irrigation system", description: "Blow out irrigation lines before the first freeze to prevent burst pipes.", timing: "seasonal:winterize_irrigation", feature: "Lawn & Irrigation" },
  { section: "Lawn & Irrigation", icon: "🌱", title: "Spring irrigation startup", description: "Turn on the system, test each zone, and check for heads damaged over winter.", timing: "soon", feature: "Lawn & Irrigation" },

  // ── Pool & Spa ──
  { section: "Pool & Spa", icon: "🏊", title: "Open and balance pool chemistry", description: "Test pH, alkalinity, and sanitizer levels. Shock the pool if needed before swim season.", timing: "soon", feature: "Pool" },
  { section: "Pool & Spa", icon: "🏊", title: "Winterize pool", description: "Lower water level, add winterizing chemicals, and cover the pool before temperatures drop.", timing: "seasonal:winterize_irrigation", feature: "Pool" },

  // ── Fireplace & Chimney ──
  { section: "Fireplace & Chimney", icon: "🔥", title: "Schedule chimney sweep and inspection", description: "Have a certified chimney sweep clean and inspect before your first fire of the season.", timing: "seasonal:chimney_sweep", feature: "Fireplace" },
  { section: "Fireplace & Chimney", icon: "🔥", title: "Check damper operation", description: "Open and close the damper to make sure it seals fully and operates smoothly.", timing: "now", feature: "Fireplace" },

  // ── Garage ──
  { section: "Garage", icon: "🚗", title: "Test garage door auto-reverse", description: "Place a 2x4 flat on the ground under the door. It should reverse on contact — if not, adjust the force or call a tech.", timing: "now", feature: "Attached Garage" },
  { section: "Garage", icon: "🚗", title: "Lubricate garage door hardware", description: "Apply silicone spray to rollers, hinges, and tracks annually to prevent wear and noise.", timing: "annual", feature: "Attached Garage" },
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
