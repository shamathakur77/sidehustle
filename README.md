# which AI side hustle fits your brain?

60-second quiz. 5 questions. find your AI side hustle archetype + one specific thing to do tonight.

Built by [@shama_thakur77](https://www.instagram.com/shama_thakur77) for women using AI to build income + manifest.

---

## Live demo

Deploy this in 60 seconds with either Vercel or GitHub Pages. Instructions below.

## What's inside

- `index.html` — single page, no build step
- `style.css` — all the pretty
- `app.js` — quiz logic, ASMR sound, haptics, sharing

That's it. No framework, no build, no npm install. Pure HTML/CSS/JS.

## Deploy to Vercel (easiest, 30 seconds)

**Option A · drag and drop**
1. Go to [vercel.com/new](https://vercel.com/new)
2. Drag this whole folder into the upload area
3. Click deploy
4. Done. You get a free `*.vercel.app` URL

**Option B · GitHub + Vercel (recommended for updates)**
1. Push this folder to a new GitHub repo (instructions below)
2. Go to [vercel.com/new](https://vercel.com/new)
3. Click "Import Git Repository" → pick your repo
4. Click deploy. Vercel auto-redeploys on every push.

## Push to GitHub

```bash
cd ai-side-hustle-match
git init
git add .
git commit -m "ai side hustle quiz · v1"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/ai-side-hustle-match.git
git push -u origin main
```

Replace `YOUR_USERNAME` with your GitHub username.

## Deploy to GitHub Pages (free, no Vercel needed)

1. Push to GitHub (above)
2. Go to your repo → Settings → Pages
3. Source: deploy from branch → main → / (root) → save
4. Wait 2 minutes. URL appears at top of Pages settings.

## Customize

**Change handle and links** → open `app.js`, top of file:
```js
const HANDLE = '@shama_thakur77';
```

**Change footer socials** → open `index.html`, search for `foot-links`. Replace URLs with yours.

**Change archetypes, questions, or colors** → all in `app.js` (QUESTIONS, ARCHETYPES) and `style.css` (`:root` variables at top).

## OG image for previews

The site references `og.png` for link previews. To make one:
1. Take a screenshot of the cover screen at 1200×630
2. Save as `og.png` in this folder
3. Push to redeploy

(Or skip it — quiz works fine without.)

## License

MIT. Use it, fork it, remix it. A tag back is appreciated but not required.

---

made with care by [shama](https://www.instagram.com/shama_thakur77) · [ko-fi](https://ko-fi.com/shamathakur)
