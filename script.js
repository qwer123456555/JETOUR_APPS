
// Mobile nav toggle
const nav = document.querySelector('.nav');
const navToggle = document.getElementById('navToggle');
const links = document.querySelector('.nav-links');
navToggle?.addEventListener('click', ()=> nav.classList.toggle('open'));

// Reveal on scroll
const revealEls = document.querySelectorAll('.reveal');
const io = new IntersectionObserver((entries)=>{
  entries.forEach(e=>{
    if(e.isIntersecting){ e.target.classList.add('in'); io.unobserve(e.target); }
  });
},{ threshold: .2 });
revealEls.forEach(el=> io.observe(el));

// Accordions for models
document.querySelectorAll('[data-accordion]').forEach(btn=>{
  btn.addEventListener('click', ()=>{
    const model = btn.closest('.model');
    model.classList.toggle('open');
  });
});

// Lightbox for gallery
const gallery = document.querySelector('#gallery .gallery');
if(gallery){
  const overlay = document.createElement('div');
  overlay.style.cssText = 'position:fixed;inset:0;background:rgba(0,0,0,.85);display:none;align-items:center;justify-content:center;z-index:60;padding:20px';
  const img = document.createElement('img');
  img.style.cssText = 'max-width:92vw;max-height:84vh;border-radius:16px;border:1px solid rgba(255,255,255,.15)';
  overlay.appendChild(img);
  overlay.addEventListener('click', ()=> overlay.style.display='none');
  document.body.appendChild(overlay);

  gallery.querySelectorAll('a').forEach(a=>{
    a.addEventListener('click', (e)=>{
      e.preventDefault();
      img.src = a.href;
      overlay.style.display = 'flex';
    });
  });
}

// Parallax tilt on hero media
const parallax = document.querySelector('.parallax img');
if(parallax){
  window.addEventListener('mousemove', (e)=>{
    const { innerWidth:w, innerHeight:h } = window;
    const rx = (e.clientX / w - .5) * 6;
    const ry = (e.clientY / h - .5) * -6;
    parallax.style.transform = `scale(1.05) rotateX(${ry}deg) rotateY(${rx}deg)`;
  });
  window.addEventListener('mouseleave', ()=> parallax.style.transform = 'scale(1.03)');
}

// To top button
const toTop = document.getElementById('toTop');
window.addEventListener('scroll', ()=>{
  if(window.scrollY > 600) toTop.classList.add('show'); else toTop.classList.remove('show');
});
toTop?.addEventListener('click', ()=> window.scrollTo({ top:0, behavior:'smooth' }));
