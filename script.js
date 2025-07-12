
/**
 * THREADED TREASURES ACADEMY
 * JavaScript functionality for interactive features
 */

// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    console.log('Threaded Treasures Academy - Site loaded successfully');
    
    // Initialize all interactive features
    initMobileNavigation();
    initGalleryFiltering();
    initFormHandling();
    initCountdown();
    initAnimations();
    initEmailSubscription();
});

/**
 * Mobile Navigation Toggle
 */
function initMobileNavigation() {
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('nav-menu');
    
    if (hamburger && navMenu) {
        hamburger.addEventListener('click', function() {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
        });
        
        // Close mobile menu when clicking on a nav link
        const navLinks = document.querySelectorAll('.nav-link');
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
            });
        });
        
        // Close mobile menu when clicking outside
        document.addEventListener('click', function(event) {
            if (!hamburger.contains(event.target) && !navMenu.contains(event.target)) {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
            }
        });
    }
}

/**
 * Gallery Filtering System
 */
function initGalleryFiltering() {
    const filterButtons = document.querySelectorAll('.category-btn');
    const galleryItems = document.querySelectorAll('.gallery-item');
    
    if (filterButtons.length > 0 && galleryItems.length > 0) {
        filterButtons.forEach(button => {
            button.addEventListener('click', function() {
                const category = this.getAttribute('data-category');
                
                // Update active button
                filterButtons.forEach(btn => btn.classList.remove('active'));
                this.classList.add('active');
                
                // Filter gallery items
                galleryItems.forEach(item => {
                    const itemCategory = item.getAttribute('data-category');
                    
                    if (category === 'all' || itemCategory === category) {
                        item.style.display = 'block';
                        item.classList.remove('hidden');
                        // Add fade-in animation
                        setTimeout(() => {
                            item.style.opacity = '1';
                            item.style.transform = 'translateY(0)';
                        }, 100);
                    } else {
                        item.style.opacity = '0';
                        item.style.transform = 'translateY(20px)';
                        setTimeout(() => {
                            item.style.display = 'none';
                            item.classList.add('hidden');
                        }, 300);
                    }
                });
                
                console.log(`Gallery filtered by: ${category}`);
            });
        });
    }
}

/**
 * Form Handling
 */
function initFormHandling() {
    // Contact form
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            handleContactFormSubmission(this);
        });
    }
    
    // Email subscription forms
    const emailForms = document.querySelectorAll('.cta-form, .early-bird-form');
    emailForms.forEach(form => {
        const button = form.querySelector('.btn');
        const input = form.querySelector('.email-input');
        
        if (button && input) {
            button.addEventListener('click', function(e) {
                e.preventDefault();
                handleEmailSubscription(input.value, form);
            });
            
            // Allow Enter key submission
            input.addEventListener('keypress', function(e) {
                if (e.key === 'Enter') {
                    e.preventDefault();
                    handleEmailSubscription(input.value, form);
                }
            });
        }
    });
}

/**
 * Handle contact form submission
 */
function handleContactFormSubmission(form) {
    const formData = new FormData(form);
    const data = Object.fromEntries(formData.entries());
    
    // Basic validation
    if (!data.name || !data.email || !data.message) {
        showNotification('Please fill in all required fields.', 'error');
        return;
    }
    
    if (!isValidEmail(data.email)) {
        showNotification('Please enter a valid email address.', 'error');
        return;
    }
    
    // Simulate form submission
    const submitButton = form.querySelector('button[type="submit"]');
    const originalText = submitButton.textContent;
    
    submitButton.textContent = 'Sending...';
    submitButton.disabled = true;
    
    setTimeout(() => {
        submitButton.textContent = originalText;
        submitButton.disabled = false;
        showNotification('Thank you for your message! We\'ll get back to you soon.', 'success');
        form.reset();
        console.log('Contact form submitted:', data);
    }, 2000);
}

/**
 * Handle email subscription
 */
function handleEmailSubscription(email, form) {
    if (!email) {
        showNotification('Please enter your email address.', 'error');
        return;
    }
    
    if (!isValidEmail(email)) {
        showNotification('Please enter a valid email address.', 'error');
        return;
    }
    
    const button = form.querySelector('.btn');
    const input = form.querySelector('.email-input');
    const originalText = button.textContent;
    
    button.textContent = 'Subscribing...';
    button.disabled = true;
    
    setTimeout(() => {
        button.textContent = originalText;
        button.disabled = false;
        input.value = '';
        showNotification('Successfully subscribed! We\'ll notify you when courses launch.', 'success');
        console.log('Email subscription:', email);
    }, 1500);
}

