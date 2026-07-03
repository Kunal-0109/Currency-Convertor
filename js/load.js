
document.addEventListener("DOMContentLoaded", () => {
    // Select all elements that have the scroll-reveal class
    const revealElements = document.querySelectorAll('.scroll-reveal');

    const appearanceOptions = {
        threshold: 0.15, // Triggers when 15% of the section is visible on screen
        rootMargin: "0px 0px -50px 0px" // Slightly offsets the bottom trigger for better timing
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Add the active class to trigger the CSS animation
                entry.target.classList.add('active');
                
                // Stop observing once the animation plays so it doesn't repeat
                // observer.unobserve(entry.target);
            }
        });
    }, appearanceOptions);

    // Track every reveal element
    revealElements.forEach(element => {
        observer.observe(element);
    });
});