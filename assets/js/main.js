// DOM elements
const fadeInBtnElement = document.querySelector(".fade-in-btn");
const bounceBtnElement = document.querySelector(".bounce-btn");
const typingBtnElement = document.querySelector(".typing-btn");
const stopBtnElement = document.querySelector(".stop-btn");
const animationTextElement = document.querySelector(".animation-text");

// storing the initial text content for typing animation
const initialText = animationTextElement.textContent;

// timeout ID for clearing setTimeout()
let timeoutId;

// event listener for stopping animation
stopBtnElement.addEventListener("click", () => {
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

function typingAnimationHandler() {
  clearAnimation();

  // removing text content to enter character one by one to do typing animation
  animationTextElement.textContent = "";
  animationTyping(animationTextElement, initialText);
}

// Function for displaying each character one by one to give typing effect
function animationTyping(animationTextElement, textToAnimate, i = 0) {
  // adding class so it can not pass through condition of restartAnimation() which is in animationHandler() function
  animationTextElement.classList.add("typing-animation");

  // appending character one by one
  animationTextElement.textContent += textToAnimate[i];

  if (i === textToAnimate.length - 1) {
    return;
  }

  timeoutId = setTimeout(
    () => animationTyping(animationTextElement, textToAnimate, i + 1),
    10
  );
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
