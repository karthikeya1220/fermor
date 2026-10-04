"use client";

import * as React from "react";
import { faqs, principles } from "@/lib/data";

export function Trust() {
  const [open, setOpen] = React.useState<number | null>(0);

  return (
    <section
      id="faq"
      className="section border-t border-line bg-paper scroll-mt-20"
    >
      <div className="shell grid gap-y-12 lg:grid-cols-12 lg:gap-x-14">
        <div className="lg:col-span-5">
          <h2 className="t-h2 max-w-[15ch]">Principles we don’t bend on.</h2>
          <p className="t-body mt-4 max-w-[40ch] text-moss">
            Fermor is free because it is honest about how it is paid — not
            because it is hiding something.
          </p>

          <ul className="mt-8 border-t border-line">
            {principles.map((item) => (
              <li key={item.title} className="border-b border-line py-4">
                <p className="t-body font-medium">{item.title}</p>
                <p className="t-small mt-1 max-w-[52ch] text-moss">
                  {item.body}
                </p>
              </li>
            ))}
          </ul>
        </div>

        <div className="lg:col-span-6 lg:col-start-7">
          <h3 className="t-h3">Questions people actually ask</h3>

          <div className="mt-6 border-t border-line">
            {faqs.map((item, index) => {
              const isOpen = open === index;
              return (
                <div key={item.q} className="border-b border-line">
                  <h4>
                    <button
                      type="button"
                      onClick={() => setOpen(isOpen ? null : index)}
                      aria-expanded={isOpen}
                      className="flex w-full items-center justify-between gap-6 py-4 text-left transition-colors duration-150 hover:text-forest"
                    >
                      <span className="t-body font-medium">{item.q}</span>
                      <span
                        className={`relative h-4 w-4 shrink-0 transition-transform duration-300 ${
                          isOpen ? "rotate-45" : ""
                        }`}
                        aria-hidden="true"
                      >
                        <span className="absolute top-1/2 left-0 h-px w-4 -translate-y-1/2 bg-current" />
                        <span className="absolute top-0 left-1/2 h-4 w-px -translate-x-1/2 bg-current" />
                      </span>
                    </button>
                  </h4>

                  <div
                    className={`grid transition-[grid-template-rows,opacity] duration-400 ease-out ${
                      isOpen
                        ? "grid-rows-[1fr] opacity-100"
                        : "grid-rows-[0fr] opacity-0"
                    }`}
                  >
                    <div className="overflow-hidden">
                      <p className="t-body max-w-[58ch] pb-5 text-moss">
                        {item.a}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          <p className="t-small mt-6 text-moss">
            Still curious?{" "}
            <a
              href="https://fermor.in/about"
              className="border-b border-ink/30 text-ink transition-colors hover:border-ink"
            >
              Read how Fermor works
            </a>{" "}
            or write to{" "}
            <a
              href="mailto:fermor.in.contact@gmail.com"
              className="border-b border-ink/30 text-ink transition-colors hover:border-ink"
            >
              fermor.in.contact@gmail.com
            </a>
            .
          </p>
        </div>
      </div>
    </section>
  );
}
