"use client";

import { useEffect, useState } from "react";

type Theme = "signature" | "classic";

function readTheme(): Theme {
  if (typeof document === "undefined") return "signature";
  return document.documentElement.dataset.theme === "classic" ? "classic" : "signature";
}

export function ThemeToggle() {
  const [theme, setTheme] = useState<Theme>("signature");

  useEffect(() => {
    setTheme(readTheme());
    const sync = () => setTheme(readTheme());
    window.addEventListener("ijitmes:theme", sync);
    return () => window.removeEventListener("ijitmes:theme", sync);
  }, []);

  function select(next: Theme) {
    setTheme(next);
    document.documentElement.dataset.theme = next;
    try {
      localStorage.setItem("ijitmes-theme", next);
    } catch {
      /* storage unavailable */
    }
    window.dispatchEvent(new Event("ijitmes:theme"));
  }

  return (
    <div className="themeToggle" role="group" aria-label="Colour theme">
      <button type="button" className={theme === "signature" ? "active" : ""} onClick={() => select("signature")} aria-pressed={theme === "signature"}>
        <span className="swatch" style={{ background: "#a5174e" }} /> Signature
      </button>
      <button type="button" className={theme === "classic" ? "active" : ""} onClick={() => select("classic")} aria-pressed={theme === "classic"}>
        <span className="swatch" style={{ background: "#176c73" }} /> Classic
      </button>
    </div>
  );
}
