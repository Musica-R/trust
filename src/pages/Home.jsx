import React, { useState, useRef, useEffect, useCallback } from "react";
import { Link } from "react-router-dom";
import { FaUtensils, FaWheelchair, FaBus, FaClinicMedical, FaTint, FaHome, FaArrowRight, FaWind, FaBed, FaProcedures, FaWalking, FaLeaf, FaQuoteLeft, FaChevronLeft, FaChevronRight, FaCheckCircle, FaPlaceOfWorship, FaHandHoldingHeart, FaPrayingHands, FaCompass, FaUsers, FaCalendarAlt, FaLandmark } from "react-icons/fa";
import { useLang } from "../context/LangContext";
import { img, helpImgs, homeGallery } from "../data/images";
import { trust } from "../data/content";
import Trustees from "../components/Trustees";
import { AnimText, Stagger, Reveal } from "../components/Reveal";
import "../Stylesheet/pages.css";
import "../Stylesheet/home.css";
import "../Stylesheet/caption.css";

const icons = [FaUtensils, FaWheelchair, FaBus, FaClinicMedical, FaTint, FaHome];
const eqIcons = [FaWind, FaWheelchair, FaBed, FaProcedures, FaTint, FaWalking];
const shrineIcons = [FaPrayingHands, FaCompass, FaUsers];
const rupee = (n) => "₹" + n.toLocaleString("en-IN");
const pad = (n) => String(n).padStart(2, "0");

/* ---------- Trust caption + milestones (client request) ---------- */
const caption = {
  en: { main: "Sahajeevanam Kshethrangaliloode", sub: "(Coexistence through Temples)" },
  ml: { main: "സഹജീവനം ക്ഷേത്രങ്ങളിലൂടെ", sub: "(ക്ഷേത്രങ്ങളിലൂടെ സഹവർത്തിത്വം)" },
};

const timeline = {
  en: {
    title: "Our Journey",
    items: [
      ["2022", "Trust Established", "Registered as No. 357/4/2022 at Thiru Kunnappullikkavu, Ezhakkad."],
      ["2024", "Trust Building Inauguration", "The new Olappamanna Charitable Trust building was inaugurated."],
    ],
  },
  ml: {
    title: "ഞങ്ങളുടെ യാത്ര",
    items: [
      ["2022", "ട്രസ്റ്റ് സ്ഥാപിതമായി", "എഴക്കാട് തിരുകുന്നപ്പുള്ളിക്കാവിൽ രജിസ്ട്രേഷൻ നമ്പർ 357/4/2022 ആയി സ്ഥാപിതം."],
      ["2024", "ട്രസ്റ്റ് കെട്ടിട ഉദ്ഘാടനം", "ഒളപ്പമണ്ണ ചാരിറ്റബിൾ ട്രസ്റ്റിന്റെ പുതിയ കെട്ടിടത്തിന്റെ ഉദ്ഘാടനം."],
    ],
  },
};

/* Full-width highlighted trust caption (styles in Stylesheet/caption.css) */
function CaptionBanner({ lang }) {
  const c = caption[lang] || caption.en;
  return (
    <section className="bct-cap" aria-label={`${c.main} ${c.sub}`}>
      <Reveal key={`cap-${lang}`} className="bct-cap-in">
        <div className="bct-cap-orn" aria-hidden="true"><span /><FaPlaceOfWorship /><span /></div>
        <h2 className="bct-cap-main">{c.main}</h2>
        <p className="bct-cap-sub">{c.sub}</p>
      </Reveal>
    </section>
  );
}

/* 2022 -> 2024 milestone cards */
function Timeline({ lang }) {
  const tl = timeline[lang] || timeline.en;
  return (
    <div>
      <h3 className="bct-tl-title"><FaLandmark /> {tl.title}</h3>
      <Stagger key={`tl-${lang}`} className="bct-tl" step={250} from="bottom">
        {tl.items.map(([year, label, text]) => (
          <article key={year} className="bct-tl-item">
            <span className="bct-tl-year">{year}</span>
            <h3>{label}</h3>
            <p>{text}</p>
          </article>
        ))}
      </Stagger>
    </div>
  );
}

const prefersReduced = () =>
  typeof window !== "undefined" &&
  window.matchMedia &&
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

/* ---------- adds "bct-in" once the element scrolls into view (runs once) ---------- */
function InView({ as: Tag = "div", className = "", threshold = 0.2, children, ...rest }) {
  const ref = useRef(null);
  const [on, setOn] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return undefined;
    if (!("IntersectionObserver" in window)) { setOn(true); return undefined; }
    const io = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) { setOn(true); io.disconnect(); }
      },
      { threshold }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [threshold]);

  return (
    <Tag ref={ref} className={`${className} ${on ? "bct-in" : ""}`} {...rest}>
      {children}
    </Tag>
  );
}

