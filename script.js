document.addEventListener("DOMContentLoaded", () => {
  // Mobile Menu Functionality
  const mobileMenuButton = document.getElementById("mobile-menu-button")
  const closeMenuButton = document.getElementById("close-menu-button")
  const mobileMenu = document.getElementById("mobile-menu")

  if (mobileMenuButton && mobileMenu) {
    mobileMenuButton.addEventListener("click", () => {
      mobileMenu.classList.add("active")
    })
  }

  if (closeMenuButton && mobileMenu) {
    closeMenuButton.addEventListener("click", () => {
      mobileMenu.classList.remove("active")
    })
  }

  // Close mobile menu when clicking outside
  document.addEventListener("click", (event) => {
    if (mobileMenu && mobileMenu.classList.contains("active")) {
      if (!mobileMenu.contains(event.target) && !mobileMenuButton.contains(event.target)) {
        mobileMenu.classList.remove("active")
      }
    }
  })

  // Newsletter Form Submission
  const newsletterForm = document.querySelector("form")
  if (newsletterForm) {
    newsletterForm.addEventListener("submit", function (e) {
      e.preventDefault()
      const email = this.querySelector('input[type="email"]').value
      if (email) {
        alert("Thank you for subscribing to our newsletter!")
        this.reset()
      }
    })
  }

  // Contact Form Submission
  const contactForm = document.getElementById("contact-form")
  if (contactForm) {
    contactForm.addEventListener("submit", function (e) {
      e.preventDefault()
      alert("Thank you for your message! We will get back to you soon.")
      this.reset()
    })
  }

  // Reservation Form Submission
  const reservationForm = document.getElementById("reservation-form")
  if (reservationForm) {
    reservationForm.addEventListener("submit", function (e) {
      e.preventDefault()
      alert("Thank you for your reservation request! We will confirm your booking shortly.")
      this.reset()
    })
  }

  // Gallery Image Modal (Simple implementation)
  const galleryImages = document.querySelectorAll(".gallery-image")
  galleryImages.forEach((image) => {
    image.addEventListener("click", function () {
      // Simple modal implementation - you can enhance this
      const modal = document.createElement("div")
      modal.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0,0,0,0.9);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 1000;
        cursor: pointer;
      `

      const img = document.createElement("img")
      img.src = this.src
      img.style.cssText = `
        max-width: 90%;
        max-height: 90%;
        object-fit: contain;
      `

      modal.appendChild(img)
      document.body.appendChild(modal)

      modal.addEventListener("click", () => {
        document.body.removeChild(modal)
      })
    })
  })

  // Smooth scrolling for anchor links
  const anchorLinks = document.querySelectorAll('a[href^="#"]')
  anchorLinks.forEach((link) => {
    link.addEventListener("click", function (e) {
      e.preventDefault()
      const target = document.querySelector(this.getAttribute("href"))
      if (target) {
        target.scrollIntoView({
          behavior: "smooth",
          block: "start",
        })
      }
    })
  })

  // Booking form date validation
  const checkinInput = document.getElementById("checkin")
  const checkoutInput = document.getElementById("checkout")

  if (checkinInput && checkoutInput) {
    // Set minimum date to today
    const today = new Date().toISOString().split("T")[0]
    checkinInput.min = today
    checkoutInput.min = today

    checkinInput.addEventListener("change", function () {
      const checkinDate = new Date(this.value)
      const nextDay = new Date(checkinDate)
      nextDay.setDate(nextDay.getDate() + 1)
      checkoutInput.min = nextDay.toISOString().split("T")[0]

      if (checkoutInput.value && new Date(checkoutInput.value) <= checkinDate) {
        checkoutInput.value = nextDay.toISOString().split("T")[0]
      }
    })
  }

  // Room selection and price calculation
  const roomSelect = document.getElementById("room-type")
  const guestsSelect = document.getElementById("guests")
  const priceDisplay = document.getElementById("total-price")

  if (roomSelect && priceDisplay) {
    const roomPrices = {
      deluxe: 5500,
      premium: 8500,
      royal: 12000,
    }

    function calculatePrice() {
      const roomType = roomSelect.value
      const guests = Number.parseInt(guestsSelect?.value || 1)
      const basePrice = roomPrices[roomType] || 0
      const extraGuestFee = guests > 2 ? (guests - 2) * 1000 : 0
      const totalPrice = basePrice + extraGuestFee

      if (priceDisplay) {
        priceDisplay.textContent = `₹${totalPrice.toLocaleString()}/night`
      }
    }

    roomSelect.addEventListener("change", calculatePrice)
    if (guestsSelect) {
      guestsSelect.addEventListener("change", calculatePrice)
    }

    // Initial calculation
    calculatePrice()
  }

  // Add loading states for forms
  const forms = document.querySelectorAll("form")
  forms.forEach((form) => {
    form.addEventListener("submit", function () {
      const submitButton = this.querySelector('button[type="submit"]')
      if (submitButton) {
        const originalText = submitButton.textContent
        submitButton.textContent = "Processing..."
        submitButton.disabled = true

        setTimeout(() => {
          submitButton.textContent = originalText
          submitButton.disabled = false
        }, 2000)
      }
    })
  })

  // Animate elements on scroll
  const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px",
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = "1"
        entry.target.style.transform = "translateY(0)"
      }
    })
  }, observerOptions)

  // Observe elements for animation
  const animateElements = document.querySelectorAll(".feature-card, .room-card, .testimonial-card")
  animateElements.forEach((el) => {
    el.style.opacity = "0"
    el.style.transform = "translateY(20px)"
    el.style.transition = "opacity 0.6s ease, transform 0.6s ease"
    observer.observe(el)
  })
})


// swiper js code carosel

var swiper = new Swiper(".mySwiper", {
  effect: "fade",
  fadeEffect: {
    crossFade: true
  },
  loop: true,
  speed: 1200, // ⬅️ Smooth fade duration
  autoplay: {
    delay: 4000,
    disableOnInteraction: false
  },
  pagination: {
    el: ".swiper-pagination",
    clickable: true
  },
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev"
  }
});
