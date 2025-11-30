// Custom Cursor
const cursor = document.getElementById("cursor")
const cursorFollower = document.getElementById("cursor-follower")

if (cursor && cursorFollower) {
  document.addEventListener("mousemove", (e) => {
    cursor.style.left = e.clientX - 10 + "px"
    cursor.style.top = e.clientY - 10 + "px"

    setTimeout(() => {
      cursorFollower.style.left = e.clientX - 20 + "px"
      cursorFollower.style.top = e.clientY - 20 + "px"
    }, 100)
  })

  // Cursor effects on interactive elements
  const interactiveElements = document.querySelectorAll(
    "a, button, input, textarea, select, .project-card, .service-card",
  )

  interactiveElements.forEach((el) => {
    el.addEventListener("mouseenter", () => {
      cursor.style.transform = "scale(1.5)"
      cursorFollower.style.transform = "scale(1.5)"
      cursorFollower.style.borderColor = "rgba(34, 211, 238, 0.8)"
    })

    el.addEventListener("mouseleave", () => {
      cursor.style.transform = "scale(1)"
      cursorFollower.style.transform = "scale(1)"
      cursorFollower.style.borderColor = "rgba(34, 211, 238, 0.5)"
    })
  })
}

// Mobile Menu Toggle
const menuToggle = document.getElementById("menu-toggle")
const mobileMenu = document.getElementById("mobile-menu")
const line1 = document.getElementById("line1")
const line2 = document.getElementById("line2")
const line3 = document.getElementById("line3")
const mobileNavLinks = document.querySelectorAll(".mobile-nav-link")

if (menuToggle && mobileMenu) {
  menuToggle.addEventListener("click", () => {
    mobileMenu.classList.toggle("active")

    // Animate hamburger to X
    if (mobileMenu.classList.contains("active")) {
      line1.style.transform = "rotate(45deg) translate(5px, 5px)"
      line2.style.opacity = "0"
      line3.style.transform = "rotate(-45deg) translate(5px, -5px)"
      line3.style.width = "24px"
    } else {
      line1.style.transform = "rotate(0) translate(0, 0)"
      line2.style.opacity = "1"
      line3.style.transform = "rotate(0) translate(0, 0)"
      line3.style.width = "16px"
    }
  })

  // Close mobile menu when clicking a link
  mobileNavLinks.forEach((link) => {
    link.addEventListener("click", () => {
      mobileMenu.classList.remove("active")
      line1.style.transform = "rotate(0) translate(0, 0)"
      line2.style.opacity = "1"
      line3.style.transform = "rotate(0) translate(0, 0)"
      line3.style.width = "16px"
    })
  })
}

// Counter Animation
const counters = document.querySelectorAll(".counter")
const counterObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const counter = entry.target
        const target = Number.parseInt(counter.getAttribute("data-target"))
        let count = 0
        const duration = 2000
        const increment = target / (duration / 16)

        const updateCounter = () => {
          count += increment
          if (count < target) {
            counter.textContent = Math.ceil(count)
            requestAnimationFrame(updateCounter)
          } else {
            counter.textContent = target + (target === 98 ? "%" : "+")
          }
        }

        updateCounter()
        counterObserver.unobserve(counter)
      }
    })
  },
  { threshold: 0.5 },
)

counters.forEach((counter) => counterObserver.observe(counter))

// Smooth reveal animations on scroll
const revealElements = document.querySelectorAll(".project-card, .service-card, section > div")
const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = "1"
        entry.target.style.transform = "translateY(0)"
      }
    })
  },
  { threshold: 0.1, rootMargin: "0px 0px -50px 0px" },
)

revealElements.forEach((el) => {
  el.style.opacity = "0"
  el.style.transform = "translateY(20px)"
  el.style.transition = "opacity 0.6s ease, transform 0.6s ease"
  revealObserver.observe(el)
})

// Navigation background on scroll
const nav = document.querySelector("nav")
window.addEventListener("scroll", () => {
  if (window.scrollY > 100) {
    nav.style.background = "rgba(10, 10, 11, 0.9)"
    nav.style.backdropFilter = "blur(10px)"
  } else {
    nav.style.background = "transparent"
    nav.style.backdropFilter = "none"
  }
})

// Form submission handling
const contactForm = document.getElementById("contact-form");

if (contactForm) {
  contactForm.addEventListener("submit", function (e) {
    e.preventDefault();

    const formData = new FormData(contactForm);
    const data = Object.fromEntries(formData);

    const button = contactForm.querySelector('button[type="submit"]');
    const originalText = button.textContent;

    button.textContent = "Sending...";
    button.style.backgroundColor = "#3b82f6";

    emailjs
      .send("service_d1co4lk", "template_y0d0qsj", data)
      .then(() => {
        button.textContent = "Message Sent!";
        button.style.backgroundColor = "#10b981";

        setTimeout(() => {
          button.textContent = originalText;
          button.style.backgroundColor = "";
          contactForm.reset();
        }, 3000);
      })
      .catch((err) => {
        console.error("EmailJS Error:", err);
        button.textContent = "Error! Try Again";
        button.style.backgroundColor = "#ef4444";

        setTimeout(() => {
          button.textContent = originalText;
          button.style.backgroundColor = "";
        }, 3000);
      });
  });
}

// Parallax effect for floating elements
document.addEventListener("mousemove", (e) => {
  const floatingElements = document.querySelectorAll(".animate-float, .animate-float-delayed")
  const x = (e.clientX / window.innerWidth - 0.5) * 20
  const y = (e.clientY / window.innerHeight - 0.5) * 20

  floatingElements.forEach((el, index) => {
    const speed = (index + 1) * 0.5
    el.style.transform = `translate(${x * speed}px, ${y * speed}px)`
  })
})

// Active navigation link highlight
const sections = document.querySelectorAll("section[id]")
const navLinks = document.querySelectorAll(".nav-link")

window.addEventListener("scroll", () => {
  let current = ""

  sections.forEach((section) => {
    const sectionTop = section.offsetTop
    const sectionHeight = section.clientHeight

    if (scrollY >= sectionTop - 200) {
      current = section.getAttribute("id")
    }
  })

  navLinks.forEach((link) => {
    link.classList.remove("text-foreground")
    if (link.getAttribute("href") === `#${current}`) {
      link.classList.add("text-foreground")
    }
  })
})

// Add ripple effect to buttons
document.querySelectorAll("button, .project-card, .service-card").forEach((el) => {
  el.addEventListener("click", function (e) {
    const ripple = document.createElement("span")
    ripple.classList.add("ripple")

    const rect = this.getBoundingClientRect()
    const size = Math.max(rect.width, rect.height)

    ripple.style.width = ripple.style.height = size + "px"
    ripple.style.left = e.clientX - rect.left - size / 2 + "px"
    ripple.style.top = e.clientY - rect.top - size / 2 + "px"

    this.style.position = "relative"
    this.style.overflow = "hidden"
    this.appendChild(ripple)

    setTimeout(() => ripple.remove(), 600)
  })
})
