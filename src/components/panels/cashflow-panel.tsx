"use client";

import * as React from "react";
import { cashflow, cashflowTotal, monthlyIncome } from "@/lib/data";
import { inr, pct } from "@/lib/format";

const sorted = [...cashflow].sort((a, b) => b.amount - a.amount);

export function CashflowPanel() {
  const [active, setActive] = React.useState<string | null>(null);

  const essentials =
    (cashflow
      .filter((row) => row.label === "House rent" || row.label === "Utilities and bills")
      .reduce((sum, row) => sum + row.amount, 0) /
      monthlyIncome) *
    100;
  const investing =
    (cashflow
      .filter((row) => row.kind === "future")
      .reduce((sum, row) => sum + row.amount, 0) /
      monthlyIncome) *
    100;
  const flexible =
    (cashflow
      .filter((row) => row.kind === "flex")
      .reduce((sum, row) => sum + row.amount, 0) /
      monthlyIncome) *
    100;

  return (
    <article className="overflow-hidden rounded-[16px] border border-line bg-paper">
      <header className="px-5 pt-6 pb-5 sm:px-7">
        <h3 className="t-h3">Know where the money actually goes</h3>
        <p className="t-body mt-2.5 max-w-[54ch] text-moss">
          A month of income read as an allocation, not a pile of transactions —
          so the leak is visible before it becomes a habit.
        </p>
      </header>

      <div className="border-t border-line px-5 py-6 sm:px-7">
        <div className="flex flex-wrap items-baseline justify-between gap-2">
          <span className="t-label text-moss">September · illustrative</span>
          <span className="t-num text-[0.9375rem] font-medium">
            {inr(monthlyIncome)} <span className="text-moss">received</span>
          </span>
        </div>

        <div
          className="mt-3 flex h-11 w-full overflow-hidden rounded-[7px] bg-fog"
          onMouseLeave={() => setActive(null)}
        >
          {sorted.map((row) => {
            const isActive = active === row.label;
            const isDimmed = active !== null && !isActive;
            return (
              <div
                key={row.label}
                className="h-full border-r border-paper transition-[opacity,transform] duration-200 last:border-r-0"
                style={{
                  width: `${(row.amount / cashflowTotal) * 100}%`,
                  background: row.tone,
                  opacity: isDimmed ? 0.28 : 1,
                  boxShadow: isActive ? "inset 0 0 0 2px #0f1211" : undefined,
                }}
                onMouseEnter={() => setActive(row.label)}
                aria-hidden="true"
              />
            );
          })}
        </div>

        <ul className="mt-5 border-t border-line">
          {sorted.map((row) => {
            const isActive = active === row.label;
            return (
              <li
                key={row.label}
                onMouseEnter={() => setActive(row.label)}
                onMouseLeave={() => setActive(null)}
                className={`grid grid-cols-[10px_1fr_auto_3.2rem] items-center gap-3 border-b border-line py-2.5 transition-colors duration-150 ${
                  isActive ? "bg-fog" : ""
                }`}
              >
                <span
                  className="h-2.5 w-2.5 rounded-[2px]"
                  style={{ background: row.tone }}
                  aria-hidden="true"
                />
                <span className="t-small truncate">{row.label}</span>
                <span className="t-num text-[0.875rem]">{inr(row.amount)}</span>
                <span className="t-num text-right text-[0.875rem] text-moss">
                  {pct((row.amount / monthlyIncome) * 100, 0)}
                </span>
              </li>
            );
          })}
        </ul>

        <p className="t-small mt-4 max-w-[60ch] text-moss">
          Rent and bills take <span className="text-ink">{pct(essentials, 0)}</span>{" "}
          of what arrives. Investing takes{" "}
          <span className="text-forest">{pct(investing, 0)}</span>. And{" "}
          <span className="text-ink">{inr(cashflow.find((r) => r.kind === "flex")!.amount)}</span>{" "}
          sits in “everything else” — {pct(flexible, 0)} of income, which is
          exactly where Fermor starts asking questions.
        </p>
      </div>
    </article>
  );
}
