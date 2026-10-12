import React from "react";
import { Link } from "react-router-dom";
import { FaCheckCircle, FaTint, FaBus, FaHandHoldingHeart, FaPhoneAlt, FaHospital, FaArrowRight } from "react-icons/fa";
import { useLang } from "../context/LangContext";
import { img, helpImgs } from "../data/images";
import { trust } from "../data/content";
import { diaMore } from "../data/diaMore";
import PageHero from "../components/PageHero";
import { AnimText, Stagger, Reveal } from "../components/Reveal";
import "../Stylesheet/pages.css";
import "../Stylesheet/Dialysis.css";

const helpIcons = [FaTint, FaBus, FaHandHoldingHeart];
const helpUsIcons = [FaTint, FaHandHoldingHeart, FaPhoneAlt];

export default function Dialysis() {
  const { t, lang } = useLang();
  const d = t.dia;
  const x = diaMore[lang] || diaMore.en;

  const onImgError = (e) => {
    if (e.currentTarget.dataset.fb) return;
    e.currentTarget.dataset.fb = "1";
    e.currentTarget.src = img.hero;
  };

  return (
    <>
      <PageHero image={img.dialysis} title={d.title} sub={d.sub} />

      {/* Stats strip */}
      <section className="bct-dx-stats">
        <div className="bct-dx-stats-in">
          {x.stats.map(([n, l], i) => (
            <Reveal key={`${lang}-s${i}`} delay={i * 120} className="bct-dx-stat">
              <b>{n}</b>
              <span>{l}</span>
            </Reveal>
          ))}
        </div>
      </section>

      {/* What we do today + what we plan */}
      <section className="bct-sec">
        <div className="bct-wrap bct-split">
          <div>
            <AnimText key={`n-${lang}`} as="h2" text={d.nowTitle} className="bct-h2" step={90} />
            <Stagger key={`nl-${lang}`} className="bct-list" step={160}>
              {d.now.map((n) => <p key={n}><FaCheckCircle /> {n}</p>)}
            </Stagger>
            <AnimText key={`p-${lang}`} as="h2" text={d.planTitle} className="bct-h2 bct-gap" step={90} />
            <AnimText key={`pt-${lang}`} text={d.plan} className="bct-body" step={30} />
            <Reveal><Link to="/contact" className="bct-btn bct-btn-green">{d.cta}</Link></Reveal>
          </div>
          <Reveal><img className="bct-pic" src={img.dialysis} alt="" loading="lazy" /></Reveal>
        </div>
      </section>

      {/* Support cards */}
      <section className="bct-sec bct-sec-tint">
        <div className="bct-wrap">
          <AnimText key={`h-${lang}`} as="h2" text={x.helpTitle} className="bct-h2" step={90} />
          <AnimText key={`hs-${lang}`} text={x.helpSub} className="bct-lead" step={40} />
          <div className="bct-dx-cards">
            {x.help.map(([title, text], i) => {
              const Icon = helpIcons[i];
              return (
                <Reveal key={`${lang}-h${i}`} delay={i * 130} className="bct-dx-cell">
                  <article className="bct-dx-card">
                    <span className="bct-dx-ico"><Icon /></span>
                    <h3>{title}</h3>
                    <p>{text}</p>
                    {i === 0 && <b className="bct-dx-price">₹{trust.equipment[4].toLocaleString("en-IN")}</b>}
                  </article>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* Why a local centre */}
      <section className="bct-sec">
        <div className="bct-wrap bct-split bct-dx-why">
          <Reveal>
            <img className="bct-pic" src={helpImgs[4] || img.hero} alt="" loading="lazy" onError={onImgError} />
          </Reveal>
          <div>
            <AnimText key={`w-${lang}`} as="h2" text={x.whyTitle} className="bct-h2" step={90} />
            <AnimText key={`wt-${lang}`} text={x.whyText} className="bct-body" step={30} />
            <Stagger key={`wp-${lang}`} className="bct-list" step={160}>
              {x.whyPoints.map((p) => <p key={p}><FaCheckCircle /> {p}</p>)}
            </Stagger>
          </div>
        </div>
      </section>

      {/* Roadmap */}
      <section className="bct-sec bct-dx-road-sec">
        <div className="bct-wrap">
          <AnimText key={`r-${lang}`} as="h2" text={x.roadTitle} className="bct-h2" step={90} />
          <div className="bct-dx-road">
            {x.road.map(([title, text], i) => (
              <Reveal key={`${lang}-r${i}`} delay={i * 150} className="bct-dx-step">
                <span className="bct-dx-no">{i + 1}</span>
                <h3>{title}</h3>
                <p>{text}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* How you can help */}
      <section className="bct-sec bct-sec-tint">
        <div className="bct-wrap">
          <AnimText key={`u-${lang}`} as="h2" text={x.helpUsTitle} className="bct-h2" step={90} />
          <div className="bct-dx-cards">
            {x.helpUs.map(([title, text, cta], i) => {
              const Icon = helpUsIcons[i];
              const isCall = i === 2;
              return (
                <Reveal key={`${lang}-u${i}`} delay={i * 130} className="bct-dx-cell">
                  <article className="bct-dx-card bct-dx-card-act">
                    <span className="bct-dx-ico"><Icon /></span>
                    <h3>{title}</h3>
                    <p>{text}</p>
                    {isCall ? (
                      <a className="bct-dx-btn" href={`tel:${trust.phone}`}>{cta} <FaArrowRight /></a>
                    ) : (
                      <Link className="bct-dx-btn" to="/contact">{cta} <FaArrowRight /></Link>
                    )}
                  </article>
                </Reveal>
              );
            })}
          </div>
          <p className="bct-dx-note"><FaHospital /> {x.note}</p>
        </div>
      </section>
    </>
  );
}