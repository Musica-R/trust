import React from "react";
import { FaUtensils, FaWheelchair, FaBus, FaClinicMedical, FaTint, FaHome, FaCheckCircle, FaQuoteLeft, FaQuoteRight, FaHandHoldingHeart, FaGlobeAsia } from "react-icons/fa";
import { useLang } from "../context/LangContext";
import { img } from "../data/images";
import { trust } from "../data/content";
import PageHero from "../components/PageHero";
import { AnimText, Stagger, Reveal } from "../components/Reveal";
import "../Stylesheet/pages.css";

const icons = [FaUtensils, FaWheelchair, FaBus, FaClinicMedical, FaTint, FaHome];
const rupee = (n) => "₹" + n.toLocaleString("en-IN");

export default function Activities() {
  const { t, lang } = useLang();
  const a = t.act;
  const q = t.actQuotes || {};
  return (
    <>
      <PageHero image="/assets/trust15.jpeg" title={a.title} sub={a.sub} />
      <section className="bct-sec">
        <div className="bct-wrap">
          <Stagger className="bct-cards" step={130}>
            {a.items.map(([title, text], i) => {
              const Icon = icons[i];
              return (
                <article key={title} className="bct-card">
                  <span className="bct-card-ico"><Icon /></span>
                  <h3>{title}</h3><p>{text}</p>
                </article>
              );
            })}
          </Stagger>
        </div>
      </section>

      {/* Highlight quote 1: Albert Schweitzer */}
      {q.first && q.first.text && (
        <section className="bct-aq">
          <div className="bct-wrap">
            <Reveal className="bct-aq-card">
              <span className="bct-aq-badge"><FaQuoteLeft /></span>
              <AnimText key={`aq1-${lang}`} text={q.first.text} className="bct-aq-text" step={45} />
              {q.first.author && <p className="bct-aq-by">— {q.first.author}</p>}
              <div className="bct-aq-divider" aria-hidden="true">
                <span /><FaHandHoldingHeart /><span />
              </div>
              <FaQuoteRight className="bct-aq-end" aria-hidden="true" />
            </Reveal>
          </div>
        </section>
      )}

      <section className="bct-sec bct-sec-tint">
        <div className="bct-wrap bct-split">
          <div>
            <AnimText as="h2" text={a.equipTitle} className="bct-h2" step={90} />
            <AnimText text={a.equipSub} className="bct-lead" step={40} />
            <Reveal className="bct-tablewrap">
              <table className="bct-table">
                <thead><tr>{a.head.map((h) => <th key={h}>{h}</th>)}</tr></thead>
                <tbody>
                  {a.equip.map((e, i) => (
                    <tr key={e}><td>{i + 1}</td><td>{e}</td><td>{rupee(trust.equipment[i])}</td></tr>
                  ))}
                </tbody>
              </table>
            </Reveal>
          </div>
          <div>
            <AnimText as="h2" text={a.futureTitle} className="bct-h2" step={90} />
            <Stagger className="bct-list" step={140}>
              {a.future.map((f) => <p key={f}><FaCheckCircle /> {f}</p>)}
            </Stagger>
          </div>
        </div>
      </section>

      {/* Highlight quote 2: One family */}
      {/* {q.second && (
        <section className="bct-aq bct-aq-b">
          <div className="bct-wrap">
            <Reveal className="bct-aq-card">
              <span className="bct-aq-badge"><FaQuoteLeft /></span>
              <AnimText key={`aq2-${lang}`} text={q.second} className="bct-aq-text" step={45} />
              <div className="bct-aq-divider" aria-hidden="true">
                <span /><FaGlobeAsia /><span />
              </div>
              <FaQuoteRight className="bct-aq-end" aria-hidden="true" />
            </Reveal>
          </div>
        </section>
      )} */}
    </>
  );
}