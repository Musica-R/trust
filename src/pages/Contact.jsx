import React, { useState } from "react";
import { FaPhoneAlt, FaEnvelope, FaMapMarkerAlt, FaRegCopy, FaCheck, FaUniversity } from "react-icons/fa";
import { useLang } from "../context/LangContext";
import { img } from "../data/images";
import { trust } from "../data/content";
import PageHero from "../components/PageHero";
import { AnimText, Stagger, Reveal } from "../components/Reveal";
import "../Stylesheet/pages.css";

export default function Contact() {
  const { t } = useLang();
  const c = t.con;
  const [f, setF] = useState({ name: "", mail: "", msg: "" });
  const [copied, setCopied] = useState("");
  const set = (k) => (e) => setF({ ...f, [k]: e.target.value });
  const send = (e) => {
    e.preventDefault();
    const body = `${f.msg}\n\n${f.name} (${f.mail})`;
    window.location.href = `mailto:${trust.email}?subject=${encodeURIComponent(c.title)}&body=${encodeURIComponent(body)}`;
  };
  const copy = (k, v) => {
    navigator.clipboard?.writeText(v);
    setCopied(k);
    setTimeout(() => setCopied(""), 1500);
  };
  const b = trust.bank;
  const rows = [["acc", c.acc, b.acc], ["ifsc", c.ifsc, b.ifsc], ["bank", c.bank, b.name], ["branch", c.branch, b.branch]];

  return (
    <>
      <PageHero image={img.contact} title={c.title} sub={c.sub} />
      <section className="bct-sec">
        <div className="bct-wrap">
          <Stagger className="bct-cards bct-cards-3" step={140}>
            <article className="bct-card"><span className="bct-card-ico"><FaPhoneAlt /></span><h3>{c.phone}</h3><p><a href={`tel:${trust.phone}`}>{trust.phoneShow}</a></p></article>
            <article className="bct-card"><span className="bct-card-ico"><FaEnvelope /></span><h3>{c.email}</h3><p><a href={`mailto:${trust.email}`}>{trust.email}</a></p></article>
            <article className="bct-card"><span className="bct-card-ico"><FaMapMarkerAlt /></span><h3>{c.addr}</h3><p>{t.address}</p></article>
          </Stagger>
        </div>
      </section>

      <section className="bct-sec bct-sec-tint">
        <div className="bct-wrap bct-split">
          <Reveal>
            <form className="bct-form" onSubmit={send}>
              <input required placeholder={c.name} value={f.name} onChange={set("name")} />
              <input required type="email" placeholder={c.mail} value={f.mail} onChange={set("mail")} />
              <textarea required rows="5" placeholder={c.msg} value={f.msg} onChange={set("msg")} />
              <button className="bct-btn bct-btn-green" type="submit">{c.send}</button>
            </form>
          </Reveal>
          <div>
            <AnimText as="h2" text={c.donTitle} className="bct-h2" step={90} />
            <AnimText text={c.donText} className="bct-lead" step={40} />
            <Stagger className="bct-bank" step={120}>
              {rows.map(([k, label, val]) => (
                <div key={k} className="bct-bank-row">
                  <FaUniversity />
                  <span><small>{label}</small><b>{val}</b></span>
                  <button type="button" onClick={() => copy(k, val)} aria-label={c.copy}>
                    {copied === k ? <FaCheck /> : <FaRegCopy />}
                  </button>
                </div>
              ))}
            </Stagger>
          </div>
        </div>
      </section>
    </>
  );
}