/* ---------- impact numbers count up when visible ---------- */
function CountUp({ value }) {
  const str = String(value);
  const m = str.match(/\d[\d,]*/);
  const ref = useRef(null);
  const target = m ? parseInt(m[0].replace(/,/g, ""), 10) : 0;
  const [n, setN] = useState(m && !prefersReduced() ? 0 : target);

  useEffect(() => {
    const el = ref.current;
    if (!m || !el || prefersReduced()) return undefined;
    let raf = 0;
    const run = () => {
      const start = performance.now();
      const dur = 2000;
      const tick = (now) => {
        const p = Math.min(1, (now - start) / dur);
        const eased = 1 - Math.pow(1 - p, 3);
        setN(Math.round(target * eased));
        if (p < 1) raf = requestAnimationFrame(tick);
      };
      raf = requestAnimationFrame(tick);
    };
    if (!("IntersectionObserver" in window)) { setN(target); return undefined; }
    const io = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) { run(); io.disconnect(); }
      },
      { threshold: 0.6 }
    );
    io.observe(el);
    return () => { io.disconnect(); cancelAnimationFrame(raf); };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [target]);

  if (!m) return <b ref={ref}>{value}</b>;
  const shown = m[0].includes(",") ? n.toLocaleString("en-IN") : String(n);
  return (
    <b ref={ref}>
      {str.slice(0, m.index)}
      {shown}
      {str.slice(m.index + m[0].length)}
    </b>
  );
}

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
  const { t, lang } = useLang();
  const h = t.home;
  const m = t.homeMore || {};
  const tp = t.homeTemple || {};
  const sh = t.homeShrine || {};
  const qt = t.homeQuotes || { items: [] };
  const [tab, setTab] = useState(0);

  const onImgError = (e) => {
    if (e.currentTarget.dataset.fb) return;
    e.currentTarget.dataset.fb = "1";
    e.currentTarget.src = img.hero;
  };

  return (
    <>


      <section className="bct-hero">
        <div className="bct-hero-bg bct-hero-bg-l" style={{ backgroundImage: "url(/assets/cnew3.jpeg)" }} />
        <div className="bct-hero-bg bct-hero-bg-r" style={{ backgroundImage: "url(/assets/cnew4.jpeg)" }} />

        <div className="bct-wrap bct-hero-in">
          <div className="bct-hero-side bct-hero-left">
            <AnimText key={`t-${lang}`} as="h1" text={h.title} step={110} />
          </div>

          <Reveal delay={200} className="bct-hero-oval">
            <img src="/assets/cnew3.jpeg" alt="" />
          </Reveal>

          <div className="bct-hero-side bct-hero-right">
            <AnimText key={`s-${lang}`} text={h.sub} className="bct-hero-sub" step={45} />
            <Reveal delay={600} className="bct-btns">
              <Link to="/contact" className="bct-btn bct-btn-gold">{h.donate}</Link>
              <Link to="/about" className="bct-btn bct-btn-line">{h.learn}</Link>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Trust caption: Sahajeevanam Kshethrangaliloode */}
      <CaptionBanner lang={lang} />

      {/* <section className="bct-impact">
        <Stagger key={`i-${lang}`} className="bct-impact-grid" step={200}>
          {h.impact.map(([n, l]) => (
            <div key={l} className="bct-impact-item"><CountUp value={n} /><span>{l}</span></div>
          ))}
        </Stagger>
      </section> */}

      {/* Story: photos slide in left to right + pull quote */}
      <section className="bct-sec bct-story">
        <div className="bct-wrap bct-story-grid">
          <InView key={`co-${lang}`} className="bct-collage bct-lr" threshold={0.25}>
            <img className="bct-collage-a" src="/assets/trust3.jpeg" alt="" loading="lazy" />
            <img className="bct-collage-b" src="/assets/trust21.jpeg" alt="" loading="lazy" />
            <div className="bct-collage-badge"><b>{trust.reg}</b><span>{t.reg}</span></div>
          </InView>
          <div>
            <AnimText key={`st-${lang}`} as="h2" text={t.story.title} className="bct-h2" step={90} />
            <AnimText key={`sx-${lang}`} text={t.story.text} className="bct-body" step={30} />

            {/* Established 2022 / Building inauguration 2024 */}
            <Timeline lang={lang} />

            <Stagger key={`sp-${lang}`} className="bct-story-pts" step={160}>
              {t.story.points.map((p) => <p key={p}><FaLeaf /> {p}</p>)}
            </Stagger>
            <p className="bct-quote"><FaQuoteLeft /> {t.motto}</p>
          </div>
        </div>
      </section>

      {/* About the temple: deity image + intro, then darshanam, management + major festivals */}
      {sh.title && (
        <section className="bct-sec bct-sh">
          <div className="bct-wrap">
            <div className="bct-sh-top">
              <InView key={`shp-${lang}`} className="bct-sh-pic" threshold={0.25}>
                <div className="bct-sh-frame">
                  <img src="/assets/god.jpeg" alt={sh.title} loading="lazy" draggable="false" />
                </div>
              </InView>

              <div className="bct-sh-intro">
                <span className="bct-sh-tag"><FaPlaceOfWorship /> {sh.tag}</span>
                <AnimText key={`sht-${lang}`} as="h2" text={sh.title} className="bct-h2" step={90} />
                <AnimText key={`shx-${lang}`} text={sh.text} className="bct-lead" step={36} />
              </div>
            </div>

            <Stagger key={`shf-${lang}`} className="bct-sh-facts" step={200} from="bottom">
              {sh.facts.map(([label, value], i) => {
                const Icon = shrineIcons[i] || FaPlaceOfWorship;
                return (
                  <article key={label} className="bct-sh-fact">
                    <span className="bct-sh-ico"><Icon /></span>
                    <h3>{label}</h3>
                    <p>{value}</p>
                  </article>
                );
              })}
            </Stagger>

            <h3 className="bct-sh-fest-title"><FaCalendarAlt /> {sh.festTitle}</h3>
            <Stagger key={`shv-${lang}`} className="bct-sh-fest" step={240} from="left">
              {sh.fest.map(([name, month, period]) => (
                <div key={name} className="bct-sh-fest-card">
                  <b>{name}</b>
                  <span className="bct-sh-month">{month}</span>
                  <em>{period}</em>
                </div>
              ))}
            </Stagger>
          </div>
        </section>
      )}

      {/* Temple support: highlighted band (20% of hundial income) */}
      {tp.title && (
        <section className="bct-sec bct-tp">
          <div className="bct-wrap">
            <InView key={`tp-${lang}`} className="bct-tp-card" threshold={0.25}>
              <div className="bct-tp-ring">
                <CountUp value={tp.pct} />
                <span>{tp.pctLabel}</span>
              </div>
              <div className="bct-tp-txt">
                <span className="bct-tp-tag"><FaPlaceOfWorship /> {tp.tag}</span>
                <AnimText key={`tpt-${lang}`} as="h2" text={tp.title} className="bct-tp-title" step={80} />
                <AnimText key={`tpx-${lang}`} text={tp.text} className="bct-tp-text" step={28} />
                <p className="bct-tp-note"><FaHandHoldingHeart /> {tp.note}</p>
              </div>
            </InView>
          </div>
        </section>
      )}

      {/* How we help: image cards in a scroll-snap rail */}
      <section className="bct-sec bct-sec-tint">
        <div className="bct-wrap">
          <AnimText key={`w-${lang}`} as="h2" text={h.whatTitle} className="bct-h2" step={90} />
          <AnimText key={`ws-${lang}`} text={h.whatSub} className="bct-lead" step={40} />
          <HelpRail key={lang} items={t.act.items} />
          <Reveal className="bct-center">
            <Link to="/activities" className="bct-more">{h.moreLink} <FaArrowRight /></Link>
          </Reveal>
        </div>
      </section>

      {/* Equipment profile cards: first 3 drop from the top, next 3 rise from the bottom */}
      <section className="bct-sec bct-eq">
        <div className="bct-wrap">
          <AnimText key={`e-${lang}`} as="h2" text={t.equipHome.title} className="bct-h2" step={90} />
          <AnimText key={`es-${lang}`} text={t.equipHome.sub} className="bct-lead" step={40} />
          <InView key={`eg-${lang}`} className="bct-eq-grid" threshold={0.1}>
            {t.act.equip.map((name, i) => {
              const Icon = eqIcons[i];
              return (
                <article
                  key={name}
                  className={`bct-eq-card ${i < 3 ? "bct-eq-top" : "bct-eq-bot"}`}
                  style={{ "--n": i }}
                >
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
          </InView>
        </div>
      </section>

      {/* Activity journal with tabs */}
      <section className="bct-sec bct-sec-tint">
        <div className="bct-wrap">
          <AnimText key={`j-${lang}`} as="h2" text={t.journal.title} className="bct-h2" step={90} />
          <AnimText key={`js-${lang}`} text={t.journal.sub} className="bct-lead" step={40} />
          <div className="bct-tabs" role="tablist">
            {t.journal.tabs.map((name, i) => (
              <button key={name} role="tab" aria-selected={tab === i} className={`bct-tab ${tab === i ? "bct-tab-on" : ""}`} onClick={() => setTab(i)}>
                {name} <em>{t.journal.items[i].length}</em>
              </button>
            ))}
          </div>
          <Stagger key={tab + lang} className="bct-jr" step={150}>
            {t.journal.items[tab].map((text) => (
              <div key={text} className="bct-jr-item"><span className="bct-jr-dot" /><p>{text}</p></div>
            ))}
          </Stagger>
        </div>
      </section>

      <Trustees />

      {/* Dialysis Centre + Old Age Home: cards come in from the left, one after the other */}
      <section className="bct-sec bct-sec-tint bct-ex">
        <div className="bct-wrap">
          <AnimText key={`pt-${lang}`} as="h2" text={m.plansTitle} className="bct-h2" step={90} />
          <AnimText key={`ps-${lang}`} text={m.plansSub} className="bct-lead" step={40} />
          <Stagger key={`pg-${lang}`} className="bct-ex-grid" step={230} from="left">
            {/* Dialysis */}
            <article className="bct-ex-card">
              <div className="bct-ex-pic">
                <img src={helpImgs[4] || img.hero} alt={t.dia.title} loading="lazy" onError={onImgError} />
                <span className="bct-ex-ico"><FaTint /></span>
              </div>
              <div className="bct-ex-body">
                <h3>{t.dia.title}</h3>
                <p>{t.dia.plan}</p>
                <h4>{m.today}</h4>
                <ul className="bct-ex-list">
                  {t.dia.now.map((p) => <li key={p}><FaCheckCircle /> <span>{p}</span></li>)}
                </ul>
                <Link to="/dialysis-centre" className="bct-ex-link">{m.explore} <FaArrowRight /></Link>
              </div>
            </article>

            {/* Old age home */}
            <article className="bct-ex-card">
              <div className="bct-ex-pic">
                <img src={helpImgs[5] || img.hero} alt={t.old.title} loading="lazy" onError={onImgError} />
                <span className="bct-ex-ico"><FaHome /></span>
              </div>
              <div className="bct-ex-body">
                <h3>{t.old.title}</h3>
                <p>{t.old.plan}</p>
                <h4>{m.firstStep}</h4>
                <ul className="bct-ex-list">
                  <li><FaCheckCircle /> <span>{t.old.land}</span></li>
                </ul>
                <Link to="/old-age-home" className="bct-ex-link">{m.explore} <FaArrowRight /></Link>
              </div>
            </article>
          </Stagger>
        </div>
      </section>

      {/* Gallery preview: 5 separate photos from the gallery set (see homeGallery in data/images.js) */}
      <section className="bct-sec bct-gl">
        <div className="bct-wrap">
          <AnimText key={`gt-${lang}`} as="h2" text={m.galleryTitle} className="bct-h2" step={90} />
          <AnimText key={`gs-${lang}`} text={m.gallerySub} className="bct-lead" step={40} />
          <div className="bct-gl-grid">
            {homeGallery.map((src, i) => (
              <Reveal key={src} from="left" delay={i * 150} className={`bct-gl-cell bct-gl-c${i}`}>
                <Link to="/gallery" className="bct-gl-tile" aria-label={t.gal.title}>
                  <img src={src} alt="" loading="lazy" onError={onImgError} />
                  <span className="bct-gl-over"><FaArrowRight /></span>
                </Link>
              </Reveal>
            ))}
          </div>
          <Reveal className="bct-center">
            <Link to="/gallery" className="bct-more">{m.galleryLink} <FaArrowRight /></Link>
          </Reveal>
        </div>
      </section>

      {/* Quotes: Gandhi + Wilde */}
      {qt.items.length > 0 && (
        <section className="bct-sec bct-sec-tint bct-qt">
          <div className="bct-wrap">
            <Stagger key={`qt-${lang}`} className="bct-qt-grid" step={260} from="bottom">
              {qt.items.map(([text, who]) => (
                <figure key={who} className="bct-qt-card">
                  <span className="bct-qt-mark"><FaQuoteLeft /></span>
                  <blockquote>{text}</blockquote>
                  <figcaption>— {who}</figcaption>
                </figure>
              ))}
            </Stagger>
          </div>
        </section>
      )}

      <section className="bct-appeal" style={{ backgroundImage: `linear-gradient(rgba(31,61,43,.9),rgba(31,61,43,.9)),url(${img.support})` }}>
        <div className="bct-wrap bct-appeal-in">
          <AnimText key={`at-${lang}`} as="h2" text={h.appealTitle} step={100} />
          <AnimText key={`ax-${lang}`} text={h.appealText} step={40} />
          <Reveal delay={400}><Link to="/contact" className="bct-btn bct-btn-gold">{h.donate}</Link></Reveal>
        </div>
      </section>
    </>
  );
}