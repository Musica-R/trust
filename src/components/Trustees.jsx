import React from "react";
import { FaUserCircle } from "react-icons/fa";
import { useLang } from "../context/LangContext";
import { trusteeEn } from "../data/extra";
import { AnimText, Reveal } from "./Reveal";
import "../Stylesheet/Trustees.css";

const initials = (n) => {
  const w = (n || "").replace(/[.,]/g, " ").split(/\s+/).filter(Boolean);
  if (!w.length) return "";
  return (w[0][0] + w[w.length - 1][0]).toUpperCase();
};

export default function Trustees() {
  const { t, lang } = useLang();
  const tr = t.trustees;
  return (
    <section className="bct-tr">
      <div className="bct-wrap">
        <AnimText key={`trt-${lang}`} as="h2" text={tr.title} className="bct-h2" step={90} />
        <AnimText key={`trs-${lang}`} text={tr.sub} className="bct-lead" step={40} />
        <div className="bct-tr-grid">
          {tr.names.map((n, i) => (
            <Reveal
              key={`${lang}-${i}`}
              delay={i === 0 ? 0 : 120 + (i % 4) * 90}
              className={`bct-tr-cell ${i === 0 ? "bct-tr-cell-lead" : ""}`}
            >
              <div className={`bct-tr-card ${i === 0 ? "bct-tr-lead" : ""}`}>
                <span className="bct-tr-av">
                  {i === 0 ? <FaUserCircle /> : initials(trusteeEn[i])}
                </span>
                <div className="bct-tr-txt">
                  {i === 0 && <small>{tr.lead}</small>}
                  <b>{n}</b>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}