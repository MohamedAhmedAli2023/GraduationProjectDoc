// Interactive Demo Functionality
document.addEventListener('DOMContentLoaded', function() {
    // Tab switching functionality
    const demoTabs = document.querySelectorAll('.demo-tab');
    const demoContents = document.querySelectorAll('.demo-tab-content');
    
    demoTabs.forEach(tab => {
        tab.addEventListener('click', () => {
            const tabId = tab.getAttribute('data-tab');
            
            // Remove active class from all tabs and contents
            demoTabs.forEach(t => t.classList.remove('active'));
            demoContents.forEach(c => c.classList.remove('active'));
            
            // Add active class to clicked tab and corresponding content
            tab.classList.add('active');
            document.getElementById(`${tabId}-tab`).classList.add('active');
        });
    });
    
    // Booking flow navigation
    const prevButton = document.getElementById('prev-step');
    const nextButton = document.getElementById('next-step');
    const demoSteps = document.querySelectorAll('.demo-step');
    const demoImages = document.querySelectorAll('.demo-image');
    
    let currentStep = 1;
    const totalSteps = demoSteps.length;
    
    // Update the UI based on the current step
    function updateStepUI() {
        // Update step indicators
        demoSteps.forEach(step => {
            const stepNumber = parseInt(step.getAttribute('data-step'));
            if (stepNumber === currentStep) {
                step.classList.add('active');
            } else {
                step.classList.remove('active');
            }
        });
        
        // Update images
        demoImages.forEach(image => {
            const imageStep = parseInt(image.getAttribute('data-step'));
            if (imageStep === currentStep) {
                image.classList.add('active');
            } else {
                image.classList.remove('active');
            }
        });
        
        // Update buttons
        prevButton.disabled = currentStep === 1;
        nextButton.disabled = currentStep === totalSteps;
        
        // Change next button text on last step
        if (currentStep === totalSteps) {
            nextButton.textContent = 'Finish';
        } else {
            nextButton.textContent = 'Next';
        }
    }
    
    // Event listeners for navigation buttons
    prevButton.addEventListener('click', () => {
        if (currentStep > 1) {
            currentStep--;
            updateStepUI();
        }
    });
    
    nextButton.addEventListener('click', () => {
        if (currentStep < totalSteps) {
            currentStep++;
            updateStepUI();
        } else {
            // Reset to first step when finished
            currentStep = 1;
            updateStepUI();
        }
    });
    
    // Allow clicking on step indicators to navigate
    demoSteps.forEach(step => {
        step.addEventListener('click', () => {
            currentStep = parseInt(step.getAttribute('data-step'));
            updateStepUI();
        });
    });
    
    // Initialize with step 1 active
    updateStepUI();
    
    // Add animation when demo section comes into view
    const demoSection = document.querySelector('.demo');
    const observer = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting) {
            demoSection.classList.add('revealed');
            observer.unobserve(demoSection);
        }
    }, { threshold: 0.1 });
    
    observer.observe(demoSection);
});
