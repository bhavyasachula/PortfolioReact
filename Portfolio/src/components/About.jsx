import { useEffect, useRef, useState } from "react";
import DownloadButton from "./DownloadButton";
const HEADLINE = "I BUILD FULL-STACK APPS AND AGENTIC WORKFLOWS";

const EDUCATION = [
  {
    year: "2020",
    label: "Diploma",
    title: "Computer Engineering",
    school: "Government Polytechnic, Gandhinagar",
    meta: "Gandhinagar, Gujarat",
    desc: "Diploma in computer engineering.",
    score: "9.24",
  },
  {
    year: "2023–26",
    label: "Bachelor of Technology",
    title: "Computer Science & Engineering",
    school: "New LJ Institute of Engineering and Technology",
    meta: "Ahmedabad, Gujarat",
    desc: "Bachelor's degree in computer engineering. Graduated 2026.",
    score: "8.26",
  },
  {
    year: "2026→",
    label: "Present",
    title: "Building full-stack apps and agentic workflows.",
    school: "GenAI & Full Stack Development",
    meta: "Ahmedabad, Gujarat  /  Open to full-time roles",
    desc: "Shipping agentic AI systems, RAG workflows, and full-stack products end to end.",
  },
];

const BG = "#0b0b0d";
const ACCENT = "#d946ef";
const AMBER = "#fcd34d";
const INK = "#fcfcfc";

// const FONTS = `
// @import url('https://fonts.googleapis.com/css2?family=Inter+Tight:wght@500;600;700;800&family=Inter:wght@400;500&family=JetBrains+Mono:wght@400;500&display=swap');
// .f-head { font-family: 'syne' ; }
// .f-body { font-family: 'syne', system-ui, sans-serif; }
// .f-mono { font-family: 'JetBrains Mono', ui-monospace, monospace; }
// `;
const FONTS = `
@import url('https://fonts.googleapis.com/css2?family=Anton&family=Fraunces:ital,opsz,wght@1,9..144,400;1,9..144,600&family=Inter:wght@400;500&family=JetBrains+Mono:wght@400;500&display=swap');
.f-head { font-family: 'Anton', 'Inter', system-ui, sans-serif; }
.f-year { font-family: 'Fraunces', Georgia, serif; font-style: italic; }
.f-body { font-family: 'Inter', system-ui, sans-serif; }
.f-mono { font-family: 'JetBrains Mono', ui-monospace, monospace; }
`;

const WORDS = HEADLINE.split(" ");
const STEP_MS = 430;
const clamp = (v, a = 0, b = 1) => Math.min(b, Math.max(a, v));

