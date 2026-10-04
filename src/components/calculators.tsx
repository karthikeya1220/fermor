"use client";

import * as React from "react";
import { calculatorCategories, calculators } from "@/lib/data";

const filters = ["All", ...calculatorCategories] as const;

export function Calculators() {
  const [filter, setFilter] = React.useState<(typeof filters)[number]>("All");
  const shown =
    filter === "All"
      ? calculators
      : calculators.filter((item) => item.category === filter);

  return (
    <section id="calculators" className="section border-t border-line bg-paper">
      <div className="shell">
        <div className="flex flex-wrap items-end justify-between gap-x-10 gap-y-6">
          <div>
            <h2 className="t-h2 max-w-[17ch]">
              Run the number before you sign anything.
            </h2>
            <p className="t-lede mt-4 max-w-[48ch] text-moss">
              Loans, tax, investing, retirement. Every tool opens straight into
              the answer — no account, no email, no paywall.
            </p>
          </div>
          <a
            href="https://fermor.in/calculators"
            className="btn btn-outline"
          >
            Browse all 40+ tools
          </a>
        </div>

        <div className="mt-9 flex flex-wrap items-center justify-between gap-x-6 gap-y-3">
          <div
            role="group"
            aria-label="Filter calculators"
            className="flex flex-wrap gap-2"
          >
            {filters.map((option) => {
              const active = option === filter;
              return (
                <button
                  key={option}
                  type="button"
                  onClick={() => setFilter(option)}
                  aria-pressed={active}
                  className={`t-label rounded-full px-4 py-2 transition-colors duration-150 ${
                    active
                      ? "bg-ink text-paper"
                      : "bg-fog text-moss hover:bg-line hover:text-ink"
                  }`}
                >
                  {option}
                </button>
              );
            })}
          </div>
          <p className="t-small text-moss" aria-live="polite">
            {shown.length} of {calculators.length} shown
          </p>
        </div>

        <ul
          key={filter}
          className="seq-fade mt-5 grid gap-x-10 border-t border-line sm:grid-cols-2 lg:grid-cols-3"
        >
          {shown.map((item) => (
            <li key={item.slug}>
              <a
                href={`https://fermor.in/calculators/${item.slug}`}
                className="group -mx-2 flex items-baseline justify-between gap-4 rounded-md border-b border-line px-2 py-3.5 transition-colors duration-150 hover:bg-fog"
              >
                <span className="min-w-0">
                  <span className="t-body block font-medium">
                    {item.name}
                  </span>
                  <span className="t-small block truncate text-moss">
                    {item.hint}
                  </span>
                </span>
                <svg
                  width="12"
                  height="12"
                  viewBox="0 0 12 12"
                  fill="none"
                  aria-hidden="true"
                  className="shrink-0 translate-x-[-4px] text-moss opacity-0 transition-all duration-200 group-hover:translate-x-0 group-hover:text-ink group-hover:opacity-100 group-focus-visible:translate-x-0 group-focus-visible:opacity-100"
                >
                  <path
                    d="M2.5 9.5L9.5 2.5M9.5 2.5H4M9.5 2.5V8"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
