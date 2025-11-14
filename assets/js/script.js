// scripts.js - efeitos gerais do Music Lib

document.addEventListener('DOMContentLoaded', function () {
  // 1) Atualizar o ano no rodapé
  const yearEl = document.querySelector('[data-js="year"]');
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }

  // 2) Newsletter: mostrar mensagem de sucesso
  const newsletterForm = document.querySelector('[data-js="newsletter-form"]');
  if (newsletterForm) {
    newsletterForm.addEventListener('submit', function (event) {
      event.preventDefault();
      const emailInput = newsletterForm.querySelector('input[type="email"]');

      if (emailInput && emailInput.value.trim() !== '') {
        alert('Obrigado por assinar a newsletter do Music Lib! ??');
        newsletterForm.reset();
      } else {
        alert('Por favor, informe um e-mail válido.');
      }
    });
  }
});
