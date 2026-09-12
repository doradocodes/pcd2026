export const ROOMS = [
  { value: "auditorium", label: "Auditorium" },
  { value: "classroom-1", label: "Classroom 1: Sound" },
  { value: "classroom-2", label: "Classroom 2: Education" },
  { value: "classroom-3", label: "Classroom 3: Art" },
  { value: "garage", label: "Garage" },
] as const;

type Room = (typeof ROOMS)[number]["value"];
type EventType = "talk" | "workshop" | "performance" | "break" | "panel";
type Slug = string & { readonly __brand: "Slug" };
const slug = (s: string) => s as Slug;

export interface ScheduleEvent {
  id: Slug;
  title: string;
  speaker?: string;
  description?: string;
  bio?: string;
  room: Room;
  startTime: string;
  endTime: string;
  type: EventType;
}

export const events: ScheduleEvent[] = [
  // auditorium
  {
    id: slug("welcome-opening-remarks"),
    title: "Welcome & Opening Remarks",
    speaker: "PCD NYC Organizers",
    room: "auditorium",
    startTime: "10:00",
    endTime: "10:15",
    type: "talk",
  },
  {
    id: slug("3650-days-later"),
    title: "3,650 Days Later",
    speaker: "Suraj Barthy",
    room: "auditorium",
    startTime: "10:25",
    endTime: "10:55",
    type: "talk",
  },
  {
    title: 'Extending Poetry Through Computation',
    id: slug('extending-poetry-through-computation'),
    room: 'auditorium',
    startTime: "11:00",
    endTime: "11:15",
    type: "talk",
  },
  {
    title: 'P5ML: Processing in HTML',
    id: slug('p5ml'),
    room: 'auditorium',
    startTime: "11:20",
    endTime: "11:35",
    type: "talk",
  },
  {
    title: 'p5 Plotter Control: A Real-Time Pen Plotter Control Library for p5.js',
    id: slug('p5-plotter-control'),
    room: 'auditorium',
    startTime: "11:40",
    endTime: "12:25",
    type: "talk",
  },
  {
    title: 'Weaving an identity for an organization, software, and community',
    id: slug('weaving-identity'),
    room: 'auditorium',
    startTime: "12:30",
    endTime: "13:00",
    type: "talk",
  },
  {
    title: 'Source Code for a Feeling',
    id: slug('source-code-for-a-feeling'),
    room: 'auditorium',
    startTime: "14:00",
    endTime: "14:15",
    type: "talk",
  },
  {
    title: 'emergence study',
    id: slug('emergence-study'),
    room: 'auditorium',
    startTime: "14:20",
    endTime: "14:55",
    type: "talk",
  },
  {
    title: 'Ancient Patterns',
    id: slug('ancient-patterns'),
    room: 'auditorium',
    startTime: "15:00",
    endTime: "15:30",
    type: "talk",
  },
  {
    title: 'Introduction to Open Source Contribution',
    id: slug('introduction-to-open-source-contribution'),
    room: 'auditorium',
    startTime: "16:00",
    endTime: "17:00",
    type: "talk",
  },
  {
    title: 'Keynote: Processing 5.0',
    id: slug('processing-5.0'),
    room: 'auditorium',
    startTime: "17:25",
    endTime: "18:10",
    type: "talk",
  },
  {
    title: 'Open Projector: Show what you did today!',
    id: slug('open-projector'),
    room: 'auditorium',
    startTime: "18:15",
    endTime: "18:45",
    type: "talk",
  },

  // workshops
  {
    id: slug("music-theory-for-creative-coders"),
    title: "Music Theory for Creative Coders",
    speaker: "Jesse Fisher",
    room: "classroom-1",
    startTime: "11:00",
    endTime: "12:20",
    type: "workshop",
  },
  {
    id: slug("musical-web"),
    title: "The Musical Web: shaping sounds in p5.js",
    room: "classroom-1",
    startTime: "14:00",
    endTime: "15:00",
    type: "workshop",
  },
  {
    id: slug("more-than-music-with-midi"),
    title: "More than Music with MIDI",
    room: "classroom-1",
    startTime: "16:00",
    endTime: "17:20",
    type: "workshop",
  },


  {
    id: slug("generative-typography"),
    title: "p5 High Five!",
    speaker: "",
    room: "classroom-2",
    startTime: "11:00",
    endTime: "12:20",
    type: "workshop",
  },
  {
    title: 'Circuits to Graphics: Hardware Interfaces for Visual Systems',
    id: slug("circuits-to-graphics"),
    speaker: "",
    room: "classroom-2",
    startTime: "14:00",
    endTime: "15:00",
    type: "workshop",
  },
  {
    title: 'Creatively Permacomputing: An Introduction to L5',
    id: slug("creatively-permacomputing-intro-to-l5"),
    speaker: "",
    room: "classroom-2",
    startTime: "16:00",
    endTime: "17:20",
    type: "workshop",
  },


  {
    id: slug("p5-book"),
    title: "p5.book: A Generative & Adobe-free Approach to Bookmaking",
    speaker: "",
    room: "classroom-3",
    startTime: "11:00",
    endTime: "12:20",
    type: "workshop",
  },
  {
    id: slug("word-and-image"),
    title: "Word and Image",
    speaker: "",
    room: "classroom-3",
    startTime: "14:00",
    endTime: "15:00",
    type: "workshop",
  },
  {
    title: "Playable Eyes: Eye Tracking for Creative Coding",
    id: slug("eyes-tracking-for-creative-coding"),
    speaker: "",
    room: "classroom-3",
    startTime: "16:00",
    endTime: "17:20",
    type: "workshop",
  },

  // performances
  {
    title: "Performances",
    id: slug("performances"),
    speaker: "",
    room: "garage",
    startTime: "19:00",
    endTime: "20:00",
    type: "workshop",
  },


  // lunch
  {
    id: slug("lunch-break"),
    title: "Lunch Break",
    room: "auditorium",
    startTime: "13:00",
    endTime: "14:00",
    type: "break",
  },
  {
    id: slug("lunch-break"),
    title: "Lunch Break",
    room: "classroom-1",
    startTime: "13:00",
    endTime: "14:00",
    type: "break",
  },
  {
    id: slug("lunch-break"),
    title: "Lunch Break",
    room: "classroom-2",
    startTime: "13:00",
    endTime: "14:00",
    type: "break",
  },
  {
    id: slug("lunch-break"),
    title: "Lunch Break",
    room: "classroom-3",
    startTime: "13:00",
    endTime: "14:00",
    type: "break",
  },
];