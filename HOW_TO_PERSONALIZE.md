# 🎂 HOW TO PERSONALIZE THIS FOR ANUSHKA

> A beginner-friendly guide to making this website completely yours.
> You don't need to be a React expert — just follow the steps!

---

## 1. HOW TO ADD PHOTOS

### Where do photos go?
```
anushka-birthday/
  public/
    photos/          ← PUT YOUR PHOTOS HERE
      photo1.jpg
      photo2.jpg
      photo3.jpg
      photo4.jpg
```

**Steps:**
1. Open the folder: `anushka-birthday/public/photos/`
2. Copy/paste your photo files into this folder
3. You can name them anything (e.g. `us_at_beach.jpg`, `birthday2024.png`)
4. Any image format works: `.jpg`, `.jpeg`, `.png`, `.webp`, `.gif`

---

## 2. HOW TO ADD/REMOVE PHOTOS IN THE CODE

Open the file:
```
anushka-birthday/src/components/PolaroidCamera.jsx
```

At the top of the file, find this section (it's clearly marked with comments):

```js
// ================================
// ADD YOUR PHOTOS HERE
// ================================
const photos = [
  { src: '/photos/photo1.jpg', caption: 'remember this?? 📸' },
  { src: '/photos/photo2.jpg', caption: 'best day ever ♡' },
  { src: '/photos/photo3.jpg', caption: 'us always 🌸' },
  { src: '/photos/photo4.jpg', caption: 'forever faves ✨' },
];
```

**To add a photo:**
```js
{ src: '/photos/YOUR_FILENAME.jpg', caption: 'your caption here' },
```

**To remove a photo:** Delete that whole line (including the comma).

**To change a caption:** Edit the text inside the quotes after `caption:`.

**Example with your own files:**
```js
const photos = [
  { src: '/photos/us_at_cafe.jpg',    caption: 'that one cafe trip !!' },
  { src: '/photos/birthday_last.jpg', caption: 'last year was so fun 🎂' },
  { src: '/photos/trip_2024.png',     caption: 'best trip everrr ♡' },
];
```

> ⚠️ **Important:** The path must start with `/photos/` and the filename must match EXACTLY (including capitalization and file extension).

---

## 3. HOW TO WRITE YOUR BIRTHDAY MESSAGE

Open the file:
```
anushka-birthday/src/components/BirthdayLetter.jsx
```

Find this section near the top:

```js
// ================================
// WRITE YOUR BIRTHDAY MESSAGE HERE
// ================================
const birthdayMessage = `
Dear Anushka,

[Replace this with your heartfelt birthday message!]

[Add as many paragraphs as you like...]
`;
```

**Replace the placeholder text with your own words. Example:**

```js
const birthdayMessage = `
Dear Anushka,

Happy birthday to my absolute favourite person!! I can't believe
another year has gone by — it feels like just yesterday we were...

[continue writing here]

You deserve every single good thing in the world.
`;
```

**Rules for formatting:**
- Press **Enter once** to go to the next line within a paragraph
- Press **Enter twice** (blank line) to start a new paragraph
- Don't delete the backtick (`` ` ``) characters at the start and end

---

## 4. HOW TO CHANGE THE SIGNATURE

In the same file (`BirthdayLetter.jsx`), right below the message, find:

```js
// ================================
// CHANGE YOUR SIGNATURE HERE ↓
// ================================
const signature = `
Love always,
Vaanya ♡
`;
```

Change `Love always,` and `Vaanya ♡` to whatever you like.

---

## 5. HOW TO CHANGE COLOURS

Open the file:
```
anushka-birthday/src/index.css
```

At the very top, find the `:root` block:

```css
:root {
  --pink: #f9a8d4;
  --pink-dark: #ec4899;
  --lavender: #c4b5fd;
  --cream: #fef9f0;
  --baby-blue: #bae6fd;
  --yellow: #fde68a;
  --dark: #2d1b69;
  /* ... etc */
}
```

Change the hex colour values to whatever you want. The changes apply everywhere automatically.

**Tip:** Use a site like [coolors.co](https://coolors.co) or [color-hex.com](https://color-hex.com) to pick colours.

---

## 6. HOW TO CHANGE THE BIRTHDAY TEXT

**To change "HAPPY" or "BIRTHDAY" on the candles page:**

Open:
```
anushka-birthday/src/components/BirthdayCandles.jsx
```

Find this section:

```jsx
{'HAPPY'.split('').map(...)}  // ← change 'HAPPY' to anything
{'BIRTHDAY'.split('').map(...)}  // ← change 'BIRTHDAY' to anything
```

**To change "HAPPY BIRTHDAY, ANUSHKA" on the intro screen:**

Open:
```
anushka-birthday/src/components/Intro.jsx
```

Find the `<h1>` and `<span className={styles.namePill}>` elements and change the text.

---

## 7. HOW TO TEST IT LOCALLY

Open a terminal (PowerShell or Command Prompt), navigate to the project folder, and run:

```bash
cd C:\Users\Vaanya\.gemini\antigravity-ide\scratch\anushka-birthday
npm run dev
```

Then open your browser and go to: **http://localhost:5173**

To stop the server: Press `Ctrl + C` in the terminal.

---

## 8. HOW TO DEPLOY TO VERCEL

### Step 1: Create a GitHub Repository

1. Go to [github.com](https://github.com) and sign in (or create a free account)
2. Click the **"+"** icon → **"New repository"**
3. Name it something like `anushka-birthday`
4. Set it to **Public** (required for free Vercel deploys) or **Private**
5. Click **"Create repository"**

### Step 2: Push Your Project to GitHub

In the terminal, inside your project folder, run these commands one by one:

```bash
cd C:\Users\Vaanya\.gemini\antigravity-ide\scratch\anushka-birthday
git init
git add .
git commit -m "anushka's birthday surprise ♡"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/anushka-birthday.git
git push -u origin main
```

> Replace `YOUR_USERNAME` with your GitHub username.

### Step 3: Deploy on Vercel

1. Go to [vercel.com](https://vercel.com) and sign in with your GitHub account (free)
2. Click **"Add New Project"**
3. Find and select your `anushka-birthday` repository
4. Vercel will auto-detect it's a Vite project
5. Settings to use:
   - **Framework Preset:** Vite
   - **Build Command:** `npm run build`
   - **Output Directory:** `dist`
   - Leave everything else as default
6. Click **"Deploy"**

### Step 4: Get Your URL

After ~1 minute, Vercel gives you a public URL like:
```
https://anushka-birthday-yourusername.vercel.app
```

**That's the link you send to Anushka!** 🎉

### Step 5: Send it to Anushka

Copy the Vercel URL and send it to her however you like — WhatsApp, email, etc.

---

## 9. HOW TO UPDATE THE LIVE WEBSITE AFTER CHANGES

After editing any file (adding photos, updating the letter, etc.):

```bash
git add .
git commit -m "updated photos and letter"
git push
```

Vercel automatically re-deploys within ~30 seconds. The live URL stays the same — no extra steps needed!

---

## QUICK REFERENCE — WHERE IS WHAT?

| What to change | File to open |
|---|---|
| Photos | `public/photos/` (add files) + `src/components/PolaroidCamera.jsx` (update array) |
| Photo captions | `src/components/PolaroidCamera.jsx` → `const photos` array |
| Birthday message | `src/components/BirthdayLetter.jsx` → `const birthdayMessage` |
| Signature | `src/components/BirthdayLetter.jsx` → `const signature` |
| Colours | `src/index.css` → `:root` block |
| Intro text / name | `src/components/Intro.jsx` |
| Candles text | `src/components/BirthdayCandles.jsx` |

---

*Made with ♡ for Anushka*
