"use client";

import { useEffect, useRef, useState, type CSSProperties, type ReactNode } from "react";
import { usePathname } from "next/navigation";
import { ArrowUp } from "lucide-react";

export function Reveal({
  children,
  className = "",
  delay = 0,
  variant = "up",
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
  variant?: "up" | "left" | "right" | "scale";
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node || typeof IntersectionObserver === "undefined") {
      setVisible(true);
      return;
    }
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.12, rootMargin: "0px 0px -6% 0px" },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  const variantClass = variant === "left" ? "reveal-left" : variant === "right" ? "reveal-right" : variant === "scale" ? "reveal-scale" : "";
  return (
    <div
      ref={ref}
      className={`reveal ${variantClass} ${visible ? "is-visible" : ""} ${className}`.trim()}
      style={{ "--d": `${delay}ms` } as CSSProperties}
    >
      {children}
    </div>
  );
}

export function Counter({ to, suffix = "" }: { to: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const [value, setValue] = useState(0);
  const started = useRef(false);

  useEffect(() => {
    const node = ref.current;
    if (!node || typeof IntersectionObserver === "undefined") {
      setValue(to);
      return;
    }
    const observer = new IntersectionObserver(
      (entries) => {
        if (!entries.some((entry) => entry.isIntersecting) || started.current) return;
        started.current = true;
        const duration = 1400;
        const start = performance.now();
        const tick = (now: number) => {
          const progress = Math.min((now - start) / duration, 1);
          const eased = 1 - Math.pow(1 - progress, 3);
          setValue(Math.round(to * eased));
          if (progress < 1) requestAnimationFrame(tick);
        };
        requestAnimationFrame(tick);
        observer.disconnect();
      },
      { threshold: 0.4 },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, [to]);

  return (
    <span ref={ref}>
      {value}
      <em>{suffix}</em>
    </span>
  );
}

export function Ticker({ items }: { items: string[] }) {
  const row = (hidden: boolean) => (
    <div aria-hidden={hidden || undefined} className="tickerItemGroup">
      {items.map((item) => (
        <span className="tickerItem" key={item}>
          {item}
        </span>
      ))}
    </div>
  );
  return (
    <div className="tickerBar" aria-label="Journal announcements">
      <div className="tickerTrack">
        {row(false)}
        {row(true)}
      </div>
    </div>
  );
}

export function ScrollProgress() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let frame = 0;
    const update = () => {
      frame = 0;
      const doc = document.documentElement;
      const total = doc.scrollHeight - doc.clientHeight;
      const progress = total > 0 ? (doc.scrollTop / total) * 100 : 0;
      if (ref.current) ref.current.style.width = `${progress}%`;
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (frame) cancelAnimationFrame(frame);
    };
  }, []);

  return <div ref={ref} className="scrollProgress" aria-hidden="true" />;
}

export function BackToTop() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 650);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <button
      className={`backToTop ${show ? "show" : ""}`}
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      aria-label="Back to top"
      tabIndex={show ? 0 : -1}
    >
      <ArrowUp size={19} />
    </button>
  );
}

export function Slideshow({ slides }: { slides: Array<{ src: string; caption: string; alt: string }> }) {
  const [active, setActive] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => setActive((current) => (current + 1) % slides.length), 5200);
    return () => clearInterval(timer);
  }, [slides.length]);

  return (
    <div className="slideshow">
      {slides.map((slide, index) => (
        <div className={`slide ${index === active ? "active" : ""}`} key={slide.src} aria-hidden={index !== active}>
          <div className="kb">
            <img src={slide.src} alt={index === active ? slide.alt : ""} loading={index === 0 ? "eager" : "lazy"} />
          </div>
          <span className="slideCaption">{slide.caption}</span>
        </div>
      ))}
      <div className="slideDots">
        {slides.map((slide, index) => (
          <button
            key={slide.src}
            className={index === active ? "active" : ""}
            onClick={() => setActive(index)}
            aria-label={`Show slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
}

export function PageTransition({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  return (
    <div key={pathname} className="pageEnter">
      {children}
    </div>
  );
}
