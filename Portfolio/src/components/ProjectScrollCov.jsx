import { useEffect, useRef } from "react";
import "./ProjectScrollCov.css";

const projects = [
  {
    badge: "Featured Project",
    title: "Invoice Dispatcher Agent",
    description:
      "Agentic invoice routing — OCR extraction, LLM classification, SMTP dispatch. Zero manual touch",
    metrics: [
      ["91.9%", "Field Accuracy"],
      ["<1.8s", "Cycle Time"],
      ["0.0", "Touch Minutes"],
    ],
    flow: ["INGEST", "OCR", "PARSE", "ROUTE", "SEND"],
    stack: ["LangGraph", "LangChain", "Python", "Streamlit"],
    links: [
      { label: "Repository", href: "https://github.com/bhavyasachula/" },
      { label: "Live Demo", href: "https://flowchat.streamlit.app/" },
    ],
  },
  {
    badge: "Project",
    title: "FinSights",
    description:
      "Privacy-first bank statement analyzer — session-only in-memory processing, Gemini insights, D3 charts",
    metrics: [
      ["In-Memory", "Zero DB Storage"],
      ["JWT+RBAC", "Role-Based Auth"],
      ["Gemini", "AI Insights"],
    ],
    flow: ["UPLOAD", "ENCRYPT", "PARSE", "ANALYZE", "VISUALIZE"],
    stack: ["React", "Node.js", "Gemini", "D3.js"],
    links: [{ label: "Repository", href: "https://github.com/bhavyasachula/" }],
  },
  {
    badge: "Project",
    title: "Expense Tracker MCP",
    description:
      "Local expense tracker exposed as an MCP server — CRUD tools, category filters, date-range summaries for any LLM client",
    metrics: [
      ["CRUD", "MCP Tools"],
      ["By Date", "Range Summaries"],
      ["By Category", "Filtered Queries"],
    ],
    flow: ["CLIENT", "MCP", "TOOL", "SQLITE", "SUMMARY"],
    stack: ["FastMCP", "SQLite", "Python"],
    links: [{ label: "Repository", href: "https://github.com/bhavyasachula/" }],
  },
];

