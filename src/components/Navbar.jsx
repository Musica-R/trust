import { useState, useEffect } from "react";
import { NavLink, Link, useLocation } from "react-router-dom";
import { FiMenu, FiX, FiGlobe } from "react-icons/fi";
import { useLang } from "../context/LangContext";
import "../Stylesheet/Navbar.css";

const LINKS = [
  { to: "/", end: true, en: "Home", ml: "ഹോം" },
  { to: "/about", en: "About", ml: "ഞങ്ങളെക്കുറിച്ച്" },
  { to: "/activities", en: "Activities", ml: "പ്രവർത്തനങ്ങൾ" },
  { to: "/dialysis-centre", en: "Dialysis Centre", ml: "ഡയാലിസിസ് കേന്ദ്രം" },
  { to: "/old-age-home", en: "Old Age Home", ml: "വൃദ്ധസദനം" },
  { to: "/gallery", en: "Gallery", ml: "ഗാലറി" },
  { to: "/contact", en: "Contact Us", ml: "ബന്ധപ്പെടുക" },
];

const BRAND = {
  en: {
    title: "Olappamanna Bhagavathi Charitable Trust",
    sub: "Ezhakkad, Mundur, Palakkad",
  },
  ml: {
    title: "ഓലപ്പമണ്ണ ഭഗവതി ചാരിറ്റബിൾ ട്രസ്റ്റ്",
    sub: "ഏഴക്കാട്, മുണ്ടൂർ, പാലക്കാട്",
  },
};

/* Language is shared through LangContext, so every page switches together.
   LangContext already saves the choice and sets <html lang>. */
export default function Navbar() {
  const { lang, setLang } = useLang();

  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { pathname } = useLocation();

  // Solid background after scrolling
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close mobile menu on route change + scroll to top
  useEffect(() => {
    setOpen(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [pathname]);

  // Close menu with Escape
  useEffect(() => {
    const onKey = (e) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const toggleLang = () => setLang(lang === "en" ? "ml" : "en");
  const brand = BRAND[lang];

  return (
    <header className={`bct-nav ${scrolled || open ? "bct-nav-solid" : ""}`}>
      <div className="bct-nav-inner">
        {/* Brand */}
        <Link to="/" className="bct-brand" aria-label={brand.title}>
          <img
            src="/assets/logo.jpeg"
            alt="Trust logo"
            className="bct-brand-logo"
            width="46"
            height="46"
          />
          <span className="bct-brand-text">
            <strong>{brand.title}</strong>
            <small>{brand.sub}</small>
          </span>
        </Link>

        {/* Menu */}
        <nav
          id="bct-menu"
          className={`bct-menu ${open ? "bct-menu-open" : ""}`}
          aria-label="Main navigation"
        >
          {LINKS.map((l) => (
            <NavLink
              key={l.to}
              to={l.to}
              end={l.end}
              className={({ isActive }) =>
                `bct-link ${isActive ? "bct-link-active" : ""}`
              }
            >
              {l[lang]}
            </NavLink>
          ))}
        </nav>

        {/* Tools */}
        <div className="bct-nav-tools">

          <button
            type="button"
            className="bct-lang"
            onClick={toggleLang}
            aria-label="Switch language"
          >
            <FiGlobe />
            <span>{lang === "en" ? "മലയാളം" : "English"}</span>
          </button>

          <button
            type="button"
            className="bct-burger"
            onClick={() => setOpen((o) => !o)}
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            aria-controls="bct-menu"
          >
            {open ? <FiX /> : <FiMenu />}
          </button>
        </div>
      </div>
    </header>
  );
}