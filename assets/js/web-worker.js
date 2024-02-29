self.onmessage = (event) => {
    const fullText = event.data;
    let currentIndex = 0;
    const textLength = fullText.length;

    const typingAnimationInterval = setInterval(() => {
        if (currentIndex < textLength) {
            const partialText = fullText.slice(0, currentIndex);
            postMessage(partialText);
            currentIndex++;
        } else {
            // postMessage({type:"complete"})
            clearInterval(typingAnimationInterval);
        }
    }, 10);

    self.onmessage = (stopEvent) => {
        if (stopEvent.data === 'stop') {
            clearInterval(typingAnimationInterval);
        }
    };
};
