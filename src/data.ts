export type Axis = 'cognitive' | 'emotional' | 'social';
export type Letter = 'T' | 'A' | 'S' | 'R' | 'D' | 'P' | 'I' | 'W';

export type Option = {
  text: string;
  letter: Letter;
};

export type Question = {
  id: string;
  axis: Axis;
  prompt: string;
  options: Option[];
};

export const axisMeta: Record<
  Axis,
  { title: string; subtitle: string; letters: Letter[] }
> = {
  cognitive: {
    title: 'Cognitive',
    subtitle: "Brain stuff when the pressure's on",
    letters: ['T', 'A'],
  },
  emotional: {
    title: 'Emotional',
    subtitle: 'Where feelings go when it gets loud',
    letters: ['S', 'R', 'D'],
  },
  social: {
    title: 'Social',
    subtitle: 'What you do when people are actually there',
    letters: ['P', 'I', 'W'],
  },
};

export const traitMeta: Record<
  Letter,
  { name: string; blurb: string; detail: string; emoji: string; color: string }
> = {
  T: {
    name: 'Think-First',
    blurb: 'map it out before you move',
    detail:
      'You want another lap around the problem before you commit: tradeoffs, worst cases, maybe one more open tab. Then you go.',
    emoji: '🌀',
    color: '#8b5cf6',
  },
  A: {
    name: 'Action-First',
    blurb: 'move now and adjust on the fly',
    detail:
      'You’d rather hit send and steer. Motion first, tidy-up later—waiting around feels worse than being slightly wrong.',
    emoji: '⚡',
    color: '#22c55e',
  },
  S: {
    name: 'Suppress',
    blurb: 'contain it internally',
    detail:
      'Outside stays steady even when it’s loud inside. People might not clock how hard you’re white-knuckling it.',
    emoji: '🧊',
    color: '#3b82f6',
  },
  R: {
    name: 'Release',
    blurb: 'emotions leak outward',
    detail:
      'It shows up in your face, tone, pace—sometimes before you’ve “decided” to let it out. Not always drama; just not a sealed box.',
    emoji: '🌋',
    color: '#ef4444',
  },
  D: {
    name: 'Detach',
    blurb: 'go numb / distant',
    detail:
      'You go a little flat or far away, like you’re watching from the hallway. Still in the room, just not fully plugged in.',
    emoji: '🛰️',
    color: '#14b8a6',
  },
  P: {
    name: 'Perform',
    blurb: 'turn on the charisma',
    detail:
      'When it’s showtime you reach for the sharp version: timing, a line that lands, “I’ve got this” energy—even if part of you is screaming.',
    emoji: '🎭',
    color: '#f97316',
  },
  I: {
    name: 'Integrate',
    blurb: 'match the room',
    detail:
      'You read the vibe and bend a little so things stay workable. Less “fake,” more picking what fight matters in the moment.',
    emoji: '🦎',
    color: '#10b981',
  },
  W: {
    name: 'Withdraw',
    blurb: 'pull back + disappear',
    detail:
      'You get quieter, smaller, closer to the exit—whatever keeps your surface area tiny until the heat drops.',
    emoji: '🕳️',
    color: '#6366f1',
  },
};

/** Long-form copy for the “Letter key” reference tab */
export const letterKeyPage = {
  headline: 'What the three letters mean',
  intro: [
    'The quiz asks how you tend to react when pressure shows up: how you think things through, what happens with your feelings, and how you act around people.',
    'You get three letters at the end—one from the thinking questions, one from the feelings questions, and one from the social questions. Each letter is the option you chose most often in that group.',
  ],
  quote:
    'These aren’t grades or diagnoses. They’re just a quick way to describe habits—useful if you recognize yourself in them.',
  axisNarrative: {
    cognitive:
      'First letter is think-first (T) vs action-first (A): pause and sort it out first, or move and figure it out as you go.',
    emotional:
      'Second letter is suppress (S), release (R), or detach (D): keep it inside, let it show on the outside, or go numb or distant.',
    social:
      'Third letter is perform (P), integrate (I), or withdraw (W): step forward and take space, fit in with what’s going on around you, or hang back.',
  } satisfies Record<Axis, string>,
};

