import { useState } from "react";
import { scroller } from "react-scroll";

import { useBlobTransition, BlobOverlay } from "./BlobTransition";

import galaxyStar from "../assets/galaxyStar.png";

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  const { canvasRef, play: playBlob } = useBlobTransition();

  const navLinks = [
    { to: "home", label: "Home" },
    { to: "about", label: "About" },
    { to: "TechStack", label: "Tech Stack" },
    { to: "projects", label: "Work" },
    { to: "contact", label: "Let's Talk" },
  ];

  function goTo(id) {
    setMenuOpen(false);

    playBlob(() => {
      scroller.scrollTo(id, {
        smooth: false,
        duration: 0,
        offset: -100,
      });
    });
  }

  return (
    <>
      <BlobOverlay canvasRef={canvasRef} />

      <nav className="navbar">
        <div className="nav-logo">
          <img src={galaxyStar} alt="Galaxy Star" />
        </div>

        <ul className="desktop-links">
          {navLinks.map((link) => (
            <li key={link.to}>
              <span
                className="reel-link"
                onClick={() => goTo(link.to)}
                style={{ cursor: "pointer" }}
              >
                <span className="reel-inner">
                  <span className="reel-text">{link.label}</span>

                  <span className="reel-text">{link.label}</span>
                </span>
              </span>
            </li>
          ))}
        </ul>

        <button
          className={`hamburger ${menuOpen ? "open" : ""}`}
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"

          
        ><span></span>
        <span></span>
        <span></span>
        </button>

        
      </nav>

      <div className={`mobile-menu-overlay ${menuOpen ? "active" : ""}`}>
        <div className="mobile-menu-row">
          {navLinks.slice(0, 3).map((link) => (
            <span
              key={link.to}
              className="mobile-pill"
              onClick={() => goTo(link.to)}
              style={{ cursor: "pointer" }}
            >
              {link.label}
            </span>
          ))}
        </div>

        <div className="mobile-menu-row">
          {navLinks.slice(3).map((link) => (
            <span
              key={link.to}
              className="mobile-pill"
              onClick={() => goTo(link.to)}
              style={{ cursor: "pointer" }}
            >
              {link.label}
            </span>
          ))}
        </div>
      </div>
    </>
  );
}

export default Navbar;
