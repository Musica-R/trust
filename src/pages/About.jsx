import React from "react";
import { FaUserTie, FaQuoteLeft, FaQuoteRight, FaHandHoldingHeart } from "react-icons/fa";
import { useLang } from "../context/LangContext";
import { img } from "../data/images";
import { trust } from "../data/content";
import PageHero from "../components/PageHero";
import { AnimText, Stagger, Reveal } from "../components/Reveal";
import Trustees from "../components/Trustees";
import "../Stylesheet/pages.css";

export default function About() {
  const { t, lang } = useLang();
  const a = t.about;
  const q = t.aboutQuote || {};
  return (
    <>
      <PageHero image="/assets/trust16.jpeg" title={a.title} sub={a.sub} />
      <section className="bct-sec">
        <div className="bct-wrap bct-split">
          <div>
            {a.paras.map((p, i) => <AnimText key={i} text={p} className="bct-body" step={28} />)}
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