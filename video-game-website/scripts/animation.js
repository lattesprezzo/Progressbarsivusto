const spriteSheet = new Image();
spriteSheet.src = "images/snail.png"; // Path to the spritesheet

// Animation settings
const frameWidth = 100; // Width of each frame
const frameHeight = 68; // Height of each frame
const columns = 3; // Number of columns in the spritesheet (1 row, 3 frames)
const totalFrames = columns; // Total number of frames
const frameShowTime = 500; // Time each frame is shown (in milliseconds)

// Animation variables
let currentFrame = totalFrames - 1; // Start from the last frame

// Function to draw a frame on a given canvas
export function drawFrame(canvas, spriteSheet) {
    const ctx = canvas.getContext("2d");

    // Calculate the source X position for the current frame
    const sourceX = currentFrame * frameWidth; // Column position (right to left)
    const sourceY = 0; // Row position (always 0 since there's only 1 row)

    // Clear the canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw the current frame
    ctx.drawImage(
        spriteSheet,
        sourceX, // Source X position
        sourceY, // Source Y position
        frameWidth, // Source width
        frameHeight, // Source height
        0, // Destination X position
        0, // Destination Y position
        canvas.width, // Destination width
        canvas.height // Destination height
    );

    // Update the frame index
    currentFrame = (currentFrame - 1 + totalFrames) % totalFrames; // Loop back to the last frame after reaching the first frame
}

// Function to start the animation loop for a specific canvas
export function startAnimation(canvas, spriteSheet) {
    setInterval(() => {
        drawFrame(canvas, spriteSheet);
    }, frameShowTime); // Change frame every `frameShowTime` milliseconds
}

