import React, { useState } from "react";
import { FaTimes } from "react-icons/fa";
import { useLang } from "../context/LangContext";
import { img, gallery } from "../data/images";
import PageHero from "../components/PageHero";
import { Stagger } from "../components/Reveal";
import "../Stylesheet/pages.css";

export default function Gallery() {
  const { t } = useLang();
  const [open, setOpen] = useState(null);
  return (
    <>
      <PageHero image={img.gallery} title={t.gal.title} sub={t.gal.sub} />
      <section className="bct-sec">
        <div className="bct-wrap">
          <Stagger className="bct-gal" step={90}>
            {gallery.map((src, i) => (
              <button key={i} className="bct-gal-item" onClick={() => setOpen(src)}>
                <img src={src} alt="" loading="lazy" />
              </button>
            ))}
          </Stagger>
        </div>
      </section>
      {open && (
        <div className="bct-lightbox" onClick={() => setOpen(null)}>
          <button className="bct-lightbox-x" aria-label={t.gal.close}><FaTimes /></button>
          <img src={open.replace("w=800", "w=1600")} alt="" />
        </div>
      )}
    </>
  );
}
