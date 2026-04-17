export type Axis = 'cognitive' | 'emotional' | 'social';
export type Letter = 'P' | 'A' | 'H' | 'V' | 'D' | 'R' | 'B' | 'W';

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
    letters: ['P', 'A'],
  },
  emotional: {
    title: 'Emotional',
    subtitle: 'Where feelings go when it gets loud',
    letters: ['H', 'V', 'D'],
  },
  social: {
    title: 'Social',
    subtitle: 'What you do when people are actually there',
    letters: ['R', 'B', 'W'],
  },
};

export const traitMeta: Record<
  Letter,
  { name: string; blurb: string; detail: string; emoji: string; color: string }
> = {
  P: {
    name: 'Plan-First',
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
  H: {
    name: 'Hold',
    blurb: 'contain it internally',
    detail:
      'Outside stays steady even when it’s loud inside. People might not clock how hard you’re white-knuckling it.',
    emoji: '🧊',
    color: '#3b82f6',
  },
  V: {
    name: 'Vent',
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
  R: {
    name: 'Perform',
    blurb: 'turn on the charisma',
    detail:
      'When it’s showtime you reach for the sharp version: timing, a line that lands, “I’ve got this” energy—even if part of you is screaming.',
    emoji: '🎭',
    color: '#f97316',
  },
  B: {
    name: 'Adapt',
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
    'This thing is basically asking: when things get tight—deadline, weird group chat energy, feelings spiking—what do you actually reach for? Tuesday-you can be totally fine; 2am-you might be feral. That’s allowed.',
    'At the end you get three letters. Each one is just whichever habit won most often on that slice: how you think, how feelings move through you, and what people can see. It’s a pattern label, not a report card.',
  ],
  quote:
    'There isn’t a “correct” way to be stressed. You can work on habits and still own what you default to.',
  axisNarrative: {
    cognitive:
      'First slot is how you commit when you’re squeezed: you want a beat to line things up (P), or you’d rather move and fix it midair (A). Nothing to do with being “smart”—it’s whether you trust the plan or the motion first.',
    emotional:
      'Second slot is where the feeling goes when the volume goes up: bottled (H), obvious on the outside (V), or checked out / far away (D). Whatever showed up most—not proof you do or don’t care.',
    social:
      'Third slot is the people layer: turn it on (R), match the room (B), or go small and vanish (W). It’s what actually reads to others, not a popularity score.',
  } satisfies Record<Axis, string>,
};

export const questions: Question[] = [
  {
    id: 'c1',
    axis: 'cognitive',
    prompt: "You suddenly gain the power to fly, your first thought is...",
    options: [
      { text: "If i drink a bunch of white paint and shit from the air, can I cosplay a bird?", letter: 'P' },
      { text: "LET ME TAKE THIS BABY FOR A SPIN.", letter: 'A' },
    ],
  },
  {
    id: 'c2',
    axis: 'cognitive',
    prompt: "You have two great job offers. (Don't get excited, its just a hypothetical). The acceptance deadline is in 48 hours. You have agonized over the decision for the past 5 days.",
    options: [
      { text: "Let me go through pros and cons again, I'll think up until the last minute.", letter: 'P' },
      { text: "I've done enough research, I'm just gonna pick one.", letter: 'A' },
    ],
  },
  {
    id: 'c3',
    axis: 'cognitive',
    prompt: "OMG ~SQUEAL~ THEY FINALLY GAVE ME THEIR NUMBER!!! Regarding my first message...",
    options: [
      { text: "Let think about it for 20 some minutes, and perhaps phone a friend.", letter: 'P' },
      { text: "I send hi! or the first line I think of.", letter: 'A' },
    ],
  },
  {
    id: 'c4',
    axis: 'cognitive',
    prompt: "You have way too many tabs open, and your computer is lagging. Your first thought is ...",
    options: [
      { text: "Let me look through the tabs, and think about if any are important. Then I'll clean up the ones I don't need.", letter: 'P' },
      { text: "I'm just gonna close all tabs and start from fresh", letter: 'A' },
    ],
  },
  {
    id: 'c5',
    axis: 'cognitive',
    prompt: "You are a weirdo with no friends. You must looksmaxx until everybody loves you. Regarding purchasing a home gym...",
    options: [
      { text: "Holy crap its so expensive let's set up a price tracker across different sites and wait for a sale.", letter: 'P' },
      { text: "I need to looksmaxx NOW. PURCHASE.", letter: 'A' },
    ],
  },
  {
    id: 'c6',
    axis: 'cognitive',
    prompt: "You look down. There's a weird mark on your genitals. GASP. What to do?",
    options: [
      { text: "Let me research symptoms and think about the possible diagnosis. Let's wait and monitor and see if it goes down.", letter: 'P' },
      { text: "Straight to urgent care!!! I am nothing without my sexual prowess.", letter: 'A' },
    ],
  },
  {
    id: 'e1',
    axis: 'emotional',
    prompt: "Your crush usually texts you back every 30 minutes. Its been 2 hours.",
    options: [
      { text: "Smiling politely while your soul quietly takes notes", letter: 'H' },
      { text: "A face journeying through 7 emotions in 0.3 seconds", letter: 'V' },
      { text: "Leaving your body and watching the interaction like CCTV", letter: 'D' },
    ],
  },
  {
    id: 'e2',
    axis: 'emotional',
    prompt: "You get a text that says: “can we talk.” No context. No punctuation. Just that.",
    options: [
      { text: "Acting normal externally while your insides start simmering", letter: 'H' },
      { text: "Immediately replying “ARE YOU MAD AT ME” (caps optional)", letter: 'V' },
      { text: "Going weirdly calm/blank like “interesting, I no longer exist”", letter: 'D' },
    ],
  },
  {
    id: 'e3',
    axis: 'emotional',
    prompt: "Your meme flops. Like… 2 likes. One is you. What happens emotionally?",
    options: [
      { text: "You pretend you don’t care, but it goes into a vault labeled “later”", letter: 'H' },
      { text: "You make it everyone’s problem (group chat: “I’m being censored”)", letter: 'V' },
      { text: "You detach and become an anthropologist observing “attention economy”", letter: 'D' },
    ],
  },
  {
    id: 'e4',
    axis: 'emotional',
    prompt: "You accidentally send a message to the wrong person. You watch it deliver. You watch yourself watch it deliver.",
    options: [
      { text: "Poker face, immediate damage-control plan in silence", letter: 'H' },
      { text: "Panic leaks out: frantic follow-up texts / voice note / apology tour", letter: 'V' },
      { text: "Instant numbness like you hit “spectator mode”", letter: 'D' },
    ],
  },
  {
    id: 'e5',
    axis: 'emotional',
    prompt: "Someone gives you a compliment in public and you can feel your face temperature rise.",
    options: [
      { text: "You keep it contained: “haha thanks” and you move on", letter: 'H' },
      { text: "You visibly react (laugh/cover face/short-circuit)", letter: 'V' },
      { text: "You feel distant like the compliment is happening to a stranger", letter: 'D' },
    ],
  },
  {
    id: 'e6',
    axis: 'emotional',
    prompt: "You’re mad. Not “mildly annoyed.” Mad-mad. What do you do with it?",
    options: [
      { text: "Store it, stay composed, bring it up later (maybe never)", letter: 'H' },
      { text: "It comes out in tone, sarcasm, volume, or immediate confrontation", letter: 'V' },
      { text: "You go cold/flat and stop feeling much of anything", letter: 'D' },
    ],
  },
  {
    id: 'e7',
    axis: 'emotional',
    prompt: "You’re sad but there are still tasks. The capitalism continues.",
    options: [
      { text: "You compartmentalize and function until you’re alone", letter: 'H' },
      { text: "It shows: watery eyes, “I’m fine” voice, or telling someone", letter: 'V' },
      { text: "You feel emotionally far away, like the sadness is behind glass", letter: 'D' },
    ],
  },
  {
    id: 'e8',
    axis: 'emotional',
    prompt: "A friend is crying and needs support, but your emotional battery is at 2%.\nYou…",
    options: [
      { text: "Hold your own stuff down and show up anyway", letter: 'H' },
      { text: "Your overwhelm shows even while you try to help", letter: 'V' },
      { text: "Feel checked out/unreal; hard to access empathy in the moment", letter: 'D' },
    ],
  },
  {
    id: 's1',
    axis: 'social',
    prompt: "S1 — Room full of strangers (stressful context)\nYou tend to…",
    options: [
      {
        text: "Charm mode unlocked: smiles, names, one-liners, immediate main-character networking.",
        letter: 'R',
      },
      { text: "Read the room first, mirror the pace, and slide into whichever vibe feels safest.", letter: 'B' },
      { text: "Become a decorative plant near the snacks and answer in short sentences.", letter: 'W' },
    ],
  },
  {
    id: 's2',
    axis: 'social',
    prompt: "S2 — You’re unprepared in a meeting\nYou…",
    options: [
      { text: "Speak first with a confident framing so you control the tone.", letter: 'R' },
      { text: "Ask a calibrating question and align with whoever has the clearest direction.", letter: 'B' },
      { text: "Camera-off energy: keep comments minimal and pray we run out of time.", letter: 'W' },
    ],
  },
  {
    id: 's3',
    axis: 'social',
    prompt: "S3 — Conflict—people look at you\nYou…",
    options: [
      { text: "Take the mic and deliver a clean stance with courtroom confidence.", letter: 'R' },
      { text: "Translate both sides and lower the temperature before anyone explodes.", letter: 'B' },
      { text: "Shrink your footprint, disengage, and let the blast radius pass.", letter: 'W' },
    ],
  },
  {
    id: 's4',
    axis: 'social',
    prompt: "S4 — Complimented in front of others\nYou…",
    options: [
      { text: "Accept with style, toss in a joke, keep the spotlight moving.", letter: 'R' },
      { text: "Bounce the compliment back and match their energy so it stays comfortable.", letter: 'B' },
      { text: "Blue-screen internally, mumble thanks, and change the subject immediately.", letter: 'W' },
    ],
  },
  {
    id: 's5',
    axis: 'social',
    prompt: "S5 — You need help but pride is involved\nYou…",
    options: [
      { text: "Package the ask like a strategic collaboration, not a rescue.", letter: 'R' },
      { text: "Ask the way this group normally asks, so it feels natural.", letter: 'B' },
      { text: "Say “all good” and brute-force it alone even if it takes longer.", letter: 'W' },
    ],
  },
  {
    id: 's6',
    axis: 'social',
    prompt: "S6 — Party when you’re not in the mood\nYou…",
    options: [
      { text: "Flip the social switch and host your own mini orbit.", letter: 'R' },
      { text: "Drift between groups, matching tone person by person.", letter: 'B' },
      { text: "Find one safe corner, one safe person, and an exit timeline.", letter: 'W' },
    ],
  },
  {
    id: 's7',
    axis: 'social',
    prompt: "S7 — Online argument\nYou tend to…",
    options: [
      { text: "Drop a sharp public take with receipts and one clean closer.", letter: 'R' },
      { text: "Rewrite for de-escalation, find common ground, then land it softly.", letter: 'B' },
      { text: "Type three drafts, delete all of them, and close the app.", letter: 'W' },
    ],
  },
  {
    id: 's8',
    axis: 'social',
    prompt: "S8 — New environment (school/job/move)\nUnder stress you…",
    options: [
      { text: "Introduce your vibe early so people know your lane.", letter: 'R' },
      { text: "Observe local norms, then adapt fast to how things are done.", letter: 'B' },
      { text: "Keep your profile low until the social weather feels stable.", letter: 'W' },
    ],
  },
];

const titleByCognitive: Record<'P' | 'A', string> = {
  P: 'Strategy Mind',
  A: 'Momentum Mind',
};
const titleByEmotional: Record<'H' | 'V' | 'D', string> = {
  H: 'Ice Core',
  V: 'Volcano Core',
  D: 'Satellite Core',
};
const titleBySocial: Record<'R' | 'B' | 'W', string> = {
  R: 'Stage Form',
  B: 'Mirror Form',
  W: 'Shadow Form',
};

export function buildArchetypeSummary(code: string): {
  title: string;
  blurb: string;
} {
  const [c, e, s] = code as unknown as [Letter, Letter, Letter];
  const title =
    `${titleByCognitive[c as 'P' | 'A']} ` +
    `${titleByEmotional[e as 'H' | 'V' | 'D']} ` +
    `${titleBySocial[s as 'R' | 'B' | 'W']}`;
  const blurb =
    `Under pressure, you ${traitMeta[c].blurb}, then ${traitMeta[e].blurb}, ` +
    `and socially you ${traitMeta[s].blurb}.`;
  return { title, blurb };
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
  PHR: {
    emoji: '🦅',
    beast: 'Sea eagle',
    epithet: 'Maps the thermals, then lands like it was always the plan.',
    lore: 'You rehearse the board before you move a piece. In public you stay composed and intentional—stress reads as poise, not panic.',
  },
  PHB: {
    emoji: '🦎',
    beast: 'Chameleon',
    epithet: 'Studies the branch colors before picking a skin.',
    lore: 'You don’t rush identity—you read context, then match without losing your own spine. Pressure makes you observant, not loud.',
  },
  PHW: {
    emoji: '🦉',
    beast: 'Burrowing owl',
    epithet: 'Knows every hole in the field; chooses when to be seen.',
    lore: 'You think first, feel second in the room, and socially you shrink your footprint until the landscape makes sense.',
  },
  PVR: {
    emoji: '🦚',
    beast: 'Peacock',
    epithet: 'If it hurts, the room will hear it—in full color.',
    lore: 'You sequence stress into a story, feelings leak outward, and socially you still bring the show. It’s a lot; it’s also honest.',
  },
  PVB: {
    emoji: '🐬',
    beast: 'Dolphin',
    epithet: 'Turns chaos into synchronized splashes.',
    lore: 'You feel big, show it, then adapt fast so the pod keeps moving. You’re the one matching energy while still being visibly alive.',
  },
  PVW: {
    emoji: '🦊',
    beast: 'Red fox',
    epithet: 'Dramatic exit, immaculate tracks, already three hedges away.',
    lore: 'You vent, pivot, and vanish—quick reads, quick moves, low profile once the heat spikes.',
  },
  PDR: {
    emoji: '🐻‍❄️',
    beast: 'Polar bear',
    epithet: 'Ice in the eyes, still takes up the whole frame.',
    lore: 'You detach to function, but socially you can’t help reading “on.” It’s controlled distance—presence without warmth.',
  },
  PDB: {
    emoji: '🐙',
    beast: 'Octopus',
    epithet: 'Goes flat, changes texture, becomes whatever the reef needs.',
    lore: 'You go numb-forward and socially you blend—smart, soft edges, hard-to-read center.',
  },
  PDW: {
    emoji: '🪼',
    beast: 'Jellyfish',
    epithet: 'Drifts through the drama like it isn’t your dimension.',
    lore: 'Stress makes you far away; socially you minimize contact. You’re not absent—you’re elsewhere.',
  },
  AHR: {
    emoji: '🐺',
    beast: 'Grey wolf',
    epithet: 'Commits to the hunt before the briefing is pretty.',
    lore: 'You move, then tighten the plan on the fly. Feelings stay internal, but your social signal is still sharp and deliberate.',
  },
  AHB: {
    emoji: '🐕',
    beast: 'Street-smart dog',
    epithet: 'Runs in, reads the pack, adjusts tail speed.',
    lore: 'Action-first doesn’t mean reckless—you match the room fast while holding your own storm inside.',
  },
  AHW: {
    emoji: '🦔',
    beast: 'Hedgehog',
    epithet: 'Bops forward, then armor clicks shut.',
    lore: 'You lunge, contain, and socially you get small until it’s safe. Fast spikes, fast retreat.',
  },
  AVR: {
    emoji: '🐓',
    beast: 'Rooster',
    epithet: 'The neighborhood knows before you do.',
    lore: 'You act, emote visibly, and perform anyway—stress becomes volume, stance, and a little theater.',
  },
  AVB: {
    emoji: '🐦‍⬛',
    beast: 'Starling',
    epithet: 'Murmer-swerves with the flock, still moving at full speed.',
    lore: 'You don’t wait for perfect—you move, feel out loud, and flex to fit so the group doesn’t fracture.',
  },
  AVW: {
    emoji: '🐝',
    beast: 'Honeybee',
    epithet: 'Buzzes in, stings if needed, bounces before the Q&A.',
    lore: 'Burst energy, visible feelings, then withdrawal once the job’s done. You’re intense in sprints.',
  },
  ADR: {
    emoji: '🦈',
    beast: 'Great white',
    epithet: 'Cold water, clean line, still owns the frame.',
    lore: 'You act fast, feel far away, and socially you still cut a silhouette. It’s not cruelty—it’s distance with teeth.',
  },
  ADB: {
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
