import { Mark } from "@/components/ui/mark";

export function Statement() {
  return (
    <section className="relative overflow-hidden bg-fermor text-ink">
      <span
        aria-hidden="true"
        className="pointer-events-none absolute -right-10 -bottom-16 h-[130%] w-auto sm:-right-16"
      >
        <Mark className="h-full w-auto text-ink/[0.07]" />
      </span>
      <div className="shell relative grid gap-8 py-[clamp(3.75rem,8vw,6.5rem)] lg:grid-cols-12 lg:gap-12">
        <h2 className="t-h2 text-[clamp(2.1rem,4.4vw,3.75rem)] lg:col-span-7">
          <span className="block">Banks show you products.</span>
          <span className="block">Ads show you offers.</span>
          <span className="block">Fermor shows you the arithmetic.</span>
        </h2>
        <div className="lg:col-span-4 lg:col-start-9 lg:self-end">
          <p className="t-body max-w-[38ch] text-ink/75">
            Every result arrives with the formula behind it, the inputs it used
            and the assumption it rests on. A number you cannot check is a
            number you should not act on — so we show you ours.
          </p>
          <a
            href="https://fermor.in/privacy"
            className="t-label mt-4 inline-block border-b border-ink/40 pb-0.5 transition-colors hover:border-ink"
          >
            How Fermor handles your data
          </a>
        </div>
      </div>
    </section>
  );
}
