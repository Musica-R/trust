import React, { useState, useRef, useEffect, useCallback } from "react";
import { Link } from "react-router-dom";
import { FaUtensils, FaWheelchair, FaBus, FaClinicMedical, FaTint, FaHome, FaArrowRight, FaWind, FaBed, FaProcedures, FaWalking, FaLeaf, FaQuoteLeft, FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { useLang } from "../context/LangContext";
import { img, helpImgs } from "../data/images";
import { trust } from "../data/content";
import Trustees from "../components/Trustees";
import { AnimText, Stagger, Reveal } from "../components/Reveal";
import "../Stylesheet/pages.css";
import "../Stylesheet/home.css";

const icons = [FaUtensils, FaWheelchair, FaBus, FaClinicMedical, FaTint, FaHome];
const eqIcons = [FaWind, FaWheelchair, FaBed, FaProcedures, FaTint, FaWalking];
const rupee = (n) => "₹" + n.toLocaleString("en-IN");
const pad = (n) => String(n).padStart(2, "0");

/* ---------- "How we help": scroll-snap rail with image cards ---------- */
function HelpRail({ items }) {
  const rail = useRef(null);
  const raf = useRef(0);
  const drag = useRef({ on: false, x: 0, left: 0, moved: false });
  const [prog, setProg] = useState(0);
  const [active, setActive] = useState(0);
  const [edge, setEdge] = useState({ start: true, end: false });
  const [dragging, setDragging] = useState(false);

  // progress, active card, and per-card parallax offset (--off from -1 to 1)
  const update = useCallback(() => {
    const el = rail.current;
    if (!el) return;
    const max = el.scrollWidth - el.clientWidth;
    setProg(max > 0 ? el.scrollLeft / max : 0);
    setEdge({ start: el.scrollLeft < 4, end: el.scrollLeft >= max - 4 });
    const mid = el.scrollLeft + el.clientWidth / 2;
    let best = 0;
    let bestD = Infinity;
    Array.from(el.children).forEach((c, i) => {
      const d = c.offsetLeft + c.offsetWidth / 2 - mid;
      c.style.setProperty("--off", Math.max(-1, Math.min(1, d / el.clientWidth)).toFixed(3));
      if (Math.abs(d) < bestD) { bestD = Math.abs(d); best = i; }
    });
    setActive(best);
  }, []);

  useEffect(() => {
    const el = rail.current;
    if (!el) return undefined;
    const onScroll = () => {
      cancelAnimationFrame(raf.current);
      raf.current = requestAnimationFrame(update);
    };
    update();
    el.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      cancelAnimationFrame(raf.current);
      el.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [update, items.length]);

  // cards animate in one by one as they enter the visible rail
  useEffect(() => {
    const el = rail.current;
    if (!el) return undefined;
    const cards = Array.from(el.querySelectorAll(".bct-hw-inner"));
    if (!("IntersectionObserver" in window)) {
      cards.forEach((c) => c.classList.add("bct-hw-in"));
      return undefined;
    }
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => {
        if (e.isIntersecting) { e.target.classList.add("bct-hw-in"); io.unobserve(e.target); }
      }),
      { root: null, threshold: 0.2 }
    );
    cards.forEach((c) => io.observe(c));
    return () => io.disconnect();
  }, [items.length]);

  const goTo = (i) => {
    const el = rail.current;
    const card = el && el.children[Math.max(0, Math.min(items.length - 1, i))];
    if (!card) return;
    el.scrollTo({ left: card.offsetLeft - (el.clientWidth - card.offsetWidth) / 2, behavior: "smooth" });
  };

  // mouse drag-to-scroll (touch uses native swipe)
  const onMouseDown = (e) => {
    drag.current = { on: true, x: e.pageX, left: rail.current.scrollLeft, moved: false };
  };
  const onMouseMove = (e) => {
    const d = drag.current;
    if (!d.on) return;
    const dx = e.pageX - d.x;
    if (Math.abs(dx) > 5) { d.moved = true; setDragging(true); }
    if (d.moved) rail.current.scrollLeft = d.left - dx;
  };
  const endDrag = () => {
    if (!drag.current.on) return;
    drag.current.on = false;
    if (drag.current.moved) {
      setDragging(false);
      // snap to the nearest card after the drag
      requestAnimationFrame(() => goTo(active));
    }
  };
  const onKeyDown = (e) => {
    if (e.key === "ArrowRight") { e.preventDefault(); goTo(active + 1); }
    if (e.key === "ArrowLeft") { e.preventDefault(); goTo(active - 1); }
  };

  const onImgError = (e) => {
    if (e.currentTarget.dataset.fb) return;
    e.currentTarget.dataset.fb = "1";
    e.currentTarget.src = img.hero;
  };

  return (
    <div className="bct-hw">
      <div className="bct-hw-ctrl">
        <button type="button" className="bct-hw-btn" aria-label="Previous" disabled={edge.start} onClick={() => goTo(active - 1)}><FaChevronLeft /></button>
        <button type="button" className="bct-hw-btn" aria-label="Next" disabled={edge.end} onClick={() => goTo(active + 1)}><FaChevronRight /></button>
      </div>

      <div
        ref={rail}
        className={`bct-hw-rail ${dragging ? "bct-hw-drag" : ""}`}
        tabIndex={0}
        onKeyDown={onKeyDown}
        onMouseDown={onMouseDown}
        onMouseMove={onMouseMove}
        onMouseUp={endDrag}
        onMouseLeave={endDrag}
        onClickCapture={(e) => { if (drag.current.moved) { e.preventDefault(); e.stopPropagation(); drag.current.moved = false; } }}
      >
        {items.map(([title, text], i) => {
          const Icon = icons[i];
          return (
            <article key={i} className={`bct-hw-card ${active === i ? "bct-hw-active" : ""}`} style={{ "--i": i }}>
              <div className="bct-hw-inner">
                <div className="bct-hw-pic">
                  <img src={helpImgs[i] || img.hero} alt={title} loading="lazy" draggable="false" onError={onImgError} />
                  <span className="bct-hw-no">{pad(i + 1)}</span>
                </div>
                <span className="bct-hw-ico"><Icon /></span>
                <div className="bct-hw-body">
                  <h3>{title}</h3>
                  <p>{text}</p>
                </div>
                <div className="bct-hw-foot">
                  <span>{pad(i + 1)} / {pad(items.length)}</span>
                  <Link to="/activities" aria-label={title}><FaArrowRight /></Link>
                </div>
              </div>
            </article>
          );
        })}
      </div>

      <div className="bct-hw-prog">
        <div className="bct-hw-bar"><span style={{ transform: `scaleX(${0.16 + 0.84 * prog})` }} /></div>
        <b>{pad(active + 1)} / {pad(items.length)}</b>
      </div>
    </div>
  );
}

