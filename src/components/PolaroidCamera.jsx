import { useState, useRef, useCallback } from 'react';
import styles from './PolaroidCamera.module.css';

/* ============================================================
   PHOTO CONFIGURATION
   ============================================================
   ADD YOUR PHOTOS HERE ↓

   1. Put your photo files in the /public/photos/ folder
   2. Name them photo1.jpg, photo2.jpg, photo3.jpg, etc. (or any name you like)
   3. Add them to the array below following the same pattern
   4. Change the "caption" text to something personal for each photo
   5. That's it! No other code changes needed.

   EXAMPLE:
   { src: '/photos/photo1.jpg', caption: 'remember this day??' },
   { src: '/photos/photo2.jpg', caption: 'best trip ever ♡' },

   IMPORTANT: The file path must start with /photos/ and the
   filename must match exactly (including the extension .jpg, .png, etc.)
   ============================================================ */
const photos = [
  // ================================
  // ADD YOUR PHOTOS HERE
  // ================================
  { src: '/photos/photo1.jpg', caption: 'garba night 🎀' },
  { src: '/photos/photo2.jpg', caption: 'diwali ♡' },
  { src: '/photos/photo3.jpg', caption: 'it\'s giving birthday 🎂' },
  { src: '/photos/photo4.jpg', caption: 'need more photos 🌿' },
  // Add more photos here following the same pattern ↑
];

/* ================================
   CAMERA CLICK SOUND
   ================================ */
function playCameraSound() {
  try {
    // Simple synthesized shutter sound using Web Audio API
    const ctx = new (window.AudioContext || window.webkitAudioContext)();
    const buf = ctx.createBuffer(1, ctx.sampleRate * 0.08, ctx.sampleRate);
    const data = buf.getChannelData(0);
    for (let i = 0; i < data.length; i++) {
      data[i] = (Math.random() * 2 - 1) * Math.exp(-i / (ctx.sampleRate * 0.02));
    }
    const source = ctx.createBufferSource();
    source.buffer = buf;
    const gain = ctx.createGain();
    gain.gain.setValueAtTime(0.4, ctx.currentTime);
    source.connect(gain);
    gain.connect(ctx.destination);
    source.start();
  } catch {
    // Sound unavailable — silently skip
  }
}

/* ================================
   INDIVIDUAL POLAROID
   ================================ */
function PolaroidPhoto({ photo, index, isCurrent }) {
  const rotations = [-3, 2, -1.5, 3, -2.5, 1, -3.5, 2.5];
  const rot = rotations[index % rotations.length];

  return (
    <div
      className={`${styles.polaroid} ${isCurrent ? styles.polaroidVisible : ''}`}
      style={{ '--rot': `${rot}deg` }}
      aria-label={`Memory photo: ${photo.caption}`}
    >
      {/* Photo frame */}
      <div className={styles.polaroidPhoto}>
        <img
          src={photo.src}
          alt={photo.caption}
          className={styles.polaroidImg}
          loading="lazy"
          onError={(e) => {
            // Fallback if photo not found
            e.target.style.display = 'none';
            e.target.nextSibling.style.display = 'flex';
          }}
        />
        {/* Placeholder shown when image fails to load */}
        <div className={styles.polaroidPlaceholder} style={{ display: 'none' }}>
          <span>📷</span>
          <span className={styles.placeholderText}>add your photo here!</span>
        </div>
      </div>

      {/* Caption area */}
      <div className={styles.polaroidCaption}>
        <p>{photo.caption}</p>
      </div>

      {/* Tape strip at top */}
      <div className={styles.tape} aria-hidden="true" />
    </div>
  );
}

/* ================================
   MAIN CAMERA COMPONENT
   ================================ */
