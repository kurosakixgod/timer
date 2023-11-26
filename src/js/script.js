"use strict";

window.addEventListener('DOMContentLoaded', () => {
    const circleInner = document.querySelector('.timer__circle_inner'),
          inputTime = document.querySelectorAll('.range'),
          startButton = document.querySelector('.start'),
          endButton = document.querySelector('.end'),
          timeInTimer = document.querySelectorAll('.time'),
          hamburger = document.querySelector('.hamburger'),
          modal = document.querySelector('.modal'),
          circle = document.querySelector('.timer circle'),
          timerLinkButton = document.querySelector('.modal__timer'),
          stopwatchLinkButton = document.querySelector('.modal__stopwatch'),
          realTimeLinkButton = document.querySelector('.modal__real-time'),
          stopwatch = document.querySelector('.stopwatch');
    console.log(circle);
    let timerId;

    inputTime.forEach((item,i) => {
        let inputValue;
        item.addEventListener('input', () => {
            inputValue = +item.value;
            timeInTimer[i].textContent = inputValue < 10 ? `0${inputValue}` : `${inputValue}`;
        })
    })

    function startTimer() {
        const totalTimeArray = [...timeInTimer];
        let totalTime = totalTimeArray.reduceRight((sum,cur,index) => sum + +cur.textContent*60**(2-index),0);
        circleInner.classList.add('timer_on');
        circleInner.classList.remove('timer_off');
        timerId = setInterval(() => {   
            if (totalTime <= 0) {
                clearInterval(timerId)
                return
            }
            circleInner.style.background = `conic-gradient(#7d2ae8 ${totalTime}deg, #ededed 0deg)`
            totalTime -= 1
            timeInTimer[2].textContent = (totalTime % 60 < 10) ? `0${totalTime % 60}` : `${totalTime % 60}`;
            timeInTimer[1].textContent = (Math.floor(totalTime/60 % 60)) < 10 ? `0${Math.floor(totalTime/60 % 60)}` : `${Math.floor(totalTime/60 % 60)}`;
            timeInTimer[0].textContent = (Math.floor(totalTime/3600 % 24)) < 10 ? `0${Math.floor(totalTime/3600 % 24)}` : `${Math.floor(totalTime/3600 % 24)}`;
        },1000)
    }

    function endTimer() {
        circleInner.classList.remove('timer_on')
        circleInner.classList.add('timer_off');
        clearInterval(timerId);
    }

    function modalOn() {
        modal.classList.add('modalOn')
        modal.classList.remove('hide');
    }

    function modalOff() {
        modal.classList.remove('modalOn');
        modal.classList.add('hide');
    }

    hamburger.addEventListener('click', () => {
        if (modal.classList.contains('hide')) {
            modalOn();
            stopwatch.style.display = 'none';
        } else {
            modalOff();
        }
    })

    startButton.addEventListener('click', startTimer)
    endButton.addEventListener('click', endTimer)
    timerLinkButton.addEventListener('click', () => {
        modalOff();
    })
})

