// Mobile navigation fix
document.addEventListener('DOMContentLoaded', function() {
    // Direct event handler for mobile navigation toggle
    const mobileToggle = document.querySelector('.nav-toggle');
    const mobileClose = document.querySelector('.nav-close');
    const navLinks = document.getElementById('navLinks');
    
    if (mobileToggle && navLinks) {
        mobileToggle.addEventListener('click', function(e) {
            e.preventDefault();
            navLinks.classList.add('active');
            document.body.style.overflow = 'hidden';
            console.log('Mobile menu opened');
        });
    }
    
    if (mobileClose && navLinks) {
        mobileClose.addEventListener('click', function(e) {
            e.preventDefault();
            navLinks.classList.remove('active');
            document.body.style.overflow = '';
            console.log('Mobile menu closed');
        });
    }
    
    // Close menu when clicking outside
    document.addEventListener('click', function(e) {
        if (navLinks && navLinks.classList.contains('active')) {
            if (!e.target.closest('.nav-links') && !e.target.closest('.nav-toggle')) {
                navLinks.classList.remove('active');
                document.body.style.overflow = '';
                console.log('Mobile menu closed by outside click');
            }
        }
    });
});
