document.addEventListener("DOMContentLoaded", () => {
    // Variables to control progress bar percentages
    const ytoPercentage = 25; // Change this value to update the YTO progress bar
    const tutkinnonOsatPercentage = 15; // Change this value to update the Tutkinnon osat progress bar

    const ytoProgress = document.getElementById("yto");
    const tutkinnonOsatProgress = document.getElementById("tutkinnon-osat");

    const ytoPercentageText = document.getElementById("yto-percentage");
    const tutkinnonOsatPercentageText = document.getElementById("tutkinnon-osat-percentage");

    const ytoCanvas = document.getElementById("yto-canvas");
    const tutkinnonOsatCanvas = document.getElementById("tutkinnon-osat-canvas");

    const spriteSheetSrc = "images/walk-spritesheet.png"; // Replace with the actual path to the spritesheet
    const spriteWidth = 2000 / 11; // Width of each frame (2000px divided by 11 frames)
    const spriteHeight = 512; // Height of the sprite

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

    // Function to animate canvas color
    function animateCanvas(canvasId) {
        const canvas = document.getElementById(canvasId);
        const ctx = canvas.getContext("2d");

        let colors = ["#FF5733", "#33FF57", "#3357FF", "#FF33A1", "#A133FF"];
        let colorIndex = 0;

        setInterval(() => {
            // Clear the canvas
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            // Set the new color
            ctx.fillStyle = colors[colorIndex];
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            // Update the color index
            colorIndex = (colorIndex + 1) % colors.length;
        }, 500); // Change color every 0.5 seconds
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

    // Function to animate the sprite inside the canvas
    function animateSprite(canvasId) {
        const canvas = document.getElementById(canvasId);
        const ctx = canvas.getContext("2d");
        const spriteImage = new Image();
        spriteImage.src = spriteSheetSrc;

        let currentFrame = 0;

        spriteImage.onload = () => {
            setInterval(() => {
                // Clear the canvas
                ctx.clearRect(0, 0, canvas.width, canvas.height);

                // Draw the current frame of the sprite
                ctx.drawImage(
                    spriteImage,
                    currentFrame * spriteWidth, // Source X position
                    0, // Source Y position
                    spriteWidth, // Source width
                    spriteHeight, // Source height
                    0, // Destination X position
                    0, // Destination Y position
                    canvas.width, // Destination width
                    canvas.height // Destination height
                );

                // Update the frame index
                currentFrame = (currentFrame + 1) % 11; // Loop through 11 frames
            }, 100); // Change frame every 100ms
        };
    }

    // Initial setup
    updateProgressBars();

    // Animate the canvases
    animateCanvas("yto-canvas");
    animateCanvas("tutkinnon-osat-canvas");

    // Animate the sprites
    animateSprite("yto-canvas");
    animateSprite("tutkinnon-osat-canvas");

    // Update canvas positions on window resize
    window.addEventListener("resize", updateProgressBars);
});