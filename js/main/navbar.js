export async function loadNavbar() {
    try {
        const response = await fetch('../../navbar.html'); 
        if (!response.ok) {
            throw new Error(`Error loading: ${response.statusText}`);
        }
        const navbarHTML = await response.text();
        document.body.insertAdjacentHTML('afterbegin', navbarHTML);
    } catch (error) {
        console.error('Navbar loading failed:', error);
    }
}

export function showNavbarOnScroll() {
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
}