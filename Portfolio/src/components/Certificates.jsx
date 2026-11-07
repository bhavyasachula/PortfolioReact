// src/components/Certificates.jsx
import "./Certificates.css";

const certs = [
  { title: "Agentic AI Foundations Associate ", issuer: "Oracle", year: "2026", link: "https://catalog-education.oracle.com/ords/certview/sharebadge?id=ECD4794291FF3FAE42047E4FF296EB650C263326CD25284C8E7433C36CB104E5" },
  { title: "AWS Cloud Practitioner", issuer: "Amazon", year: "2021", link: "#" },
];

export default function Certificates() {
  return (
    <section id="certificates" className="cert-section">
      
      <div className="flex flex-wrap items-center justify-around w-full rounded-md p-2 gap-y-10">
        {certs.map((c, i) => (
          <a
            key={i}
            href={c.link}
            target="_blank"
            rel="noreferrer"
            className="cardds cert-card h-[600px] w-[34%] rounded-md"
          >
            <div className="cert-shade" />

            <div className="cert-top">
              <span className="cert-index">{String(i + 1).padStart(2, "0")}</span>
              <span className="cert-year">{c.year}</span>
            </div>

            <div className="cert-bottom">
              <h3 className="cert-title">{c.title}</h3>
              <div className="cert-meta">
                <span>{c.issuer}</span>
                <span className="cert-view">View credential ↗</span>
              </div>
            </div>

            <span className="cert-glare" />
          </a>
          
        ))}
      </div>
    </section>
  );
}