/** Same stems & options as `docs/axes-and-quiz-plan.md` §6 (canonical order; quiz UI shuffles). */
export const questions: Question[] = [
  {
    id: 'c1',
    axis: 'cognitive',
    prompt:
      'You suddenly gain the power to fly, your first thought is...',
    options: [
      {
        text: 'If I drink a bunch of white paint and shit from the air, can I cosplay a bird?',
        letter: 'T',
      },
      { text: 'LET ME TAKE THIS BABY FOR A SPIN.', letter: 'A' },
      { text: 'This is scary, how do I do this safely?', letter: 'T' },
    ],
  },
  {
    id: 'c2',
    axis: 'cognitive',
    prompt:
      "You have two great job offers. (Don't get excited, its just a hypothetical). The acceptance deadline is in 48 hours. You have agonized over the decision for the past 5 days.",
    options: [
      {
        text: "Let me go through pros and cons again, I'll think up until the last minute.",
        letter: 'T',
      },
      { text: "I've done enough research, I'm just gonna pick one.", letter: 'A' },
      { text: "I'm flipping a coin ...", letter: 'A' },
    ],
  },
  {
    id: 'c3',
    axis: 'cognitive',
    prompt:
      'OMG ~SQUEAL~ THEY FINALLY GAVE ME THEIR NUMBER!!! Regarding my first message...',
    options: [
      {
        text: 'Let think about it for 20 some minutes, and perhaps phone a friend.',
        letter: 'T',
      },
      { text: 'I send hi! or the first line I think of.', letter: 'A' },
      {
        text: 'Imma just send the same awesome pickup line I send everyone',
        letter: 'A',
      },
    ],
  },
  {
    id: 'c4',
    axis: 'cognitive',
    prompt:
      'You have way too many tabs open, and your computer is lagging. Your first thought is ...',
    options: [
      {
        text: "Let me look through the tabs, and think about if any are important. Then I'll clean up the ones I don't need.",
        letter: 'T',
      },
      { text: "I'm just gonna close all tabs and start from fresh", letter: 'A' },
      {
        text: 'This is overwhelming time to visit my favorite incognito site',
        letter: 'A',
      },
    ],
  },
  {
    id: 'c5',
    axis: 'cognitive',
    prompt:
      'You are a weirdo with no friends. You must looksmaxx until everybody loves you. Regarding purchasing a home gym...',
    options: [
      {
        text: 'Hmm, this purchase is rather large, lemme think about it for a couple of months.',
        letter: 'T',
      },
      { text: 'I need to looksmaxx NOW. PURCHASE.', letter: 'A' },
      {
        text: 'This is too expensive, i will get my ass up and go to the gym ...',
        letter: 'A',
      },
    ],
  },
  {
    id: 'c6',
    axis: 'cognitive',
    prompt: 'Which superpower would you rather have?',
    options: [
      {
        text: 'You can gain any skill in the world for 1 hour, but once you do, you can never gain that skill agin',
        letter: 'T',
      },
      {
        text: 'You can rewind time by 5 seconds whenever you want, with a 5 second cooldown',
        letter: 'A',
      },
      {
        text: 'You can run faster than a car without breaking a sweat ',
        letter: 'A',
      },
    ],
  },
  {
    id: 'e1',
    axis: 'emotional',
    prompt: 'Which backstory hits you in the feels the hardest?',
    options: [
      {
        text: 'A young boy constantly watches as his single mother prioritizes his disabled younger brother. He must shoulder the burden of loneliness, but is unable to complain as his mother cannot handle taking care of both him and his disabled brother.',
        letter: 'S',
      },
      {
        text: 'A 14 year old boy loses his parents due to a car crash with a drunk driver. The driver gets away and the boy spends the next few years seeking revenge.',
        letter: 'R',
      },
      {
        text: 'A young girl gets ostracized by the rest of the class. They snicker and talk behind her back, speaking ill of her worn down clothing and school supplies. She dives into her schoolwork, vowing to becoming someone successful.',
        letter: 'D',
      },
    ],
  },
  {
    id: 'e2',
    axis: 'emotional',
    prompt: 'What would you prefer?',
    options: [
      { text: 'Month long explosive diahrrea', letter: 'S' },
      { text: 'Month long heavy constipation', letter: 'R' },
      {
        text: 'Neither, but your entire genital region goes numb for a year.',
        letter: 'D',
      },
    ],
  },
  {
    id: 'e3',
    axis: 'emotional',
    prompt:
      "You are SUPER lonely. Nobody wants to date you. Tonight, you are hanging with your good friend Carl, but as usual, he's just gonna talk about his stupid wonderful relationship. A bird also shat on your head today. Your thoughts?",
    options: [
      {
        text: "He irritates me to no end but I'm going to suck it up and go",
        letter: 'S',
      },
      {
        text: "I'm gonna tell him how I feel. Just cuz im a loser doesn't mean I need to listen to his crap.",
        letter: 'R',
      },
      {
        text: "Guess what Carl, I'm suddenly sick! I'm so sorry I can't hangout today :(",
        letter: 'D',
      },
    ],
  },
  {
    id: 'e4',
    axis: 'emotional',
    prompt:
      "You have an exciting date! (Once again relax, it's just a hypothethical). You sit at the bar waiting for them. They never show. You got ghosted. What do you do now?",
    options: [
      {
        text: 'Sit there for 40 minutes, nursing your drink, thinking about where you went wrong.',
        letter: 'S',
      },
      {
        text: "Complain to the friendly bartender. The nerve of people these days. They don't even have the decency to reject over text???",
        letter: 'R',
      },
      {
        text: "Instantly leave. Forget it, there's plenty of fish in the sea.",
        letter: 'D',
      },
    ],
  },
  {
    id: 'e5',
    axis: 'emotional',
    prompt:
      "Uh oh, your partner caught you looking at other people's feet pics again! You apologized and feel very guilty, but they are still giving you the silent treatment. What do you do?",
    options: [
      {
        text: 'Sit at your desk, feeling guilty, occassionally glancing towards them, thinking over your actions.',
        letter: 'S',
      },
      {
        text: 'Keep profusely apologizing and begging them to talk to you again.',
        letter: 'R',
      },
      {
        text: 'You feel distant like the compliment is happening to a stranger',
        letter: 'D',
      },
    ],
  },
  {
    id: 'e6',
    axis: 'emotional',
    prompt: 'What is your preferred form of self therapy?',
    options: [
      { text: 'Meditation', letter: 'S' },
      { text: 'Blab sesh with the homies', letter: 'R' },
      { text: 'Shopaholic baby', letter: 'D' },
    ],
  },
  {
    id: 's1',
    axis: 'social',
    prompt:
      'You are late for the pregame and everyone is loud and rowdy! What do you do?',
    options: [
      { text: 'START SCREAMING AND JUMPING WITH EVERYONE ELSE', letter: 'P' },
      { text: 'Start throwing back drinks and slowly blend in', letter: 'I' },
      {
        text: 'Stand around and observe, maybe talk to a few of the lone stragglers around',
        letter: 'W',
      },
    ],
  },
  {
    id: 's2',
    axis: 'social',
    prompt:
      'You are at karaoke! Your singing voice sounds like Charlie Puth, if Charlie Puth sucked ass at singing. What to do?',
    options: [
      {
        text: 'IM BELTING MY ASS OFF ANYWAYS, EVERYONE MUST HEAR ME SING',
        letter: 'P',
      },
      {
        text: 'Sing softer with everyone else, and attempt to keep some semblance of key',
        letter: 'I',
      },
      {
        text: 'Stay quiet, observe your friends make a fool of themselves',
        letter: 'W',
      },
    ],
  },
  {
    id: 's3',
    axis: 'social',
    prompt:
      'You at the club/rave with your friends. They all start happily dancing, linked arms, in a circle. What do you do?',
    options: [
      {
        text: 'Go under their arms and pop out in the middle. Everyone cheers.',
        letter: 'P',
      },
      {
        text: 'Put my arm awkwardly around two of my friends and join the circle.',
        letter: 'I',
      },
      {
        text: 'Pretend not to notice them and stare forward, focusing on the music.',
        letter: 'W',
      },
    ],
  },
  {
    id: 's4',
    axis: 'social',
    prompt: 'Which superhero would you like to be?',
    options: [
      { text: 'Superman', letter: 'P' },
      { text: 'Batman', letter: 'I' },
      { text: 'Hawkeye', letter: 'W' },
    ],
  },
  {
    id: 's5',
    axis: 'social',
    prompt: 'Which generic character archetype would you be?',
    options: [
      { text: 'THE MAIN FUCKING CHARACTER', letter: 'P' },
      { text: 'The comedic relief best friend', letter: 'I' },
      {
        text: 'Side npc character who avoids all the conflict',
        letter: 'W',
      },
    ],
  },
  {
    id: 's6',
    axis: 'social',
    prompt: 'If you were a pokemon, which pokemon would you be?',
    options: [
      { text: "Magikarp (Don't you dare pick this one)", letter: 'P' },
      { text: 'Magikarp (Pick this one)', letter: 'I' },
      { text: 'Magikarp ', letter: 'W' },
    ],
  },
];

