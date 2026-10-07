import { useEffect, useState } from 'react';
import styles from './BirthdayLetter.module.css';

/* ============================================================
   BIRTHDAY LETTER
   ============================================================
   WRITE YOUR MESSAGE BELOW ↓

   Instructions:
   1. Find the "birthdayMessage" variable below
   2. Replace the placeholder text between the backticks (`)
   3. Each line break in the text becomes a new line in the letter
   4. Press Enter to add a new line/paragraph
   5. To change the signature, edit "Love," and "Vaanya ♡" at the bottom
   6. DO NOT delete the backticks (`) at the start and end

   TIP: To add a blank line between paragraphs, just press Enter twice.
   ============================================================ */

// ================================
// WRITE YOUR BIRTHDAY MESSAGE HERE
// ================================
const birthdayMessage = `Dear Anushka,

It's the people you meet on the first day of college that are IT for you. And from the moment I met you, you were IT for me. 

I dont want this sounding too cheezy but I have treasured every single moment with you. I'm the most honest with you, i love judging people with you, i love blindly leading you on lol. 

But yeah, come over for food and tea sessions more often. and yes most important. WE NEED MORE PHOTOS
`;

// ================================
// CHANGE YOUR SIGNATURE HERE ↓
// ================================
const signature = `Love always,
Vaanya ♡`;

/* ================================
   DOODLES AROUND THE NOTE
   ================================ */
const DOODLES = ['✿', '★', '♡', '✦', '◆', '✧', '✺', '✽', '◇', '❋'];

function NoteDoodle({ char, style }) {
  return (
    <span className={styles.doodle} style={style} aria-hidden="true">
      {char}
    </span>
  );
}

function generateDoodles() {
  return [
    { char: '✿', style: { top: '-18px', left: '12px', color: 'var(--pink-dark)', fontSize: '18px' } },
    { char: '★', style: { top: '-14px', left: '52px', color: 'var(--yellow)', fontSize: '14px' } },
    { char: '♡', style: { top: '-16px', right: '20px', color: 'var(--pink-dark)', fontSize: '16px' } },
    { char: '✦', style: { top: '-12px', right: '60px', color: 'var(--lavender)', fontSize: '12px' } },
    { char: '✿', style: { bottom: '-16px', left: '30px', color: 'var(--lavender)', fontSize: '16px' } },
    { char: '★', style: { bottom: '-14px', right: '40px', color: 'var(--pink)', fontSize: '14px' } },
    { char: '◆', style: { top: '30%', left: '-18px', color: 'var(--baby-blue-dark)', fontSize: '13px' } },
    { char: '✧', style: { top: '60%', right: '-14px', color: 'var(--lavender)', fontSize: '14px' } },
    { char: '✺', style: { bottom: '25%', left: '-16px', color: 'var(--yellow)', fontSize: '12px' } },
    { char: '♡', style: { top: '20%', right: '-16px', color: 'var(--pink)', fontSize: '15px' } },
  ];
}

/* ================================
   LETTER LINES PARSER
   Converts plain text to React elements with proper line breaks
   ================================ */
function parseMessage(text) {
  const paragraphs = text.trim().split(/\n\n+/);
  return paragraphs.map((para, pIdx) => {
    const lines = para.split('\n');
    return (
      <p key={pIdx} className={styles.letterParagraph}>
        {lines.map((line, lIdx) => (
          <span key={lIdx}>
            {line}
            {lIdx < lines.length - 1 && <br />}
          </span>
        ))}
      </p>
    );
  });
}

function parseSignature(text) {
  const lines = text.trim().split('\n');
  return lines.map((line, i) => (
    <span key={i}>
      {line}
      {i < lines.length - 1 && <br />}
    </span>
  ));
}

/* ================================
   TRANSITION / SPARKLES
   ================================ */
function TransitionSparkle({ style }) {
  return (
    <span className={styles.transSparkle} style={style} aria-hidden="true">
      ✦
    </span>
  );
}

const transSparkles = Array.from({ length: 12 }, (_, i) => ({
  id: i,
  style: {
    left: `${Math.random() * 100}%`,
    top: `${Math.random() * 100}%`,
    fontSize: `${Math.random() * 10 + 8}px`,
    animationDelay: `${Math.random() * 2}s`,
    color: ['#f9a8d4', '#c4b5fd', '#fde68a'][i % 3],
  },
}));

/* ================================
   MAIN LETTER COMPONENT
   ================================ */
export default function BirthdayLetter() {
  const [visible, setVisible] = useState(false);
  const doodles = generateDoodles();

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
        }
      },
      { threshold: 0.15 }
    );
    const el = document.getElementById('letter-section');
    if (el) observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section className={styles.section} id="letter-section">
      {/* Transition sparkles */}
      {transSparkles.map((s) => (
        <TransitionSparkle key={s.id} style={s.style} />
      ))}

      {/* Section header */}
      <div className={styles.header}>
        <div className={styles.headerLine} />
        <div className={styles.headerTag}>
          <span>✉</span>
          <span className={styles.headerTitle}>a note for you</span>
          <span>✉</span>
        </div>
        <div className={styles.headerLine} />
      </div>

      {/* Letter card wrapper */}
      <div className={`${styles.letterWrap} ${visible ? styles.letterVisible : ''}`}>
        {/* Tape strips */}
        <div className={`${styles.tape} ${styles.tape1}`} aria-hidden="true" />
        <div className={`${styles.tape} ${styles.tape2}`} aria-hidden="true" />

        {/* Floating doodles */}
        {doodles.map((d, i) => (
          <NoteDoodle key={i} char={d.char} style={d.style} />
        ))}

        {/* Paper note */}
        <div className={styles.paper}>
          {/* Ruled lines effect */}
          <div className={styles.ruledLines} aria-hidden="true" />

          {/* Letter content */}
          <div className={styles.letterContent}>
            {/* Date sticker */}
            <div className={styles.dateStickerRow}>
              <div className={styles.dateSticker}>
                <span className={styles.dateStickerIcon}>📅</span>
                <span className={styles.dateStickerText}>07.10.2026</span>
              </div>
            </div>

            {/* Letter body */}
            <div className={styles.letterBody}>
              {parseMessage(birthdayMessage)}
            </div>

            {/* Signature */}
            <div className={styles.signatureWrap}>
              <div className={styles.signatureLine} aria-hidden="true" />
              <p className={styles.signature}>
                {parseSignature(signature)}
              </p>
              <div className={styles.signatureHeart} aria-hidden="true">♡</div>
            </div>
          </div>
        </div>

        {/* Little sticker on paper */}
        <div className={styles.starSticker} aria-hidden="true">
          <span>★</span>
        </div>
      </div>

      {/* Decorative bottom */}
      <div className={styles.bottomDeco} aria-hidden="true">
        <span>✦ ✧ ✦ ✧ ✦</span>
      </div>
    </section>
  );
}
