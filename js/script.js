window.addEventListener('DOMContentLoaded', function(){

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
        if(tabContent[b].classList.contains('hide')) {
            tabContent[b].classList.remove('hide');
            tabContent[b].classList.add('show');
        }
    }

    info.addEventListener('click', function(event) {
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

    let deadline ='2020-04-27';

    function getTimeRamaining(endtime) {
        let t = Date.parse(endtime) - Date.parse(new Date());
        if (t < 0) {
            t = 0;
        }
        let seconds = Math.floor((t/1000) % 60),
            minutes = Math.floor((t/1000/60) % 60),
            hours = Math.floor(t/1000/60/60);
            
            return {
                'total' : t,
                'hours' : hours,
                'minutes' : minutes,
                'seconds' : seconds,
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
});