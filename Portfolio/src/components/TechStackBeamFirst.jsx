import { motion } from "framer-motion";

const SIZE = 800;
const C = SIZE / 2;
const INNER_R = 150;
const OUTER_R = 310;
const NODE = 54;
const DURATION = 2.8;

const place = (items, radius, offset = 0) =>
  items.map((src, i) => {
    const a = (i / items.length) * 2 * Math.PI - Math.PI / 2 + offset;
    return { src, x: C + radius * Math.cos(a), y: C + radius * Math.sin(a) };
  });

function Pulse({ id, x, y, delay }) {
  const dx = C - x;
  const dy = C - y;
  return (
    <motion.linearGradient
      id={id}
      gradientUnits="userSpaceOnUse"
      initial={{ x1: x - dx * 0.4, y1: y - dy * 0.4, x2: x, y2: y }}
      animate={{
        x1: [x - dx * 0.4, x + dx],
        y1: [y - dy * 0.4, y + dy],
        x2: [x, x + dx * 1.4],
        y2: [y, y + dy * 1.4],
      }}
      transition={{ duration: DURATION, repeat: Infinity, ease: "linear", delay }}
    >
      <stop offset="0%" stopColor="#ffffff" stopOpacity="0" />
      <stop offset="40%" stopColor="#f5c9f3" />
      <stop offset="70%" stopColor="#e8c7f5" />
      <stop offset="100%" stopColor="#f472e9" stopOpacity="0" />
    </motion.linearGradient>
  );
}

function Beam({ x, y, i }) {
  const d = `M ${x} ${y} L ${C} ${C}`;
  const base = (i * 0.17) % DURATION;
  const idA = `beam-a-${i}`;
  const idB = `beam-b-${i}`;

  return (
    <g>
      <defs>
        <Pulse id={idA} x={x} y={y} delay={base} />
        <Pulse id={idB} x={x} y={y} delay={base + DURATION / 2} />
      </defs>

      {/* base line */}
      <path d={d} stroke="rgba(255, 255, 255, 0.07)" strokeWidth={1.5} fill="none" />

      {/* glow layers */}
      <path d={d} stroke={`url(#${idA})`} strokeWidth={6} fill="none" filter="url(#glow)" opacity={0.7} />
      <path d={d} stroke={`url(#${idB})`} strokeWidth={6} fill="none" filter="url(#glow)" opacity={0.7} />

      {/* sharp cores */}
      <path d={d} stroke={`url(#${idA})`} strokeWidth={1.8} strokeLinecap="round" fill="none" />
      <path d={d} stroke={`url(#${idB})`} strokeWidth={1.8} strokeLinecap="round" fill="none" />
    </g>
  );
}

export default function TechStackBeam({ images, name = "BHAVYA" }) {
  const innerCount = 10;
  const outer = images.slice(innerCount);
  const nodes = [
    ...place(images.slice(0, innerCount), INNER_R),
    ...place(outer, OUTER_R, Math.PI / outer.length),
  ];

  return (
    <div className="relative flex min-h-screen w-full items-center justify-center overflow-hidden ">
      {/* ambient background */}
      <div className="pointer-events-none absolute inset-0 ,transparent_55%)]" />
      <div className="pointer-events-none absolute left-1/4 top-1/4 h-96 w-96 rounded-full bg-cyan-500/10 blur-3xl" />
      <div className="pointer-events-none absolute bottom-1/4 right-1/4 h-96 w-96 rounded-full bg-fuchsia-500/10 blur-3xl" />

      <div className="relative" style={{ width: SIZE, height: SIZE }}>
        <svg
          width={SIZE}
          height={SIZE}
          viewBox={`0 0 ${SIZE} ${SIZE}`}
          className="pointer-events-none absolute inset-0"
        >
          <defs>
            <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur stdDeviation="4" />
            </filter>
          </defs>

          {/* orbit rings */}
          <circle cx={C} cy={C} r={INNER_R} fill="none" stroke="rgba(255,255,255,0.06)" strokeDasharray="3 6" />
          <circle cx={C} cy={C} r={OUTER_R} fill="none" stroke="rgba(255,255,255,0.06)" strokeDasharray="3 6" />

          {nodes.map((n, i) => (
            <Beam key={i} i={i} x={n.x} y={n.y} />
          ))}
        </svg>

        {/* logos */}
        {nodes.map((n, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, scale: 0.6 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: i * 0.04, type: "spring", stiffness: 160, damping: 14 }}
            whileHover={{ scale: 1.2 }}
            className="absolute z-10 flex items-center justify-center rounded-full bg-white/95 p-2.5 ring-1 ring-white/40 shadow-[0_0_24px_rgba(167,139,250,0.35)]"
            style={{ width: NODE, height: NODE, left: n.x - NODE / 2, top: n.y - NODE / 2 }}
          >
            <img src={n.src} alt="" className="h-full w-full object-contain" />
          </motion.div>
        ))}

        {/* center */}
        <div
          className="absolute z-20 -translate-x-1/2 -translate-y-1/2"
          style={{ left: C, top: C }}
        >
          {/* <motion.span
            className="absolute inset-0 rounded-full bg-violet-500/30"
            animate={{ scale: [1, 1.5], opacity: [0.5, 0] }}
            transition={{ duration: 2.2, repeat: Infinity, ease: "easeOut" }}
          /> */}
          {/* <motion.span
            className="absolute inset-0 rounded-full bg-cyan-400/20"
            animate={{ scale: [1, 1.9], opacity: [0.4, 0] }}
            transition={{ duration: 2.2, repeat: Infinity, ease: "easeOut", delay: 0.7 }}
          /> */}
          <div className="relative whitespace-nowrap rounded-full border border-white/20 bg-[#0b0d1a]/90 px-7 py-3.5 text-lg font-semibold tracking-wide text-white shadow-[0_0_50px_rgba(99,102,241,0.55)] backdrop-blur">
            
              {name}
         
          </div>
        </div>
      </div>
    </div>
  );
}