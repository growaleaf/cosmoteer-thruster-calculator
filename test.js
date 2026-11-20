const { THRUSTER_PARTS } = require("./data.js");

let pass = 0, fail = 0;

function assertEqual(actual, expected, label) {
  if (actual === expected) {
    pass++;
    console.log(`PASS: ${label} (${actual})`);
  } else {
    fail++;
    console.log(`FAIL: ${label} -- expected ${expected}, got ${actual}`);
  }
}

function byId(id) {
  const p = THRUSTER_PARTS.find(p => p.id === id);
  if (!p) throw new Error(`part not found: ${id}`);
  return p;
}

function sumResource(part, material) {
  const r = part.resources.find(r => r.material === material);
  return r ? r.qty : 0;
}

// 1. seven parts present
assertEqual(THRUSTER_PARTS.length, 7, "seven thruster parts parsed");

// 2. known-answer: 4 x Small Thruster
const small = byId("thruster_small");
assertEqual(small.thrustKN * 4, 1600, "4x Small Thruster thrust = 1,600 kN");
assertEqual(Math.round(small.massT * 4 * 100) / 100, 5.2, "4x Small Thruster mass = 5.2 t");
assertEqual(sumResource(small, "Steel") * 4, 32, "4x Small Thruster steel = 32");
assertEqual(sumResource(small, "Coils") * 4, 12, "4x Small Thruster coils = 12");

// 3. single Small Thruster base stats match source page
assertEqual(small.massT, 1.3, "Small Thruster mass = 1.3 t");
assertEqual(small.thrustKN, 400, "Small Thruster thrust = 400 kN");
assertEqual(small.commandPoints, -1, "Small Thruster command points = -1");

// 4. Standard Thruster used comma-decimal in source ("2,45 tonnes") -- confirm normalized correctly
const med = byId("thruster_med");
assertEqual(med.massT, 2.45, "Standard Thruster mass normalized from '2,45 tonnes' to 2.45 t");
assertEqual(med.powerUsePerSec, 0.1, "Standard Thruster power use normalized from '0,1/sec' to 0.1");
assertEqual(med.thrustKN, 1200, "Standard Thruster thrust = 1,200 kN");

// 5. missing fields are null, never fabricated
assertEqual(med.powerGenPerSec, null, "Standard Thruster has no listed power generation -> null (renders n/a)");
assertEqual(med.blueprintCost, null, "Standard Thruster has no listed blueprint cost -> null (renders n/a)");

// 6. Huge Thruster ramp-down and blueprint requirement present
const huge = byId("thruster_huge");
assertEqual(huge.rampDownSec, 0.5, "Huge Thruster ramp-down = 0.5 sec");
assertEqual(huge.requiredBlueprint, "Large Thruster", "Huge Thruster requires Large Thruster blueprint");
assertEqual(huge.massT, 11.0, "Huge Thruster mass normalized from '11,0 tonnes' to 11.0 t");

// 7. Boost Thruster boost-mode figures captured separately from base figures
const boost = byId("thruster_boost");
assertEqual(boost.thrustKN, 3200, "Boost Thruster base thrust = 3,200 kN");
assertEqual(boost.boostThrustKN, 9600, "Boost Thruster boosted thrust = 9,600 kN");
assertEqual(boost.boostPowerUsePerSec, 0.45, "Boost Thruster boosted power use = 0.45/sec");

// 8. total mass/thrust aggregation across a mixed loadout (2x Small + 1x Large)
const large = byId("thruster_large");
const mixedMass = small.massT * 2 + large.massT * 1;
const mixedThrust = small.thrustKN * 2 + large.thrustKN * 1;
assertEqual(Math.round(mixedMass * 100) / 100, 7.59, "2x Small + 1x Large mass = 7.59 t");
assertEqual(mixedThrust, 4000, "2x Small + 1x Large thrust = 4,000 kN");

console.log(`\n${pass} passed, ${fail} failed`);
process.exit(fail > 0 ? 1 : 0);
