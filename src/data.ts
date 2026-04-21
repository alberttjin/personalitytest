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
      'When faced with a complex intellectual problem, you love to overthink. You plan and plan and plan and you probably think you are so smart but sometimes you just gotta make a decision. My lawyers say I need to say something nice as well, so you may overthink but you are also careful and usually make fewer mistakes.',
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
      'When faced with a complex emotional problem, you hold your feelings inside. You probably are a people pleaser and would rather not bother them with your silly issues. The irony is people don\'t really trust you because you are emotionally distant. Read you like a book didn\'t I? On the bright side, you have strong control over your emotions and rarely \"crash out\" like the kids do these days.',
    emoji: '🧊',
    color: '#3b82f6',
  },
  R: {
    name: 'Release',
    blurb: 'emotions leak outward',
    detail:
      'When faced with a complex emotional problem, you let it out. Whether venting to third parties or direct confrontation, you healthily express your feelings until everyone is annoyed with you. Maybe grow up a bit and learn to not be so dramatic. Unless you are an actual child then maybe get off this website.',
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
      'In social situations, you read the vibe like a book and figure out what the safest way to fit in is. Nobody hates you, nobody loves you, the meatloaf version of a person. That being said, you can hang out with almost any group, any type of person, and that\'s a skill I can\'t deny.',
    emoji: '🦎',
    color: '#10b981',
  },
  W: {
    name: 'Withdraw',
    blurb: 'pull back + disappear',
    detail:
      'In social situations, you pull back and go quiet or avoid the situation altogether. Fly on the wall, they say. Honestly you probably get bullied all the time by extroverts asking you "why are you so quiet?", so I will not bully you further. You\'re welcome.',
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
      'You suddenly gain the power to fly. Your first thought is...',
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
      "You have two great job offers. (Don't get excited, it's just a hypothetical). The acceptance deadline is in 48 hours. You have agonized over the decision for the past 5 days.",
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
        text: 'Let\'s think about it for 20 some minutes, and perhaps phone a friend.',
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
        text: 'This is too expensive, I will get my ass up and go to the gym ...',
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
        text: 'You can gain any skill in the world for 1 hour, but once you do, you can never gain that skill again',
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
        text: 'A 14-year-old boy loses his parents due to a car crash with a drunk driver. The driver gets away and the boy spends the next few years seeking revenge.',
        letter: 'R',
      },
      {
        text: 'A young girl gets ostracized by the rest of the class. They snicker and talk behind her back, speaking ill of her worn down clothing and school supplies. She dives into her schoolwork, vowing to become someone successful.',
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
      { text: 'Month-long explosive diarrhea', letter: 'S' },
      { text: 'Month-long heavy constipation', letter: 'R' },
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
        text: "Guess what Carl, I'm suddenly sick! I'm so sorry I can't hang out today :(",
        letter: 'D',
      },
    ],
  },
  {
    id: 'e4',
    axis: 'emotional',
    weight: 0.8,
    prompt:
      "You have an exciting date! (Once again, relax, it's just a hypothetical). You sit at the bar waiting for them. They never show. You got ghosted. What do you do now?",
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
        text: 'Sit at your desk, feeling guilty, occasionally glancing towards them, thinking over your actions.',
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
    weight: 0.5,
    prompt: 'What is your preferred form of self-therapy?',
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
    weight: 0.85,
    prompt:
      'You\'re at the club/rave with your friends. They all start happily dancing, linked arms, in a circle. What do you do?',
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
    prompt: 'If you were a Pokémon, which Pokémon would you be?',
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
    holisticProfile: `Man you're weird. At home, you can be a bit of a nervous wreck. Always thinking, always feeling, always overanalyzing. But somehow in social situations, it all falls away. Just like a sea eagle, you love to soar high while everyone watches. But maybe you should learn to be comfortable on the ground.`,
  },
  TSI: {
    emoji: '🦎',
    beast: 'Chameleon',
    epithet: 'Studies the branch colors before picking a skin.',
    lore: 'You don’t rush identity—you read context, then match without losing your own spine. Pressure makes you observant, not loud.',
    holisticProfile: `Do I even need to explain? You resemble the chameleon through and through. You love to blend in, carefully analyzing most situations. You don't have many friends, but are generally palatable. Maybe it's time to stand out. Wear a cape to your next party.`,
  },
  TSW: {
    emoji: '🦉',
    beast: 'Burrowing owl',
    epithet: 'Knows every hole in the field; chooses when to be seen.',
    lore: 'You think first, feel second in the room, and socially you shrink your footprint until the landscape makes sense.',
    holisticProfile: `The CLASSIC. Large social situations make you want to jump into a hole like the burrowing owl, but you have a few close friends you trust with your LIFE. You vent to them constantly, and your fears are valid they are getting sick of you. Just kidding! But maybe branch out a bit :)`,
  },
  TRP: {
    emoji: '🦚',
    beast: 'Peacock',
    epithet: 'If it hurts, the room will hear it—in full color.',
    lore: 'You sequence stress into a story, feelings leak outward, and socially you still bring the show. It’s a lot; it’s also honest.',
    holisticProfile: `Show off. Put the feathers away. How much attention can you suck up? I suppose there is no limit. You live for the tea, and spread it like an airborne virus. The only prerequisite for you to like someone is that they like you first. You tend to have introvert friends who love to listen to your ridiculous stories. But at home, maybe stop procrastinating. You got work to do. Why are you even on this website?`,
  },
  TRI: {
    emoji: '🐬',
    beast: 'Dolphin',
    epithet: 'Turns chaos into synchronized splashes.',
    lore: 'You feel big, show it, then adapt fast so the pod keeps moving. You’re the one matching energy while still being visibly alive.',
    holisticProfile: `Your chattering about your problems sounds like a click of dolphins. Yap yap yap, you love to gossip. But oddly, you are relatively competent. You do a good job at work, rarely making mistakes. But don't think I don't see you putting off important tasks. Stop procrastinating bro.`,
  },
  TRW: {
    emoji: '🦊',
    beast: 'Red fox',
    epithet: 'Dramatic exit, immaculate tracks, already three hedges away.',
    lore: 'You let it out, pivot, and vanish—quick reads, quick moves, low profile once the heat spikes.',
    holisticProfile: `A bit of a nervous nelly are we? Like the red fox, you are a rare sight, dashing out here and there to avoid being perceived. That said, you do have a few close friends who help guide you through life and you couldn't be more thankful for them.`,
  },
  TDP: {
    emoji: '🐻‍❄️',
    beast: 'Polar bear',
    epithet: 'Ice in the eyes, still takes up the whole frame.',
    lore: 'You detach to function, but socially you can’t help reading “on.” It’s controlled distance—presence without warmth.',
    holisticProfile: `You shine bright, but beneath the glow there is a layer of ice: perfectly embodying the majestic polar bear. You aren't loud, but are magnetic. People are drawn to you due to your competence and overall demeanor. But careful, respect and admiration does not always mean love.`,
  },
  TDI: {
    emoji: '🐙',
    beast: 'Octopus',
    epithet: 'Goes flat, changes texture, becomes whatever the reef needs.',
    lore: 'You go numb-forward and socially you blend—smart, soft edges, hard-to-read center.',
    holisticProfile: `You are late to the function. Told yourself you could get ready in 30 minutes. Took you 2 hours. Spent too long on TikTok. You slither in like an octopus, blending in with the crowd. But laziness aside, you are quite chill and also very intelligent. Life isn't too hard for you, but maybe it's because you choose the path of least resistance.`,
  },
  TDW: {
    emoji: '🪼',
    beast: 'Jellyfish',
    epithet: 'Drifts through the drama like it isn’t your dimension.',
    lore: 'Stress makes you far away; socially you minimize contact. You’re not absent—you’re elsewhere.',
    holisticProfile: `Ah the introvert of introverts. The problems of your life often don't involve other people, but rather your own desires and goals. Like a jellyfish, you prefer to drift through life, slowly and carefully making important decisions, while avoiding the drama of others. Sounds peaceful. But a bit sad...`,
  },
  ASP: {
    emoji: '🐅',
    beast: 'Tiger',
    epithet: 'Explodes off the line, then dares the room to keep up.',
    lore: 'You move first, hold emotion tight, and still project authority. Under pressure you read as focused power, not panic.',
    holisticProfile: `Ah, anime main character syndrome. You appear energetic, charismatic and extroverted like the king of the jungle. People call you the group leader as you employ your quick decision making skills all the while being the entertainment for the whole group. But you have issues inside don't you? :( Don't worry maybe if you get enough attention, all those issues will just magically go away!`,
  },
  ASI: {
    emoji: '🦦',
    beast: 'River otter',
    epithet: 'Dives in first, then syncs with the current and the crew.',
    lore: 'Action-first doesn’t mean reckless—you move fast, read the group, and adapt without making every moment about yourself.',
    holisticProfile: `You are independent. You don’t like to bother others and you don’t like it when they bother you. You want to get through life and social situations with as little drama as possible, floating along the river like a cute little otter. You want to get done what needs to be done. You have friends and appear put together. BORING. Do something for the plot buddy.`,
  },
  ASW: {
    emoji: '🐺',
    beast: 'Lone wolf',
    epithet: 'Surges ahead, then vanishes into the tree line.',
    lore: 'You lunge, contain, and socially shrink your profile until it feels safe again—fast spikes, fast retreat.',
    holisticProfile: `Ah a lone wolf. The sigma as they say. You move in silence. You work on yourself, and don’t have any deep level friendships. You’re all about improvement. But why? What’s the end goal? To be accepted by society? Try being more authentic, maybe you are already good enough. (Does not apply to everyone, some of you suck you should work on yourselves)`,
  },
  ARP: {
    emoji: '🦁',
    beast: 'Lion',
    epithet: 'Kicks the door open roaring, then owns the whole scene.',
    lore: 'You act first, feel loudly, and perform anyway. Stress becomes presence, volume, and main-character gravity.',
    holisticProfile: `Ah the extrovert of extroverts. You make the plans. You entertain. You regale the crowd in your messy dating stories. People love you. People hate you. You love yourself, in a truly narcissistic way. You may hurt people’s feelings sometimes, but that’s okay because you’re better than them. And like the lion, your loud ass voice can be heard from miles away.`,
  },
  ARI: {
    emoji: '🐧',
    beast: 'Penguin',
    epithet: 'Waddles in fast, reads the colony, and keeps everyone synced.',
    lore: 'You move first, feel openly, and blend smoothly with the group so things stay connected.',
    holisticProfile: `Yeah yeah, likeable all around. You do everything right don’t you? Multiple friend groups, a serial monogamist. Always toeing the line. Knowing what to say. It’s a bit tiring isn’t it? Like the penguin, people adore you, but you tend to blend in with the crowd.`,
  },
  ARW: {
    emoji: '🐺',
    beast: 'Hyena',
    epithet: 'Laughs loud with the crew, then ghosts before the afterparty debrief.',
    lore: 'Burst energy, visible feelings, then withdrawal once the moment passes. You’re intense in social sprints.',
    holisticProfile: `You have two friends. But man are you guys the trio. When together, your shrill laughter sounds like a cackling hyena pack. You know everything about each other. Spontaneously, you suggest a beach trip in the summer and they instantly respond they’re down. Hope they never move away…`,
  },
  ADP: {
    emoji: '🦈',
    beast: 'Great white',
    epithet: 'Cold water, clean line, still owns the frame.',
    lore: 'You act fast, feel far away, and socially you still cut a silhouette. It’s not cruelty—it’s distance with teeth.',
    holisticProfile: `Ah, the celebrity guest. Running from party to party, you show up and they cheer. You crack some jokes and they all laugh. But do any of these people really know you? You're probably insecure about how much people really like you, and you are right to be. Like the great white, you have the charisma and the presence, but somehow you feel alone.`,
  },
  ADI: {
    emoji: '🦑',
    beast: 'Cuttlefish',
    epithet: 'Flashes new colors mid-chaos and disappears into the background.',
    lore: 'Momentum + numb + blend: you solve by moving, mute the feelings, and match whatever pattern keeps you safe.',
    holisticProfile: `Life ain\'t that serious. Gotta live for the hehe haha. Crashing out? Never been there. People love you because you're chill, funny and seem to have things together. You dance through life like a cuttlefish waddling through the ocean. But you haven't always been like this, have you? You were a sensitive kid. You used to get overwhelmed. So you learned to dampen the spectrum of emotions. Nothing wrong with that. But remember, if life never hurts you, are you really living? :)`,
  },
  ADW: {
    emoji: '🐚',
    beast: 'Hermit crab',
    epithet: 'Grabs the nearest shell and minds its business.',
    lore: 'You move fast internally, go flat emotionally, and socially you pull back—portable armor, minimal surface area.',
    holisticProfile: `When's the last time you touched grass? You love your own company. You can spend days indoors on personal projects, hobbies, and honestly that's admirable. Your mental health, unlike others, took no hit during the pandemic. But hey, maybe let's go outside! Get out of your shell, even the hermit crab needs a change of scenery. Friends are not replaceable with hobbies. :)`,
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

export type RarityTier = 'common' | 'uncommon' | 'rare' | 'anomaly';

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
  uncommon: {
    label: 'Uncommon',
    symbol: '◈',
    color: '#3b82f6',
    flavorLine: 'Not everywhere, not nowhere. Interesting little gremlin.',
  },
  rare: {
    label: 'Rare',
    symbol: '◈',
    color: '#d4a017',
    flavorLine: 'Okay yes, you are kind of a special duck.',
  },
  anomaly: {
    label: 'Anomaly',
    symbol: '◈',
    color: '#8b5cf6',
    flavorLine: 'Certified special duck. Museum-tier specimen.',
  },
};

/**
 * Heuristic rarity (not measured yet):
 * - T + S combinations are treated as baseline/common.
 * - D (Detach) skews toward higher tiers.
 * - D + P (“detached but performative”) is apex-rare — anomaly (fewer than rare).
 * - Other D combos (integrate / withdraw socially) are rare tier.
 */
const rarityTierByCode: Record<string, RarityTier> = {
  TSP: 'anomaly',
  TSI: 'common',
  TSW: 'common',
  TRP: 'rare',
  TRI: 'common',
  TRW: 'rare',
  TDP: 'rare',
  TDI: 'common',
  TDW: 'uncommon',
  ASP: 'anomaly',
  ASI: 'uncommon',
  ASW: 'rare',
  ARP: 'rare',
  ARI: 'uncommon',
  ARW: 'uncommon',
  ADP: 'common',
  ADI: 'common',
  ADW: 'uncommon',
};

export function getArchetypeRarity(code: string): ArchetypeRarity {
  const tier = rarityTierByCode[code] ?? 'common';
  return { tier, ...rarityTierMeta[tier] };
}
