import { useState, useEffect, useRef, useCallback } from 'react';
import styles from './BirthdayCandles.module.css';

/* ============================================================
   HAPPY BIRTHDAY CANDLES — FINAL SECTION
   ============================================================
   This is the celebratory finale.
   - Candles flicker with animated flames
   - User can click a candle to blow it out
   - When all candles are blown, confetti + celebration triggers
   ============================================================ */

/* ================================
   CANDLE DATA
   Each candle has a color and wax stripe color
   ================================ */
const CANDLE_CONFIG = [
  { wax: '#f9a8d4', stripe: '#fbcfe8', flame: '#fde68a' },
  { wax: '#c4b5fd', stripe: '#ddd6fe', flame: '#fbbf24' },
  { wax: '#bae6fd', stripe: '#e0f2fe', flame: '#fde68a' },
  { wax: '#86efac', stripe: '#bbf7d0', flame: '#fbbf24' },
  { wax: '#fde68a', stripe: '#fef9c3', flame: '#fb923c' },
  { wax: '#fb7185', stripe: '#fda4af', flame: '#fde68a' },
  { wax: '#c4b5fd', stripe: '#ddd6fe', flame: '#fbbf24' },
];

/* ================================
   CONFETTI
   ================================ */
const CONFETTI_COLORS = ['#f9a8d4', '#c4b5fd', '#fde68a', '#bae6fd', '#86efac', '#fb923c', '#fb7185'];

function CelebrationConfetti({ count = 60 }) {
  const pieces = Array.from({ length: count }, (_, i) => ({
    id: i,
    style: {
      left: `${Math.random() * 100}%`,
      top: `-${Math.random() * 30}px`,
      width: `${Math.random() * 10 + 5}px`,
      height: `${Math.random() * 10 + 5}px`,
      backgroundColor: CONFETTI_COLORS[i % CONFETTI_COLORS.length],
      borderRadius: Math.random() > 0.5 ? '50%' : '2px',
      animationDelay: `${Math.random() * 3}s`,
      animationDuration: `${Math.random() * 3 + 2}s`,
      transform: `rotate(${Math.random() * 360}deg)`,
    },
  }));

  return (
    <div className={styles.confettiLayer} aria-hidden="true">
      {pieces.map((p) => (
        <div key={p.id} className={styles.confettiPiece} style={p.style} />
      ))}
    </div>
  );
}

/* ================================
   SINGLE CANDLE
   ================================ */
function Candle({ config, index, isBlownOut, onClick }) {
  const flickerDelay = index * 0.15;

  return (
    <button
      className={`${styles.candle} ${isBlownOut ? styles.candleBlownOut : ''}`}
      onClick={onClick}
      aria-label={isBlownOut ? `Candle ${index + 1} blown out` : `Blow out candle ${index + 1}`}
      style={{ '--flicker-delay': `${flickerDelay}s` }}
    >
      {/* Flame */}
      {!isBlownOut && (
        <div className={styles.flameWrap}>
          {/* Sparkles around flame */}
          <div className={styles.flameSpark1} aria-hidden="true" />
          <div className={styles.flameSpark2} aria-hidden="true" />
          {/* Glow */}
          <div className={styles.flameGlow} style={{ background: config.flame }} />
          {/* Outer flame */}
          <div
            className={styles.flameOuter}
            style={{ background: `radial-gradient(ellipse at 50% 80%, ${config.flame}, #fb923c)` }}
          />
          {/* Inner flame */}
          <div className={styles.flameInner} />
        </div>
      )}

      {/* Smoke (after blowout) */}
      {isBlownOut && (
        <div className={styles.smoke} aria-hidden="true">
          <div className={styles.smokePuff} />
          <div className={styles.smokePuff2} />
        </div>
      )}

      {/* Wick */}
      <div className={`${styles.wick} ${isBlownOut ? styles.wickBurnt : ''}`} />

      {/* Wax body */}
      <div
        className={styles.wax}
        style={{ background: config.wax }}
      >
        {/* Stripe */}
        <div className={styles.waxStripe} style={{ background: config.stripe }} />
        <div className={styles.waxStripe2} style={{ background: config.stripe }} />
      </div>

      {/* Base */}
      <div className={styles.candleBase} style={{ background: config.wax }} />
    </button>
  );
}

/* ================================
   BIRTHDAY LETTERS (H-A-P-P-Y etc.)
   ================================ */
function BirthdayLetter({ letter, delay, color }) {
  return (
    <span
      className={styles.birthdayLetter}
      style={{
        animationDelay: `${delay}s`,
        color,
        textShadow: `4px 4px 0 ${color}44, 8px 8px 0 rgba(0,0,0,0.1)`,
      }}
    >
      {letter}
    </span>
  );
}

const HAPPY_COLORS = ['#f9a8d4', '#c4b5fd', '#fde68a', '#bae6fd', '#86efac'];
const BIRTHDAY_COLORS = ['#fb7185', '#c4b5fd', '#fde68a', '#bae6fd', '#fb923c', '#f9a8d4', '#86efac', '#c4b5fd'];

/* ================================
   FLOATING CELEBRATION ELEMENTS
   ================================ */
function CelebrationFloat({ char, style }) {
  return (
    <span className={styles.celebFloat} style={style} aria-hidden="true">
      {char}
    </span>
  );
}

const CELEB_CHARS = ['★', '♡', '✦', '✿', '◆', '✺', '✧', '❋', '★', '♡'];

/* ================================
   MAIN COMPONENT
   ================================ */
