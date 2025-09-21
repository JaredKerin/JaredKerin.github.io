// Typing effect that cycles through phrases
(function () {
  const target = document.getElementById("typing");
  if (!target) return; // only run on pages with typing element

  const phrases = ["Jared Kerin", "Fullstack Developer", "Security-Minded Engineer", "Student Leader"];
  const typeDelay = 90; // ms between keystrokes
  const eraseDelay = 50; // ms between backspaces
  const holdDelay = 1200; // pause at end of word
  let i = 0,
    pos = 0,
    typing = true;

  function renderText(text, length) {
    const visible = text.slice(0, length);
    const words = visible.split(/(\s+)/);
    let seenWords = 0;
    const parts = words.map((w) => {
      if (/^\s+$/.test(w)) return w;
      seenWords++;
      if (seenWords === 1) return `<span class="word-1">${w}</span>`;
      if (seenWords === 2) return `<span class="word-2">${w}</span>`;
      return w;
    });
    return parts.join("");
  }

  function tick() {
    const current = phrases[i];
    if (typing) {
      pos++;
      target.innerHTML = renderText(current, pos);
      if (pos === current.length) {
        typing = false;
        setTimeout(tick, holdDelay);
        return;
      }
      setTimeout(tick, typeDelay);
    } else {
      pos--;
      target.innerHTML = renderText(current, pos);
      if (pos === 0) {
        typing = true;
        i = (i + 1) % phrases.length;
        setTimeout(tick, 300);
        return;
      }
      setTimeout(tick, eraseDelay);
    }
  }
  setTimeout(tick, 400);
})();

// Year
document.getElementById("year").textContent = new Date().getFullYear();

// Burger toggle (simple open/close)
function toggleMenu() {
  const menu = document.querySelector(".burger-menu");
  menu.classList.toggle("open");
}

// Register GSAP ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

// REVEAL animation logic
gsap.utils.toArray(".revealUp").forEach(function (elem) {
  ScrollTrigger.create({
    trigger: elem,
    start: "top 80%",
    end: "bottom 20%",
    onEnter: function () {
      gsap.fromTo(
        elem,
        { y: 100, autoAlpha: 0 },
        { duration: 1.25, y: 0, autoAlpha: 1, ease: "back", overwrite: "auto" }
      );
    },
    onLeave: function () {
      gsap.fromTo(elem, { autoAlpha: 1 }, { autoAlpha: 0, overwrite: "auto" });
    },
    onEnterBack: function () {
      gsap.fromTo(
        elem,
        { y: -100, autoAlpha: 0 },
        { duration: 1.25, y: 0, autoAlpha: 1, ease: "back", overwrite: "auto" }
      );
    },
    onLeaveBack: function () {
      gsap.fromTo(elem, { autoAlpha: 1 }, { autoAlpha: 0, overwrite: "auto" });
    }
  });
});
