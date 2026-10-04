"use client";

import * as React from "react";
import {
  afterPrepayment,
  emi,
  sipCorpus,
  sipForTarget,
} from "@/lib/finance";
import { inr, pct, tenureLabel } from "@/lib/format";

const HOME = { principal: 4_500_000, annualPct: 8.5, years: 20 };
const INCOME = 120_000;
const GOAL = 5_000_000;
const LOAN = { principal: 4_000_000, annualPct: 8.6, years: 18 };

type Answer = {
  question: string;
  answer: React.ReactNode;
  working: string[];
  sources: string[];
};

function buildAnswers(): Answer[] {
  const homeEmi = emi(HOME.principal, HOME.annualPct, HOME.years);
  const share = (homeEmi / INCOME) * 100;

  const needed = sipForTarget(GOAL, 11, 10);
  const at25 = sipCorpus({ monthly: 25_000, annualPct: 11, years: 10 });
  const at9 = sipCorpus({ monthly: 25_000, annualPct: 11, years: 9 });
  const monthsToGoal = Math.round(
    9 * 12 + ((GOAL - at9) / (at25 - at9)) * 12,
  );

  const prepay = afterPrepayment(LOAN, 300_000);

  return [
    {
      question: "How much home can I afford?",
      answer: (
        <>
          On {inr(INCOME)} a month, an EMI of{" "}
          <strong className="font-medium text-fermor">{inr(homeEmi)}</strong>{" "}
          keeps you at {pct(share, 0)} of income — inside the 40% band most
          lenders use. That is a {inr(HOME.principal)} loan at{" "}
          {HOME.annualPct}% over {HOME.years} years, assuming no other EMIs
          running.
        </>
      ),
      working: [
        `EMI = P × r × (1 + r)ⁿ ÷ ((1 + r)ⁿ − 1)`,
        `P = ${inr(HOME.principal)} · r = ${HOME.annualPct}% ÷ 12 · n = ${HOME.years * 12} months`,
        `EMI = ${inr(homeEmi)} → ${pct(share, 1)} of ${inr(INCOME)}`,
        `Lender comfort zone: under 40% of monthly income`,
      ],
      sources: ["Your income", "Current rate cards"],
    },
    {
      question: "Will ₹25,000 a month be enough?",
      answer: (
        <>
          It reaches{" "}
          <strong className="font-medium text-fermor">{inr(at25)}</strong> in
          ten years at an assumed 11% — you clear the {inr(GOAL)} goal about{" "}
          {tenureLabel(monthsToGoal)} in. If you would rather not wait, the
          exact amount for ten years is{" "}
          <strong className="font-medium text-fermor">{inr(needed)}</strong> a
          month.
        </>
      ),
      working: [
        `FV = P × [ (1 + r)ⁿ − 1 ] ÷ r × (1 + r)`,
        `P = ₹25,000 · r = 11% ÷ 12 · n = 120 months`,
        `Corpus = ${inr(at25)} against a goal of ${inr(GOAL)}`,
        `Exact monthly for the goal in 10 years = ${inr(needed)}`,
      ],
      sources: ["Your SIPs", "Goal: flat down payment"],
    },
    {
      question: "Is prepaying the home loan worth it?",
      answer: (
        <>
          Paying in {inr(300_000)} now shortens the loan from{" "}
          {tenureLabel(LOAN.years * 12)} to{" "}
          <strong className="font-medium text-fermor">
            {tenureLabel(prepay.months)}
          </strong>{" "}
          and skips{" "}
          <strong className="font-medium text-fermor">
            {inr(prepay.interestSaved)}
          </strong>{" "}
          of interest — a guaranteed 8.6%, which no fund can promise.
        </>
      ),
      working: [
        `Loan ${inr(LOAN.principal)} at ${LOAN.annualPct}% · ${LOAN.years} years · EMI ${inr(emi(LOAN.principal, LOAN.annualPct, LOAN.years))}`,
        `Prepay ${inr(300_000)}, keep the EMI → tenure ${tenureLabel(prepay.months)}`,
        `Interest saved = ${inr(prepay.interestSaved)} · time saved ${tenureLabel(prepay.monthsSaved)}`,
        `Rate certainty: 8.6% guaranteed vs market returns, which are not`,
      ],
      sources: ["Your loan schedule", "Fermor EMI engine"],
    },
  ];
}

