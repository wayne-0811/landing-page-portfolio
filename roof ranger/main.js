/* Tallpine Roofing — concept page behaviour. No libraries. */
(function () {
  "use strict";
  document.documentElement.classList.add("js");

  /* ---------- Mobile menu ---------- */
  var nav = document.getElementById("nav");
  var menuBtn = document.getElementById("menu-btn");
  if (nav && menuBtn) {
    var setMenu = function (open) {
      nav.setAttribute("data-open", String(open));
      menuBtn.setAttribute("aria-expanded", String(open));
      menuBtn.textContent = open ? "Close" : "Menu";
    };
    menuBtn.addEventListener("click", function () {
      setMenu(nav.getAttribute("data-open") !== "true");
    });
    nav.addEventListener("click", function (e) {
      if (e.target.closest("a")) setMenu(false);
    });
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && nav.getAttribute("data-open") === "true") {
        setMenu(false);
        menuBtn.focus();
      }
    });
  }

  /* ---------- Before-and-after: the divider follows the mouse ----------
     Mouse: move anywhere across the hero and the divider glides to the pointer.
     Touch: drag the divider itself, so swiping the page still scrolls.
     Keyboard: the hidden range input moves it with the arrow keys. */
  var hero = document.querySelector(".hero");
  var cmp = document.getElementById("cmp");
  var handle = document.getElementById("cmp-handle");
  var range = document.getElementById("cmp-range");
  if (hero && cmp && handle && range) {
    var current = 50;
    var target = 50;
    var frame = null;

    var paint = function () {
      cmp.style.setProperty("--pos", current.toFixed(2) + "%");
    };
    var tick = function () {
      var gap = target - current;
      if (Math.abs(gap) < 0.05) {
        current = target;
        paint();
        frame = null;
        return;
      }
      current += gap * 0.14;
      paint();
      frame = requestAnimationFrame(tick);
    };
    var moveTo = function (percent, jump) {
      target = Math.max(0, Math.min(100, percent));
      range.value = String(Math.round(target));
      if (jump) {
        current = target;
        paint();
      } else if (frame === null) {
        frame = requestAnimationFrame(tick);
      }
    };
    var fromEvent = function (e) {
      var box = cmp.getBoundingClientRect();
      return ((e.clientX - box.left) / box.width) * 100;
    };

    hero.addEventListener("pointermove", function (e) {
      if (e.pointerType === "mouse") moveTo(fromEvent(e), false);
    });

    var dragging = false;
    handle.addEventListener("pointerdown", function (e) {
      dragging = true;
      handle.setPointerCapture(e.pointerId);
    });
    handle.addEventListener("pointermove", function (e) {
      if (dragging) moveTo(fromEvent(e), true);
    });
    var stopDrag = function () { dragging = false; };
    handle.addEventListener("pointerup", stopDrag);
    handle.addEventListener("pointercancel", stopDrag);

    range.addEventListener("input", function () {
      moveTo(Number(range.value), true);
    });

    // A short sweep on load shows that the picture can be compared.
    var still = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!still) {
      current = 22;
      paint();
      moveTo(50, false);
    }
  }

  /* ---------- Quote form: a concept page, so nothing is sent ---------- */
  var form = document.getElementById("quote-form");
  var note = document.getElementById("form-note");
  if (form && note) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      note.textContent = "Concept only: nothing was sent. On a real site the crew would call you back.";
    });
  }

  /* ---------- Year ---------- */
  var yr = document.getElementById("yr");
  if (yr) yr.textContent = String(new Date().getFullYear());

  /* ---------- Scroll reveal ---------- */
  var reveals = document.querySelectorAll(".reveal");
  if (!("IntersectionObserver" in window)) {
    reveals.forEach(function (el) { el.classList.add("in"); });
  } else {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("in");
          io.unobserve(entry.target);
        }
      });
    }, { rootMargin: "0px 0px -8% 0px", threshold: 0.08 });
    reveals.forEach(function (el) { io.observe(el); });
  }
})();
