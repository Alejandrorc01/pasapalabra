let preguntas = [];
let indicePreguntas = 0;
let aciertos = 0;
let errores = 0;
let palabrasPendientes = new Set();

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

    // Inicializar el conjunto con todas las preguntas
    preguntas.forEach((_, i) => palabrasPendientes.add(i));

    mostrarPreguntas();
  } catch (error) {
    console.error("Error al cargar las preguntas:", error);
  }
}

//  Función para mostrar la pregunta actual
function mostrarPreguntas() {
  if (indicePreguntas < preguntas.length) {
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
  document.getElementById("errores").textContent = errores;
}

//iniciar juego

document.getElementById("iniciarJuego").addEventListener("click", () => {
  // Ocultar el botón de inicio
  document.getElementById("iniciarJuego").style.display = "none";

  // Mostrar los elementos del juego
  document.getElementById("rosco").style.display = "block";
  document.getElementById("tempo").style.display = "block";
  document.getElementById("logo").style.display = "block";
  document.querySelector(".pregunta-container").style.display = "block";
  //document.getElementById("marcador").style.display = "block";

  // Cargar preguntas y iniciar el temporizador
  cargarPreguntas();
  iniciarTemporizador();
});

// función para acabar el juego
function acabarJuego() {
  alert(`Juego terminado. 
  Aciertos: ${aciertos} 
  Errores: ${errores}`);
  
  actualizarMarcador();
}


