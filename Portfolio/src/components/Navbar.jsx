import { Link } from 'react-scroll';
import galaxyStar from "../assets/galaxyStar.png"

function Navbar() {
  const navLinks = [
    { to: "home", label: "Home" },
    { to: "about", label: "About" },
    { to: "TechStack", label: "Tech Stack" },
    { to: "projects", label: "Work" },
    { to: "contact", label: "Let's Talk" }
  ];

  return (
    <nav className="navbar">
      <div className="nav-logo">
        <img src={galaxyStar} alt="Galaxy Star" />
      </div>

      <ul>
        {navLinks.map((link) => (
          <li key={link.to}>
            <Link
              to={link.to}
              smooth={true}
              duration={1200}
              offset={-100}
              className="reel-link"
            >
              <span className="reel-inner">
                <span className="reel-text">{link.label}</span>
                <span className="reel-text">{link.label}</span>
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}

export default Navbar;