"use client";

import { useEffect, useRef, useState } from "react";
import styles from "./Schedule.module.css";
import { ROOMS, ScheduleEvent } from './events';

const START_HOUR = 9;
const END_HOUR = 21;
const TOTAL_MINUTES = (END_HOUR - START_HOUR) * 60;

function timeToMinutes(time: string): number {
  const [h, m] = time.split(":").map(Number);
  return (h - START_HOUR) * 60 + m;
}

function formatHour(hour: number): string {
  if (hour === 12) return "12pm";
  if (hour > 12) return `${hour - 12}pm`;
  return `${hour}am`;
}

function formatTime(time: string): string {
  const [h, m] = time.split(":").map(Number);
  const label = h >= 12 ? "pm" : "am";
  const hour = h % 12 || 12;
  return m === 0 ? `${hour}${label}` : `${hour}:${m.toString().padStart(2, "0")}${label}`;
}

const HOUR_LABELS = Array.from(
  { length: END_HOUR - START_HOUR + 1 },
  (_, i) => START_HOUR + i
);

const TYPE_LABELS: Record<ScheduleEvent["type"], string> = {
  talk: "Talk",
  workshop: "Workshop",
  performance: "Performance",
  break: "Break",
  panel: "Panel",
};

function EventPopup({ event, roomLabel, onClose }: {
  event: ScheduleEvent;
  roomLabel: string;
  onClose: () => void;
}) {
  const dialogRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  return (
    <div className={styles.overlay} onClick={onClose} role="dialog" aria-modal="true" aria-label={event.title}>
      <div
        ref={dialogRef}
        className={`${styles.popup}`}
        onClick={(e) => e.stopPropagation()}
      >
        <button className={styles.popupClose} onClick={onClose} aria-label="Close">✕</button>
        <span className={styles.popupType}>{TYPE_LABELS[event.type]}</span>
        <h2 className={styles.popupTitle}>{event.title}</h2>
        {event.speaker && <p className={styles.popupSpeaker}>{event.speaker}</p>}
        <div className={styles.popupMeta}>
          <span>{formatTime(event.startTime)}–{formatTime(event.endTime)}</span>
          <span>{roomLabel}</span>
        </div>
        {event.description && <p className={styles.popupDescription}>{event.description}</p>}
        {event.bio && <p className={styles.popupBio}>{event.bio}</p>}
      </div>
    </div>
  );
}

export default function Schedule({ events }: { events: ScheduleEvent[] }) {
  const [selected, setSelected] = useState<{ event: ScheduleEvent; roomLabel: string } | null>(null);

  const eventsByRoom = ROOMS.map((room) =>
    events.filter((e) => e.room === room.value)
  );

  return (
    <>
      <div className={styles.wrapper}>
        <div className={styles.grid}>
          <div className={styles.timeColumn}>
            <div className={styles.cornerCell} />
            <div className={styles.timeSlots}>
              {HOUR_LABELS.map((hour) => (
                <div
                  key={hour}
                  className={styles.timeLabel}
                  style={{
                    top: `${((hour - START_HOUR) / (END_HOUR - START_HOUR)) * 100}%`,
                  }}
                >
                  {hour !== 9 && formatHour(hour)}
                </div>
              ))}
            </div>
          </div>

          {ROOMS.map((room, roomIdx) => (
            <div key={room.value} className={styles.roomColumn}>
              <div className={styles.roomHeader} data-type={room.value}>{room.label}</div>
              <div className={styles.roomBody}>
                {HOUR_LABELS.map((hour) => (
                  <div
                    key={hour}
                    className={styles.hourLine}
                    style={{
                      top: `${((hour - START_HOUR) / (END_HOUR - START_HOUR)) * 100}%`,
                    }}
                  />
                ))}
                {eventsByRoom[roomIdx].map((event) => {
                  const top = (timeToMinutes(event.startTime) / TOTAL_MINUTES) * 100;
                  const height = ((timeToMinutes(event.endTime) - timeToMinutes(event.startTime)) / TOTAL_MINUTES) * 100;
                  return (
                    <div
                      key={event.id}
                      className={`${styles.event} ${styles[event.type]}`}
                      style={{ top: `${top}%`, height: `${height}%` }}
                      data-room={room.value}
                      onClick={() => setSelected({ event, roomLabel: room.label })}
                      role="button"
                      tabIndex={0}
                      onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") setSelected({ event, roomLabel: room.label }); }}
                      aria-label={`${event.title}${event.speaker ? `, ${event.speaker}` : ""}, ${formatTime(event.startTime)}–${formatTime(event.endTime)}`}
                    >
                      {/*<span className={styles.eventTime}>{formatTime(event.startTime)}-{formatTime(event.endTime)}</span>*/}
                      <span className={styles.eventTitle}>{formatTime(event.startTime)}-{formatTime(event.endTime)} {event.title}</span>
                      {event.speaker && (
                        <span className={styles.eventSpeaker}>{event.speaker}</span>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </div>

      {selected && (
        <EventPopup
          event={selected.event}
          roomLabel={selected.roomLabel}
          onClose={() => setSelected(null)}
        />
      )}
    </>
  );
}
