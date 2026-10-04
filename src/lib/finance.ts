/**
 * Every figure on this page is produced by these functions from the visitor's
 * own inputs — the same arithmetic Fermor runs in the browser.
 */

export type MonthlyPlan = {
  monthly: number;
  annualPct: number;
  years: number;
};

export function monthlyRate(annualPct: number): number {
  return annualPct / 100 / 12;
}

/** Future value of a monthly SIP, contributions at the start of each month. */
export function sipCorpus({ monthly, annualPct, years }: MonthlyPlan): number {
  const r = monthlyRate(annualPct);
  const n = Math.round(years * 12);
  if (r === 0) return monthly * n;
  return monthly * ((Math.pow(1 + r, n) - 1) / r) * (1 + r);
}

export function investedAmount({ monthly, years }: MonthlyPlan): number {
  return monthly * Math.round(years * 12);
}

/** Monthly amount needed to reach a target corpus. */
export function sipForTarget(
  target: number,
  annualPct: number,
  years: number,
): number {
  const r = monthlyRate(annualPct);
  const n = Math.round(years * 12);
  if (r === 0) return target / n;
  return target / (((Math.pow(1 + r, n) - 1) / r) * (1 + r));
}

export type CorpusPoint = {
  year: number;
  corpus: number;
  invested: number;
};

/** Year-by-year series for projection charts. */
export function corpusSeries(plan: MonthlyPlan, samples = 60): CorpusPoint[] {
  const years = Math.max(plan.years, 1);
  const points: CorpusPoint[] = [];
  for (let i = 0; i <= samples; i += 1) {
    const year = (i / samples) * years;
    points.push({
      year,
      corpus: sipCorpus({ ...plan, years: year }),
      invested: investedAmount({ ...plan, years: year }),
    });
  }
  return points;
}

/** Equal monthly instalment on a reducing-balance loan. */
export function emi(principal: number, annualPct: number, years: number): number {
  const r = monthlyRate(annualPct);
  const n = Math.round(years * 12);
  if (r === 0) return principal / n;
  return (principal * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
}

export type LoanTerms = {
  principal: number;
  annualPct: number;
  years: number;
};

export type Schedule = {
  emi: number;
  months: number;
  totalInterest: number;
  totalOutflow: number;
};

export function loanSchedule(terms: LoanTerms): Schedule {
  const n = Math.round(terms.years * 12);
  const monthly = emi(terms.principal, terms.annualPct, terms.years);
  const totalOutflow = monthly * n;
  return {
    emi: monthly,
    months: n,
    totalInterest: totalOutflow - terms.principal,
    totalOutflow,
  };
}

/**
 * What happens if you prepay a lump sum and keep the EMI the same:
 * the tenure shortens and total interest falls.
 */
export function afterPrepayment(
  terms: LoanTerms,
  prepay: number,
): Schedule & { monthsSaved: number; interestSaved: number } {
  const base = loanSchedule(terms);
  const r = monthlyRate(terms.annualPct);
  const reducedPrincipal = Math.max(terms.principal - prepay, 0);
  const affordable = 1 - (r * reducedPrincipal) / base.emi;
  const months =
    r === 0 || affordable <= 0
      ? 0
      : -Math.log(affordable) / Math.log(1 + r);
  const safeMonths = Number.isFinite(months) && months > 0 ? months : 0;
  const totalOutflow = prepay + base.emi * safeMonths;
  return {
    ...base,
    emi: base.emi,
    months: safeMonths,
    totalOutflow,
    totalInterest: Math.max(totalOutflow - terms.principal, 0),
    monthsSaved: Math.max(base.months - safeMonths, 0),
    interestSaved: Math.max(base.totalOutflow - totalOutflow, 0),
  };
}

/** Compound growth of a lump sum held for `years`. */
export function lumpsumGain(
  principal: number,
  annualPct: number,
  years: number,
): { corpus: number; gain: number } {
  const corpus = principal * Math.pow(1 + annualPct / 100, years);
  return { corpus, gain: corpus - principal };
}

/** The market return that would exactly match the interest a prepayment saves. */
export function breakEvenReturn(
  interestSaved: number,
  principal: number,
  years: number,
): number {
  const ratio = 1 + interestSaved / principal;
  return (Math.pow(ratio, 1 / Math.max(years, 1)) - 1) * 100;
}
