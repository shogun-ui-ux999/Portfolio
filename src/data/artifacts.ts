/**
 * ============================================================
 *  ANCHIT'S MUSEUM — MASTER ARTIFACT DATA
 * ============================================================
 *  Every story, label, and link on the site is driven by this
 *  file. To edit the museum's content, change the entries below
 *  — the UI maps over this data and never hardcodes stories.
 *
 *  `position` tells the interactive bedroom (Prompt 2) where
 *  each object physically sits in the room.
 * ============================================================
 */

export type ArtifactCategory =
  | "Curiosity"
  | "Leadership"
  | "Failure"
  | "Identity"
  | "Future"
  | "Achievement";

export type RoomPosition =
  | "desk"
  | "shelf"
  | "wall"
  | "floor"
  | "nightstand"
  | "drawer"
  | "failure-wing";

export interface EvidenceLink {
  label: string;
  url: string;
}

export interface Artifact {
  /** Stable id used for routing, keys, and viewed-state tracking */
  id: string;
  /** Plaque label, e.g. "Exhibit 01" or "Failure 02" */
  exhibitNumber: string;
  /** Museum plaque title */
  title: string;
  /** What the visitor physically sees in the room */
  objectName: string;
  category: ArtifactCategory;
  story: string;
  lesson: string;
  evidenceLinks: EvidenceLink[];
  /** Where it sits in the bedroom scene */
  position: RoomPosition;
  /** true → displayed in the Museum of Failures */
  isFailure: boolean;
  /** true → hidden until discovered (e.g. drawer letter) */
  isSecret: boolean;
}

/* ============================================================
 *  THE BEDROOM — 9 ARTIFACTS
 * ============================================================ */

export const bedroomArtifacts: Artifact[] = [
  {
    id: "laptop",
    exhibitNumber: "Exhibit 01",
    title: "The Midnight Terminal",
    objectName: "Worn laptop covered in stickers",
    category: "Curiosity",
    story:
      "This is where I taught myself AI and programming from scratch. While others were sleeping, I was taking Google and NVIDIA courses, interning at an AI startup, and building the backend for my neighborhood running club. It represents my belief that if you want to learn something, the internet is your classroom and the code is your exam.",
    lesson:
      "You don't need permission to become an expert; you just need Wi-Fi and stubbornness.",
    evidenceLinks: [
      { label: "Visit Run Club Site", url: "https://rushranchi.vercel.app/" },
    ],
    position: "desk",
    isFailure: false,
    isSecret: false,
  },
  {
    id: "notebook",
    exhibitNumber: "Exhibit 02",
    title: "The AI + Biology Blueprint",
    objectName: "Messy, heavily annotated research notebook",
    category: "Future",
    story:
      "This is where my two obsessions collide: Artificial Intelligence and Biology. I use it to map out how machine learning can solve healthcare problems. It's full of crossed-out code, biological diagrams, and plans for my next move.",
    lesson:
      "The most groundbreaking ideas live at the intersection of two completely different fields.",
    evidenceLinks: [],
    position: "desk",
    isFailure: false,
    isSecret: false,
  },
  {
    id: "certificates",
    exhibitNumber: "Exhibit 03",
    title: "The Proof of Independent Study",
    objectName: "Stack of medical and tech certificates",
    category: "Achievement",
    story:
      "I qualified for NEET (India's national medical exam) twice, independently. But I didn't stop at biology. I also got certified in Advanced Cardiac Life Support (ACLS, completed 08/28/2026) and Basic Life Support (BLS, completed 08/27/2026) before even entering college, alongside tech certs from Cisco and MoES.",
    lesson:
      "True education isn't just about the degree you're chasing; it's about the skills you gather along the way.",
    evidenceLinks: [],
    position: "shelf",
    isFailure: false,
    isSecret: false,
  },
  {
    id: "broken-code",
    exhibitNumber: "Exhibit 04",
    title: "The First 100 Errors",
    objectName: "Screenshot of a terminal full of red error text",
    category: "Failure",
    story:
      "When I first started coding on my own, I had no mentor. Every time I ran my code, it broke. I spent weeks staring at syntax errors, missing semicolons, and logic flaws. This broken build represents the frustrating, unglamorous reality of self-teaching.",
    lesson:
      "Mastery is just the accumulation of thousands of failures that you refused to quit.",
    evidenceLinks: [],
    position: "wall",
    isFailure: true,
    isSecret: false,
  },
  {
    id: "chessboard",
    exhibitNumber: "Exhibit 05",
    title: "64 Squares of Logic",
    objectName: "Physical chessboard next to a custom-coded digital chess game",
    category: "Curiosity",
    story:
      "I play chess to train my patience, but I also coded my own functional chess game from scratch. Building the game mechanics taught me how to translate human strategy into machine logic.",
    lesson:
      "Strategy in life, like in chess, requires you to think three moves ahead and sacrifice the present for the future.",
    evidenceLinks: [],
    position: "floor",
    isFailure: false,
    isSecret: false,
  },
  {
    id: "gap-year",
    exhibitNumber: "Exhibit 06",
    title: "The Age 16 Pivot",
    objectName: "Calendar with a circled date and a sticky note",
    category: "Identity",
    story:
      "I finished Grade 12 at age 16, but I was too young for college admission. Instead of waiting, I took a gap year. I used it to qualify for NEET, build community food initiatives, and intern at an AI startup. This object represents my refusal to let a timeline dictate my ambition.",
    lesson:
      "Time is not something you wait for; it is something you build with.",
    evidenceLinks: [],
    position: "wall",
    isFailure: false,
    isSecret: false,
  },
  {
    id: "mobile",
    exhibitNumber: "Exhibit 07",
    title: "The Hustle Screen",
    objectName: "Smartphone with a cracked screen protector",
    category: "Leadership",
    story:
      "This phone is my command center. I used it to cold-call local bakeries to secure food sponsorships for my community initiative (feeding 200+ people). I use it to track my 5-7km runs for the neighborhood club I founded, and to tutor Class 10 biology students.",
    lesson:
      "A tool is only as valuable as the action it triggers in the real world.",
    evidenceLinks: [],
    position: "nightstand",
    isFailure: false,
    isSecret: false,
  },
  {
    id: "drawer-letter",
    exhibitNumber: "Exhibit 08",
    title: "The Kid's Promise",
    objectName: "Hidden drawer containing an old, folded piece of paper",
    category: "Identity",
    story:
      "Hidden in my desk is a letter I wrote to myself as a kid. It says: 'I will achieve all my dreams and be the best man ever.' I keep it hidden because it's deeply personal, but I look at it whenever my ego tells me to give up. It is the anchor for my relentless attitude.",
    lesson:
      "The person you promised you'd become as a child is still waiting for you to show up.",
    evidenceLinks: [],
    position: "drawer",
    isFailure: false,
    isSecret: true,
  },
  {
    id: "bracelet",
    exhibitNumber: "Exhibit 09",
    title: "The Quiet Sacrifices",
    objectName: "Simple, worn woven bracelet",
    category: "Identity",
    story:
      "This bracelet represents the distractions I had to quit and the sacrifices I made during my gap year. While others were enjoying a normal teenage life, I was grinding through NEET prep, coding, and community work. It's a physical reminder of the discipline it takes to walk your own path.",
    lesson:
      "Every 'yes' to a dream requires a thousand silent 'no's' to distractions.",
    evidenceLinks: [],
    position: "desk",
    isFailure: false,
    isSecret: true,
  },
];

