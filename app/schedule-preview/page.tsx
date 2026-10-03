import SchedulePreview from "./SchedulePreview";
import { fetchScheduleEvents } from "@/app/schedule/fetchEvents";

export default async function SchedulePreviewPage() {
  const events = await fetchScheduleEvents();
  return <SchedulePreview events={events} />;
}