export default function Home() {
  const { t } = useLang();
  const h = t.home;
  const [tab, setTab] = useState(0);
  return (
    <>
      <section className="bct-hero" style={{ backgroundImage: `linear-gradient(105deg,rgba(20,41,29,.9),rgba(20,41,29,.45)),url(${"/assets/trust16.jpeg"})` }}>
        <div className="bct-wrap bct-hero-in">
          <AnimText as="h1" text={h.title} step={110} />
          <AnimText text={h.sub} className="bct-hero-sub" step={45} />
          <Reveal delay={600} className="bct-btns">
            <Link to="/contact" className="bct-btn bct-btn-gold">{h.donate}</Link>
            <Link to="/about" className="bct-btn bct-btn-line">{h.learn}</Link>
          </Reveal>
        </div>
      </section>

      <section className="bct-impact">
        <Stagger className="bct-impact-grid" step={150}>
          {h.impact.map(([n, l]) => (
            <div key={l} className="bct-impact-item"><b>{n}</b><span>{l}</span></div>
          ))}
        </Stagger>
      </section>

      {/* Story: overlapping photo collage + pull quote */}
      <section className="bct-sec bct-story">
        <div className="bct-wrap bct-story-grid">
          <Reveal className="bct-collage">
            <img className="bct-collage-a" src="/assets/trust3.jpeg" alt="" loading="lazy" />
            <img className="bct-collage-b" src="/assets/trust21.jpeg" alt="" loading="lazy" />
            <div className="bct-collage-badge"><b>{trust.reg}</b><span>{t.reg}</span></div>
          </Reveal>
          <div>
            <AnimText as="h2" text={t.story.title} className="bct-h2" step={90} />
            <AnimText text={t.story.text} className="bct-body" step={30} />
            <Stagger className="bct-story-pts" step={160}>
              {t.story.points.map((p) => <p key={p}><FaLeaf /> {p}</p>)}
            </Stagger>
            <p className="bct-quote"><FaQuoteLeft /> {t.motto}</p>
          </div>
        </div>
      </section>

      {/* How we help: image cards in a scroll-snap rail */}
      <section className="bct-sec bct-sec-tint">
        <div className="bct-wrap">
          <AnimText as="h2" text={h.whatTitle} className="bct-h2" step={90} />
          <AnimText text={h.whatSub} className="bct-lead" step={40} />
          <HelpRail items={t.act.items} />
          <Reveal className="bct-center">
            <Link to="/activities" className="bct-more">{h.moreLink} <FaArrowRight /></Link>
          </Reveal>
        </div>
      </section>

      {/* Equipment profile cards */}
      <section className="bct-sec bct-eq">
        <div className="bct-wrap">
          <AnimText as="h2" text={t.equipHome.title} className="bct-h2" step={90} />
          <AnimText text={t.equipHome.sub} className="bct-lead" step={40} />
          <Stagger className="bct-eq-grid" step={130}>
            {t.act.equip.map((name, i) => {
              const Icon = eqIcons[i];
              return (
                <article key={name} className="bct-eq-card">
                  <span className="bct-eq-ico"><Icon /></span>
                  <h3>{name}</h3>
                  <p>{t.equipDesc[i]}</p>
                  <div className="bct-eq-foot">
                    <b>{rupee(trust.equipment[i])}</b>
                    <Link to="/contact">{t.equipHome.sponsor}</Link>
                  </div>
                </article>
              );
            })}
          </Stagger>
        </div>
      </section>

      {/* Activity journal with tabs */}
      <section className="bct-sec bct-sec-tint">
        <div className="bct-wrap">
          <AnimText as="h2" text={t.journal.title} className="bct-h2" step={90} />
          <AnimText text={t.journal.sub} className="bct-lead" step={40} />
          <div className="bct-tabs" role="tablist">
            {t.journal.tabs.map((name, i) => (
              <button key={name} role="tab" aria-selected={tab === i} className={`bct-tab ${tab === i ? "bct-tab-on" : ""}`} onClick={() => setTab(i)}>
                {name} <em>{t.journal.items[i].length}</em>
              </button>
            ))}
          </div>
          <Stagger key={tab + t.journal.tabs[0]} className="bct-jr" step={110}>
            {t.journal.items[tab].map((text) => (
              <div key={text} className="bct-jr-item"><span className="bct-jr-dot" /><p>{text}</p></div>
            ))}
          </Stagger>
        </div>
      </section>

      <Trustees />

      <section className="bct-appeal" style={{ backgroundImage: `linear-gradient(rgba(31,61,43,.9),rgba(31,61,43,.9)),url(${img.support})` }}>
        <div className="bct-wrap bct-appeal-in">
          <AnimText as="h2" text={h.appealTitle} step={100} />
          <AnimText text={h.appealText} step={40} />
          <Reveal delay={400}><Link to="/contact" className="bct-btn bct-btn-gold">{h.donate}</Link></Reveal>
        </div>
      </section>
    </>
  );
}