import React from "react";
import { AnimText } from "./Reveal";

export default function PageHero({ image, title, sub }) {
  return (
    <section className="bct-phero" style={{ backgroundImage: `linear-gradient(rgba(20,41,29,.72),rgba(20,41,29,.82)),url(${image})` }}>
      <div className="bct-wrap">
        <AnimText as="h1" text={title} step={90} />
        <AnimText text={sub} className="bct-phero-sub" step={40} />
      </div>
    </section>
  );
}
