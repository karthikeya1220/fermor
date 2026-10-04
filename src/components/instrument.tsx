"use client";

import * as React from "react";
import { AnimatedNumber } from "@/components/ui/animated-number";
import { ProjectionChart } from "@/components/ui/projection-chart";
import { SliderField } from "@/components/ui/slider-field";
import {
  corpusSeries,
  investedAmount,
  sipCorpus,
  type MonthlyPlan,
} from "@/lib/finance";
import { inr, inrAxis } from "@/lib/format";

const RETURN_OPTIONS = [
  { pct: 8, label: "Cautious" },
  { pct: 11, label: "Balanced" },
  { pct: 14, label: "Ambitious" },
];

export function Instrument() {
  const [monthly, setMonthly] = React.useState(15_000);
  const [years, setYears] = React.useState(15);
  const [annualPct, setAnnualPct] = React.useState(11);

  const plan: MonthlyPlan = { monthly, annualPct, years };
  const corpus = sipCorpus(plan);
  const invested = investedAmount(plan);
  const growth = corpus - invested;
  const points = React.useMemo(
    () => corpusSeries(plan, 72),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [monthly, years, annualPct],
  );

  const rate = annualPct / 100 / 12;
  const months = years * 12;

  return (
    <div className="rounded-[16px] border border-line bg-paper shadow-[0_1px_2px_rgba(15,18,17,0.05),0_24px_48px_-32px_rgba(15,18,17,0.35)]">
      {/* Header */}
      <div className="flex items-center justify-between gap-3 border-b border-line px-5 py-3.5 sm:px-6">
        <span className="t-label text-ink">SIP projection</span>
        <span className="t-label rounded-full border border-line px-2.5 py-1 text-moss">
          Illustrative
        </span>
      </div>

      {/* Readout */}
      <div className="px-5 pt-5 pb-1 sm:px-6">
        <p className="t-label text-moss">
          In {years} {years === 1 ? "year" : "years"}, at {annualPct}% a year
        </p>
        <div className="mt-1.5 flex flex-wrap items-end gap-x-3 gap-y-1">
          <AnimatedNumber
            value={corpus}
            format={inr}
            className="t-num text-[clamp(2rem,4.6vw,2.9rem)] leading-none font-medium tracking-[-0.03em] text-ink"
          />
        </div>
        <p className="t-small mt-2.5 text-moss">
          You invest{" "}
          <span className="t-num font-medium text-ink">{inr(invested)}</span>
          <span className="mx-1.5 text-line-strong">·</span>
          Growth{" "}
          <span className="t-num font-medium text-forest">{inr(growth)}</span>
        </p>
      </div>

      {/* Chart */}
      <div className="mt-3 px-2 sm:px-3">
        <ProjectionChart
          points={points}
          height={230}
          drawOnMount
          axisFormat={inrAxis}
          readoutFormat={inr}
          ariaSummary={`Projection: ${inr(corpus)} after ${years} years of investing ${inr(monthly)} a month at an assumed ${annualPct} percent a year, of which ${inr(invested)} is your money.`}
        />
      </div>

      <div className="flex flex-wrap items-center gap-x-5 gap-y-1 px-5 pt-1 pb-4 sm:px-6">
        <LegendSwatch tone="corpus">Corpus</LegendSwatch>
        <LegendSwatch tone="invested">You invest</LegendSwatch>
      </div>

      {/* Controls */}
      <div className="space-y-4 border-t border-line px-5 py-5 sm:px-6">
        <SliderField
          label="Monthly investment"
          value={monthly}
          min={500}
          max={100_000}
          step={500}
          onChange={setMonthly}
          format={inr}
          minHint="₹500"
          maxHint="₹1,00,000"
        />
        <SliderField
          label="Horizon"
          value={years}
          min={1}
          max={30}
          step={1}
          onChange={setYears}
          format={(v) => `${v} ${v === 1 ? "year" : "years"}`}
          minHint="1 yr"
          maxHint="30 yrs"
        />

        <div>
          <span className="t-label text-moss">Return assumption</span>
          <div className="mt-2 flex flex-wrap gap-2">
            {RETURN_OPTIONS.map((option) => {
              const active = option.pct === annualPct;
              return (
                <button
                  key={option.pct}
                  type="button"
                  onClick={() => setAnnualPct(option.pct)}
                  aria-pressed={active}
                  className={`t-label flex items-baseline gap-1.5 rounded-full px-3.5 py-2 transition-colors duration-150 ${
                    active
                      ? "bg-ink text-paper"
                      : "bg-fog text-moss hover:bg-line hover:text-ink"
                  }`}
                >
                  <span className="t-num">{option.pct}%</span>
                  <span>{option.label}</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* The working */}
      <div className="rounded-b-[15px] bg-graphite px-5 py-4 sm:px-6">
        <div className="flex flex-wrap items-center justify-between gap-x-6 gap-y-2">
          <code className="t-num text-[0.8125rem] leading-relaxed text-fermor">
            FV = P × [ (1 + r)<sup>n</sup> − 1 ] ÷ r × (1 + r)
          </code>
          <p className="t-num text-[0.75rem] text-slate">
            {`r = ${annualPct}% ÷ 12 = ${rate.toFixed(5)} · n = ${years} × 12 = ${months}`}
          </p>
        </div>
        <p className="t-small mt-2.5 text-slate">
          Indicative only — an assumption, not a promise. Not investment advice.
          The arithmetic runs in your browser.
        </p>
      </div>
    </div>
  );
}

function LegendSwatch({
  children,
  tone,
}: {
  children: React.ReactNode;
  tone: "corpus" | "invested";
}) {
  return (
    <span className="t-label flex items-center gap-2 text-moss">
      <span
        className={`inline-block h-0 w-5 border-t-2 ${
          tone === "corpus" ? "border-forest" : "border-dashed border-ink/45"
        }`}
        aria-hidden="true"
      />
      {children}
    </span>
  );
}
