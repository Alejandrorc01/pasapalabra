// Listeners
document.addEventListener("DOMContentLoaded", () => {
    inicializar();
});

document.getElementById("iniciarJuego").addEventListener("click", () => {
    // Ocultar el botón de inicio
    document.getElementById("logo-container").style.display = "none";
    document.getElementById("preguntas-container").style.display = "block";

    // Cargar preguntas y iniciar el temporizador
    mostrarPreguntas();
    iniciarTemporizador();
});

document.getElementById("respuesta").addEventListener("keypress", (event) => {
    if (event.key === "Enter") {
        event.preventDefault();
        verificarRespuesta();
    }
});