export function FinalCta() {
  return (
    <section className="bg-fermor text-ink">
      <div className="shell grid gap-8 py-[clamp(3.75rem,8vw,6.5rem)] lg:grid-cols-12 lg:items-end lg:gap-12">
        <div className="lg:col-span-7">
          <h2 className="t-h2 text-[clamp(2.1rem,4.4vw,3.6rem)]">
            Start with one decision.
          </h2>
          <p className="t-lede mt-4 max-w-[46ch] text-ink/75">
            The loan you are negotiating. The SIP you keep meaning to set up.
            Run it once with real numbers — nothing to install, nothing to log
            into.
          </p>
        </div>

        <div className="flex flex-wrap gap-3 lg:col-span-4 lg:col-start-9 lg:justify-end">
          <a href="https://fermor.in/signup" className="btn btn-on-green">
            Get started
          </a>
          <a href="#calculators" className="btn btn-ghost-on-green">
            Browse calculators
          </a>
        </div>
      </div>
    </section>
  );
}
