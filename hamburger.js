//hamburger.js

// Wait until the page fully loads before doing menu stuff
document.addEventListener('DOMContentLoaded', () => {
    // prevent setting up the menu multiple times
    let menuInitialized = false;
    
    // main setup for mobile menu
    const initMenu = () => {
      const hamburger = document.querySelector('.hamburger');
      const navMenu = document.querySelector('nav ul');
      
      // only set up once
      if (!menuInitialized && hamburger && navMenu) {
        menuInitialized = true;
  
        // Toggle menu open/closed 
        const toggleMenu = (state) => {
          const isOpen = state ?? navMenu.classList.toggle('active');
          hamburger.setAttribute('aria-expanded', isOpen);
        };
  
        // When someone clicks the hamburger icon
        hamburger.addEventListener('click', (e) => {
          e.stopPropagation(); // Dont let this click trigger document click below
          toggleMenu();
        });
  
        // Close menu function for  various triggers
        const closeMenu = () => toggleMenu(false);
        
        // Close menu if clicking outside nav
        document.addEventListener('click', (e) => !e.target.closest('nav') && closeMenu());
        
        // Close menu when esc key is pressed
        document.addEventListener('keydown', (e) => e.key === 'Escape' && closeMenu());
        
        // Close menu after clicking any nav link
        document.addEventListener('click', (e) => e.target.closest('nav a') && closeMenu());
      }
    };
  
    // Check every 100ms if the menu exists
    const checkMenu = setInterval(() => {
      if (document.querySelector('nav ul')) {
        initMenu();
        clearInterval(checkMenu); // Stop checking once we find it
      }
    }, 100);
  });