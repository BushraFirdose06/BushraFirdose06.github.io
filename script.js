// Simple guaranteed working scroll function
function scrollToTop() {
  // Try modern method first
  if (typeof window.scroll === "function") {
    window.scroll({
      top: 0,
      behavior: "smooth",
    });
  }
  // Fallback for older browsers
  else {
    const topElement = document.getElementById("top");
    if (topElement) {
      topElement.scrollIntoView({ behavior: "smooth" });
    }
  }
}

// Alternative click handler if needed
document.querySelector(".back-to-top")?.addEventListener("click", scrollToTop);

// Lazy load images
function lazyLoadImages() {
  const lazyImages = [].slice.call(document.querySelectorAll("img[data-src]"));

  if ("IntersectionObserver" in window) {
    let lazyImageObserver = new IntersectionObserver(function (
      entries,
      observer
    ) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          let lazyImage = entry.target;
          lazyImage.src = lazyImage.dataset.src;
          lazyImage.classList.add("lazyloaded");
          lazyImageObserver.unobserve(lazyImage);
        }
      });
    });

    lazyImages.forEach(function (lazyImage) {
      lazyImageObserver.observe(lazyImage);
    });
  }
}

// Focus trap for modals
function trapFocus(element) {
  const focusableEls = element.querySelectorAll(
    "a[href], button, textarea, input, select"
  );
  const firstFocusableEl = focusableEls[0];
  const lastFocusableEl = focusableEls[focusableEls.length - 1];

  element.addEventListener("keydown", function (e) {
    if (e.key === "Tab") {
      if (e.shiftKey) {
        if (document.activeElement === firstFocusableEl) {
          lastFocusableEl.focus();
          e.preventDefault();
        }
      } else {
        if (document.activeElement === lastFocusableEl) {
          firstFocusableEl.focus();
          e.preventDefault();
        }
      }
    }
  });
}

// Feature detection for animations
function checkAnimationSupport() {
  if (!CSS.supports("animation", "test")) {
    document.querySelectorAll('[class*="animate-"]').forEach((el) => {
      el.classList.remove(
        ...Array.from(el.classList).filter((c) => c.startsWith("animate-"))
      );
    });
  }
}

