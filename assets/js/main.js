// Portfolio Website JavaScript

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    initializeNavigation();
    initializeProjectsSection();
    initializeContactForm();
    initializeButtonHoverEffects();
    initializeScrollObserver();
});

// Navigation functionality
function initializeNavigation() {
    const mobileMenuToggle = document.getElementById('mobileMenuToggle');
    const navMobile = document.getElementById('navMobile');

    if (mobileMenuToggle && navMobile) {
        // Mobile menu toggle
        mobileMenuToggle.addEventListener('click', function() {
            navMobile.classList.toggle('active');
        });
    }

    // Navigation background on scroll
    window.addEventListener('scroll', function() {
        const nav = document.querySelector('.navigation');
        if (nav) {
            if (window.scrollY > 50) {
                nav.style.background = 'rgba(255, 255, 255, 0.9)';
            } else {
                nav.style.background = 'rgba(255, 255, 255, 0.8)';
            }
        }
    });
}

// Close mobile menu
function closeMobileMenu() {
    const navMobile = document.getElementById('navMobile');
    if (navMobile) {
        navMobile.classList.remove('active');
    }
}

// Smooth scroll to section
function scrollToSection(sectionId) {
    const element = document.getElementById(sectionId);
    if (element) {
        element.scrollIntoView({
            behavior: 'smooth'
        });
    }
}

// Resume download function
function downloadResume() {
    // Show download notification
    alert("Resume download will begin shortly...");
    
    // Attempt to open resume file
    // Update this path to match your actual resume file location
    window.open("assets/documents/resume.pdf", "_blank");
}

// Projects section functionality
function initializeProjectsSection() {
    // Initialize Lucide icons
    if (typeof lucide !== 'undefined') {
        lucide.createIcons();
    }
    
    // Handle portfolio expansion
    const viewPortfolioBtn = document.getElementById('viewPortfolioBtn');
    const hiddenProjects = document.getElementById('hiddenProjects');
    const slideIndicator = document.querySelector('.slide-indicator');
    let isExpanded = false;
    
    if (viewPortfolioBtn && hiddenProjects) {
        viewPortfolioBtn.addEventListener('click', function() {
            if (!isExpanded) {
                hiddenProjects.classList.add('show');
                if (slideIndicator) {
                    slideIndicator.classList.add('rotate-180');
                }
                const buttonText = viewPortfolioBtn.querySelector('span');
                if (buttonText) {
                    buttonText.textContent = 'Show Less Projects';
                }
                isExpanded = true;
                
                // Smooth scroll to new content
                setTimeout(() => {
                    hiddenProjects.scrollIntoView({ 
                        behavior: 'smooth', 
                        block: 'start' 
                    });
                }, 300);
            } else {
                hiddenProjects.classList.remove('show');
                if (slideIndicator) {
                    slideIndicator.classList.remove('rotate-180');
                }
                const buttonText = viewPortfolioBtn.querySelector('span');
                if (buttonText) {
                    buttonText.textContent = 'View Complete Portfolio';
                }
                isExpanded = false;
            }
        });
    }
    
    // Add hover effects for project cards
    document.querySelectorAll('.project-card').forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.style.transform = 'translateY(-8px)';
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'translateY(0)';
        });
    });
}

// Contact form functionality
function initializeContactForm() {
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();

            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const subject = document.getElementById('subject').value;
            const message = document.getElementById('message').value;

            if (!name || !email || !message) {
                alert('Please fill in all required fields.');
                return;
            }

            const submitButton = document.querySelector('.button-hero');
            const originalText = submitButton.innerHTML;

            submitButton.innerHTML = 'Sending...';
            submitButton.disabled = true;

            // Prepare data for EmailJS
            const templateParams = {
                name: name,
                email: email,
                subject: subject,
                message: message,
            };

            // Send email using EmailJS
            if (typeof emailjs !== 'undefined') {
                emailjs.send("service_i4ou1sf", "template_1o320hm", templateParams)
                    .then(() => {
                        alert("Thank you for your message! I will get back to you soon.");
                        contactForm.reset();
                        submitButton.innerHTML = originalText;
                        submitButton.disabled = false;
                    }, (error) => {
                        alert("Oops! Something went wrong: " + JSON.stringify(error));
                        submitButton.innerHTML = originalText;
                        submitButton.disabled = false;
                    });
            } else {
                // Fallback if EmailJS is not loaded
                setTimeout(() => {
                    alert('Thank you for your message! I will get back to you soon.');
                    contactForm.reset();
                    submitButton.innerHTML = originalText;
                    submitButton.disabled = false;
                }, 1500);
            }
        });
    }
}

// Button hover effects
function initializeButtonHoverEffects() {
    const heroButtons = document.querySelectorAll('.button');
    
    heroButtons.forEach(button => {
        button.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-2px)';
        });
        
        button.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });
}

// Scroll observer for animations
function initializeScrollObserver() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // Observe all project cards and other animated elements
    document.querySelectorAll('.project-card').forEach(card => {
        observer.observe(card);
    });
}

// Utility function to handle external links
function openExternalLink(url) {
    window.open(url, '_blank', 'noopener,noreferrer');
}

// Initialize EmailJS when the script loads
(function() {
    if (typeof emailjs !== 'undefined') {
        emailjs.init("AoFvxHU4X61abgGtg"); // Your public key
    }
})();