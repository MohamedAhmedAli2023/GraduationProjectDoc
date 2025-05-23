// Lightbox/Modal Functionality for Images
document.addEventListener('DOMContentLoaded', function() {
    // Create lightbox elements
    const lightboxOverlay = document.createElement('div');
    lightboxOverlay.className = 'lightbox-overlay';
    
    const lightboxContainer = document.createElement('div');
    lightboxContainer.className = 'lightbox-container';
    
    const lightboxImage = document.createElement('img');
    lightboxImage.className = 'lightbox-image';
    
    const lightboxCaption = document.createElement('div');
    lightboxCaption.className = 'lightbox-caption';
    
    const lightboxClose = document.createElement('div');
    lightboxClose.className = 'lightbox-close';
    
    const lightboxNav = document.createElement('div');
    lightboxNav.className = 'lightbox-nav';
    
    const lightboxPrev = document.createElement('div');
    lightboxPrev.className = 'lightbox-nav-button lightbox-prev';
    
    const lightboxNext = document.createElement('div');
    lightboxNext.className = 'lightbox-nav-button lightbox-next';
    
    // Append elements to DOM
    lightboxNav.appendChild(lightboxPrev);
    lightboxNav.appendChild(lightboxNext);
    
    lightboxContainer.appendChild(lightboxImage);
    lightboxContainer.appendChild(lightboxCaption);
    
    lightboxOverlay.appendChild(lightboxContainer);
    lightboxOverlay.appendChild(lightboxClose);
    lightboxOverlay.appendChild(lightboxNav);
    
    document.body.appendChild(lightboxOverlay);
    
    // Get all images that should be zoomable
    const zoomableImages = document.querySelectorAll('.design-card img, .demo-image, .parallax');
    
    // Store all zoomable images for navigation
    let allImages = [];
    let currentImageIndex = 0;
    
    // Add zoomable class and click event to each image
    zoomableImages.forEach((img, index) => {
        img.classList.add('zoomable');
        allImages.push({
            src: img.src,
            alt: img.alt || 'Image ' + (index + 1)
        });
        
        img.addEventListener('click', function() {
            openLightbox(img.src, img.alt, index);
        });
    });
    
    // Function to open lightbox
    function openLightbox(src, alt, index) {
        lightboxImage.src = src;
        lightboxCaption.textContent = alt;
        currentImageIndex = index;
        
        // Show/hide navigation buttons based on position
        updateNavButtons();
        
        // Show lightbox
        lightboxOverlay.classList.add('active');
        
        // Prevent scrolling on body
        document.body.style.overflow = 'hidden';
    }
    
    // Function to close lightbox
    function closeLightbox() {
        lightboxOverlay.classList.remove('active');
        
        // Re-enable scrolling
        document.body.style.overflow = '';
        
        // Clear image source after transition
        setTimeout(() => {
            lightboxImage.src = '';
        }, 300);
    }
    
    // Function to navigate to previous image
    function prevImage() {
        if (currentImageIndex > 0) {
            currentImageIndex--;
            lightboxImage.src = allImages[currentImageIndex].src;
            lightboxCaption.textContent = allImages[currentImageIndex].alt;
            updateNavButtons();
        }
    }
    
    // Function to navigate to next image
    function nextImage() {
        if (currentImageIndex < allImages.length - 1) {
            currentImageIndex++;
            lightboxImage.src = allImages[currentImageIndex].src;
            lightboxCaption.textContent = allImages[currentImageIndex].alt;
            updateNavButtons();
        }
    }
    
    // Function to update navigation buttons
    function updateNavButtons() {
        lightboxPrev.style.visibility = currentImageIndex > 0 ? 'visible' : 'hidden';
        lightboxNext.style.visibility = currentImageIndex < allImages.length - 1 ? 'visible' : 'hidden';
    }
    
    // Event listeners
    lightboxClose.addEventListener('click', closeLightbox);
    lightboxPrev.addEventListener('click', prevImage);
    lightboxNext.addEventListener('click', nextImage);
    
    // Close lightbox when clicking outside the image
    lightboxOverlay.addEventListener('click', function(e) {
        if (e.target === lightboxOverlay) {
            closeLightbox();
        }
    });
    
    // Keyboard navigation
    document.addEventListener('keydown', function(e) {
        if (!lightboxOverlay.classList.contains('active')) return;
        
        if (e.key === 'Escape') {
            closeLightbox();
        } else if (e.key === 'ArrowLeft') {
            prevImage();
        } else if (e.key === 'ArrowRight') {
            nextImage();
        }
    });
});