const titleByCognitive: Record<'T' | 'A', string> = {
  T: 'Strategy Mind',
  A: 'Momentum Mind',
};
const titleByEmotional: Record<'S' | 'R' | 'D', string> = {
  S: 'Ice Core',
  R: 'Volcano Core',
  D: 'Satellite Core',
};
const titleBySocial: Record<'P' | 'I' | 'W', string> = {
  P: 'Stage Form',
  I: 'Mirror Form',
  W: 'Shadow Form',
};

export function buildArchetypeSummary(code: string): {
  title: string;
  blurb: string;
} {
  const [c, e, s] = code as unknown as [Letter, Letter, Letter];
  const title =
    `${titleByCognitive[c as 'T' | 'A']} ` +
    `${titleByEmotional[e as 'S' | 'R' | 'D']} ` +
    `${titleBySocial[s as 'P' | 'I' | 'W']}`;
  const blurb =
    `Under pressure, you ${traitMeta[c].blurb}, then ${traitMeta[e].blurb}, ` +
    `and socially you ${traitMeta[s].blurb}.`;
  return { title, blurb };
}

const ARCHETYPE_CODE_RE = /^[TA][SRD][PIW]$/i;

export function isValidArchetypeCode(code: string): boolean {
  return ARCHETYPE_CODE_RE.test(code.trim());
}

