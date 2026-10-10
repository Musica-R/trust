import React from "react";
import { Link } from "react-router-dom";
import { FaCheckCircle } from "react-icons/fa";
import { useLang } from "../context/LangContext";
import { img } from "../data/images";
import PageHero from "../components/PageHero";
import { AnimText, Stagger, Reveal } from "../components/Reveal";
import "../Stylesheet/pages.css";

export default function Dialysis() {
  const { t } = useLang();
  const d = t.dia;
  return (
    <>
      <PageHero image={img.dialysis} title={d.title} sub={d.sub} />
      <section className="bct-sec">
        <div className="bct-wrap bct-split">
          <div>
            <AnimText as="h2" text={d.nowTitle} className="bct-h2" step={90} />
            <Stagger className="bct-list" step={160}>
              {d.now.map((n) => <p key={n}><FaCheckCircle /> {n}</p>)}
            </Stagger>
            <AnimText as="h2" text={d.planTitle} className="bct-h2 bct-gap" step={90} />
            <AnimText text={d.plan} className="bct-body" step={30} />
            <Reveal><Link to="/contact" className="bct-btn bct-btn-green">{d.cta}</Link></Reveal>
          </div>
          <Reveal><img className="bct-pic" src={img.dialysis} alt="" loading="lazy" /></Reveal>
        </div>
      </section>
    </>
  );
}
