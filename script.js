// ===== EDIT THESE =====
const CONFIG = {
  herName: "Sania",
  yourName: "Caca",
  startDate: "2026-04-02",          // the day you got together (YYYY-MM-DD)
  photos: [                         // put your pictures in a "photos" folder (16:9 looks best)
    "photo1.jpeg",
    "photo5.jpeg",
    "photo3.jpeg",
    "photo4.jpeg",
    "photo2.jpeg",
    "photo6.jpeg"
  ],
  reasons: [
    "Senyummu membuat hariku membaik ☀️",
    "Kamu tertawa dengan jokes garingku 😄",
    "Kamu baik kepada semua orang 🌸",
    "kamu adalah rumah bagiku 🏡",
    "Kamu percaya padaku,selalu 💪",
    "Memelukmu mengobati segalanya 🤗"
  ],
  letter: `Hi Sayang,<br><br>
    Aku membuat ini khusus untukmu, sebagai cara sederhana untuk menunjukkan betapa berartinya dirimu bagiku. Terima kasih sudah hadir dalam hidupku, untuk setiap tawa yang kita bagi, setiap cerita yang kita bicarakan, dan setiap momen sederhana yang terasa istimewa hanya karena ada kamu. Semoga lewat tempat kecil ini, kamu bisa merasakan betapa bahagianya aku memilikimu. ❤️.<br><br>
    Aku sangat beruntung punya kamu. 💕`
};
// ======================

// ---------- page-by-page navigation ----------
const screens = document.querySelectorAll('section.screen');
const dotsEl = document.getElementById('dots');
screens.forEach(() => dotsEl.appendChild(document.createElement('i')));

function go(n){
  screens.forEach((s, i) => s.classList.toggle('active', i === n));
  [...dotsEl.children].forEach((d, i) => d.classList.toggle('on', i === n));
  window.scrollTo(0, 0);
}
go(0);

// ---------- setup ----------
document.getElementById('title').textContent = `Hi, ${CONFIG.herName}!`;
document.getElementById('letter').innerHTML =
  CONFIG.letter + `<div class="signature">— ${CONFIG.yourName} 💗</div>`;

// ---------- floating hearts ----------
const hearts = document.getElementById('hearts');
const emojis = ['💗','💖','💕','🌸','✨','💞'];

function spawn(){
  const el = document.createElement('div');
  el.className = 'float';
  el.textContent = emojis[Math.floor(Math.random()*emojis.length)];
  el.style.left = Math.random()*100 + 'vw';
  el.style.fontSize = (14 + Math.random()*22) + 'px';
  el.style.animationDuration = (6 + Math.random()*7) + 's';
  hearts.appendChild(el);
  setTimeout(() => el.remove(), 14000);
}
setInterval(spawn, 600);

// ---------- burst on click/tap ----------
function burst(x, y, n = 8){
  for(let i=0;i<n;i++){
    const p = document.createElement('div');
    p.className = 'pop';
    p.textContent = emojis[Math.floor(Math.random()*emojis.length)];
    p.style.left = x + 'px'; p.style.top = y + 'px';
    const a = Math.random()*Math.PI*2, r = 60 + Math.random()*90;
    p.style.setProperty('--dx', Math.cos(a)*r + 'px');
    p.style.setProperty('--dy', Math.sin(a)*r + 'px');
    document.body.appendChild(p);
    setTimeout(() => p.remove(), 900);
  }
}
document.addEventListener('click', e => burst(e.clientX, e.clientY, 5));

// ---------- runaway "No" button ----------
const yes = document.getElementById('yes');
const no  = document.getElementById('no');
const msg = document.getElementById('askMsg');
const noLines = ["Apa kamu yakin? 🥺","Coba lagi 😤","Tidak,salah tombol!","plissss? 🥹","Kau tidak bisa menangkapku 😜"];
let tries = 0;
let yesBase = null;

