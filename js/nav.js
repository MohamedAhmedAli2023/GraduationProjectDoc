// Enhanced Navigation Functionality
document.addEventListener('DOMContentLoaded', function() {
    // Elements
    const header = document.querySelector('header');
    const navToggle = document.getElementById('openMenu');
    const navClose = document.getElementById('closeMenu');
    const navLinks = document.getElementById('navLinks');
    const navItems = document.querySelectorAll('.nav-links > ul > li > a');
    const navIndicator = document.querySelector('.nav-indicator');
    const dropdownToggles = document.querySelectorAll('.dropdown-toggle');
    
    // Check if elements exist to prevent errors
    if (!navToggle || !navClose || !navLinks) {
        console.error('Navigation elements not found');
        return;
    }
    
    // Set initial active state and position indicator
    function setActiveLink() {
        if (window.location.pathname.includes('documentation.html')) {
            // On documentation page
            document.querySelector('a[href="documentation.html"]').classList.add('active');
            document.querySelector('a[href="documentation.html"]').setAttribute('aria-current', 'page');
        } else {
            // On index page - check hash or default to home
            const hash = window.location.hash || '#home';
            const activeLink = document.querySelector(`a[href="${hash}"]`);
            
            if (activeLink) {
                activeLink.classList.add('active');
                activeLink.setAttribute('aria-current', 'page');
                
                // Position indicator (only on desktop)
                if (window.innerWidth > 992 && navIndicator) {
                    const linkRect = activeLink.getBoundingClientRect();
                    const navRect = navLinks.getBoundingClientRect();
                    
                    navIndicator.style.width = `${linkRect.width}px`;
                    navIndicator.style.left = `${linkRect.left - navRect.left}px`;
                }
            }
        }
    }
    
    // Handle scroll effects
    function handleScroll() {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
        
        // Update active link based on scroll position (only on index page)
        if (!window.location.pathname.includes('documentation.html')) {
            const sections = document.querySelectorAll('section[id]');
            let currentSection = '';
            
            sections.forEach(section => {
                const sectionTop = section.offsetTop - 100;
                const sectionHeight = section.offsetHeight;
                
                if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
                    currentSection = `#${section.id}`;
                }
            });
            
            if (currentSection) {
                navItems.forEach(item => {
                    item.classList.remove('active');
                    item.removeAttribute('aria-current');
                    
                    if (item.getAttribute('href') === currentSection) {
                        item.classList.add('active');
                        item.setAttribute('aria-current', 'page');
                        
                        // Update indicator position (only on desktop)
                        if (window.innerWidth > 992 && navIndicator) {
                            const linkRect = item.getBoundingClientRect();
                            const navRect = navLinks.getBoundingClientRect();
                            
                            navIndicator.style.width = `${linkRect.width}px`;
                            navIndicator.style.left = `${linkRect.left - navRect.left}px`;
                        }
                    }
                });
            }
        }
    }
    
    // Toggle mobile menu
    function toggleMenu(e) {
        if (e) e.preventDefault();
        
        navLinks.classList.toggle('active');
        
        // Update ARIA attributes
        const isExpanded = navLinks.classList.contains('active');
        navToggle.setAttribute('aria-expanded', isExpanded);
        
        // Prevent body scrolling when menu is open
        if (isExpanded) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
        
        console.log('Menu toggled, active state:', isExpanded);
    }
    
    // Handle dropdown menus on mobile
    function setupDropdowns() {
        dropdownToggles.forEach(toggle => {
            toggle.addEventListener('click', function(e) {
                if (window.innerWidth <= 992) {
                    e.preventDefault();
                    this.parentElement.classList.toggle('active');
                }
            });
            
            // Add keyboard accessibility
            toggle.addEventListener('keydown', function(e) {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    if (window.innerWidth <= 992) {
                        this.parentElement.classList.toggle('active');
                    } else {
                        this.parentElement.classList.add('active');
                        
                        // Focus the first item in dropdown
                        const firstDropdownItem = this.nextElementSibling.querySelector('a');
                        if (firstDropdownItem) {
                            firstDropdownItem.focus();
                        }
                    }
                }
            });
        });
        
        // Close dropdowns when clicking outside
        document.addEventListener('click', function(e) {
            if (!e.target.closest('.nav-dropdown')) {
                document.querySelectorAll('.nav-dropdown').forEach(dropdown => {
                    dropdown.classList.remove('active');
                });
            }
        });
    }
    
    // Event Listeners
    navToggle.addEventListener('click', toggleMenu);
    navClose.addEventListener('click', toggleMenu);
    window.addEventListener('scroll', handleScroll);
    window.addEventListener('resize', setActiveLink);
    
    // Add additional click handler for mobile menu toggle
    document.querySelector('.nav-toggle').addEventListener('click', function(e) {
        console.log('Nav toggle clicked');
        toggleMenu(e);
    });
    
    // Add additional click handler for mobile menu close
    document.querySelector('.nav-close').addEventListener('click', function(e) {
        console.log('Nav close clicked');
        toggleMenu(e);
    });
    
    // Close menu when clicking on a link
    navItems.forEach(item => {
        item.addEventListener('click', function() {
            if (window.innerWidth <= 992) {
                navLinks.classList.remove('active');
                navToggle.setAttribute('aria-expanded', 'false');
                document.body.style.overflow = '';
            }
        });
    });
    
    // Initialize
    setActiveLink();
    handleScroll();
    setupDropdowns();
});
