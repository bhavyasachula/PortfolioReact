import { useState } from 'react';
import { Link } from 'react-scroll';
import galaxyStar from "../assets/galaxyStar.png"
function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  const navLinks = [
    { to: "home", label: "Home" },
    { to: "about", label: "About" },
    { to: "TechStack", label: "Tech Stack" },
    { to: "projects", label: "Work" },
    { to: "contact", label: "Let's Talk" }
  ];

  function handleLinkClick() {
    setMenuOpen(false);
  }

  return (
    <>
      <nav className="navbar">
        <div className="nav-logo">
          <img src={galaxyStar} alt="Galaxy Star" />
        </div>

        <ul className="desktop-links">
          {navLinks.map((link) => (
            <li key={link.to}>
              <Link to={link.to} smooth={true} duration={1200} offset={-100} className="reel-link">
                <span className="reel-inner">
                  <span className="reel-text">{link.label}</span>
                  <span className="reel-text">{link.label}</span>
                </span>
              </Link>
            </li>
          ))}
        </ul>

        <button
          className={`hamburger ${menuOpen ? 'open' : ''}`}
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          <span></span>
          <span></span>
          <span></span>
        </button>
      </nav>

      <div className={`mobile-menu-overlay ${menuOpen ? 'active' : ''}`}>
        <div className="mobile-menu-row">
          {navLinks.slice(0, 3).map((link) => (
            <Link
              key={link.to}
              to={link.to}
              smooth={true}
              duration={1200}
              offset={-100}
              className="mobile-pill"
              onClick={handleLinkClick}
            >
              {link.label}
            </Link>
          ))}
        </div>
        <div className="mobile-menu-row">
          {navLinks.slice(3).map((link) => (
            <Link
              key={link.to}
              to={link.to}
              smooth={true}
              duration={1200}
              offset={-100}
              className="mobile-pill"
              onClick={handleLinkClick}
            >
              {link.label}
            </Link>
          ))}
        </div>
      </div>
    </>
  );
}

export default Navbar;