/** One “mascot” animal per 3-letter archetype — vibes, not biology exams */
export type ArchetypeBeast = {
  emoji: string;
  beast: string;
  epithet: string;
  lore: string;
};

/** Title-case each word when the name has multiple words (e.g. Sea Eagle). */
export function formatBeastDisplayName(name: string): string {
  const words = name.trim().split(/\s+/);
  if (words.length < 2) return name;
  return words
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase())
    .join(' ');
}

export const archetypeBeasts: Record<string, ArchetypeBeast> = {
  TSP: {
    emoji: '🦅',
    beast: 'Sea eagle',
    epithet: 'Maps the thermals, then lands like it was always the plan.',
    lore: 'You rehearse the board before you move a piece. In public you stay composed and intentional—stress reads as poise, not panic.',
  },
  TSI: {
    emoji: '🦎',
    beast: 'Chameleon',
    epithet: 'Studies the branch colors before picking a skin.',
    lore: 'You don’t rush identity—you read context, then match without losing your own spine. Pressure makes you observant, not loud.',
  },
  TSW: {
    emoji: '🦉',
    beast: 'Burrowing owl',
    epithet: 'Knows every hole in the field; chooses when to be seen.',
    lore: 'You think first, feel second in the room, and socially you shrink your footprint until the landscape makes sense.',
  },
  TRP: {
    emoji: '🦚',
    beast: 'Peacock',
    epithet: 'If it hurts, the room will hear it—in full color.',
    lore: 'You sequence stress into a story, feelings leak outward, and socially you still bring the show. It’s a lot; it’s also honest.',
  },
  TRI: {
    emoji: '🐬',
    beast: 'Dolphin',
    epithet: 'Turns chaos into synchronized splashes.',
    lore: 'You feel big, show it, then adapt fast so the pod keeps moving. You’re the one matching energy while still being visibly alive.',
  },
  TRW: {
    emoji: '🦊',
    beast: 'Red fox',
    epithet: 'Dramatic exit, immaculate tracks, already three hedges away.',
    lore: 'You let it out, pivot, and vanish—quick reads, quick moves, low profile once the heat spikes.',
  },
  TDP: {
    emoji: '🐻‍❄️',
    beast: 'Polar bear',
    epithet: 'Ice in the eyes, still takes up the whole frame.',
    lore: 'You detach to function, but socially you can’t help reading “on.” It’s controlled distance—presence without warmth.',
  },
  TDI: {
    emoji: '🐙',
    beast: 'Octopus',
    epithet: 'Goes flat, changes texture, becomes whatever the reef needs.',
    lore: 'You go numb-forward and socially you blend—smart, soft edges, hard-to-read center.',
  },
  TDW: {
    emoji: '🪼',
    beast: 'Jellyfish',
    epithet: 'Drifts through the drama like it isn’t your dimension.',
    lore: 'Stress makes you far away; socially you minimize contact. You’re not absent—you’re elsewhere.',
  },
  ASP: {
    emoji: '🐺',
    beast: 'Grey wolf',
    epithet: 'Commits to the hunt before the briefing is pretty.',
    lore: 'You move, then tighten the plan on the fly. Feelings stay internal, but your social signal is still sharp and deliberate.',
  },
  ASI: {
    emoji: '🐕',
    beast: 'Street-smart dog',
    epithet: 'Runs in, reads the pack, adjusts tail speed.',
    lore: 'Action-first doesn’t mean reckless—you match the room fast while holding your own storm inside.',
  },
  ASW: {
    emoji: '🦔',
    beast: 'Hedgehog',
    epithet: 'Bops forward, then armor clicks shut.',
    lore: 'You lunge, contain, and socially you get small until it’s safe. Fast spikes, fast retreat.',
  },
  ARP: {
    emoji: '🐓',
    beast: 'Rooster',
    epithet: 'The neighborhood knows before you do.',
    lore: 'You act, emote visibly, and perform anyway—stress becomes volume, stance, and a little theater.',
  },
  ARI: {
    emoji: '🐦‍⬛',
    beast: 'Starling',
    epithet: 'Murmer-swerves with the flock, still moving at full speed.',
    lore: 'You don’t wait for perfect—you move, feel out loud, and flex to fit so the group doesn’t fracture.',
  },
  ARW: {
    emoji: '🐝',
    beast: 'Honeybee',
    epithet: 'Buzzes in, stings if needed, bounces before the Q&A.',
    lore: 'Burst energy, visible feelings, then withdrawal once the job’s done. You’re intense in sprints.',
  },
  ADP: {
    emoji: '🦈',
    beast: 'Great white',
    epithet: 'Cold water, clean line, still owns the frame.',
    lore: 'You act fast, feel far away, and socially you still cut a silhouette. It’s not cruelty—it’s distance with teeth.',
  },
  ADI: {
    emoji: '🦎',
    beast: 'House gecko',
    epithet: 'Scuttles vertical, matches the wall, gone when the light hits.',
    lore: 'Momentum + numb + blend: you solve by moving, feel thin, and let the room tell you what shape to take.',
  },
  ADW: {
    emoji: '🐚',
    beast: 'Hermit crab',
    epithet: 'Grabs the nearest shell and minds its business.',
    lore: 'You move fast internally, go flat emotionally, and socially you pull back—portable armor, minimal surface area.',
  },
};

