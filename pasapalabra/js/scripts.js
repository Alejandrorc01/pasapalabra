let preguntas = [];
let indicePreguntas = 0;
let aciertos = 0;
let errores = 0;
let palabrasPendientes = new Set();

function generarRosco(){
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
}

// Función para cambiar el color de las letras en el rosco
function cambiarColorRosco(letra, estado) {
  let letraElemento = document.getElementById(letra.toUpperCase());
  if (letraElemento) {
    letraElemento.classList.add(estado); // Agrega la clase 'correcto' o 'incorrecto'
  }
}

// Cargar preguntas desde el archivo JSON
async function cargarPreguntas() {
  try {
    let respuesta = await fetch("preguntas.json");
    preguntas = await respuesta.json();

    mostrarPreguntas();
  } catch (error) {
    console.error("Error al cargar las preguntas:", error);
  }
}

//  Función para mostrar la pregunta actual
function mostrarPreguntas() {
  if (indicePreguntas < preguntas.length) {
    document.getElementById(preguntas[indicePreguntas].letra).style.animation = "parpadeo 2s ease-in-out 0.5s infinite normal forwards running";
    document.getElementById("pregunta").textContent =
      preguntas[indicePreguntas].pregunta; //  Corrección: se usa "pregunta" en lugar de "value"
  } else {
    acabarJuego();
  }
}

// Función que verifica la respuesta del usuario
function verificarRespuesta() {
  let respuestaUsuario = document.getElementById("respuesta").value.trim().toLowerCase();
  let letraActual = preguntas[indicePreguntas].letra.toUpperCase(); // Se obtiene la letra actual

  if (respuestaUsuario === preguntas[indicePreguntas].respuesta) {
    aciertos++;
    alert("¡Correcto! ");
    cambiarColorRosco(letraActual, "correcto"); //  Cambiar color a verde
    palabrasPendientes.delete(indicePreguntas); // Eliminar del conjunto de pendientes
  } else {
    errores++;
    alert(` Incorrecto. La respuesta correcta era: ${preguntas[indicePreguntas].respuesta}`);
    cambiarColorRosco(letraActual, "incorrecto"); //  Cambiar color a rojo
    palabrasPendientes.delete(indicePreguntas); // También eliminar si falla
  }
  
  actualizarMarcador();
  siguientePregunta();
}

// función para pasar palabra
function pasarPalabra() {
  siguientePregunta();
}

// función para pasar a la siguiente pregunta (ciclo circular)
function siguientePregunta() {
  do {
    indicePreguntas = (indicePreguntas + 1) % preguntas.length;
  } while (
    !palabrasPendientes.has(indicePreguntas) &&
    palabrasPendientes.size > 0
  );

  document.getElementById("respuesta").value = "";
  mostrarPreguntas();
}

// función para actualizar el marcador
function actualizarMarcador() {
  document.getElementById("aciertos").textContent = aciertos;
}

// función para acabar el juego
function acabarJuego() {
  alert(`Juego terminado. 
  Aciertos: ${aciertos} 
  Errores: ${errores}`);
  
  document.getElementById("logo-container").style.display = "flex";
  document.getElementById("preguntas-container").style.display = "none";
}

/**
 * Inicia el temporizador
 */
let intervaloTemporizador;
function iniciarTemporizador() {
  let tiempoRestante = 150; // 2:30 minutos

  // Asegurar que no haya otro temporizador en marcha
  clearInterval(intervaloTemporizador);

  intervaloTemporizador = setInterval(() => {
    if (tiempoRestante >= 0) {
      document.getElementById("tempo").textContent = tiempoRestante;
      tiempoRestante--;
    } else {
      clearInterval(intervaloTemporizador); // Detener el temporizador cuando llegue a 0
      alert("Tiempo agotado. Fin del juego.");
      acabarJuego();
    }
  }, 1000);
}
