// Main JavaScript for Clean Wings Website

document.addEventListener('DOMContentLoaded', function() {
  console.log('🚀 DOMContentLoaded - initializing components');
  
  // Initialize all components
  try {
    console.log('Initializing smooth scrolling...');
    initSmoothScrolling();
    
    console.log('Initializing mobile menu...');
    initMobileMenu();
    
    console.log('Initializing contact form...');
    initContactForm();
    
    console.log('Initializing scroll animations...');
    initScrollAnimations();
    
    console.log('Initializing header scroll...');
    initHeaderScroll();
    
    console.log('Initializing theme toggle...');
    initThemeToggle();
    
    console.log('Initializing advantages slider...');
    initAdvantagesSlider();
    
    // Video optimization removed - using static background image
    
    // CTA button functionality
    const ctaButton = document.querySelector('.cta-button');
    if (ctaButton) {
      ctaButton.addEventListener('click', function() {
        const contactSection = document.querySelector('#contact');
        if (contactSection) {
          const headerHeight = document.querySelector('.header').offsetHeight;
          const targetPosition = contactSection.offsetTop - headerHeight - 20;
          
          window.scrollTo({
            top: targetPosition,
            behavior: 'smooth'
          });
        }
      });
    }
    
    console.log('✅ All components initialized successfully');
  } catch (error) {
    console.error('❌ Error during initialization:', error);
  }
});

// Smooth scrolling for navigation links
function initSmoothScrolling() {
  const navLinks = document.querySelectorAll('a[href^="#"]');
  
  navLinks.forEach(link => {
    link.addEventListener('click', function(e) {
      e.preventDefault();
      
      const targetId = this.getAttribute('href');
      const targetSection = document.querySelector(targetId);
      
      if (targetSection) {
        const headerHeight = document.querySelector('.header').offsetHeight;
        const targetPosition = targetSection.offsetTop - headerHeight - 20;
        
        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth'
        });
        
        // Close mobile menu if open
        closeMobileMenu();
      }
    });
  });
}

// Mobile menu functionality
function initMobileMenu() {
  const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
  const nav = document.querySelector('.nav');
  let isMenuOpen = false;
  
  if (mobileMenuBtn && nav) {
    mobileMenuBtn.addEventListener('click', function() {
      isMenuOpen = !isMenuOpen;
      toggleMobileMenu(isMenuOpen);
    });
    
    // Close menu when clicking outside
    document.addEventListener('click', function(e) {
      if (isMenuOpen && !nav.contains(e.target) && !mobileMenuBtn.contains(e.target)) {
        toggleMobileMenu(false);
        isMenuOpen = false;
      }
    });
    
    // Close menu on window resize
    window.addEventListener('resize', function() {
      if (window.innerWidth > 768 && isMenuOpen) {
        toggleMobileMenu(false);
        isMenuOpen = false;
      }
    });
  }
}

function toggleMobileMenu(show) {
  const nav = document.querySelector('.nav');
  const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
  
  if (show) {
    nav.style.display = 'flex';
    nav.style.position = 'absolute';
    nav.style.top = '100%';
    nav.style.left = '0';
    nav.style.right = '0';
    nav.style.backgroundColor = 'white';
    nav.style.flexDirection = 'column';
    nav.style.padding = '20px';
    nav.style.boxShadow = '0 5px 15px rgba(0,0,0,0.1)';
    nav.style.zIndex = '1000';
    mobileMenuBtn.classList.add('active');
  } else {
    nav.style.display = '';
    nav.style.position = '';
    nav.style.top = '';
    nav.style.left = '';
    nav.style.right = '';
    nav.style.backgroundColor = '';
    nav.style.flexDirection = '';
    nav.style.padding = '';
    nav.style.boxShadow = '';
    nav.style.zIndex = '';
    mobileMenuBtn.classList.remove('active');
  }
}

function closeMobileMenu() {
  toggleMobileMenu(false);
}

// Contact form functionality
function initContactForm() {
  const form = document.getElementById('contactForm');
  
  if (form) {
    form.addEventListener('submit', function(e) {
      e.preventDefault();
      
      if (validateForm()) {
        submitForm();
      }
    });
    
    // Real-time validation
    const inputs = form.querySelectorAll('input, select, textarea');
    inputs.forEach(input => {
      input.addEventListener('blur', function() {
        validateField(this);
      });
      
      input.addEventListener('input', function() {
        clearFieldError(this);
      });
    });
  }
}

function validateForm() {
  const form = document.getElementById('contactForm');
  const requiredFields = form.querySelectorAll('[required]');
  let isValid = true;
  
  requiredFields.forEach(field => {
    if (!validateField(field)) {
      isValid = false;
    }
  });
  
  // Validate email format
  const emailField = form.querySelector('input[type="email"]');
  if (emailField && emailField.value) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(emailField.value)) {
      showFieldError(emailField, getErrorMessage('invalid_email'));
      isValid = false;
    }
  }
  
  // Validate phone format
  const phoneField = form.querySelector('input[type="tel"]');
  if (phoneField && phoneField.value) {
    const phoneRegex = /^[\+]?[\d\s\-\(\)]{10,}$/;
    if (!phoneRegex.test(phoneField.value.replace(/\s/g, ''))) {
      showFieldError(phoneField, getErrorMessage('invalid_phone'));
      isValid = false;
    }
  }
  
  return isValid;
}

