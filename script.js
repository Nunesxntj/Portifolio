const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
const loader = document.querySelector('.loader');
const count = document.querySelector('.loader-count');
const line = document.querySelector('.loader-line i');
let value = 0;
const finishLoader = () => { loader?.classList.add('done'); document.body.classList.add('ready'); };
if (reduced) finishLoader(); else {
  const timer = setInterval(() => {
    value += Math.ceil((100 - value) / 7);
    if (value > 100) value = 100;
    if (count) count.textContent = String(value).padStart(3, '0');
    if (line) line.style.width = `${value}%`;
    if (value === 100) { clearInterval(timer); setTimeout(finishLoader, 260); }
  }, 32);
}

const progress = document.querySelector('.scroll-progress');
addEventListener('scroll', () => {
  const max = document.documentElement.scrollHeight - innerHeight;
  if (progress) progress.style.transform = `scaleX(${max ? scrollY / max : 0})`;
}, { passive: true });

const observer = new IntersectionObserver(entries => entries.forEach(entry => {
  if (entry.isIntersecting) { entry.target.classList.add('is-visible'); observer.unobserve(entry.target); }
}), { threshold: .14 });
document.querySelectorAll('.reveal,.reveal-line,.case-study').forEach(el => observer.observe(el));

document.querySelectorAll('.magnetic').forEach(el => {
  el.addEventListener('pointermove', e => { const r=el.getBoundingClientRect(); el.style.transform=`translate(${(e.clientX-r.left-r.width/2)*.12}px,${(e.clientY-r.top-r.height/2)*.12}px)`; });
  el.addEventListener('pointerleave', () => el.style.transform='');
});

const stage = document.querySelector('.mode-stage');
document.querySelectorAll('.mode-switch button').forEach(btn => btn.addEventListener('click', () => {
  document.querySelectorAll('.mode-switch button').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
  stage?.setAttribute('data-active-mode', btn.dataset.mode || 'design');
}));
