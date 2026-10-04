const inrFormatter = new Intl.NumberFormat("en-IN", {
  maximumFractionDigits: 0,
});

const inrOneDecimal = new Intl.NumberFormat("en-IN", {
  maximumFractionDigits: 1,
});

/** ₹1,64,60,996 — Indian digit grouping */
export function inr(value: number): string {
  return `₹${inrFormatter.format(Math.round(value))}`;
}

/** ₹16.5 L / ₹1.6 Cr — for prose and axis labels */
export function inrCompact(value: number): string {
  const abs = Math.abs(value);
  if (abs >= 1e7) return `₹${trimNumber(value / 1e7)} Cr`;
  if (abs >= 1e5) return `₹${trimNumber(value / 1e5)} L`;
  return inr(value);
}

/** ₹16.5L / ₹1.6Cr — tight variant for chart axes */
export function inrAxis(value: number): string {
  const abs = Math.abs(value);
  if (abs >= 1e7) return `₹${trimNumber(value / 1e7)}Cr`;
  if (abs >= 1e5) return `₹${trimNumber(value / 1e5)}L`;
  if (abs >= 1e3) return `₹${trimNumber(value / 1e3)}k`;
  return `₹${Math.round(value)}`;
}

function trimNumber(v: number): string {
  const digits = Math.abs(v) >= 10 ? 0 : 1;
  return inrOneDecimal.format(Number(v.toFixed(digits)));
}

export function pct(value: number, digits = 1): string {
  return `${value.toFixed(digits)}%`;
}

export function signedPct(value: number, digits = 1): string {
  const sign = value > 0 ? "+" : value < 0 ? "−" : "";
  return `${sign}${Math.abs(value).toFixed(digits)}%`;
}

/** 18 y 2 m — for loan tenures */
export function tenureLabel(months: number): string {
  const y = Math.floor(months / 12);
  const m = Math.round(months % 12);
  if (y === 0) return `${m} mo`;
  if (m === 0) return `${y} y`;
  return `${y} y ${m} mo`;
}