export function Ask() {
  const answers = React.useMemo(() => buildAnswers(), []);
  const [active, setActive] = React.useState(0);
  const [open, setOpen] = React.useState(false);
  const current = answers[active];

  return (
    <section id="ask" className="bg-graphite text-paper">
      <div className="shell section grid gap-10 lg:grid-cols-12 lg:gap-14">
        <div className="lg:col-span-4">
          <h2 className="t-h2">Ask it the way you would ask a friend.</h2>
          <p className="t-body mt-5 max-w-[36ch] text-slate">
            Fermor answers in plain language, grounded in your own numbers —
            then shows the arithmetic so you can check the answer instead of
            trusting it.
          </p>
          <p className="t-small mt-5 max-w-[34ch] text-slate/70">
            Sample conversation, illustrative figures. Fermor is educational —
            not a SEBI-registered adviser.
          </p>
        </div>

        <div className="lg:col-span-8">
          <div className="mb-4 flex flex-wrap gap-2">
            {answers.map((item, index) => {
              const isActive = index === active;
              return (
                <button
                  key={item.question}
                  type="button"
                  onClick={() => {
                    setActive(index);
                    setOpen(false);
                  }}
                  aria-pressed={isActive}
                  className={`t-label rounded-full px-3.5 py-2 transition-colors duration-150 ${
                    isActive
                      ? "bg-fermor text-ink"
                      : "bg-graphite-2 text-slate hover:text-paper"
                  }`}
                >
                  {item.question}
                </button>
              );
            })}
          </div>

          <div
            key={active}
            className="seq-fade overflow-hidden rounded-[16px] border border-white/10 bg-graphite-2"
          >
            <div className="border-b border-white/10 px-5 py-5 sm:px-7">
              <p className="t-label text-slate">You asked</p>
              <p className="t-h3 mt-1.5 text-paper">{current.question}</p>
            </div>

            <div className="px-5 py-5 sm:px-7">
              <p className="t-label text-fermor">Fermor</p>
              <p className="t-body mt-2 max-w-[62ch] text-paper/90">
                {current.answer}
              </p>

              <div className="mt-5 flex flex-wrap items-center gap-2">
                <button
                  type="button"
                  onClick={() => setOpen((value) => !value)}
                  aria-expanded={open}
                  className="t-label inline-flex items-center gap-2 rounded-full border border-white/20 px-3.5 py-2 text-paper transition-colors hover:border-fermor hover:text-fermor"
                >
                  <svg
                    width="10"
                    height="10"
                    viewBox="0 0 10 10"
                    fill="none"
                    aria-hidden="true"
                    className={`transition-transform duration-300 ${open ? "rotate-45" : ""}`}
                  >
                    <path d="M5 0V10M0 5H10" stroke="currentColor" strokeWidth="1.5" />
                  </svg>
                  {open ? "Hide the working" : "Show the working"}
                </button>

                {current.sources.map((source) => (
                  <span
                    key={source}
                    className="t-label rounded-full bg-white/[0.07] px-3 py-2 text-slate"
                  >
                    Grounded in {source}
                  </span>
                ))}
              </div>

              <div
                className={`grid transition-[grid-template-rows,opacity] duration-400 ease-out ${
                  open ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
                }`}
              >
                <div className="overflow-hidden">
                  <ul className="mt-4 space-y-2 border-t border-white/10 pt-4">
                    {current.working.map((line, index) => (
                      <li
                        key={line}
                        className="t-num flex gap-3 text-[0.8125rem] leading-relaxed text-slate"
                      >
                        <span className="text-fermor/60" aria-hidden="true">
                          {index === 0 ? "=" : "›"}
                        </span>
                        <span>{line}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
