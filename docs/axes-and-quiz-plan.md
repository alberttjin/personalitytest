# Axes, letter codes & quiz plan

This document locks the **three-axis model**, **collision-free 3-letter codes**, and a **draft question bank** for the personality test (stress / stimulus response).

---

## 1. Framing (what we measure)

Each axis describes a default pattern **when load is high** (time pressure, conflict, ambiguity, social scrutiny—not “everyday calm”).

| Axis | Domain | Question it answers |
|------|--------|-------------------|
| **Cognitive** | Thinking & analysis | Are you **think-first** (map, sequence, research) or **action-first** (move, test, adjust)? |
| **Emotional** | Feelings | Do feelings get **suppressed / kept in**, **released / obvious on the outside**, or **detach / numb / far away**? |
| **Social** | Outward presentation | Do you **perform**, **integrate / match the room**, or **withdraw**? |

**Result format:** one **3-letter code**, always in this order:

**Cognitive → Emotional → Social**

Example: `T S W` = Cognitive **T** (think-first), Emotional **S** (suppress), Social **W** (withdraw).

---

## 2. Trait names (user-facing words)

These are the words we show on the site and in results. Short labels for cards; longer descriptions live in copy.

### Cognitive

| ID | User-facing name | One-line gloss |
|----|------------------|----------------|
| `think_first` | **Think-First** | Map and sequence before you move |
| `action_first` | **Action-First** | Move early and adjust on the fly |

### Emotional

| ID | User-facing name | One-line gloss |
|----|------------------|----------------|
| `suppress` | **Suppress** | Keep it in, lid on, contained |
| `release` | **Release** | It shows—face, voice, body; hard to hide |
| `detach` | **Detach** | Goes flat, distant, or unreal; feelings feel far away |

### Social

| ID | User-facing name | One-line gloss |
|----|------------------|----------------|
| `perform` | **Perform** | Visible “on”; impression management kicks in |
| `integrate` | **Integrate** | Match the room, soften edges, go flexible |
| `withdraw` | **Withdraw** | Pull back, minimize surface area, leave or go quiet |

### Notes on collisions (why the letters look like this)

We want **one unique letter per trait** across the whole model, and we also want adjacent profile lines not to read like the same word twice.

What changed vs the older draft:

- Cognitive “plan-first” became **think-first** with **`T`** so **`P`** can mean **Perform** on the social axis.
- Emotional **Suppress** uses **`S`**, **Release** uses **`R`**, **Detach** uses **`D`**.
- Social **Perform** uses **`P`**, **Integrate** uses **`I`**, **Withdraw** uses **`W`**.

Together, the eight code letters are: **`T`, `A`, `S`, `R`, `D`, `P`, `I`, `W`** (no duplicates).

---

## 3. Letter codes (no collisions)

**Two kinds of collision we avoid:**

1. **Letter codes** — No trait shares a code letter with another.
2. **Spoken / skimmed names** — No three traits that all sound like “S-words” on the same test.

We use **eight unique letters** in codes (two cognitive + three emotional + three social); labels above are chosen so **first sounds** don’t cluster on the 3×3 axes.

### Code table

**Position 1 — Cognitive**

| Letter | Trait (display) |
|--------|-----------------|
| **T** | Think-First |
| **A** | Action-First |

**Position 2 — Emotional**

| Letter | Trait (display) |
|--------|-----------------|
| **S** | Suppress |
| **R** | Release |
| **D** | Detach |

**Position 3 — Social**

| Letter | Trait |
|--------|--------|
| **P** | Perform |
| **I** | Integrate |
| **W** | Withdraw |

### Full alphabet used

`T`, `A`, `S`, `R`, `D`, `P`, `I`, `W` — eight letters, no duplicates.

### Examples

| Code | Meaning |
|------|---------|
| `T S W` | Think-First · Suppress · Withdraw |
| `A R P` | Action-First · Release · Perform |
| `T D I` | Think-First · Detach · Integrate |

### URL / share slug (optional)

Use lowercase with separators to avoid ambiguity: `t-s-w` or `TSW`. If using query params: `?c=T&e=S&s=W` is enough.

---

## 4. Scoring (implementation-ready rules)

- **Cognitive** questions have **two** options (think-first vs action-first). **Emotional** and **Social** questions have **three** options each.
- Each option awards **+1** to **one** trait on **one** axis (never two axes at once for a single answer).
- **Per axis:** sum points for that axis’s traits; winning trait = **max** (ties: see below).
- **Final type:** concatenate the three winning letters in order **C → E → S**.