export function getArchetypeBeast(code: string): ArchetypeBeast {
  return (
    archetypeBeasts[code] ?? {
      emoji: '🐾',
      beast: 'Unknown critter',
      epithet: 'Still sketching this one.',
      lore: 'No mascot copy yet for this code.',
    }
  );
}

export type RarityTier = 'common' | 'rare' | 'mythic' | 'legendary';

export type ArchetypeRarity = {
  tier: RarityTier;
  label: string;
  symbol: string;
  color: string;
  flavorLine: string;
};

const rarityTierMeta: Record<
  RarityTier,
  Omit<ArchetypeRarity, 'tier'>
> = {
  common: {
    label: 'Common',
    symbol: '◈',
    color: '#6b7280',
    flavorLine: 'You really do be like everyone else (affectionate).',
  },
  rare: {
    label: 'Rare',
    symbol: '◈',
    color: '#3b82f6',
    flavorLine: 'Not everywhere, not nowhere. Interesting little gremlin.',
  },
  mythic: {
    label: 'Mythic',
    symbol: '◈',
    color: '#8b5cf6',
    flavorLine: 'Okay yes, you are kind of a special duck.',
  },
  legendary: {
    label: 'Legendary',
    symbol: '◈',
    color: '#d4a017',
    flavorLine: 'Certified special duck. Museum-tier specimen.',
  },
};

/**
 * Heuristic rarity (not measured yet):
 * - T + S combinations are treated as baseline/common.
 * - D (Detach) is generally less common.
 * - D + P (“detached but performative”) is treated as extreme/legendary.
 */
const rarityTierByCode: Record<string, RarityTier> = {
  TSP: 'common',
  TSI: 'common',
  TSW: 'common',
  TRP: 'rare',
  TRI: 'common',
  TRW: 'rare',
  TDP: 'legendary',
  TDI: 'mythic',
  TDW: 'mythic',
  ASP: 'rare',
  ASI: 'common',
  ASW: 'rare',
  ARP: 'rare',
  ARI: 'common',
  ARW: 'rare',
  ADP: 'legendary',
  ADI: 'mythic',
  ADW: 'mythic',
};

export function getArchetypeRarity(code: string): ArchetypeRarity {
  const tier = rarityTierByCode[code] ?? 'common';
  return { tier, ...rarityTierMeta[tier] };
}
