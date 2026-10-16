import React, { useState } from "react";
import {
  FaPhoneAlt,
  FaEnvelope,
  FaMapMarkerAlt,
  FaRegCopy,
  FaCheck,
  FaUniversity,
  FaWhatsapp,
  FaQrcode,
  FaFileInvoice,
} from "react-icons/fa";
import { useLang } from "../context/LangContext";
import { img } from "../data/images";
import { trust } from "../data/content";
import PageHero from "../components/PageHero";
import { AnimText, Stagger, Reveal } from "../components/Reveal";
import "../Stylesheet/pages.css";


const UPI_ID = trust.upi || "olappamanna187@dlb";
const UPI_NAME = "Olappamanna Bhagavathy Charitable Trust";

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
  const rows = [
    ["acc", c.acc, b.acc],
    ["ifsc", c.ifsc, b.ifsc],
    ["bank", c.bank, b.name],
    ["branch", c.branch, b.branch],
  ];

  // 80G tax exemption note (shown near both donation areas)
  const taxText =
    c.tax || "Donations are eligible for tax exemption under Section 80G of the Income Tax Act.";
  const TaxNote = () => (
    <div className="bct-tax">
      <FaFileInvoice />
      <p>{taxText}</p>
    </div>
  );

  // WhatsApp number (digits only, with country code)
  let wa = String(trust.whatsapp || trust.phone || "").replace(/\D/g, "");
  if (wa.length === 10) wa = "91" + wa;
  const waText = encodeURIComponent(
    "Hello, I have made a donation to Olappamanna Bhagavathy Charitable Trust. Sharing the payment screenshot."
  );
  const waLink = `https://wa.me/${wa}?text=${waText}`;

  // Opens the UPI app directly on mobile
  const upiLink = `upi://pay?pa=${UPI_ID}&pn=${encodeURIComponent(UPI_NAME)}&cu=INR`;

  return (
    <>
      <PageHero image="/assets/trust20.jpeg" title={c.title} sub={c.sub} />

      <section className="bct-sec">
        <div className="bct-wrap">
          <Stagger className="bct-cards bct-cards-3" step={140}>
            <article className="bct-card">
              <span className="bct-card-ico"><FaPhoneAlt /></span>
              <h3>{c.phone}</h3>
              <p><a href={`tel:${trust.phone}`}>{trust.phoneShow}</a></p>
            </article>
            <article className="bct-card">
              <span className="bct-card-ico"><FaEnvelope /></span>
              <h3>{c.email}</h3>
              <p><a href={`mailto:${trust.email}`}>{trust.email}</a></p>
            </article>
            <article className="bct-card">
              <span className="bct-card-ico"><FaMapMarkerAlt /></span>
              <h3>{c.addr}</h3>
              <p>{t.address}</p>
            </article>
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
            <Reveal>
              <TaxNote />
            </Reveal>
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

      {/* ---------- UPI / QR donation ---------- */}
      <section className="bct-sec">
        <div className="bct-wrap">
          <Reveal>
            <div className="bct-qr">
              <div className="bct-qr-img">
                <img src="/assets/qr.jpg" alt={`${UPI_NAME} UPI QR code`} loading="lazy" />
              </div>

              <div className="bct-qr-info">
                <h2 className="bct-h2">
                  <FaQrcode style={{ marginRight: 10, verticalAlign: "-3px" }} />
                  {c.qrTitle || "Donate via UPI"}
                </h2>
                <p className="bct-body">
                  {c.qrText || "Scan the QR code with any UPI app (GPay, PhonePe, Paytm, BHIM) or pay directly to the UPI ID below."}
                </p>

                <TaxNote />

                <div className="bct-bank">
                  <div className="bct-bank-row">
                    <FaQrcode />
                    <span><small>{c.upi || "UPI ID"}</small><b>{UPI_ID}</b></span>
                    <button type="button" onClick={() => copy("upi", UPI_ID)} aria-label={c.copy}>
                      {copied === "upi" ? <FaCheck /> : <FaRegCopy />}
                    </button>
                  </div>
                </div>

                <a className="bct-btn bct-btn-gold bct-qr-pay" href={upiLink}>
                  {c.qrPay || "Pay with UPI app"}
                </a>

                <div className="bct-qr-note">
                  <FaWhatsapp />
                  <p>
                    {c.qrNote ||
                      "After you donate, please send the payment screenshot to us on WhatsApp so we can acknowledge your contribution."}
                  </p>
                </div>

                <a className="bct-btn bct-btn-green" href={waLink} target="_blank" rel="noopener noreferrer">
                  <FaWhatsapp style={{ marginRight: 8, verticalAlign: "-2px" }} />
                  {c.qrWa || "Send screenshot on WhatsApp"}
                </a>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}