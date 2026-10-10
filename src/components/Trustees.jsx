import React from "react";
import { FaUserCircle } from "react-icons/fa";
import { useLang } from "../context/LangContext";
import { trusteeEn } from "../data/extra";
import { AnimText, Stagger } from "./Reveal";
import "../Stylesheet/Trustees.css";

const initials = (n) => {
  const w = n.replace(/[.,]/g, " ").split(/\s+/).filter(Boolean);
  return (w[0][0] + w[w.length - 1][0]).toUpperCase();
};

export default function Trustees() {
  const { t } = useLang();
  const tr = t.trustees;
  return (
    <section className="bct-tr">
      <div className="bct-wrap">
        <AnimText as="h2" text={tr.title} className="bct-h2" step={90} />
        <AnimText text={tr.sub} className="bct-lead" step={40} />
        <Stagger className="bct-tr-grid" step={90}>
          {tr.names.map((n, i) => (
            <div key={i} className={`bct-tr-card ${i === 0 ? "bct-tr-lead" : ""}`}>
              <span className="bct-tr-av">{i === 0 ? <FaUserCircle /> : initials(trusteeEn[i])}</span>
              <b>{n}</b>
              {i === 0 && <small>{tr.lead}</small>}
            </div>
          ))}
        </Stagger>
      </div>
    </section>
  );
}