### Ties

1. If two traits tie on an axis: use **second-highest** count as tie-breaker.
2. If still tied (rare with enough questions): pick the trait that appeared in **more recent** answers (optional rule), or show a “balanced / borderline” line in copy—product decision.

### Targets for question counts

| Axis | Minimum useful | Comfortable |
|------|----------------|-------------|
| Cognitive | 6 | 8–10 |
| Emotional | 6 | 8–10 |
| Social | 6 | 8–10 |

**Total:** ~18–30 questions. Current app: **18** (6 cognitive + 6 emotional + 6 social), same as the draft bank below; the live quiz shuffles question order and option order each run.

---

## 5. Question design rules

1. **Stress-skewed stems:** Prefer “when you’re overloaded / on the spot / running out of time…” not neutral habits.
2. **One axis per question:** Don’t mix “I think X and feel Y” in one item unless options cleanly isolate one axis.
3. **No “good/bad”:** Options are **styles**, not worthiness—keeps shareability and reduces social desirability bias (still present, but mitigated).
4. **Concrete situations** beat abstract adjectives (“in a meeting when you’re challenged…” vs “I am analytical”).
5. **Randomize option order** per screen where possible to reduce position bias.

---

## 6. Draft question bank

Below: **draft stems**. **Cognitive** items have **two** options; **emotional** and **social** have **three** each. Each option maps to **one letter** (trait) on that axis. Labels in brackets are for **internal scoring only**—UI can show only the scenario text.

### Cognitive axis (Think-First `T` · Action-First `A`)

Same stems as the old **L / K / G** draft: **L** maps to **T** (think-first), **K** to **A** (action-first); **G** options were dropped. The app copy lives in `src/data.ts` and should stay in sync with the tables below.

---

*You suddenly gain the power to fly, your first thought is...*

| Option | Letter |
|--------|--------|
| If I drink a bunch of white paint and shit from the air, can I cosplay a bird? | T |
| LET ME TAKE THIS BABY FOR A SPIN. | A |
| This is scary, how do I do this safely? | T |


