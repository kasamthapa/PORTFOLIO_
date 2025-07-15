// Enhanced Custom Cursor
const cursor = document.querySelector(".cursor")
const cursorFollower = document.querySelector(".cursor-follower")

let mouseX = 0
let mouseY = 0
let cursorX = 0
let cursorY = 0

document.addEventListener("mousemove", (e) => {
  mouseX = e.clientX
  mouseY = e.clientY
})

function animateCursor() {
  const speed = 0.2
  cursorX += (mouseX - cursorX) * speed
  cursorY += (mouseY - cursorY) * speed

  if (cursor) {
    cursor.style.left = mouseX + "px"
    cursor.style.top = mouseY + "px"
  }

  if (cursorFollower) {
    cursorFollower.style.left = cursorX + "px"
    cursorFollower.style.top = cursorY + "px"
  }

  requestAnimationFrame(animateCursor)
}

// Only initialize cursor on non-touch devices
if (!("ontouchstart" in window)) {
  animateCursor()
}

// Enhanced cursor hover effects
document
  .querySelectorAll("a, button, .tech-card, .skill-category, .project-card, .contact-method, .stat-card")
  .forEach((el) => {
    el.addEventListener("mouseenter", () => {
      if (cursor && cursorFollower) {
        cursor.style.transform = "scale(1.5)"
        cursor.style.backgroundColor = "var(--red-light)"
        cursorFollower.style.transform = "scale(1.5)"
        cursorFollower.style.borderColor = "var(--red-light)"
      }
    })

    el.addEventListener("mouseleave", () => {
      if (cursor && cursorFollower) {
        cursor.style.transform = "scale(1)"
        cursor.style.backgroundColor = "var(--red-primary)"
        cursorFollower.style.transform = "scale(1)"
        cursorFollower.style.borderColor = "var(--red-primary)"
      }
    })
  })

// Enhanced Loading Screen
window.addEventListener("load", () => {
  setTimeout(() => {
    const loadingScreen = document.getElementById("loadingScreen")
    if (loadingScreen) {
      loadingScreen.classList.add("hidden")
    }
  }, 3500)
})

// Enhanced Mobile Menu
const mobileMenuBtn = document.getElementById("mobileMenuBtn")
const mobileMenu = document.getElementById("mobileMenu")
const mobileMenuClose = document.getElementById("mobileMenuClose")

function toggleMobileMenu() {
  mobileMenu.classList.toggle("active")
  mobileMenuBtn.classList.toggle("active")
  document.body.style.overflow = mobileMenu.classList.contains("active") ? "hidden" : "auto"
}

mobileMenuBtn.addEventListener("click", toggleMobileMenu)
mobileMenuClose.addEventListener("click", toggleMobileMenu)

// Close mobile menu when clicking on links
document.querySelectorAll(".mobile-nav-link").forEach((link) => {
  link.addEventListener("click", () => {
    mobileMenu.classList.remove("active")
    mobileMenuBtn.classList.remove("active")
    document.body.style.overflow = "auto"
  })
})

// Close mobile menu when clicking outside
document.addEventListener("click", (e) => {
  if (mobileMenu.classList.contains("active") && !mobileMenu.contains(e.target) && !mobileMenuBtn.contains(e.target)) {
    toggleMobileMenu()
  }
})

// Enhanced Navbar Scroll Effect
let lastScrollY = window.scrollY

window.addEventListener("scroll", () => {
  const navbar = document.getElementById("navbar")
  const currentScrollY = window.scrollY

  if (navbar) {
    if (currentScrollY > 100) {
      navbar.classList.add("scrolled")
    } else {
      navbar.classList.remove("scrolled")
    }

    // Hide/show navbar on scroll
    if (currentScrollY > lastScrollY && currentScrollY > 200) {
      navbar.style.transform = "translateY(-100%)"
    } else {
      navbar.style.transform = "translateY(0)"
    }
  }

  lastScrollY = currentScrollY
})

// Enhanced Smooth Scrolling
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault()
    const target = document.querySelector(this.getAttribute("href"))
    if (target) {
      const offsetTop = target.offsetTop - 80 // Account for fixed navbar
      window.scrollTo({
        top: offsetTop,
        behavior: "smooth",
      })
    }
  })
})

