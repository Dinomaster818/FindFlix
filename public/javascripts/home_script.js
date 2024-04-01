
const progressCircle = document.querySelector(".autoplay-progress svg");
const progressContent = document.querySelector(".autoplay-progress span");
var swiper = new Swiper(".mySwiper", {
    centeredSlides: true,
    autoplay: {
        delay: 5000,
        disableOnInteraction: false
    },
    speed: 1500,
    pagination: {
        el: ".swiper-pagination",
        clickable: true
    },
    navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev"
    },
    on: {
        autoplayTimeLeft(s, time, progress) {
            progressCircle.style.setProperty("--progress", 1 - progress);
            progressContent.textContent = `${Math.ceil(time / 1000)}s`;
        }
    }
});


// Check if the clicked button is already active
function changeBackgroundColor(event) {
    if (event.target.style.backgroundColor === 'red') {
        event.target.style.backgroundColor = '';
    } else {
        var buttons = document.querySelectorAll('.category-btn');
        buttons.forEach(function (button) {
            button.style.backgroundColor = '';
        });
        event.target.style.backgroundColor = 'red';
    }
}

var buttons = document.querySelectorAll('.category-btn');

buttons.forEach(function (button) {
    button.addEventListener('click', changeBackgroundColor);
});
