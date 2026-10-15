import React from "react";
import { Link } from "react-router-dom";
import { FaCheckCircle, FaHome, FaHandHoldingHeart, FaPhoneAlt, FaArrowRight } from "react-icons/fa";
import { useLang } from "../context/LangContext";
import { img, helpImgs } from "../data/images";
import { trust } from "../data/content";
import { oldMore } from "../data/oldMore";
import PageHero from "../components/PageHero";
import { AnimText, Stagger, Reveal } from "../components/Reveal";
import "../Stylesheet/pages.css";
import "../Stylesheet/OldAge.css";

export default function OldAge() {
  const { t, lang } = useLang();
  const o = t.old;
  const x = oldMore[lang] || oldMore.en;

  const onImgError = (e) => {
    if (e.currentTarget.dataset.fb) return;
    e.currentTarget.dataset.fb = "1";
    e.currentTarget.src = img.hero;
  };

  return (
    <>
      <PageHero image="/assets/trust18.jpeg" title={o.title} sub={o.sub} />

       {/* Our plan */}
      <section className="bct-sec">
        <div className="bct-wrap bct-split">
          <Reveal><img className="bct-pic" src="/assets/trust14.jpeg" alt="" loading="lazy" onError={onImgError} /></Reveal>
          <div>
            <AnimText key={`p-${lang}`} as="h2" text={o.planTitle} className="bct-h2" step={90} />
            <AnimText key={`pt-${lang}`} text={o.plan} className="bct-body" step={30} />
            <Reveal><Link to="/contact" className="bct-btn bct-btn-green">{o.cta}</Link></Reveal>
          </div>
        </div>
      </section>

      {/* Who it is for */}
      <section className="bct-sec bct-sec-tint">
        <div className="bct-wrap bct-split bct-oa-for">
          <div>
            <AnimText key={`f-${lang}`} as="h2" text={x.forTitle} className="bct-h2" step={90} />
            <AnimText key={`ft-${lang}`} text={x.forText} className="bct-body" step={30} />
            <Stagger key={`fp-${lang}`} className="bct-list" step={160}>
              {x.forPoints.map((p) => <p key={p}><FaCheckCircle /> {p}</p>)}
            </Stagger>
          </div>
          <Reveal><img className="bct-pic" src={helpImgs[5] || img.hero} alt="" loading="lazy" onError={onImgError} /></Reveal>
        </div>
      </section>

      {/* The gift of land and house */}
      <section className="bct-sec">
        <div className="bct-wrap">
          <Reveal className="bct-oa-gift-cell">
            <article className="bct-oa-gift">
              <span className="bct-oa-ico"><FaHome /></span>
              <h2>{x.giftTitle}</h2>
              <p>{x.giftText}</p>
              <small>{x.giftNote}</small>
            </article>
          </Reveal>
        </div>
      </section>

      {/* Plan steps */}
      <section className="bct-sec bct-oa-road-sec">
        <div className="bct-wrap">
          <AnimText key={`r-${lang}`} as="h2" text={x.roadTitle} className="bct-h2" step={90} />
          <div className="bct-oa-road">
            {x.road.map(([title, text], i) => (
              <Reveal key={`${lang}-r${i}`} delay={i * 150} className="bct-oa-step">
                <span className="bct-oa-no">{i + 1}</span>
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
          <AnimText key={`h-${lang}`} as="h2" text={x.helpTitle} className="bct-h2" step={90} />
          <div className="bct-oa-cards">
            {x.help.map(([title, text, cta], i) => {
              const Icon = i === 0 ? FaHandHoldingHeart : FaPhoneAlt;
              return (
                <Reveal key={`${lang}-h${i}`} delay={i * 130} className="bct-oa-cell">
                  <article className="bct-oa-card">
                    <span className="bct-oa-ico"><Icon /></span>
                    <h3>{title}</h3>
                    <p>{text}</p>
                    {i === 1 ? (
                      <a className="bct-oa-btn" href={`tel:${trust.phone}`}>{cta} <FaArrowRight /></a>
                    ) : (
                      <Link className="bct-oa-btn" to="/contact">{cta} <FaArrowRight /></Link>
                    )}
                  </article>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
}