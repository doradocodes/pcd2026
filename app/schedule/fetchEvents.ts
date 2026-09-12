import { ROOMS, ScheduleEvent } from "./events";

const SHEET_CSV_URL =
  "https://docs.google.com/spreadsheets/d/12CG6jn7r_ucKT8j5NJXegfElTbdvd1ESGd_R7aWhj1s/export?format=csv&gid=0";

type Room = (typeof ROOMS)[number]["value"];
type EventType = ScheduleEvent["type"];

function parseCSV(text: string): Record<string, string>[] {
  const lines = text.split(/\r?\n/).filter((l) => l.trim());
  if (lines.length < 2) return [];

  const headers = splitCSVRow(lines[0]).map((h) => h.trim().toLowerCase());

  return lines.slice(1).map((line) => {
    const values = splitCSVRow(line);
    return Object.fromEntries(headers.map((h, i) => [h, (values[i] ?? "").trim()]));
  });
}

function splitCSVRow(row: string): string[] {
  const result: string[] = [];
  let current = "";
  let inQuotes = false;
  for (let i = 0; i < row.length; i++) {
    const ch = row[i];
    if (ch === '"') {
      if (inQuotes && row[i + 1] === '"') { current += '"'; i++; }
      else inQuotes = !inQuotes;
    } else if (ch === "," && !inQuotes) {
      result.push(current);
      current = "";
    } else {
      current += ch;
    }
  }
  result.push(current);
  return result;
}

// Convert "10:00 AM" or "10:00" or "10" to 24h "HH:MM"
function parseTime(raw: string): string | null {
  if (!raw) return null;
  const clean = raw.trim();
  const match = clean.match(/^(\d{1,2})(?::(\d{2}))?\s*(am|pm)?$/i);
  if (!match) return null;
  let h = parseInt(match[1], 10);
  const m = parseInt(match[2] ?? "0", 10);
  const meridiem = (match[3] ?? "").toLowerCase();
  if (meridiem === "pm" && h !== 12) h += 12;
  if (meridiem === "am" && h === 12) h = 0;
  return `${h.toString().padStart(2, "0")}:${m.toString().padStart(2, "0")}`;
}

function normalizeType(raw: string): EventType {
  const t = raw.toLowerCase().trim();
  if (t.includes("workshop")) return "workshop";
  if (t.includes("performance")) return "performance";
  if (t.includes("break") || t.includes("lunch")) return "break";
  if (t.includes("panel")) return "panel";
  return "talk";
}

function normalizeRoom(raw: string): Room {
  const r = raw.toLowerCase().replace(/\s+/g, "-");
  const match = ROOMS.find(
    (room) => room.value === r || room.label.toLowerCase().replace(/\s+/g, "-") === r
  );
  return match?.value ?? "auditorium";
}

function toSlug(text: string): ScheduleEvent["id"] {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "") as ScheduleEvent["id"];
}

export async function fetchScheduleEvents(): Promise<ScheduleEvent[]> {
  const res = await fetch(SHEET_CSV_URL, { next: { revalidate: 60 } });
  if (!res.ok) return [];

  const text = await res.text();
  const rows = parseCSV(text);
  console.log(rows);

  return rows
    .map((row): ScheduleEvent | null => {
      const startTime = parseTime(row["start time"]);
      const endTime = parseTime(row["end time"]);
      if (!startTime || !endTime) return null;

      const title = row["title"] || row["name"] || "";
      if (!title) return null;

      return {
        id: toSlug(title),
        title,
        speaker: row["name"] || undefined,
        description: row["description"] || undefined,
        bio: row["bio"] || undefined,
        room: normalizeRoom(row["room"] ?? ""),
        startTime,
        endTime,
        type: normalizeType(row["type"] ?? ""),
      };
    })
    .filter((e): e is ScheduleEvent => e !== null);
}
