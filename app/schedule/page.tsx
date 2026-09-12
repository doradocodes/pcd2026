import Schedule from "./Schedule";
import PageHeader from "@/app/PageHeader";
import { fetchScheduleEvents } from "./fetchEvents";

export default async function SchedulePage() {
  const events = await fetchScheduleEvents();

  return (
    <main id="main-content">
      <PageHeader>
        <h1>Event Schedule</h1>
      </PageHeader>
      <Schedule events={events} />
    </main>
  );
}
