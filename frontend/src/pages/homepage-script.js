// JavaScript for animations and interactive elements

// Initialize all animations and interactive elements when the component mounts
if (typeof window !== 'undefined' && typeof document !== 'undefined') {
  document.addEventListener('DOMContentLoaded', function() {
    initCounterAnimations();
    initFAQ();
    initScrollAnimations();
    initSmoothScroll();
  });

  // Also initialize when the page loads (for when DOM is ready)
  window.addEventListener('load', function() {
    initCounterAnimations();
    initFAQ();
    initScrollAnimations();
    initSmoothScroll();
  });
}

function initCounterAnimations() {
  // Counter animation function
  const counters = document.querySelectorAll('.counterNumber');
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const counter = entry.target;
        const target = parseInt(counter.getAttribute('data-target'));
        const duration = 2000; // 2 seconds
        const increment = target / (duration / 16); // 16ms per frame
        let current = 0;
        
        const updateCounter = () => {
          current += increment;
          if (current < target) {
            counter.textContent = Math.floor(current);
            requestAnimationFrame(updateCounter);
          } else {
            counter.textContent = target;
          }
        };
        
        updateCounter();
        observer.unobserve(counter);
      }
    });
  }, {
    threshold: 0.5
  });
  
  counters.forEach(counter => {
    observer.observe(counter);
  });
}

function initFAQ() {
  // FAQ accordion functionality
  const faqItems = document.querySelectorAll('.faqItem');
  
  faqItems.forEach(item => {
    const question = item.querySelector('.faqQuestion');
    
    question.addEventListener('click', () => {
      // Close other items
      faqItems.forEach(otherItem => {
        if (otherItem !== item && otherItem.classList.contains('active')) {
          otherItem.classList.remove('active');
        }
      });
      
      // Toggle current item
      item.classList.toggle('active');
    });
  });
}

function initScrollAnimations() {
  // Intersection Observer for scroll animations
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
        
        // Add staggered animations for grid items
        if (entry.target.classList.contains('featureCard') ||
            entry.target.classList.contains('serviceCard') ||
            entry.target.classList.contains('testimonialCard')) {
          
          const gridItems = Array.from(entry.target.parentElement.children);
          gridItems.forEach((item, index) => {
            if (item === entry.target) {
              setTimeout(() => {
                item.style.transition = 'all 0.6s ease 0.2s';
              }, index * 100);
            }
          });
        }
        
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);
  
  // Observe elements that should animate on scroll
  document.querySelectorAll('.aboutContent, .servicesGrid, .featureGrid, .countersGrid, .testimonialsGrid, .faqContainer').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
  });
  
  // Special handling for feature cards
  document.querySelectorAll('.featureCard').forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(20px)';
    observer.observe(card);
  });
}

// Additional utility functions
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

// Smooth scrolling for anchor links (if needed)
function initSmoothScroll() {
  if (typeof document === 'undefined') return;
  
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        target.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    });
  });
}

// Initialize particles or additional animations if needed
function initParticles() {
  // This function could be expanded to add particle effects
  // using libraries like particles.js or custom canvas animations
}