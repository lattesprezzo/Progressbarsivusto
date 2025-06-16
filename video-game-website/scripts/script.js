import { drawFrame, startAnimation } from "./animation.js";

document.addEventListener("DOMContentLoaded", () => {
    // Variables to control progress bar percentages
    const ytoPercentage = 30.5; // Change this value to update the YTO progress bar
    const tutkinnonOsatPercentage = 17.6; // Change this value to update the Tutkinnon osat progress bar

    const ytoProgress = document.getElementById("yto");
    const tutkinnonOsatProgress = document.getElementById("tutkinnon-osat");

    const ytoPercentageText = document.getElementById("yto-percentage");
    const tutkinnonOsatPercentageText = document.getElementById("tutkinnon-osat-percentage");

    const ytoCanvas = document.getElementById("yto-canvas");
    const tutkinnonOsatCanvas = document.getElementById("tutkinnon-osat-canvas");

    const spriteSheet = new Image();
    spriteSheet.src = "images/snail.png"; // Path to the spritesheet

    // Function to update progress bar and canvas positions
    function updateProgressBars() {
        if (ytoProgress) {
            ytoProgress.value = ytoPercentage; // Set YTO progress bar value
            ytoPercentageText.textContent = `${ytoPercentage}%`; // Update percentage text
            moveCanvas(ytoCanvas, ytoProgress, ytoPercentage); // Move canvas box
        }

        if (tutkinnonOsatProgress) {
            tutkinnonOsatProgress.value = tutkinnonOsatPercentage; // Set Tutkinnon osat progress bar value
            tutkinnonOsatPercentageText.textContent = `${tutkinnonOsatPercentage}%`; // Update percentage text
            moveCanvas(tutkinnonOsatCanvas, tutkinnonOsatProgress, tutkinnonOsatPercentage); // Move canvas box
        }
    }

    // Function to move the canvas box based on the percentage
    function moveCanvas(canvas, progressBar, percentage) {
        const progressBarWidth = progressBar.offsetWidth; // Get the width of the progress bar
        const canvasWidth = canvas.offsetWidth; // Get the width of the canvas
        const position = (progressBarWidth * percentage) / 100 - canvasWidth / 2; // Calculate the position

        // Set the canvas position
        canvas.style.position = "absolute";
        canvas.style.left = `${Math.max(0, position)}px`; // Ensure it doesn't go outside the bar
        canvas.style.top = "0"; // Align vertically inside the progress bar
    }

    // Initial setup
    updateProgressBars();

    // Start the animation for both canvases once the spritesheet is loaded
    spriteSheet.onload = () => {
        startAnimation(ytoCanvas, spriteSheet);
        startAnimation(tutkinnonOsatCanvas, spriteSheet);
    };

    // Update canvas positions on window resize
    window.addEventListener("resize", updateProgressBars);
});