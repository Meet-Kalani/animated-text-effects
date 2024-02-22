// DOM elements
const fadeInBtnElement = document.querySelector('.fade-in-btn');
const bounceBtnElement = document.querySelector('.bounce-btn');
const typingBtnElement = document.querySelector('.typing-btn'); 
const animationTextElement = document.querySelector('.animation-text');

// Storing the initial text content for typing animation
const initialText = animationTextElement.textContent;
// Timeout ID for clearing setTimeout()
let timeoutId;

fadeInBtnElement.addEventListener('click', () => animation('fade-in-animation'));
bounceBtnElement.addEventListener('click', () => animation('bounce-animation'));

function animation(animationName){
    // Only do restart when animation is applied
    if(animationTextElement.classList.value !== 'animation-text'){
        restartAnimation();
    }
    animationTextElement.classList.add(animationName);
}

typingBtnElement.addEventListener('click', () => {
    clearTimeout(timeoutId);
    clearAnimation();
    animationTextElement.textContent = "";
    animationTyping(animationTextElement, initialText);
})

// Function for displaying each character one by one to give typing effect
function animationTyping(animationTextElement, textToAnimate, i = 0) {
    animationTextElement.textContent += textToAnimate[i];
    if (i === textToAnimate.length - 1) {
        return;
    }

    timeoutId = setTimeout(() => animationTyping(animationTextElement, textToAnimate, i + 1), 10);
}

function restartAnimation(){
    clearTimeout(timeoutId);
    animationTextElement.textContent = initialText;
    clearAnimation();

    // triggering reflow
    void animationTextElement.offsetWidth; 
}

function clearAnimation(){
    animationTextElement.classList.remove('fade-in-animation','bounce-animation');
}