import React from "react";
import { Link } from "react-router-dom";
import { useLang } from "../context/LangContext";
import { img } from "../data/images";
import PageHero from "../components/PageHero";
import { AnimText, Reveal } from "../components/Reveal";
import "../Stylesheet/pages.css";

export default function OldAge() {
  const { t } = useLang();
  const o = t.old;
  return (
    <>
      <PageHero image={img.oldAge} title={o.title} sub={o.sub} />
      <section className="bct-sec">
        <div className="bct-wrap bct-split">
          <Reveal><img className="bct-pic" src={img.oldAge} alt="" loading="lazy" /></Reveal>
          <div>
            <AnimText as="h2" text={o.planTitle} className="bct-h2" step={90} />
            <AnimText text={o.plan} className="bct-body" step={30} />
            <AnimText as="h2" text={o.landTitle} className="bct-h2 bct-gap" step={90} />
            <AnimText text={o.land} className="bct-body" step={30} />
            <Reveal><Link to="/contact" className="bct-btn bct-btn-green">{o.cta}</Link></Reveal>
          </div>
        </div>
      </section>
    </>
  );
}
