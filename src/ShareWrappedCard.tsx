import { forwardRef } from 'react';
import {
  formatBeastDisplayName,
  getArchetypeBeast,
  getArchetypeRarity,
  traitMeta,
  isValidArchetypeCode,
  type Letter,
} from './data';

type Props = { code: string };

type ShareWrappedCardProps = Props & { className?: string };

export const ShareWrappedCard = forwardRef<HTMLDivElement, ShareWrappedCardProps>(
  function ShareWrappedCard({ code, className }, ref) {
    if (!isValidArchetypeCode(code)) return null;

    const beast = getArchetypeBeast(code);
    const rarity = getArchetypeRarity(code);
    const letters = code.split('') as Letter[];
    const beastLabel = formatBeastDisplayName(beast.beast);
    const letterMeaning = letters
      .map((letter) => `${letter}: ${traitMeta[letter].name}`)
      .join(' · ');
    const summary = `${code} · ${beastLabel} · ${rarity.label}`;

    return (
      <section
        className={className ? `share-wrapped ${className}` : 'share-wrapped'}
        aria-label={`Shareable result card: ${summary}`}
      >
        <div className="share-wrapped__card" ref={ref}>
          <div className="share-wrapped__grid">
            <header className="share-wrapped__mast">
              <span className="share-wrapped__brand-title">
                The Slightly Rude Personality Test
              </span>
            </header>

            <div className="share-wrapped__body">
              <section className="share-wrapped__identity">
                <div className="share-wrapped__emoji-ring">
                  <span className="share-wrapped__emoji">{beast.emoji}</span>
                </div>

                <p className="share-wrapped__code-display">{code}</p>
                <p className="share-wrapped__code-meaning">{letterMeaning}</p>

                <h3 className="share-wrapped__beast">{beastLabel}</h3>

                <div className="share-wrapped__rarity">
                  <span
                    className="share-wrapped__rarity-chip"
                    style={{
                      borderColor: rarity.color,
                      color: rarity.color,
                      backgroundColor: `${rarity.color}18`,
                    }}
                  >
                    <span aria-hidden>{rarity.symbol}</span> {rarity.label}
                  </span>
                </div>
              </section>

              <section className="share-wrapped__profile" aria-label="Holistic profile">
                <p className="share-wrapped__profile-kicker">Holistic profile</p>
                <p className="share-wrapped__profile-text">{beast.holisticProfile}</p>
              </section>
            </div>

            <footer className="share-wrapped__footer">
              <span className="share-wrapped__footer-site">
                theslightlyrudepersonalitytest.com
              </span>
            </footer>
          </div>
        </div>
      </section>
    );
  },
);
