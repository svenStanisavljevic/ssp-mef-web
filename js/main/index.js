import { loadNavbar, showNavbarOnScroll } from './navbar.js';
import { loadGallery } from './gallery.js';


document.addEventListener('DOMContentLoaded', () => {
    loadNavbar();
    showNavbarOnScroll();
    const mainElement = document.querySelector('.gallery');
    if (mainElement) {
        loadGallery(mainElement);
    }
});
