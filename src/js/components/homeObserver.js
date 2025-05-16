const lazyGroupHomeCard = document.querySelectorAll(".popular-personalities__person-element");
const lazyHomeCardObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
        }
    });
}, {threshold: 0.3});

lazyGroupHomeCard.forEach(element => {
    lazyHomeCardObserver.observe(element);
});