# Cosmoteer Thruster & Power Budget Calculator

A single static page for a Cosmoteer player sizing a ship's thruster loadout. Enter counts per thruster part and see total mass, thrust, a simple F/m acceleration figure, power use vs. generation, command points, and resource cost.

## Files
- `index.html` — the page and calculator UI/logic
- `data.js` — parsed thruster part stats, shared by the page and the tests
- `test.js` — `node test.js` runs known-answer and normalization checks against `data.js`

## Data source
`cosmoteer.wiki.gg`, "Thrusters" page, CC BY-SA, via the Wayback Machine snapshot dated 2025-07-19 (https://web.archive.org/web/20250719221019/https://cosmoteer.wiki.gg/wiki/Thrusters). The wiki page was last edited 2025-02-15. Game values may have changed since the snapshot was taken.

## Scope
Thrusters only (7 parts: Small, 2-Way Small, 3-Way Small, Standard, Large, Huge, Boost). Reactor and Battery pages were checked but each has fewer than 5 parts on their own, so they were left out rather than padding the page with a thin category.

Fields the source page did not list for a given part (e.g. Standard Thruster's power generation) are stored as `null` and rendered as "n/a" — never guessed or interpolated.
