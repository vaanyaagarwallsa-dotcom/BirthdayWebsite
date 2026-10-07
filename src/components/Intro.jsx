import { useEffect, useState, useRef } from 'react';
import styles from './Intro.module.css';

/* ================================
   SPARKLE / FLOATING PARTICLES
   ================================ */
const SPARKLE_CHARS = ['✦', '✧', '★', '✩', '♡', '✿', '◆', '⬥', '✺', '✽'];

function Sparkle({ style, char }) {
  return (
    <span className={styles.sparkle} style={style} aria-hidden="true">
      {char}
    </span>
  );
}

function generateSparkles(count) {
  return Array.from({ length: count }, (_, i) => ({
    id: i,
    char: SPARKLE_CHARS[i % SPARKLE_CHARS.length],
    style: {
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 100}%`,
      fontSize: `${Math.random() * 14 + 8}px`,
      animationDelay: `${Math.random() * 3}s`,
      animationDuration: `${Math.random() * 3 + 2}s`,
      color: ['#f9a8d4', '#c4b5fd', '#fde68a', '#bae6fd', '#fb923c'][
        Math.floor(Math.random() * 5)
      ],
      opacity: Math.random() * 0.7 + 0.3,
    },
  }));
}

/* ================================
   CONFETTI
   ================================ */
const CONFETTI_COLORS = ['#f9a8d4', '#c4b5fd', '#fde68a', '#bae6fd', '#86efac', '#fb923c'];

function ConfettiPiece({ style }) {
  return <div className={styles.confetti} style={style} aria-hidden="true" />;
}

function generateConfetti(count) {
  return Array.from({ length: count }, (_, i) => ({
    id: i,
    style: {
      left: `${Math.random() * 100}%`,
      top: `-10px`,
      width: `${Math.random() * 8 + 4}px`,
      height: `${Math.random() * 8 + 4}px`,
      backgroundColor: CONFETTI_COLORS[i % CONFETTI_COLORS.length],
      borderRadius: Math.random() > 0.5 ? '50%' : '2px',
      animationDelay: `${Math.random() * 4}s`,
      animationDuration: `${Math.random() * 3 + 3}s`,
    },
  }));
}

/* ================================
   FLOATING HEARTS
   ================================ */
function FloatingHeart({ style }) {
  return (
    <span className={styles.floatingHeart} style={style} aria-hidden="true">
      ♡
    </span>
  );
}

function generateHearts(count) {
  return Array.from({ length: count }, (_, i) => ({
    id: i,
    style: {
      left: `${Math.random() * 100}%`,
      animationDelay: `${Math.random() * 5}s`,
      animationDuration: `${Math.random() * 4 + 4}s`,
      fontSize: `${Math.random() * 16 + 10}px`,
      color: ['#f9a8d4', '#c4b5fd', '#fb7185'][Math.floor(Math.random() * 3)],
    },
  }));
}

/* ================================
   INTRO COMPONENT
   ================================ */
export default function Intro({ onEnter }) {
  const [sparkles] = useState(() => generateSparkles(28));
  const [confetti] = useState(() => generateConfetti(40));
  const [hearts] = useState(() => generateHearts(12));
  const [visible, setVisible] = useState(false);
  const [btnHovered, setBtnHovered] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 100);
    return () => clearTimeout(t);
  }, []);

  return (
    <section className={styles.intro} id="intro-section">
      {/* Background decorations */}
      <div className={styles.bgPattern} aria-hidden="true" />

      {/* Confetti rain */}
      {confetti.map((c) => (
        <ConfettiPiece key={c.id} style={c.style} />
      ))}

      {/* Floating sparkles */}
      {sparkles.map((s) => (
        <Sparkle key={s.id} char={s.char} style={s.style} />
      ))}

      {/* Floating hearts */}
      {hearts.map((h) => (
        <FloatingHeart key={h.id} style={h.style} />
      ))}

      {/* Corner decorations */}
      <div className={styles.cornerTL} aria-hidden="true">✦ ✧ ✦</div>
      <div className={styles.cornerTR} aria-hidden="true">✦ ✧ ✦</div>
      <div className={styles.cornerBL} aria-hidden="true">✦ ✧ ✦</div>
      <div className={styles.cornerBR} aria-hidden="true">✦ ✧ ✦</div>

      {/* Main card */}
      <div className={`${styles.card} ${visible ? styles.cardVisible : ''}`}>
        {/* Little window title bar */}
        <div className={styles.titleBar}>
          <div className={styles.titleBarDots}>
            <span style={{ backgroundColor: '#fb7185' }} />
            <span style={{ backgroundColor: '#fbbf24' }} />
            <span style={{ backgroundColor: '#86efac' }} />
          </div>
          <span className={styles.titleBarText}>birthday_surprise.exe</span>
          <span />
        </div>

        {/* Card body */}
        <div className={styles.cardBody}>
          {/* Stars row */}
          <p className={styles.starsRow} aria-hidden="true">
            ★ ✦ ★ ✦ ★ ✦ ★
          </p>

          {/* Main heading */}
          <div className={styles.headingWrap}>
            <h1 className={styles.heading}>
              HAPPY
              <br />
              BIRTHDAY,
            </h1>
            <div className={styles.nameWrap}>
              <span className={styles.namePill}>Anushka!</span>
            </div>
          </div>

          {/* Heart row */}
          <p className={styles.heartRow} aria-hidden="true">
            ♡ ♡ ♡ ♡ ♡
          </p>

          {/* Subtext */}
          <p className={styles.subtext}>
            a little something made just for you ✨
          </p>

          {/* Enter button */}
          <button
            id="open-surprise-btn"
            className={`${styles.enterBtn} ${btnHovered ? styles.enterBtnHovered : ''}`}
            onClick={onEnter}
            onMouseEnter={() => setBtnHovered(true)}
            onMouseLeave={() => setBtnHovered(false)}
          >
            <span className={styles.enterBtnInner}>
              OPEN YOUR SURPRISE →
            </span>
          </button>

          {/* Bottom decorations */}
          <p className={styles.bottomDeco} aria-hidden="true">
            ✿ ◆ ✿ ◆ ✿ ◆ ✿
          </p>
        </div>
      </div>

      {/* Floating pixel frames */}
      <div className={styles.pixelFrame1} aria-hidden="true">
        <span>★</span>
      </div>
      <div className={styles.pixelFrame2} aria-hidden="true">
        <span>♡</span>
      </div>
      <div className={styles.pixelFrame3} aria-hidden="true">
        <span>✦</span>
      </div>
    </section>
  );
}
