// Documentation Page Functionality
document.addEventListener('DOMContentLoaded', function() {
    // Handle smooth scrolling for documentation links
    const docLinks = document.querySelectorAll('.documentation-nav a');
    
    docLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Remove active class from all links
            docLinks.forEach(l => l.classList.remove('active'));
            
            // Add active class to clicked link
            this.classList.add('active');
            
            // Get target section
            const targetId = this.getAttribute('href').substring(1);
            const targetSection = document.getElementById(targetId);
            
            // Hide all sections
            const allSections = document.querySelectorAll('.documentation-item');
            allSections.forEach(section => {
                section.classList.remove('active');
            });
            
            // Show target section
            targetSection.classList.add('active');
            
            // Scroll to top of documentation content
            const docContent = document.querySelector('.documentation-content');
            docContent.scrollTop = 0;
        });
    });
    
    // Handle PDF fullscreen toggle
    const fullscreenToggle = document.getElementById('fullscreen-toggle');
    if (fullscreenToggle) {
        fullscreenToggle.addEventListener('click', function(e) {
            e.preventDefault();
            
            const pdfViewer = document.querySelector('.pdf-viewer');
            
            if (!document.fullscreenElement) {
                if (pdfViewer.requestFullscreen) {
                    pdfViewer.requestFullscreen();
                } else if (pdfViewer.webkitRequestFullscreen) {
                    pdfViewer.webkitRequestFullscreen();
                } else if (pdfViewer.msRequestFullscreen) {
                    pdfViewer.msRequestFullscreen();
                }
                this.innerHTML = '<i class="fas fa-compress"></i> Exit Fullscreen';
            } else {
                if (document.exitFullscreen) {
                    document.exitFullscreen();
                } else if (document.webkitExitFullscreen) {
                    document.webkitExitFullscreen();
                } else if (document.msExitFullscreen) {
                    document.msExitFullscreen();
                }
                this.innerHTML = '<i class="fas fa-expand"></i> Fullscreen';
            }
        });
    }
    
    // Handle fullscreen change event
    document.addEventListener('fullscreenchange', updateFullscreenButton);
    document.addEventListener('webkitfullscreenchange', updateFullscreenButton);
    document.addEventListener('mozfullscreenchange', updateFullscreenButton);
    document.addEventListener('MSFullscreenChange', updateFullscreenButton);
    
    function updateFullscreenButton() {
        const fullscreenToggle = document.getElementById('fullscreen-toggle');
        if (fullscreenToggle) {
            if (document.fullscreenElement) {
                fullscreenToggle.innerHTML = '<i class="fas fa-compress"></i> Exit Fullscreen';
            } else {
                fullscreenToggle.innerHTML = '<i class="fas fa-expand"></i> Fullscreen';
            }
        }
    }
    
    // Add PDF loading indicator
    const pdfViewer = document.querySelector('.pdf-viewer');
    if (pdfViewer) {
        const pdfContainer = document.querySelector('.pdf-container');
        
        // Create loading indicator
        const loadingIndicator = document.createElement('div');
        loadingIndicator.className = 'pdf-loading';
        loadingIndicator.innerHTML = '<i class="fas fa-spinner fa-spin"></i><p>Loading PDF...</p>';
        pdfContainer.appendChild(loadingIndicator);
        
        // Hide loading indicator when PDF is loaded
        pdfViewer.addEventListener('load', function() {
            loadingIndicator.style.display = 'none';
        });
    }
});
