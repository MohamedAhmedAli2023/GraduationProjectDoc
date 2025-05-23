document.addEventListener('DOMContentLoaded', function() {
    // Elements that will move with the mouse (non-parallax class elements)
    const heroImage = document.querySelector('.hero-image img');
    const featureCards = document.querySelectorAll('.feature-card');
    const teamMembers = document.querySelectorAll('.team-member');
    const designCards = document.querySelectorAll('.design-card');
    const toolCards = document.querySelectorAll('.tool-card');
    
    // Track mouse position
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
        
        // Apply subtle rotation to hero image (if it doesn't have parallax class)
        if (heroImage && !heroImage.classList.contains('parallax')) {
            heroImage.style.transform = `translate(${relativeX * 20}px, ${relativeY * 20}px) rotate(${relativeX * 2}deg)`;
        }
        
        // Apply subtle movement to feature cards
        featureCards.forEach((card, index) => {
            // Only apply if not a parallax element
            if (!card.classList.contains('parallax')) {
                const offsetX = relativeX * 5 * (index % 3 + 1) * 0.5;
                const offsetY = relativeY * 5 * (index % 2 + 1) * 0.5;
                card.style.transform = `translateY(${offsetY}px)`;
            }
        });
        
        // Apply subtle movement to team members
        teamMembers.forEach((member, index) => {
            // Only apply if not a parallax element
            if (!member.classList.contains('parallax')) {
                const offsetX = relativeX * 4 * ((index % 4) - 1.5) * 0.7;
                const offsetY = relativeY * 4 * ((index % 3) - 1) * 0.7;
                member.style.transform = `translateY(${offsetY}px)`;
            }
        });
    });
    
    // Update window dimensions on resize
    window.addEventListener('resize', function() {
        windowWidth = window.innerWidth;
        windowHeight = window.innerHeight;
    });
});
