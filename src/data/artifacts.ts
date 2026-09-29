/*
  ── MASTER ARTIFACT DATA ────────────────────────────────────
  Every story, lesson, and label on the site is driven by this
  file. Edit text here — the UI maps over it automatically.
*/

export type ArtifactCategory =
  | "Curiosity"
  | "Leadership"
  | "Failure"
  | "Identity"
  | "Achievement"
  | "Future";

export interface EvidenceLink {
  label: string;
  url: string;
}

export interface EvidenceDetail {
  label: string;
  description?: string;
  issuer?: string;
  completionDate?: string;
  standards?: string;
  certifiedBy?: string;
  status?: string;
  /** Optional structured data for the Certificate Evidence View */
  certificate?: {
    title: string;
    name: string;
    course: string;
    completionDate: string;
    issuer: string;
    standards: string;
    certifiedBy: string;
  };
}

export interface Artifact {
  id: string;
  exhibitNumber: string;
  title: string;
  objectName: string;
  category: ArtifactCategory;
  story: string;
  lesson: string;
  /** One-line summary for the List View */
  shortLabel?: string;
  evidenceLinks?: EvidenceLink[];
  evidenceDetails?: EvidenceDetail[];
  audioGuideScript?: string;
  /**
   * Optional photo of the real object. Drop a file into
   * `public/artifacts/<id>.jpg` (or set any path/URL here) and the
   * bedroom + plaque render it with the warm night-room treatment;
   * when absent, the CSS glyph illustration is shown instead.
   */
  imageUrl?: string;
  /** Visual-only: where the object sits in the room */
  position: "desk" | "shelf" | "wall" | "floor" | "nightstand" | "drawer" | "failure-wing";
  isFailure: boolean;
  isSecret: boolean;
}

export const artifacts: Artifact[] = [
  // ── BEDROOM ARTIFACTS ────────────────────────────────────
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
    shortLabel: "Where I taught myself AI and programming, late at night, with no mentor.",
    evidenceLinks: [{ label: "Visit Run Club Site", url: "https://rushranchi.vercel.app/" }],
    audioGuideScript:
      "This laptop is where I taught myself AI and programming. I did not wait for a class or a mentor. I used free courses, late nights, and a lot of broken code. It represents my belief that if you want to learn something, you can start tonight.",
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
    shortLabel: "Where AI and Biology collide — my plans for healthcare's future.",
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
    shortLabel: "NEET twice, plus ACLS, BLS, and tech certificates earned independently.",
    evidenceDetails: [
      {
        label: "ACLS Certificate",
        description: "Advanced Cardiac Life Support Course",
        issuer: "SaveaLife.com, empowered by Advanced Medical Certification",
        completionDate: "08/28/2026",
        standards:
          "Latest ILCOR Standards and Guidelines, Joint Commission (JCAHO) compliant",
        certifiedBy: "Karl F. Disque D.O. RPh",
        certificate: {
          title: "CERTIFICATE OF COMPLETION",
          name: "Anchit Aman",
          course: "Advanced Cardiac Life Support Course",
          completionDate: "08/28/2026",
          issuer: "SaveaLife.com, empowered by Advanced Medical Certification",
          standards:
            "This certificate certifies that the individual listed above has successfully completed the Advanced Cardiac Life Support (ACLS) Course in accordance with the curriculum of SaveaLife.com, empowered by Advanced Medical Certification, and adheres to the latest ILCOR Standards and Guidelines and is Joint Commission (JCAHO) compliant.",
          certifiedBy: "Karl F. Disque D.O. RPh",
        },
      },
      {
        label: "BLS Certificate",
        description: "Basic Life Support Course",
        issuer: "SaveaLife.com, empowered by Advanced Medical Certification",
        completionDate: "08/27/2026",
        standards:
          "Latest ILCOR Standards and Guidelines, Joint Commission (JCAHO) compliant",
        certifiedBy: "Karl F. Disque D.O. RPh",
        certificate: {
          title: "CERTIFICATE OF COMPLETION",
          name: "Anchit Aman",
          course: "Basic Life Support Course",
          completionDate: "08/27/2026",
          issuer: "SaveaLife.com, empowered by Advanced Medical Certification",
          standards:
            "This certificate certifies that the individual listed above has successfully completed the Basic Life Support (BLS) Course in accordance with the curriculum of SaveaLife.com, empowered by Advanced Medical Certification, and adheres to the latest ILCOR Standards and Guidelines and is Joint Commission (JCAHO) compliant.",
          certifiedBy: "Karl F. Disque D.O. RPh",
        },
      },
      {
        label: "MoES Foundation Day Quiz",
        description:
          "Participation certificate for MoES Foundation Day Quiz: Advancing Earth and Empowering the Nation",
        issuer: "Ministry of Earth Sciences",
        status: "Will upload later",
      },
      {
        label: "Aarogya Setu 2.0 Quiz",
        description:
          "Participation certificate for Aarogya Setu 2.0 Quiz: Contributing to SDG Propote Awareness of Digital Health",
        issuer: "Ministry of Health and Family Welfare",
        status: "Will upload later",
      },
    ],
    audioGuideScript:
      "These certificates are proof that I did not wait for permission. I qualified for NEET twice, and before college I completed ACLS and BLS certification. They show that I want to be ready before opportunity arrives.",
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
    shortLabel: "Weeks of red error text — the unglamorous reality of self-teaching.",
    audioGuideScript:
      "These red errors are not embarrassing to me anymore. They are evidence of the first version of myself that refused to quit. Every error taught me patience, logic, and humility.",
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
    shortLabel: "I play chess — and I coded my own chess game from scratch.",
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
    lesson: "Time is not something you wait for; it is something you build with.",
    shortLabel: "Finished school at 16 — turned the wait into a laboratory.",
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
    lesson: "A tool is only as valuable as the action it triggers in the real world.",
    shortLabel: "Cold calls, run tracking, biology tutoring — my command center.",
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
    shortLabel: "A childhood letter I hide in my desk and read when I want to quit.",
    audioGuideScript:
      "This letter was written by me as a kid. It says I will achieve my dreams and become the best man I can be. I keep it hidden because it is personal, but it is also the reason I keep going.",
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
    lesson: "Every 'yes' to a dream requires a thousand silent 'no's' to distractions.",
    shortLabel: "A quiet reminder of every distraction I gave up for the path I chose.",
    audioGuideScript:
      "This bracelet represents the quiet sacrifices. The distractions I had to leave behind, the normal teenage comfort I delayed, and the discipline it took to build my own path.",
    position: "desk",
    isFailure: false,
    isSecret: true,
  },

  // ── FAILURE WING ─────────────────────────────────────────
  {
    id: "fail-rebellious",
    exhibitNumber: "Failure 01",
    title: "The Un-Obedient Student",
    objectName: "A desk covered in crossed-out syllabus pages",
    category: "Failure",
    story:
      "I was never the most obedient child in class or at coaching centers. I questioned the rote-learning system and often chose to self-study or build projects instead of just following instructions. It caused friction, but it forged my independent mindset.",
    lesson: "Obedience builds followers; curiosity builds founders.",
    shortLabel: "I questioned rote-learning and paid for it in friction — and independence.",
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
    lesson: "A brilliant idea is worthless without the disciplined execution to back it up.",
    shortLabel: "My dream app died young — ambition without execution.",
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
    lesson: "Self-awareness is the first step to self-mastery. I am still fighting this battle every day.",
    shortLabel: "Nine hours of screen time — the battle for focus I fight daily.",
    position: "failure-wing",
    isFailure: true,
    isSecret: false,
  },
];

