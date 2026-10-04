"use client";

import * as React from "react";
import { Wordmark } from "@/components/ui/mark";

const navLinks = [
  { label: "How it works", href: "#chapters" },
  { label: "Calculators", href: "#calculators" },
  { label: "Analysis", href: "#analysis" },
  { label: "Questions", href: "#faq" },
];

export function Header() {
  const [scrolled, setScrolled] = React.useState(false);
  const [menuOpen, setMenuOpen] = React.useState(false);

  React.useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  React.useEffect(() => {
    if (!menuOpen) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setMenuOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = previous;
      window.removeEventListener("keydown", onKey);
    };
  }, [menuOpen]);

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-[background-color,border-color,box-shadow] duration-300 ${
          scrolled
            ? "border-b border-line bg-porcelain/88 backdrop-blur-md"
            : "border-b border-transparent bg-transparent"
        }`}
      >
        <div className="shell flex h-[68px] items-center justify-between gap-6">
          <a
            href="#top"
            className="rounded-md transition-opacity hover:opacity-70"
            aria-label="Fermor — home"
          >
            <Wordmark />
          </a>

          <nav
            className="hidden items-center gap-7 md:flex"
            aria-label="Primary"
          >
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="t-label rounded py-1 text-moss transition-colors hover:text-ink"
              >
                {link.label}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <a
              href="https://fermor.in/sign-in"
              className="t-label hidden rounded px-1 text-moss transition-colors hover:text-ink sm:block"
            >
              Log in
            </a>
            <a
              href="https://fermor.in/signup"
              className="btn btn-green hidden !h-10 !px-[1.1rem] sm:inline-flex"
            >
              Get started
            </a>
            <button
              type="button"
              className="flex h-10 w-10 items-center justify-center rounded-full transition-colors hover:bg-ink/6 md:hidden"
              aria-expanded={menuOpen}
              aria-controls="mobile-menu"
              onClick={() => setMenuOpen((open) => !open)}
            >
              <span className="sr-only">
                {menuOpen ? "Close menu" : "Open menu"}
              </span>
              <svg
                width="20"
                height="14"
                viewBox="0 0 20 14"
                fill="none"
                aria-hidden="true"
              >
                {menuOpen ? (
                  <>
                    <path d="M2 2L18 12" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
                    <path d="M18 2L2 12" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
                  </>
                ) : (
                  <>
                    <path d="M0 1.5H20" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
                    <path d="M0 12.5H14" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
                  </>
                )}
              </svg>
            </button>
          </div>
        </div>
      </header>

      {menuOpen && (
        <div
          id="mobile-menu"
          className="fixed inset-0 z-40 flex flex-col bg-porcelain px-5 pt-[84px] pb-8 md:hidden"
        >
          <nav className="flex flex-col gap-1" aria-label="Mobile">
            {navLinks.map((link, index) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setMenuOpen(false)}
                className="seq-item border-b border-line py-4 text-[1.75rem] font-semibold tracking-[-0.025em] [-webkit-tap-highlight-color:transparent]"
                style={{ animationDelay: `${60 + index * 55}ms` }}
              >
                {link.label}
              </a>
            ))}
          </nav>
          <div className="mt-auto flex flex-col gap-3">
            <a
              href="https://fermor.in/signup"
              className="btn btn-green w-full"
              onClick={() => setMenuOpen(false)}
            >
              Get started
            </a>
            <a
              href="https://fermor.in/sign-in"
              className="btn btn-outline w-full"
              onClick={() => setMenuOpen(false)}
            >
              Log in
            </a>
            <p className="t-small text-center text-moss">
              Free tools. No login wall.
            </p>
          </div>
        </div>
      )}
    </>
  );
}
