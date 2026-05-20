(function(){

const SITE_URL = window.location.origin + window.location.pathname;
const HANDLE = '@shama_thakur77';

const audioCtx = (() => {
  try { return new (window.AudioContext || window.webkitAudioContext)(); }
  catch(e) { return null; }
})();

function tap(freq = 800, dur = 0.07, vol = 0.05, type = 'sine') {
  if (!audioCtx) return;
  try {
    if (audioCtx.state === 'suspended') audioCtx.resume();
    const o = audioCtx.createOscillator();
    const g = audioCtx.createGain();
    o.type = type;
    o.frequency.setValueAtTime(freq, audioCtx.currentTime);
    o.frequency.exponentialRampToValueAtTime(freq * 0.5, audioCtx.currentTime + dur);
    g.gain.setValueAtTime(0, audioCtx.currentTime);
    g.gain.linearRampToValueAtTime(vol, audioCtx.currentTime + 0.005);
    g.gain.exponentialRampToValueAtTime(0.0001, audioCtx.currentTime + dur);
    o.connect(g).connect(audioCtx.destination);
    o.start();
    o.stop(audioCtx.currentTime + dur);
  } catch(e) {}
}

function chime() {
  [880, 1108, 1318, 1760].forEach((f, i) => setTimeout(() => tap(f, 0.3, 0.045, 'sine'), i * 80));
}

function softPop() {
  tap(600 + Math.random() * 300, 0.05, 0.03, 'sine');
}

function buzz(ms = 12) {
  if (navigator.vibrate) navigator.vibrate(ms);
}

const COVER_ART = `<svg viewBox="0 0 220 220" xmlns="http://www.w3.org/2000/svg" class="float">
  <defs>
    <radialGradient id="cg1" cx="50%" cy="50%">
      <stop offset="0%" stop-color="#fff8f0" stop-opacity="0.95"/>
      <stop offset="100%" stop-color="#f5d4c5" stop-opacity="0.4"/>
    </radialGradient>
    <linearGradient id="cg2" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#c9a84c"/>
      <stop offset="100%" stop-color="#b85c38"/>
    </linearGradient>
    <linearGradient id="cg3" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="#d88aa0"/>
      <stop offset="100%" stop-color="#b85c38"/>
    </linearGradient>
  </defs>

  <g class="spin-slow" transform="translate(110 110)">
    <circle cx="0" cy="0" r="92" fill="none" stroke="#c9a84c" stroke-width="0.5" stroke-dasharray="1 6" opacity="0.6"/>
    <circle cx="0" cy="0" r="78" fill="none" stroke="#b85c38" stroke-width="0.4" stroke-dasharray="2 8" opacity="0.5"/>
  </g>

  <circle cx="110" cy="110" r="72" fill="url(#cg1)"/>
  <circle cx="110" cy="110" r="60" fill="none" stroke="#c9a84c" stroke-width="0.6" opacity="0.5"/>
  <circle cx="110" cy="110" r="48" fill="none" stroke="#b85c38" stroke-width="0.5" opacity="0.45"/>

  <g transform="translate(110 110)">
    <path d="M0 -52 L15 -15 L52 0 L15 15 L0 52 L-15 15 L-52 0 L-15 -15 Z" fill="url(#cg2)" opacity="0.92"/>
    <path d="M0 -38 L11 -11 L38 0 L11 11 L0 38 L-11 11 L-38 0 L-11 -11 Z" fill="url(#cg3)" opacity="0.7"/>
    <circle cx="0" cy="0" r="14" fill="#fff8f0"/>
    <circle cx="0" cy="0" r="8" fill="url(#cg2)"/>
    <circle cx="0" cy="0" r="3" fill="#fff8f0"/>
  </g>

  <g opacity="0.85">
    <circle cx="38" cy="60" r="4" fill="#d88aa0"/>
    <circle cx="32" cy="56" r="1.5" fill="#fff" opacity="0.8"/>
  </g>
  <g opacity="0.85">
    <circle cx="180" cy="55" r="3.5" fill="#c9a84c"/>
    <circle cx="175" cy="51" r="1.2" fill="#fff" opacity="0.8"/>
  </g>
  <g opacity="0.75">
    <circle cx="175" cy="170" r="4.5" fill="#b85c38"/>
    <circle cx="169" cy="165" r="1.5" fill="#fff" opacity="0.8"/>
  </g>
  <g opacity="0.85">
    <circle cx="42" cy="172" r="3" fill="#d88aa0"/>
    <circle cx="38" cy="168" r="1" fill="#fff" opacity="0.8"/>
  </g>
  <circle cx="110" cy="22" r="2" fill="#c9a84c" opacity="0.7"/>
  <circle cx="110" cy="198" r="2" fill="#c9a84c" opacity="0.7"/>
  <circle cx="22" cy="110" r="2" fill="#c9a84c" opacity="0.7"/>
  <circle cx="198" cy="110" r="2" fill="#c9a84c" opacity="0.7"/>

  <g opacity="0.4">
    <circle cx="70" cy="40" r="1" fill="#c9a84c"/>
    <circle cx="155" cy="35" r="0.8" fill="#c9a84c"/>
    <circle cx="190" cy="100" r="1" fill="#c9a84c"/>
    <circle cx="190" cy="135" r="0.8" fill="#c9a84c"/>
    <circle cx="155" cy="185" r="1" fill="#c9a84c"/>
    <circle cx="70" cy="190" r="0.8" fill="#c9a84c"/>
    <circle cx="30" cy="135" r="1" fill="#c9a84c"/>
    <circle cx="30" cy="100" r="0.8" fill="#c9a84c"/>
  </g>
</svg>`;

const QUESTIONS = [
  {
    art: `<svg viewBox="0 0 80 80" xmlns="http://www.w3.org/2000/svg">
      <defs><linearGradient id="q1g" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stop-color="#fce5d4"/><stop offset="100%" stop-color="#f5d4c5"/></linearGradient></defs>
      <circle cx="40" cy="40" r="36" fill="url(#q1g)" opacity="0.9"/>
      <circle cx="40" cy="40" r="28" fill="none" stroke="#c9a84c" stroke-width="0.6" stroke-dasharray="2 3"/>
      <g transform="translate(40 40)">
        <path d="M-3 -18 L0 -3 L3 -18 Z" fill="#b85c38"/>
        <circle cx="0" cy="0" r="4" fill="#c9a84c"/>
        <circle cx="0" cy="0" r="1.5" fill="#fff8f0"/>
      </g>
      <circle cx="22" cy="22" r="1.5" fill="#d88aa0"/>
      <circle cx="58" cy="22" r="1.2" fill="#c9a84c"/>
      <circle cx="58" cy="58" r="1.5" fill="#d88aa0"/>
      <circle cx="22" cy="58" r="1.2" fill="#c9a84c"/>
    </svg>`,
    q: 'saturday morning. nobody needs anything. what <em>actually</em> sounds good?',
    opts: [
      { t: 'deep diving a topic and writing my thoughts down', tag: 'writer' },
      { t: 'building something on my laptop just to see if it works', tag: 'builder' },
      { t: 'voice noting ideas while walking, editing later', tag: 'creator' },
      { t: 'organizing my notes, files, life into clean systems', tag: 'systems' },
      { t: 'researching something until i fully get it', tag: 'analyst' }
    ]
  },
  {
    art: `<svg viewBox="0 0 80 80" xmlns="http://www.w3.org/2000/svg">
      <defs><linearGradient id="q2g" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stop-color="#c9a84c"/><stop offset="100%" stop-color="#b85c38"/></linearGradient></defs>
      <rect x="14" y="22" width="52" height="36" rx="8" fill="#fce5d4" stroke="#c9a84c" stroke-width="0.8"/>
      <circle cx="40" cy="40" r="10" fill="url(#q2g)"/>
      <circle cx="40" cy="40" r="6" fill="#2a1810"/>
      <circle cx="42" cy="38" r="2" fill="#fff8f0" opacity="0.9"/>
      <rect x="34" y="16" width="12" height="6" rx="2" fill="#c9a84c"/>
      <circle cx="58" cy="28" r="1.2" fill="#b85c38"/>
    </svg>`,
    q: 'your <em>relationship</em> with being on camera, honestly?',
    opts: [
      { t: 'no thanks. words on a screen, please', tag: 'writer' },
      { t: 'only if the substance is strong', tag: 'analyst' },
      { t: 'love it. i light up talking to a lens', tag: 'creator' },
      { t: 'voice yes, face sometimes, depends on the day', tag: 'creator' },
      { t: 'rather build the thing than be the face', tag: 'builder' }
    ]
  },
  {
    art: `<svg viewBox="0 0 80 80" xmlns="http://www.w3.org/2000/svg">
      <defs><linearGradient id="q3g" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stop-color="#fce5d4"/><stop offset="100%" stop-color="#f5d4c5"/></linearGradient></defs>
      <circle cx="40" cy="40" r="30" fill="url(#q3g)"/>
      <circle cx="40" cy="40" r="30" fill="none" stroke="#c9a84c" stroke-width="1"/>
      <circle cx="40" cy="40" r="22" fill="none" stroke="#c9a84c" stroke-width="0.4" stroke-dasharray="1 3"/>
      <path d="M40 18 L40 40 L54 48" stroke="#b85c38" stroke-width="2.5" fill="none" stroke-linecap="round"/>
      <circle cx="40" cy="40" r="3" fill="#b85c38"/>
      <circle cx="40" cy="16" r="1.5" fill="#c9a84c"/>
      <circle cx="64" cy="40" r="1.5" fill="#c9a84c"/>
      <circle cx="40" cy="64" r="1.5" fill="#c9a84c"/>
      <circle cx="16" cy="40" r="1.5" fill="#c9a84c"/>
    </svg>`,
    q: 'honest <em>energy budget</em> per week for this?',
    opts: [
      { t: '2-4 hours, scattered between life and chaos', tag: 'systems' },
      { t: '5-8 hours, late nights when the house is quiet', tag: 'writer' },
      { t: '10+ hours, i\'m obsessed and i\'ll find time', tag: 'builder' },
      { t: 'depends on the week, my energy is wave-like', tag: 'creator' },
      { t: 'i want passive. set it up once, let it run', tag: 'analyst' }
    ]
  },
  {
    art: `<svg viewBox="0 0 80 80" xmlns="http://www.w3.org/2000/svg">
      <defs><linearGradient id="q4g" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stop-color="#d88aa0"/><stop offset="100%" stop-color="#b85c38"/></linearGradient></defs>
      <circle cx="40" cy="40" r="36" fill="#fce5d4" opacity="0.6"/>
      <circle cx="28" cy="32" r="10" fill="url(#q4g)"/>
      <circle cx="52" cy="32" r="10" fill="#c9a84c"/>
      <circle cx="26" cy="30" r="2.5" fill="#fff8f0" opacity="0.8"/>
      <circle cx="50" cy="30" r="2.5" fill="#fff8f0" opacity="0.8"/>
      <path d="M18 54 Q28 48 40 54 T62 54" stroke="#b85c38" stroke-width="2.5" fill="none" stroke-linecap="round"/>
      <circle cx="40" cy="56" r="1.5" fill="#d88aa0"/>
    </svg>`,
    q: 'what do friends <em>actually</em> come to you for?',
    opts: [
      { t: 'explaining complicated things so they click', tag: 'writer' },
      { t: 'telling them what their data really means', tag: 'analyst' },
      { t: 'a vibe, a rec, a what-should-i-buy answer', tag: 'creator' },
      { t: 'fixing or building the broken/missing thing', tag: 'builder' },
      { t: 'a template, a system, a way to stop chaos', tag: 'systems' }
    ]
  },
  {
    art: `<svg viewBox="0 0 80 80" xmlns="http://www.w3.org/2000/svg">
      <defs><linearGradient id="q5g" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stop-color="#c9a84c"/><stop offset="100%" stop-color="#b85c38"/></linearGradient></defs>
      <circle cx="40" cy="40" r="30" fill="url(#q5g)" opacity="0.15"/>
      <circle cx="40" cy="40" r="30" fill="none" stroke="#c9a84c" stroke-width="1"/>
      <circle cx="40" cy="40" r="22" fill="none" stroke="#c9a84c" stroke-width="0.5" stroke-dasharray="2 3"/>
      <text x="40" y="50" text-anchor="middle" font-family="Cormorant Garamond" font-size="28" font-style="italic" fill="#b85c38" font-weight="500">€</text>
      <circle cx="40" cy="14" r="1.8" fill="#c9a84c"/>
      <circle cx="64" cy="32" r="1.5" fill="#d88aa0"/>
      <circle cx="58" cy="60" r="1.8" fill="#c9a84c"/>
      <circle cx="22" cy="60" r="1.5" fill="#d88aa0"/>
      <circle cx="16" cy="32" r="1.8" fill="#c9a84c"/>
    </svg>`,
    q: 'money goal in the next <em>6 months</em>. gut answer:',
    opts: [
      { t: 'extra €500-1000/month, steady, on the side', tag: 'systems' },
      { t: '€2-5k/month from something i actually enjoy', tag: 'creator' },
      { t: 'one €5k+ launch from a product i built', tag: 'builder' },
      { t: 'audience first, money follows when ready', tag: 'writer' },
      { t: 'high-ticket clients, 2-3, that pay well', tag: 'analyst' }
    ]
  }
];

const ARCHETYPES = {
  writer: {
    art: `<svg viewBox="0 0 130 130" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="aw1" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stop-color="#c9a84c"/><stop offset="100%" stop-color="#b85c38"/></linearGradient>
        <linearGradient id="aw2" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stop-color="#fff8f0"/><stop offset="100%" stop-color="#fce5d4"/></linearGradient>
      </defs>
      <circle cx="65" cy="65" r="58" fill="#fce5d4" opacity="0.5"/>
      <circle cx="65" cy="65" r="48" fill="none" stroke="#c9a84c" stroke-width="0.5" stroke-dasharray="2 4"/>
      <rect x="40" y="34" width="48" height="60" rx="3" fill="url(#aw2)" stroke="#c9a84c" stroke-width="0.8"/>
      <line x1="48" y1="48" x2="80" y2="48" stroke="#c9a84c" stroke-width="0.8" opacity="0.7"/>
      <line x1="48" y1="56" x2="76" y2="56" stroke="#c9a84c" stroke-width="0.8" opacity="0.7"/>
      <line x1="48" y1="64" x2="80" y2="64" stroke="#c9a84c" stroke-width="0.8" opacity="0.7"/>
      <line x1="48" y1="72" x2="74" y2="72" stroke="#c9a84c" stroke-width="0.8" opacity="0.7"/>
      <line x1="48" y1="80" x2="78" y2="80" stroke="#c9a84c" stroke-width="0.8" opacity="0.7"/>
      <path d="M84 26 L96 38 L72 62 L60 62 L60 50 Z" fill="url(#aw1)"/>
      <path d="M84 26 L96 38 L90 32 Z" fill="#2a1810" opacity="0.3"/>
      <circle cx="105" cy="22" r="2.5" fill="#d88aa0"/>
      <circle cx="25" cy="100" r="2" fill="#c9a84c"/>
    </svg>`,
    name: 'the quiet <em>authority</em>',
    tag: 'you build trust with words, not volume.',
    why: 'your brain processes through writing. you don\'t need a face or a feed, you need a body of work that compounds. one essay, indexed and ranked, can pay for years.',
    hustle: 'long-form newsletter or paid substack on a niche only you understand',
    stack: 'substack + claude for outlines + notion for research + 1 weekly post',
    step: 'tonight: pick one topic you could write 50 posts about. publish post #1 on substack. 800 words. ship it ugly.',
    money: '€500-5k/month within 12 months. slow start, steep curve.'
  },
  builder: {
    art: `<svg viewBox="0 0 130 130" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="ab1" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stop-color="#c9a84c"/><stop offset="100%" stop-color="#b85c38"/></linearGradient>
      </defs>
      <circle cx="65" cy="65" r="58" fill="#fce5d4" opacity="0.5"/>
      <circle cx="65" cy="65" r="48" fill="none" stroke="#c9a84c" stroke-width="0.5" stroke-dasharray="2 4"/>
      <rect x="30" y="44" width="70" height="46" rx="6" fill="url(#ab1)"/>
      <rect x="30" y="44" width="70" height="10" rx="6" fill="#2a1810"/>
      <circle cx="38" cy="49" r="1.8" fill="#d88aa0"/>
      <circle cx="46" cy="49" r="1.8" fill="#c9a84c"/>
      <circle cx="54" cy="49" r="1.8" fill="#fff8f0"/>
      <rect x="40" y="62" width="50" height="2.5" rx="1" fill="#fff8f0" opacity="0.7"/>
      <rect x="40" y="69" width="36" height="2.5" rx="1" fill="#fff8f0" opacity="0.5"/>
      <rect x="40" y="76" width="44" height="2.5" rx="1" fill="#fff8f0" opacity="0.7"/>
      <rect x="40" y="83" width="28" height="2.5" rx="1" fill="#fff8f0" opacity="0.5"/>
      <circle cx="108" cy="32" r="3" fill="#d88aa0"/>
      <circle cx="22" cy="98" r="2.5" fill="#c9a84c"/>
    </svg>`,
    name: 'the quiet <em>engineer</em>',
    tag: 'you make tools other people pay to use.',
    why: 'you\'d rather build than promote. AI lets one builder do what used to take a team. one small useful tool, on the right platform, can earn while you sleep.',
    hustle: 'micro AI tools, GPT wrappers, or notion templates on gumroad',
    stack: 'claude / cursor + vercel + gumroad + 1 reddit/twitter post per ship',
    step: 'tonight: list 5 annoying tasks friends complain about. pick the one you can build in a weekend. that\'s your first product.',
    money: '€1-10k/month within 6 months if you ship monthly.'
  },
  creator: {
    art: `<svg viewBox="0 0 130 130" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="ac1" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stop-color="#d88aa0"/><stop offset="100%" stop-color="#b85c38"/></linearGradient>
      </defs>
      <circle cx="65" cy="65" r="58" fill="#fce5d4" opacity="0.5"/>
      <circle cx="65" cy="65" r="48" fill="none" stroke="#c9a84c" stroke-width="0.5" stroke-dasharray="2 4"/>
      <ellipse cx="65" cy="56" rx="18" ry="20" fill="url(#ac1)"/>
      <path d="M40 86 Q65 72 90 86 L90 102 Q65 94 40 102 Z" fill="url(#ac1)"/>
      <ellipse cx="65" cy="56" rx="18" ry="20" fill="none" stroke="#c9a84c" stroke-width="0.8"/>
      <g transform="translate(65 40)">
        <circle cx="0" cy="-2" r="3.5" fill="#c9a84c"/>
        <path d="M-1.5 0 L0 8 L1.5 0 Z" fill="#c9a84c"/>
      </g>
      <circle cx="58" cy="54" r="1.8" fill="#fff8f0"/>
      <circle cx="72" cy="54" r="1.8" fill="#fff8f0"/>
      <path d="M58 64 Q65 68 72 64" stroke="#fff8f0" stroke-width="1.5" fill="none" stroke-linecap="round"/>
      <circle cx="108" cy="28" r="2.5" fill="#c9a84c"/>
      <circle cx="20" cy="100" r="2" fill="#d88aa0"/>
    </svg>`,
    name: 'the frequency <em>carrier</em>',
    tag: 'people buy because they feel you, not because you sell.',
    why: 'your nervous system reads rooms. on camera or audio, you transmit what the algorithm rewards and clients pay for. AI is your editor, not your replacement.',
    hustle: 'short-form (tiktok / IG / yt shorts) → digital products + 1:1 offers',
    stack: 'capcut + claude for hooks + stan/beacons link + 1 product on gumroad',
    step: 'tonight: record 3 talking-head videos on the ONE thing you know more about than 90% of people. post the best tomorrow.',
    money: '€2-15k/month within 9 months. nonlinear, then it spikes.'
  },
  systems: {
    art: `<svg viewBox="0 0 130 130" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="as1" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stop-color="#c9a84c"/><stop offset="100%" stop-color="#b85c38"/></linearGradient>
      </defs>
      <circle cx="65" cy="65" r="58" fill="#fce5d4" opacity="0.5"/>
      <circle cx="65" cy="65" r="48" fill="none" stroke="#c9a84c" stroke-width="0.5" stroke-dasharray="2 4"/>
      <rect x="34" y="38" width="20" height="20" rx="3" fill="url(#as1)"/>
      <rect x="58" y="38" width="20" height="20" rx="3" fill="#fff8f0" stroke="#c9a84c" stroke-width="0.8"/>
      <rect x="82" y="38" width="18" height="20" rx="3" fill="#fff8f0" stroke="#c9a84c" stroke-width="0.8"/>
      <rect x="34" y="62" width="20" height="18" rx="3" fill="#fff8f0" stroke="#c9a84c" stroke-width="0.8"/>
      <rect x="58" y="62" width="20" height="18" rx="3" fill="url(#as1)"/>
      <rect x="82" y="62" width="18" height="18" rx="3" fill="#fff8f0" stroke="#c9a84c" stroke-width="0.8"/>
      <rect x="34" y="84" width="20" height="14" rx="3" fill="#fff8f0" stroke="#c9a84c" stroke-width="0.8"/>
      <rect x="58" y="84" width="20" height="14" rx="3" fill="#fff8f0" stroke="#c9a84c" stroke-width="0.8"/>
      <rect x="82" y="84" width="18" height="14" rx="3" fill="url(#as1)"/>
      <circle cx="44" cy="48" r="1.5" fill="#fff8f0" opacity="0.8"/>
      <circle cx="68" cy="71" r="1.5" fill="#fff8f0" opacity="0.8"/>
      <circle cx="91" cy="91" r="1.5" fill="#fff8f0" opacity="0.8"/>
      <circle cx="108" cy="24" r="2.5" fill="#d88aa0"/>
      <circle cx="22" cy="108" r="2" fill="#c9a84c"/>
    </svg>`,
    name: 'the calm <em>architect</em>',
    tag: 'you sell order to people drowning in chaos.',
    why: 'you see patterns others miss. you\'d rather build a clean system once than hustle every day. perfect for parents, full-time workers, anyone with a real life.',
    hustle: 'notion templates, AI workflow packs, or done-for-you automations',
    stack: 'notion + zapier/make + gumroad + pinterest as the free traffic engine',
    step: 'tonight: open notion. build the system you wish you had 2 years ago. that\'s your first product. list it on gumroad this week.',
    money: '€300-3k/month, mostly passive, within 4-6 months.'
  },
  analyst: {
    art: `<svg viewBox="0 0 130 130" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="aa1" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stop-color="#c9a84c"/><stop offset="100%" stop-color="#b85c38"/></linearGradient>
      </defs>
      <circle cx="65" cy="65" r="58" fill="#fce5d4" opacity="0.5"/>
      <circle cx="65" cy="65" r="48" fill="none" stroke="#c9a84c" stroke-width="0.5" stroke-dasharray="2 4"/>
      <rect x="32" y="80" width="14" height="20" rx="2" fill="#fff8f0" stroke="#c9a84c" stroke-width="0.8"/>
      <rect x="50" y="66" width="14" height="34" rx="2" fill="url(#aa1)"/>
      <rect x="68" y="54" width="14" height="46" rx="2" fill="#fff8f0" stroke="#c9a84c" stroke-width="0.8"/>
      <rect x="86" y="38" width="14" height="62" rx="2" fill="url(#aa1)"/>
      <path d="M39 76 L57 62 L75 50 L93 34" stroke="#b85c38" stroke-width="2" fill="none" stroke-linecap="round"/>
      <circle cx="39" cy="76" r="2.5" fill="#b85c38"/>
      <circle cx="57" cy="62" r="2.5" fill="#b85c38"/>
      <circle cx="75" cy="50" r="2.5" fill="#b85c38"/>
      <circle cx="93" cy="34" r="3.5" fill="#b85c38"/>
      <circle cx="93" cy="34" r="1.5" fill="#fff8f0"/>
      <circle cx="20" cy="28" r="2.5" fill="#d88aa0"/>
      <circle cx="108" cy="108" r="2" fill="#c9a84c"/>
    </svg>`,
    name: 'the pattern <em>reader</em>',
    tag: 'you charge for the answer, not the hours.',
    why: 'your value is interpretation. AI collects data, only you say what to do with it. 2-3 high-ticket clients beat 100 low-ticket customers every time.',
    hustle: 'AI-powered audits or 1:1 strategy calls in your domain',
    stack: 'claude + your expertise + cal.com + stripe + 1 linkedin post weekly',
    step: 'tonight: post on linkedin: "3 things i\'d audit in your [niche] in 30 min." offer 3 free. the second batch is paid.',
    money: '€1-8k/month within 3 months. fewer clients, more depth.'
  }
};

let step = 0;
const tally = {};
const screen = document.getElementById('screen');
const toast = document.getElementById('toast');

function showToast(msg) {
  toast.textContent = msg;
  toast.classList.add('show');
  setTimeout(() => toast.classList.remove('show'), 2000);
}

function renderCover() {
  screen.innerHTML = `
    <div class="cover fade-in">
      <div class="brand">frequency<span class="brand-dot"></span>studio</div>
      <div class="cover-art">${COVER_ART}</div>
      <h1>which AI side hustle<br><em>fits your brain?</em></h1>
      <p class="intro">five questions. one archetype. one specific thing you can do tonight to start.</p>
      <p class="meta">60 seconds <span>·</span> no email needed</p>
      <button class="start-btn" id="startBtn">
        begin the quiz <span class="arrow">→</span>
      </button>
      <div class="proof">
        <span class="proof-stars">★★★★★</span>
        <span>made for women using AI to build income + manifest</span>
      </div>
    </div>
  `;
  document.getElementById('startBtn').onclick = () => {
    tap(1000, 0.1, 0.06);
    buzz(15);
    step = 0;
    Object.keys(tally).forEach(k => delete tally[k]);
    setTimeout(renderQ, 100);
  };
}

function renderQ() {
  const q = QUESTIONS[step];
  let progHtml = '';
  for (let i = 0; i < 5; i++) {
    const cls = i < step ? 'done' : (i === step ? 'current' : '');
    progHtml += `<span class="${cls}"></span>`;
  }
  let optsHtml = '';
  q.opts.forEach((o, i) => {
    optsHtml += `<button class="opt" data-tag="${o.tag}" data-i="${i}"><span class="opt-dot"></span><span class="opt-text">${o.t}</span></button>`;
  });
  screen.innerHTML = `
    <div class="progress">
      <div class="progress-track">${progHtml}</div>
      <div class="progress-label">question <b>${step + 1}</b> of 5</div>
    </div>
    <div class="q-screen fade-in">
      <div class="q-art">${q.art}</div>
      <p class="q-text">${q.q}</p>
      ${optsHtml}
    </div>
  `;
  window.scrollTo({ top: 0, behavior: 'smooth' });
  screen.querySelectorAll('.opt').forEach((b) => {
    const i = parseInt(b.dataset.i);
    b.addEventListener('mouseenter', () => softPop());
    b.onclick = () => {
      tap(600 + i * 90, 0.09, 0.055);
      buzz(10);
      const tag = b.dataset.tag;
      tally[tag] = (tally[tag] || 0) + 1;
      step++;
      if (step < QUESTIONS.length) {
        setTimeout(renderQ, 220);
      } else {
        setTimeout(() => { chime(); buzz([20, 40, 20]); renderResult(); }, 280);
      }
    };
  });
}

function renderResult() {
  const winner = Object.keys(tally).reduce((a, b) => tally[a] >= tally[b] ? a : b);
  const r = ARCHETYPES[winner];
  const date = new Date().toLocaleDateString('en-GB', { day:'2-digit', month:'short', year:'numeric' });
  const cleanName = r.name.replace(/<\/?em>/g, '');

  const caption = `i just found out i'm "${cleanName}"\n\n${r.tag}\n\nmy AI side hustle: ${r.hustle}\nfirst step: ${r.step.replace('tonight: ', '')}\n\ntake the quiz → ${SITE_URL}\n\nbuilt by ${HANDLE}\n\n#aiside hustle #womeninai #manifestation #datawitch #aibusiness #aiforwomen`;

  screen.innerHTML = `
    <div class="result fade-in">
      <div class="brand">your <span class="brand-dot"></span> archetype</div>
      <div class="result-card">
        <div class="r-archetype-art">${r.art}</div>
        <div class="r-label">you are</div>
        <h2 class="r-name">${r.name}</h2>
        <p class="r-tag">${r.tag}</p>
        <p class="r-why">${r.why}</p>

        <div class="r-row">
          <div class="r-icon"><svg viewBox="0 0 24 24" fill="none" stroke="#b85c38" stroke-width="1.8" stroke-linecap="round"><path d="M3 12 L9 6 L15 12 L21 6"/><path d="M3 18 L9 12 L15 18 L21 12"/></svg></div>
          <div class="r-rcontent">
            <div class="r-rlabel">the hustle</div>
            <div class="r-rtext">${r.hustle}</div>
          </div>
        </div>
        <div class="r-row">
          <div class="r-icon"><svg viewBox="0 0 24 24" fill="none" stroke="#b85c38" stroke-width="1.8"><rect x="4" y="4" width="6" height="6" rx="1"/><rect x="14" y="4" width="6" height="6" rx="1"/><rect x="4" y="14" width="6" height="6" rx="1"/><rect x="14" y="14" width="6" height="6" rx="1"/></svg></div>
          <div class="r-rcontent">
            <div class="r-rlabel">your stack</div>
            <div class="r-rtext">${r.stack}</div>
          </div>
        </div>
        <div class="r-row">
          <div class="r-icon"><svg viewBox="0 0 24 24" fill="none" stroke="#b85c38" stroke-width="1.8" stroke-linecap="round"><path d="M12 3 L12 21"/><path d="M7 8 Q12 4 17 8"/><path d="M17 16 Q12 20 7 16"/></svg></div>
          <div class="r-rcontent">
            <div class="r-rlabel">realistic income window</div>
            <div class="r-rtext">${r.money}</div>
          </div>
        </div>

        <div class="r-step">
          <div class="r-steplabel">your one next step</div>
          <div class="r-steptext">${r.step}</div>
        </div>

        <div class="r-foot">
          <span class="gold">frequency studio</span>
          <span>${date}</span>
          <span class="handle">${HANDLE}</span>
        </div>
      </div>

      <div class="actions">
        <button class="action-btn" id="restartBtn">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M3 12 A9 9 0 1 0 6 5.3"/><path d="M3 5 L3 11 L9 11"/></svg>
          retake
        </button>
        <button class="action-btn primary" id="copyBtn">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="8" y="8" width="12" height="12" rx="2"/><path d="M4 16 L4 4 L16 4"/></svg>
          copy caption
        </button>
      </div>

      <div class="share-grid">
        <button class="share-btn" id="shareNative">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"><path d="M12 3 L12 15"/><path d="M7 8 L12 3 L17 8"/><path d="M5 15 L5 19 Q5 21 7 21 L17 21 Q19 21 19 19 L19 15"/></svg>
          <span>share</span>
        </button>
        <a class="share-btn" target="_blank" rel="noopener" id="shareTwitter">
          <svg viewBox="0 0 24 24" fill="currentColor"><path d="M18 3 L14 9 L21 18 L17 18 L11 11 L6 18 L3 18 L9 10 L3 3 L7 3 L12 9 L17 3 Z"/></svg>
          <span>x/twitter</span>
        </a>
        <a class="share-btn" target="_blank" rel="noopener" id="shareWhatsapp">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round"><path d="M4 20 L5.5 16 Q4 13.5 4 11 A8 8 0 1 1 8 18 Z"/></svg>
          <span>whatsapp</span>
        </a>
        <a class="share-btn" href="https://ko-fi.com/shamathakur" target="_blank" rel="noopener">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"><path d="M5 8 L18 8 Q21 8 21 11 Q21 14 18 14 L17 14"/><path d="M5 8 L5 16 Q5 18 7 18 L15 18 Q17 18 17 16 L17 8"/><path d="M8 5 L8 6"/><path d="M11 5 L11 6"/><path d="M14 5 L14 6"/></svg>
          <span>tip jar</span>
        </a>
      </div>

      <div class="caption-box">
        <div class="caption-label">share caption · auto filled</div>
        <div>${caption.replace(/\n/g, '<br>')}</div>
      </div>
    </div>
  `;

  document.getElementById('restartBtn').onclick = () => {
    tap(800, 0.1, 0.05);
    buzz(15);
    renderCover();
  };

  document.getElementById('copyBtn').onclick = () => {
    navigator.clipboard.writeText(caption).then(() => {
      chime();
      buzz([15, 30, 15]);
      showToast('copied · ready to post');
    }).catch(() => showToast('copy failed, try again'));
  };

  document.getElementById('shareNative').onclick = async () => {
    tap(900, 0.1, 0.05);
    buzz(15);
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'AI side hustle match',
          text: `i'm "${cleanName}" · ${r.tag} take the quiz:`,
          url: SITE_URL
        });
      } catch(e) {}
    } else {
      navigator.clipboard.writeText(SITE_URL);
      showToast('link copied');
    }
  };

  const tw = `i'm "${cleanName}" · ${r.tag}\n\ntake the AI side hustle quiz: ${SITE_URL}`;
  document.getElementById('shareTwitter').href = `https://twitter.com/intent/tweet?text=${encodeURIComponent(tw)}`;
  document.getElementById('shareWhatsapp').href = `https://wa.me/?text=${encodeURIComponent(tw)}`;
}

renderCover();

document.addEventListener('click', () => {
  if (audioCtx && audioCtx.state === 'suspended') audioCtx.resume();
}, { once: true });

})();
