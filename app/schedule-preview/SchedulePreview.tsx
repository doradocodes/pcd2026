"use client";

import { useEffect, useRef, useState } from "react";
import styles from "./SchedulePreview.module.css";
import { ROOMS, ScheduleEvent } from "@/app/schedule/events";

const START_HOUR = 9;
const END_HOUR = 21;
const TOTAL_MINUTES = (END_HOUR - START_HOUR) * 60;

function timeToMinutes(time: string): number {
  const [h, m] = time.split(":").map(Number);
  return (h - START_HOUR) * 60 + m;
}

function nowToMinutes(): number {
  const now = new Date();
  return (now.getHours() - START_HOUR) * 60 + now.getMinutes();
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

function formatClock(date: Date): string {
  const h = date.getHours();
  const m = date.getMinutes();
  const label = h >= 12 ? "PM" : "AM";
  const hour = h % 12 || 12;
  return `${hour}:${m.toString().padStart(2, "0")} ${label}`;
}

const HOUR_LABELS = Array.from(
  { length: END_HOUR - START_HOUR + 1 },
  (_, i) => START_HOUR + i
);

export default function SchedulePreview({ events }: { events: ScheduleEvent[] }) {
  const [now, setNow] = useState<Date | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setNow(new Date());
    const interval = setInterval(() => setNow(new Date()), 60_000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (!now || !scrollRef.current || !gridRef.current) return;
    const minutes = nowToMinutes();
    if (minutes < 0 || minutes > TOTAL_MINUTES) return;
    const gridHeight = gridRef.current.scrollHeight;
    const pct = minutes / TOTAL_MINUTES;
    const targetScrollTop = gridHeight * pct - scrollRef.current.clientHeight * 0.35;
    scrollRef.current.scrollTo({ top: Math.max(0, targetScrollTop), behavior: "smooth" });
  }, [now]);

  const nowMinutes = now ? nowToMinutes() : null;
  const nowPct =
    nowMinutes !== null && nowMinutes >= 0 && nowMinutes <= TOTAL_MINUTES
      ? (nowMinutes / TOTAL_MINUTES) * 100
      : null;

  const eventsByRoom = ROOMS.map((room) =>
    events.filter((e) => e.room === room.value)
  );

  return (
    <div className={styles.fullscreen}>
      <div className={styles.topBar}>
        <span className={styles.topBarTitle}>Processing Community Day NYC 2026</span>
        {now && <span className={styles.clock}>{formatClock(now)}</span>}
      </div>

      <div className={styles.scrollArea} ref={scrollRef}>
        <div className={styles.grid} ref={gridRef}>
          <div className={styles.timeColumn}>
            <div className={styles.cornerCell} />
            <div className={styles.timeSlots}>
              {HOUR_LABELS.map((hour) => (
                <div
                  key={hour}
                  className={styles.timeLabel}
                  style={{ top: `${((hour - START_HOUR) / (END_HOUR - START_HOUR)) * 100}%` }}
                >
                  {hour !== START_HOUR && formatHour(hour)}
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
                    style={{ top: `${((hour - START_HOUR) / (END_HOUR - START_HOUR)) * 100}%` }}
                  />
                ))}

                {nowPct !== null && (
                  <div className={styles.nowLine} style={{ top: `${nowPct}%` }} />
                )}

                {eventsByRoom[roomIdx].map((event) => {
                  const top = (timeToMinutes(event.startTime) / TOTAL_MINUTES) * 100;
                  const height = (
                    (timeToMinutes(event.endTime) - timeToMinutes(event.startTime)) / TOTAL_MINUTES
                  ) * 100;
                  const isPast =
                    nowMinutes !== null &&
                    timeToMinutes(event.endTime) < nowMinutes;
                  return (
                    <div
                      key={event.id}
                      className={`${styles.event} ${styles[event.type]} ${isPast ? styles.past : ""}`}
                      style={{ top: `${top}%`, height: `${height}%` }}
                      data-room={room.value}
                    >
                      <span className={styles.eventTime}>
                        {formatTime(event.startTime)}–{formatTime(event.endTime)}
                      </span>
                      <span className={styles.eventTitle}>{event.title}</span>
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
    </div>
  );
}
