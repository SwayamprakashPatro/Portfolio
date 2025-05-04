document.addEventListener("DOMContentLoaded", () => {
  const typingElement = document.getElementById("typing-text");

  if (typingElement) {
    const designations = ["Designer", "Developer"];
    const coolMessage = "Let's Team Up and Build!";
    const separator = " - ";
    let phase = 0;
    let textIndex = 0;
    let charIndex = 0;
    let typingSpeed = 100;

    function animateText() {
      let currentText = "";

      if (phase === 0) {
        currentText = designations.slice(0, textIndex + 1).join(separator);
        if (charIndex < currentText.length) {
          charIndex++;
          typingSpeed = 100;
        } else {
          if (textIndex < designations.length - 1) {
            textIndex++;
            typingSpeed = 300;
          } else {
            phase = 1;
            typingSpeed = 1000;
          }
        }
      } else if (phase === 1) {
        currentText = designations.join(separator);
        if (charIndex > 0) {
          charIndex--;
          typingSpeed = 50;
        } else {
          phase = 2;
          typingSpeed = 500;
        }
      } else if (phase === 2) {
        currentText = coolMessage;
        if (charIndex < currentText.length) {
          charIndex++;
          typingSpeed = 100;
        } else {
          phase = 3;
          typingSpeed = 1500;
        }
      } else if (phase === 3) {
        currentText = coolMessage;
        if (charIndex > 0) {
          charIndex--;
          typingSpeed = 30;
        } else {
          phase = 0;
          textIndex = 0;
          charIndex = 0;
          typingSpeed = 500;
        }
      }

      typingElement.innerHTML = `
        <span style="background: linear-gradient(to right, rgb(0, 127, 255), rgb(255, 0, 255));
                   -webkit-background-clip: text;
                   background-clip: text;
                   color: transparent;">
          ${currentText.substring(0, charIndex)}
        </span>
        <span class="cursor">|</span>
      `;

      setTimeout(animateText, typingSpeed);
    }

    animateText();
  }

  const experienceData = [
    {
      icon: "fa-solid fa-code",
      title: "Technical Intern Developer",
      duration: "5 Months - Stralynn.Inc",
      description:
        "Built advanced AI-ML models and crafted AI agents to automate complex workflows end-to-end. Designed a sleek, user-friendly UI that simplifies processes and makes data presentation clear and engaging for everyone involved.",
    },
  ];

  const experienceGrid = document.getElementById("experience-grid");
  if (experienceGrid) {
    experienceData.forEach((item) => {
      const card = document.createElement("div");
      card.className = "grid-card";
      card.innerHTML = `
        <i class="${item.icon}"></i>
        <span>${item.title}</span>
        <h3>${item.duration}</h3>
        <p>${item.description}</p>
      `;
      experienceGrid.appendChild(card);
    });
  }

  const links = document.querySelectorAll(".nav-links a, .footer-link");
  links.forEach((link) => {
    link.addEventListener("click", (e) => {
      e.preventDefault();
      const targetId = link.getAttribute("href").substring(1);
      const targetSection = document.getElementById(targetId);
      if (targetSection) {
        targetSection.scrollIntoView({ behavior: "smooth" });

        const navLinks = document.querySelector(".nav-links");
        if (navLinks.classList.contains("active")) {
          navLinks.classList.remove("active");
          const menuIcon = document.getElementById("menu-icon");
          if (menuIcon) {
            menuIcon.querySelector("i").classList.replace("fa-times", "fa-bars");
          }
        }
      }
    });
  });

  const downloadCvBtn = document.getElementById("download-cv");
  if (downloadCvBtn) {
    downloadCvBtn.addEventListener("click", () => {
      const cvUrl = "Swayamprakash Patro - Resume.pdf";
      const link = document.createElement("a");
      link.href = cvUrl;
      link.download = "Swayamprakash Patro - Resume.pdf";
      link.click();
    });
  }

  const contactBtn = document.getElementById("contact-btn");
  if (contactBtn) {
    contactBtn.addEventListener("click", () => {
      const contactSection = document.getElementById("contact");
      if (contactSection) {
        contactSection.scrollIntoView({ behavior: "smooth" });
      }
    });
  }

  const contactForm = document.getElementById("contact-form");
  if (contactForm) {
    contactForm.addEventListener("submit", async (e) => {
      e.preventDefault();
      const emailInput = document.getElementById("email-input");

      if (!emailInput.value.trim()) {
        alert("Please enter a valid email address");
        return;
      }

      try {
        const formData = new FormData(contactForm);
        const response = await fetch(contactForm.action, {
          method: "POST",
          body: formData,
          headers: {
            Accept: "application/json",
          },
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

  const menuIcon = document.getElementById("menu-icon");
  const navLinks = document.querySelector(".nav-links");

  if (menuIcon && navLinks) {
    menuIcon.addEventListener("click", () => {
      navLinks.classList.toggle("active");
      const icon = menuIcon.querySelector("i");
      if (navLinks.classList.contains("active")) {
        icon.classList.replace("fa-bars", "fa-times");
      } else {
        icon.classList.replace("fa-times", "fa-bars");
      }
    });
  }
});
