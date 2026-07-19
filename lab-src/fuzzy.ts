export type FuzzyResult = { score: number; indexes: number[] };

// Subsequence fuzzy match: every query char must appear in order.
// Consecutive runs and word starts score higher; long targets score lower,
// so "des" ranks "Design system" above "Waddl case study".
export const fuzzyMatch = (query: string, target: string): FuzzyResult | null => {
  const q = query.toLowerCase();
  const t = target.toLowerCase();
  if (q.length === 0) return { score: 0, indexes: [] };

  const indexes: number[] = [];
  let qi = 0;
  let score = 0;
  let streak = 0;

  for (let ti = 0; ti < t.length && qi < q.length; ti++) {
    if (t[ti] !== q[qi]) {
      streak = 0;
      continue;
    }
    streak += 1;
    const wordStart = ti === 0 || t[ti - 1] === " " || t[ti - 1] === "/";
    score += streak * 2 + (wordStart ? 4 : 0);
    indexes.push(ti);
    qi += 1;
  }

  if (qi < q.length) return null;
  return { score: score - Math.floor(t.length / 8), indexes };
};
