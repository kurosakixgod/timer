"use strict";

window.addEventListener('DOMContentLoaded', () => {
    const circleInner = document.querySelector('.timer__circle_inner'),
          inputTime = document.querySelectorAll('.range'),
          startButton = document.querySelector('.start'),
          endButton = document.querySelector('.end'),
          timeInTimer = circleInner.querySelectorAll('.time'),
          hamburger = document.querySelector('.hamburger'),
          modal = document.querySelector('.modal'),
          circle = document.querySelector('.timer circle'),
          timerLinkButton = document.querySelector('.modal__timer'),
          stopwatchLinkButton = document.querySelector('.modal__stopwatch'),
          realTimeLinkButton = document.querySelector('.modal__real-time'),
          stopwatch = document.querySelector('.stopwatch'),
          stopwatchTime = stopwatch.querySelectorAll('.time'),
          stopwatchStartButton = stopwatch.querySelector('.stopwatch__start'),
          stopwatchEndButton = stopwatch.querySelector('.stopwatch__end'),
          stopwatchResetButton = stopwatch.querySelector('.stopwatch__reset'),
          blocks = document.querySelectorAll('.link'),
          linkButtons = modal.querySelectorAll('.round'),
          realTimeWindow = document.querySelector('.real-time'),
          realTime = realTimeWindow.querySelectorAll('.time'),
          realTimeDate = realTimeWindow.querySelector('.real-time__date');
    let timerId;
    let stopwatchId;
    let realTimeId;
    console.log(linkButtons);
    inputTime.forEach((item,i) => {
        let inputValue;
        item.addEventListener('input', () => {
            inputValue = +item.value;
            timeInTimer[i].textContent = inputValue < 10 ? `0${inputValue}` : `${inputValue}`;
        })
    })

    realTimeId = setInterval(() => {
        const months = ['January', 'February', 'March' , 'April', 'May' , 'June', 'July' , 'August', 'September', 'October', 'November', 'December'];
        let realDate = new Date(),
          realSeconds = realDate.getSeconds(),
          realMinutes = realDate.getMinutes(),
          realHours = realDate.getHours(),
          realMonth = realDate.getMonth(),
          realDay = realDate.getDay();

        realTime[2].textContent = (realSeconds % 60 < 10) ? `0${realSeconds % 60}` : `${realSeconds % 60}`;
        realTime[1].textContent = (realMinutes % 60 < 10) ? `0${realMinutes % 60}` : `${realMinutes % 60}`;
        realTime[0].textContent = (realHours % 24 < 10) ? `0${realHours % 24}` : `${realHours % 24}`;
        realTimeDate.textContent = `${realDay}th ${months[realMonth]}`
    },1000)
    

    function startStopwatch() {
        stopwatchStartButton.classList.add('hide');
        stopwatchResetButton.classList.remove('hide');
        const stopwatchTotalTimeArray = [...stopwatchTime];
        let stopwatchTotalTime = stopwatchTotalTimeArray.reduceRight((sum,cur,index) => sum + +cur.textContent*60**(2-index),0);
        stopwatchId = setInterval(() => {
            stopwatchTime[2].textContent = (stopwatchTotalTime % 60 < 10) ? `0${stopwatchTotalTime % 60}` : `${stopwatchTotalTime % 60}`;
            stopwatchTime[1].textContent = (Math.floor(stopwatchTotalTime/60 % 60)) < 10 ? `0${Math.floor(stopwatchTotalTime/60 % 60)}` : `${Math.floor(stopwatchTotalTime/60 % 60)}`;
            stopwatchTime[0].textContent = (Math.floor(stopwatchTotalTime/3600)) < 10 ? `0${Math.floor(stopwatchTotalTime/3600)}` : `${Math.floor(stopwatchTotalTime/3600)}`;
            stopwatchTotalTime += 1
        },1000)
        stopwatchResetButton.addEventListener('click', () => {
            stopwatchTotalTime = 0;
            stopwatchTime[2].textContent = (stopwatchTotalTime % 60 < 10) ? `0${stopwatchTotalTime % 60}` : `${stopwatchTotalTime % 60}`;
            stopwatchTime[1].textContent = (Math.floor(stopwatchTotalTime/60 % 60)) < 10 ? `0${Math.floor(stopwatchTotalTime/60 % 60)}` : `${Math.floor(stopwatchTotalTime/60 % 60)}`;
            stopwatchTime[0].textContent = (Math.floor(stopwatchTotalTime/3600)) < 10 ? `0${Math.floor(stopwatchTotalTime/3600)}` : `${Math.floor(stopwatchTotalTime/3600)}`;
            if (stopwatchTotalTime === 0 ) {
                stopwatchStartButton.classList.remove('hide');
                stopwatchResetButton.classList.add('hide');
                endStopwatch();
            }
        });
    }

    function endStopwatch() {
        clearInterval(stopwatchId);
    }

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
        modal.classList.remove('hide');
        modal.classList.add('modalOn')
    }

    function modalOff() {
        modal.classList.remove('modalOn');
        modal.classList.add('hide');
    }

    hamburger.addEventListener('click', () => {
        if (hamburger.classList.contains('hamburger_active')){
            // modal.classList.remove('zYep');
            // modal.classList.add('zNone');
            // modal.style.opacity = 0;
            modal.classList.add('modal_hide');
            modal.classList.remove('modal_show');
            hamburger.classList.remove('hamburger_active');   
        } else {
            // modal.style.opacity = 1;
            // modal.classList.remove('zNone');
            // modal.classList.add('zYep');
            modal.classList.add('modal_show');
            modal.classList.remove('modal_hide');
            hamburger.classList.add('hamburger_active');
            // blocks.forEach(block => {
            //     if (!block.classList.contains('hide')) {
            //         block.classList.add('hide')
            //     }
            // })
        }

        // if (modal.classList.contains('hide')) {
        //     stopwatch.classList.add('hide')
        //     modalOn();
        //     hamburger.classList.add('hamburger_active')
        // } else {
        //     hamburger.classList.remove('hamburger_active')
        //     modalOff();
        // }
    })

    startButton.addEventListener('click', startTimer);
    endButton.addEventListener('click', endTimer);
    // timerLinkButton.addEventListener('click', () => {
    //     modalOff();
    //     hamburger.classList.remove('hamburger_active');
    //     realTimeWindow.classList.add('hide');
    // });
    // stopwatchLinkButton.addEventListener('click', () => {
    //     modalOff();
    //     stopwatch.classList.remove('hide');
    //     hamburger.classList.remove('hamburger_active');
    // })
    // realTimeLinkButton.addEventListener('click', () => {
    //     modalOff();
    //     realTimeWindow.classList.remove('hide');
    //     hamburger.classList.remove('hamburger_active');
    // })

    modal.addEventListener('click', (e) => {
        const el = e.target;
        if (el.classList.contains('round')){
            blocks.forEach(item => item.classList.add('hide'))
            linkButtons.forEach((link,i) => {
                if (link === el) {
                    
                    blocks[i].classList.remove('hide');
                    hamburger.classList.remove('hamburger_active');
                    modal.classList.remove('modal_show');
                    modal.classList.add('modal_hide');
                }
            })
        }
    })
    
    stopwatchStartButton.addEventListener('click', startStopwatch);
    stopwatchEndButton.addEventListener('click', endStopwatch);
})  

