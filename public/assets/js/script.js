/* Fade Zone Barbers – interactions */
(function(){
  'use strict';

  // Year
  document.getElementById('year').textContent = new Date().getFullYear();

  // Nav scroll state
  const nav = document.getElementById('navbar');
  const onScroll = () => {
    nav.classList.toggle('scrolled', window.scrollY > 30);
    document.getElementById('toTop').classList.toggle('show', window.scrollY > 500);
  };
  window.addEventListener('scroll', onScroll, {passive:true});
  onScroll();

  // Burger
  const burger = document.getElementById('navBurger');
  const links  = document.getElementById('navLinks');
  burger.addEventListener('click', () => {
    burger.classList.toggle('open');
    links.classList.toggle('open');
  });
  links.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
    burger.classList.remove('open'); links.classList.remove('open');
  }));

  // Back to top
  document.getElementById('toTop').addEventListener('click', () =>
    window.scrollTo({top:0, behavior:'smooth'})
  );

  // Reveal on scroll
  const io = new IntersectionObserver((entries) => {
    entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('visible'); io.unobserve(e.target); }});
  }, {threshold:.12});
  document.querySelectorAll('.reveal').forEach(el => io.observe(el));

  // ---------- Open / Closed status ----------
  const hours = {
    0:{o:'10:00', c:'17:00'}, // Sunday
    1:{o:'09:00', c:'19:00'},
    2:{o:'09:00', c:'19:00'},
    3:{o:'09:00', c:'19:00'},
    4:{o:'09:00', c:'19:00'},
    5:{o:'09:00', c:'19:00'},
    6:{o:'08:30', c:'18:30'}, // Saturday
  };
  const statusEl = document.getElementById('status');
  const dotText  = statusEl.querySelector('.status__text');
  const now = new Date();
  const day = now.getDay();
  const mins = now.getHours()*60 + now.getMinutes();
  const toMin = s => { const [h,m] = s.split(':').map(Number); return h*60+m; };
  const today = hours[day];
  const isOpen = mins >= toMin(today.o) && mins < toMin(today.c);
  statusEl.classList.add(isOpen ? 'open' : 'closed');
  dotText.textContent = isOpen ? `Open Now · until ${formatTime(today.c)}` : 'Closed Now';

  // Highlight today's row
  document.querySelectorAll('.hours-list li').forEach(li => {
    const days = li.getAttribute('data-day').split(',').map(Number);
    if (days.includes(day)) li.classList.add('today');
  });

  function formatTime(hhmm){
    const [h,m] = hhmm.split(':').map(Number);
    const ampm = h >= 12 ? 'PM' : 'AM';
    const h12 = ((h+11)%12)+1;
    return `${h12}:${m.toString().padStart(2,'0')} ${ampm}`;
  }

  // ---------- Gallery ----------
  // Unsplash placeholder photos of men's barber cuts / grooming.
  // Replace with real images from assets/images/gallery/ when ready.
  const galleryImages = [
    'https://images.unsplash.com/photo-1599351431202-1e0f0137899a?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1622286342621-4bd786c2447c?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1621605815971-fbc98d665033?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1503951914875-452162b0f3f1?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1517832606299-7ae9b720a186?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1620331311520-246422fd82f9?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1585747860715-2ba37e788b70?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1622287162716-f311baa1a2b8?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1596728325488-58c87691e9af?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1493256338651-d82f7acb2b38?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1521490878406-df877274365f?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1580618672591-eb180b1a973f?auto=format&fit=crop&w=800&q=80'
  ];
  const gallery = document.getElementById('gallery');
  galleryImages.forEach((src, i) => {
    const div = document.createElement('div');
    div.className = 'gallery__item';
    div.innerHTML = `<img src="${src}" alt="Fade Zone haircut ${i+1}" loading="lazy" />`;
    div.addEventListener('click', () => openLightbox(i));
    gallery.appendChild(div);
  });

  // Instagram grid – uses subset of same
  const ig = document.getElementById('igGrid');
  galleryImages.slice(0,6).forEach((src,i) => {
    const a = document.createElement('a');
    a.href = 'https://www.instagram.com/fadezone_barbers1/';
    a.target = '_blank'; a.rel = 'noopener';
    a.className = 'ig-item';
    a.innerHTML = `<img src="${src}" alt="Fade Zone instagram ${i+1}" loading="lazy" />`;
    ig.appendChild(a);
  });

  // ---------- Lightbox ----------
  const lb = document.getElementById('lightbox');
  const lbImg = lb.querySelector('.lightbox__img');
  let lbIndex = 0;
  function openLightbox(i){ lbIndex = i; lbImg.src = galleryImages[i]; lb.classList.add('open'); document.body.style.overflow='hidden'; }
  function closeLightbox(){ lb.classList.remove('open'); document.body.style.overflow=''; }
  function nav(dir){ lbIndex = (lbIndex + dir + galleryImages.length) % galleryImages.length; lbImg.src = galleryImages[lbIndex]; }
  lb.querySelector('.lightbox__close').addEventListener('click', closeLightbox);
  lb.querySelector('.lightbox__prev').addEventListener('click', () => nav(-1));
  lb.querySelector('.lightbox__next').addEventListener('click', () => nav(1));
  lb.addEventListener('click', e => { if (e.target === lb) closeLightbox(); });
  document.addEventListener('keydown', e => {
    if (!lb.classList.contains('open')) return;
    if (e.key === 'Escape') closeLightbox();
    if (e.key === 'ArrowLeft') nav(-1);
    if (e.key === 'ArrowRight') nav(1);
  });
})();
