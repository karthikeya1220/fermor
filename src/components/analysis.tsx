import { analysis } from "@/lib/data";

export function Analysis() {
  return (
    <section id="analysis" className="section border-t border-line">
      <div className="shell">
        <div className="flex flex-wrap items-end justify-between gap-x-10 gap-y-5">
          <div>
            <h2 className="t-h2 max-w-[16ch]">
              Analysis that reaches your wallet.
            </h2>
            <p className="t-lede mt-4 max-w-[46ch] text-moss">
              When a market story changes what your money does, we break it
              down with the numbers that matter.
            </p>
          </div>
          <a
            href="https://fermor.in/news"
            className="t-label border-b border-ink/30 pb-0.5 transition-colors hover:border-ink"
          >
            All analysis
          </a>
        </div>

        <ul className="mt-9 border-t border-line">
          {analysis.map((item) => (
            <li key={item.href}>
              <a
                href={item.href}
                className="group grid gap-x-8 gap-y-2 border-b border-line py-5 transition-colors duration-150 hover:bg-paper sm:grid-cols-[9.5rem_1fr_5.5rem] sm:py-6"
              >
                <div className="flex items-baseline gap-3 sm:block">
                  <span className="t-label text-ink">{item.category}</span>
                  <span className="t-small block text-moss sm:mt-1">
                    {item.date}
                  </span>
                </div>

                <div className="min-w-0">
                  <h3 className="t-body max-w-[62ch] font-medium transition-transform duration-200 group-hover:translate-x-1">
                    {item.title}
                  </h3>
                  <p className="t-small mt-1.5 max-w-[68ch] text-moss">
                    {item.dek}
                  </p>
                </div>

                <div className="flex items-center justify-between gap-3 sm:justify-end">
                  <span className="t-small text-moss">{item.readTime}</span>
                  <svg
                    width="12"
                    height="12"
                    viewBox="0 0 12 12"
                    fill="none"
                    aria-hidden="true"
                    className="translate-x-[-5px] text-moss opacity-0 transition-all duration-200 group-hover:translate-x-0 group-hover:text-ink group-hover:opacity-100 sm:group-focus-visible:translate-x-0 sm:group-focus-visible:opacity-100"
                  >
                    <path
                      d="M2.5 9.5L9.5 2.5M9.5 2.5H4M9.5 2.5V8"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