*You have two great job offers. (Don't get excited, its just a hypothetical). The acceptance deadline is in 48 hours. You have agonized over the decision for the past 5 days.*

| Option | Letter |
|--------|--------|
| Let me go through pros and cons again, I'll think up until the last minute. | T |
| I've done enough research, I'm just gonna pick one. | A |
| I'm flipping a coin ... | A |

*OMG ~SQUEAL~ THEY FINALLY GAVE ME THEIR NUMBER!!! Regarding your first message...*

| Option | Letter |
|--------|--------|
| Let think about it for 20 some minutes, and perhaps phone a friend. | T |
| I send hi! or the first line I think of. | A |
| Imma just send the same awesome pickup line I send everyone | A |

*You have way too many tabs open, and your computer is lagging. Your first thought is ...*

| Option | Letter |
|--------|--------|
| Let me look through the tabs, and think about if any are important. Then I'll clean up the ones I don't need. | T |
| I'm just gonna close all tabs and start from fresh | A |
| This is overwhelming time to visit my favorite incognito site | A |

*You are a weirdo with no friends. You must looksmaxx until everybody loves you. Regarding purchasing a home gym...*

| Option | Letter |
|--------|--------|
| Hmm, this purchase is rather large, lemme think about it for a couple of months. | T |
| I need to looksmaxx NOW. PURCHASE. | A |
| This is too expensive, i will get my ass up and go to the gym ... | A |

*Which superpower would you rather have?*

| Option | Letter |
|--------|--------|
| You can gain any skill in the world for 1 hour, but once you do, you can never gain that skill agin | T |
| You can rewind time by 5 seconds whenever you want, with a 5 second cooldown| A |
| You can run faster than a car without breaking a sweat  | A |

---

### Emotional axis (Suppress `S` · Release `R` · Detach `D`)

*Which backstory hits you in the feels the hardest?*

| Option | Letter |
|--------|--------|
| A young boy constantly watches as his single mother prioritizes his disabled younger brother. He must shoulder the burden of loneliness, but is unable to complain as his mother cannot handle taking care of both him and his disabled brother. | S |
| A 14 year old boy loses his parents due to a car crash with a drunk driver. The driver gets away and the boy spends the next few years seeking revenge. | R |
| A young girl gets ostracized by the rest of the class. They snicker and talk behind her back, speaking ill of her worn down clothing and school supplies. She dives into her schoolwork, vowing to becoming someone successful. | D |

*What would you prefer?*

| Option | Letter |
|--------|--------|
| Month long explosive diahrrea | S |
| Month long heavy constipation | R |
| Neither, but your entire genital region goes numb for a year. | D |

*You are SUPER lonely. Nobody wants to date you. Tonight, you are hanging with your good friend Carl, but as usual, he's just gonna talk about his stupid wonderful relationship. A bird also shat on your head today. Your thoughts?*

| Option | Letter |
|--------|--------|
| He irritates me to no end but I'm going to suck it up and go | S |
| I'm gonna tell him how I feel. Just cuz im a loser doesn't mean I need to listen to his crap. | R |
| Guess what Carl, I'm suddenly sick! I'm so sorry I can't hangout today :( | D |

*You have an exciting date! (Once again relax, it's just a hypothethical). You sit at the bar waiting for them. They never show. You got ghosted. What do you do now?*

| Option | Letter |
|--------|--------|
| Sit there for 40 minutes, nursing your drink, thinking about where you went wrong. | S |
| Complain to the friendly bartender. The nerve of people these days. They don't even have the decency to reject over text??? | R |
| Instantly leave. Forget it, there's plenty of fish in the sea. | D |

*Uh oh, your partner caught you looking at other people's feet pics again! You apologized and feel very guilty, but they are still giving you the silent treatment. What do you do?*

| Option | Letter |
|--------|--------|
| Sit at your desk, feeling guilty, occassionally glancing towards them, thinking over your actions. | S |
| Keep profusely apologizing and begging them to talk to you again. | R |
| You feel distant like the compliment is happening to a stranger | D |

*What is your preferred form of self therapy?*

| Option | Letter |
|--------|--------|
| Meditation | S |
| Blab sesh with the homies | R |
| Shopaholic baby | D |

### Social axis (Perform `P` · Integrate `I` · Withdraw `W`)

*You are late for the pregame and everyone is loud and rowdy! What do you do?*

| Option | Letter |
|--------|--------|
| START SCREAMING AND JUMPING WITH EVERYONE ELSE | P |
| Start throwing back drinks and slowly blend in | I |
| Stand around and observe, maybe talk to a few of the lone stragglers around| W |

*You are at karaoke! Your singing voice sounds like Charlie Puth, if Charlie Puth sucked ass at singing. What to do?*

| Option | Letter |
|--------|--------|
| IM BELTING MY ASS OFF ANYWAYS, EVERYONE MUST HEAR ME SING | P |
| Sing softer with everyone else, and | I |
| Camera-off energy: keep comments minimal and pray we run out of time. | W |

*You at the club/rave with your friends. They all start happily dancing, linked arms, in a circle. What do you do?*

| Option | Letter |
|--------|--------|
| Go under their arms and pop out in the middle. Everyone cheers. | P |
| Put my arm awkwardly around two of my friends and join the circle. | I |
| Pretend not to notice them and stare forward, focusing on the music. | W |

*Which superhero would you like to be?*

| Option | Letter |
|--------|--------|
| Superman | P |
| Batman | I |
| Hawkeye | W |

*Which generic character archetype would you be?*

| Option | Letter |
|--------|--------|
| THE MAIN FUCKING CHARACTER | P |
| The comedic relief best friend | I |
| Side npc character who avoids all the conflict | W |

*If you were a pokemon, which pokemon would you be?*

| Option | Letter |
|--------|--------|
| Magikarp (Don't you dare pick this one) | P |
| Magikarp (Pick this one) | I |
| Magikarp  | W |


---

## 7. Next steps (content & product)

1. **Copy edit** all stems for tone (warm, non-clinical, inclusive).
2. **Balance** option length and reading level across items.
3. **Pilot** on 10–20 people: watch for “all middle answers” or axis leakage.
4. **Lock** `T/A`, `S/R/D`, `P/I/W` in code as enums; personality blurbs keyed by 3-letter codes (e.g. `TSW`, `ARP`).
5. **Optional:** A/B test 18 vs 24 questions for completion rate.

---

## 8. Revision log

| Date | Change |
|------|--------|
| 2026-04-15 | Initial axis definitions, letter system, draft 24 questions |
| 2026-04-16 | Cognitive axis **T/A** (think-first vs action-first); **18** archetypes (2×3×3) |
| 2026-04-17 | Letter remap: **T/A**, **S/R/D**, **P/I/W** (Think / Suppress·Release·Detach / Perform·Integrate·Withdraw); archetype codes renamed accordingly |
