"use client";

import { useEffect, useState } from "react";
import styles from "./Header.module.css";

const RSVP_URL = "https://www.eventbrite.com/e/processing-community-day-2026-nyc-tickets-1995608029336?aff=oddtdtcreator&keep_tld=true";

export default function MobileMenu() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") setOpen(false); };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  return (
    <>
      <button
        className={styles.menuToggle}
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        aria-label={open ? "Close menu" : "Open menu"}
      >
        <span className={styles.menuIcon} aria-hidden="true">
          {open ? "✕" : "☰"}
        </span>
      </button>

      {open && (
        <div className={styles.mobileNav} role="dialog" aria-label="Navigation">
          <button
            className={styles.mobileNavClose}
            onClick={() => setOpen(false)}
            aria-label="Close menu"
          >
            ✕
          </button>
          <nav aria-label="Mobile navigation">
            <a href="/#about" onClick={() => setOpen(false)}>About</a>
            <a href="/schedule" onClick={() => setOpen(false)}>Schedule</a>
            <a href="/#speakers" onClick={() => setOpen(false)}>Speakers</a>
            <a href="/#volunteering" onClick={() => setOpen(false)}>Volunteer</a>
            <a href={RSVP_URL} onClick={() => setOpen(false)}>RSVP ↗</a>
          </nav>
        </div>
      )}
    </>
  );
}