function validateField(field) {
  const value = field.value.trim();
  
  if (field.hasAttribute('required') && !value) {
    showFieldError(field, getErrorMessage('required_field'));
    return false;
  }
  
  clearFieldError(field);
  return true;
}

function showFieldError(field, message) {
  clearFieldError(field);
  
  const errorDiv = document.createElement('div');
  errorDiv.className = 'field-error';
  errorDiv.textContent = message;
  errorDiv.style.color = '#e74c3c';
  errorDiv.style.fontSize = '0.9rem';
  errorDiv.style.marginTop = '5px';
  
  field.style.borderColor = '#e74c3c';
  field.parentNode.appendChild(errorDiv);
}

function clearFieldError(field) {
  const existingError = field.parentNode.querySelector('.field-error');
  if (existingError) {
    existingError.remove();
  }
  field.style.borderColor = '';
}

function getErrorMessage(type) {
  const lang = window.languageSwitcher ? window.languageSwitcher.getCurrentLanguage() : 'ru';
  
  const messages = {
    ru: {
      required_field: 'Это поле обязательно для заполнения',
      invalid_email: 'Введите корректный email адрес',
      invalid_phone: 'Введите корректный номер телефона',
      form_success: 'Заявка успешно отправлена! Мы свяжемся с вами в ближайшее время.',
      form_error: 'Произошла ошибка при отправке. Пожалуйста, попробуйте еще раз.'
    },
    en: {
      required_field: 'This field is required',
      invalid_email: 'Please enter a valid email address',
      invalid_phone: 'Please enter a valid phone number',
      form_success: 'Request sent successfully! We will contact you shortly.',
      form_error: 'An error occurred while sending. Please try again.'
    }
  };
  
  return messages[lang][type] || messages.ru[type];
}

function submitForm() {
  const form = document.getElementById('contactForm');
  const submitButton = form.querySelector('.submit-button');
  const originalText = submitButton.textContent;
  
  // Show loading state
  submitButton.disabled = true;
  submitButton.textContent = window.languageSwitcher?.getCurrentLanguage() === 'en' ? 'Sending...' : 'Отправка...';
  
  // Get form data
  const formData = new FormData(form);
  const data = Object.fromEntries(formData.entries());
  
  // Simulate form submission (replace with actual endpoint)
  setTimeout(() => {
    // Reset form
    form.reset();
    
    // Show success message
    showNotification(getErrorMessage('form_success'), 'success');
    
    // Reset button
    submitButton.disabled = false;
    submitButton.textContent = originalText;
    
    // In real implementation, send data to server:
    // fetch('/api/contact', {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify(data)
    // }).then(response => {
    //   if (response.ok) {
    //     showNotification(getErrorMessage('form_success'), 'success');
    //   } else {
    //     showNotification(getErrorMessage('form_error'), 'error');
    //   }
    // }).catch(() => {
    //   showNotification(getErrorMessage('form_error'), 'error');
    // });
    
  }, 2000);
}

function showNotification(message, type = 'info') {
  // Remove existing notifications
  const existingNotification = document.querySelector('.notification');
  if (existingNotification) {
    existingNotification.remove();
  }
  
  const notification = document.createElement('div');
  notification.className = `notification notification-${type}`;
  notification.textContent = message;
  
  // Styles
  Object.assign(notification.style, {
    position: 'fixed',
    top: '20px',
    right: '20px',
    padding: '15px 20px',
    borderRadius: '8px',
    color: 'white',
    fontSize: '1rem',
    zIndex: '10000',
    maxWidth: '400px',
    boxShadow: '0 5px 15px rgba(0,0,0,0.2)',
    transform: 'translateX(100%)',
    transition: 'transform 0.3s ease'
  });
  
  if (type === 'success') {
    notification.style.backgroundColor = '#27ae60';
  } else if (type === 'error') {
    notification.style.backgroundColor = '#e74c3c';
  } else {
    notification.style.backgroundColor = '#3498db';
  }
  
  document.body.appendChild(notification);
  
  // Animate in
  setTimeout(() => {
    notification.style.transform = 'translateX(0)';
  }, 100);
  
  // Remove after 5 seconds
  setTimeout(() => {
    notification.style.transform = 'translateX(100%)';
    setTimeout(() => {
      if (notification.parentNode) {
        notification.remove();
      }
    }, 300);
  }, 5000);
}

// Scroll animations
function initScrollAnimations() {
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };
  
  const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('fade-in');
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);
  
  // Observe elements for animation
  const animatedElements = document.querySelectorAll('.service-card, .advantage-card, .process-step, .contact-item');
  animatedElements.forEach(el => {
    observer.observe(el);
  });
}

// Header scroll effect
function initHeaderScroll() {
  let lastScrollY = window.scrollY;
  
  window.addEventListener('scroll', function() {
    const currentScrollY = window.scrollY;
    updateHeaderBackground();
    lastScrollY = currentScrollY;
  });
}

