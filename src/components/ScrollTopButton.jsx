import React, { useEffect, useState } from "react";
import { FaArrowUp, FaWhatsapp, FaPhoneAlt } from "react-icons/fa";
import { trust } from "../data/content"; // <-- adjust this path to where your content file lives
import "../Stylesheet/scrolltop.css";

const R = 22;
const C = 2 * Math.PI * R;

const digits = trust.phone.replace(/\D/g, ""); // "918714560216"
const WA_LINK = `https://wa.me/${digits}?text=${encodeURIComponent(
  "Hello, I would like to know more about Olappamanna Bhagavathi Charitable Trust."
)}`;
const TEL_LINK = `tel:${trust.phone}`;

export default function ScrollTopButton() {
  const [show, setShow] = useState(false);
  const [prog, setProg] = useState(0);

  useEffect(() => {
    let raf = 0;
    const update = () => {
      const y = window.scrollY || document.documentElement.scrollTop;
      const max = document.documentElement.scrollHeight - window.innerHeight;
      setShow(y > 400);
      setProg(max > 0 ? Math.min(1, y / max) : 0);
    };
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  const goTop = () => {
    const reduce =
      window.matchMedia &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    window.scrollTo({ top: 0, left: 0, behavior: reduce ? "instant" : "smooth" });
  };

  return (
    <div className="bct-fab">
      {/* Scroll to top (appears after scrolling) */}
      <button
        type="button"
        className={`bct-stt ${show ? "bct-stt-show" : ""}`}
        onClick={goTop}
        aria-label="Scroll to top"
        tabIndex={show ? 0 : -1}
      >
        <svg className="bct-stt-ring" viewBox="0 0 52 52" aria-hidden="true">
          <circle className="bct-stt-track" cx="26" cy="26" r={R} />
          <circle
            className="bct-stt-bar"
            cx="26"
            cy="26"
            r={R}
            strokeDasharray={C}
            strokeDashoffset={C * (1 - prog)}
          />
        </svg>
        <FaArrowUp className="bct-stt-ico" />
      </button>

      {/* Call */}
      <a
        className="bct-fab-btn bct-fab-call"
        href={TEL_LINK}
        aria-label="Call us"
        title="Call us"
      >
        <FaPhoneAlt />
      </a>

      {/* WhatsApp */}
      <a
        className="bct-fab-btn bct-fab-wa"
        href={WA_LINK}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat on WhatsApp"
        title="Chat on WhatsApp"
      >
        <FaWhatsapp />
      </a>
    </div>
  );
}