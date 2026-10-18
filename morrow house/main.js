/* Morrow House — concept page behaviour. No libraries. */
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

  /* ---------- Scroll reveal ---------- */
  var reveals = document.querySelectorAll(".reveal");
  var reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (reduced || !("IntersectionObserver" in window)) {
    reveals.forEach(function (el) { el.classList.add("is-in"); });
  } else {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-in");
          io.unobserve(entry.target);
        }
      });
    }, { rootMargin: "0px 0px -8% 0px" });
    reveals.forEach(function (el) { io.observe(el); });
  }

  /* ---------- Enquiry form: checks the fields, sends nothing ---------- */
  var form = document.getElementById("enquiry-form");
  var note = document.getElementById("form-note");
  if (form && note) {
    var defaultNote = note.textContent;
    var mark = function (input) {
      var bad = !input.checkValidity();
      input.closest(".field").setAttribute("data-invalid", String(bad));
      input.setAttribute("aria-invalid", String(bad));
      return !bad;
    };
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      var required = form.querySelectorAll("[required]");
      var firstBad = null;
      required.forEach(function (input) {
        if (!mark(input) && !firstBad) firstBad = input;
      });
      if (firstBad) {
        note.setAttribute("data-state", "error");
        note.textContent = "Please add your name, a valid email and a project type so we can reply.";
        firstBad.focus();
        return;
      }
      var name = form.elements.name.value.trim().split(" ")[0];
      note.setAttribute("data-state", "sent");
      note.textContent = "Thank you, " + name + ". This is a concept page, so nothing was sent, but this is where we would reply within two working days.";
      form.reset();
    });
    form.addEventListener("input", function (e) {
      if (e.target.closest(".field[data-invalid='true']")) mark(e.target);
      if (note.getAttribute("data-state") === "error") {
        note.removeAttribute("data-state");
        note.textContent = defaultNote;
      }
    });
  }

  /* ---------- Footer year ---------- */
  var yr = document.getElementById("yr");
  if (yr) yr.textContent = String(new Date().getFullYear());
})();
