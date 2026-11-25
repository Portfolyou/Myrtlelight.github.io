const menuToggle = document.getElementById("menuToggle");
const navLinks = document.getElementById("navLinks");
const navItems = document.querySelectorAll(".nav-links a");

// MOBILE NAVIGATION
menuToggle.addEventListener("click", () => {
    const isOpen = navLinks.classList.toggle("open");

    menuToggle.setAttribute("aria-expanded", String(isOpen));
    menuToggle.textContent = isOpen ? "✕" : "☰";
});

navItems.forEach((link) => {
    link.addEventListener("click", () => {
        navLinks.classList.remove("open");
        menuToggle.setAttribute("aria-expanded", "false");
        menuToggle.textContent = "☰";
    });
});

// TYPING EFFECT
const typingText = document.getElementById("typingText");
const words = [
    "MYRTLELIGHT GALLARDO"
];

let wordIndex = 0;
let charIndex = 0;
let deleting = false;

function typeEffect() {
    const currentWord = words[wordIndex];

    typingText.textContent = currentWord.substring(0, charIndex);

    if (!deleting) {
        charIndex++;

        if (charIndex > currentWord.length) {
            deleting = true;
            setTimeout(typeEffect, 1200);
            return;
        }
    } else {
        charIndex--;

        if (charIndex < 0) {
            charIndex = 0;
            deleting = false;
            wordIndex = (wordIndex + 1) % words.length;
        }
    }

    setTimeout(typeEffect, deleting ? 45 : 90);
}

typeEffect();

// SCROLL ANIMATIONS
const revealElements = document.querySelectorAll(".reveal");

if ("IntersectionObserver" in window) {
    const revealObserver = new IntersectionObserver(
        (entries, observer) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add("visible");
                    observer.unobserve(entry.target);
                }
            });
        },
        { threshold: 0.12 }
    );

    revealElements.forEach((element) => {
        revealObserver.observe(element);
    });
} else {
    revealElements.forEach((element) => {
        element.classList.add("visible");
    });
}

// ACTIVE NAVIGATION
const sections = document.querySelectorAll("main section[id]");

if ("IntersectionObserver" in window) {
    const sectionObserver = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    navItems.forEach((link) => {
                        link.classList.toggle(
                            "active",
                            link.getAttribute("href") ===
                                `#${entry.target.id}`
                        );
                    });
                }
            });
        },
        { rootMargin: "-30% 0px -60% 0px" }
    );

    sections.forEach((section) => {
        sectionObserver.observe(section);
    });
}

// AUTOMATIC FOOTER YEAR
document.getElementById("year").textContent =
    new Date().getFullYear();

// CONTACT FORM
const contactForm = document.getElementById("contactForm");
const formNote = document.getElementById("formNote");

// Replace with your real email address.
const recipientEmail = "your.email@example.com";

contactForm.addEventListener("submit", (event) => {
    event.preventDefault();

    if (recipientEmail === "your.email@example.com") {
        formNote.textContent =
            "Please replace the example email address in script.js.";
        return;
    }

    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const message = document.getElementById("message").value.trim();

    const subject = encodeURIComponent(
        `Portfolio inquiry from ${name}`
    );

    const body = encodeURIComponent(
        `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`
    );

    formNote.textContent =
        "Opening your email application. Send the message there.";

    window.location.href =
        `mailto:${recipientEmail}?subject=${subject}&body=${body}`;
});
