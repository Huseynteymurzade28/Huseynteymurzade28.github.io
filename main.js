/* Small interactions: mobile menu, scroll state, reveal-on-scroll */

(function () {
    "use strict";

    /* --- Mobile menu --- */
    var toggle = document.querySelector(".nav-toggle");
    var menu = document.getElementById("nav-menu");

    if (toggle && menu) {
        toggle.addEventListener("click", function () {
            var open = menu.classList.toggle("is-open");
            toggle.setAttribute("aria-expanded", String(open));
        });

        menu.addEventListener("click", function (e) {
            if (e.target.closest("a")) {
                menu.classList.remove("is-open");
                toggle.setAttribute("aria-expanded", "false");
            }
        });
    }

    /* --- Border on the nav once scrolled --- */
    var nav = document.querySelector(".nav");

    if (nav) {
        var onScroll = function () {
            nav.classList.toggle("is-scrolled", window.scrollY > 8);
        };
        onScroll();
        window.addEventListener("scroll", onScroll, { passive: true });
    }

    /* --- Contact form: builds a mailto draft (the site is static) --- */
    var form = document.getElementById("contact-form");

    if (form) {
        var status = document.getElementById("form-status");

        form.addEventListener("submit", function (e) {
            e.preventDefault();

            /* form.name returns the form's own name, so read fields via elements */
            var f = form.elements;
            var name = f["name"].value.trim();
            var email = f["email"].value.trim();
            var subject = f["subject"].value;
            var message = f["message"].value.trim();

            if (!name || !email || !subject || !message) {
                status.textContent = "Please fill in every field.";
                status.style.color = "var(--rose)";
                return;
            }

            var body = message + "\n\n—\n" + name + "\n" + email;
            var href = "mailto:huseynteymurrr74@gmail.com"
                + "?subject=" + encodeURIComponent("[site] " + subject + " — " + name)
                + "&body=" + encodeURIComponent(body);

            window.location.href = href;

            status.textContent = "Opening your email client with a prefilled draft…";
            status.style.color = "var(--teal)";
        });

        form.addEventListener("reset", function () {
            status.textContent = "";
        });
    }

    /* --- Gentle entrance once visible --- */
    var targets = document.querySelectorAll(".reveal");

    if (!targets.length) return;

    var reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (reduced || !("IntersectionObserver" in window)) {
        targets.forEach(function (el) { el.classList.add("is-visible"); });
        return;
    }

    var io = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
            if (!entry.isIntersecting) return;
            entry.target.classList.add("is-visible");
            io.unobserve(entry.target);
        });
    }, { rootMargin: "0px 0px -8% 0px", threshold: 0.08 });

    targets.forEach(function (el, i) {
        el.style.transitionDelay = Math.min(i % 6, 5) * 60 + "ms";
        io.observe(el);
    });
})();
