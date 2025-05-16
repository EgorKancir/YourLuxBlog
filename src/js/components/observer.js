setTimeout(() => {
    const lazyGroupImage = document.querySelectorAll(".post-card__cover");
    const lazyGroupCard = document.querySelectorAll(".post-card");


    const lazyImageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const realSrc = entry.target.dataset.cover;
                if (realSrc) {
                    entry.target.src = realSrc;
                    entry.target.classList.add('visible');
                    observer.unobserve(entry.target);
                }
            }
        });
    }, {threshold: 1});

    const lazyCardObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, {threshold: 0.7});

    lazyGroupImage.forEach(element => {
        lazyImageObserver.observe(element);
    });

    lazyGroupCard.forEach(element => {
        lazyCardObserver.observe(element);
    });
}, 100);



