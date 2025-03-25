// Listeners
document.addEventListener("DOMContentLoaded", () => {
    const rosco = document.getElementById("rosco");
    const letters = "ABCDEFGHIJKLMNÑOPQRSTUVWXYZ".split("");
    const radius = 400;
    const xPos = 150;
    const yPos = 150;

    letters.forEach((letter, index) => {
        let angle = (index / letters.length) * (2 * Math.PI);
        let x = xPos + radius * Math.cos(angle) - 20;
        let y = yPos + radius * Math.sin(angle) - 20;
        const div = document.createElement("div");
        div.id = letter;
        div.textContent = letter;
        div.classList.add("letra");
        div.style.left = `${y}px`;
        div.style.top = `${-x}px`;
        rosco.appendChild(div);
    });

    let nombre = prompt("Introduce un nombre de usuario: ");
    agregarJugador(nombre);

    if(jugadores.length > 1){
        document.getElementById("mostrarRes").display = "block";
    }
});

document.getElementById("iniciarJuego").addEventListener("click", () => {
    // Ocultar el botón de inicio
    document.getElementById("logo-container").style.display = "none";
    document.getElementById("preguntas-container").style.display = "block";

    // Cargar preguntas y iniciar el temporizador
    cargarPreguntas();
    iniciarTemporizador();
});

document.getElementById("respuesta").addEventListener("keypress", (event) => {
    if (event.key === "Enter") {
        event.preventDefault();
        verificarRespuesta();
    }
});

document.getElementById("mostrarRes").addEventListener("onclick", () =>{
    document.getElementById("tabla-container").style.display = "flex";
    document.getElementById("logo-container").style.display = "none";

    crearTabla();
});

document.getElementById("volver").addEventListener("onclick", () =>{
    document.getElementById("tabla-container").style.display = "none";
    document.getElementById("logo-container").style.display = "flex";
});