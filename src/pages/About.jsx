import React from "react";
import { FaUserTie, FaQuoteLeft, FaQuoteRight, FaHandHoldingHeart, FaPlaceOfWorship, FaLandmark } from "react-icons/fa";
import { useLang } from "../context/LangContext";
import { img } from "../data/images";
import { trust } from "../data/content";
import PageHero from "../components/PageHero";
import { AnimText, Stagger, Reveal } from "../components/Reveal";
import Trustees from "../components/Trustees";
import "../Stylesheet/pages.css";
import "../Stylesheet/caption.css";

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

export default function About() {
  const { t, lang } = useLang();
  const a = t.about;
  const q = t.aboutQuote || {};
  return (
    <>
      <PageHero image="/assets/trust12.jpeg" title={a.title} sub={a.sub} />

      {/* Trust caption: Sahajeevanam Kshethrangaliloode */}
      <CaptionBanner lang={lang} />

      <section className="bct-sec">
        <div className="bct-wrap bct-split">
          <div>
            {a.paras.map((p, i) => <AnimText key={i} text={p} className="bct-body" step={28} />)}
            {/* Established 2022 / Building inauguration 2024 */}
            <Timeline lang={lang} />

            <p className="bct-regline">{t.reg}: {trust.reg}</p>
            <p className="bct-motto">“{t.motto}”</p>
          </div>
          <Reveal><img className="bct-pic" src="/assets/trust17.jpeg" alt="" loading="lazy" /></Reveal>
        </div>
      </section>

      {/* Highlight quote: True charity */}
      {q.text && (
        <section className="bct-aq">
          <div className="bct-wrap">
            <Reveal className="bct-aq-card">
              <span className="bct-aq-badge"><FaQuoteLeft /></span>
              <AnimText key={`aq-${lang}`} text={q.text} className="bct-aq-text" step={45} />
              <div className="bct-aq-divider" aria-hidden="true">
                <span /><FaHandHoldingHeart /><span />
              </div>
              <FaQuoteRight className="bct-aq-end" aria-hidden="true" />
            </Reveal>
          </div>
        </section>
      )}

      <section className="bct-sec bct-sec-tint">
        <div className="bct-wrap">
          <AnimText as="h2" text={a.officeTitle} className="bct-h2" step={90} />
          <Stagger className="bct-cards bct-cards-3" step={150}>
            {a.office.map(([role, who]) => (
              <article key={role} className="bct-card">
                <span className="bct-card-ico"><FaUserTie /></span>
                <h3>{role}</h3><p>{who}</p>
              </article>
            ))}
          </Stagger>
          <AnimText text={a.thanks} className="bct-lead bct-thanks" step={35} />
        </div>
      </section>
      <Trustees />
    </>
  );
}