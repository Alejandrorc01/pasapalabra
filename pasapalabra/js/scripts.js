let preguntas = [];
let indicePreguntas = 0;
let aciertos = 0;
let errores = 0;

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
  document.getElementById("errores").textContent = errores;
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
let intervaloTemporizador;
function iniciarTemporizador() {
  let tiempoRestante = 150; // 3 minutos

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
