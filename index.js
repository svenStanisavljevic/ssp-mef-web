document.addEventListener('DOMContentLoaded', function() {
    
    const headings = document.querySelectorAll('h2');

    const observerOptions = {
        threshold: 0.5,
        rootMargin: "-100px",
    };

    const observer = new IntersectionObserver(revealOnScroll, observerOptions);

    function revealOnScroll(entries) {
        const [entry] = entries
        if (entry.isIntersecting) {
            entry.target.classList.remove("hidden");
            entry.target.style.opacity = '1';
        } else {
            entry.target.classList.add("hidden");
            entry.target.style.opacity = '0';

        }
    } 
});

// function getGreeting() {
//     return "Dobrodošli na moju stranicu!";
// }

// function displayGreeting() {
//     const greetingMessage = getGreeting(); // Pozivamo funkciju koja vraća tekst
//     document.getElementById('greeting').textContent = greetingMessage; // Prikazujemo vrijednost u elementu
// }