document.addEventListener('DOMContentLoaded', () => {
    const fadeInBtnElement = document.querySelector('.fade-in-btn');
    const bounceBtnElement = document.querySelector('.bounce-btn');
    const typingBtnElement = document.querySelector('.typing-btn');
    const animationTextElement = document.querySelector('.animation-text');
    const textToAnimate = animationTextElement.textContent;
    let timeoutId;

    fadeInBtnElement.addEventListener('click', () => {
        clearTimeout(timeoutId);
        animationTextElement.textContent = textToAnimate;

        // for reanimating text when user has already applied it so removing the class adding it again
        clearAnimation();
        animationTextElement.classList.add('fade-in-animation');

        // removing animation class so when user clicks again it adds class so it can reanimate -- for double click
        animationTextElement.addEventListener('animationend', clearAnimation);
    });

    bounceBtnElement.addEventListener('click', () => {
        clearTimeout(timeoutId);
        animationTextElement.textContent = textToAnimate;

        // for reanimating text when user has already applied it so removing the class adding it again
        clearAnimation();
        animationTextElement.classList.add('bounce-animation');

        // removing animation class so when user clicks again it adds class so it can reanimate -- for double click
        animationTextElement.addEventListener('animationend', clearAnimation);
    })

    typingBtnElement.addEventListener('click',()=>{
        clearTimeout(timeoutId);
        animationTextElement.classList.remove('d-none');
        animationTextElement.textContent = "";
        animateText(animationTextElement,textToAnimate);
    })

    function animateText(animationTextElement,textToAnimate, i = 0){
        animationTextElement.textContent += textToAnimate[i];
        if(i === textToAnimate.length - 1){
            return;
        }

        timeoutId = setTimeout(()=>animateText(animationTextElement,textToAnimate,i+1),100);
    }

    function clearAnimation(){
        animationTextElement.classList = "animation-text";
    }
})