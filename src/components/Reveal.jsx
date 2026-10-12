import React from "react";
import useReveal from "../hooks/useReveal";

/* from: "left" | "right" | "top" | "bottom" (optional, default = existing fade-up) */
const dir = (from) => (from ? `bct-from-${from}` : "");

/* Words appear one by one when the element scrolls into view */
export function AnimText({ text, as: Tag = "p", className = "", step = 55 }) {
  const [ref, shown] = useReveal(0.3);
  return (
    <Tag ref={ref} className={`bct-anim ${shown ? "bct-in" : ""} ${className}`} aria-label={text}>
      {text.split(" ").map((w, i) => (
        <span key={i} className="bct-word" aria-hidden="true" style={{ transitionDelay: `${i * step}ms` }}>
          {w}&nbsp;
        </span>
      ))}
    </Tag>
  );
}

/* Children (cards, list items) appear one after another */
export function Stagger({ children, className = "", step = 120, from }) {
  const [ref, shown] = useReveal(0.15);
  return (
    <div ref={ref} className={`bct-stagger ${dir(from)} ${shown ? "bct-in" : ""} ${className}`}>
      {React.Children.map(children, (c, i) => (
        <div className="bct-stagger-item" style={{ transitionDelay: `${i * step}ms` }}>{c}</div>
      ))}
    </div>
  );
}

export function Reveal({ children, className = "", delay = 0, from }) {
  const [ref, shown] = useReveal(0.2);
  return (
    <div ref={ref} className={`bct-reveal ${dir(from)} ${shown ? "bct-in" : ""} ${className}`} style={{ transitionDelay: `${delay}ms` }}>
      {children}
    </div>
  );
}