import galaxyStar from "../assets/galaxyStar.png";

function Navbar() {
  return (
    <nav className="navbar">
      <div className="nav-logo">
        <img src={galaxyStar} alt="Galaxy Star" />
      </div>

      <ul>
        <li><a href="#home">Home</a></li>
        <li><a href="#about">About</a></li>
        <li><a href="#TechStack">Tech Stack</a></li>
        <li><a href="#projects">Work</a></li>
        <li><a href="#contact" style={{ background: "rgba(212, 4, 249, 0.267)" }}>Let's Talk</a></li>
      </ul>
    </nav>
  );
}

export default Navbar;