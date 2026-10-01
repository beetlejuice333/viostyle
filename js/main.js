(function () {
  const hero = document.querySelector(".hero");
  const bgOne = document.querySelector(".hero__bg--one");

  if (!hero || !bgOne) return;

  const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (prefersReduced) return;

  let ticking = false;

  function onMove(event) {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(function () {
      const rect = hero.getBoundingClientRect();
      const x = (event.clientX - rect.left) / rect.width - 0.5;
      const y = (event.clientY - rect.top) / rect.height - 0.5;
      bgOne.style.transform = "scale(1.05) translate(" + x * 12 + "px, " + y * 8 + "px)";
      ticking = false;
    });
  }

  hero.addEventListener("mousemove", onMove, { passive: true });
})();

(function () {
  const carousel = document.querySelector("[data-carousel]");
  if (!carousel) return;

  const viewport = carousel.querySelector("[data-carousel-viewport]");
  const prevBtn = carousel.querySelector("[data-carousel-prev]");
  const nextBtn = carousel.querySelector("[data-carousel-next]");
  const slide = carousel.querySelector(".portfolio__slide");

  if (!viewport || !prevBtn || !nextBtn || !slide) return;

  function scrollStep() {
    const gap = parseFloat(getComputedStyle(viewport.querySelector(".portfolio__track")).gap) || 16;
    return slide.offsetWidth + gap;
  }

  function updateNav() {
    const maxScroll = viewport.scrollWidth - viewport.clientWidth - 2;
    prevBtn.disabled = viewport.scrollLeft <= 2;
    nextBtn.disabled = viewport.scrollLeft >= maxScroll;
  }

  prevBtn.addEventListener("click", function () {
    viewport.scrollBy({ left: -scrollStep(), behavior: "smooth" });
  });

  nextBtn.addEventListener("click", function () {
    viewport.scrollBy({ left: scrollStep(), behavior: "smooth" });
  });

  viewport.addEventListener("scroll", updateNav, { passive: true });
  window.addEventListener("resize", updateNav);
  updateNav();
})();
