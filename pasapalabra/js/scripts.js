let preguntas = [];
let jugadores = JSON.parse(localStorage.getItem("jugadores")) || [];
let indicePreguntas = 0;
let aciertos = JSON.parse(localStorage.getItem("aciertos")) || 0;
let errores = JSON.parse(localStorage.getItem("errores")) || 0;
let jugadorActual = 0;

function resetearJuego() {
  aciertos = 0;
  errores = 0;
  indicePreguntas = 0;
  
  actualizarMarcador();
  alert(`Nuevo jugador seleccionado: ${jugadorActual}. Todo se ha reiniciado.`);
  cargarPreguntas();
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

  if(indicePreguntas >= preguntas.length){
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

  window.location.reload();
}

/**
 * Inicia el temporizador
 */
function iniciarTemporizador() {
  let tiempoRestante = 149; // 2:30 minutos

  // Asegurar que no haya otro temporizador en marcha

  let intervaloTemporizador = setInterval(() => {
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
    nombre = prompt("Este usuario ya existe. Ponte otro nombre");
    jugadorExistente = jugadores.find(j => j.nombre === nombre);
  }

  if (!jugadorExistente) {
      let nuevoJugador = { nombre: nombre, aciertos: 0, errores: 0 };
      jugadores.push(nuevoJugador);
      guardarJugadores();
  }

  localStorage.setItem("jugadorActual", nombre);
  jugadorActual = nombre;
}

// Función para actualizar la puntuación del jugador actual
function actualizarPuntuacion(correcto) {
  let jugador = jugadores.find(j => j.nombre === jugadorActual);
  if (jugador) {
      if (correcto) {
          jugador.aciertos++;
          aciertos++;
      } else {
          jugador.errores++;
          errores++;
      }
      guardarJugadores();
      actualizarMarcador();
  }
}

// Función para guardar los jugadores en localStorage
function guardarJugadores() {
  localStorage.setItem("jugadores", JSON.stringify(jugadores));
}


function crearTabla(){
  let tabla = document.getElementById("tablaRes");
  for(let j of jugadores){
    let tr = document.createElement("tr");
    let td1 = document.createElement("td");
    let td2 = document.createElement("td");
    let td3 = document.createElement("td");

    td1.innerHTML = j.nombre;
    td2.innerHTML = j.aciertos;
    td3.innerHTML = j.errores;

    tr.appendChild(td1);
    tr.appendChild(td2);
    tr.appendChild(td3);

    tabla.insertAdjacentElement("beforeend", tr);
  }
}