document.addEventListener("DOMContentLoaded", () => {
  // Check animation support
  checkAnimationSupport();

  // Lazy load images
  lazyLoadImages();

  // Loading screen elements
  const loadingScreen = document.getElementById("loading-screen");
  const bLogo = document.querySelector(".b-logo");
  const loadingText = document.querySelector(".loading-text");
  const loadingBar = document.querySelector(".loading-bar");
  const bzzztSound = document.getElementById("bzzzt-sound");

  // Only proceed if required elements exist
  if (loadingScreen && bLogo && loadingText && loadingBar) {
    // Loading animation timeline
    const tl = gsap.timeline();
    tl.to(bLogo, {
      opacity: 1,
      scale: 1,
      duration: 1,
      ease: "elastic.out(1, 0.5)",
      onStart: () => {
        try {
          if (bzzztSound) {
            bzzztSound
              .play()
              .catch((e) => console.log("Audio play failed:", e));
          }
        } catch (e) {
          console.log("Audio error:", e);
        }
      },
    })
      .to(bLogo, {
        scale: 1.1,
        duration: 0.5,
        yoyo: true,
        repeat: 1,
        ease: "power2.inOut",
      })
      .to(
        loadingText,
        {
          opacity: 1,
          y: 0,
          duration: 0.5,
          ease: "power2.out",
        },
        "-=0.8"
      )
      .to(loadingBar, {
        width: "100%",
        duration: 1.5,
        ease: "power2.inOut",
      })
      .to(loadingScreen, {
        opacity: 0,
        duration: 0.5,
        ease: "power2.in",
        onComplete: () => {
          loadingScreen.style.display = "none";
          animateHeroContent();
        },
      });
  }

  function animateHeroContent() {
    // Hero content animation
    const heroH1 = document.querySelector(".hero h1");
    const heroP = document.querySelector(".hero p");
    const modeSelector = document.querySelector(".mode-selector");
    const userTypeSelector = document.querySelector(".user-type-selector");
    const ratingContainer = document.querySelector(".rating-container");

    if (heroH1) {
      gsap.from(heroH1, {
        y: 100,
        duration: 1.2,
        ease: "power4.out",
      });
    }

    if (heroP) {
      gsap.from(heroP, {
        opacity: 0,
        y: 100,
        duration: 1.2,
        delay: 0.3,
        ease: "power4.out",
      });
    }

    if (modeSelector) {
      gsap.from(modeSelector, {
        opacity: 0,
        y: 50,
        duration: 1,
        delay: 0.6,
        ease: "power3.out",
      });
    }

    if (userTypeSelector) {
      gsap.from(userTypeSelector, {
        opacity: 0,
        y: 50,
        duration: 1,
        delay: 0.9,
        ease: "power3.out",
      });
    }

    if (ratingContainer) {
      gsap.from(ratingContainer, {
        opacity: 0,
        y: 50,
        duration: 1,
        delay: 1.2,
        ease: "power3.out",
      });
    }
  }

  // Section reveal animations
  const sections = document.querySelectorAll(".content-section");
  if (sections.length > 0) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const section = entry.target;
            animateSectionContent(section);
          }
        });
      },
      {
        threshold: 0.2,
      }
    );

    sections.forEach((section) => {
      observer.observe(section);
    });
  }

  function animateSectionContent(section) {
    // Section title animation
    const title = section.querySelector(".section-title");
    if (title) {
      gsap.to(title, {
        opacity: 1,
        duration: 1,
        ease: "power3.out",
        onComplete: () => {
          title.classList.add("visible");
        },
      });
    }

    // Creator card animation
    const creatorCard = section.querySelector(".creator-card");
    if (creatorCard) {
      gsap.to(creatorCard, {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: "power3.out",
      });
    }

    // Academy section animation
    if (section.id === "the-academy") {
      const timeline = section.querySelector(".education-timeline");
      const cards = section.querySelectorAll(".education-card");

      // Add visible class to timeline
      gsap.to(timeline, {
        opacity: 1,
        duration: 0.8,
        ease: "power2.out",
        onComplete: () => {
          timeline.classList.add("visible");
        },
      });

      // Animate each card with a delay
      cards.forEach((card, index) => {
        gsap.to(card, {
          opacity: 1,
          x: 0,
          duration: 0.8,
          delay: index * 0.2,
          ease: "power2.out",
          onComplete: () => {
            card.classList.add("visible");
          },
        });
      });
    }

    // Skills carousel animation
    const skillCards = section.querySelectorAll(".skill-card");
    if (skillCards.length > 0) {
      gsap.to(skillCards, {
        opacity: 1,
        y: 0,
        rotation: 0,
        duration: 1,
        stagger: 0.2,
        ease: "back.out(1.7)",
      });
    }

    // Certificates container animation
    const certificatesContainer = section.querySelector(
      ".certificates-container"
    );
    if (certificatesContainer) {
      gsap.to(certificatesContainer, {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: "power3.out",
      });
    }

    const certificateCards = section.querySelectorAll(".certificate-card");
    if (certificateCards.length > 0) {
      gsap.to(certificateCards, {
        opacity: 1,
        y: 0,
        duration: 1,
        stagger: 0.15,
        ease: "power3.out",
      });
    }
  }

  // Project and certificate card hover effects
  document
    .querySelectorAll(".project-card, .certificate-card")
    .forEach((card) => {
      card.addEventListener("mouseenter", () => {
        gsap.to(card, {
          scale: 1.05,
          boxShadow: "0 10px 20px rgba(229, 9, 20, 0.3)",
          duration: 0.3,
          ease: "power2.out",
        });
      });
      card.addEventListener("mouseleave", () => {
        gsap.to(card, {
          scale: 1,
          boxShadow: "none",
          duration: 0.3,
          ease: "power2.out",
        });
      });
    });

  // Modal animation
  document.querySelectorAll(".modal").forEach((modal) => {
    modal.addEventListener("show.bs.modal", () => {
      const modalContent = modal.querySelector(".modal-content");
      const modalBody = modal.querySelector(".modal-body");

      // Apply focus trap
      trapFocus(modal);

      if (modalContent) {
        gsap.to(modalContent, {
          scale: 1,
          opacity: 1,
          duration: 0.5,
          ease: "back.out(1.7)",
        });
      }

      if (modalBody) {
        const modalImage = modalBody.querySelector("img");
        if (modalImage) {
          gsap.to(modalImage, {
            scale: 1,
            opacity: 1,
            duration: 0.7,
            ease: "power3.out",
            delay: 0.2,
          });
        }

        const modalText = modalBody.querySelectorAll("p, ul");
        if (modalText.length > 0) {
          gsap.to(modalText, {
            opacity: 1,
            y: 0,
            duration: 0.7,
            stagger: 0.1,
            ease: "power3.out",
            delay: 0.4,
          });
        }
      }
    });
  });

  // Footer animation
  const footer = document.querySelector(".footer");
  if (footer) {
    gsap.to(footer, {
      opacity: 1,
      y: 0,
      duration: 1,
      ease: "power3.out",
      scrollTrigger: {
        trigger: ".footer",
        start: "top 80%",
      },
    });
  }

  // Struggle Meter Interactive Logic
  const slider = document.getElementById("unofficialRatingSlider");
  const output = document.getElementById("unofficialRatingOutput");

  if (slider && output) {
    const message = output.querySelector(".status-message");
    const details = output.querySelector(".status-details");
    const emojis = document.querySelectorAll(".emoji-track span");
    const feedbackBtn = document.getElementById("generateFeedback");
    const dynamicFeedback = document.getElementById("dynamicFeedback");

    // Funny messages for different levels
    const struggleMessages = [
      {
        level: 0,
        msg: "Just opened IDE",
        detail: "(Already questioning life choices)",
      },
      {
        level: 20,
        msg: "Hello World compiles!",
        detail: "(Celebration lasts 3 seconds)",
      },
      { level: 42, msg: "The Answer to Life", detail: "(But not your bugs)" },
      {
        level: 60,
        msg: "Code works but no idea why",
        detail: "(Don't touch anything!)",
      },
      {
        level: 75,
        msg: "Google thinks I'm a bot",
        detail: "(Search limit reached)",
      },
      {
        level: 90,
        msg: "Became Stack Overflow",
        detail: "(People now ask YOU questions)",
      },
      {
        level: 100,
        msg: "Transcended to Digital Deity",
        detail: "(Your code has its own religion)",
      },
    ];

    // Developer excuses
    const devExcuses = [
      "It was working yesterday!",
      "That's not a bug, it's a feature",
      "Must be a browser issue",
      "The compiler hates me",
      "I blame the framework",
      "This worked in the tutorial",
      "The cosmic rays did it",
      "My rubber duck didn't warn me",
      "The deadline moved my code",
      "GitHub Copilot betrayed me",
    ];

    slider.addEventListener("input", function () {
      const value = this.value;

      // Update emoji reaction
      emojis.forEach((emoji) => emoji.classList.remove("emoji-highlight"));
      if (value < 20) emojis[0]?.classList.add("emoji-highlight");
      else if (value < 40) emojis[1]?.classList.add("emoji-highlight");
      else if (value < 60) emojis[2]?.classList.add("emoji-highlight");
      else if (value < 80) emojis[3]?.classList.add("emoji-highlight");
      else emojis[4]?.classList.add("emoji-highlight");

      // Find appropriate message
      const msgObj = struggleMessages.reduce((prev, curr) =>
        value >= curr.level ? curr : prev
      );

      if (message) message.textContent = `You're at ${value}: ${msgObj.msg}`;
      if (details) details.textContent = msgObj.detail;

      // Color change effect
      output.style.background = `rgba(229, 9, 20, ${value / 200})`;
      output.style.transition = "background 0.5s";
    });

    // Generate random developer excuse
    if (feedbackBtn && dynamicFeedback) {
      feedbackBtn.addEventListener("click", function () {
        const randomExcuse =
          devExcuses[Math.floor(Math.random() * devExcuses.length)];

        dynamicFeedback.textContent = `"${randomExcuse}"`;
        dynamicFeedback.classList.remove("hidden");

        // Bounce animation
        gsap.from(dynamicFeedback, {
          y: 20,
          opacity: 0,
          duration: 0.5,
          ease: "back.out(1.7)",
        });

        // Hide after delay
        setTimeout(() => {
          gsap.to(dynamicFeedback, {
            opacity: 0,
            y: -10,
            duration: 0.5,
            delay: 3,
            onComplete: () => dynamicFeedback.classList.add("hidden"),
          });
        }, 4000);
      });
    }
  }

  // Enhanced mode selector functionality
  const officialModeBtn = document.getElementById("officialModeBtn");
  const unofficialModeBtn = document.getElementById("unofficialModeBtn");
  const officialContent = document.getElementById("officialContent");
  const unofficialContent = document.getElementById("unofficialContent");
  const warningDialog = document.getElementById("warningDialog");
  const confirmBtn = document.getElementById("confirmBtn");
  const cancelBtn = document.getElementById("cancelBtn");
  const recruiterBtn = document.getElementById("recruiterBtn");
  const dramaBtn = document.getElementById("dramaBtn");
  const officialScrollHint = document.getElementById("officialScrollHint");
  const unofficialScrollHint = document.getElementById("unofficialScrollHint");
  const mainNavbar = document.getElementById("mainNavbar");

  // Set default mode
  let currentMode = "official";

  // Official mode button click
  if (
    officialModeBtn &&
    unofficialModeBtn &&
    officialContent &&
    unofficialContent
  ) {
    officialModeBtn.addEventListener("click", () => {
      if (currentMode !== "official") {
        officialModeBtn.classList.add("active");
        unofficialModeBtn.classList.remove("active");
        officialContent.style.display = "block";
        unofficialContent.style.display = "none";
        currentMode = "official";

        if (officialScrollHint) officialScrollHint.style.display = "block";
        if (unofficialScrollHint) unofficialScrollHint.style.display = "none";
        if (mainNavbar) mainNavbar.style.display = "flex";

        // Scroll to top with animation
        gsap.to(window, {
          scrollTo: { y: 0, autoKill: false },
          duration: 1,
          ease: "power3.out",
        });

        // Show a quick indicator of where to go
        const indicator = document.createElement("div");
        indicator.style.position = "fixed";
        indicator.style.bottom = "20px";
        indicator.style.left = "50%";
        indicator.style.transform = "translateX(-50%)";
        indicator.style.backgroundColor = "var(--netflix-red)";
        indicator.style.color = "var(--netflix-white)";
        indicator.style.padding = "10px 20px";
        indicator.style.borderRadius = "4px";
        indicator.style.zIndex = "9999";
        indicator.style.fontFamily = '"Netflix Sans", sans-serif';
        indicator.textContent = "↓ Scroll down to explore ↓";
        document.body.appendChild(indicator);

        // Remove after animation
        gsap.to(indicator, {
          opacity: 0,
          y: 20,
          duration: 0.5,
          delay: 2,
          onComplete: () => indicator.remove(),
        });
      }
    });

    // Unofficial mode button click
    unofficialModeBtn.addEventListener("click", () => {
      if (currentMode !== "unofficial" && warningDialog) {
        warningDialog.showModal();
        trapFocus(warningDialog);
      }
    });
  }

  // Simple lightbox implementation
  document.querySelectorAll(".confession-btn").forEach((btn) => {
    btn.addEventListener("click", function () {
      const memeUrl = this.getAttribute("data-meme");
      const memeContainer =
        this.closest(".confession-card")?.querySelector(".confession-meme");

      if (memeContainer && memeUrl) {
        memeContainer.innerHTML = `
          <img src="${memeUrl}" 
               style="max-width:180px; max-height:120px; cursor:pointer;"
               onclick="window.open('${memeUrl}', '_blank')">
        `;
      }
    });
  });

  // Confession meme toggles
  document.querySelectorAll(".confession-btn").forEach((btn) => {
    btn.addEventListener("click", function () {
      const memeContainer =
        this.closest(".confession-card")?.querySelector(".confession-meme");
      const memeUrl = this.getAttribute("data-meme");

      if (!memeContainer) return;

      if (this.classList.contains("active")) {
        // Hide meme
        this.classList.remove("active");
        memeContainer.classList.remove("show");
        memeContainer.innerHTML = "";
      } else {
        // Show meme
        this.classList.add("active");
        memeContainer.innerHTML = `
            <img src="${memeUrl}" 
                 alt="Confession meme" 
                 class="inline-meme"
                 style="max-width: 100%; border-radius: 8px; border: 2px solid var(--netflix-red);">
            <p class="meme-caption">${
              this.querySelector(".btn-text")?.textContent.replace(
                "SHOW ",
                ""
              ) || ""
            }</p>
          `;
        memeContainer.classList.add("show");

        // Bounce animation
        gsap.to(this, {
          y: -5,
          duration: 0.2,
          yoyo: true,
          repeat: 1,
          ease: "power1.out",
        });
      }
    });
  });

  // Random confession glow effect
  const confessionCards = document.querySelectorAll(".confession-card");
  if (confessionCards.length > 0) {
    setInterval(() => {
      const randomCard =
        confessionCards[Math.floor(Math.random() * confessionCards.length)];
      gsap.to(randomCard, {
        boxShadow: "0 0 20px rgba(229, 9, 20, 0.5)",
        duration: 0.5,
        yoyo: true,
        repeat: 1,
      });
    }, 3000);
  }

  // Recruiter button click
  if (recruiterBtn && officialModeBtn) {
    recruiterBtn.addEventListener("click", () => {
      officialModeBtn.click();

      // Scroll to creator section
      setTimeout(() => {
        gsap.to(window, {
          scrollTo: { y: "#creator", offsetY: 70, autoKill: false },
          duration: 1,
          ease: "power3.out",
        });
      }, 100);
    });
  }

  // Drama button click
  if (dramaBtn && unofficialModeBtn) {
    dramaBtn.addEventListener("click", () => {
      unofficialModeBtn.click();
    });
  }

  // Warning dialog buttons
  if (warningDialog && confirmBtn && cancelBtn) {
    // Confirm button in warning dialog
    confirmBtn.addEventListener("click", () => {
      warningDialog.close();
      if (officialModeBtn) officialModeBtn.classList.remove("active");
      if (unofficialModeBtn) unofficialModeBtn.classList.add("active");
      if (officialContent) officialContent.style.display = "none";
      if (unofficialContent) unofficialContent.style.display = "block";
      currentMode = "unofficial";
      if (officialScrollHint) officialScrollHint.style.display = "none";
      if (unofficialScrollHint) unofficialScrollHint.style.display = "block";
      if (mainNavbar) mainNavbar.style.display = "none";

      // Scroll to top with animation
      gsap.to(window, {
        scrollTo: { y: 0, autoKill: false },
        duration: 1,
        ease: "power3.out",
      });

      // Show a funny indicator
      const indicator = document.createElement("div");
      indicator.style.position = "fixed";
      indicator.style.bottom = "20px";
      indicator.style.left = "50%";
      indicator.style.transform = "translateX(-50%)";
      indicator.style.backgroundColor = "var(--netflix-red)";
      indicator.style.color = "var(--netflix-white)";
      indicator.style.padding = "10px 20px";
      indicator.style.borderRadius = "4px";
      indicator.style.zIndex = "9999";
      indicator.style.fontFamily = '"Netflix Sans", sans-serif';
      indicator.textContent = "↓ Buckle up for the unfiltered truth ↓";
      document.body.appendChild(indicator);

      // Remove after animation
      gsap.to(indicator, {
        opacity: 0,
        y: 20,
        duration: 0.5,
        delay: 2,
        onComplete: () => indicator.remove(),
      });
    });

    // Cancel button in warning dialog
    cancelBtn.addEventListener("click", () => {
      warningDialog.close();
      if (officialModeBtn) officialModeBtn.click();
    });
  }

  // Zentron button toggle
  const ZentronBtn = document.getElementById("ZentronBtn");
  const ZentronTruth = document.getElementById("ZentronTruth");
  if (ZentronBtn && ZentronTruth) {
    ZentronBtn.addEventListener("click", function () {
      ZentronTruth.style.display =
        ZentronTruth.style.display === "none" ? "block" : "none";
      this.textContent =
        ZentronTruth.style.display === "none"
          ? "CLICK FOR Zentron'S DIARY ENTRIES"
          : "OK THAT'S ENOUGH";
    });
  }

  // Check for broken images
  console.log("Script loaded");
  document.querySelectorAll("img").forEach((img) => {
    if (!img.complete) console.log("Broken image:", img.src);
  });

  // Toggle buttons
  document.querySelectorAll(".savage-btn").forEach((btn) => {
    btn.addEventListener("click", () => {
      const target = btn.nextElementSibling;
      if (target) {
        target.style.display =
          target.style.display === "none" ? "block" : "none";
      }
    });
  });

  // Truth button toggle
  const truthBtn = document.getElementById("truthBtn");
  const truthText = document.getElementById("truthText");
  if (truthBtn && truthText) {
    truthBtn.addEventListener("click", function () {
      truthText.style.display =
        truthText.style.display === "none" ? "block" : "none";
      this.textContent =
        truthText.style.display === "none"
          ? "CLICK HERE FOR THE REAL ANSWER"
          : "OK MAYBE TOO REAL";
    });
  }

  // Input field focus effects
  document
    .querySelectorAll(".form-group input, .form-group textarea")
    .forEach((input) => {
      input.addEventListener("focus", function () {
        const underline = this.nextElementSibling;
        if (underline) underline.style.width = "100%";
      });

      input.addEventListener("blur", function () {
        const underline = this.nextElementSibling;
        if (underline && !this.value) {
          underline.style.width = "0";
        }
      });
    });
});

