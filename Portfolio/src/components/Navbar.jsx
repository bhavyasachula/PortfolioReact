// import galaxyStar from "../assets/galaxyStar.png"
import galaxyStar from "../assets/galaxyStar.png"; 

function Navbar() {
  const navLinks = [
    { href: "#home", label: "Home" },
    { href: "#about", label: "About" },
    { href: "#TechStack", label: "Tech Stack" },
    { href: "#projects", label: "Work" },
  ];

  return (
    <nav className="navbar">
      <div className="nav-logo">
        <img src={galaxyStar} alt="Galaxy Star" />
      </div>

      <ul>
        {navLinks.map((link) => (
          <li key={link.href}>
            <a href={link.href} className="reel-link">
              <span className="reel-inner">
                <span className="reel-text">{link.label}</span>
                <span className="reel-text">{link.label}</span>
              </span>
            </a>
          </li>
        ))}
        <li>
          <a href="#contact" style={{ background: "rgba(212, 4, 249, 0.267)" }}>
            Let's Talk
          </a>
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;