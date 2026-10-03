/* Halden Automotive — concept page behaviour. No libraries. */
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

  /* ---------- Hero video: plays on its own, with a way to stop it ---------- */
  var video = document.getElementById("hero-video");
  var toggle = document.getElementById("video-toggle");
  if (video && toggle) {
    var show = function () {
      var paused = video.paused;
      toggle.textContent = paused ? "Play video" : "Pause video";
      toggle.setAttribute("aria-pressed", String(paused));
    };
    toggle.addEventListener("click", function () {
      if (video.paused) video.play().catch(function () {});
      else video.pause();
    });
    video.addEventListener("play", show);
    video.addEventListener("pause", show);
    // If the browser refuses to autoplay, the poster stays and the button says so.
    var started = video.play();
    if (started && started.catch) started.catch(show);
    show();
  }

  /* ---------- Services rail: scroll position follows the mouse ----------
     Move the pointer across the row and the cards slide to match: far left
     shows the first card, far right the last. Touch screens swipe as normal,
     and the arrows and keyboard work for everyone. */
  var rail = document.getElementById("rail");
  var prev = document.getElementById("rail-prev");
  var next = document.getElementById("rail-next");
  if (rail) {
    var target = 0;
    var frame = null;
    var maxScroll = function () { return rail.scrollWidth - rail.clientWidth; };

    var syncArrows = function () {
      if (!prev || !next) return;
      prev.disabled = rail.scrollLeft <= 1;
      next.disabled = rail.scrollLeft >= maxScroll() - 1;
    };

    var tick = function () {
      var gap = target - rail.scrollLeft;
      if (Math.abs(gap) < 0.5) {
        rail.scrollLeft = target;
        frame = null;
        return;
      }
      rail.scrollLeft += gap * 0.12;
      frame = requestAnimationFrame(tick);
    };
    var glideTo = function (x) {
      target = Math.max(0, Math.min(maxScroll(), x));
      if (frame === null) frame = requestAnimationFrame(tick);
    };
    var stopFollowing = function () {
      rail.removeAttribute("data-following");
      if (frame !== null) cancelAnimationFrame(frame);
      frame = null;
    };

    rail.addEventListener("pointermove", function (e) {
      if (e.pointerType !== "mouse") return;
      var box = rail.getBoundingClientRect();
      // A margin at each edge so the first and last cards are easy to reach.
      var edge = Math.min(120, box.width * 0.15);
      var ratio = (e.clientX - box.left - edge) / (box.width - edge * 2);
      rail.setAttribute("data-following", "true");
      glideTo(Math.max(0, Math.min(1, ratio)) * maxScroll());
    });
    rail.addEventListener("pointerleave", function () {
      rail.removeAttribute("data-following");
    });
    // A swipe, wheel or key press takes over from the mouse straight away.
    rail.addEventListener("touchstart", stopFollowing, { passive: true });
    rail.addEventListener("wheel", stopFollowing, { passive: true });

    var step = function (dir) {
      var card = rail.querySelector(".card");
      var by = card ? card.getBoundingClientRect().width + 12 : rail.clientWidth * 0.8;
      rail.setAttribute("data-following", "true");
      glideTo((frame === null ? rail.scrollLeft : target) + dir * by);
    };
    if (prev) prev.addEventListener("click", function () { step(-1); });
    if (next) next.addEventListener("click", function () { step(1); });
    rail.addEventListener("keydown", function (e) {
      if (e.key === "ArrowRight") { e.preventDefault(); step(1); }
      if (e.key === "ArrowLeft") { e.preventDefault(); step(-1); }
    });
    rail.addEventListener("scroll", syncArrows, { passive: true });
    window.addEventListener("resize", syncArrows);
    syncArrows();
  }

  /* ---------- Enquiry: a concept page, so nothing is sent ---------- */
  var form = document.getElementById("enquiry");
  var note = document.getElementById("form-note");
  if (form && note) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      note.textContent = "Concept only: nothing was sent. On a real site this would reach the garage by text.";
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
