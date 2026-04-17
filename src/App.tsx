import { useEffect, useMemo, useState, type ReactNode } from 'react';
import {
  axisMeta,
  buildArchetypeSummary,
  formatBeastDisplayName,
  getArchetypeBeast,
  letterKeyPage,
  questions,
  traitMeta,
  type Axis,
  type Letter,
  type Question,
} from './data';

type QuizScreen = 'intro' | 'quiz' | 'result';
type Tab = 'quiz' | 'types' | 'guide';

const AXIS_EMOJI: Record<Axis, string> = {
  cognitive: '🧠',
  emotional: '⚡',
  social: '🎭',
};

function getWinningLetter(axis: Axis, answers: Record<string, Letter>): Letter {
  const tally: Record<Letter, number> = {
    P: 0,
    A: 0,
    H: 0,
    V: 0,
    D: 0,
    R: 0,
    B: 0,
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

function App() {
  const [activeTab, setActiveTab] = useState<Tab>('quiz');
  const [screen, setScreen] = useState<QuizScreen>('intro');
  const [index, setIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, Letter>>({});
  const [typesDetailCode, setTypesDetailCode] = useState<string | null>(null);

  const current = questions[index];
  const progress = ((index + 1) / questions.length) * 100;

  const result = useMemo(() => {
    const cognitive = getWinningLetter('cognitive', answers);
    const emotional = getWinningLetter('emotional', answers);
    const social = getWinningLetter('social', answers);
    const code = `${cognitive}${emotional}${social}`;
    const summary = buildArchetypeSummary(code);
    const beast = getArchetypeBeast(code);
    return {
      code,
      summary,
      beast,
      letters: [cognitive, emotional, social] as Letter[],
    };
  }, [answers]);

  const startQuiz = () => {
    setActiveTab('quiz');
    setScreen('quiz');
    setIndex(0);
    setAnswers({});
  };

  const chooseOption = (question: Question, letter: Letter) => {
    const next = { ...answers, [question.id]: letter };
    setAnswers(next);
    if (index === questions.length - 1) {
      setScreen('result');
      return;
    }
    setIndex((i) => i + 1);
  };

  useEffect(() => {
    if (activeTab !== 'types') setTypesDetailCode(null);
  }, [activeTab]);

  useEffect(() => {
    if (!typesDetailCode) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setTypesDetailCode(null);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [typesDetailCode]);

  let typesModal: ReactNode = null;
  if (typesDetailCode) {
    const summary = buildArchetypeSummary(typesDetailCode);
    const beast = getArchetypeBeast(typesDetailCode);
    typesModal = (
      <div
        className="type-modal-backdrop"
        role="presentation"
        onClick={() => setTypesDetailCode(null)}
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
            onClick={() => setTypesDetailCode(null)}
            aria-label="Close"
          >
            ×
          </button>
          <div className="type-modal-hero" aria-hidden>
            <span className="type-modal-emoji">{beast.emoji}</span>
          </div>
          <p className="type-modal-code">{typesDetailCode}</p>
          <h2 id="type-modal-title" className="type-modal-beast-title">
            {formatBeastDisplayName(beast.beast)}
          </h2>
          <p className="type-modal-epithet">{beast.epithet}</p>
          <p className="type-modal-blurb">{summary.blurb}</p>
          <p className="type-modal-lore">{beast.lore}</p>
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
                onClick={() => setActiveTab('quiz')}
              >
                Quiz
              </button>
              <button
                className={`top-tab ${activeTab === 'types' ? 'top-tab--active' : ''}`}
                onClick={() => setActiveTab('types')}
              >
                Personality Types
              </button>
              <button
                className={`top-tab ${activeTab === 'guide' ? 'top-tab--active' : ''}`}
                onClick={() => setActiveTab('guide')}
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
                Under pressure, are you more plan-first or action-first?
              </p>
            </article>
            <article>
              <h3>⚡ Emotional</h3>
              <p className="axis-snippet">
                Feelings get loud — bottle it, show it, or go quiet inside?
              </p>
            </article>
            <article>
              <h3>🎭 Social</h3>
              <p className="axis-snippet">
                People pressure — do you turn on, blend in, or pull away?
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
                Question {index + 1} / {questions.length}
              </p>
              <div className="progress-wrap">
                <div className="progress" style={{ width: `${progress}%` }} />
              </div>
            </header>

            <h2>{current.prompt}</h2>
            <div className="options">
              {current.options.map((option) => (
                <button
                  key={`${current.id}-${option.letter}`}
                  className="btn option-btn"
                  onClick={() => chooseOption(current, option.letter)}
                >
                  <span>{option.text}</span>
                </button>
              ))}
            </div>
          </main>
        )}

        {activeTab === 'quiz' && screen === 'result' && (
          <main className="card result-card">
          <p className="pill">Your Result</p>
          <h2>
            {result.code} · {formatBeastDisplayName(result.beast.beast)}
          </h2>
          <p className="subtitle">{result.summary.blurb}</p>

          <section className="result-traits">
            {result.letters.map((letter) => (
              <article key={letter} className="trait-block">
                <h3>
                  {traitMeta[letter].emoji} {letter} — {traitMeta[letter].name}
                </h3>
                <p>{traitMeta[letter].blurb}</p>
              </article>
            ))}
          </section>

          <div className="result-actions">
            <button className="btn btn-primary" onClick={startQuiz}>
              Retake Quiz
            </button>
            <button
              className="btn"
              onClick={() => {
                const text = `I got ${result.code} (${formatBeastDisplayName(result.beast.beast)}) on Stress Type Quest`;
                navigator.clipboard.writeText(text).catch(() => undefined);
              }}
            >
              Copy Share Text
            </button>
          </div>
          </main>
        )}

        {activeTab === 'types' && (
          <main className="card types-card">
          <p className="pill">Personality Types</p>
          <h2>All 18 Stress Archetypes</h2>
          <p className="subtitle">
            Built from Cognitive (P/A), Emotional (H/V/D), and Social (R/B/W).
            Tap a mascot to read the full stress story.
          </p>

          <section className="type-overview">
            <div className="type-grid">
              {(['P', 'A'] as Letter[]).flatMap((c) =>
                (['H', 'V', 'D'] as Letter[]).flatMap((e) =>
                  (['R', 'B', 'W'] as Letter[]).map((s) => {
                    const code = `${c}${e}${s}`;
                    const beast = getArchetypeBeast(code);
                    return (
                      <button
                        key={code}
                        type="button"
                        className="type-card type-card--clickable"
                        onClick={() => setTypesDetailCode(code)}
                      >
                        <span className="type-card-code">{code}</span>
                        <span className="type-card-avatar" aria-hidden>
                          {beast.emoji}
                        </span>
                        <p className="type-card-beast">
                          {formatBeastDisplayName(beast.beast)}
                        </p>
                        <p className="type-epithet">{beast.epithet}</p>
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
            {(['cognitive', 'emotional', 'social'] as const).map((axis) => (
              <section key={axis} className="guide-axis">
                <h3 className="guide-axis-title">
                  <span className="guide-axis-emoji" aria-hidden>
                    {AXIS_EMOJI[axis]}
                  </span>
                  {axisMeta[axis].title}
                </h3>
                <p className="guide-axis-tagline">{axisMeta[axis].subtitle}</p>
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
                          style={{ borderColor: t.color, color: t.color }}
                        >
                          {letter}
                        </span>
                        <div className="guide-letter-body">
                          <p className="guide-letter-name">
                            <span aria-hidden>{t.emoji}</span> {t.name}
                          </p>
                          <p className="guide-letter-blurb">{t.blurb}</p>
                          <p className="guide-letter-detail">{t.detail}</p>
                        </div>
                      </li>
                    );
                  })}
                </ul>
              </section>
            ))}
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
