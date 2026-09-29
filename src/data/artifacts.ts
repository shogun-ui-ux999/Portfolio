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
  /** true → renders a "Verified" badge and the official-certificate overlay */
  verified?: boolean;
}

/**
 * Structured fields for official certificates — the Certificate
 * Evidence View renders these like the physical document.
 */
export interface CertificateEvidence {
  kind: "certificate" | "participation";
  recipient: string;
  course: string;
  /** e.g. "August 28, 2026" or "August 2026" */
  completionDate: string;
  issuer: string;
  tagline?: string;
  standards?: string[];
  signatories: Array<{ name: string; role: string }>;
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
  /** Verbatim narration for the Audio Guide panel (coming soon) */
  audioGuideScript?: string;
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
    audioGuideScript:
      "You've found the brightest spot in the room. This is where I taught myself AI and programming — no classroom, no permission slip. While others were asleep, I was inside Google and NVIDIA courses, interning at an AI startup, and building the backend for my running club. If you want to learn something, the internet is your classroom, and the code is your exam.",
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
      "I qualified for NEET, India's national medical entrance examination, twice consecutively while preparing independently. But I did not stop at theory. Before entering college, I completed Advanced Cardiac Life Support (ACLS) and Basic Life Support (BLS) through SaveaLife.com, empowered by Advanced Medical Certification. Both courses adhere to the latest ILCOR Standards and Guidelines and are Joint Commission (JCAHO) compliant. Alongside these, I earned technology certificates from Google, Cisco, NVIDIA, MoES, and Aarogya Setu 2.0.",
    lesson:
      "True education isn't just about the degree you're chasing; it's about the skills you gather along the way.",
    evidenceLinks: [
      {
        label: "Advanced Cardiac Life Support (ACLS)",
        url: "",
        verified: true,
      },
      {
        label: "Basic Life Support (BLS)",
        url: "",
        verified: true,
      },
      {
        label: "MoES Foundation Day Quiz 2026 — Participation",
        url: "",
        verified: true,
      },
      {
        label: "Aarogya Setu 2.0 Quiz — Participation",
        url: "",
        verified: true,
      },
    ],
    audioGuideScript:
      "Look up at the shelf — those aren't participation trophies. I qualified for NEET, India's national medical entrance examination, twice, while preparing on my own. But I didn't stop at theory. Before college even began, I completed Advanced Cardiac Life Support and Basic Life Support — actual emergency-medicine training, ILCOR standards, JCAHO compliant. Alongside those, technology certificates from Google, Cisco, NVIDIA, MoES, and Aarogya Setu 2.0. When I say I taught myself, this shelf is the receipt.",
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
    audioGuideScript:
      "Careful — this one isn't beautiful. When I started coding alone, everything broke. Weeks of syntax errors, missing semicolons, logic flaws, no mentor to ask. Frame it however you like, it's still a wall of red. But this is what the start of mastery actually looks like: thousands of small failures that you simply refused to quit.",
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
    audioGuideScript:
      "You found the drawer. Most visitors walk right past it. Hidden here is a letter I wrote to myself as a kid — it says: 'I will achieve all my dreams and be the best man ever.' I keep it hidden because it's deeply personal. But whenever my ego tells me to give up, I read it again. The child who wrote that is still waiting for me to show up.",
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
    audioGuideScript:
      "One last thing before you leave the room. This plain, worn bracelet stands for every distraction I quit and every normal teenage evening I gave up during the gap year — while others were out, I was grinding through NEET prep, code, and community work. Every 'yes' to a dream requires a thousand silent 'no's to distractions. This is what they look like, woven together.",
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

/** Narrator caption shown at each Quick Tour stop. */
export const quickTourCaptions: Record<string, string> = {
  laptop: "Where I taught myself AI, coding, and independent research.",
  "fail-dream-app":
    "My biggest failure taught me that ideas need disciplined execution.",
  notebook:
    "Where I plan my future: merging artificial intelligence and healthcare.",
};

/* ============================================================
 *  CERTIFICATE EVIDENCE — VERIFIED DOCUMENTS
 * ============================================================
 *  Exact transcriptions of Anchit's certificates. The
 *  Certificate Evidence View renders these like the official
 *  documents, with a "Verified Evidence" stamp.
 * ============================================================ */

export const certificateEvidence: Record<
  string,
  CertificateEvidence
> = {
  acl: {
    kind: "certificate",
    recipient: "Anchit Aman",
    course: "Advanced Cardiac Life Support (ACLS) Course",
    completionDate: "August 28, 2026",
    issuer:
      "SaveaLife.com, empowered by Advanced Medical Certification",
    standards: [
      "Adheres to the latest ILCOR Standards and Guidelines",
      "Joint Commission (JCAHO) compliant",
    ],
    signatories: [
      { name: "Karl F. Disque, D.O., RPh.", role: "Certifying Physician" },
    ],
  },
  bls: {
    kind: "certificate",
    recipient: "Anchit Aman",
    course: "Basic Life Support (BLS) Course",
    completionDate: "August 27, 2026",
    issuer:
      "SaveaLife.com, empowered by Advanced Medical Certification",
    standards: [
      "Adheres to the latest ILCOR Standards and Guidelines",
      "Joint Commission (JCAHO) compliant",
    ],
    signatories: [
      { name: "Karl F. Disque, D.O., RPh.", role: "Certifying Physician" },
    ],
  },
  moes: {
    kind: "participation",
    recipient: "Anchit Aman",
    course: "Foundation Day Quiz — Ministry of Earth Sciences",
    completionDate: "2026",
    issuer: "Ministry of Earth Sciences, Government of India · MyGov",
    tagline: "Advancing Earth Sciences, Empowering the Nation",
    standards: [],
    signatories: [
      {
        name: "Sreenivasa Rao Gangi Reddy",
        role: "Joint Secretary, Ministry of Earth Sciences",
      },
      { name: "Ajit Kumar, IAS", role: "CEO, MyGov" },
    ],
  },
  aarogya: {
    kind: "participation",
    recipient: "Anchit Aman",
    course: "Aarogya Setu 2.0 Awareness Quiz",
    completionDate: "2026",
    issuer:
      "Ministry of Health and Family Welfare · National Health Authority · MyGov",
    tagline:
      "Promoting awareness of digital health and the Aarogya Setu 2.0 app",
    standards: [],
    signatories: [
      { name: "Ajit Kumar, IAS", role: "CEO, MyGov" },
      {
        name: "Dr. Sunil Kumar Barnwal, IAS",
        role: "Mission Director, National Health Authority",
      },
    ],
  },
};

/** Map evidence link labels to their certificate record. */
export const evidenceLabelToCertificate: Record<string, CertificateEvidence> =
  {
    "Advanced Cardiac Life Support (ACLS)": certificateEvidence.acl,
    "Basic Life Support (BLS)": certificateEvidence.bls,
    "MoES Foundation Day Quiz 2026 — Participation": certificateEvidence.moes,
    "Aarogya Setu 2.0 Quiz — Participation": certificateEvidence.aarogya,
  };
