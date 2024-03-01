// DOM elements
const fadeInBtnElement = document.querySelector(".fade-in-btn");
const bounceBtnElement = document.querySelector(".bounce-btn");
const typingBtnElement = document.querySelector(".typing-btn");
const stopBtnElement = document.querySelector(".stop-btn");
const animationTextElement = document.querySelector(".animation-text");

// web worker
let worker;
let isWorkerRunning = false;

// storing the initial text content for typing animation
const initialText = animationTextElement.textContent;

// event listener for stopping animation
stopBtnElement.addEventListener("click", () => {
  // if typing animation button is disabled that means the typing animation is currently running and you have to stop it.
  if (typingBtnElement.disabled) {
    stopAnimation();
  }
  clearAnimation();
});

// event listener for fade in animation button
fadeInBtnElement.addEventListener("click", () => {
  if (typingBtnElement.disabled) {
    stopAnimation();
  }
  animationHandler("fade-in-animation");
});

// event listener for bounce animation button
bounceBtnElement.addEventListener("click", () => {
  if (typingBtnElement.disabled) {
    stopAnimation();
  }
  animationHandler("bounce-animation");
});

// event listener for typing animation button
typingBtnElement.addEventListener("click", typingAnimationHandler);

function animationHandler(animationName) {
  // Only do clearAnimation() when animation is applied
  if (animationTextElement.classList.value !== "animation-text") {
    clearAnimation();
  }

  // adding animation class to animate text
  animationTextElement.classList.add(animationName);
}

function typingAnimationHandler() {
  clearAnimation();
  // using web worker to do javascript excution in background
  worker = new Worker("assets/js/web-worker.js");

  worker.postMessage(initialText);

  // if the worker returns text data then disable typing animation button and then enabling it when "complete" is returned;
  worker.onmessage = (event) => {
    if (event.data === "complete") {
      typingBtnElement.disabled = false;
    } else {
      typingBtnElement.disabled = true;
      animationTextElement.textContent = event.data;
    }
  };
}

function clearAnimation() {
  requestAnimationFrame(() => {
    animationTextElement.classList.remove(
      "fade-in-animation",
      "bounce-animation",
      "typing-animation"
    );
  });
}

function stopAnimation() {
  typingBtnElement.disabled = false;
  animationTextElement.textContent = initialText;
  worker.postMessage("stop");
  clearAnimation();
}
