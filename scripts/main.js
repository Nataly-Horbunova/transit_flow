// ==============  HERO BACKGROUND ANIMATION  ===============

fetch('data.json')
    .then(response => response.json())
    .then(data => {
        const heroSection = document.querySelector('.hero-section');
        heroSection.style.backgroundColor = 'linear-gradient(90.93deg, #032D5F 18.18%, rgba(9, 18, 66, 0.2) 64.92%) center/cover, url("./assets/hero/hero_1.png") center/cover;'
        let currentIndex = 0;
        changeBackground();
        setInterval(changeBackground, 3000);

        function changeBackground() {
            heroSection.style.background = `linear-gradient(90.93deg, #032D5F 18.18%, rgba(9, 18, 66, 0.2) 64.92%) center/cover, url("./assets/hero/${data.heroImgs[currentIndex]}") center/cover`;
            currentIndex++;

            if (currentIndex >= data.heroImgs.length) {
                currentIndex = 0;
            }
        }
    });


//============== NAV MENU =================

document.querySelector('.header-nav-list').addEventListener('click', (e) => {
    if(e.target.nodeName !== "A") return;
    console.log(e.target.nodeName);
    const menuItems = document.querySelectorAll('.header-nav-list-link');
    menuItems.forEach((item) => {
        item.style.color = `#ffffff`;
    });

    e.target.style.color = `#FFBE34`;
})

// ================ SCROLL BUTTON ==============

const scrollBtn = document.querySelector('.scroll-btn');
let scrollUp;

scrollBtn.addEventListener('click', () => {
    if(scrollUp) {
        scrollBtn.firstElementChild.src = `./assets/chevron-up.svg`;
        scrollToBottom();
    } else {
        scrollBtn.firstElementChild.src = `./assets/chevron-down.svg`;
        scrollToTop();
    }

    scrollUp = !scrollUp;
});

function scrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}

function scrollToBottom() {
    window.scrollTo({
        top: document.documentElement.scrollHeight,
        behavior: 'smooth'
    });
}