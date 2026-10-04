"use client";

import * as React from "react";
import { AnimatedNumber } from "@/components/ui/animated-number";
import { ProjectionChart } from "@/components/ui/projection-chart";
import { SliderField } from "@/components/ui/slider-field";
import { corpusSeries, investedAmount, sipCorpus, sipForTarget } from "@/lib/finance";
import { inr, inrAxis } from "@/lib/format";

const GOAL = 5_000_000; // ₹50,00,000
const RETURN = 11;
const HORIZONS = [5, 10, 15, 20];

export function GoalPanel() {
  const [years, setYears] = React.useState(10);
  const [monthly, setMonthly] = React.useState(25_000);

  const plan = { monthly, annualPct: RETURN, years };
  const corpus = sipCorpus(plan);
  const invested = investedAmount(plan);
  const needed = sipForTarget(GOAL, RETURN, years);
  const onTrack = corpus >= GOAL;
  const points = React.useMemo(
    () => corpusSeries(plan, 72),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [monthly, years],
  );

  return (
    <article className="overflow-hidden rounded-[16px] border border-line bg-paper">
      <header className="px-5 pt-6 pb-5 sm:px-7">
        <div className="flex flex-wrap items-start justify-between gap-x-6 gap-y-2">
          <div>
            <h3 className="t-h3">Keep the plan honest about the future</h3>
            <p className="t-body mt-2.5 max-w-[54ch] text-moss">
              A goal with a price and a date, checked against what you are
              actually putting away each month.
            </p>
          </div>
          <span className="t-label shrink-0 rounded-full border border-line px-3 py-1.5 text-moss">
            Goal · flat down payment
          </span>
        </div>
      </header>

      <div className="border-t border-line px-5 pt-5 sm:px-7">
        <div className="flex flex-wrap items-end justify-between gap-x-6 gap-y-3">
          <div>
            <span className="t-label text-moss">
              On track for {inr(GOAL)} by {years}y
            </span>
            <p className="t-num mt-1.5 text-[clamp(1.7rem,3.2vw,2.3rem)] leading-none font-medium tracking-[-0.02em]">
              <AnimatedNumber value={corpus} format={inr} />
            </p>
          </div>
          <span
            className={`t-label rounded-full px-3 py-1.5 ${
              onTrack ? "bg-fermor text-ink" : "bg-signal text-white"
            }`}
          >
            {onTrack
              ? `Clears it by ${inr(corpus - GOAL)}`
              : `Short by ${inr(GOAL - corpus)}`}
          </span>
        </div>

        <div className="mt-4">
          <ProjectionChart
            points={points}
            height={210}
            target={GOAL}
            targetLabel="₹50L goal"
            axisFormat={inrAxis}
            readoutFormat={inr}
            ariaSummary={`At ${inr(monthly)} a month for ${years} years at an assumed ${RETURN} percent, you reach ${inr(corpus)} against a goal of ${inr(GOAL)}.`}
          />
        </div>
      </div>

      <div className="space-y-4 border-t border-line px-5 py-5 sm:px-7">
        <div>
          <span className="t-label text-moss">Horizon</span>
          <div className="mt-2 flex flex-wrap gap-2">
            {HORIZONS.map((value) => {
              const active = value === years;
              return (
                <button
                  key={value}
                  type="button"
                  onClick={() => setYears(value)}
                  aria-pressed={active}
                  className={`t-num rounded-full px-3.5 py-2 text-[0.8125rem] font-medium transition-colors duration-150 ${
                    active
                      ? "bg-ink text-paper"
                      : "bg-fog text-moss hover:bg-line hover:text-ink"
                  }`}
                >
                  {value} years
                </button>
              );
            })}
          </div>
        </div>

        <SliderField
          label="Monthly investment"
          value={monthly}
          min={5_000}
          max={60_000}
          step={1_000}
          onChange={setMonthly}
          format={inr}
          minHint="₹5,000"
          maxHint="₹60,000"
        />
      </div>

      <div className="border-t border-line bg-fog px-5 py-4 sm:px-7">
        <p className="t-body">
          {onTrack ? (
            <>
              This clears the goal with{" "}
              <span className="t-num font-medium text-forest">
                {inr(corpus - GOAL)}
              </span>{" "}
              to spare — keep the SIP standing.
            </>
          ) : (
            <>
              To land {inr(GOAL)} in {years} years at {RETURN}%, you would need{" "}
              <span className="t-num font-medium">{inr(needed)}</span> a month
              instead of {inr(monthly)}.
            </>
          )}
        </p>
        <p className="t-small mt-1.5 text-moss">
          Assumes {RETURN}% a year throughout, {inr(invested)} of your own money
          contributed. Indicative — not a promise.
        </p>
      </div>
    </article>
  );
}
