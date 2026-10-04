import { Mark } from "@/components/ui/mark";

const columns = [
  {
    heading: "Product",
    links: [
      { label: "Calculators", href: "https://fermor.in/calculators" },
      { label: "Mutual funds", href: "https://fermor.in/mutual-funds" },
      { label: "Analysis", href: "https://fermor.in/news" },
      { label: "Blogs", href: "https://fermor.in/blogs" },
    ],
  },
  {
    heading: "Popular tools",
    links: [
      { label: "SIP calculator", href: "https://fermor.in/calculators/sip-calculator" },
      { label: "EMI calculator", href: "https://fermor.in/calculators/emi-calculator" },
      { label: "Income tax", href: "https://fermor.in/calculators/income-tax-calculator" },
      { label: "Home loan", href: "https://fermor.in/calculators/home-loan-calculator" },
    ],
  },
  {
    heading: "Company",
    links: [
      { label: "About", href: "https://fermor.in/about" },
      { label: "Contact", href: "https://fermor.in/contact" },
      { label: "Privacy policy", href: "https://fermor.in/privacy" },
      { label: "Terms of use", href: "https://fermor.in/terms" },
    ],
  },
];

export function Footer() {
  return (
    <footer className="bg-graphite text-slate">
      <div className="shell pt-14 pb-10 lg:pt-16">
        <div className="grid gap-10 lg:grid-cols-12 lg:gap-8">
          <div className="lg:col-span-4">
            <a
              href="#top"
              className="inline-flex items-center gap-2.5 text-paper transition-opacity hover:opacity-80"
            >
              <Mark className="h-[1.15em] w-auto text-fermor" />
              <span className="text-[1.2rem] leading-none font-semibold tracking-[-0.03em]">
                Fermor
              </span>
            </a>
            <p className="t-h3 mt-4 text-paper">Understand. Act. Grow.</p>
            <p className="t-small mt-3 max-w-[34ch] text-slate">
              A better way for people in India to understand, act and grow
              financially.
            </p>
          </div>

          {columns.map((column) => (
            <nav
              key={column.heading}
              aria-label={column.heading}
              className="lg:col-span-2 lg:col-start-auto"
            >
              <h2 className="t-label text-paper">{column.heading}</h2>
              <ul className="mt-4 space-y-2.5">
                {column.links.map((link) => (
                  <li key={link.href}>
                    <a
                      href={link.href}
                      className="t-small text-slate transition-colors hover:text-fermor"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          ))}

          <div className="lg:col-span-2">
            <h2 className="t-label text-paper">Get Fermor</h2>
            <div className="mt-4 flex flex-col gap-2.5">
              <a
                href="https://fermor.in/signup"
                className="t-small text-slate transition-colors hover:text-fermor"
              >
                Create an account
              </a>
              <a
                href="https://fermor.in/sign-in"
                className="t-small text-slate transition-colors hover:text-fermor"
              >
                Log in
              </a>
            </div>
            <a href="#top" className="btn btn-green mt-6 w-full">
              Get started
            </a>
          </div>
        </div>

        <div className="mt-12 border-t border-white/10 pt-6">
          <p className="t-small max-w-[92ch] text-slate/80">
            Fermor Technologies Pvt. Ltd. is registered in India and operates
            fermor.in. Fermor is not a SEBI-registered investment adviser and
            does not provide personalised financial, investment or tax advice.
            Calculators, content and tools are for educational and informational
            purposes; results are indicative estimates and individual outcomes
            may vary. Verify figures with your lender, bank or a qualified
            professional before committing to any financial product.
          </p>
          <div className="mt-5 flex flex-wrap items-center justify-between gap-x-6 gap-y-2">
            <p className="t-small text-slate/70">© 2026 Fermor. All rights reserved.</p>
            <p className="t-small text-slate/70">Bengaluru, India</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
