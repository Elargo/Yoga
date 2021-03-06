window.addEventListener('DOMContentLoaded', function () {

    'use strict';

    let tab = document.querySelectorAll('.info-header-tab'),
        info = document.querySelector('.info-header'),
        tabContent = document.querySelectorAll('.info-tabcontent');

    function hideTabContent(a) {
        for (let i = a; i < tabContent.length; i++) {
            tabContent[i].classList.remove('show');
            tabContent[i].classList.add('hide');
        }
    }

    hideTabContent(1);

    function showTabContent(b) {
        if (tabContent[b].classList.contains('hide')) {
            tabContent[b].classList.remove('hide');
            tabContent[b].classList.add('show');
        }
    }

    info.addEventListener('click', function (event) {
        let target = event.target;
        if (target && target.classList.contains('info-header-tab')) {
            for (let i = 0; i < tab.length; i++) {
                if (target == tab[i]) {
                    hideTabContent(0);
                    showTabContent(i);
                    break;
                }
            }
        }
    });

    //Timer

    let deadline = '2020-05-01 12:00';

    function getTimeRamaining(endtime) {
        let t = Date.parse(endtime) - Date.parse(new Date());
        if (t < 0) {
            t = 0;
        }
        let seconds = Math.floor((t / 1000) % 60),
            minutes = Math.floor((t / 1000 / 60) % 24),
            hours = Math.floor(t / 1000 / 60 / 60);

        return {
            'total': t,
            'hours': hours,
            'minutes': minutes,
            'seconds': seconds,
        };
    }

    function setClock(id, endtime) {
        let timer = document.getElementById(id),
            hours = timer.querySelector('.hours'),
            minutes = timer.querySelector('.minutes'),
            seconds = timer.querySelector('.seconds'),
            timeInterval = setInterval(updateClock, 1000);


        function checkNumber(num) {
            if (num < 10) {
                return '0' + num;
            }
            return num;
        }

        function updateClock() {
            let t = getTimeRamaining(endtime);

            hours.textContent = checkNumber(t.hours);
            minutes.textContent = checkNumber(t.minutes);
            seconds.textContent = checkNumber(t.seconds);

            if (t.total <= 0) {
                clearInterval(timeInterval);
            }
        }
    }

    setClock('timer', deadline);

    // Modal

    let more = document.querySelector('.more'),
        inform = document.querySelector('.info'),
        overlay = document.querySelector('.overlay'),
        close = document.querySelector('.popup-close');

    more.addEventListener('click', function () {
        overlay.style.display = 'block';
        this.classList.add('more-splash');
        document.body.style.overflow = 'hidden';
    });

    close.addEventListener('click', function () {
        overlay.style.display = 'none';
        more.classList.remove('more-splash');
        document.body.style.overflow = '';
    });

    inform.addEventListener('click', function () {
        let target = event.target;
        if (target && target.classList.contains('description-btn')) {
            overlay.style.display = 'block';
            this.classList.add('more-splash');
            document.body.style.overflow = 'hidden';
        }
    });

    // Form

    let message = {
        loading: "Загрузка...",
        success: "Спасибо! Скоро мы с Вами свяжемся!",
        failure: "Что-то пошло не так"
    };

    let form = document.querySelector('.main-form'),
        contactForm = document.getElementById('form'),
        statusMessage = document.createElement('div');

    statusMessage.classList.add('status');

    function sendForm(elem) {
        let input = elem.getElementsByTagName('input');

        elem.addEventListener('submit', function (event) {
            event.preventDefault();
            elem.appendChild(statusMessage);
            
            let formData = new FormData(elem);
            let obj = {};
            formData.forEach(function (value, key) {
                obj[key] = value;
            });
            let json = JSON.stringify(obj);
            
            function postData(data) {
                return new Promise(function(resolve, reject){
                    let request = new XMLHttpRequest();
                    request.open('POST', 'server.php');
                    request.setRequestHeader('Content-type', 'application/json; charset=utf-8');
                    request.onreadystatechange = function () {
                        if (request.readyState < 4) {
                            // statusMessage.innerHTML = message.loading;
                            resolve();
                        } else if (request.readyState === 4 && request.status == 200) {
                            // statusMessage.innerHTML = message.success;
                            resolve();
                        } else {
                            // statusMessage.innerHTML = message.failure;
                            reject();
                        }
                    };
                    request.send(data);
                });
            }
            function clearInput () {
                for (let i = 0; i < input.length; i++) {
                    input[i].value = '';
                }
            }
            postData(json)
                            .then(() => statusMessage.innerHTML = message.loading)
                            .then(() => statusMessage.innerHTML = message.success)
                            .catch(() => statusMessage.innerHTML = message.failure)
                            .then(clearInput());
        });
    }
    sendForm(form);
    sendForm(contactForm);

    // Slider

    let slideIndex = 1,
        slides = document.querySelectorAll('.slider-item'),
        prev = document.querySelector('.prev'),
        next = document.querySelector('.next'),
        dotsWrap = document.querySelector('.slider-dots'),
        dots = document.querySelectorAll('.dot');

    showSlides(slideIndex);    
    function showSlides(n) {

        if (n > slides.length) {
            slideIndex = 1;
        } else if (n < 1) {
            slideIndex = slides.length;
        }

        slides.forEach((item) => item.style.display = 'none');
        dots.forEach((item) => item.classList.remove('dot-active'));

        slides[slideIndex - 1].style.display = 'block';
        dots[slideIndex - 1].classList.add('dot-active');
    }

    function plusSlides(n) {
        showSlides(slideIndex += n);
    }

    function currentSlide (n) {
        showSlides(slideIndex = n);
    }

    prev.addEventListener('click', function() {
        plusSlides(-1);
    });

    next.addEventListener('click', function() {
        plusSlides(1);
    });

    dotsWrap.addEventListener('click', function(event) {
        for (let i = 0; i < dots.length + 1; i++) {
            if (event.target.classList.contains('dot') && event.target == dots[i-1]) {
                currentSlide(i);
            }
        }
    });
});