import { useCallback, useEffect, useMemo, useState, type ReactNode } from 'react';
import {
  axisMeta,
  formatBeastDisplayName,
  getArchetypeBeast,
  getArchetypeRarity,
  letterKeyPage,
  questions,
  traitMeta,
  type Axis,
  type Letter,
  type Question,
} from './data';
import {
  buildTabPath,
  buildTypePath,
  buildTypeShareUrl,
  getInitialAppRoute,
  parseAppRoute,
  type AppTab,
} from './urlRoutes';

function shuffleArray<T>(items: readonly T[]): T[] {
  const arr = [...items];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    const t = arr[i];
    arr[i] = arr[j]!;
    arr[j] = t!;
  }
  return arr;
}

/** New question order + shuffled options each time `quizNonce` bumps (see startQuiz). */
function buildQuizDeck(bank: Question[]): Question[] {
  const withOpts = bank.map((q) => ({
    ...q,
    options: shuffleArray(q.options),
  }));
  return shuffleArray(withOpts);
}

type QuizScreen = 'intro' | 'quiz' | 'result';
type Tab = AppTab;

const AXIS_EMOJI: Record<Axis, string> = {
  cognitive: '🧠',
  emotional: '⚡',
  social: '🎭',
};

function getWinningLetter(axis: Axis, answers: Record<string, Letter>): Letter {
  const tally: Record<Letter, number> = {
    T: 0,
    A: 0,
    S: 0,
    R: 0,
    D: 0,
    P: 0,
    I: 0,
    W: 0,
  };

  questions
    .filter((q) => q.axis === axis)
    .forEach((q) => {
      const selected = answers[q.id];
      if (selected) tally[selected] += 1;
    });

  const candidates = axisMeta[axis].letters as Letter[];
  return candidates.reduce((best, current) =>
    tally[current] > tally[best] ? current : best,
  );
}

function lettersFromCode(code: string): Letter[] {
  return code.split('') as Letter[];
}

const DETAIL_AXIS_ORDER: Axis[] = ['cognitive', 'emotional', 'social'];

function ArchetypeDetailInner({
  code,
  headingId,
}: {
  code: string;
  headingId?: string;
}) {
  const beast = getArchetypeBeast(code);
  const rarity = getArchetypeRarity(code);
  const letters = lettersFromCode(code);
  const beastLabel = formatBeastDisplayName(beast.beast);

  return (
    <>
      <div className="type-modal-hero" aria-hidden>
        <span className="type-modal-emoji">{beast.emoji}</span>
      </div>
      <p className="archetype-code-label">Your stress type</p>
      <h2
        {...(headingId ? { id: headingId } : {})}
        className="archetype-code-display"
        aria-label={`Stress type ${code}, ${beastLabel}`}
      >
        <span className="archetype-code-letters">{code}</span>
      </h2>
      <p className="archetype-beast-subtitle">{beastLabel}</p>
      <div className="archetype-rarity-row">
        <span
          className="archetype-rarity-badge"
          style={{ borderColor: rarity.color, color: rarity.color }}
        >
          {rarity.symbol} {rarity.label}
        </span>
        <span className="archetype-rarity-flavor">{rarity.flavorLine}</span>
      </div>
      <p className="type-modal-epithet">{beast.epithet}</p>

      <div className="type-modal-profile">
        <p className="type-modal-profile-heading">How this tends to show up</p>
        {beast.holisticProfile.split(/\n\n/).map((para, i) => (
          <p key={`${code}-profile-${i}`} className="type-modal-profile-p">
            {para}
          </p>
        ))}
      </div>

      <div className="archetype-letter-breakdown">
        <p className="archetype-letter-breakdown-title">What each letter means</p>
        <ul className="archetype-letter-rows">
          {DETAIL_AXIS_ORDER.map((axis, i) => {
            const letter = letters[i];
            const t = traitMeta[letter];
            const ax = axisMeta[axis];
            return (
              <li
                key={`${code}-${axis}`}
                className="archetype-letter-card"
                style={{ borderLeftColor: t.color }}
              >
                <div className="archetype-letter-card-top">
                  <span
                    className="archetype-letter-badge-lg"
                    style={{ borderColor: t.color, color: t.color }}
                  >
                    {letter}
                  </span>
                  <div className="archetype-letter-card-meta">
                    <span className="archetype-letter-axis">
                      <span aria-hidden>{AXIS_EMOJI[axis]}</span> {ax.title}
                    </span>
                    <span className="archetype-letter-trait">
                      <span aria-hidden>{t.emoji}</span> {t.name}
                    </span>
                  </div>
                </div>
                <p className="archetype-letter-explainer">{t.detail}</p>
              </li>
            );
          })}
        </ul>
      </div>
    </>
  );
}

