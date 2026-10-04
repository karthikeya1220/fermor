"use client";

import * as React from "react";
import { CashflowPanel } from "./panels/cashflow-panel";
import { DecisionPanel } from "./panels/decision-panel";
import { GoalPanel } from "./panels/goal-panel";

const chapters = [
  { id: "understand", word: "Understand" },
  { id: "act", word: "Act" },
  { id: "grow", word: "Grow" },
];

export function Chapters() {
  const [active, setActive] = React.useState(0);
  const refs = React.useRef<Array<HTMLDivElement | null>>([]);

  React.useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          const index = refs.current.indexOf(entry.target as HTMLDivElement);
          if (index >= 0) setActive(index);
        }
      },
      { rootMargin: "-42% 0px -46% 0px", threshold: 0 },
    );

    refs.current.forEach((node) => node && observer.observe(node));
    return () => observer.disconnect();
  }, []);

  return (
    <section id="chapters" className="section scroll-mt-20">
      <h2 className="sr-only">
        Understand, act and grow — how Fermor works
      </h2>

      <div className="shell grid gap-y-8 lg:grid-cols-12 lg:gap-x-14">
        <div className="lg:col-span-4">
          <div className="lg:sticky lg:top-[104px]">
            <p className="t-body max-w-[36ch] text-moss">
              Investments, loans, spending and goals in one place — then the
              arithmetic for every decision sitting on top of them.
            </p>

            <nav aria-label="Chapters" className="mt-7 lg:mt-9">
              <ul className="flex flex-row flex-wrap gap-x-7 gap-y-2 lg:block lg:gap-0">
                {chapters.map((chapter, index) => {
                  const isActive = index === active;
                  return (
                    <li key={chapter.id}>
                      <a
                        href={`#${chapter.id}`}
                        aria-current={isActive ? "true" : undefined}
                        className="group inline-flex items-center gap-3 rounded-md py-1 lg:w-full"
                      >
                        <span
                          className={`hidden h-2.5 w-2.5 rounded-[2px] transition-all duration-300 lg:block ${
                            isActive
                              ? "scale-100 bg-fermor ring-1 ring-ink/70"
                              : "scale-75 bg-transparent ring-1 ring-ink/25"
                          }`}
                          aria-hidden="true"
                        />
                        <span
                          className={`t-h2 transition-colors duration-300 ${
                            isActive ? "text-ink" : "text-ink/45 group-hover:text-ink/75"
                          }`}
                        >
                          {chapter.word}.
                        </span>
                      </a>
                    </li>
                  );
                })}
              </ul>
            </nav>

            <p className="t-small mt-7 hidden max-w-[34ch] text-moss lg:block">
              Three moves, one toolset. Each panel below is live — the numbers
              move when you move them.
            </p>
          </div>
        </div>

        <div className="flex flex-col gap-6 lg:col-span-8">
          {chapters.map((chapter, index) => (
            <div
              key={chapter.id}
              id={chapter.id}
              ref={(node) => {
                refs.current[index] = node;
              }}
              className="scroll-mt-24"
            >
              {index === 0 && <CashflowPanel />}
              {index === 1 && <DecisionPanel />}
              {index === 2 && <GoalPanel />}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
