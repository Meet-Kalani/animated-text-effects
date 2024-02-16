document.addEventListener('DOMContentLoaded', () => {
    const box = document.querySelector('.box');
    const fadeInBtn = document.querySelector('.fade-in-btn');
    const bounceBtn = document.querySelector('.bounce-btn');

    fadeInBtn.addEventListener('click', () => {
        box.classList.remove('bouncex-animation');
        
        box.classList.add('fade-in-animation');
    });

    bounceBtn.addEventListener('click', () => {
        box.classList.remove('fade-in-animation');

        box.classList.add('bounce-animation');
    })

    box.style.animationName = null;
})