// Enhanced Intersection Observer for animations
const observerOptions = {
  threshold: 0.1,
  rootMargin: "0px 0px -50px 0px",
}

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("animate")

      // Trigger progress bar animations for skill items
      if (entry.target.classList.contains("skill-category")) {
        const progressBars = entry.target.querySelectorAll(".skill-progress")
        progressBars.forEach((bar, index) => {
          const width = bar.getAttribute("data-width")
          setTimeout(() => {
            bar.style.width = width + "%"
          }, index * 200)
        })
      }
    }
  })
}, observerOptions)

// Observe elements for animation
document
  .querySelectorAll(
    ".section-title, .section-subtitle, .about-text, .about-visual, .skill-category, .project-card, .contact-info, .contact-form-container",
  )
  .forEach((el) => {
    observer.observe(el)
  })

// Staggered animations for cards
document.querySelectorAll(".skill-category").forEach((card, index) => {
  card.style.transitionDelay = `${index * 0.2}s`
})

document.querySelectorAll(".project-card").forEach((card, index) => {
  card.style.transitionDelay = `${index * 0.3}s`
})

// Enhanced Parallax effect for hero elements
window.addEventListener("scroll", () => {
  const scrolled = window.pageYOffset
  const parallaxElements = document.querySelectorAll(".floating-element")

  parallaxElements.forEach((element, index) => {
    const speed = Number.parseFloat(element.getAttribute("data-speed")) || 0.5
    const yPos = -(scrolled * speed)
    const rotation = scrolled * 0.1
    element.style.transform = `translateY(${yPos}px) rotate(${rotation}deg)`
  })

  // Grid animation speed based on scroll
  const grid = document.querySelector(".hero-grid")
  if (grid) {
    const speed = Math.max(5, 20 - scrolled * 0.01)
    grid.style.animationDuration = `${speed}s`
  }

  // Hero background parallax
  const heroBg = document.querySelector(".bg-gradient")
  if (heroBg) {
    const yPos = scrolled * 0.3
    heroBg.style.transform = `translateY(${yPos}px)`
  }
})

// Enhanced click effects for interactive elements
document.querySelectorAll(".tech-card, .skill-category, .project-card, .contact-method, .stat-card").forEach((card) => {
  card.addEventListener("click", function () {
    this.style.transform = "scale(0.95)"
    setTimeout(() => {
      this.style.transform = ""
    }, 150)
  })
})

// Enhanced stats counter animation
const statsNumbers = document.querySelectorAll(".stat-number")
const statsObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const target = entry.target
        const finalNumber = Number.parseInt(target.getAttribute("data-target"))

        let current = 0
        const increment = finalNumber / 50
        const duration = 2000
        const stepTime = duration / 50

        const timer = setInterval(() => {
          current += increment
          if (current >= finalNumber) {
            current = finalNumber
            clearInterval(timer)
          }

          target.textContent = Math.floor(current)
        }, stepTime)

        statsObserver.unobserve(target)
      }
    })
  },
  { threshold: 0.5 },
)

statsNumbers.forEach((stat) => {
  statsObserver.observe(stat)
})

// Enhanced Contact Form
const contactForm = document.getElementById("contactForm")
if (contactForm) {
  contactForm.addEventListener("submit", async function (e) {
    e.preventDefault()

    const submitBtn = this.querySelector(".submit-btn")
    const btnText = submitBtn.querySelector(".btn-text")
    const btnIcon = submitBtn.querySelector(".btn-icon")
    const originalText = btnText.textContent

    // Show loading state
    submitBtn.classList.add("loading")
    submitBtn.disabled = true

    // Simulate form submission
    await new Promise((resolve) => setTimeout(resolve, 2000))

    // Show success state
    submitBtn.classList.remove("loading")
    btnText.textContent = "Message Sent!"
    btnIcon.textContent = "✓"
    submitBtn.style.background = "linear-gradient(45deg, #10b981, #059669)"

    // Reset form
    this.reset()

    // Reset button after 3 seconds
    setTimeout(() => {
      btnText.textContent = originalText
      btnIcon.textContent = "→"
      submitBtn.disabled = false
      submitBtn.style.background = ""
    }, 3000)
  })
}

// Enhanced keyboard navigation
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape" && mobileMenu.classList.contains("active")) {
    toggleMobileMenu()
  }
})

