// Reveal on scroll
  const revealEls = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } });
    }, { threshold: 0.12 });
    revealEls.forEach(el => io.observe(el));
  } else {
    revealEls.forEach(el => el.classList.add('in'));
  }

  // Hero key panel sequence
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const fieldGemini = document.getElementById('field-gemini');
  const fieldYoutube = document.getElementById('field-youtube');
  const statusEl = document.getElementById('keystatus');
  const statusText = document.getElementById('keystatus-text');

  function typeMask(el, len, delay, cb) {
    let i = 0;
    const caret = document.createElement('span');
    caret.className = 'caret';
    if (reduceMotion) {
      el.textContent = '•'.repeat(len);
      if (cb) cb();
      return;
    }
    const timer = setInterval(() => {
      el.textContent = '•'.repeat(i);
      el.appendChild(caret);
      i++;
      if (i > len) {
        clearInterval(timer);
        caret.remove();
        if (cb) cb();
      }
    }, 45);
  }

  window.addEventListener('load', () => {
    const start = reduceMotion ? 0 : 500;
    setTimeout(() => {
      typeMask(fieldGemini, 28, 0, () => {
        setTimeout(() => {
          typeMask(fieldYoutube, 24, 0, () => {
            setTimeout(() => {
              statusEl.classList.add('on');
              statusText.textContent = 'Akses lifetime aktif';
            }, 300);
          });
        }, 250);
      });
    }, start);
  });
