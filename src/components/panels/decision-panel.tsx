"use client";

import * as React from "react";
import { AnimatedNumber } from "@/components/ui/animated-number";
import { SliderField } from "@/components/ui/slider-field";
import {
  afterPrepayment,
  breakEvenReturn,
  lumpsumGain,
  loanSchedule,
} from "@/lib/finance";
import { inr, pct, tenureLabel } from "@/lib/format";

const LOAN = { principal: 4_000_000, annualPct: 8.6, years: 18 };

export function DecisionPanel() {
  const [spare, setSpare] = React.useState(300_000);
  const [expectPct, setExpectPct] = React.useState(11);

  const schedule = React.useMemo(() => loanSchedule(LOAN), []);
  const prepay = React.useMemo(() => afterPrepayment(LOAN, spare), [spare]);
  const invest = React.useMemo(
    () => lumpsumGain(spare, expectPct, LOAN.years),
    [spare, expectPct],
  );

  const investingAhead = invest.gain - prepay.interestSaved;
  const breakEven = breakEvenReturn(prepay.interestSaved, spare, LOAN.years);

  return (
    <article className="overflow-hidden rounded-[16px] border border-line bg-paper">
      <header className="px-5 pt-6 pb-5 sm:px-7">
        <h3 className="t-h3">Compare before you commit</h3>
        <p className="t-body mt-2.5 max-w-[54ch] text-moss">
          One lump sum, two honest answers — the same arithmetic run both ways,
          with the trade-off stated plainly.
        </p>
        <p className="t-num mt-3.5 text-[0.8125rem] text-moss">
          Home loan {inr(LOAN.principal)} at {LOAN.annualPct}% ·{" "}
          {LOAN.years} years left · EMI {inr(schedule.emi)}
        </p>
      </header>

      <div className="space-y-4 border-t border-line px-5 py-5 sm:px-7">
        <SliderField
          label="Spare money"
          value={spare}
          min={100_000}
          max={1_000_000}
          step={50_000}
          onChange={setSpare}
          format={inr}
          minHint="₹1 L"
          maxHint="₹10 L"
        />
        <SliderField
          label="Return you expect from markets"
          value={expectPct}
          min={5}
          max={15}
          step={0.5}
          onChange={setExpectPct}
          format={(v) => `${v.toFixed(1)}% a year`}
          minHint="5%"
          maxHint="15%"
        />
      </div>

      <div className="grid border-t border-line sm:grid-cols-2">
        <div className="border-b border-line px-5 py-5 sm:border-r sm:border-b-0 sm:px-7">
          <span className="t-label text-moss">Prepay the loan</span>
          <p className="t-num mt-2 text-[clamp(1.6rem,3vw,2.1rem)] leading-none font-medium tracking-[-0.02em]">
            <AnimatedNumber value={prepay.interestSaved} format={inr} />
          </p>
          <p className="t-small mt-2.5 text-moss">
            Interest you never pay. Tenure falls to{" "}
            <span className="text-ink">{tenureLabel(prepay.months)}</span>, same
            EMI — a guaranteed {LOAN.annualPct}%.
          </p>
        </div>

        <div className="px-5 py-5 sm:px-7">
          <span className="t-label text-moss">Invest it instead</span>
          <p className="t-num mt-2 text-[clamp(1.6rem,3vw,2.1rem)] leading-none font-medium tracking-[-0.02em] text-forest">
            <AnimatedNumber value={invest.corpus} format={inr} />
          </p>
          <p className="t-small mt-2.5 text-moss">
            After {LOAN.years} years at an assumed {expectPct.toFixed(1)}% — of
            which <span className="text-ink">{inr(invest.gain)}</span> is growth
            you did not earn for certain.
          </p>
        </div>
      </div>

      <div className="border-t border-line bg-fog px-5 py-4 sm:px-7">
        <p className="t-body">
          {investingAhead >= 0 ? (
            <>
              Investing finishes ahead by{" "}
              <span className="t-num font-medium text-forest">
                {inr(investingAhead)}
              </span>{" "}
              — on these assumptions.
            </>
          ) : (
            <>
              Prepaying finishes ahead by{" "}
              <span className="t-num font-medium">{inr(-investingAhead)}</span>{" "}
              — a certain {LOAN.annualPct}% beats an assumed{" "}
              {expectPct.toFixed(1)}%.
            </>
          )}
        </p>
        <p className="t-small mt-1.5 text-moss">
          The break-even is about{" "}
          <span className="t-num text-ink">{pct(breakEven)}</span> a year:
          below that, prepay. Above it, the market wins — if it actually
          delivers.
        </p>
      </div>
    </article>
  );
}
