/** Content drawn from Fermor's live site — calculators, analysis, principles. */

export type CalculatorCategory = "Investing" | "Loans" | "Tax & salary";

export type Calculator = {
  name: string;
  hint: string;
  slug: string;
  category: CalculatorCategory;
};

export const calculatorCategories = [
  "Investing",
  "Loans",
  "Tax & salary",
] as const;

export const calculators: Calculator[] = [
  { name: "SIP calculator", hint: "What a monthly investment grows to", slug: "sip-calculator", category: "Investing" },
  { name: "Lumpsum calculator", hint: "One-time investment, compounded", slug: "lumpsum-calculator", category: "Investing" },
  { name: "Compound interest", hint: "How growth builds on growth", slug: "compound-interest-calculator", category: "Investing" },
  { name: "FD calculator", hint: "Maturity value across tenures", slug: "fd-calculator", category: "Investing" },
  { name: "PPF calculator", hint: "Fifteen years of sovereign saving", slug: "ppf-calculator", category: "Investing" },
  { name: "NPS calculator", hint: "Corpus at 60, and the annuity split", slug: "nps-calculator", category: "Investing" },
  { name: "SWP calculator", hint: "Monthly withdrawals that last", slug: "swp-calculator", category: "Investing" },
  { name: "XIRR calculator", hint: "Real return on uneven cash flows", slug: "xirr-calculator", category: "Investing" },
  { name: "CAGR calculator", hint: "Annualised return between two dates", slug: "cagr-calculator", category: "Investing" },
  { name: "Goal planning", hint: "What your target needs every month", slug: "goal-planning-calculator", category: "Investing" },
  { name: "Future value", hint: "What today's money becomes", slug: "future-value-calculator", category: "Investing" },
  { name: "Present value", hint: "What a future sum is worth now", slug: "present-value-calculator", category: "Investing" },

  { name: "EMI calculator", hint: "Instalment, interest, amortisation", slug: "emi-calculator", category: "Loans" },
  { name: "Home loan", hint: "Schedule for a typical 20-year loan", slug: "home-loan-calculator", category: "Loans" },
  { name: "Car loan", hint: "Tenure against interest on a vehicle", slug: "car-loan-calculator", category: "Loans" },
  { name: "Mortgage", hint: "Loan against property, repaid", slug: "mortgage-calculator", category: "Loans" },
  { name: "Loan calculator", hint: "Any principal, rate and tenure", slug: "loan-calculator", category: "Loans" },

  { name: "Income tax", hint: "Slab by slab, both regimes", slug: "income-tax-calculator", category: "Tax & salary" },
  { name: "Old vs new regime", hint: "The same salary, run both ways", slug: "old-vs-new-tax-regime-calculator", category: "Tax & salary" },
  { name: "HRA calculator", hint: "Rent exemption, with the proof rules", slug: "hra-calculator", category: "Tax & salary" },
  { name: "In-hand salary", hint: "CTC to what actually reaches you", slug: "in-hand-salary-calculator", category: "Tax & salary" },
  { name: "GST calculator", hint: "Add or remove GST at any rate", slug: "gst-calculator", category: "Tax & salary" },
  { name: "Gratuity calculator", hint: "What tenure owes you on exit", slug: "gratuity-calculator", category: "Tax & salary" },
];

export type AnalysisItem = {
  category: string;
  date: string;
  readTime: string;
  title: string;
  dek: string;
  href: string;
};