function App() {
  const routeInit = useMemo(() => getInitialAppRoute(), []);
  const [activeTab, setActiveTab] = useState<Tab>(() =>
    routeInit.mode === 'type' ? 'types' : routeInit.tab,
  );
  const [screen, setScreen] = useState<QuizScreen>('intro');
  const [index, setIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, Letter>>({});
  const [typesDetailCode, setTypesDetailCode] = useState<string | null>(() =>
    routeInit.mode === 'type' ? routeInit.code : null,
  );
  const [quizResultCode, setQuizResultCode] = useState<string | null>(null);
  const [quizNonce, setQuizNonce] = useState(0);

  const quizDeck = useMemo(
    () => buildQuizDeck(questions),
    [quizNonce, questions],
  );

  const current = quizDeck[index];
  const progress = ((index + 1) / quizDeck.length) * 100;

  const resultCode = screen === 'result' ? quizResultCode : null;

  const canNativeShare =
    typeof navigator !== 'undefined' &&
    typeof navigator.share === 'function';

  const goToTab = useCallback((tab: Tab) => {
    setTypesDetailCode(null);
    setActiveTab(tab);
    window.history.pushState(null, '', buildTabPath(tab));
  }, []);

  const openTypesModal = useCallback((code: string) => {
    setActiveTab('types');
    setTypesDetailCode(code);
    window.history.pushState(null, '', buildTypePath(code));
  }, []);

  const closeTypesModal = useCallback(() => {
    setTypesDetailCode(null);
    window.history.replaceState(null, '', buildTabPath('types'));
  }, []);

  useEffect(() => {
    const onPop = () => {
      const route = parseAppRoute();
      if (route.mode === 'type') {
        setActiveTab('types');
        setTypesDetailCode(route.code);
      } else {
        setTypesDetailCode(null);
        setActiveTab(route.tab);
      }
    };
    window.addEventListener('popstate', onPop);
    return () => window.removeEventListener('popstate', onPop);
  }, []);

  const startQuiz = () => {
    setQuizNonce((n) => n + 1);
    setTypesDetailCode(null);
    setActiveTab('quiz');
    setScreen('quiz');
    setIndex(0);
    setAnswers({});
    setQuizResultCode(null);
    window.history.replaceState(null, '', buildTabPath('quiz'));
  };

  const finishQuiz = (nextAnswers: Record<string, Letter>) => {
    const cognitive = getWinningLetter('cognitive', nextAnswers);
    const emotional = getWinningLetter('emotional', nextAnswers);
    const social = getWinningLetter('social', nextAnswers);
    setQuizResultCode(`${cognitive}${emotional}${social}`);
    setAnswers(nextAnswers);
    setScreen('result');
  };

  const chooseOption = (question: Question, letter: Letter) => {
    const next = { ...answers, [question.id]: letter };
    if (index === quizDeck.length - 1) {
      finishQuiz(next);
      return;
    }
    setAnswers(next);
    setIndex((i) => i + 1);
  };

  const copyShareLink = () => {
    if (!resultCode) return;
    navigator.clipboard
      .writeText(buildTypeShareUrl(resultCode))
      .catch(() => undefined);
  };

  const nativeShare = async () => {
    if (!resultCode || !navigator.share) return;
    const beastName = formatBeastDisplayName(getArchetypeBeast(resultCode).beast);
    const url = buildTypeShareUrl(resultCode);
    try {
      await navigator.share({
        title: `${beastName} (${resultCode}) · Stress Type Quest`,
        text: `I'm a ${beastName} (${resultCode}) on Stress Type Quest.`,
        url,
      });
    } catch {
      /* dismissed or failed */
    }
  };

  useEffect(() => {
    if (!typesDetailCode) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeTypesModal();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [typesDetailCode, closeTypesModal]);

  let typesModal: ReactNode = null;
  if (typesDetailCode) {
    typesModal = (
      <div
        className="type-modal-backdrop"
        role="presentation"
        onClick={closeTypesModal}
      >
        <div
          className="type-modal"
          role="dialog"
          aria-modal="true"
          aria-labelledby="type-modal-title"
          onClick={(e) => e.stopPropagation()}
        >
          <button
            type="button"
            className="type-modal-close"
            onClick={closeTypesModal}
            aria-label="Close"
          >
            ×
          </button>
          <ArchetypeDetailInner
            code={typesDetailCode}
            headingId="type-modal-title"
          />
        </div>
      </div>
    );
  }

  return (
    <div className="page">
      <div
        className={`page-vertical ${
          activeTab === 'types' || activeTab === 'guide'
            ? 'page-vertical--align-top'
            : ''
        }`}
      >
        <div className="page-main-row">
          <div className="app-panel">
            <header className="top-shell">
              <nav className="top-tabs" aria-label="Main navigation">
                <button
                  className={`top-tab ${activeTab === 'quiz' ? 'top-tab--active' : ''}`}
                  onClick={() => goToTab('quiz')}
                >
                  Quiz
                </button>
                <button
                  className={`top-tab ${activeTab === 'types' ? 'top-tab--active' : ''}`}
                  onClick={() => goToTab('types')}
                >
                  Personality Types
                </button>
                <button
                  className={`top-tab ${activeTab === 'guide' ? 'top-tab--active' : ''}`}
                  onClick={() => goToTab('guide')}
                >
                  Letter Key
                </button>
              </nav>
            </header>

            <section className="content-shell">
              {activeTab === 'quiz' && screen === 'intro' && (
                <main className="card intro-card">
                  <p className="pill">Stress Type Quest</p>
                  <h1>Find Your 3-Letter Stress Archetype.</h1>
                  <p className="subtitle">
                    How do you react under different types of pressure?
                  </p>
                  <div className="axis-grid">
                    <article>
                      <h3>🧠 Cognitive</h3>
                      <p className="axis-snippet">
                        Under pressure, are you more think-first or
                        action-first?
                      </p>
                    </article>
                    <article>
                      <h3>⚡ Emotional</h3>
                      <p className="axis-snippet">
                        Feelings get loud — suppress it, show it, or go quiet
                        inside?
                      </p>
                    </article>
                    <article>
                      <h3>🎭 Social</h3>
                      <p className="axis-snippet">
                        People pressure — perform, integrate, or pull away?
                      </p>
                    </article>
                  </div>
                  <button className="btn btn-primary" onClick={startQuiz}>
                    Start
                  </button>
                </main>
              )}

              {activeTab === 'quiz' && screen === 'quiz' && (
                <main className="card quiz-card">
                  <header className="quiz-head">
                    <p className="pill">
                      Question {index + 1} / {quizDeck.length}
                    </p>
                    <div className="progress-wrap">
                      <div
                        className="progress"
                        style={{ width: `${progress}%` }}
                      />
                    </div>
                  </header>

                  <h2>{current.prompt}</h2>
                  <div className="options">
                    {current.options.map((option, oi) => (
                      <button
                        key={`${current.id}-o${oi}`}
                        className="btn option-btn"
                        onClick={() => chooseOption(current, option.letter)}
                      >
                        <span>{option.text}</span>
                      </button>
                    ))}
                  </div>
                </main>
              )}

              {activeTab === 'quiz' && screen === 'result' && resultCode && (
                <main className="card result-card">
                  <p className="pill">Your Result</p>
                  <div className="result-archetype-panel">
                    <ArchetypeDetailInner
                      code={resultCode}
                      headingId="result-archetype-heading"
                    />
                  </div>

                  <div className="result-actions">
                    <button className="btn btn-primary" onClick={startQuiz}>
                      Retake Quiz
                    </button>
                    <button className="btn" onClick={copyShareLink}>
                      Copy link
                    </button>
                    {canNativeShare ? (
                      <button className="btn" onClick={() => void nativeShare()}>
                        Share…
                      </button>
                    ) : null}
                  </div>
                  <p className="result-share-hint">
                    Link opens the same archetype card (Personality Types) for
                    anyone—same code, same animal.
                  </p>
                </main>
              )}

              {activeTab === 'types' && (
                <main className="card types-card">
                  <p className="pill">Personality Types</p>
                  <h2>All 18 Stress Archetypes</h2>
                  <p className="subtitle">
                    Built from Cognitive (T/A), Emotional (S/R/D), and Social
                    (P/I/W). Tap a mascot to read the full stress story—URL
                    updates so you can share it.
                  </p>
                  <p className="type-rarity-legend">
                    Gem rarity:{' '}
                    <span className="type-rarity-chip type-rarity-chip--common">
                      ◈ Common
                    </span>{' '}
                    ·{' '}
                    <span className="type-rarity-chip type-rarity-chip--rare">
                      ◈ Rare
                    </span>{' '}
                    ·{' '}
                    <span className="type-rarity-chip type-rarity-chip--mythic">
                      ◈ Mythic
                    </span>{' '}
                    ·{' '}
                    <span className="type-rarity-chip type-rarity-chip--legendary">
                      ◈ Legendary
                    </span>
                    <span className="type-rarity-note"> (estimated)</span>
                  </p>

                  <section className="type-overview">
                    <div className="type-grid">
                      {(['T', 'A'] as Letter[]).flatMap((c) =>
                        (['S', 'R', 'D'] as Letter[]).flatMap((e) =>
                          (['P', 'I', 'W'] as Letter[]).map((s) => {
                            const code = `${c}${e}${s}`;
                            const beast = getArchetypeBeast(code);
                            const rarity = getArchetypeRarity(code);
                            return (
                              <button
                                key={code}
                                type="button"
                                className="type-card type-card--clickable"
                                onClick={() => openTypesModal(code)}
                              >
                                <span className="type-card-code">{code}</span>
                                <span className="type-card-avatar" aria-hidden>
                                  {beast.emoji}
                                </span>
                                <p className="type-card-beast">
                                  {formatBeastDisplayName(beast.beast)}
                                </p>
                                <span
                                  className="type-card-rarity"
                                  style={{ color: rarity.color }}
                                  title={`Estimated rarity: ${rarity.label}`}
                                  aria-label={`Estimated rarity: ${rarity.label}`}
                                >
                                  {rarity.symbol} {rarity.label}
                                </span>
                              </button>
                            );
                          }),
                        ),
                      )}
                    </div>
                  </section>
                </main>
              )}

              {activeTab === 'guide' && (
                <main className="card guide-card">
                  <p className="pill">Letter Key</p>
                  <h2>{letterKeyPage.headline}</h2>
                  <div className="guide-lede">
                    {letterKeyPage.intro.map((para, i) => (
                      <p key={i} className="guide-intro-p">
                        {para}
                      </p>
                    ))}
                  </div>
                  <blockquote className="guide-quote">
                    <p>{letterKeyPage.quote}</p>
                  </blockquote>
                  {(['cognitive', 'emotional', 'social'] as const).map(
                    (axis) => (
                      <section key={axis} className="guide-axis">
                        <h3 className="guide-axis-title">
                          <span className="guide-axis-emoji" aria-hidden>
                            {AXIS_EMOJI[axis]}
                          </span>
                          {axisMeta[axis].title}
                        </h3>
                        <p className="guide-axis-tagline">
                          {axisMeta[axis].subtitle}
                        </p>
                        <p className="guide-axis-narrative">
                          {letterKeyPage.axisNarrative[axis]}
                        </p>
                        <ul className="guide-letter-list">
                          {axisMeta[axis].letters.map((letter) => {
                            const t = traitMeta[letter];
                            return (
                              <li key={letter} className="guide-letter-item">
                                <span
                                  className="guide-letter-badge"
                                  style={{
                                    borderColor: t.color,
                                    color: t.color,
                                  }}
                                >
                                  {letter}
                                </span>
                                <div className="guide-letter-body">
                                  <p className="guide-letter-name">
                                    <span aria-hidden>{t.emoji}</span> {t.name}
                                  </p>
                                  <p className="guide-letter-blurb">{t.blurb}</p>
                                  <p className="guide-letter-detail">
                                    {t.detail}
                                  </p>
                                </div>
                              </li>
                            );
                          })}
                        </ul>
                      </section>
                    ),
                  )}
                </main>
              )}
            </section>
          </div>
        </div>
      </div>

      {typesModal}
    </div>
  );
}

export default App;
