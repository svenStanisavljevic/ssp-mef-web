let lastScrollY = window.scrollY;

window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    
    if (window.scrollY < lastScrollY) {
        navbar.classList.remove('hidden');
    } else {
        navbar.classList.add('hidden');
    }
    
    lastScrollY = window.scrollY;
});
