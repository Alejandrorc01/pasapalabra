let preguntas = [];
let indicePreguntas = 0;
let aciertos = JSON.parse(localStorage.getItem("aciertos")) || 0;
let errores = 0;
let jugadores = JSON.parse(localStorage.getItem("jugadores")) || [];
let jugadorActual = localStorage.getItem("jugadorActual") || null;

function inicializar(){
  crearRosco();
  let nombre = prompt("Introduce el nombre del jugador:");
  agregarJugador(nombre);
  resetearJuego();
}

function resetearJuego() {
    aciertos = 0;
    errores = 0;
    indicePreguntas = 0;

    actualizarMarcador();
    cargarPreguntas();
}

function crearRosco() {
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
  } catch (error) {
    console.error("Error al cargar las preguntas:", error);
  }
}

//  Función para mostrar la pregunta actual
function mostrarPreguntas() {
  if (preguntas.length > 0) {
    document.getElementById("pregunta").textContent =
      preguntas[indicePreguntas].pregunta;
    document.getElementById("respuesta").value = "";
    document.getElementById(preguntas[indicePreguntas].letra).style.animation = "parpadeo 2s ease-in-out 0.5s infinite normal forwards running";
  } else {
    acabarJuego();
  }
}

// Función que verifica la respuesta del usuario
function verificarRespuesta() {
  let respuestaUsuario = document
    .getElementById("respuesta")
    .value.trim()
    .toLowerCase();
  let letraActual = preguntas[indicePreguntas].letra.toUpperCase(); // Se obtiene la letra actual

  if (respuestaUsuario === preguntas[indicePreguntas].respuesta) {
    aciertos++;
    alert("¡Correcto! ");
    cambiarColorRosco(letraActual, "correcto"); //  Cambiar color a verde
  } else {
    errores++;
    alert(
      ` Incorrecto. La respuesta correcta era: ${preguntas[indicePreguntas].respuesta}`
    );
    cambiarColorRosco(letraActual, "incorrecto"); //  Cambiar color a rojo
  }
  preguntas.splice(indicePreguntas, 1);

  if (indicePreguntas >= preguntas.length) {
    indicePreguntas = 0;
  }

  actualizarMarcador();
  mostrarPreguntas();
}

// función para pasar palabra
function pasarPalabra() {
  document.getElementById(preguntas[indicePreguntas].letra).style.animation = "none";
  siguientePregunta();
}

// función para pasar a la siguiente pregunta (ciclo circular)
function siguientePregunta() {
  if (preguntas.length > 0) {
    indicePreguntas = (indicePreguntas + 1) % preguntas.length;
  }

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

  actualizarMarcador();
}

/**
 * Inicia el temporizador
 */
function iniciarTemporizador() {
  let tiempoRestante = 150; // 3 minutos

  setInterval(() => {
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


function agregarJugador(nombre) {
  while (!nombre) {
    nombre = prompt("Escribe un nombre válido.");
  }

  let jugadorExistente = jugadores.find(j => j.nombre === nombre);

  while(jugadorExistente){
    nombre = prompt("Ese nombre ya está escogido.");
    jugadorExistente = jugadores.find(j => j.nombre === nombre);
  }

  if (!jugadorExistente) {
    let nuevoJugador = { nombre: nombre, aciertos: 0, errores: 0 };
    jugadores.push(nuevoJugador);
    guardarJugadores();
  }

  seleccionarJugador(nombre);
}

// Función para seleccionar un jugador y resetear el marcador
function seleccionarJugador(nombre) {
  jugadorActual = nombre;
  localStorage.setItem("jugadorActual", nombre);
  localStorage.setItem("aciertos", 0);
}

// Función para guardar los jugadores en localStorage
function guardarJugadores() {
  localStorage.setItem("jugadores", JSON.stringify(jugadores));
}