/* ============================================================
 *  THE MUSEUM OF FAILURES — 3 ARTIFACTS
 * ============================================================ */

export const failureArtifacts: Artifact[] = [
  {
    id: "fail-rebellious",
    exhibitNumber: "Failure 01",
    title: "The Un-Obedient Student",
    objectName: "A desk covered in crossed-out syllabus pages",
    category: "Failure",
    story:
      "I was never the most obedient child in class or at coaching centers. I questioned the rote-learning system and often chose to self-study or build projects instead of just following instructions. It caused friction, but it forged my independent mindset.",
    lesson: "Obedience builds followers; curiosity builds founders.",
    evidenceLinks: [],
    position: "failure-wing",
    isFailure: true,
    isSecret: false,
  },
  {
    id: "fail-dream-app",
    exhibitNumber: "Failure 02",
    title: "The App That Never Launched",
    objectName: "A wireframe sketch with 'CANCELLED' stamped on it",
    category: "Failure",
    story:
      "I tried to build my ultimate 'dream app' early on. I had the vision, but my technical skills and project management weren't there yet. It failed, and I had to abandon it. It was a harsh lesson in the gap between ambition and execution.",
    lesson:
      "A brilliant idea is worthless without the disciplined execution to back it up.",
    evidenceLinks: [],
    position: "failure-wing",
    isFailure: true,
    isSecret: false,
  },
  {
    id: "fail-screen-time",
    exhibitNumber: "Failure 03",
    title: "The Jack of All Trades",
    objectName: "A glowing screen-time report showing 9 hours of usage",
    category: "Failure",
    story:
      "My biggest ongoing failure is fighting distractions. Because I am curious about AI, biology, coding, and community work, I often spread myself too thin. I haven't fully mastered the art of focus, and my screen-time report is a daily reminder of the battle against digital noise.",
    lesson:
      "Self-awareness is the first step to self-mastery. I am still fighting this battle every day.",
    evidenceLinks: [],
    position: "failure-wing",
    isFailure: true,
    isSecret: false,
  },
];

/* ============================================================
 *  LOOKUPS
 * ============================================================ */

/** Every artifact in the museum, bedroom first */
export const allArtifacts: Artifact[] = [...bedroomArtifacts, ...failureArtifacts];

export const getArtifactById = (id: string): Artifact | undefined =>
  allArtifacts.find((a) => a.id === id);

/** Artifact ids highlighted by the 30-Second Quick Tour */
export const quickTourIds = ["laptop", "fail-dream-app", "notebook"] as const;
