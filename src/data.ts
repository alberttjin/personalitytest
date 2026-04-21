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
  /**
   * Relative weight when picking the winning letter for this axis (sum of weighted picks).
   * Use `1` for realistic/diagnostic prompts; lower for comedy or weak signal (e.g. `0.25`–`0.5`).
   */
  weight: number;
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
      'When faced with a complex intellectual problem, you love to overthink. You plan and plan and plan and you probably think you are so smart but sometimes you just gotta make a decision. My lawyers say I need to say something nice as well, so you may overthink but you are also careful and usually make less mistakes.',
    emoji: '🌀',
    color: '#8b5cf6',
  },
  A: {
    name: 'Action-First',
    blurb: 'move now and adjust on the fly',
    detail:
      'When faced with a complex intellectual problem, you hate to overthink. Probably because you are not very smart. You tend to act first, think later once the consequences already happen. On the bright side, because you are not afraid to make mistakes, you often accomplish a lot.',
    emoji: '⚡',
    color: '#22c55e',
  },
  S: {
    name: 'Suppress',
    blurb: 'contain it internally',
    detail:
      'When faced with a complex emotional problem, you hold your feelings inside. You probably are a people pleaser and would rather not bother them with your silly issues. The irony is people don\'t really trust you becase you are emotionally distant. Read you like a book didn\'t I? On the bright side, you have strong control over your emotions and rarely \"crash out\" like the kids do these days.',
    emoji: '🧊',
    color: '#3b82f6',
  },
  R: {
    name: 'Release',
    blurb: 'emotions leak outward',
    detail:
      'When faced with a complex emotional problem, you let it out. Whether venting to third parties or direct confrontation, you healthily expresss your feelings until everyone is annoyed with you. Maybe grow up a bit and learn to not be so dramatic. Unless you are an actual child then maybe get off this website.',
    emoji: '🌋',
    color: '#ef4444',
  },
  D: {
    name: 'Detach',
    blurb: 'go numb / distant',
    detail:
      'When faced with a complex emotional problem, you dissociate. Why deal with the problem when you can pretend it doesn\'t exist? You are so intelligent, keep doing this it\'s so healthy for you. Jk jk, there are benefits to this, sometimes delulu is the solulu.',
    emoji: '🛰️',
    color: '#14b8a6',
  },
  P: {
    name: 'Perform',
    blurb: 'turn on the charisma',
    detail:
      'In social situations, you ask yourself one question. How can I make this about me? I need attention right now or I will shit myself. Some call you the life of the party, some call you an attention whore. Either way, there is no such thing as bad press.',
    emoji: '🎭',
    color: '#f97316',
  },
  I: {
    name: 'Integrate',
    blurb: 'match the room',
    detail:
      'In social situations, you read the vibe like a book and figure out what the safest way to fit in is. Nobody hates you, nobody loves you, the meatloaf version of a person. That being said, you can hangout with almost any group, any type of person, and that\'s a skill I can\'t deny.',
    emoji: '🦎',
    color: '#10b981',
  },
  W: {
    name: 'Withdraw',
    blurb: 'pull back + disappear',
    detail:
      'In social situations, you pull back and go quiet or avoid the situation all together. Fly on the wall, they say. Honestly you probably get bullied all the time by extroverts asking you "why are you so quiet?", so I will not bully you further. Your welcome.',
    emoji: '🕳️',
    color: '#6366f1',
  },
};