export default function About() {
  const railRef = useRef(null);
  const dotRefs = useRef([]);
  const [step, setStep] = useState(0);
  const [geo, setGeo] = useState({
    start: 0,
    len: 0,
    fill: 0,
    active: EDUCATION.map(() => false),
  });

  // infinite kinetic loop
  useEffect(() => {
    const id = setInterval(
      () => setStep((s) => (s + 1) % (WORDS.length + 1)),
      STEP_MS,
    );
    return () => clearInterval(id);
  }, []);

  // rail runs from first dot to last dot, fills on scroll
  useEffect(() => {
    let raf = 0;
    const update = () => {
      raf = 0;
      if (!railRef.current) return;
      const vh = window.innerHeight;
      const rr = railRef.current.getBoundingClientRect();
      const ys = dotRefs.current.map((el) => {
        const d = el.getBoundingClientRect();
        return d.top + d.height / 2 - rr.top;
      });
      const start = ys[0];
      const len = ys[ys.length - 1] - start;
      const fill = clamp(vh * 0.6 - rr.top - start, 0, len);
      setGeo({
        start,
        len,
        fill,
        active: ys.map((y) => y <= start + fill + 0.5),
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
    <section
      id="about"
      className="f-body relative px-6 pt-20 pb-20 "
      style={{ background: BG, color: INK }}
    >
      <style>{FONTS}</style>
      <div className="section-tag w-[100%]">{"{About}"}</div>
      {/* seam: soften the hero's bottom edge, add a hairline echoing the streaks */}
      <div
        className="pointer-events-none absolute inset-x-0 -top-32 h-32 z-10 w-full"
        style={{ background: `linear-gradient(to bottom, transparent, ${BG})` }}
      />
      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 h-40"
        style={{
          background: "linear-gradient(to bottom, transparent, #0b0b0d)",
        }}
      />

      {/* Kinetic heading */}
      <h2 className="f-head max-w-7xl mx-auto text-center font-extrabold uppercase tracking-[-0.04em] leading-[0.95] text-[clamp(2.5rem,7vw,6.25rem)] mt-10 mb-24">
        {WORDS.map((word, w) => {
          const on = w === a || (step > 0 && w === b);
          return (
            <span
              key={w}
              className="inline-block whitespace-nowrap mr-[0.25em]"
              style={{
                color: on ? INK : "#26262b",
                transition: "color .5s ease",
              }}
            >
              {word}
            </span>
          );
        })}
      </h2>

      {/* Ledger */}
      <div ref={railRef} className="relative max-w-6xl mx-auto">
        {/* rail */}
        <div
          className="absolute w-px left-[11px] md:left-[255px] bg-white/10"
          style={{ top: geo.start, height: geo.len }}
        />
        <div
          className="absolute w-px left-[11px] md:left-[255px]"
          style={{ top: geo.start, height: geo.fill, background: ACCENT }}
        />

        {EDUCATION.map((e, i) => {
          const on = geo.active[i];
          const last = i === EDUCATION.length - 1;
          return (
           <div
  key={i}
  className={`grid grid-cols-[24px_1fr] md:grid-cols-[220px_24px_1fr] gap-x-4 md:gap-x-6 py-10 `}
>
              {/* year */}
              <div
  className="f-head col-start-2 row-start-1 md:col-start-1 md:text-right text-4xl md:text-[2.75rem] font-bold tracking-tight leading-none pb-5 md:pb-0 transition-colors duration-500"
  style={{ color: on ? (last ? AMBER : INK) : "#3a3a40" }}
>
  {e.year}
</div>

              {/* dot */}
              <div className="col-start-1 row-start-1 row-span-2 md:col-start-2 md:row-span-1 flex justify-center items-start">
                <span
                  ref={(el) => (dotRefs.current[i] = el)}
                  className="relative z-10 block w-[11px] h-[11px] rounded-full border mt-[13px] md:mt-[17px] transition-all duration-300"
                  style={{
                    background: on ? ACCENT : BG,
                    borderColor: on ? ACCENT : "rgba(255,255,255,0.25)",
                    boxShadow: on
                      ? `0 0 0 5px ${BG}, 0 0 16px ${ACCENT}99`
                      : `0 0 0 5px ${BG}`,
                  }}
                />
              </div>

              {/* content */}
              <div className="col-start-2 row-start-2 md:col-start-3 md:row-start-1 flex items-start justify-between gap-8">
                <div>
                  <p className="f-mono text-[11px] tracking-[0.25em] uppercase text-white/45">
                    {e.label}
                  </p>
                  <h3 className="f-head mt-3 text-2xl md:text-3xl font-semibold tracking-tight">
                    {e.title}
                  </h3>
                  <p className="mt-2 text-white/80">{e.school}</p>
                  <p className="f-mono mt-5 text-xs text-white/45">{e.meta}</p>
                  <p className="mt-2 text-sm text-white/60 max-w-xl">
                    {e.desc}
                  </p>
                </div>

                {e.score && (
                  <div className="text-right shrink-0">
                    <p className="text-3xl md:text-4xl font-medium leading-none">
                      {e.score}
                    </p>
                    <p className="mt-2 text-[11px] tracking-[0.25em] text-white/45">
                      CGPA
                    </p>
                  </div>
                )}
              </div>
            </div>
          );
        })}

        {/* footer */}
        <div className="f-mono mt-8 flex flex-wrap items-center justify-between gap-4 text-xs text-white/45">
          <span>Ahmedabad, India - IST +05:30</span>
          <a
            href="/resumeSB.pdf"
            download
            className="text-white/80 hover:text-white underline underline-offset-4 decoration-white/30 hover:decoration-fuchsia-400 transition-colors"
          >
            <DownloadButton></DownloadButton>
          </a>
        </div>
      </div>
    </section>
  );
}
