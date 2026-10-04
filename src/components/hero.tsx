import { Instrument } from "./instrument";

const assurances = [
  {
    title: "No login wall",
    body: "A tool opens the second you click it.",
  },
  {
    title: "Nothing leaves your device",
    body: "The math runs in your own browser.",
  },
  {
    title: "The working, always",
    body: "Formula, inputs and assumptions included.",
  },
  {
    title: "Educational by design",
    body: "Not a SEBI-registered adviser. The call is yours.",
  },
];

export function Hero() {
  return (
    <section id="top" className="relative">
      <div className="shell pt-[104px] lg:pt-[132px]">
        <div className="grid gap-10 lg:grid-cols-12 lg:gap-12">
          <div className="lg:col-span-7">
            <h1
              className="t-display seq-item max-w-[13ch]"
              style={{ animationDelay: "40ms" }}
            >
              The math behind your money, in the open.
            </h1>

            <p
              className="t-lede mt-7 max-w-[44ch] text-moss seq-item lg:mt-9"
              style={{ animationDelay: "120ms" }}
            >
              Fermor is where India works out its money — calculators that show
              every step, one view of what you own, and forecasts you can
              adjust. Free, with nothing hidden behind a login.
            </p>

            <div
              className="mt-7 flex flex-wrap gap-3 seq-item"
              style={{ animationDelay: "200ms" }}
            >
              <a
                href="https://fermor.in/signup"
                className="btn btn-green"
              >
                Get started
              </a>
              <a href="#calculators" className="btn btn-outline">
                Browse calculators
              </a>
            </div>

            <p
              className="t-small mt-6 max-w-[40ch] text-moss seq-item"
              style={{ animationDelay: "260ms" }}
            >
              Start with the decision in front of you. An account only matters
              if you want a result kept between visits.
            </p>
          </div>

          <div
            className="seq-item lg:col-span-5"
            style={{ animationDelay: "160ms" }}
          >
            <Instrument />
          </div>
        </div>
      </div>

      <div className="mt-14 border-y border-line bg-paper/50 lg:mt-20">
        <ul className="shell grid gap-x-8 gap-y-5 py-5 sm:grid-cols-2 lg:grid-cols-4">
          {assurances.map((item) => (
            <li key={item.title} className="flex gap-3">
              <span
                className="mt-[0.4em] h-[7px] w-[7px] shrink-0 bg-fermor ring-1 ring-ink/60"
                aria-hidden="true"
              />
              <span>
                <span className="t-label block text-ink">{item.title}</span>
                <span className="t-small block text-moss">{item.body}</span>
              </span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
