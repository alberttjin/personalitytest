# Axes, letter codes & quiz plan

This document locks the **three-axis model**, **collision-free 3-letter codes**, and a **draft question bank** for the personality test (stress / stimulus response).

---

## 1. Framing (what we measure)

Each axis describes a default pattern **when load is high** (time pressure, conflict, ambiguity, social scrutiny—not “everyday calm”).

| Axis | Domain | Question it answers |
|------|--------|-------------------|
| **Cognitive** | Thinking & analysis | Are you **plan-first** (map, sequence, research) or **action-first** (move, test, adjust)? |
| **Emotional** | Feelings | Do feelings get **held in**, **leak out**, or **step back / numb**? |
| **Social** | Outward presentation | Do you **perform**, **adapt / blend**, or **withdraw**? |

**Result format:** one **3-letter code**, always in this order:

**Cognitive → Emotional → Social**

Example: `P H W` = Cognitive **P** (plan-first), Emotional **H**, Social **W**.

---

## 2. Trait names (user-facing words)

These are the words we show on the site and in results. Short labels for cards; longer descriptions live in copy.

### Cognitive

| ID | User-facing name | One-line gloss |
|----|------------------|----------------|
| `plan_first` | **Plan-First** | Map and sequence before you move |
| `action_first` | **Action-First** | Move early and adjust on the fly |

### Emotional

| ID | User-facing name | One-line gloss |
|----|------------------|----------------|
| `hold` | **Hold** | Keep it in, lid on, contained *(same idea as “suppress,” different word)* |
| `vent` | **Vent** | It shows—face, voice, body; hard to hide *(same idea as “spill” / outward flow; not the verb “to vent” in copy)* |
| `detach` | **Detach** | Goes flat, distant, or unreal; feelings feel far away |

### Social

| ID | User-facing name | One-line gloss |
|----|------------------|----------------|
| `perform` | **Perform** | Visible “on”; impression management kicks in |
| `adapt` | **Adapt** | Match the room, soften edges, go flexible |
| `withdraw` | **Withdraw** | Pull back, minimize surface area, leave or go quiet |

### Why not “Snap / Suppress / Spill”?

Those three are easy to mix up: they share **S** sounds and **Sp-** starts (**Sn-**, **Su-**, **Sp-**). People hear “which S-word am I?” even when the **letters** in a code differ.

Canonical **user-facing** names use **different consonants** on emotional/social: **Hold · Vent · Detach**, **Perform · Adapt · Withdraw**. Cognitive is a **binary** (plan-first vs action-first) so the model stays clear.

**Pour vs Perform:** Both start with **P** in speech and skim-reading. The outward-feelings trait is **Vent** instead; code letter **V** so it never sits next to **Perform** (`R`) as two **P**-words in the same profile line.

---

## 3. Letter codes (no collisions)

**Two kinds of collision we avoid:**

1. **Letter codes** — No trait shares a code letter with another (e.g. we don’t use **S** for multiple traits).
2. **Spoken / skimmed names** — No three traits that all sound like “S-words” on the same test.

We use **eight unique letters** in codes (two cognitive + three emotional + three social); labels above are chosen so **first sounds** don’t cluster on the 3×3 axes.

### Code table

**Position 1 — Cognitive**

| Letter | Trait (display) |
|--------|-----------------|
| **P** | Plan-First |
| **A** | Action-First |

**Position 2 — Emotional**

| Letter | Trait (display) |
|--------|-----------------|
| **H** | Hold |
| **V** | Vent |
| **D** | Detach |

**Position 3 — Social**

| Letter | Trait |
|--------|--------|
| **R** | Perform *(R = role / “on stage”)* |
| **B** | Adapt *(temporary: B = blend)* |
| **W** | Withdraw |

### Full alphabet used

`P`, `A`, `H`, `V`, `D`, `R`, `B`, `W` — eight letters, no duplicates.

### Examples

| Code | Meaning |
|------|---------|
| `P H W` | Plan-First · Hold · Withdraw |
| `A V R` | Action-First · Vent · Perform |
| `P D B` | Plan-First · Detach · Adapt |

### URL / share slug (optional)

Use lowercase with separators to avoid ambiguity: `p-h-w` or `PHW`. If using query params: `?c=P&e=H&s=W` is enough.

---

