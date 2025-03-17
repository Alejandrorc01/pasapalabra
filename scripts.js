let preguntas = [];
let indicePreguntas = 0;
let aciertos = 0;
let errores = 0;
let palabrasPendientes = new Set();

function mostrarPreguntas() {
  if (indicePreguntas < preguntas.length) {
    document.getElementById("pregunta").textContent =
      preguntas[indicePreguntas].value;
  } else {
    acabarJuego();
  }
}

//función que verifica la respuesta

function verificarRespuesta() {
  //a minúsculas y sin espacios
  let respuestaUsuario = document.getElementById("respuesta").value.trim().toLowerCase();

  if (respuestaUsuario === preguntas[indicePreguntas].respuesta) {
    aciertos++;
    alert("Correcto");
    //función MARTÍN CAMBIAR COLOR o cambiar clase
    palabrasPendientes.delete(indicePreguntas); // Eliminar del conjunto de pendientes
  } else {
    errores++;
    //función MARTÍN CAMBIAR COLOR o cambiar clase
    alert(
      `Incorrecto. La respuesta correcta era: ${preguntas[indicePreguntas].respuesta}`
    );
    palabrasPendientes.delete(indicePreguntas); // También eliminar si falla
  }

  actualizarMarcador();
  siguientePregunta();
}

//función pasar palabra que llame a la siguiente pregunta
function pasarPalabra() {
  siguientePregunta();
}

//función para pasar a la siguiente pregunta
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

function actualizarMarcador() {
  document.getElementById("aciertos").textContent = aciertos;
  document.getElementById("errores").textContent = errores;
}

//función para acabar el juego
function acabarJuego() {
  //llamar a función MARTÍN

  actualizarMarcador();
  mostrarPreguntas();
}

cargarPreguntas();
