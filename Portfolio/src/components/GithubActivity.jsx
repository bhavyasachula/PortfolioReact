import { useEffect, useRef, useState } from "react";
import { GitHubContributionGraph } from "github-contrib-graph/react";
import "github-contrib-graph/styles.css";
import "./GithubActivity.css";

const USER = "bhavyasachula";
const CELL = 21;
const GAP = 4;
const STEP_MS = 20;

const isBright = (el) => {
  const cs = getComputedStyle(el);
  const c = (cs.backgroundColor + cs.fill).replace(/\s/g, "");
  return c.includes("rgb(251,68,184)");
};

function CountUp({ value, go }) {
  const [n, setN] = useState(0);
  useEffect(() => {
    if (!go) return;
    let raf;
    const start = performance.now();
    const dur = 2400;
    const tick = (t) => {
      const p = Math.min((t - start) / dur, 1);
      setN(Math.round(value * (1 - Math.pow(1 - p, 3))));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [go, value]);
  return <>{n.toLocaleString()}</>;
}

export default function GithubActivity() {
  const sectionRef = useRef(null);
  const graphRef = useRef(null);
  const [total, setTotal] = useState(null);
  const [go, setGo] = useState(false);

  useEffect(() => {
    fetch(`https://github-contributions-api.jogruber.de/v4/${USER}?y=last`)
      .then((r) => r.json())
      .then((d) => setTotal(d.contributions.reduce((s, x) => s + x.count, 0)))
      .catch(() => {});
  }, []);

  useEffect(() => {
    const graph = graphRef.current;
    let timer;
    let played = false;

    const play = () => {
      setGo(true);
      let tries = 0;
      timer = setInterval(() => {
        tries++;
        const cells = [...graph.querySelectorAll("*")].filter((el) => {
          const r = el.getBoundingClientRect();
          return Math.abs(r.width - CELL) < 1.5 && Math.abs(r.height - CELL) < 1.5;
        });
        if (cells.length < 100 && tries < 50) return;
        clearInterval(timer);

        const rects = cells.map((c) => c.getBoundingClientRect());
        const minLeft = Math.min(...rects.map((r) => r.left));
        const minTop = Math.min(...rects.map((r) => r.top));

        cells.forEach((c, i) => {
          const col = Math.round((rects[i].left - minLeft) / (CELL + GAP));
          const row = Math.round((rects[i].top - minTop) / (CELL + GAP));
          const delay = col * STEP_MS + row * 8;

          c.style.transformBox = "fill-box";
          c.style.transformOrigin = "center";

          const reveal = c.animate(
            [
              { opacity: 0, transform: "scale(0.2)", filter: "brightness(2.2)" },
              { opacity: 1, transform: "scale(1.15)", filter: "brightness(1.8)", offset: 0.6 },
              { opacity: 1, transform: "scale(1)", filter: "brightness(1)" },
            ],
            { duration: 600, delay, easing: "cubic-bezier(.2,.8,.2,1)", fill: "backwards" }
          );

          if (isBright(c)) {
            reveal.onfinish = () => {
              c.animate(
                [
                  { filter: "drop-shadow(0 0 0 rgba(251,68,184,0))" },
                  { filter: "drop-shadow(0 0 8px rgba(251,68,184,.9))" },
                  { filter: "drop-shadow(0 0 0 rgba(251,68,184,0))" },
                ],
                {
                  duration: 2200 + Math.random() * 2000,
                  delay: Math.random() * 3000,
                  iterations: Infinity,
                  easing: "ease-in-out",
                }
              );
            };
          }
        });
      }, 100);
    };

    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !played) {
          played = true;
          play();
          io.disconnect();
        }
      },
      { threshold: 0.3 }
    );
    io.observe(sectionRef.current);

    return () => {
      io.disconnect();
      clearInterval(timer);
    };
  }, []);

  return (
    <section id="activity" className="activity-section" ref={sectionRef}>
      <div className="activity-graph-wrap">
        <div className="activity-ghost">COMMITS</div>

        <div className="github-activity">
          <div className="github-activity-inner" ref={graphRef}>
            <GitHubContributionGraph
              username={USER}
              theme={{
                bgColor: "transparent",
                textColor: "#a1a1aa",
                inactiveTextColor: "#52525b",
                cellLevel0: "#281526",
                cellLevel1: "#4f0f40",
                cellLevel2: "#88236f",
                cellLevel3: "#b62d8d",
                cellLevel4: "#fb44b8",
                cellSize: CELL,
                cellGap: GAP,
                cellRadius: 5,
                cellBorderColor: "transparent",
                cellOutlineColor: "transparent",
                borderColor: "transparent",
                borderWidth: 0,
                cardPadding: 0,
                cardPaddingBlock: 0,
                cardRadius: 0,
                canvasPaddingTop: 4,
                canvasMarginInline: 0,
                fontFamily: "Inter, sans-serif",
              }}
              showHeader={false}
              showFooter={false}
              showThumbnail={false}
              showMonthLabels={true}
              showWeekdayLabels={true}
              showTooltips={true}
            />
          </div>
        </div>
      </div>

      {total !== null && (
        <p className="activity-count">
          <b><CountUp value={total} go={go} /></b> contributions 
        </p>
      )}
    </section>
  );
}