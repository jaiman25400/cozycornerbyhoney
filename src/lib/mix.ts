const MIN_SHARE = 10;

function stepOf(value: number) {
  return Math.round(value / 5) * 5;
}

export function evenSplit(ids: string[]): Record<string, number> {
  const count = ids.length;
  if (count === 0) return {};
  if (count === 1) return { [ids[0]]: 100 };
  const base = Math.floor(100 / count / 5) * 5;
  let extra = 100 - base * count;
  const shares: Record<string, number> = {};
  for (const id of ids) {
    const add = extra >= 5 ? 5 : 0;
    shares[id] = base + add;
    extra -= add;
  }
  return shares;
}

/** Move one flavour's share. The others take the rest and the total stays 100. */
export function setShare(
  current: Record<string, number>,
  id: string,
  raw: number,
): Record<string, number> {
  const ids = Object.keys(current);
  if (!ids.includes(id)) return current;
  if (ids.length <= 1) return { [id]: 100 };

  const others = ids.filter((key) => key !== id);
  const maxThis = 100 - others.length * MIN_SHARE;
  const next = Math.min(maxThis, Math.max(MIN_SHARE, stepOf(raw)));
  const remaining = 100 - next;
  const otherSum = others.reduce((sum, key) => sum + current[key], 0);
  const result: Record<string, number> = { [id]: next };
  let used = 0;

  others.forEach((key, index) => {
    if (index === others.length - 1) {
      result[key] = remaining - used;
      return;
    }
    const ratio = otherSum === 0 ? 1 / others.length : current[key] / otherSum;
    let share = Math.max(MIN_SHARE, stepOf(ratio * remaining));
    const roomForLast = remaining - MIN_SHARE;
    if (share > roomForLast) share = roomForLast;
    result[key] = share;
    used += share;
  });

  const last = others[others.length - 1];
  if (result[last] < MIN_SHARE) {
    const deficit = MIN_SHARE - result[last];
    result[last] = MIN_SHARE;
    result[id] -= deficit;
  }

  const total = Object.values(result).reduce((sum, value) => sum + value, 0);
  if (total !== 100) result[last] += 100 - total;
  return result;
}
