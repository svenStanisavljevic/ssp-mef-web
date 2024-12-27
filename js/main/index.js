import { loadNavbar } from './navbar.js'
import { showNavbarOnScroll } from './navbar.js';
import { loadGallery } from './gallery.js';


showNavbarOnScroll();
document.addEventListener('DOMContentLoaded', () => {
    loadNavbar();
    const mainElement = document.querySelector('.gallery');
    if (mainElement) {
        loadGallery(mainElement);
    } else {
        console.error("Main element not found!");
    }
});
