import { useEffect, useRef, useState } from "react";
import "./ProjectScrollCov.css";

const projects = [
  {
    badge: "Featured Project",
    title: "Invoice Dispatcher Agent",
    description: "Agentic invoice routing — OCR extraction, LLM classification, SMTP dispatch. Zero manual touch",
    metrics: [ ["91.9%", "Field Accuracy"], ["<1.8s", "Cycle Time"], ["0.0", "Touch Minutes"] ],
    flow: ["INGEST", "OCR", "PARSE", "ROUTE", "SEND"],
    stack: ["LangGraph", "LangChain", "Python", "Streamlit"],
    links: [{ label: "Repository", href: "https://github.com/bhavyasachula/" }, { label: "Live Demo", href: "https://flowchat.streamlit.app/" }],
  },
  {
    badge: "Project",
    title: "FinSights",
    description: "Privacy-first bank statement analyzer — session-only in-memory processing, Gemini insights, D3 charts",
    metrics: [["0", "Data Stored"], ["RC4", "Encryption"], ["JWT", "RBAC Auth"]],
    flow: ["UPLOAD", "ENCRYPT", "PARSE", "ANALYZE", "VISUALIZE"],
    stack: ["React", "Node.js", "Gemini", "D3.js"],
    links: [{ label: "Repository", href: "https://github.com/bhavyasachula/" }],
  },
  {
    badge: "Project",
    title: "Expense Tracker MCP",
    description: "Local expense tracker exposed as an MCP server — CRUD tools, category filters, date-range summaries for any LLM client",
    metrics: [["CRUD", "MCP Tools"], ["SQLite", "Local Store"], ["Filter", "By Category"]],
    flow: ["CLIENT", "MCP", "TOOL", "SQLITE", "SUMMARY"],
    stack: ["FastMCP", "SQLite", "Python"],
    links: [{ label: "Repository", href: "https://github.com/bhavyasachula/" }],
  },
];

function Arrow() {
  return (
    <svg className="pss-arrow" width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M6 17L11 12L6 7M13 17L18 12L13 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function ProjectCard({ project }) {
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
              <a key={link.label} href={link.href} target="_blank" rel="noopener noreferrer">{link.label}</a>
            ))}
          </div>
        </div>
      </div>

      {project.metrics.map(([value, label], index) => (
        <div className={`pss-gridcard pss-metric-card pss-${["c1", "c2", "m1"][index]}`} key={label}>
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
        {project.stack.map((tech) => <div className="pss-tech-stack" key={tech}>——{tech}</div>)}
      </div>
    </div>
  );
}

export default function ProjectScrollStack() {
  const sectionRef = useRef(null);
  const slideRefs = useRef([]);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const section = sectionRef.current;
    const slides = slideRefs.current.filter(Boolean);
    if (!section || !slides.length) return undefined;

    const clamp = (value, min, max) => Math.min(max, Math.max(min, value));
    const fitCards = () => {
      const viewportHeight = window.innerHeight;
      slides.forEach((slide) => {
        const card = slide.querySelector(".pss-container");
        if (!card) return;
        // Clear scale before measuring so repeated resizes don't compound it.
        card.style.transform = "scale(1)";
        const scale = Math.min(1, viewportHeight / (card.offsetHeight + 40));
        card.style.transform = `scale(${scale})`;
        card.style.transformOrigin = "center";
      });
    };

    const applyStack = (progress) => {
      slides.forEach((slide, index) => {
        const entering = clamp(progress - (index - 1), 0, 1);
        const receded = clamp(progress - index, 0, 1);
        const recededFurther = clamp(progress - index - 1, 0, 1);
        const y = (1 - entering) * 100;
        const px = -(28 * receded + 22 * recededFurther);
        const scale = 1 - 0.06 * receded - 0.05 * recededFurther;
        const opacity = 1 - 0.35 * recededFurther;

        slide.style.transform = `translateY(${y}%) translateY(${px}px) scale(${scale})`;
        slide.style.opacity = String(opacity);
        slide.style.zIndex = String(index + 1);
        slide.style.pointerEvents = (1 - receded) > 0.5 ? "auto" : "none";
      });
      setActiveIndex(Math.min(slides.length - 1, Math.round(progress)));
    };

    let animationFrame;
    const frame = () => {
      const viewportHeight = window.innerHeight;
      const rect = section.getBoundingClientRect();
      const scrollable = section.offsetHeight - viewportHeight;
      const progress = clamp(-rect.top / (scrollable || 1), 0, 1);
      applyStack(progress * (slides.length - 1));
      animationFrame = window.requestAnimationFrame(frame);
    };

    section.style.height = `${slides.length * 1.2 * 100}vh`;
    fitCards();
    applyStack(0);
    window.addEventListener("resize", fitCards);
    animationFrame = window.requestAnimationFrame(frame);

    return () => {
      window.removeEventListener("resize", fitCards);
      window.cancelAnimationFrame(animationFrame);
    };
  }, []);

  return (
    <div className="project-scroll-stack">
      <section className="pss-projects" ref={sectionRef} aria-label="Projects">
        <div className="pss-stack-viewport" id="projects">
          <div className="pss-stack-inner">
            {projects.map((project, index) => (
              <div className="pss-slide" data-index={index} key={project.title} ref={(element) => { slideRefs.current[index] = element; }}>
                <ProjectCard project={project} />
              </div>
            ))}
          </div>
        </div>
      </section>

      
    </div>
  );
}