// Add this to your script.js file
document.addEventListener("DOMContentLoaded", function () {
  // Form submission handling
  const form = document.querySelector(".transmission-form");
  const successMessage = document.getElementById("transmissionSuccess");

  if (form) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();

      // Show loading state
      const submitBtn = form.querySelector(".transmit-btn");
      submitBtn.innerHTML =
        '<i class="fas fa-spinner fa-spin"></i> TRANSMITTING...';

      // Simulate transmission (replace with actual form submission)
      fetch(form.action, {
        method: "POST",
        body: new FormData(form),
        headers: {
          Accept: "application/json",
        },
      })
        .then((response) => {
          if (response.ok) {
            // Show success message
            form.style.display = "none";
            successMessage.style.display = "flex";

            // Animate success message
            gsap.to(successMessage, {
              opacity: 1,
              scale: 1,
              duration: 0.7,
              ease: "back.out(1.7)",
            });

            // Reset form
            form.reset();
          } else {
            throw new Error("Network response was not ok");
          }
        })
        .catch((error) => {
          console.error("Error:", error);
          submitBtn.textContent = "TRANSMISSION FAILED - RETRY";
        })
        .finally(() => {
          // Reset button after 3 seconds
          setTimeout(() => {
            submitBtn.innerHTML =
              '<span>INITIATE TRANSMISSION</span><div class="signal-strength"><div class="signal-bar"></div><div class="signal-bar"></div><div class="signal-bar"></div><div class="signal-bar"></div></div>';
            form.style.display = "block";
            successMessage.style.display = "none";
            successMessage.style.opacity = "0";
            successMessage.style.transform = "scale(0.8)";
          }, 3000);
        });
    });
  }
});