// Enhanced performance optimizations
let ticking = false

function updateOnScroll() {
  ticking = false
}

window.addEventListener("scroll", () => {
  if (!ticking) {
    requestAnimationFrame(updateOnScroll)
    ticking = true
  }
})

// Preload critical images
function preloadImages() {
  const imageUrls = ["/placeholder.svg?height=300&width=500"]

  imageUrls.forEach((url) => {
    const img = new Image()
    img.src = url
  })
}

// Initialize preloading
preloadImages()

// Enhanced error handling
window.addEventListener("error", (e) => {
  console.error("An error occurred:", e.error)
})

// Enhanced accessibility
document.addEventListener("DOMContentLoaded", () => {
  // Add skip link for screen readers
  const skipLink = document.createElement("a")
  skipLink.href = "#home"
  skipLink.textContent = "Skip to main content"
  skipLink.className = "skip-link"
  skipLink.style.cssText = `
        position: absolute;
        top: -40px;
        left: 6px;
        background: var(--red-primary);
        color: white;
        padding: 8px;
        text-decoration: none;
        z-index: 10000;
        transition: top 0.3s;
        border-radius: 4px;
    `

  skipLink.addEventListener("focus", () => {
    skipLink.style.top = "6px"
  })

  skipLink.addEventListener("blur", () => {
    skipLink.style.top = "-40px"
  })

  document.body.insertBefore(skipLink, document.body.firstChild)
})

// Enhanced touch support
if ("ontouchstart" in window) {
  document.body.classList.add("touch-device")

  // Disable cursor on touch devices
  document.body.style.cursor = "auto"
  if (cursor) cursor.style.display = "none"
  if (cursorFollower) cursorFollower.style.display = "none"

  // Enhanced touch interactions
  document.querySelectorAll(".hero-btn, .nav-hire-btn, .download-btn, .project-btn, .submit-btn").forEach((btn) => {
    btn.addEventListener("touchstart", function () {
      this.style.transform = "scale(0.95)"
    })

    btn.addEventListener("touchend", function () {
      setTimeout(() => {
        this.style.transform = ""
      }, 150)
    })
  })
}

// Initialize everything when DOM is loaded
document.addEventListener("DOMContentLoaded", () => {
  // Add loaded class to body for CSS transitions
  setTimeout(() => {
    document.body.classList.add("loaded")
  }, 100)

  // Initialize animations with proper delays
  const heroElements = document.querySelectorAll(
    ".hero-status, .hero-title, .hero-subtitle, .hero-description, .hero-actions, .hero-social, .hero-stats, .scroll-indicator",
  )

  heroElements.forEach((el, index) => {
    el.style.animationDelay = `${0.3 + index * 0.3}s`
  })
})

// Enhanced scroll-based animations
const scrollAnimations = () => {
  const scrolled = window.pageYOffset
  const windowHeight = window.innerHeight

  // Parallax for background elements
  const bgElements = document.querySelectorAll(".bg-gradient, .bg-pattern, .bg-particles")
  bgElements.forEach((el, index) => {
    const speed = 0.1 + index * 0.05
    el.style.transform = `translateY(${scrolled * speed}px)`
  })

  // Scale effect for hero content
  const heroContent = document.querySelector(".hero-content")
  if (heroContent) {
    const scale = Math.max(0.8, 1 - (scrolled / windowHeight) * 0.2)
    const opacity = Math.max(0.3, 1 - (scrolled / windowHeight) * 0.7)
    heroContent.style.transform = `scale(${scale})`
    heroContent.style.opacity = opacity
  }
}

// Throttled scroll listener
let scrollTicking = false
window.addEventListener("scroll", () => {
  if (!scrollTicking) {
    requestAnimationFrame(() => {
      scrollAnimations()
      scrollTicking = false
    })
    scrollTicking = true
  }
})

// Enhanced page visibility handling
document.addEventListener("visibilitychange", () => {
  if (document.hidden) {
    // Pause animations when page is not visible
    document.body.style.animationPlayState = "paused"
  } else {
    // Resume animations when page becomes visible
    document.body.style.animationPlayState = "running"
  }
})

console.log("🔥 Elite Portfolio loaded successfully! Crafted with passion by Kasam Thapa Magar")