## 4. Scoring (implementation-ready rules)

- **Cognitive** questions have **two** options (plan-first vs action-first). **Emotional** and **Social** questions have **three** options each.
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

**Total:** ~18–30 questions. Current app: **22** (6 cognitive + 8 emotional + 8 social).

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

### Cognitive axis (Plan-First `P` · Action-First `A`)

Same stems as the old **L / K / G** draft: **L** maps to **P** (plan-first), **K** to **A** (action-first); **G** options were dropped. The app copy lives in `src/data.ts` and should stay in sync with the tables below.

---

*You suddenly gain the power to fly, your first thought is...*

| Option | Letter |
|--------|--------|
| If i drink a bunch of white paint and shit from the air, can I cosplay a bird? | P |
| LET ME TAKE THIS BABY FOR A SPIN. | A |
| This is scary, how do I do this safely? | P |


*You have two great job offers. (Don't get excited, its just a hypothetical). The acceptance deadline is in 48 hours. You have agonized over the decision for the past 5 days.*

| Option | Letter |
|--------|--------|
| Let me go through pros and cons again, I'll think up until the last minute. | P |
| I've done enough research, I'm just gonna pick one. | A |
| I'm flipping a coin ... | A |

*OMG ~SQUEAL~ THEY FINALLY GAVE ME THEIR NUMBER!!! Regarding your first message...*

| Option | Letter |
|--------|--------|
| Let think about it for 20 some minutes, and perhaps phone a friend. | P |
| I send hi! or the first line I think of. | A |
| Imma just send the same awesome pickup line I send everyone | A |

*You have way too many tabs open, and your computer is lagging. Your first thought is ...*

| Option | Letter |
|--------|--------|
| Let me look through the tabs, and think about if any are important. Then I'll clean up the ones I don't need. | P |
| I'm just gonna close all tabs and start from fresh | A |
| This is overwhelming time to visit my favorite incognito site | A |

*You are a weirdo with no friends. You must looksmaxx until everybody loves you. Regarding purchasing a home gym...*

| Option | Letter |
|--------|--------|
| Hmm, this purchase is rather large, lemme think about it for a couple of months.| P |
| I need to looksmaxx NOW. PURCHASE. | A |
| This is too expensive, i will get my ass up and go to the gym ... | A |

*Which superpower would you rather have?*

| Option | Letter |
|--------|--------|
| You can gain any skill in the world for 1 hour, but once you do, you can never gain that skill agin  | P |
| You can rewind time by 5 seconds whenever you want, with a 5 second cooldown| A |
| You can run faster than a car without breaking a sweat  | X |

**Optional later:** add a third option that scores **neither** (decoys / duplicates) if you want three buttons on screen without a “fog” trait—would need a small scoring tweak in code.

---

### Emotional axis (Hold `H` · Vent `V` · Detach `D`)

*Which backstory hits you in the feels the hardest?*

| Option | Letter |
|--------|--------|
| A young boy constantly watches as his single mother prioritizes his disabled younger brother. He must shoulder the burden of loneliness, but is unable to complain as his mother cannot handle taking care of both him and his disabled brother.  | H |
| A 14 year old boy loses his parents due to a car crash with a drunk driver. The driver gets away and the boy spends the next few years seeking revenge. | V |
| A young girl gets ostracized by the rest of the class. They snicker and talk behind her back, speaking ill of her worn down clothing and school supplies. She dives into her schoolwork, vowing to becoming someone successful. | D |

*Your crush usually responds in 30 minutes, but it'*

| Option | Letter |
|--------|--------|
| Acting normal externally while your insides start simmering | H |
| Immediately replying “ARE YOU MAD AT ME” (caps optional) | V |
| Going weirdly calm/blank like “interesting, I no longer exist” | D |

*Your meme flops. Like… 2 likes. One is you. What happens emotionally?*

| Option | Letter |
|--------|--------|
| You pretend you don’t care, but it goes into a vault labeled “later” | H |
| You make it everyone’s problem (group chat: “I’m being censored”) | V |
| You detach and become an anthropologist observing “attention economy” | D |

*You accidentally send a message to the wrong person. You watch it deliver. You watch yourself watch it deliver.*

| Option | Letter |
|--------|--------|
| Poker face, immediate damage-control plan in silence | H |
| Panic leaks out: frantic follow-up texts / voice note / apology tour | V |
| Instant numbness like you hit “spectator mode” | D |

*Someone gives you a compliment in public and you can feel your face temperature rise.*

| Option | Letter |
|--------|--------|
| You keep it contained: “haha thanks” and you move on | H |
| You visibly react (laugh/cover face/short-circuit) | V |
| You feel distant like the compliment is happening to a stranger | D |

*You’re mad. Not “mildly annoyed.” Mad-mad. What do you do with it?*

| Option | Letter |
|--------|--------|
| Store it, stay composed, bring it up later (maybe never) | H |
| It comes out in tone, sarcasm, volume, or immediate confrontation | V |
| You go cold/flat and stop feeling much of anything | D |

*You’re sad but there are still tasks. The capitalism continues.*

| Option | Letter |
|--------|--------|
| You compartmentalize and function until you’re alone | H |
| It shows: watery eyes, “I’m fine” voice, or telling someone | V |
| You feel emotionally far away, like the sadness is behind glass | D |



### Social axis (Perform `R` · Adapt `B` · Withdraw `W`)

**S1 — Room full of strangers (stressful context)**  
*You tend to…*

| Option | Letter |
|--------|--------|
| Charm mode unlocked: smiles, names, one-liners, immediate main-character networking. | R |
| Read the room first, mirror the pace, and slide into whichever vibe feels safest. | B |
| Become a decorative plant near the snacks and answer in short sentences. | W |

**S2 — You’re unprepared in a meeting**  
*You…*

| Option | Letter |
|--------|--------|
| Speak first with a confident framing so you control the tone. | R |
| Ask a calibrating question and align with whoever has the clearest direction. | B |
| Camera-off energy: keep comments minimal and pray we run out of time. | W |

**S3 — Conflict—people look at you**  
*You…*

| Option | Letter |
|--------|--------|
| Take the mic and deliver a clean stance with courtroom confidence. | R |
| Translate both sides and lower the temperature before anyone explodes. | B |
| Shrink your footprint, disengage, and let the blast radius pass. | W |

**S4 — Complimented in front of others**  
*You…*

| Option | Letter |
|--------|--------|
| Accept with style, toss in a joke, keep the spotlight moving. | R |
| Bounce the compliment back and match their energy so it stays comfortable. | B |
| Blue-screen internally, mumble thanks, and change the subject immediately. | W |

**S5 — You need help but pride is involved**  
*You…*

| Option | Letter |
|--------|--------|
| Package the ask like a strategic collaboration, not a rescue. | R |
| Ask the way this group normally asks, so it feels natural. | B |
| Say “all good” and brute-force it alone even if it takes longer. | W |

**S6 — Party when you’re not in the mood**  
*You…*

| Option | Letter |
|--------|--------|
| Flip the social switch and host your own mini orbit. | R |
| Drift between groups, matching tone person by person. | B |
| Find one safe corner, one safe person, and an exit timeline. | W |

**S7 — Online argument**  
*You tend to…*

| Option | Letter |
|--------|--------|
| Drop a sharp public take with receipts and one clean closer. | R |
| Rewrite for de-escalation, find common ground, then land it softly. | B |
| Type three drafts, delete all of them, and close the app. | W |

**S8 — New environment (school/job/move)**  
*Under stress you…*

| Option | Letter |
|--------|--------|
| Introduce your vibe early so people know your lane. | R |
| Observe local norms, then adapt fast to how things are done. | B |
| Keep your profile low until the social weather feels stable. | W |

---

## 7. Next steps (content & product)

1. **Copy edit** all stems for tone (warm, non-clinical, inclusive).
2. **Balance** option length and reading level across items.
3. **Pilot** on 10–20 people: watch for “all middle answers” or axis leakage.
4. **Lock** `P/A`, `H/V/D`, `R/B/W` in code as enums; personality blurbs keyed by 3-letter codes (e.g. `PHW`, `AVR`).
5. **Optional:** A/B test 18 vs 24 questions for completion rate.

---

## 8. Revision log

| Date | Change |
|------|--------|
| 2026-04-15 | Initial axis definitions, letter system, draft 24 questions |
| 2026-04-16 | Cognitive axis reduced to **P/A** (plan-first vs action-first); **18** archetypes (2×3×3) |
