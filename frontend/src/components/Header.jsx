
import { useEffect, useState } from "react";
 
const NAV_ITEMS = ["Home", "TV Shows", "Movies", "New & Popular", "My List"];
 
export default function Header({ brand = "CINEMAX" }) {
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState("Home");
 
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
 
  return (
    <header className={`site-header ${scrolled ? "scrolled" : ""}`}>
      <div className="header-left">
        <a className="brand" href="/">{brand}</a>
 
        <ul className="nav-links">
          {NAV_ITEMS.map((item) => (
            <li
              key={item}
              className={active === item ? "active" : ""}
              onClick={() => setActive(item)}
            >
              {item}
            </li>
          ))}
        </ul>
      </div>
 
      <div className="header-right">
        <div className="search-box">
          <span>🔍</span>
          <input type="text" placeholder="Titles, people, genres" />
        </div>
        <div className="profile-avatar">S</div>
      </div>
    </header>
  );
}
 