export default function PolaroidCamera({ onAllPhotosViewed }) {
  const [photoIndex, setPhotoIndex] = useState(-1); // -1 = no photo revealed yet
  const [isShutterOpen, setIsShutterOpen] = useState(false);
  const [flash, setFlash] = useState(false);
  const [allDone, setAllDone] = useState(false);

  const handleCameraClick = useCallback(() => {
    if (allDone) return;

    // Flash effect
    setFlash(true);
    setTimeout(() => setFlash(false), 300);

    // Play shutter sound
    playCameraSound();

    // Shutter animation
    setIsShutterOpen(true);
    setTimeout(() => setIsShutterOpen(false), 400);

    const nextIndex = photoIndex + 1;

    if (nextIndex < photos.length) {
      setPhotoIndex(nextIndex);
    }

    if (nextIndex === photos.length - 1) {
      setAllDone(true);
    }
  }, [photoIndex, allDone]);

  const photosLeft = photos.length - 1 - photoIndex;
  const allViewed = photoIndex >= photos.length - 1;

  return (
    <section className={styles.section} id="camera-section">
      {/* Section header */}
      <div className={styles.header}>
        <div className={styles.headerTag} aria-hidden="true">✦</div>
        <h2 className={styles.headerTitle}>our memories</h2>
        <div className={styles.headerTag} aria-hidden="true">✦</div>
      </div>

      <div className={styles.layout}>
        {/* ========================
            CAMERA
            ======================== */}
        <div className={styles.cameraWrap}>
          {/* Flash overlay */}
          {flash && <div className={styles.flashOverlay} aria-hidden="true" />}

          <div className={`${styles.camera} ${isShutterOpen ? styles.cameraShutter : ''}`}>
            {/* Camera body stickers */}
            <div className={styles.cameraStickerRow} aria-hidden="true">
              <span className={styles.sticker} style={{ background: '#fde68a' }}>★</span>
              <span className={styles.sticker} style={{ background: '#f9a8d4' }}>♡</span>
              <span className={styles.sticker} style={{ background: '#bae6fd' }}>✦</span>
            </div>

            {/* Camera top section */}
            <div className={styles.cameraTop}>
              {/* Viewfinder */}
              <div className={styles.viewfinder}>
                <div className={styles.viewfinderInner} />
              </div>
              {/* Flash unit */}
              <div className={`${styles.flashUnit} ${flash ? styles.flashActive : ''}`}>
                <div className={styles.flashBulb} />
              </div>
            </div>

            {/* Lens */}
            <div className={styles.lensArea}>
              <div className={styles.lensOuter}>
                <div className={styles.lensMiddle}>
                  <div className={styles.lensInner}>
                    <div className={styles.lensCore} />
                    <div className={styles.lensReflect} />
                  </div>
                </div>
              </div>
              {/* Brand label */}
              <div className={styles.brandLabel}>
                <span>polaroid</span>
                <span className={styles.brandStar}>✦</span>
              </div>
            </div>

            {/* Film eject slot */}
            <div className={styles.ejectSlot}>
              <div className={styles.slotLine} />
              <div className={styles.slotLine} />
              <div className={styles.slotLine} />
            </div>

            {/* Camera button */}
            <div className={styles.cameraControls}>
              <button
                id="camera-shutter-btn"
                className={`${styles.shutterBtn} ${allViewed ? styles.shutterBtnDone : ''}`}
                onClick={handleCameraClick}
                disabled={allDone && allViewed}
                aria-label="Click to reveal a memory photo"
              >
                <span className={styles.shutterBtnInner}>
                  {photoIndex < 0
                    ? 'CLICK TO SEE OUR MEMORIES ♡'
                    : allViewed
                      ? 'ALL MEMORIES REVEALED ✦'
                      : `NEXT MEMORY → (${photosLeft} left)`}
                </span>
              </button>
            </div>

            {/* Camera bottom label strip */}
            <div className={styles.cameraBottom}>
              <span>instax ✦ memories</span>
            </div>
          </div>

          {/* Counter display */}
          <div className={styles.filmCounter}>
            <span className={styles.counterLabel}>film</span>
            <div className={styles.counterDots}>
              {photos.map((_, i) => (
                <div
                  key={i}
                  className={`${styles.counterDot} ${i <= photoIndex ? styles.counterDotUsed : ''}`}
                />
              ))}
            </div>
          </div>
        </div>

        {/* ========================
            POLAROID DISPLAY AREA
            ======================== */}
        <div className={styles.photosArea}>
          {photoIndex < 0 && (
            <div className={styles.photosPlaceholder}>
              <div className={styles.placeholderIcon}>📸</div>
              <p className={styles.placeholderHint}>click the camera to<br />reveal our memories ♡</p>
            </div>
          )}

          {photos.map((photo, i) => (
            <PolaroidPhoto
              key={i}
              photo={photo}
              index={i}
              isCurrent={i === photoIndex}
            />
          ))}
        </div>
      </div>

      {/* Transition button — appears after all photos viewed */}
      {allViewed && (
        <div className={styles.transitionArea}>
          <p className={styles.transitionHint}>psst… there's more ♡</p>
          <button
            id="read-letter-btn"
            className={styles.transitionBtn}
            onClick={onAllPhotosViewed}
          >
            <span>read my letter to you →</span>
          </button>
        </div>
      )}
    </section>
  );
}
