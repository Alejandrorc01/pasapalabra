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
let intervaloTemporizador;
function iniciarTemporizador() {
    let tiempoRestante = 180; // 3 minutos

    // Asegurar que no haya otro temporizador en marcha
    clearInterval(intervaloTemporizador);

    intervaloTemporizador = setInterval(() => {
        if (tiempoRestante > 0) {
            document.getElementById("tempo").textContent = tiempoRestante;
            tiempoRestante--;
        } else {
            clearInterval(intervaloTemporizador); // Detener el temporizador cuando llegue a 0
            alert("Tiempo agotado. Fin del juego.");
            acabarJuego();
        }
    }, 1000);
}