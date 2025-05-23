// Wait for DOM to fully load
document.addEventListener('DOMContentLoaded', function() {
    // Accordion functionality for use cases
    const accordionItems = document.querySelectorAll('.accordion-item');
    
    accordionItems.forEach(item => {
        const header = item.querySelector('.accordion-header');
        
        header.addEventListener('click', () => {
            // Toggle active class on the clicked item
            item.classList.toggle('active');
            
            // Close other accordion items
            accordionItems.forEach(otherItem => {
                if (otherItem !== item && otherItem.classList.contains('active')) {
                    otherItem.classList.remove('active');
                }
            });
        });
    });
    // Mobile Navigation Toggle
    const openMenu = document.getElementById('openMenu');
    const closeMenu = document.getElementById('closeMenu');
    const navLinks = document.getElementById('navLinks');
    const navIndicator = document.querySelector('.nav-indicator');
    const navItems = document.querySelectorAll('.nav-links ul li a');
    const scrollLinks = document.querySelectorAll('a[href^="#"]');

    // Mobile menu functionality
    if (openMenu && closeMenu && navLinks) {
        openMenu.addEventListener('click', function(e) {
            e.stopPropagation();
            navLinks.classList.add('active');
            document.body.style.overflow = 'hidden'; // Prevent scrolling when menu is open
        });

        closeMenu.addEventListener('click', function() {
            navLinks.classList.remove('active');
            document.body.style.overflow = ''; // Re-enable scrolling
        });

        // Close menu when clicking outside
        document.addEventListener('click', function(e) {
            if (!navLinks.contains(e.target) && !openMenu.contains(e.target) && navLinks.classList.contains('active')) {
                navLinks.classList.remove('active');
                document.body.style.overflow = ''; // Re-enable scrolling
            }
        });
    }
    
    // Navbar indicator functionality
    function updateNavIndicator(activeLink) {
        if (!navIndicator || !activeLink) return;
        
        const parentLi = activeLink.parentElement;
        const parentUl = parentLi.parentElement;
        const parentLeft = parentUl.getBoundingClientRect().left;
        const linkLeft = activeLink.getBoundingClientRect().left;
        const linkWidth = activeLink.offsetWidth;
        
        navIndicator.style.width = `${linkWidth}px`;
        navIndicator.style.left = `${linkLeft - parentLeft}px`;
        navIndicator.style.opacity = '1';
    }
    
    // Initialize indicator position
    const activeLink = document.querySelector('.nav-links ul li a.active');
    if (activeLink && navIndicator) {
        window.addEventListener('load', function() {
            setTimeout(function() {
                updateNavIndicator(activeLink);
            }, 300);
        });
    }
    
    // Update indicator on hover
    navItems.forEach(item => {
        item.addEventListener('mouseenter', function() {
            updateNavIndicator(this);
        });
    });
    
    // Reset to active link on mouseleave
    const navUl = document.querySelector('.nav-links ul');
    if (navUl) {
        navUl.addEventListener('mouseleave', function() {
            const activeLink = document.querySelector('.nav-links ul li a.active');
            if (activeLink) {
                updateNavIndicator(activeLink);
            }
        });
    }

    // Smooth scrolling for navigation links
    scrollLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                // Close mobile menu if open
                if (navLinks && navLinks.classList.contains('active')) {
                    navLinks.classList.remove('active');
                    document.body.style.overflow = ''; // Re-enable scrolling
                }
                
                // Calculate offset for fixed navbar
                const navbarHeight = document.querySelector('.navbar').offsetHeight;
                const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - navbarHeight;
                
                // Scroll to the target element
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
                
                // Update active link
                scrollLinks.forEach(link => link.classList.remove('active'));
                this.classList.add('active');
                
                // Update indicator for navbar
                if (navIndicator) {
                    updateNavIndicator(this);
                }
            }
        });
    });

    // Active menu based on scroll position
    function updateActiveMenu() {
        const scrollPosition = window.pageYOffset + 100; // Add offset for navbar
        
        // Get all sections
        const sections = document.querySelectorAll('section');
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                // Remove active class from all links
                scrollLinks.forEach(link => link.classList.remove('active'));
                
                // Add active class to corresponding link
                const activeLink = document.querySelector(`a[href="#${sectionId}"]`);
                if (activeLink) {
                    activeLink.classList.add('active');
                    
                    // Update indicator for navbar
                    if (navIndicator) {
                        updateNavIndicator(activeLink);
                    }
                }
            }
        });
        
        // Add shadow and background to navbar on scroll
        const navbar = document.querySelector('.navbar');
        if (navbar) {
            if (scrollPosition > 50) {
                navbar.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
                navbar.style.backgroundColor = 'rgba(255, 255, 255, 0.98)';
            } else {
                navbar.style.boxShadow = 'none';
                navbar.style.backgroundColor = 'rgba(255, 255, 255, 0.95)';
            }
        }
    }
    
    // Run on scroll
    window.addEventListener('scroll', updateActiveMenu);
    
    // Run once on load
    window.addEventListener('load', updateActiveMenu);

    // Initialize first accordion item as active
    if (accordionItems.length > 0) {
        accordionItems[0].classList.add('active');
    }
    
    // Form submission handling
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form values
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const subject = document.getElementById('subject').value;
            const message = document.getElementById('message').value;
            
            // Basic validation
            if (!name || !email || !subject || !message) {
                alert('Please fill in all fields');
                return;
            }
            
            // Email validation
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                alert('Please enter a valid email address');
                return;
            }
            
            // Here you would normally send the form data to a server
            // For demo purposes, we'll just show a success message
            alert('Thank you for your message! We will get back to you soon.');
            contactForm.reset();
        });
    }

    // Add animation on scroll
    const animateElements = document.querySelectorAll('[data-aos]');
    
    function checkIfInView() {
        animateElements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            
            if (elementTop < windowHeight - 100) {
                const delay = element.getAttribute('data-aos-delay') || 0;
                setTimeout(() => {
                    element.classList.add('aos-animate');
                }, delay);
            }
        });
    }
    
    // Add a CSS class for animation
    animateElements.forEach(element => {
        element.classList.add('aos-init');
        element.style.transition = 'transform 0.8s ease, opacity 0.8s ease';
        element.style.opacity = '0';
        element.style.transform = 'translateY(50px)';
    });
    
    // Check elements on load and scroll
    window.addEventListener('load', checkIfInView);
    window.addEventListener('scroll', checkIfInView);
    
    // Custom class for animated elements
    document.head.insertAdjacentHTML('beforeend', `
        <style>
            .aos-animate {
                opacity: 1 !important;
                transform: translateY(0) !important;
            }
        </style>
    `);
    
    // Fix for staggered items animation
    const staggeredContainers = document.querySelectorAll('.staggered-container');
    staggeredContainers.forEach(container => {
        const staggeredItems = container.querySelectorAll('.staggered-item');
        
        const observer = new IntersectionObserver((entries) => {
            if (entries[0].isIntersecting) {
                staggeredItems.forEach((item, index) => {
                    setTimeout(() => {
                        item.classList.add('revealed');
                    }, 100 * index);
                });
                observer.unobserve(container);
            }
        }, { threshold: 0.1 });
        
        observer.observe(container);
    });
    
    // Animation for tools categories
    const toolsCategories = document.querySelectorAll('.tools-category');
    toolsCategories.forEach((category, index) => {
        const observer = new IntersectionObserver((entries) => {
            if (entries[0].isIntersecting) {
                setTimeout(() => {
                    category.classList.add('revealed');
                }, 150 * index);
                observer.unobserve(category);
            }
        }, { threshold: 0.1 });
        
        observer.observe(category);
    });
});
