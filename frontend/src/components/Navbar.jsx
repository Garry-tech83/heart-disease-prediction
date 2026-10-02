import { HeartPulse, Info } from "lucide-react";

function Navbar() {
  return (
    <nav className="navbar">
      <div className="nav-container">
        <div className="brand">
          <div className="brand-icon">
            <HeartPulse size={22} />
          </div>

          <span>HeartGuard</span>
        </div>

        <button className="about-button">
          <Info size={17} />
          <span>About</span>
        </button>
      </div>
    </nav>
  );
}

export default Navbar;