// Meme Modal System
const memeModal = document.getElementById("memeModal");
const memeModalImage = document.getElementById("memeModalImage");
const memeModalTitle = document.getElementById("memeModalTitle");
const memeModalClose = document.getElementById("memeModalClose");

let isModalOpen = false;
let closeTimeout;

// Open meme modal
function openMemeModal(src, title) {
  // Clear any pending close timeouts
  clearTimeout(closeTimeout);

  // Set content
  memeModalImage.src = src;
  memeModalTitle.textContent = title;

  // Show modal
  memeModal.style.display = "flex";
  setTimeout(() => {
    memeModal.classList.add("active");
    isModalOpen = true;
  }, 10);

  // Disable body scroll
  document.body.style.overflow = "hidden";
}

// Close meme modal
function closeMemeModal() {
  memeModal.classList.remove("active");

  // Wait for animation to complete before hiding
  closeTimeout = setTimeout(() => {
    memeModal.style.display = "none";
    memeModalImage.src = "";
    memeModalTitle.textContent = "";
    isModalOpen = false;
    document.body.style.overflow = "";
  }, 300);
}

// Click handlers for all meme triggers
document.querySelectorAll("[data-meme]").forEach((trigger) => {
  trigger.addEventListener("click", function (e) {
    e.preventDefault();
    const src = this.getAttribute("data-meme");
    const title = this.getAttribute("data-title") || "Meme";

    if (src && !isModalOpen) {
      openMemeModal(src, title);
    }
  });
});