export const analysis: AnalysisItem[] = [
  {
    category: "Markets",
    date: "Sep 29, 2026",
    readTime: "13 min",
    title:
      "Sensex Nifty Crash September 2026: 7 Straight Weekly Losses, Why Market Is Down",
    dek: "Seven straight weekly losses, heavy FII selling and RBI rate odds — what actually moved, and what it means for a SIP you started last year.",
    href: "https://fermor.in/blogs/sensex-nifty-crash-september-2026",
  },
  {
    category: "Regulation",
    date: "Sep 25, 2026",
    readTime: "12 min",
    title: "Bank Strike September 28–30, 2026: 5 Days Banks Closed, What Works",
    dek: "What keeps running for five days — UPI, ATMs, net banking — and what stops: cheque clearance, cash deposit, loan disbursal.",
    href: "https://fermor.in/blogs/bank-strike-september-2026",
  },
  {
    category: "Government schemes",
    date: "Sep 28, 2026",
    readTime: "13 min",
    title: "PM-KISAN: Eligibility, eKYC, Status",
    dek: "The full eligibility list, the three eKYC routes, instalment dates, and how to find out why a payment did not arrive.",
    href: "https://fermor.in/blogs/pm-kisan-samman-nidhi-scheme",
  },
  {
    category: "Regulation",
    date: "Sep 22, 2026",
    readTime: "13 min",
    title: "UPI Charges Above ₹2,000: New MDR Rule Explained",
    dek: "A 0.4% MDR on select UPI payments above ₹2,000 from October 15 — who absorbs it, and why you still will not see a charge.",
    href: "https://fermor.in/blogs/upi-charges-above-2000",
  },
  {
    category: "Income tax",
    date: "Jul 30, 2026",
    readTime: "11 min",
    title: "Income Tax Rebate Under Section 87A: Limits and Marginal Relief",
    dek: "Up to ₹60,000 back on taxable income up to ₹12 lakh, with the marginal-relief arithmetic worked through on a real salary.",
    href: "https://fermor.in/blogs/section-87a-rebate",
  },
];

export const principles = [
  {
    title: "Show the full math, not just the answer",
    body: "Every result opens onto the formula, the inputs and the assumptions underneath it. A number you cannot check is a number you cannot trust.",
  },
  {
    title: "No login wall on any calculator",
    body: "Tools work the second you open them. An account exists only if you want a result kept between visits.",
  },
  {
    title: "Your inputs stay on your device",
    body: "Calculations run in your browser. The figures you type are never sent to our servers just to produce a result.",
  },
  {
    title: "Ads are labelled, never dressed as advice",
    body: "Advertising and affiliate links are marked as such — never presented as a neutral recommendation.",
  },
  {
    title: "Built phone-first, for India",
    body: "Lakh and crore, Indian tax slabs, reducing-balance EMIs — designed around how the country actually counts money.",
  },
];

export const faqs = [
  {
    q: "What does Fermor actually do?",
    a: "It runs the math behind everyday money decisions — loans, savings, tax, investing — then explains what the numbers mean, so you can compare options before you commit to one.",
  },
  {
    q: "Is this financial advice?",
    a: "No. Fermor is educational and is not a SEBI-registered adviser. The tools show the arithmetic and the trade-offs; the decision, and any advice you want on it, stays with you and your adviser.",
  },
  {
    q: "What happens to the numbers I enter?",
    a: "They stay in your browser. Nothing is transmitted to produce a result, and any saved calculation can be cleared whenever you like.",
  },
  {
    q: "Is it really free?",
    a: "Every tool, yes. Fermor is supported by clearly labelled advertising and affiliate partnerships — which is what keeps a paywall off the site.",
  },
  {
    q: "Do I need an account?",
    a: "Only if you want results kept between visits. Pick the calculator closest to the decision in front of you and run it once with real numbers.",
  },
];

/** Illustrative household month — used by the Understand panel. */
export type FlowRow = {
  label: string;
  amount: number;
  tone: string;
  kind: "need" | "future" | "flex";
};

export const monthlyIncome = 120_000;

export const cashflow: FlowRow[] = [
  { label: "House rent", amount: 28_000, tone: "#1c2420", kind: "need" },
  { label: "SIPs and investments", amount: 25_000, tone: "#076b39", kind: "future" },
  { label: "Food and dining", amount: 18_400, tone: "#3a423e", kind: "need" },
  { label: "Everything else", amount: 20_700, tone: "#c4c8be", kind: "flex" },
  { label: "Insurance premiums", amount: 12_000, tone: "#57605b", kind: "need" },
  { label: "Transport", amount: 9_600, tone: "#7b837d", kind: "need" },
  { label: "Utilities and bills", amount: 6_300, tone: "#9aa19b", kind: "need" },
];

/** Sorted largest-first for the stacked bar; rows are listed in this order. */
export const cashflowTotal = cashflow.reduce((sum, r) => sum + r.amount, 0);
