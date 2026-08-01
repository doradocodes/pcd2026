import Image from "next/image";
import styles from "./page.module.css";

const OPEN_CALL_URL = "https://forms.gle/UBMeghY5D5mdf1cx7";
const VOLUNTEER_URL = "https://forms.gle/JP6p3CTwrhuLqQXeA";

function Arrow() {
  return <span aria-hidden="true">↗</span>;
}

export default function Home() {
  return (
    <main className={styles.page}>
      <header className={styles.header}>
        <a className={styles.wordmark} href="#top" aria-label="PCD 2026 home">
          <Image
            src="/brand/logo-monochrome-horizontal.png"
            alt="PCD 2026"
            width={2420}
            height={780}
            priority
          />
        </a>
        <nav className={styles.nav} aria-label="Primary navigation">
          <a href="#about">About</a>
          <a href="#schedule">Schedule</a>
          <a href="#speakers">Speakers</a>
          <a href="#open-call">Open call</a>
        </nav>
        <a className={styles.headerCta} href={OPEN_CALL_URL}>
          Open call <Arrow />
        </a>
      </header>

      <section className={styles.hero} id="top">
        {/* <div className={styles.heroIdentity}>
          <Image
            src="/brand/logo-green-black.png"
            alt="PCD 2026"
            width={1320}
            height={760}
            priority
          />
          <p>Processing's 25th anniversary</p>
        </div>

        <div className={styles.heroDate}>
          <span>October</span>
          <strong>03</strong>
          <span>2026</span>
        </div>

        <div className={styles.heroPlace}>
          <p>NYU ITP</p>
          <p>Downtown Brooklyn</p>
          <p>Saturday</p>
        </div> */}
      </section>

      <section className={styles.about} id="about">
        <div className={styles.aboutGrid}>
          <h1>Processing Community Day is a global, community-led celebration.</h1>
          <div className={styles.aboutCopy}>
            <p>
              Processing Community Day is a global, community-led celebration
              that brings together artists, designers, technologists, educators,
              and open-source communities across the world.
            </p>
            <p>
              This year is a special event, as we are also celebrating
              Processing&apos;s 25th anniversary! The event will be a full day of
              scheduled programming, including talks, workshops,
              performances—all related to creative coding!
            </p>
          </div>
        </div>
        <div className={styles.aboutMotif} aria-hidden="true">
          <Image
            src="/brand/motif-curve-blue.png"
            alt=""
            width={430}
            height={430}
          />
        </div>
      </section>

      <section className={styles.dateBand} aria-label="Event date">
        <div className={styles.dateDigits}>
          <span>10</span>
          <i>/</i>
          <span>03</span>
          <i>/</i>
          <span>26</span>
        </div>
        <div className={styles.dateNote}>
          <span>Saturday</span>
          <span>NYU ITP</span>
          <span>Downtown Brooklyn</span>
        </div>
      </section>

      <section className={styles.program} aria-label="Event program">
        <article className={styles.schedule} id="schedule">
          <div className={styles.tbd}>TBD</div>
          <div className={styles.ditherField} aria-hidden="true" />
        </article>
        <article className={styles.speakers} id="speakers">
          <div className={styles.tbd}>TBD</div>
          <Image
            className={styles.speakerMotif}
            src="/brand/motif-asterisk-olive.png"
            alt=""
            width={430}
            height={430}
          />
        </article>
      </section>

      <section className={styles.openCall} id="open-call">
        <div className={styles.openCallGrid}>
          <h2>Want to be a part of the programming?</h2>
          <div className={styles.openCallAction}>
            <p>Propose to be a presenter.</p>
            <a href={OPEN_CALL_URL}>
              Open call <Arrow />
            </a>
          </div>
        </div>
        <div className={styles.openCallPixels} aria-hidden="true" />
      </section>

      <section className={styles.location} id="location">
        <div className={styles.locationGrid}>
          <div className={styles.locationText}>
            <p>PCD&apos;26 @ NYC will be hosted by</p>
            <h2>NYU ITP</h2>
            <p>Downtown Brooklyn</p>
            <p>October 3, 2026</p>
          </div>
          <div className={styles.mapFrame}>
            <iframe
              title="Map of NYU ITP in Downtown Brooklyn"
              src="https://www.google.com/maps?q=NYU+ITP%2C+Downtown+Brooklyn&output=embed"
              loading="lazy"
              allowFullScreen
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>
      </section>

      <section className={styles.community}>
        <article className={styles.volunteer} id="volunteering">
          <p>
            PCD is a volunteer-run event. We welcome volunteers at any capacity!
            If you&apos;re interested in being a volunteer, please fill out this form.
          </p>
          <a href={VOLUNTEER_URL}>
            Volunteer <Arrow />
          </a>
        </article>

        <article className={styles.history} id="history">
          <a href="https://pcdnyc.github.io/">
            History <Arrow />
          </a>
          <Image
            src="/brand/motif-arch-blue.png"
            alt=""
            width={430}
            height={430}
          />
        </article>
      </section>

      <footer className={styles.footer}>
        <div className={styles.footerLogo}>
          <Image
            src="/brand/logo-olive-multicolor-stacked.png"
            alt="PCD 2026"
            width={1210}
            height={960}
          />
        </div>
        <div className={styles.footerLinks}>
          <a href={OPEN_CALL_URL}>
            Open call <Arrow />
          </a>
          <a href={VOLUNTEER_URL}>
            Volunteer <Arrow />
          </a>
        </div>
        <div className={styles.footerContact}>
          <a href="https://www.instagram.com/pcd.nyc.2026/">@pcd.nyc.2026</a>
          <a href="mailto:team@pcd2026.nyc">team@pcd2026.nyc</a>
        </div>
      </footer>
    </main>
  );
}
