document.addEventListener('DOMContentLoaded', function() {
    // Scroll animation function
    function animateOnScroll() {
        const elements = document.querySelectorAll('.animate-on-scroll');
        
        elements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            const elementVisible = 150;
            
            if (elementTop < window.innerHeight - elementVisible) {
                element.classList.add('active');
            }
        });
        
        // Animate numbers counting up
        const counters = document.querySelectorAll('.counter');
        counters.forEach(counter => {
            const elementTop = counter.getBoundingClientRect().top;
            
            if (elementTop < window.innerHeight - 100) {
                if (!counter.classList.contains('counted')) {
                    counter.classList.add('counted');
                    const target = parseInt(counter.getAttribute('data-target'));
                    let count = 0;
                    const updateCount = () => {
                        const increment = target / 100;
                        if (count < target) {
                            count += increment;
                            counter.innerText = Math.ceil(count);
                            setTimeout(updateCount, 20);
                        } else {
                            counter.innerText = target;
                        }
                    };
                    updateCount();
                }
            }
        });
    }
    
    // Run on scroll
    window.addEventListener('scroll', animateOnScroll);
    
    // Run once on load
    window.addEventListener('load', animateOnScroll);
    
    // Floating animation for elements with .floating class
    const floatingElements = document.querySelectorAll('.floating');
    floatingElements.forEach((element, index) => {
        // Create random animation duration between 3-5s
        const duration = 3 + Math.random() * 2;
        // Create random delay so elements don't all float in sync
        const delay = Math.random() * 1;
        // Apply custom animation
        element.style.animation = `float ${duration}s ease-in-out ${delay}s infinite`;
    });
    
    // Add animation to agile stages
    const stageElements = document.querySelectorAll('.stage');
    stageElements.forEach((element, index) => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(20px)';
        
        const observer = new IntersectionObserver((entries) => {
            if (entries[0].isIntersecting) {
                setTimeout(() => {
                    element.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
                    element.style.opacity = '1';
                    element.style.transform = 'translateY(0)';
                }, index * 150);
                observer.unobserve(element);
            }
        });
        
        observer.observe(element);
    });
    
    // Add animation to design cards
    const designCards = document.querySelectorAll('.design-card');
    designCards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        
        const observer = new IntersectionObserver((entries) => {
            if (entries[0].isIntersecting) {
                setTimeout(() => {
                    card.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
                    card.style.opacity = '1';
                    card.style.transform = 'translateY(0)';
                }, index * 200);
                observer.unobserve(card);
            }
        });
        
        observer.observe(card);
    });
    
    // Text typing animation
    const typingElements = document.querySelectorAll('.typing');
    typingElements.forEach(element => {
        const text = element.textContent;
        element.textContent = '';
        element.style.visibility = 'visible';
        
        let charIndex = 0;
        const typeChar = () => {
            if (charIndex < text.length) {
                element.textContent += text.charAt(charIndex);
                charIndex++;
                setTimeout(typeChar, 100);
            }
        };
        
        // Start typing when element is in view
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    setTimeout(typeChar, 500);
                    observer.unobserve(element);
                }
            });
        });
        
        observer.observe(element);
    });
    
    // Parallax effect for mouse movement
    let mouseX = 0;
    let mouseY = 0;
    let windowWidth = window.innerWidth;
    let windowHeight = window.innerHeight;
    
    // Update mouse position
    document.addEventListener('mousemove', function(e) {
        mouseX = e.clientX;
        mouseY = e.clientY;
        
        // Calculate position relative to center of screen
        const relativeX = (mouseX - windowWidth / 2) / (windowWidth / 2);
        const relativeY = (mouseY - windowHeight / 2) / (windowHeight / 2);
        
        // Apply parallax effect to elements with .parallax class
        const parallaxElements = document.querySelectorAll('.parallax');
        parallaxElements.forEach(element => {
            const speed = element.getAttribute('data-speed') || 0.1;
            const x = relativeX * speed * 30;
            const y = relativeY * speed * 30;
            element.style.transform = `translate(${x}px, ${y}px)`;
        });
    });
    
    // Update window dimensions on resize
    window.addEventListener('resize', function() {
        windowWidth = window.innerWidth;
        windowHeight = window.innerHeight;
    });
});

