"use strict";

window.addEventListener('DOMContentLoaded', () => {
    const start = document.querySelector('.start'),
          end = document.querySelector('.end'),
          hoursInTimer = document.querySelector('.hours'),
          minutesInTimer = document.querySelector('.minutes'),
          secondsInTimer = document.querySelector('.seconds'),
          input = document.querySelector('.timer__input'),
          block = document.querySelector('.block')
    let timerId,
      hours = 0,
      minutes = 0,
      seconds = 0;
        
    // function timer(){
    //     console.log(i);
    //     i++
    // }    
    let i = getCurrentSecond(); 
    start.addEventListener('click', () => {
        timerId = setTimeout(function timer(){
            i--
            secondsInTimer.textContent = i < 10 ? `0${i}` : `${i}`
            timerId = setTimeout(timer,1000)
        })
        
    })

    function getCurrentSecond() {
        let inputValue = +input.value;
        block.textContent = inputValue;
        console.log(inputValue);
        return inputValue
        
    }

    input.addEventListener('input', getCurrentSecond)

    end.addEventListener('click', () => {
        clearInterval(timerId)
    })
})