/* ── DERIVED VIEWS ──────────────────────────────────────── */

export const bedroomArtifacts = artifacts.filter((a) => !a.isFailure || a.id === "broken-code");
export const failureArtifacts = artifacts.filter((a) => a.position === "failure-wing");
export const secretArtifacts = artifacts.filter((a) => a.isSecret);

export const getArtifact = (id: string): Artifact | undefined =>
  artifacts.find((a) => a.id === id);

/* ── QUICK TOUR ─────────────────────────────────────────── */

export interface TourStep {
  artifactId: string;
  caption: string;
}

export const quickTour: TourStep[] = [
  {
    artifactId: "laptop",
    caption: "Where I taught myself AI, coding, and independent research.",
  },
  {
    artifactId: "fail-dream-app",
    caption: "My biggest failure taught me that ideas need disciplined execution.",
  },
  {
    artifactId: "notebook",
    caption: "Where I plan my future: merging artificial intelligence and healthcare.",
  },
];

/* ── CURATOR'S NOTE ─────────────────────────────────────── */

export const curator = {
  name: "Anchit Aman",
  role: "Curator",
  subtitle: "Behind the exhibits is a person who refused to wait for permission.",
  statement:
    "I completed Grade 12 at age 16. Because I was below the minimum age required for college admission, I took a gap year before entering college. Instead of treating that year as a pause, I turned it into a laboratory. I prepared for NEET independently and qualified twice. I taught myself AI and programming through free online resources and courses from Google, Cisco, and NVIDIA. I interned with an AI startup. I co-founded a community food initiative that helped feed 200+ people through NGO partnerships and bakery sponsorships. I founded a neighborhood running club, built its website myself, and used it to encourage consistency and community participation. I started EcoHub, planted over 40 flowers and trees, fed stray dogs, and adopted an injured stray puppy. I tutored three Class 10 students in Biology and helped improve their average marks by approximately 30 points. I built websites, apps, and games independently, including a functional chess game. I also learned that being a jack of all trades is both a strength and a weakness. It makes me curious, but it also forces me to fight for focus. This museum is not proof that I have everything figured out. It is proof that I keep moving.",
  values: [
    "Relentlessness",
    "Independence",
    "Curiosity",
    "Empathy",
    "Discipline",
    "Self-awareness",
  ],
  futureDirection:
    "My future lies at the intersection of Artificial Intelligence and Biology. I want to use technology to improve healthcare, understand living systems, and build tools that make medical knowledge more accessible. The certificates, coding projects, and biology tutoring are not separate parts of my life. They are all evidence of the same direction.",
  askMeAbout: [
    "My gap year at age 16",
    "Qualifying NEET twice independently",
    "Cold-calling bakeries for food sponsorships",
    "Teaching myself AI and programming",
    "The app I failed to launch",
    "My ACLS and BLS certifications",
    "The letter I wrote as a kid",
    "Why I want to merge AI and Biology",
  ],
};

/* ── GIFT SHOP ──────────────────────────────────────────── */

export const giftShop = {
  email: "anchitaman00@gmail.com",
  runClubUrl: "https://rushranchi.vercel.app/",
  runClubLabel: "RUSH Running Club",
  closingMessage:
    "Thank you for visiting my room. The next chapter is currently being coded.",
};
