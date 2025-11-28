/* ===================================================
   Carrossel
   =================================================== */

document.addEventListener("DOMContentLoaded", () => {
  const carrosseis = document.querySelectorAll("[data-js='carrossel']");

  carrosseis.forEach(initCarousel);
});

/* ---------------------------------------------------
   Função principal
--------------------------------------------------- */
function initCarousel(section) {
  const viewport = section.querySelector(".carrossel-viewport");
  const track = section.querySelector(".carrossel-trilha");
  const btnPrev = section.querySelector(".carrossel-botao.prev");
  const btnNext = section.querySelector(".carrossel-botao.next");

  if (!viewport || !track) return;

  /* ========== 1. Botões next/prev ========== */
  btnNext?.addEventListener("click", () => slide(viewport, +1));
  btnPrev?.addEventListener("click", () => slide(viewport, -1));

  /* ========== 2. Scroll suave via mouse/touch ========== */
  let isDown = false;
  let startX;
  let scrollStart;

  viewport.addEventListener("mousedown", (e) => {
    isDown = true;
    viewport.classList.add("dragging");
    startX = e.pageX - viewport.offsetLeft;
    scrollStart = viewport.scrollLeft;
  });

  viewport.addEventListener("mouseleave", () => {
    isDown = false;
    viewport.classList.remove("dragging");
  });

  viewport.addEventListener("mouseup", () => {
    isDown = false;
    viewport.classList.remove("dragging");
  });

  viewport.addEventListener("mousemove", (e) => {
    if (!isDown) return;
    e.preventDefault();
    const x = e.pageX - viewport.offsetLeft;
    const walk = (x - startX) * 1.2; // velocidade
    viewport.scrollLeft = scrollStart - walk;
  });

  /* Touch (mobile) */
  viewport.addEventListener("touchstart", (e) => {
    isDown = true;
    startX = e.touches[0].pageX;
    scrollStart = viewport.scrollLeft;
  });

  viewport.addEventListener("touchend", () => {
    isDown = false;
  });

  viewport.addEventListener("touchmove", (e) => {
    if (!isDown) return;
    const x = e.touches[0].pageX;
    const walk = (x - startX) * 1.2;
    viewport.scrollLeft = scrollStart - walk;
  });
}

/* ---------------------------------------------------
   Função que move o carrossel em telas inteiras
--------------------------------------------------- */
function slide(viewport, direction) {
  const amount = viewport.clientWidth * 0.9; // 90% da tela
  viewport.scrollBy({ left: amount * direction, behavior: "smooth" });
}