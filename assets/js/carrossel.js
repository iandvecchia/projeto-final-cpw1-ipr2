function initCarousel(section) {
  var viewport = section.querySelector('.carrossel-viewport');
  var trilha   = section.querySelector('.carrossel-trilha');
  var prevBtn  = section.querySelector('.carrossel-botao.prev');
  var nextBtn  = section.querySelector('.carrossel-botao.next');
  var dotsWrap = section.querySelector('.carrossel-indicadores');

  if (!viewport || !trilha) return;

  var items = Array.prototype.slice.call(trilha.children);

  function getGap() {
    var style = window.getComputedStyle(trilha);
    var g = style.columnGap || style.gap || '16';
    var n = parseInt(g, 10);
    return isNaN(n) ? 16 : n;
  }

  function pagesCount() {
    var vw = viewport.clientWidth;
    var item = items[0];
    if (!item) return 1;
    var itemWidth = item.getBoundingClientRect().width + getGap();
    var visible = Math.max(1, Math.floor(vw / itemWidth));
    return Math.max(1, Math.ceil(items.length / visible));
  }

  function createDots() {
    if (!dotsWrap) return;
    dotsWrap.innerHTML = '';
    var total = pagesCount();
    for (var i = 0; i < total; i++) {
      (function (idx) {
        var b = document.createElement('button');
        b.type = 'button';
        b.className = 'carrossel-dot';
        b.setAttribute('aria-label', 'Ir para o slide ' + (idx + 1));
        b.onclick = function () {
          var vw = viewport.clientWidth;
          if (viewport.scrollTo) {
            viewport.scrollTo({ left: idx * vw, behavior: 'smooth' });
          } else {
            viewport.scrollLeft = idx * vw;
          }
        };
        dotsWrap.appendChild(b);
      })(i);
    }
    updateDots();
  }

  function updateDots() {
    if (!dotsWrap) return;
    var vw = Math.max(1, viewport.clientWidth);
    var page = Math.round(viewport.scrollLeft / vw);
    var dots = dotsWrap.querySelectorAll('.carrossel-dot');
    for (var i = 0; i < dots.length; i++) {
      if (i === page) dots[i].classList.add('ativo');
      else dots[i].classList.remove('ativo');
    }
  }

  function go(dir) {
    var vw = viewport.clientWidth;
    if (viewport.scrollBy) {
      viewport.scrollBy({ left: dir * vw, behavior: 'smooth' });
    } else {
      viewport.scrollLeft += dir * vw;
    }
  }

  if (prevBtn) prevBtn.onclick = function () { go(-1); };
  if (nextBtn) nextBtn.onclick = function () { go(1); };

  viewport.addEventListener('scroll', function () { updateDots(); });

  var resizeTimer;
  window.addEventListener('resize', function () {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(createDots, 150);
  });

  viewport.setAttribute('tabindex', '0');
  viewport.addEventListener('keydown', function (e) {
    if (e.key === 'ArrowLeft') go(-1);
    if (e.key === 'ArrowRight') go(1);
  });

  createDots();
}

document.addEventListener('DOMContentLoaded', function () {
  var sections = document.querySelectorAll('[data-js="carrossel"]');
  for (var i = 0; i < sections.length; i++) {
    initCarousel(sections[i]);
  }
});