/** Long-form copy for the “Letter key” reference tab */
export const letterKeyPage = {
  headline: 'What the three letters mean',
  intro: [
    'The quiz asks how you tend to react when pressure shows up: how you think things through, what happens with your feelings, and how you act around people.',
    'You get three letters at the end—one from the thinking questions, one from the feelings questions, and one from the social questions. Each letter wins its axis by total weighted score (serious questions count more than joke ones).',
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
    weight: 0.35,
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
    weight: 1,
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
    weight: 0.85,
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
    weight: 1,
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
    weight: 0.45,
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
    weight: 0.55,
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
    weight: 1,
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
    weight: 0.25,
    prompt: 'What would you prefer?',
    options: [
      { text: 'Month long explosive diarrhea', letter: 'S' },
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
    weight: 1,
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
    weight: 0.8,
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
    weight: 0.25,
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
        text: 'You walk away and go drown your sorrows in a sweet treat',
        letter: 'D',
      },
    ],
  },
  {
    id: 'e6',
    axis: 'emotional',
    weight: .50,
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
    weight: 0.9,
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
    weight: 1,
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
    weight: .85,
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
    weight: 0.45,
    prompt: 'What skill would you prefer to suddenly gain?',
    options: [
      { text: 'Honey smooth beautiful singing voice', letter: 'P' },
      { text: 'Fluent in every language', letter: 'I' },
      { text: 'Paint anything you want perfectly', letter: 'W' },
    ],
  },
  {
    id: 's5',
    axis: 'social',
    weight: 1,
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
    weight: 0.25,
    prompt: 'If you were a pokemon, which pokemon would you be?',
    options: [
      { text: "Magikarp (Don't you dare pick this one)", letter: 'P' },
      { text: 'Magikarp (Pick this one)', letter: 'I' },
      { text: 'Magikarp ', letter: 'W' },
    ],
  },
];

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
  /** Longer synthesis of the three axes + animal metaphor (shown on result / type modal). Paragraphs separated by `\n\n`. */
  holisticProfile: string;
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
    holisticProfile: `Man you're weird. At home, you can be a bit of a nervous wreck. Always thinking, always feeling, always overanalyzing. But somehow in social situations, it all falls away. You dance like nobody is watching. Except everybody is watching and you love it. Not sure what flips in the brain, but you are quite the unique lil specimen.`,
  },
  TSI: {
    emoji: '🦎',
    beast: 'Chameleon',
    epithet: 'Studies the branch colors before picking a skin.',
    lore: 'You don’t rush identity—you read context, then match without losing your own spine. Pressure makes you observant, not loud.',
    holisticProfile: `Do I even need to explain? You resemble the chameleon through and through. You love to blend in, carefully analyzing most situations. You don't have many friends, but are generally palatable. Maybe its time to standout. Wear a cape to your next party.”`,
  },
  TSW: {
    emoji: '🦉',
    beast: 'Burrowing owl',
    epithet: 'Knows every hole in the field; chooses when to be seen.',
    lore: 'You think first, feel second in the room, and socially you shrink your footprint until the landscape makes sense.',
    holisticProfile: `The CLASSIC. Large social situations make you anxious, but you have a few close friends you trust with your LIFE. You vent to them constantly, and your fears are valid they are getting sick of you. Just kidding! But maybe branch out a bit :)`,
  },
  TRP: {
    emoji: '🦚',
    beast: 'Peacock',
    epithet: 'If it hurts, the room will hear it—in full color.',
    lore: 'You sequence stress into a story, feelings leak outward, and socially you still bring the show. It’s a lot; it’s also honest.',
    holisticProfile: `You don’t just “have feelings under stress”—you organize them into something people can perceive. Your mind tries to sequence what’s happening, but the emotional volume is high, and it tends to leak outward as expression, stance, tone, or story. Socially, you still bring presence: you perform not only as drama, but as communication.

That intensity can be clarifying for others (someone finally says the thing) and exhausting for you (you can’t sneeze quietly). People may experience you as vivid, uncompromising, magnetic, or a lot—sometimes all at once.

The peacock fits: full color, high signal, impossible to pretend you didn’t notice. Your growth edge is building private recovery time so the display doesn’t become your only coping tool.`,
  },
  TRI: {
    emoji: '🐬',
    beast: 'Dolphin',
    epithet: 'Turns chaos into synchronized splashes.',
    lore: 'You feel big, show it, then adapt fast so the pod keeps moving. You’re the one matching energy while still being visibly alive.',
    holisticProfile: `Under load, you stay relationally intelligent: you feel intensely, but you’re also scanning for how the group can keep moving. You might emote visibly, joke, escalate, or press—but often with an underlying motive of coordination: let’s keep this pod alive, let’s not freeze.

You adapt quickly because “correct” matters less to you in the moment than workable. That makes you memorable in crises and teams: people feel met. It can also leave you merging too hard with other people’s tempo.

The dolphin isn’t performing emptily—it’s converting turbulence into motion others can join. Your edge is noticing when synchronization has turned into self-erasure, and letting yourself surface your own needs with the same skill you use to read the room.`,
  },
  TRW: {
    emoji: '🦊',
    beast: 'Red fox',
    epithet: 'Dramatic exit, immaculate tracks, already three hedges away.',
    lore: 'You let it out, pivot, and vanish—quick reads, quick moves, low profile once the heat spikes.',
    holisticProfile: `Your stress pattern is fast cognition plus hot feelings—then a social strategy that reduces your exposure. You read the situation, react out loud enough to be real, then pivot toward a smaller footprint once the temperature spikes.

You’re not chaotic for fun; you’re conserving energy and risk. People may remember a flash of honesty, then wonder where you went. That can protect you—and it can also confuse people who needed you to stay in the conversation.

The red fox fits: expressive when it matters, elusive when it doesn’t. Your growth edge is choosing a few relationships where “stay visible while uncomfortable” is the braver move than another clean exit.`,
  },
  TDP: {
    emoji: '🐻‍❄️',
    beast: 'Polar bear',
    epithet: 'Ice in the eyes, still takes up the whole frame.',
    lore: 'You detach to function, but socially you can’t help reading “on.” It’s controlled distance—presence without warmth.',
    holisticProfile: `When things get intense, your mind goes cool and diagnostic first. Emotion may be present, but it often arrives as numbness, distance, or “let’s not make this bigger than it is.” Socially, you still read as on: contained, imposing, deliberate—presence even when warmth is withheld.

People can experience you as powerful, intimidating, unreadable, or oddly formal under stress. You’re not performing joy; you’re performing control. That can stabilize a crisis—and it can also land as coldness if someone needed warmth first.

The polar bear is presence with cold water between you and the chaos: massive silhouette, careful energy, little wasted heat. Your edge is learning to name the little bit of thaw you can offer without feeling like you’re losing your grip.`,
  },
  TDI: {
    emoji: '🐙',
    beast: 'Octopus',
    epithet: 'Goes flat, changes texture, becomes whatever the reef needs.',
    lore: 'You go numb-forward and socially you blend—smart, soft edges, hard-to-read center.',
    holisticProfile: `You cope by going smart-and-adaptive while the emotional center goes quiet or hard to access. Thinking becomes a refuge; feeling becomes something you manage later—or sideways—while you solve, explain, or analyze.

Socially, you blend: accommodating surfaces, clever humor, competence-as-camouflage. People may underestimate how much you’re carrying because you’re so capable of fitting the reef.

The octopus maps perfectly: intelligent, flexible, textured, occasionally unreadable on purpose. Your edge is letting one trusted person see the soft body behind the camouflage—without needing to have it all figured out first.`,
  },
  TDW: {
    emoji: '🪼',
    beast: 'Jellyfish',
    epithet: 'Drifts through the drama like it isn’t your dimension.',
    lore: 'Stress makes you far away; socially you minimize contact. You’re not absent—you’re elsewhere.',
    holisticProfile: `Pressure pulls you inward into thought and away from feeling in a legible way. You might look calm, blank, distant, or “fine” while your mind is running simulations elsewhere. Socially, you reduce contact—not always as rejection, but as self-protection and low bandwidth.

People can misread this as indifference; you may experience it as overload. You’re not necessarily absent—you’re elsewhere, trying to find a version of reality you can tolerate.

The jellyfish is drift and translucency: hard to grab, easy to misunderstand. Your edge is small, honest signals (“I’m overwhelmed, I need a minute”) before you float out of reach entirely.`,
  },
  ASP: {
    emoji: '🐺',
    beast: 'Grey wolf',
    epithet: 'Commits to the hunt before the briefing is pretty.',
    lore: 'You move, then tighten the plan on the fly. Feelings stay internal, but your social signal is still sharp and deliberate.',
    holisticProfile: `Ah, anime main character syndrome. You appear energetic, charismatic and extroverted. People call you the group leader as you employ your quick decision making skills all the while being the entertainment for the whole group. But you have issues inside don't you? :( Don't worry maybe if you get enough attention, all those issues will just magically go away!`,
  },
  ASI: {
    emoji: '🐕',
    beast: 'Street-smart dog',
    epithet: 'Runs in, reads the pack, adjusts tail speed.',
    lore: 'Action-first doesn’t mean reckless—you match the room fast while holding your own storm inside.',
    holisticProfile: `You are independent. You don’t like to bother others and you don’t like it when they bother you. You want to get through life and social situations with as little drama as possible. You want to get done what needs to be done. You have friends and appear put together. BORING. Do something for the plot buddy.`,
  },
  ASW: {
    emoji: '🦔',
    beast: 'Hedgehog',
    epithet: 'Bops forward, then armor clicks shut.',
    lore: 'You lunge, contain, and socially you get small until it’s safe. Fast spikes, fast retreat.',
    holisticProfile: `Ah a lone wolf. The sigma as they say. You move in silence. You work on yourself, and don’t have any deep level friendships. You’re all about improvement. But why? What’s the end goal? To be accepted by society? Try being more authentic, maybe you are already good enough. (Does not apply to everyone, some of you suck you should work on yourselves)`,
  },
  ARP: {
    emoji: '🐓',
    beast: 'Rooster',
    epithet: 'The neighborhood knows before you do.',
    lore: 'You act, emote visibly, and perform anyway—stress becomes volume, stance, and a little theater.',
    holisticProfile: `Ah the extrovert of extroverts. You make the plans. You entertain. You regale the crowd in your messy dating stories. People love you. People hate you. You love yourself, in truly narcissistic way. You may hurt people’s feelings sometimes, but that’s okay because you’re better than them.`,
  },
  ARI: {
    emoji: '🐦‍⬛',
    beast: 'Starling',
    epithet: 'Murmer-swerves with the flock, still moving at full speed.',
    lore: 'You don’t wait for perfect—you move, feel out loud, and flex to fit so the group doesn’t fracture.',
    holisticProfile: `Yeah yeah, likeable all around. You do everything right don’t you? Multiple friend groups, a serial monogamist. Always toeing the line. Knowing what to say. It’s a bit tiring isn’t it? Take off the mask buddy, you aren't that important.`,
  },
  ARW: {
    emoji: '🐝',
    beast: 'Honeybee',
    epithet: 'Buzzes in, stings if needed, bounces before the Q&A.',
    lore: 'Burst energy, visible feelings, then withdrawal once the job’s done. You’re intense in sprints.',
    holisticProfile: `You have two friends. But man are you guys the trio. You know everything about each other. Spontaneously, you suggest a beach trip in the summer and they instantly respond they’re down. Hope they never move away…`,
  },
  ADP: {
    emoji: '🦈',
    beast: 'Great white',
    epithet: 'Cold water, clean line, still owns the frame.',
    lore: 'You act fast, feel far away, and socially you still cut a silhouette. It’s not cruelty—it’s distance with teeth.',
    holisticProfile: `Ah, the celebrity guest. Running from party to party, you show up and they cheer. You crack some jokes and they all laugh. But do any of these people really know you? You're probably insecure about how much people really like you, and you are right to be.`,
  },
  ADI: {
    emoji: '🦎',
    beast: 'House gecko',
    epithet: 'Scuttles vertical, matches the wall, gone when the light hits.',
    lore: 'Momentum + numb + blend: you solve by moving, feel thin, and let the room tell you what shape to take.',
    holisticProfile: `You cope by moving and adjusting: action first, emotional blunting second, social mirroring third. Under load you might feel “fine” in the numb sense while you scramble, accommodate, or reshuffle to reduce conflict and friction.

You can become whoever the wall needs today—flexible, clever, surprisingly tough. That flexibility has a cost: it’s easy to lose track of the you behind the camouflage.

The house gecko is vertical, fast, hard to pin: survival through fit. Your edge is naming one non-negotiable—even a small one—so blending doesn’t erase you.`,
  },
  ADW: {
    emoji: '🐚',
    beast: 'Hermit crab',
    epithet: 'Grabs the nearest shell and minds its business.',
    lore: 'You move fast internally, go flat emotionally, and socially you pull back—portable armor, minimal surface area.',
    holisticProfile: `When pressure climbs, you accelerate internally—problem-solving, scenario-planning, escape-mapping—while feelings go flat or distant and your social presence shrinks to essentials. You’re not trying to punish anyone; you’re trying to reduce threat surface area.

People may experience you as suddenly gone, quiet, or hard to reach. You may experience yourself as conserving the last usable parts of yourself.

The hermit crab carries portable shelter: adaptive, cautious, survival-minded. Your edge is tiny, deliberate re-entry—one step out of the shell—so isolation doesn’t become your default climate.`,
  },
};

