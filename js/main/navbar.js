export async function loadNavbar() {
    const nav = document.querySelector('#navbar');
    if (!nav) return;

    try {
        const response = await fetch(new URL('../../navbar.html', import.meta.url));
        if (!response.ok) throw new Error(`Error loading: ${response.statusText}`);
        nav.innerHTML = await response.text();

        const toggle = nav.querySelector('.menu-toggle');
        const links = nav.querySelector('.navbar');
        const closeMenu = () => {
            links.classList.remove('is-open');
            toggle.setAttribute('aria-expanded', 'false');
        };

        toggle.addEventListener('click', () => {
            const isOpen = links.classList.toggle('is-open');
            toggle.setAttribute('aria-expanded', String(isOpen));
        });

        links.addEventListener('click', (event) => {
            if (event.target.closest('a')) closeMenu();
        });

        nav.addEventListener('keydown', (event) => {
            if (event.key === 'Escape' && links.classList.contains('is-open')) {
                closeMenu();
                toggle.focus();
            }
        });

        window.matchMedia('(max-width: 700px)').addEventListener('change', closeMenu);

        const updateCurrentLink = () => {
            for (const link of links.querySelectorAll('a')) {
                const destination = new URL(link.href);
                const isHome = location.pathname.endsWith('/') || location.pathname.endsWith('/index.html');
                const onPage = destination.pathname === location.pathname
                    || (isHome && destination.pathname.endsWith('/index.html'));
                const isCurrent = onPage && (destination.hash ? destination.hash === (location.hash || '#about') : !isHome);
                if (isCurrent) link.setAttribute('aria-current', destination.hash ? 'location' : 'page');
                else link.removeAttribute('aria-current');
            }
        };

        updateCurrentLink();
        window.addEventListener('hashchange', updateCurrentLink);
    } catch (error) {
        console.error('Navbar loading failed:', error);
    }
}

export function showNavbarOnScroll() {
    const header = document.querySelector('header');
    if (!header) return;
    let lastScrollY = window.scrollY;

    window.addEventListener('scroll', () => {
        const scrollY = Math.max(0, window.scrollY);
        if (Math.abs(scrollY - lastScrollY) < 8 && scrollY > 120) return;
        const isMenuOpen = header.querySelector('.menu-toggle')?.getAttribute('aria-expanded') === 'true';
        header.classList.toggle('navbar-hidden', scrollY > 120 && scrollY > lastScrollY && !isMenuOpen && !header.contains(document.activeElement));
        lastScrollY = scrollY;
    }, { passive: true });

    header.addEventListener('focusin', () => header.classList.remove('navbar-hidden'));
}