export default function BirthdayCandles() {
  const [blownOut, setBlownOut] = useState(Array(CANDLE_CONFIG.length).fill(false));
  const [allBlownOut, setAllBlownOut] = useState(false);
  const [celebrating, setCelebrating] = useState(false);
  const [floaters, setFloaters] = useState([]);
  const [visible, setVisible] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0.5, y: 0.5 });
  const sectionRef = useRef(null);

  // Intersection observer for entrance animation
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setVisible(true);
      },
      { threshold: 0.1 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  // Subtle parallax on mouse move
  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePos({
        x: e.clientX / window.innerWidth,
        y: e.clientY / window.innerHeight,
      });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Generate celebration floaters
  const triggerCelebration = useCallback(() => {
    const items = Array.from({ length: 20 }, (_, i) => ({
      id: i,
      char: CELEB_CHARS[i % CELEB_CHARS.length],
      style: {
        left: `${Math.random() * 90 + 5}%`,
        top: `${Math.random() * 60 + 10}%`,
        fontSize: `${Math.random() * 20 + 16}px`,
        animationDelay: `${Math.random() * 0.8}s`,
        color: CONFETTI_COLORS[i % CONFETTI_COLORS.length],
      },
    }));
    setFloaters(items);
    setCelebrating(true);
  }, []);

  const handleBlowOut = useCallback(
    (index) => {
      if (blownOut[index] || allBlownOut) return;

      const newBlown = [...blownOut];
      newBlown[index] = true;
      setBlownOut(newBlown);

      if (newBlown.every(Boolean)) {
        setAllBlownOut(true);
        setTimeout(triggerCelebration, 400);
      }
    },
    [blownOut, allBlownOut, triggerCelebration]
  );

  const parallaxStyle = {
    '--mx': `${(mousePos.x - 0.5) * 16}px`,
    '--my': `${(mousePos.y - 0.5) * 8}px`,
  };

  const blownCount = blownOut.filter(Boolean).length;
  const remaining = CANDLE_CONFIG.length - blownCount;

  return (
    <section
      className={`${styles.section} ${visible ? styles.sectionVisible : ''} ${celebrating ? styles.celebrating : ''}`}
      ref={sectionRef}
      id="candles-section"
      style={parallaxStyle}
    >
      {/* Celebration confetti */}
      {celebrating && <CelebrationConfetti count={80} />}

      {/* Celebration floaters */}
      {floaters.map((f) => (
        <CelebrationFloat key={f.id} char={f.char} style={f.style} />
      ))}

      {/* Background decorations */}
      <div className={styles.bgCheckerboard} aria-hidden="true" />
      <div className={styles.bgGlow} aria-hidden="true" />

      {/* === "HAPPY" word === */}
      <div className={`${styles.happyRow} ${visible ? styles.rowVisible : ''}`}>
        {'HAPPY'.split('').map((letter, i) => (
          <BirthdayLetter
            key={i}
            letter={letter}
            delay={i * 0.08}
            color={HAPPY_COLORS[i % HAPPY_COLORS.length]}
          />
        ))}
      </div>

      {/* === CANDLES ROW === */}
      <div className={`${styles.candlesRow} ${visible ? styles.rowVisible : ''}`}
           style={{ animationDelay: '0.3s' }}>
        {CANDLE_CONFIG.map((config, i) => (
          <Candle
            key={i}
            config={config}
            index={i}
            isBlownOut={blownOut[i]}
            onClick={() => handleBlowOut(i)}
          />
        ))}
      </div>

      {/* === "BIRTHDAY" word === */}
      <div className={`${styles.birthdayRow} ${visible ? styles.rowVisible : ''}`}
           style={{ animationDelay: '0.15s' }}>
        {'BIRTHDAY'.split('').map((letter, i) => (
          <BirthdayLetter
            key={i}
            letter={letter}
            delay={i * 0.06 + 0.2}
            color={BIRTHDAY_COLORS[i % BIRTHDAY_COLORS.length]}
          />
        ))}
      </div>

      {/* === WISH PROMPT / CELEBRATION === */}
      <div className={`${styles.wishArea} ${visible ? styles.rowVisible : ''}`}
           style={{ animationDelay: '0.5s' }}>
        {!allBlownOut ? (
          <div className={styles.wishPrompt}>
            <div className={styles.wishIcon}>🕯️</div>
            <p className={styles.wishText}>
              {blownCount === 0
                ? 'make a wish ♡ click the candles to blow them out!'
                : remaining === 1
                ? `one candle left! ✦`
                : `${remaining} candles left! keep going ✨`}
            </p>
          </div>
        ) : (
          <div className={styles.celebration}>
            <div className={styles.yayText}>
              {'✨ YAY ✨'.split('').map((c, i) => (
                <span
                  key={i}
                  className={styles.yayLetter}
                  style={{ animationDelay: `${i * 0.05}s` }}
                >
                  {c}
                </span>
              ))}
            </div>
            <p className={styles.celebText}>
              wish granted!! 🎉
            </p>
            <p className={styles.celebSubtext}>
              happy birthday, Anushka ♡
              <br />
              hope all your wishes come true today and always
            </p>
            <div className={styles.celebHearts} aria-hidden="true">
              ♡ ♡ ♡ ♡ ♡
            </div>
          </div>
        )}
      </div>

      {/* Bottom decorative strip */}
      <div className={styles.bottomStrip} aria-hidden="true">
        <div className={styles.bottomStripInner}>
          {'★ ♡ ✦ ★ ♡ ✦ ★ ♡ ✦ ★ ♡ ✦ ★ ♡ ✦ ★ ♡ ✦ ★ ♡'.split(' ').map((c, i) => (
            <span key={i} style={{ color: CONFETTI_COLORS[i % CONFETTI_COLORS.length] }}>
              {c}{' '}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