export function getArchetypeBeast(code: string): ArchetypeBeast {
  return (
    archetypeBeasts[code] ?? {
      emoji: '🐾',
      beast: 'Unknown critter',
      epithet: 'Still sketching this one.',
      lore: 'No mascot copy yet for this code.',
      holisticProfile:
        'We don’t have a write-up for this combination yet—but your three letters still describe how you think, feel, and move around people when things get intense.',
    }
  );
}

export type RarityTier = 'common' | 'rare' | 'legendary' | 'mythic';

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
  legendary: {
    label: 'Legendary',
    symbol: '◈',
    color: '#d4a017',
    flavorLine: 'Okay yes, you are kind of a special duck.',
  },
  mythic: {
    label: 'Mythic',
    symbol: '◈',
    color: '#8b5cf6',
    flavorLine: 'Certified special duck. Museum-tier specimen.',
  },
};

/**
 * Heuristic rarity (not measured yet):
 * - T + S combinations are treated as baseline/common.
 * - D (Detach) skews toward higher tiers.
 * - D + P (“detached but performative”) is apex-rare — mythic (fewer than legendary).
 * - Other D combos (integrate / withdraw socially) are legendary tier.
 */
const rarityTierByCode: Record<string, RarityTier> = {
  TSP: 'mythic',
  TSI: 'common',
  TSW: 'common',
  TRP: 'common',
  TRI: 'rare',
  TRW: 'legendary',
  TDP: 'mythic',
  TDI: 'legendary',
  TDW: 'rare',
  ASP: 'common',
  ASI: 'rare',
  ASW: 'legendary',
  ARP: 'common',
  ARI: 'rare',
  ARW: 'rare',
  ADP: 'common',
  ADI: 'common',
  ADW: 'rare',
};

export function getArchetypeRarity(code: string): ArchetypeRarity {
  const tier = rarityTierByCode[code] ?? 'common';
  return { tier, ...rarityTierMeta[tier] };
}
