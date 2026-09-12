import Image from "next/image";
import styles from "./Header.module.css";

const RSVP_URL = "https://www.eventbrite.com/e/processing-community-day-2026-nyc-tickets-1995608029336?aff=oddtdtcreator&keep_tld=true";

export default function Header() {
  return (
    <header className={styles.header}>
      <a className={styles.wordmark} href="/" aria-label="PCD 2026 home">
        <Image
          src="/brand/logo-monochrome-horizontal.png"
          alt="PCD 2026"
          width={2420}
          height={780}
          priority
        />
      </a>
      <nav className={styles.nav} aria-label="Primary navigation">
        <a href="/#about">About</a>
        <a href="/schedule">Schedule</a>
        <a href="/#speakers">Speakers</a>
        <a href="/#volunteering">Volunteer</a>
      </nav>
      <a className={styles.headerCta} href={RSVP_URL}>
        RSVP <span aria-hidden="true">↗</span>
      </a>
    </header>
  );
}
