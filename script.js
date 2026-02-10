document.addEventListener('DOMContentLoaded', function() {
    
    // --- EMAILJS INITIALIZATION ---
    // Make sure the SDK is loaded in HTML
    if (typeof emailjs !== 'undefined') {
        emailjs.init("RnJKzavZ5X-ODeQlM");
    } else {
        console.error("EmailJS SDK not loaded!");
    }

    // --- TOAST NOTIFICATION SYSTEM ---
    const toastContainer = document.getElementById('toast-container');

    function showToast(message, type = 'success') {
        // Create Toast Elements
        const toast = document.createElement('div');
        toast.className = `toast ${type}`;
        
        const iconClass = type === 'success' ? 'fa-check-circle' : 'fa-exclamation-circle';
        
        toast.innerHTML = `
            <i class="fas ${iconClass} toast-icon"></i>
            <span>${message}</span>
        `;
        
        toastContainer.appendChild(toast);

        // Animate In
        requestAnimationFrame(() => {
            toast.classList.add('show');
        });

        // Remove after 3.5 seconds
        setTimeout(() => {
            toast.classList.remove('show');
            setTimeout(() => toast.remove(), 400); // Wait for transition
        }, 3500);
    }

    // --- FORM HANDLING WITH EMAILJS ---
    const contactForm = document.getElementById('contact-form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const btn = this.querySelector('.submit-btn');
            const originalBtnText = btn.innerHTML;
            
            // Check internet connection
            if(!navigator.onLine) {
                showToast('No internet connection.', 'error');
                return;
            }

            // Set Loading State
            btn.innerHTML = '<div class="loader-spinner"></div> Sending...';
            btn.disabled = true;
            btn.style.opacity = '0.7';

            // Send Email
            emailjs.sendForm('service_bzq8srm', 'template_84krpah', this)
                .then(function() {
                    showToast('Message sent successfully!', 'success');
                    contactForm.reset();
                })
                .catch(function(error) {
                    console.error('EmailJS Error:', error);
                    showToast('Failed to send. Please try again.', 'error');
                })
                .finally(function() {
                    // Reset Button State
                    btn.innerHTML = originalBtnText;
                    btn.disabled = false;
                    btn.style.opacity = '1';
                });
        });
    }

    // --- EXISTING ANIMATION LOGIC (UNCHANGED) ---

    // Typing Animation
    const roles = [
        "Computer Operator", 
        "Machine Operator", 
        "AI Trainer", 
        "Web Developer", 
        "Software Developer", 
        "Cybersecurity Enthusiast"
    ];
    let roleIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    const typingElement = document.querySelector('.typing-text');
    const typeSpeed = 100;
    const deleteSpeed = 50;
    const waitTime = 2000;

    function type() {
        if (!typingElement) return;
        
        const currentRole = roles[roleIndex];
        
        if (isDeleting) {
            typingElement.textContent = currentRole.substring(0, charIndex - 1);
            charIndex--;
        } else {
            typingElement.textContent = currentRole.substring(0, charIndex + 1);
            charIndex++;
        }

        if (!isDeleting && charIndex === currentRole.length) {
            isDeleting = true;
            setTimeout(type, waitTime);
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            roleIndex = (roleIndex + 1) % roles.length;
            setTimeout(type, 500);
        } else {
            setTimeout(type, isDeleting ? deleteSpeed : typeSpeed);
        }
    }
    
    type();

    // Intersection Observer for Scroll Animations
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animationPlayState = 'running';
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('.fade-in-up').forEach(el => {
        // Set initial state for JS animation override
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.animation = 'none'; // reset css animation
        el.style.transition = 'opacity 0.8s ease-out, transform 0.8s ease-out';
        observer.observe(el);
    });

    // Quote Rotator
    const quotes = [
        { text: "The only limit to our realization of tomorrow is our doubts of today.", author: "Franklin D. Roosevelt" },
        { text: "Success is not final, failure is not fatal: It is the courage to continue that counts.", author: "Winston Churchill" },
        { text: "The future belongs to those who believe in the beauty of their dreams.", author: "Eleanor Roosevelt" },
        { text: "Innovation distinguishes between a leader and a follower.", author: "Steve Jobs" }
    ];
    
    const quoteText = document.querySelector('.quote-text');
    const quoteAuthor = document.querySelector('.quote-author');
    let qIndex = 0;
    
    if (quoteText && quoteAuthor) {
        function updateQuote() {
            quoteText.style.opacity = 0;
            quoteAuthor.style.opacity = 0;
            
            setTimeout(() => {
                qIndex = (qIndex + 1) % quotes.length;
                quoteText.textContent = `"${quotes[qIndex].text}"`;
                quoteAuthor.textContent = `- ${quotes[qIndex].author}`;
                quoteText.style.opacity = 1;
                quoteAuthor.style.opacity = 1;
            }, 500);
        }
        
        // Initialize first quote
        quoteText.textContent = `"${quotes[0].text}"`;
        quoteAuthor.textContent = `- ${quotes[0].author}`;
        setInterval(updateQuote, 6000);
    }
});