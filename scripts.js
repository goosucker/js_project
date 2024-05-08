let images =  [{
    url: "images/first-img.png"
}, {
    url: "images/second-img.png"
}, {
    url: "images/third-img.png"
}];
function initSlider() {
    if (!images || !images.length) return;
    
    let navImages = document.querySelector('.nav__imgs');
    let sliderArrows = document.querySelector('.slider__arrows');
    let sliderDots = document.querySelector('.slider__dots');
    let sliderNav = document.querySelector('.nav');
    let navBtns = document.querySelectorAll('.nav__btn');
    let navLines = document.querySelectorAll('.nav__line');
    let sliderInfo = document.querySelectorAll('.about-text');

    initImages();
    initArrows();
    initDots();
    initBtns();

    function initImages() {
        images.forEach((image, index) => {
            let imageDiv = `<div class="img n${index} ${index === 0? "active" : ""}" style="background-image:url(${images[index].url});" data-index="${index}"></div>`;
            navImages.innerHTML += imageDiv;
            if (index === 0) {
                navBtns[0].classList.add('nav-active');
                navLines[0].classList.add('line-active');
                sliderInfo.forEach(info => {
                    if (info.classList.contains('n0')) {
                        info.classList.add('info-active');
                    }
                }) 
            }
        });
    }

    function initArrows() {
        sliderArrows.querySelectorAll('.slider__arrow').forEach(arrow => {
            arrow.addEventListener('click', function() {
                let curNumber = +navImages.querySelector('.active').dataset.index;
                let nextNumber;
                if (arrow.classList.contains('left')) {
                    nextNumber = curNumber === 0? images.length - 1 : curNumber - 1;
                } else {
                    nextNumber = curNumber === images.length - 1? 0 : curNumber + 1;
                }
                moveSlider(nextNumber);
            });
        });
    }

    function moveSlider(num) {
        navImages.querySelector('.active').classList.remove('active');
        navImages.querySelector('.n' + num).classList.add('active');
        sliderDots.querySelector('.dot-active').classList.remove('dot-active');
        sliderDots.querySelector('.n' + num).classList.add('dot-active');
        sliderNav.querySelector('.nav-active').classList.remove('nav-active');
        sliderNav.querySelector('.n' + num).classList.add('nav-active');
        sliderNav.querySelector('.line-active').classList.remove('line-active');
        sliderNav.querySelector('.no' + num).classList.add('line-active');
        sliderInfo.forEach(info => {
            if (info.classList.contains('info-active')) {
                info.classList.remove('info-active');
            }
            if (info.classList.contains(`n${num}`)) {
                info.classList.add('info-active');
            }
        })
    }

    function initDots() {
        images.forEach((image, index) => {
            let dot = `<div class="slider__dot n${index} ${index === 0? "dot-active" : ""}" data-index="${index}"></div>`;
            sliderDots.innerHTML += dot;
        });
        sliderDots.querySelectorAll('.slider__dot').forEach(dot => {
            dot.addEventListener('click', function() {
                moveSlider(this.dataset.index);
            })
        })
    }
    
    function initBtns() {
        navBtns.forEach((btn, index) => {
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                moveSlider(index);
            })
        })
    }
}
document.addEventListener('DOMContentLoaded', initSlider);