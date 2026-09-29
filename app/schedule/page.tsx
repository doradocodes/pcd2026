import Schedule from "./Schedule";
import PageHeader from "@/app/PageHeader";
import { fetchScheduleEvents } from "./fetchEvents";
import styles from "@/app/schedule/Schedule.module.css";

const RSVP_URL = 'https://forms.gle/JWfiAyRWDTqxQh3e6';

export default async function SchedulePage() {
  const events = await fetchScheduleEvents();

  return (
    <main id="main-content">
      <PageHeader>
        <h1>Event Schedule</h1>
        <div>
          <p className={styles.headerSubtitle}>See the full programming for this event on the calendar below. Be sure to RSVP for the workshop to ensure your spot!</p>
          <a className={styles.rsvpCTA} href={RSVP_URL}>
            RSVP for this workshop <span aria-hidden="true">↗</span>
          </a>
        </div>
      </PageHeader>

      <Schedule events={events} />
    </main>
  );
}
