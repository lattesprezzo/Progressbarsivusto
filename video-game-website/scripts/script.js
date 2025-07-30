import { drawFrame, startAnimation } from "./animation.js";

 document.addEventListener("DOMContentLoaded", async () => {
//     const excelUrl = "https://eduamiedu-my.sharepoint.com/:x:/g/personal/lauri_ahmas_taitotalo_fi/EbJVp-4Y13dEqEIVzvZLdYIBa4tHUHQXSjGIAZgIGIcyXg?e=rzkHI6";

    let ytoPercentage = 33;
    let tutkinnonOsatPercentage = 18;

//     try {
//         const response = await fetch(excelUrl);
//         const arrayBuffer = await response.arrayBuffer();
//         const workbook = XLSX.read(arrayBuffer, { type: "array" });

//         const sheetName = workbook.SheetNames[0];
//         const sheet = workbook.Sheets[sheetName];

//         // Read cell A1 and B1
//         ytoPercentage = parseFloat(sheet["A1"].v);
//         tutkinnonOsatPercentage = parseFloat(sheet["B1"].v);
//     } catch (error) {
//         console.error("Error loading Excel file:", error);
//         // fallback values if needed
//         ytoPercentage = 1;
//         tutkinnonOsatPercentage = 2;
//     }

    // DOM elements
    const ytoProgress = document.getElementById("yto");
    const tutkinnonOsatProgress = document.getElementById("tutkinnon-osat");
    const ytoPercentageText = document.getElementById("yto-percentage");
    const tutkinnonOsatPercentageText = document.getElementById("tutkinnon-osat-percentage");
    const ytoCanvas = document.getElementById("yto-canvas");
    const tutkinnonOsatCanvas = document.getElementById("tutkinnon-osat-canvas");

    // Sprite sheet
    const spriteSheet = new Image();
    spriteSheet.src = "images/snail.png";

    // Update progress bars and canvas positions
    function updateProgressBars() {
        if (ytoProgress) {
            ytoProgress.value = ytoPercentage;
            ytoPercentageText.textContent = `${ytoPercentage}%`;
            moveCanvas(ytoCanvas, ytoProgress, ytoPercentage);
        }
        if (tutkinnonOsatProgress) {
            tutkinnonOsatProgress.value = tutkinnonOsatPercentage;
            tutkinnonOsatPercentageText.textContent = `${tutkinnonOsatPercentage}%`;
            moveCanvas(tutkinnonOsatCanvas, tutkinnonOsatProgress, tutkinnonOsatPercentage);
        }
    }

    function moveCanvas(canvas, progressBar, percentage) {
        const progressBarWidth = progressBar.offsetWidth;
        const canvasWidth = canvas.offsetWidth;
        const position = (progressBarWidth * percentage) / 100 - canvasWidth / 2;
        canvas.style.position = "absolute";
        canvas.style.left = `${Math.max(0, position)}px`;
        canvas.style.top = "0";
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