function dodge(e){
  e.preventDefault(); e.stopPropagation();
  tries++;
  msg.textContent = noLines[tries % noLines.length];

  no.style.position = 'fixed';
  no.style.zIndex = '30';
  const pad = 20;
  no.style.left = pad + Math.random()*(innerWidth  - no.offsetWidth  - pad*2) + 'px';
  no.style.top  = pad + Math.random()*(innerHeight - no.offsetHeight - pad*2) + 'px';

  if(!yesBase){
    yesBase = {w: yes.offsetWidth, h: yes.offsetHeight};
    yes.style.position = 'fixed';
    yes.style.left = '50%';
    yes.style.top = '50%';
    yes.style.zIndex = '20';
  }
  const full = Math.max(innerWidth/yesBase.w, innerHeight/yesBase.h) * 1.1;
  const sc = 1 + (full - 1) * Math.min(tries/7, 1);
  yes.style.transform = `translate(-50%,-50%) scale(${sc})`;
}
no.addEventListener('mouseenter', dodge);
no.addEventListener('touchstart', dodge, {passive:false});
no.addEventListener('click', dodge);

yes.addEventListener('click', e => {
  e.stopPropagation();
  no.style.display = 'none';
  yes.style.position = ''; yes.style.left = ''; yes.style.top = '';
  yes.style.zIndex = ''; yes.style.transform = '';
  msg.classList.add('done');
  msg.innerHTML = "Aku tau itu!! I love you more 💖💖💖";
  document.getElementById('askNext').style.display = 'flex';
  const r = yes.getBoundingClientRect();
  for(let i=0;i<6;i++) setTimeout(() => burst(r.left + r.width/2, r.top, 14), i*150);
});

// ---------- together counter ----------
const start = new Date(CONFIG.startDate + 'T00:00:00');
const elD = document.getElementById('d');
const elH = document.getElementById('h');
const elM = document.getElementById('m');
const elS = document.getElementById('s');

function tick(){
  const total = Math.floor(Math.max(0, Date.now() - start.getTime()) / 1000);
  elD.textContent = Math.floor(total/86400);
  elH.textContent = Math.floor(total%86400/3600);
  elM.textContent = Math.floor(total%3600/60);
  elS.textContent = total%60;
}
tick(); setInterval(tick, 1000);

// ---------- flip cards ----------
const cards = document.getElementById('cards');
const cardIcons = ['💝','🌷','🧸','🍓','🎀','🌙'];
CONFIG.reasons.forEach((text, i) => {
  const c = document.createElement('div');
  c.className = 'card';
  c.innerHTML = `<div class="inner">
    <div class="face front">${cardIcons[i % cardIcons.length]}</div>
    <div class="face back">${text}</div></div>`;
  c.addEventListener('click', () => c.classList.toggle('flipped'));
  cards.appendChild(c);
});

// ---------- photo gallery ----------
const gallery = document.getElementById('gallery');
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightboxImg');
const placeholders = ['📷','💑','🌅','🍰','🎀','🌸'];

CONFIG.photos.forEach((src, i) => {
  const box = document.createElement('div');
  box.className = 'photo';
  const img = new Image();
  img.alt = 'Our memory ' + (i + 1);
  img.onload = () => {
    box.appendChild(img);
    box.addEventListener('click', () => {
      lightboxImg.src = src;
      lightbox.classList.add('open');
    });
  };
  img.onerror = () => {               // photo not found yet: show a cute placeholder
    box.classList.add('empty');
    box.textContent = placeholders[i % placeholders.length];
  };
  img.src = src;
  gallery.appendChild(box);
});
lightbox.addEventListener('click', () => lightbox.classList.remove('open'));

// ---------- love letter ----------
const env = document.getElementById('env');
const letter = document.getElementById('letter');
env.addEventListener('click', e => {
  const open = letter.classList.toggle('open');
  env.textContent = open ? '💖' : '💌';
  if(open) for(let i=0;i<5;i++) setTimeout(() => burst(e.clientX, e.clientY, 12), i*120);
});
