
// Mobile nav (simple)
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    const id = a.getAttribute('href').slice(1);
    const el = document.getElementById(id);
    if(el){
      e.preventDefault();
      window.scrollTo({top: el.offsetTop-70, behavior:'smooth'});
    }
  });
});

// Accordion open/close
document.querySelectorAll('.model').forEach(model => {
  const head = model.querySelector('.model-head');
  head.addEventListener('click', () => {
    model.classList.toggle('open');
  });
});

// Sliders
function initSlider(root){
  const slides = root.querySelector('.slides');
  const slideCount = slides.children.length;
  let index = 0;
  function update(){ slides.style.transform = `translateX(${-index*100}%)`; }
  root.querySelector('.prev').addEventListener('click', e => { e.stopPropagation(); index = (index-1+slideCount)%slideCount; update(); });
  root.querySelector('.next').addEventListener('click', e => { e.stopPropagation(); index = (index+1)%slideCount; update(); });
  // Swipe support
  let startX=null;
  slides.addEventListener('touchstart', (e)=> startX = e.touches[0].clientX, {passive:true});
  slides.addEventListener('touchmove', (e)=> {
    if(startX===null) return;
    const dx = e.touches[0].clientX - startX;
    if(Math.abs(dx) > 60){ startX=null; if(dx<0){ index=(index+1)%slideCount; } else { index=(index-1+slideCount)%slideCount; } update(); }
  }, {passive:true});
}
document.querySelectorAll('.slider').forEach(initSlider);
