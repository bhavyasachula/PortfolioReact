import React, { useRef, useState, useEffect } from "react";
import { motion, useScroll, useSpring, useTransform } from "framer-motion";
import "./ProjectBento.css";

/* ---------- DATA: edit projects here only ---------- */
const projects = [
  {
    badge: "Featured Project",
    title: "Invoice Dispatcher Agent",
    desc: "Agentic invoice routing - OCR extraction, LLM classification, SMTP dispatch. Zero manual touch",
    links: [
      { label: "Repository", href: "https://github.com/bhavyasachula/" }, // TODO: exact repo link
      { label: "Live Demo", href: "https://flowchat.streamlit.app/" },
    ],
    metrics: [
      { value: "91.9%", label: "Field Accuracy" },
      { value: "<1.8s", label: "Cycle Time" },
      { value: "0.0", label: "Touch Minutes" },
    ],
    flow: ["INGEST", "OCR", "PARSE", "ROUTE", "SEND"],
    stack: ["LangGraph", "LangChain", "Python", "Streamlit"],
  },
  {
    badge: "Project",
    title: "FinSights",
    desc: "Privacy-first bank statement analyzer - session-only in-memory processing, Gemini insights, D3 charts",
    links: [
      { label: "Repository", href: "https://github.com/bhavyasachula/" }, // TODO: exact repo link
      // { label: "Live Demo", href: "" },                                // TODO: add if deployed
    ],
    metrics: [
      { value: "0", label: "Data Stored" },
      { value: "RC4", label: "Encryption" },
      { value: "JWT", label: "RBAC Auth" },
    ], // TODO: swap for real numbers if you have them
    flow: ["UPLOAD", "ENCRYPT", "PARSE", "ANALYZE", "VISUALIZE"],
    stack: ["React", "Node.js", "Gemini", "D3.js"],
  },
  {
    badge: "Project",
    title: "Expense Tracker MCP",
    desc: "Local expense tracker exposed as an MCP server - CRUD tools, category filters, date-range summaries for any LLM client",
    links: [
      { label: "Repository", href: "https://github.com/bhavyasachula/" }, // TODO: exact repo link
    ],
    metrics: [
      { value: "CRUD", label: "MCP Tools" },
      { value: "SQLite", label: "Local Store" },
      { value: "Filter", label: "By Category" },
    ], // TODO: swap for real numbers if you have them
    flow: ["CLIENT", "MCP", "TOOL", "SQLITE", "SUMMARY"],
    stack: ["FastMCP", "SQLite", "Python"],
  },
];

const SCROLL_PER_PROJECT = 120; // vh of scroll per project, tweak for speed
const PIN_QUERY = "(min-width: 1024px)";
const AREAS = ["c1", "c2", "m1"];

/* ---------- single bento (same layout/CSS as before) ---------- */
function Bento({ p }) {
  return (
    <div className="Container w-full text-white">
      <div className="gridcard tetle b-title">
        <div className="flex flex-col justify-between h-full w-full p-[20px]">
          <div className="innerTetle flex flex-col items-start">
            <span className="ftpj bg-[#FFD23F] p-[3px] self-start border-2 border-black text-black text-[15px]">
              {p.badge}
            </span>
            <label>{p.title}</label>
            <p>{p.desc}</p>
          </div>
          <div className="LiveLinks flex gap-5">
            {p.links.map((l) => (
              <a key={l.label} href={l.href} target="_blank" rel="noopener noreferrer">
                {l.label}
              </a>
            ))}
          </div>
        </div>
      </div>

      {p.metrics.map((m, i) => (
        <div key={m.label} className={`gridcard ${AREAS[i]} flex flex-col justify-end`}>
          <div className="metrix">{m.value}</div>
          <span className="fieldText">{m.label}</span>
        </div>
      ))}

      <div className="gridcard flow flex flex-wrap items-center justify-center">
        {p.flow.map((step, i) => (
          <React.Fragment key={step}>
            {i > 0 && <ArrowForward />}
            <div className="flowCard">{step}</div>
          </React.Fragment>
        ))}
      </div>

      <div className="gridcard stack flex flex-wrap items-center justify-center">
        {p.stack.map((t) => (
          <div key={t} className="techStack">
            ——{t}
          </div>
        ))}
      </div>
    </div>
  );
}

function ArrowForward() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M6 17L11 12L6 7M13 17L18 12L13 7"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/* ---------- pinned scroll ---------- */
function Slide({ p, progress, i, n }) {
  const s = i / n;
  const e = (i + 1) / n;
  const f = 0.12; // fade zone, bigger = slower, softer handoff
  const first = i === 0;
  const last = i === n - 1;

  // input must stay inside 0..1 and increasing (first slide: no fade-in, last: no fade-out)
  const input = first ? [0, e - f, e] : last ? [s - f, s, 1] : [s - f, s, e - f, e];
  const opacity = useTransform(progress, input, first ? [1, 1, 0] : last ? [0, 1, 1] : [0, 1, 1, 0]);
  const y = useTransform(progress, input, first ? [0, 0, -40] : last ? [40, 0, 0] : [40, 0, 0, -40]);
  const pointerEvents = useTransform(opacity, (v) => (v > 0.5 ? "auto" : "none"));
  // hidden slides aren't painted at all (backdrop-blur cards are expensive)
  const visibility = useTransform(opacity, (v) => (v > 0.01 ? "visible" : "hidden"));

  const innerRef = useRef(null);
  const scale = useFitScale(innerRef);

  return (
    <motion.div className="absolute inset-0 flex items-center" style={{ opacity, y, pointerEvents, visibility, willChange: "transform, opacity" }}>
      <div ref={innerRef} className="w-full" style={{ transform: `scale(${scale})`, transformOrigin: "center" }}>
        <Bento p={p} />
      </div>
    </motion.div>
  );
}

/* shrink bento if it's taller than the screen so it never gets clipped */
function useFitScale(ref) {
  const [scale, setScale] = useState(1);
  useEffect(() => {
    const fit = () => {
      if (!ref.current) return;
      const h = ref.current.offsetHeight + 40;
      setScale(Math.min(1, window.innerHeight / h));
    };
    fit();
    window.addEventListener("resize", fit);
    return () => window.removeEventListener("resize", fit);
  }, [ref]);
  return scale;
}

function Pinned() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });
  // spring smooths out choppy mouse-wheel steps
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 30, mass: 0.3 });
  const n = projects.length;

  return (
    <section id="projects" ref={ref} style={{ height: `${n * SCROLL_PER_PROJECT}vh` }}>
      <div className="sticky top-0 h-screen overflow-hidden">
        {projects.map((p, i) => (
          <Slide key={p.title} p={p} progress={progress} i={i} n={n} />
        ))}
      </div>
    </section>
  );
}

/* pin only on big screens; mobile/tablet/reduced-motion = normal stacked list */
function useCanPin() {
  const [ok, setOk] = useState(() => window.matchMedia(PIN_QUERY).matches);
  useEffect(() => {
    const mq = window.matchMedia(PIN_QUERY);
    const on = (e) => setOk(e.matches);
    mq.addEventListener("change", on);
    return () => mq.removeEventListener("change", on);
  }, []);
  return ok;
}

export default function ProjectBento() {
  const canPin = useCanPin();
  if (canPin) return <Pinned />;
  return (
    <section id="projects" className="flex flex-col gap-6">
      {projects.map((p) => (
        <Bento key={p.title} p={p} />
      ))}
    </section>
  );
}