function Arrow() {
  return (
    <svg
      className="pss-arrow"
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
    >
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

function ProjectCard({ project }) {
  const metricAreas = ["c1", "c2", "m1"];

  return (
    <div className="pss-container">
      <div className="pss-gridcard pss-b-title pss-tetle">
        <div className="pss-flexcol">
          <div className="pss-inner-title">
            <span className="pss-project-badge">{project.badge}</span>
            <h2>{project.title}</h2>
            <p>{project.description}</p>
          </div>

          <div className="pss-live-links">
            {project.links.map((link) => (
              <a
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
              >
                {link.label}
              </a>
            ))}
          </div>
        </div>
      </div>

      {project.metrics.map(([value, label], index) => (
        <div
          className={`pss-gridcard pss-metric-card pss-${metricAreas[index]}`}
          key={label}
        >
          <div className="pss-metric">{value}</div>
          <span className="pss-field-text">{label}</span>
        </div>
      ))}

      <div className="pss-gridcard pss-flow pss-flexwrap">
        {project.flow.map((step, index) => (
          <div className="pss-flow-step-wrap" key={step}>
            <div className="pss-flow-card">{step}</div>
            {index < project.flow.length - 1 && <Arrow />}
          </div>
        ))}
      </div>

      <div className="pss-gridcard pss-stack pss-flexwrap">
        {project.stack.map((tech) => (
          <div className="pss-tech-stack" key={tech}>
            ——{tech}
          </div>
        ))}
      </div>
    </div>
  );
}

// FIX: extra scroll "hold" at the end so the last card doesn't get yanked away instantly
const END_HOLD = 0.25;

export default function ProjectScrollStack() {
  const sectionRef = useRef(null);
  const viewportRef = useRef(null);
  const slideRefs = useRef([]);

  useEffect(() => {
    const section = sectionRef.current;
    const viewport = viewportRef.current;
    const slides = slideRefs.current.filter(Boolean);
    if (!section || !viewport || !slides.length) return;

    const clamp = (v, min, max) => Math.min(max, Math.max(min, v));
    const last = slides.length - 1;
    let raf = 0;
    let ticking = false;

    // FIX: use the sticky viewport's own height (100svh) instead of window.innerHeight.
    // innerHeight changes when the mobile address bar hides/shows -> that was the jitter + gap at the end.
    const getVH = () => viewport.clientHeight || window.innerHeight;

    const applyStack = (progress) => {
      slides.forEach((slide, index) => {
        const entering = clamp(progress - (index - 1), 0, 1);
        const receded = clamp(progress - index, 0, 1);
        const recededFurther = clamp(progress - index - 1, 0, 1);

        const y = (1 - entering) * 100;
        const px = -(28 * receded + 22 * recededFurther);
        const scale = 1 - 0.06 * receded - 0.05 * recededFurther;
        const opacity = 1 - 0.35 * recededFurther;
// skip rendering slides that aren't on screen (kills their blur cost)
        slide.style.visibility = index > 0 && entering === 0 ? "hidden" : "visible";
        // FIX: translate3d keeps it on the GPU layer (smoother on Oppo / Chrome Android)
        slide.style.transform = `translate3d(0, ${y}%, 0) translate3d(0, ${px}px, 0) scale(${scale})`;
        slide.style.opacity = String(opacity);
        slide.style.zIndex = String(index + 1);
        slide.style.pointerEvents = receded < 0.5 ? "auto" : "none";
      });
    };

    const update = () => {
      ticking = false;
      const rect = section.getBoundingClientRect();
      // FIX: scroll distance per slide comes from the section itself (stable lvh),
      // not the sticky viewport, because dvh changes when the address bar hides
      const step = section.offsetHeight / (projects.length + END_HOLD);
      applyStack(clamp(-rect.top / step, 0, last));
    };

    // FIX: scroll-driven + rAF throttled instead of a rAF loop running forever
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      raf = requestAnimationFrame(update);
    };

    // FIX: fit runs on every screen size (tablet too) and re-runs on font load / viewport resize
    const fitCards = () => {
      const avail = getVH() - 24;

      slides.forEach((slide) => {
        const card = slide.querySelector(".pss-container");
        if (!card) return;

        // reset, then measure natural height
        card.style.transform = "";
        card.style.width = "";
        card.style.maxWidth = "";
        card.style.flex = "";

        const h = card.offsetHeight;
        if (h > avail) {
          const scale = avail / h;
          // FIX: widen by 1/scale so after scaling down it still fills the full width (no side gaps)
          card.style.flex = "none";
          card.style.maxWidth = "none";
          card.style.width = `${100 / scale}%`;
          card.style.transform = `scale(${scale})`;
        }
      });

      update();
    };

    requestAnimationFrame(fitCards);

    // FIX: Google Fonts load late -> card heights change after first measure. Re-fit when ready.
    if (document.fonts && document.fonts.ready) {
      document.fonts.ready.then(fitCards);
    }

    // FIX: observe the viewport (svh = stable), NOT the cards, so no resize loop
    const ro = new ResizeObserver(fitCards);
    ro.observe(viewport);

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("orientationchange", fitCards);

    return () => {
      ro.disconnect();
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("orientationchange", fitCards);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div className="project-scroll-stack" id="projects">
      <section
        className="pss-projects"
        ref={sectionRef}
        aria-label="Projects"
        // FIX: height now comes from CSS (svh * count), no JS height = no jump on address bar change
        style={{ "--pss-count": projects.length + END_HOLD }}
      >
        <div className="pss-stack-viewport" ref={viewportRef}>
          <div className="pss-stack-inner">
            {projects.map((project, index) => (
              <div
                className="pss-slide"
                data-index={index}
                key={project.title}
                ref={(el) => {
                  slideRefs.current[index] = el;
                }}
              >
                <ProjectCard project={project} />
              </div>
            ))}
          </div>
        </div>
      </section>
      {/* FIX: removed the stray "=" that was rendering as text under the section (that was your extra space at the end) */}
    </div>
  );
}
