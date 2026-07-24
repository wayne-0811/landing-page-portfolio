/* Abbott Automotive Services — homepage behaviour
   Vanilla JS, no dependencies. Mobile nav, reg-plate enquiry, scroll reveal. */
(function () {
  "use strict";

  var WHATSAPP = "447856461584"; // Ollie's mobile, international format

  /* ---------- mobile nav ---------- */
  var toggle = document.getElementById("nav-toggle");
  var nav = document.getElementById("primary-nav");

  function closeNav() {
    if (!toggle || !nav) return;
    toggle.setAttribute("aria-expanded", "false");
    nav.removeAttribute("data-open");
  }

  if (toggle && nav) {
    toggle.addEventListener("click", function () {
      var open = toggle.getAttribute("aria-expanded") === "true";
      toggle.setAttribute("aria-expanded", String(!open));
      if (open) { nav.removeAttribute("data-open"); }
      else { nav.setAttribute("data-open", "true"); }
    });
    // close on link click (mobile)
    nav.addEventListener("click", function (e) {
      if (e.target.closest("a")) closeNav();
    });
    // close on Escape
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape") closeNav();
    });
  }

  /* ---------- sticky header shadow ---------- */
  var header = document.querySelector(".site-header");
  if (header) {
    var onScroll = function () {
      header.classList.toggle("scrolled", window.scrollY > 4);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
  }

  /* ---------- reg input: tidy formatting ---------- */
  var reg = document.getElementById("reg");
  if (reg) {
    reg.addEventListener("input", function () {
      // uppercase, strip anything that isn't a letter/number/space
      var v = reg.value.toUpperCase().replace(/[^A-Z0-9 ]/g, "");
      reg.value = v;
    });
  }

  /* ---------- enquiry form → WhatsApp to Ollie ---------- */
  var form = document.getElementById("quote-form");
  if (form) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      var regVal = (reg && reg.value.trim()) || "";
      var phoneEl = document.getElementById("phone");
      var phoneVal = (phoneEl && phoneEl.value.trim()) || "";

      if (!regVal) {
        if (reg) reg.focus();
        return;
      }

      var lines = [
        "Hi Ollie, please can I get a price?",
        "Reg: " + regVal
      ];
      if (phoneVal) lines.push("My number: " + phoneVal);
      lines.push("(Sent from the website)");

      var url = "https://wa.me/" + WHATSAPP + "?text=" + encodeURIComponent(lines.join("\n"));
      window.open(url, "_blank", "noopener");
    });
  }

  /* ---------- scroll reveal (respects reduced motion) ---------- */
  var prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var revealEls = document.querySelectorAll(".reveal");

  if (prefersReduced || !("IntersectionObserver" in window)) {
    revealEls.forEach(function (el) { el.classList.add("in"); });
  } else {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("in");
          io.unobserve(entry.target);
        }
      });
    }, { rootMargin: "0px 0px -8% 0px", threshold: 0.08 });
    revealEls.forEach(function (el) { io.observe(el); });
  }

  /* ---------- highlight today's opening hours ---------- */
  var today = new Date().getDay(); // 0 = Sun
  var todayRow = document.querySelector('#hours-body tr[data-day="' + today + '"]');
  if (todayRow) todayRow.classList.add("today");

  /* ---------- footer year ---------- */
  var yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = String(new Date().getFullYear());
})();
