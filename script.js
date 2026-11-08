(() => {
  const menuButton = document.querySelector('.menu-toggle');
  const navigation = document.querySelector('.nav');

  const closeMenu = () => {
    if (!menuButton || !navigation) return;

    menuButton.setAttribute('aria-expanded', 'false');
    menuButton.setAttribute('aria-label', 'Открыть меню');
    navigation.classList.remove('is-open');
  };

  if (menuButton && navigation) {
    menuButton.addEventListener('click', () => {
      const isOpen = menuButton.getAttribute('aria-expanded') === 'true';

      menuButton.setAttribute('aria-expanded', String(!isOpen));
      menuButton.setAttribute('aria-label', isOpen ? 'Открыть меню' : 'Закрыть меню');
      navigation.classList.toggle('is-open', !isOpen);
    });

    navigation.querySelectorAll('a').forEach((link) => {
      link.addEventListener('click', closeMenu);
    });

    document.addEventListener('keydown', (event) => {
      if (event.key === 'Escape') closeMenu();
    });
  }

  const year = document.getElementById('year');
  if (year) year.textContent = new Date().getFullYear();

  const revealItems = document.querySelectorAll('.reveal');
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if ('IntersectionObserver' in window && !reduceMotion) {
    const observer = new IntersectionObserver((entries, currentObserver) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;

        entry.target.classList.add('is-visible');
        currentObserver.unobserve(entry.target);
      });
    }, {
      threshold: 0.12,
      rootMargin: '0px 0px -35px 0px'
    });

    revealItems.forEach((item) => observer.observe(item));
  } else {
    revealItems.forEach((item) => item.classList.add('is-visible'));
  }
})();
window.addEventListener('load', () => {
  const info = document.createElement('div');

  info.style.cssText = `
    position: fixed;
    top: 100px;
    right: 5px;
    z-index: 999999;
    background: red;
    color: white;
    padding: 12px;
    font-size: 12px;
    line-height: 1.6;
    border-radius: 8px;
  `;

  const showInfo = () => {
    info.innerHTML = `
      Window: ${window.innerWidth}px<br>
      HTML: ${document.documentElement.clientWidth}px<br>
      HTML scroll: ${document.documentElement.scrollWidth}px<br>
      Body: ${document.body.clientWidth}px<br>
      Body scroll: ${document.body.scrollWidth}px<br>
      Visual: ${window.visualViewport?.width}px<br>
      Scale: ${window.visualViewport?.scale}
    `;
  };

  document.body.appendChild(info);
  showInfo();

  window.visualViewport?.addEventListener('resize', showInfo);
  window.addEventListener('resize', showInfo);
});