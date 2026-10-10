import React from "react";
import { Link } from "react-router-dom";
import { FaHandHoldingHeart, FaPhoneAlt, FaEnvelope, FaMapMarkerAlt } from "react-icons/fa";
import { useLang } from "../context/LangContext";
import { trust } from "../data/content";
import "../Stylesheet/Footer.css";

export default function Footer() {
  const { t } = useLang();
  return (
    <footer className="bct-foot">
      <div className="bct-foot-grid">
        <div>
          <div className="bct-foot-brand"><FaHandHoldingHeart /> {t.brand}</div>
          <p className="bct-foot-motto">“{t.motto}”</p>
          <small>{t.reg}: {trust.reg}</small>
        </div>
        <div className="bct-foot-links">
          <Link to="/about">{t.nav.about}</Link>
          <Link to="/activities">{t.nav.activities}</Link>
          <Link to="/dialysis-centre">{t.nav.dialysis}</Link>
          <Link to="/old-age-home">{t.nav.oldAge}</Link>
          <Link to="/gallery">{t.nav.gallery}</Link>
        </div>
        <div className="bct-foot-contact">
          <span><FaMapMarkerAlt /> {t.address}</span>
          <a href={`tel:${trust.phone}`}><FaPhoneAlt /> {trust.phoneShow}</a>
          <a href={`mailto:${trust.email}`}><FaEnvelope /> {trust.email}</a>
        </div>
      </div>
      <div className="bct-foot-bottom">© {new Date().getFullYear()} {t.brand}</div>
    </footer>
  );
}