// Utility function for debouncing
function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

// Theme Toggle functionality
function initThemeToggle() {
  const themeToggle = document.getElementById('themeToggle');
  const sunIcon = themeToggle.querySelector('.sun-icon');
  const moonIcon = themeToggle.querySelector('.moon-icon');
  
  // Check for saved theme preference or default to light mode
  const currentTheme = localStorage.getItem('cleanwings-theme') || 'light';
  
  // Apply the saved theme
  if (currentTheme === 'dark') {
    document.body.classList.add('dark-theme');
    sunIcon.style.display = 'none';
    moonIcon.style.display = 'block';
  }
  
  // Theme toggle click handler
  themeToggle.addEventListener('click', function() {
    document.body.classList.toggle('dark-theme');
    
    const isDark = document.body.classList.contains('dark-theme');
    
    // Toggle icons
    if (isDark) {
      sunIcon.style.display = 'none';
      moonIcon.style.display = 'block';
      localStorage.setItem('cleanwings-theme', 'dark');
    } else {
      sunIcon.style.display = 'block';
      moonIcon.style.display = 'none';
      localStorage.setItem('cleanwings-theme', 'light');
    }
    
    // Update header background immediately when theme changes
    updateHeaderBackground();
  });
}

// Helper function to update header background based on scroll and theme
function updateHeaderBackground() {
  const header = document.querySelector('.header');
  const currentScrollY = window.scrollY;
  
  if (currentScrollY > 100) {
    header.classList.add('scrolled');
  } else {
    header.classList.remove('scrolled');
    // Remove inline styles to allow CSS to handle transparent state
    header.style.background = '';
    header.style.boxShadow = '';
  }
}

// Video functionality removed - using static background image

// Advantages Slider functionality
function initAdvantagesSlider() {
  const slider = document.querySelector('.advantages-slider');
  if (!slider) return;
  
  const container = slider.querySelector('.advantages-container');
  const originalCards = Array.from(container.querySelectorAll('.advantage-card'));
  const prevBtn = slider.querySelector('.prev-btn');
  const nextBtn = slider.querySelector('.next-btn');
  const dotsContainer = slider.querySelector('.slider-dots');
  
  // Clone cards for infinite scroll
  const clonedCards = originalCards.map(card => card.cloneNode(true));
  clonedCards.forEach(card => container.appendChild(card));
  
  const allCards = container.querySelectorAll('.advantage-card');
  const totalOriginalCards = originalCards.length;
  const cardWidth = 320;
  const gap = 24;
  
  let currentIndex = 0;
  let isAnimating = false;
  
  // Create dots (only for original cards)
  createDots();
  
  // Set initial position
  container.style.transform = `translateX(0px)`;
  updateDots();
  
  // Event listeners
  prevBtn.addEventListener('click', () => {
    if (isAnimating) return;
    moveSlider(-1);
  });
  
  nextBtn.addEventListener('click', () => {
    if (isAnimating) return;
    moveSlider(1);
  });
  
  // Auto-slide functionality
  let autoSlideInterval = setInterval(() => {
    if (!isAnimating) {
      moveSlider(1);
    }
  }, 4000);
  
  // Pause auto-slide on hover
  slider.addEventListener('mouseenter', () => {
    clearInterval(autoSlideInterval);
  });
  
  slider.addEventListener('mouseleave', () => {
    autoSlideInterval = setInterval(() => {
      if (!isAnimating) {
        moveSlider(1);
      }
    }, 4000);
  });
  
  function createDots() {
    dotsContainer.innerHTML = '';
    for (let i = 0; i < totalOriginalCards; i++) {
      const dot = document.createElement('div');
      dot.className = 'slider-dot';
      dot.addEventListener('click', () => {
        if (!isAnimating) {
          currentIndex = i;
          updateSlider();
          updateDots();
        }
      });
      dotsContainer.appendChild(dot);
    }
  }
  
  function moveSlider(direction) {
    isAnimating = true;
    currentIndex += direction;
    
    updateSlider();
    
    setTimeout(() => {
      // Handle infinite loop
      if (currentIndex >= totalOriginalCards) {
        currentIndex = 0;
        container.style.transition = 'none';
        container.style.transform = `translateX(0px)`;
        setTimeout(() => {
          container.style.transition = 'transform 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
        }, 50);
      } else if (currentIndex < 0) {
        currentIndex = totalOriginalCards - 1;
        container.style.transition = 'none';
        container.style.transform = `translateX(-${currentIndex * (cardWidth + gap)}px)`;
        setTimeout(() => {
          container.style.transition = 'transform 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
        }, 50);
      }
      
      updateDots();
      isAnimating = false;
    }, 500);
  }
  
  function updateSlider() {
    const translateX = -currentIndex * (cardWidth + gap);
    container.style.transform = `translateX(${translateX}px)`;
  }
  
  function updateDots() {
    const dots = dotsContainer.querySelectorAll('.slider-dot');
    dots.forEach((dot, index) => {
      dot.classList.toggle('active', index === currentIndex);
    });
  }
}

// CTA button scroll to contact form - moved to main DOMContentLoaded handler