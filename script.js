document.addEventListener("DOMContentLoaded", () => {
  // ==================== TYPING EFFECT ====================
  const typingElement = document.getElementById("typing-text");

  if (typingElement) {
    const designations = ["Designer", "Developer"];
    const coolMessage = "Let’s Team Up and Build!";
    const separator = " - ";

    let phase = 0; // 0 typing designations, 1 deleting, 2 typing message, 3 deleting
    let textIndex = 0;
    let charIndex = 0;
    let typingSpeed = 100;

    function animateText() {
      let currentText = "";

      if (phase === 0) {
        currentText = designations.slice(0, textIndex + 1).join(separator);
        if (charIndex < currentText.length) {
          charIndex++;
          typingSpeed = 90;
        } else {
          if (textIndex < designations.length - 1) {
            textIndex++;
            typingSpeed = 250;
          } else {
            phase = 1;
            typingSpeed = 900;
          }
        }
      } else if (phase === 1) {
        currentText = designations.join(separator);
        if (charIndex > 0) {
          charIndex--;
          typingSpeed = 45;
        } else {
          phase = 2;
          typingSpeed = 450;
        }
      } else if (phase === 2) {
        currentText = coolMessage;
        if (charIndex < currentText.length) {
          charIndex++;
          typingSpeed = 85;
        } else {
          phase = 3;
          typingSpeed = 1200;
        }
      } else if (phase === 3) {
        currentText = coolMessage;
        if (charIndex > 0) {
          charIndex--;
          typingSpeed = 28;
        } else {
          phase = 0;
          textIndex = 0;
          charIndex = 0;
          typingSpeed = 450;
        }
      }

      typingElement.innerHTML = `
        <span style="background: var(--grad); -webkit-background-clip: text; background-clip: text; color: transparent;">
          ${currentText.substring(0, charIndex)}
        </span>
        <span class="cursor">|</span>
      `;

      setTimeout(animateText, typingSpeed);
    }

    animateText();
  }

  // ==================== EXPERIENCE CARDS ====================
  const experienceData = [
    {
      company: "Stralynn.Inc",
      duration: "1 Year",
      linkedin: "https://in.linkedin.com/in/swayamprakashpatro",
      roles: [
        {
          title: "AI Developer",
          tag: "Part Time",
          work: "Built and deployed live AI agents and user-friendly UIs. Developed end-to-end automation workflows and intuitive interfaces that simplified processes and presented data clearly for stakeholders.",
          stack: [
            { icon: "fa-brands fa-python", label: "Python" },
            { icon: "fa-brands fa-js", label: "JavaScript" },
            { icon: "fa-brands fa-react", label: "React" },
            { icon: "fa-brands fa-node-js", label: "Node.js" },
          ],
        },
        {
          title: "Technical Intern Developer",
          tag: "Intern",
          work: "Built advanced AI/ML models and crafted AI agents to automate complex workflows end-to-end. Designed a sleek, user-friendly UI that simplifies processes and makes data presentation clear and engaging.",
          stack: [
            { icon: "fa-brands fa-python", label: "Python" },
            { icon: "fa-solid fa-brain", label: "Machine Learning" },
            { icon: "fa-brands fa-react", label: "React" },
          ],
        },
      ],
    },
  ];

  const experienceList = document.getElementById("experience-list");
  if (experienceList) {
    experienceList.innerHTML = "";
    experienceData.forEach((company) => {
      const card = document.createElement("article");
      card.className = "xp-card";

      const rolesHtml = (company.roles || [])
        .map(
          (role) => `
            <div class="xp-role">
              <div class="xp-role-left">
                <div class="xp-role-title">${role.title}</div>
                <div class="xp-role-work">${role.work}</div>
              </div>
              <div class="xp-role-right">
                <div class="xp-role-tag">${role.tag || ""}</div>
                ${
                  Array.isArray(role.stack) && role.stack.length
                    ? `<div class="xp-role-stack" aria-label="Tech stack">
                        <div class="stack-icons stack-icons-sm">
                          ${role.stack
                            .map(
                              (s) =>
                                `<i class="${s.icon}" data-label="${s.label}" aria-label="${s.label}" tabindex="0"></i>`,
                            )
                            .join("")}
                        </div>
                      </div>`
                    : ""
                }
              </div>
            </div>
          `,
        )
        .join("");

      const linkedinHtml = company.linkedin
        ? `<a href="${company.linkedin}" target="_blank" rel="noopener" class="btn btn-sm xp-linkedin" aria-label="LinkedIn"><i class="fa-brands fa-linkedin" aria-hidden="true"></i><span class="sr-only">LinkedIn</span></a>`
        : "";

      card.innerHTML = `
        <div class="xp-head">
          <div class="xp-company">${company.company}</div>
          <div class="xp-head-right">
            <div class="xp-years">${company.duration}</div>
            ${linkedinHtml}
          </div>
        </div>
        <div class="xp-roles">
          ${rolesHtml}
        </div>
      `;

      experienceList.appendChild(card);
    });
  }

  // ==================== SPOTLIGHT TABS (Experience / Skills / Projects) ====================
  const tablist = document.querySelector(".mini-tabs, .spotlight-rail");
  const tabButtons = Array.from(
    document.querySelectorAll(".mini-tab, .spotlight-tab"),
  );
  const tabPanels = Array.from(document.querySelectorAll(".tab-panel"));

  let activateSpotlightTabByKey = null;

  // ==================== TOP NAV ACTIVE STATE ====================
  const navIcons = Array.from(document.querySelectorAll(".nav-icon[data-nav]"));

  function setActiveNav(key) {
    if (!navIcons.length) return;
    navIcons.forEach((a) => {
      const isActive = a.getAttribute("data-nav") === key;
      a.classList.toggle("is-active", isActive);
      if (isActive) a.setAttribute("aria-current", "page");
      else a.removeAttribute("aria-current");
    });
  }

  function updateActiveNavFromHash() {
    const hash = window.location.hash || "";
    if (hash === "#spotlight-projects") return setActiveNav("spotlight");
    if (hash.startsWith("#spotlight-")) return setActiveNav("spotlight");
  }

  // About page: mark About active immediately
  if (window.location.pathname.toLowerCase().endsWith("about.html")) {
    setActiveNav("about");
  }

  if (tablist && tabButtons.length && tabPanels.length) {
    let activeIndex = Math.max(
      0,
      tabButtons.findIndex((b) => b.classList.contains("is-active")),
    );

    function setActiveTabByIndex(nextIndex) {
      activeIndex = (nextIndex + tabButtons.length) % tabButtons.length;
      const nextTab = tabButtons[activeIndex];
      const nextKey = nextTab.getAttribute("data-tab");

      tabButtons.forEach((btn, idx) => {
        const isActive = idx === activeIndex;
        btn.classList.toggle("is-active", isActive);
        btn.setAttribute("aria-selected", String(isActive));
      });

      tabPanels.forEach((panel) => {
        const match = panel.getAttribute("data-panel") === nextKey;
        panel.classList.toggle("is-active", match);
        panel.hidden = !match;
      });
    }

    const keyToIndex = new Map(
      tabButtons
        .map((b, i) => [b.getAttribute("data-tab"), i])
        .filter(([k]) => Boolean(k)),
    );

    function setActiveTabByKey(key) {
      const idx = keyToIndex.get(key);
      if (typeof idx === "number") setActiveTabByIndex(idx);
    }

    activateSpotlightTabByKey = setActiveTabByKey;

    tabButtons.forEach((btn, idx) => {
      btn.addEventListener("click", () => {
        setActiveTabByIndex(idx);

        const key = btn.getAttribute("data-tab");
        if (key) {
          history.replaceState(null, "", `#spotlight-${key}`);
          setActiveNav("spotlight");
        }
      });
    });

    // Keyboard support for tabs (ArrowLeft/ArrowRight/Home/End)
    tablist.addEventListener("keydown", (e) => {
      if (
        e.key !== "ArrowLeft" &&
        e.key !== "ArrowRight" &&
        e.key !== "Home" &&
        e.key !== "End"
      ) {
        return;
      }

      e.preventDefault();

      let next = activeIndex;
      if (e.key === "ArrowLeft") next = activeIndex - 1;
      if (e.key === "ArrowRight") next = activeIndex + 1;
      if (e.key === "Home") next = 0;
      if (e.key === "End") next = tabButtons.length - 1;

      setActiveTabByIndex(next);
      tabButtons[activeIndex].focus();

      const key = tabButtons[activeIndex].getAttribute("data-tab");
      if (key) {
        history.replaceState(null, "", `#spotlight-${key}`);
        setActiveNav("spotlight");
      }
    });

    // Deep link support: #spotlight-experience / #spotlight-skills / #spotlight-projects
    if (location.hash && location.hash.startsWith("#spotlight-")) {
      const key = location.hash.replace("#spotlight-", "");
      setActiveTabByKey(key);
      setActiveNav("spotlight");
    }
  }

  // ==================== MOBILE MENU TOGGLE ====================
  const menuBtn = document.getElementById("menu-btn");
  const navLinks = document.querySelector(".nav-links");

  function closeMenu() {
    if (!menuBtn || !navLinks) return;
    navLinks.classList.remove("active");
    menuBtn.classList.remove("is-open");
    menuBtn.setAttribute("aria-expanded", "false");
    menuBtn.setAttribute("aria-label", "Open menu");
  }

  function toggleMenu() {
    if (!menuBtn || !navLinks) return;
    const isOpen = navLinks.classList.toggle("active");
    menuBtn.classList.toggle("is-open", isOpen);
    menuBtn.setAttribute("aria-expanded", String(isOpen));
    menuBtn.setAttribute("aria-label", isOpen ? "Close menu" : "Open menu");
  }

  if (menuBtn && navLinks) {
    menuBtn.addEventListener("click", toggleMenu);
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape") closeMenu();
    });
  }

  // ==================== SMOOTH SCROLLING ====================
  const links = document.querySelectorAll(".nav-links a, .footer-link");
  links.forEach((link) => {
    link.addEventListener("click", (e) => {
      const href = link.getAttribute("href");
      if (!href || !href.startsWith("#")) return;

      e.preventDefault();
      const targetId = href.substring(1);
      const targetSection = document.getElementById(targetId);
      if (targetSection) {
        targetSection.scrollIntoView({ behavior: "smooth" });
        closeMenu();

        if (activateSpotlightTabByKey && href.startsWith("#spotlight-")) {
          const key = href.replace("#spotlight-", "");
          window.setTimeout(() => activateSpotlightTabByKey(key), 200);
        }

        // Immediate active feedback for icon-only nav
        if (href === "#about") setActiveNav("home");
        if (href === "#experience") setActiveNav("spotlight");
        if (href === "#contact") setActiveNav("contact");
        if (href === "#spotlight-projects") setActiveNav("spotlight");
      }
    });
  });

  // Scroll-based active state (index page only)
  const aboutSection = document.getElementById("about");
  const spotlightSection = document.getElementById("experience");
  const contactSection = document.getElementById("contact");

  if (
    aboutSection &&
    spotlightSection &&
    contactSection &&
    !window.location.pathname.toLowerCase().endsWith("about.html")
  ) {
    const observer = new IntersectionObserver(
      (entries) => {
        // Respect deep-link intent into spotlight
        if (
          window.location.hash &&
          window.location.hash.startsWith("#spotlight-")
        ) {
          updateActiveNavFromHash();
          return;
        }

        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

        if (!visible) return;
        if (visible.target.id === "about") setActiveNav("home");
        if (visible.target.id === "experience") setActiveNav("spotlight");
        if (visible.target.id === "contact") setActiveNav("contact");
      },
      { threshold: [0.25, 0.35, 0.45] },
    );

    observer.observe(aboutSection);
    observer.observe(spotlightSection);
    observer.observe(contactSection);

    // Initial state
    setActiveNav("home");
    updateActiveNavFromHash();
  }

  window.addEventListener("hashchange", () => {
    updateActiveNavFromHash();
    if (
      activateSpotlightTabByKey &&
      window.location.hash.startsWith("#spotlight-")
    ) {
      const key = window.location.hash.replace("#spotlight-", "");
      activateSpotlightTabByKey(key);
    }
  });

  // ==================== DOWNLOAD CV BUTTON ====================
  const downloadCvBtn = document.getElementById("download-cv");
  if (downloadCvBtn) {
    downloadCvBtn.addEventListener("click", () => {
      const cvUrl = "Resume.pdf";
      const link = document.createElement("a");
      link.href = cvUrl;
      link.download = "Resume.pdf";
      link.click();
    });
  }

  // ==================== CONTACT BUTTON ====================
  const contactBtn = document.getElementById("contact-btn");
  if (contactBtn) {
    const href = contactBtn.getAttribute("href") || "";
    const isInPageContactLink = href === "#contact" || href === "";

    if (isInPageContactLink) {
      contactBtn.addEventListener("click", (e) => {
        e.preventDefault();
        const contactSection = document.getElementById("contact");
        if (contactSection)
          contactSection.scrollIntoView({ behavior: "smooth" });
      });
    }
  }

  // ==================== FORM SUBMISSION ====================
  const contactForm = document.getElementById("contact-form");
  if (contactForm) {
    contactForm.addEventListener("submit", async (e) => {
      e.preventDefault();
      const emailInput = document.getElementById("email-input");

      if (!emailInput || !emailInput.value.trim()) {
        alert("Please enter a valid email address");
        return;
      }

      try {
        const formData = new FormData(contactForm);
        const response = await fetch(contactForm.action, {
          method: "POST",
          body: formData,
          headers: { Accept: "application/json" },
        });

        if (response.ok) {
          alert("Thank you! Your message has been sent.");
          contactForm.reset();
        } else {
          throw new Error("Form submission failed");
        }
      } catch (error) {
        console.error("Error:", error);
        alert("There was an error sending your message. Please try again.");
      }
    });
  }

  // ==================== SKILLS: KEEP EDGE EXPANDS VISIBLE ====================
  // When a skill pill expands near the edges, ensure its card stacks above neighbors.
  const skillLogos = Array.from(document.querySelectorAll(".skill-logo"));
  if (skillLogos.length) {
    // Global tooltip to avoid layout overlap/odd positioning.
    const tooltip = document.createElement("div");
    tooltip.id = "skill-tooltip";
    const tooltipText = document.createElement("span");
    tooltip.appendChild(tooltipText);
    document.body.appendChild(tooltip);

    let activeEl = null;
    let rafId = 0;

    const clamp = (value, min, max) => Math.min(Math.max(value, min), max);

    const positionTooltip = (el) => {
      if (!el) return;
      const label = el.getAttribute("aria-label") || "";
      if (!label) return;

      tooltipText.textContent = label;

      // Prep for measuring.
      tooltip.classList.add("is-prep");
      tooltip.classList.remove("is-visible", "place-top", "place-bottom");
      tooltip.style.left = "0px";
      tooltip.style.top = "0px";
      tooltip.style.transform = "translate(-9999px, -9999px)";

      // Force layout so we can measure size.
      const tipRect = tooltip.getBoundingClientRect();
      const rect = el.getBoundingClientRect();
      const gap = 10;
      const edgePad = 8;

      const canPlaceTop = rect.top >= tipRect.height + gap + edgePad;
      const place = canPlaceTop ? "top" : "bottom";

      let x = rect.left + rect.width / 2;
      x = clamp(
        x,
        edgePad + tipRect.width / 2,
        window.innerWidth - edgePad - tipRect.width / 2,
      );

      const y = place === "top" ? rect.top - gap : rect.bottom + gap;

      tooltip.style.left = `${x}px`;
      tooltip.style.top = `${y}px`;
      // Let CSS classes control the final transform (center/above/below).
      tooltip.style.transform = "";
      tooltip.classList.add(place === "top" ? "place-top" : "place-bottom");

      tooltip.classList.remove("is-prep");
      // Next frame: animate in (shell then text).
      requestAnimationFrame(() => {
        tooltip.classList.add("is-visible");
      });
    };

    const show = (el) => {
      activeEl = el;
      if (rafId) cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(() => positionTooltip(el));
    };

    const hide = () => {
      activeEl = null;
      if (rafId) cancelAnimationFrame(rafId);
      rafId = 0;
      tooltip.classList.remove(
        "is-visible",
        "place-top",
        "place-bottom",
        "is-prep",
      );
      tooltip.style.transform = "translate(-9999px, -9999px)";
    };

    // Keep existing stacking fix for cards (harmless and helps tooltip visibility).
    const setCardHover = (el, isOn) => {
      const card = el.closest(".skills-group");
      if (!card) return;
      card.classList.toggle("is-hovered", isOn);
    };

    skillLogos.forEach((el) => {
      el.addEventListener("pointerenter", () => {
        setCardHover(el, true);
        show(el);
      });
      el.addEventListener("pointerleave", () => {
        setCardHover(el, false);
        hide();
      });
      el.addEventListener("focusin", () => {
        setCardHover(el, true);
        show(el);
      });
      el.addEventListener("focusout", () => {
        setCardHover(el, false);
        hide();
      });
    });

    window.addEventListener(
      "scroll",
      () => {
        if (activeEl) positionTooltip(activeEl);
      },
      { passive: true },
    );

    window.addEventListener("resize", () => {
      if (activeEl) positionTooltip(activeEl);
    });
  }
});
