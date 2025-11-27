// src/data/stats.js
let stats = {
  visits: 0,
};

export function getStats() {
  return stats;
}

export function incrementVisit() {
  stats.visits += 1;
  return stats;
}