/**
 * Email validation
 */
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

/**
 * Show notification messages
 */
function showNotification(message, type = 'info') {
    // Remove existing notifications
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
        existingNotification.remove();
    }
    
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <span class="notification-message">${message}</span>
            <button class="notification-close" onclick="this.parentElement.parentElement.remove()">×</button>
        </div>
    `;
    
    // Add notification styles
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        z-index: 10000;
        max-width: 400px;
        padding: 16px;
        border-radius: 8px;
        box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
        transform: translateX(100%);
        transition: all 0.3s ease;
        font-family: 'Inter', sans-serif;
        ${type === 'success' ? 'background: #10B981; color: white;' : ''}
        ${type === 'error' ? 'background: #EF4444; color: white;' : ''}
        ${type === 'info' ? 'background: #3B82F6; color: white;' : ''}
    `;
    
    const notificationContent = notification.querySelector('.notification-content');
    notificationContent.style.cssText = `
        display: flex;
        justify-content: space-between;
        align-items: center;
        gap: 12px;
    `;
    
    const closeButton = notification.querySelector('.notification-close');
    closeButton.style.cssText = `
        background: none;
        border: none;
        color: inherit;
        font-size: 20px;
        cursor: pointer;
        padding: 0;
        width: 24px;
        height: 24px;
        display: flex;
        align-items: center;
        justify-content: center;
    `;
    
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        if (notification.parentElement) {
            notification.style.transform = 'translateX(100%)';
            setTimeout(() => {
                if (notification.parentElement) {
                    notification.remove();
                }
            }, 300);
        }
    }, 5000);
}

/**
 * Countdown Timer for Course Launch
 */
function initCountdown() {
    const countdownElements = {
        days: document.getElementById('days'),
        hours: document.getElementById('hours'),
        minutes: document.getElementById('minutes')
    };
    
    // Check if countdown elements exist
    if (!countdownElements.days) return;
    
    // Set target date (e.g., 2 months from now)
    const targetDate = new Date();
    targetDate.setMonth(targetDate.getMonth() + 2);
    targetDate.setDate(1); // First of the month
    
    function updateCountdown() {
        const now = new Date().getTime();
        const distance = targetDate.getTime() - now;
        
        if (distance < 0) {
            // Course has launched
            countdownElements.days.textContent = '0';
            countdownElements.hours.textContent = '0';
            countdownElements.minutes.textContent = '0';
            return;
        }
        
        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        
        countdownElements.days.textContent = days;
        countdownElements.hours.textContent = hours;
        countdownElements.minutes.textContent = minutes;
    }
    
    // Update countdown immediately and then every minute
    updateCountdown();
    setInterval(updateCountdown, 60000);
}

/**
 * Initialize scroll-based animations
 */
function initAnimations() {
    // Intersection Observer for fade-in animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    // Observe elements that should animate
    const animatedElements = document.querySelectorAll('.feature-card, .course-card, .team-member, .gallery-item, .mission-card');
    animatedElements.forEach(el => {
        observer.observe(el);
    });
    
    // Add smooth scrolling for anchor links
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

/**
 * Handle email subscription from any form
 */
function initEmailSubscription() {
    // Handle any additional email subscription logic
    console.log('Email subscription system initialized');
}

/**
 * Utility function to format date
 */
function formatDate(date) {
    return new Intl.DateTimeFormat('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    }).format(date);
}

/**
 * Utility function to debounce function calls
 */
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

/**
 * Handle window resize events
 */
window.addEventListener('resize', debounce(() => {
    console.log('Window resized - updating responsive features');
    
    // Close mobile menu on resize to desktop
    if (window.innerWidth > 768) {
        const hamburger = document.getElementById('hamburger');
        const navMenu = document.getElementById('nav-menu');
        
        if (hamburger && navMenu) {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        }
    }
}, 250));

/**
 * Handle scroll events for navigation styling
 */
let lastScrollTop = 0;
window.addEventListener('scroll', debounce(() => {
    const header = document.querySelector('.header');
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    
    if (header) {
        if (scrollTop > 100) {
            header.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
        } else {
            header.style.boxShadow = '0 4px 6px rgba(0, 0, 0, 0.07)';
        }
    }
    
    lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;
}, 100));

// Export functions for potential external use
window.ThreadedTreasures = {
    showNotification,
    handleEmailSubscription,
    isValidEmail
};
