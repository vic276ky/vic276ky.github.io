/* ============================================================
   VIGNESH R — SECURITY PORTFOLIO
   Behavior layer
   ============================================================ */

document.addEventListener('DOMContentLoaded', () => {
  initPasswordGate();
  // initBootSequence();
  initMatrix();
  initTyping();
  initScrollReveal();
  // initGlitchPulse();
  markActiveNavLink();
  initThemeToggle();
});

function initPasswordGate() {
  const gate = document.getElementById('password-gate');
  if (!gate) { initBootSequence(); return; }

  // already unlocked earlier this session — skip straight to boot sequence
  if (sessionStorage.getItem('vr_authed')) {
    gate.remove();
    initBootSequence();
    return;
  }

  const ACCESS_KEY = 'letmein'; // change this to whatever key you want
  const input = document.getElementById('gate-input');
  const error = document.getElementById('gate-error');
  const inner = gate.querySelector('.gate-inner');

  input.focus();

  input.addEventListener('keydown', (e) => {
    if (e.key !== 'Enter') return;
    const value = input.value.trim().toLowerCase();

    if (value === ACCESS_KEY) {
      gate.classList.add('gate-hidden');
      sessionStorage.setItem('vr_authed', '1');
      setTimeout(() => {
        gate.remove();
        initBootSequence();
      }, 500);
    } else {
      error.textContent = 'ACCESS DENIED — invalid key';
      inner.classList.add('shake');
      input.value = '';
      setTimeout(() => inner.classList.remove('shake'), 350);
    }
  });
}

/* ---------------- Boot sequence (plays once per browser session) ---------------- */

function initBootSequence() {
  const overlay = document.getElementById('boot-overlay');
  if (!overlay) return;

  if (sessionStorage.getItem('vr_booted')) {
  overlay.remove();
  initThemeModal();
  return;
}

  const lines = [
    'establishing secure session...',
    'verifying user ... <span class="ok">OK</span>',
    'loading modules: about, skills, projects ...',
	'mounting /portfolio ...'
  ];

overlay.innerHTML = '<div class="boot-inner"></div>';
const inner = overlay.querySelector('.boot-inner');
let delay = 1000;

lines.forEach((line, i) => {
  const div = document.createElement('div');
  div.className = 'boot-line';
  div.style.animationDelay = delay + 'ms';
  div.innerHTML = (i === lines.length - 1 ? '<span class="glyph">&gt;</span> ' : '$ ') + line;
  inner.appendChild(div);   // was: overlay.appendChild(div)
  delay += 1250;
});

const cursor = document.createElement('span');
cursor.className = 'boot-cursor';
inner.lastChild.appendChild(cursor);   // was: overlay.lastChild

setTimeout(() => {
  overlay.classList.add('boot-hidden');
  sessionStorage.setItem('vr_booted', '1');
  setTimeout(() => {
    overlay.remove();
    initThemeModal();
  }, 600);
}, delay + 1200);   // longer pause on "ACCESS GRANTED" before fading out
}
/* ---------------- Matrix rain background ---------------- */

function initMatrix() {
  const canvas = document.getElementById('matrix');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');

  function resize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }
  resize();

  const chars = '01<>[]{}/\\;:ABCDEF';
  const fontSize = 14;
  let columns = Math.floor(canvas.width / fontSize);
  let drops = Array(columns).fill(1);

  function draw() {
    ctx.fillStyle = 'rgba(7, 8, 10, 0.06)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = '#00ff9c';
    ctx.font = fontSize + 'px monospace';
    drops.forEach((y, i) => {
      const char = chars[Math.floor(Math.random() * chars.length)];
      ctx.fillText(char, i * fontSize, y * fontSize);
      if (y * fontSize > canvas.height && Math.random() > 0.978) {
        drops[i] = 0;
      }
      drops[i]++;
    });
  }

  const interval = setInterval(draw, 45);

  window.addEventListener('resize', () => {
    resize();
    columns = Math.floor(canvas.width / fontSize);
    drops = Array(columns).fill(1);
  });
}

/* ---------------- Typing effect for header tagline ---------------- */

function initTyping() {
  const el = document.querySelector('.typing');
  if (!el) return;
  const text = el.dataset.text || 'Cybersecurity Enthusiast | Engineer';
  el.textContent = '';
  let i = 0;

  function type() {
    if (i <= text.length) {
      el.textContent = text.slice(0, i);
      i++;
      setTimeout(type, 45);
    } else {
      el.classList.add('typing-done');
    }
  }
  type();
}

/* ---------------- Scroll-triggered section reveal ---------------- */

function initScrollReveal() {
  const sections = document.querySelectorAll('section');
  if (!('IntersectionObserver' in window)) {
    sections.forEach(s => s.classList.add('visible'));
    return;
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15, rootMargin: '0px 0px -60px 0px' });

  sections.forEach(section => observer.observe(section));
}

// /* ---------------- Occasional glitch pulse on the name ---------------- */

// function initGlitchPulse() {
  // const name = document.querySelector('h1');
  // if (!name) return;

  // function pulse() {
    // name.classList.add('glitching');
    // setTimeout(() => name.classList.remove('glitching'), 280);
    // setTimeout(pulse, 6000 + Math.random() * 6000);
  // }
  // setTimeout(pulse, 4000);
// }

/* ---------------- Highlight current page in nav ---------------- */

function markActiveNavLink() {
  const path = window.location.pathname.replace(/\/$/, '') || '/home';
  document.querySelectorAll('nav a').forEach(a => {
    const href = a.getAttribute('href');
    if (href && href.replace(/\/$/, '') === path) {
      a.classList.add('active');
    }
  });
}

// theme toggle switch

function initThemeToggle() {
  const isLightNow = document.documentElement.getAttribute('data-theme') === 'light';
  document.querySelectorAll('.theme-switch input').forEach(inp => {
    inp.checked = isLightNow;
  });

  function applyTheme(isLight, persist) {
    if (isLight) {
      document.documentElement.setAttribute('data-theme', 'light');
    } else {
      document.documentElement.removeAttribute('data-theme');
    }
    document.querySelectorAll('.theme-switch input').forEach(inp => {
      inp.checked = isLight;
    });
    if (persist) {
      localStorage.setItem('vr_theme', isLight ? 'light' : 'dark');
    }
  }

  window.__vrApplyTheme = applyTheme;

  const corner = document.getElementById('theme-switch-input');
  if (corner) {
    corner.addEventListener('change', () => applyTheme(corner.checked, true));
  }
}

function initThemeModal() {
  const modal = document.getElementById('theme-modal');
  if (!modal || localStorage.getItem('vr_theme')) return; // only ever shown once, browser-wide

  const modalInput = document.getElementById('theme-modal-input');
  const status = document.getElementById('theme-modal-status');
  const okBtn = document.getElementById('theme-modal-ok');

  function updateStatus() {
    status.textContent = modalInput.checked
      ? 'WHITE HAT MODE — LIGHT'
      : 'BLACK HAT MODE — DARK';
  }

  modalInput.addEventListener('change', () => {
    window.__vrApplyTheme(modalInput.checked, false); // live preview only
    updateStatus();
  });

  okBtn.addEventListener('click', () => {
    window.__vrApplyTheme(modalInput.checked, true); // now save it
    modal.classList.remove('modal-visible');
    setTimeout(() => modal.remove(), 400);
  });

  updateStatus();
  modal.classList.add('modal-visible');
}