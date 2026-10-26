import React, { useState, useRef, useEffect } from "react";
import { FaTimes } from "react-icons/fa";
import { useLang } from "../context/LangContext";
import { img, gallery } from "../data/images";
import PageHero from "../components/PageHero";
import { Stagger } from "../components/Reveal";
import "../Stylesheet/pages.css";

// Existing videos: /public/assets/trustv1.mp4 ... trustv4.mp4
const VIDEO_COUNT = 4;

const trustVideos = Array.from(
  { length: VIDEO_COUNT },
  (_, i) => `/assets/trustv${i + 1}.mp4`
);

// New videos
const newVideos = [
  "/assets/picvideo1.mp4",
  "/assets/picvideo3.mp4",
  "/assets/picvideo4.mp4",
];

// Final list shown on the page (4 + 3 = 7 videos)
const videos = [...trustVideos, ...newVideos];

export default function Gallery() {
  const { t } = useLang();
  const [open, setOpen] = useState(null);
  const videoRefs = useRef([]);

  // Pause any video as soon as it scrolls out of view
  useEffect(() => {
    const els = videoRefs.current.filter(Boolean);
    if (!els.length || typeof IntersectionObserver === "undefined") return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting && !entry.target.paused) {
            entry.target.pause();
          }
        });
      },
      { threshold: 0.25 }
    );

    els.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  // Only one video plays at a time
  const handlePlay = (index) => {
    videoRefs.current.forEach((el, i) => {
      if (el && i !== index && !el.paused) el.pause();
    });
  };

  // Pause videos while the image lightbox is open
  useEffect(() => {
    if (open) {
      videoRefs.current.forEach((el) => el && !el.paused && el.pause());
    }
  }, [open]);

  return (
    <>
      <PageHero image="/assets/trust12.jpeg" title={t.gal.title} sub={t.gal.sub} />

      {/* ---------- Photos ---------- */}
      <section className="bct-sec bct-sec-tint">
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

      {/* ---------- Videos ---------- */}
      <section className="bct-sec bct-vid-sec">
        <div className="bct-wrap">
          <h2 className="bct-h2 bct-vid-title">
            {(t.gal && t.gal.videoTitle) || "Our Videos"}
          </h2>
          <div className="bct-vid-grid">
            {videos.map((src, i) => (
              <div className="bct-vid-item" key={src}>
                <video
                  ref={(el) => (videoRefs.current[i] = el)}
                  className="bct-vid"
                  src={`${src}#t=0.1`}
                  controls
                  playsInline
                  preload="metadata"
                  onPlay={() => handlePlay(i)}
                />
              </div>
            ))}
          </div>
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