// Listeners
document.addEventListener("DOMContentLoaded", () => {
    const rosco = document.getElementById("rosco");
    const letters = "ABCDEFGHIJKLMNÑOPQRSTUVWXYZ".split("");
    const radius = 400;
    const xPos = 150;
    const yPos = 150;

    letters.forEach((letter, index) => {
        let angle = (index / letters.length) * (2 * Math.PI);
        let x = xPos + radius * Math.cos(angle) - 40;
        let y = yPos + radius * Math.sin(angle) - 40;
        const div = document.createElement("div");
        div.id = letter;
        div.textContent = letter;
        div.classList.add("letra");
        div.style.left = `${y}px`;
        div.style.top = `${-x}px`;
        rosco.appendChild(div);
    });
});

/**
 * Inicia el temporizador
 */
function iniciarTemporizador() {
    let temp = 300;
    setInterval(() => {
        if (temp > 0) {
            +(document.getElementById("tempo").textContent)--;
            temp--;
        }
        else {
            return;
        }
    }, 1000)
}