import { useState, useRef, useEffect } from 'react';
import Intro from './components/Intro';
import PolaroidCamera from './components/PolaroidCamera';
import BirthdayLetter from './components/BirthdayLetter';
import BirthdayCandles from './components/BirthdayCandles';
import './App.css';

/* ================================
   SECTION IDs for navigation
   ================================ */
// intro        → landing screen
// camera       → polaroid camera section
// letter       → handwritten note section
// candles      → birthday candles finale

export default function App() {
  // 'intro' | 'experience'
  const [phase, setPhase] = useState('intro');
  const cameraRef = useRef(null);
  const letterRef = useRef(null);
  const candlesRef = useRef(null);

  // When user clicks "OPEN YOUR SURPRISE" on the intro screen
  const handleEnter = () => {
    setPhase('experience');
    // Scroll to top when experience begins
    window.scrollTo({ top: 0, behavior: 'instant' });
  };

  // When all polaroid photos are viewed, smoothly scroll to letter
  const handlePhotosViewed = () => {
    letterRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  // When entering the experience, smoothly scroll camera into view
  useEffect(() => {
    if (phase === 'experience') {
      setTimeout(() => {
        cameraRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 100);
    }
  }, [phase]);

  if (phase === 'intro') {
    return <Intro onEnter={handleEnter} />;
  }

  return (
    <main className="experience">
      {/* Section 1: Polaroid Camera */}
      <div ref={cameraRef}>
        <PolaroidCamera onAllPhotosViewed={handlePhotosViewed} />
      </div>

      {/* Section 2: Birthday Letter */}
      <div ref={letterRef}>
        <BirthdayLetter />
      </div>

      {/* Section 3: Birthday Candles Finale */}
      <div ref={candlesRef}>
        <BirthdayCandles />
      </div>
    </main>
  );
}