// Close button
memeModalClose.addEventListener("click", closeMemeModal);

// Close when clicking outside content
memeModal.addEventListener("click", function (e) {
  if (e.target === memeModal) {
    closeMemeModal();
  }
});

// Close with Escape key
document.addEventListener("keydown", function (e) {
  if (e.key === "Escape" && isModalOpen) {
    closeMemeModal();
  }
});

// Certificate hover effect enhancement
document.querySelectorAll(".certificate-card").forEach((card) => {
  card.addEventListener("mouseenter", () => {
    const img = card.querySelector("img");
    gsap.to(img, {
      scale: 1.1,
      duration: 0.5,
      ease: "power2.out",
    });
  });

  card.addEventListener("mouseleave", () => {
    const img = card.querySelector("img");
    gsap.to(img, {
      scale: 1,
      duration: 0.5,
      ease: "power2.out",
    });
  });
});
// Mobile menu toggle
document.addEventListener("DOMContentLoaded", () => {
  const menuToggle = document.createElement("button");
  menuToggle.className = "mobile-menu-toggle";
  menuToggle.innerHTML = "☰";
  document.body.prepend(menuToggle);

  menuToggle.addEventListener("click", () => {
    document.body.classList.toggle("menu-open");
  });
});

// Make sure this is in your script.js or add it
document.addEventListener("DOMContentLoaded", function () {
  // Handle confession card buttons
  const confessionBtns = document.querySelectorAll(".confession-btn");

  confessionBtns.forEach((btn) => {
    btn.addEventListener("click", function () {
      const memeUrl = this.getAttribute("data-meme");
      const memeContainer =
        this.closest(".confession-card").querySelector(".confession-meme");

      if (memeContainer.innerHTML === "") {
        memeContainer.innerHTML = `<img src="${memeUrl}" class="inline-meme" style="max-width: 100%; margin-top: 1rem;">`;
      } else {
        memeContainer.innerHTML = "";
      }

      // Toggle active state
      this.classList.toggle("active");
    });
  });

  // Handle skill reveal buttons
  const skillRevealBtns = document.querySelectorAll(".skill-reveal-btn");

  skillRevealBtns.forEach((btn) => {
    btn.addEventListener("click", function () {
      const skillMeme =
        this.closest(".skill-meter").querySelector(".skill-meme");

      if (
        skillMeme.style.display === "none" ||
        skillMeme.style.display === ""
      ) {
        skillMeme.style.display = "block";
      } else {
        skillMeme.style.display = "none";
      }

      // Toggle active state
      this.classList.toggle("active");
    });
  });

  // Struggle meter interaction
  const ratingSlider = document.getElementById("unofficialRatingSlider");
  const ratingOutput = document.getElementById("unofficialRatingOutput");
  const statusMessage = ratingOutput.querySelector(".status-message");
  const statusDetails = ratingOutput.querySelector(".status-details");
  const generateFeedbackBtn = document.getElementById("generateFeedback");
  const dynamicFeedback = document.getElementById("dynamicFeedback");

  const struggleMessages = [
    {
      level: 0,
      message: "Just installed VS Code",
      details: "(Still figuring out how to exit Vim)",
    },
    { level: 20, message: "Hello World works!", details: "(Most of the time)" },
    {
      level: 40,
      message: "The bugs are winning",
      details: "(But you're putting up a good fight)",
    },
    {
      level: 60,
      message: "Professional Googler",
      details: "(Stack Overflow contributor in training)",
    },
    {
      level: 80,
      message: "Code sometimes works",
      details: "(When the planets align)",
    },
    {
      level: 100,
      message: "Senior Debugger",
      details: "(Master of console.log)",
    },
  ];

  const excuses = [
    "It worked on my machine!",
    "That's not a bug, it's a feature!",
    "I was just following the documentation!",
    "The compiler is clearly wrong about this",
    "This code was written under duress",
    "The requirements changed... last year",
    "I'm pretty sure this is someone else's fault",
    "That's not a bug, it's an undocumented feature",
    "It's a hardware problem",
    "You must have the wrong version",
    "That behavior is by design",
    "It's a known issue with the known issues list",
    "That's not a bug, it's a design limitation",
  ];

  ratingSlider.addEventListener("input", function () {
    const value = parseInt(this.value);
    let message = "";
    let details = "";

    for (let i = 0; i < struggleMessages.length; i++) {
      if (value >= struggleMessages[i].level) {
        message = struggleMessages[i].message;
        details = struggleMessages[i].details;
      }
    }

    statusMessage.textContent = `You're at ${value}: ${message}`;
    statusDetails.textContent = details;
  });

  generateFeedbackBtn.addEventListener("click", function () {
    const randomExcuse = excuses[Math.floor(Math.random() * excuses.length)];
    dynamicFeedback.textContent = `"${randomExcuse}"`;
    dynamicFeedback.classList.remove("hidden");

    // Hide after 5 seconds
    setTimeout(() => {
      dynamicFeedback.classList.add("hidden");
    }, 5000);
  });
});
