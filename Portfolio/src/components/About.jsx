import { useEffect, useRef, useState } from "react";

const HEADLINE = "I BUILD FULL-STACK APPS AND AI TOOLS.";

const EDUCATION = [
  {
    label: "Bachelor of Technology",
    title: "Computer Engineering",
    school: "New LJ Institute of Engineering and Technology",
    meta: "Ahmedabad, Gujarat  /  2023 – 2026",
    desc: "Four-year degree in computer engineering. Graduated 2026.",
    score: "8.26",
  },
  {
    label: "Diploma",
    title: "Computer Engineering",
    school: "Government Polytechnic, Gandhinagar",
    meta: "Gandhinagar, Gujarat  /  2020",
    desc: "Diploma in computer engineering.",
    score: "9.24",
  },
];

const FONTS = `
@import url('https://fonts.googleapis.com/css2?family=Inter+Tight:wght@500;700;800&family=Inter:wght@400;500&family=JetBrains+Mono:wght@400;500&display=swap');
.f-head { font-family: 'Inter Tight', 'Inter', system-ui, sans-serif; }
.f-body { font-family: 'Inter', system-ui, sans-serif; }
.f-mono { font-family: 'JetBrains Mono', ui-monospace, monospace; }
`;

const WORDS = HEADLINE.split(" ");
const STEP_MS = 430; // time per step
const clamp = (v, a = 0, b = 1) => Math.min(b, Math.max(a, v));

export default function About() {
  const railRef = useRef(null);
  const itemRefs = useRef([]);
  const [step, setStep] = useState(0);
  const [rail, setRail] = useState({ fill: 0, active: EDUCATION.map(() => false) });

  // infinite kinetic loop: a 2-word window sliding across the headline
  useEffect(() => {
    const id = setInterval(() => setStep((s) => (s + 1) % (WORDS.length + 1)), STEP_MS);
    return () => clearInterval(id);
  }, []);

  // rail fill on scroll
  useEffect(() => {
    let raf = 0;
    const update = () => {
      raf = 0;
      const vh = window.innerHeight;
      const r = railRef.current.getBoundingClientRect();
      const fill = clamp(vh * 0.6 - r.top, 0, r.height);
      setRail({
        fill,
        active: itemRefs.current.map((el) => el && el.offsetTop + 43 <= fill),
      });
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      cancelAnimationFrame(raf);
    };
  }, []);

  const n = WORDS.length;
  const a = (step - 1 + n) % n;
  const b = step % n;

  return (
    <section id="about" className="f-body bg-[] text-white py-20 px-6">
      <style>{FONTS}</style>

      {/* <p className="f-Nabla max-w-6xl mx-auto text-center text-[11px] tracking-[0.3em] uppercase text-white/40 mb-6">
        About
      </p> */}

      {/* Kinetic heading — continuous loop */}
      <h2 className="f-head max-w-6xl mx-auto text-center font-extrabold uppercase tracking-[-0.04em] leading-[0.95] text-[clamp(2.25rem,7vw,6rem)] mb-20">
        {WORDS.map((word, w) => {
          const on = w === a || (step > 0 && w === b);
          return (
            <span
              key={w}
              className="inline-block whitespace-nowrap mr-[0.25em]"
              style={{
                color: on ? "#ffffff" : "#2e2e32",
                transition: "color .5s ease",
              }}
            >
              {word}
            </span>
          );
        })}
      </h2>

      {/* Timeline */}
      <div ref={railRef} className="relative max-w-6xl mx-auto pl-10 space-y-8">
        <div className="absolute left-[7px] top-0 bottom-0 w-px bg-white/10" />
        <div className="absolute left-[7px] top-0 w-px bg-white" style={{ height: rail.fill }} />

        {EDUCATION.map((e, i) => {
          const on = rail.active[i];
          return (
            <div key={i} ref={(el) => (itemRefs.current[i] = el)} className="relative">
              <span
                className={`absolute -left-10 top-9 w-[15px] h-[15px] rounded-full border-2 transition-all duration-300 ${
                  on
                    ? "bg-white border-white shadow-[0_0_14px_rgba(255,255,255,0.7)] scale-110"
                    : "bg-black border-white/25"
                }`}
              />

              <div
                className={`rounded-2xl border bg-white/[0.03] p-8 md:p-10 transition-all duration-500 hover:bg-white/[0.05] ${
                  on
                    ? "opacity-100 translate-y-0 border-white/15"
                    : "opacity-40 translate-y-3 border-white/10"
                }`}
              >
                <div className="flex items-start justify-between gap-6">
                  <div>
                    <p className="f-mono text-[11px] tracking-[0.25em] uppercase text-white/50">
                      {String(i + 1).padStart(2, "0")} — {e.label}
                    </p>
                    <h3 className="f-head mt-2 text-2xl md:text-3xl font-bold tracking-tight">
                      {e.title}
                    </h3>
                    <p className="mt-3 text-white/80">{e.school}</p>
                  </div>
                  <div className="text-right shrink-0">
                    <p className="f-mono text-3xl md:text-4xl font-medium">{e.score}</p>
                    <p className="f-mono text-[11px] tracking-[0.25em] text-white/50">CGPA</p>
                  </div>
                </div>

                <div className="mt-6 pt-5 border-t border-white/10">
                  <p className="f-mono text-xs text-white/50">{e.meta}</p>
                  <p className="mt-3 text-sm text-white/60">{e.desc}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}