import { useState } from "react";
import qr from "../assets/qrCodeEmail.png"// save your base64 QR as qr.png
import "./NewContact.css";

const MAIL = "bhavyasachula07@gmail.com";
const info = [
  ["NAME", "Bhavya Sachula"],
  ["FIELD", "AI / Agentic systems"],
  ["LOCATION", "Ahmedabad, Gujarat"],
  ["TIMEZONE", "IST (UTC +05:30)"],
];
const links = [
  ["GitHub", "github.com/bhavyasachula", "@bhavyasachula"],
  ["LinkedIn", "linkedin.com/in/bhavyasachula", "/in/bhavyasachula"],
  ["X / Twitter", "x.com/bhavyasachula", "@bhavyasachula"],
  ["LeetCode", "leetcode.com/SabkaBaap", "/bhavyasachula"],
];
const now = [
  ["BUILDING", "Agentic automation"],
  ["LEARNING", "RAG evaluation"],
  ["READING", "Designing Data-Intensive Apps"],
];

export default function Contact() {
  const [state, setState] = useState("Copy");

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(MAIL);
      setState("Copied!");
    } catch {
      setState("Failed");
    }
    setTimeout(() => setState("Copy"), 2000);
  };

  return (
    <section className="contact" id="contact">
      <div className="board">

        <div className="pins">
          {/* index card */}
          <div className="item card">
            <i className="pin" />
            <div className="paper">
              <div className="c-head">Card catalogue · Subject: Contact Fields</div>
              <div className="rows">
                {info.slice(0, 2).map(([k, v]) => (
                  <div className="row" key={k}><span className="k">{k}</span><span>{v}</span></div>
                ))}
                <div className="row">
                  <span className="k">EMAIL</span>
                  <span className="mail-cell">
                    <a href={`mailto:${MAIL}`}>{MAIL}</a>
                    <button
                      type="button"
                      className={`copy-btn ${state === "Copied" ? "done" : ""}`}
                      onClick={copy}
                      aria-label="Copy email address"
                    >
                      {state}
                    </button>
                  </span>
                </div>
                {info.slice(2).map(([k, v]) => (
                  <div className="row" key={k}><span className="k">{k}</span><span>{v}</span></div>
                ))}
                <div className="row">
                  <span className="k">STATUS</span>
                  <span><b className="stamp">OPEN TO WORK</b></span>
                </div>
              </div>
            </div>
          </div>

          {/* yellow note */}
          <div className="item note yellow">
            <i className="tape l" /><i className="tape r" />
            <div className="nt">Say hello</div>
            <div className="hand big">Details are filed on the card —</div>
            <div className="hand">email, links, the lot.</div>
          </div>

          {/* pink note */}
          <div className="item note pink">
            <i className="tape" />
            <div className="nt">Elsewhere - tap to open</div>
            <ul className="links">
              {links.map(([name, url, handle]) => (
                <li key={name}>
                  <a href={`https://${url}`} target="_blank" rel="noopener noreferrer">
                    <b>{name}</b><span className="hd">{handle}</span><span className="ar">↗</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* currently */}
          <div className="item current">
            <i className="pin gold" />
            <div className="paper">
              <div className="l">Currently</div>
              <div className="t">What I'm up to</div>
              {now.map(([k, v]) => (
                <div className="row" key={k}><span className="k">{k}</span><span>{v}</span></div>
              ))}
            </div>
          </div>

          {/* scrap */}
          <div className="item scrap">
            <i className="tape" />
            <div className="paper">
              <div className="l">Availability</div>
              <div className="v">Full time &amp; advisory</div>
              <div className="sep" />
              <div className="l">Response</div>
              <div className="v">Within a day</div>
            </div>
          </div>

          {/* QR */}
          <div className="item qr">
            <i className="tape" />
            <div className="paper">
              <img src={qr} alt="QR code to email Bhavya" />
              <div className="l">Scan to email</div>
              <div className="v">Point your phone here</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}