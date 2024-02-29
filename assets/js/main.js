// DOM elements
const fadeInBtnElement = document.querySelector(".fade-in-btn");
const bounceBtnElement = document.querySelector(".bounce-btn");
const typingBtnElement = document.querySelector(".typing-btn");
const stopBtnElement = document.querySelector(".stop-btn");
const animationTextElement = document.querySelector(".animation-text");

// web worker
let worker;

// storing the initial text content for typing animation
const initialText = animationTextElement.textContent;

// timeout ID for clearing setTimeout()
let timeoutId;

// event listener for stopping animation
stopBtnElement.addEventListener("click", () => {
  worker.postMessage('stop');
  animationTextElement.textContent = initialText;
  clearAnimation();
});

// event listener for fade in animation button
fadeInBtnElement.addEventListener("click", () =>
  animationHandler("fade-in-animation")
);

// event listener for bounce animation button
bounceBtnElement.addEventListener("click", () =>
  animationHandler("bounce-animation")
);

// event listener for typing animation button
typingBtnElement.addEventListener("click", typingAnimationHandler);

function animationHandler(animationName) {
  // Only do restart when animation is applied
  if (animationTextElement.classList.value !== "animation-text") {
    restartAnimation();
  }

  // adding animation class to animate text
  animationTextElement.classList.add(animationName);
}

// was working on disabling click after first click 
function typingAnimationHandler() {
  clearAnimation();
  worker = new Worker("assets/js/web-worker.js");

  worker.postMessage(initialText);

  worker.onmessage = (event) => {
    animationTextElement.textContent = event.data;
  };
}

function restartAnimation() {
  animationTextElement.textContent = initialText;
  clearAnimation();
  // void animationTextElement.offsetWidth;
}

function clearAnimation() {
  // clear timeout to stop typing animation
  clearTimeout(timeoutId);

  requestAnimationFrame(() => {
    animationTextElement.classList.remove(
      "fade-in-animation",
      "bounce-animation",
      "typing-animation"
    );
  });
}

