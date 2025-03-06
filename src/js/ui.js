import {
  sumarMatrices,
  restarMatrices,
  multiplicarEscalar,
  matrizTranspuesta,
} from "./operations.js";

export function cargarSeccion(seccion) {
  const contenido = document.querySelector("#contenido");

  if (seccion === "sumar-restar") {
    contenido.innerHTML = `
        <section>

        <h2 class="text-center">Sumar/Restar Matrices</h2>
            <form id="formSumarRestar" class="formsumares">
                <label class="text-center">Dimensión de las matrices:</label>
                <div class="tablafc">
                    <div>
                        <label class="form-label">Filas:</label>
                        <input class="form-control" type="number" inputmode="numeric" id="filas" min="1" max="99" value="1">
                    </div>
                    <div>
                        <label class="form-label">Columnas:</label>
                        <input class="form-control" type="number" inputmode="numeric" id="columnas" min="1" max="99" value="1">
                    </div>
                </div>
            
                <select id="operacion" class="form-select">
                    <option value="suma">Sumar las matrices</option>
                    <option value="resta">Restar las matrices</option>
                </select>

                <button type="submit" id="generarBtn" class="btn btn-primary">Establecer Matrices</button>

            </form>

        </section>
    `;
  } else if (seccion === "multiplicar-escalar") {
    contenido.innerHTML = `
        <section>

        <h2 class="text-center">Multiplicar por Escalar</h2>
            <form id="formMultiplicarEscalar" class="formescalar">
                <span class="text-center">Valores de la matriz</span>
                <div class="tablafc">
                    <div>
                    <label class="form-label">Escalar (k):</label>
                    <input class="form-control" type="number" inputmode="numeric" id="escalar" min="1" max="99" value="1">
                    </div>

                    <div>
                    <label class="form-label">Filas:</label>
                    <input class="form-control" type="number" inputmode="numeric" id="filas" min="1" max="99" value="1">
                    </div>

                    <div>
                    <label class="form-label">Columnas:</label>
                    <input class="form-control" type="number" inputmode="numeric" id="columnas" min="1" max="99" value="1">
                    </div>
                </div>
                <button type="submit" id="generarBtn" class="btn btn-primary">Establecer Matriz</button>
            </form>

        </section>
    `;
  } else if (seccion === "matriz-transpuesta") {
    contenido.innerHTML = `
        <section>

        <h2 class="text-center">Matriz Transpuesta</h2>
            <form id="formMatrizTranspuesta" class="formtrans">
                <span class="text-center">Dimensión de la matriz:</span>
                <div class="tablafc">
                    <div>
                        <label class="form-label">Filas:</label>
                        <input class="form-control" type="number" inputmode="numeric" id="filas" min="1" max="99" value="1">
                    </div>
                    <div>
                        <label class="form-label">Columnas:</label>
                        <input class="form-control" type="number" inputmode="numeric" id="columnas" min="1" max="99" value="1">
                    </div>
                </div>
                
                <button type="submit" id="generarBtn" class="btn btn-primary">Establecer Matrices</button>

            </form>
        </section>
    `;
  }
}

export function establecerContenidoMatriz(datos) {

  let contenido = document.createElement("div"); // Un contenedor para las matrices
  contenido.classList.add("body-modal");
  contenido.dataset.operacion = datos.operacion;  
  
  if (datos.operacion === "suma" || datos.operacion === "resta") {
    let tituloA = document.createElement("h3");
    tituloA.classList.add("text-center");
    tituloA.textContent = "Matriz A";

    let tituloB = document.createElement("h3");
    tituloB.classList.add("text-center");
    tituloB.textContent = "Matriz B";

    contenido.appendChild(tituloA);
    contenido.appendChild(
      generarMatriz(datos.filas, datos.columnas, "matrizA")
    );
    contenido.appendChild(tituloB);
    contenido.appendChild(
      generarMatriz(datos.filas, datos.columnas, "matrizB")
    );
  } else if (
    datos.operacion === "multiplicar-escalar" ||
    datos.operacion === "matriz-transpuesta"
  ) {
    let titulo = document.createElement("h3");
    titulo.textContent = "Matriz";
    contenido.appendChild(titulo);
    contenido.appendChild(generarMatriz(datos.filas, datos.columnas, "matriz"));
  }

  mostrarCuadroDialogo(contenido, datos);
}

function generarMatriz(filas, columnas, id) {
  let tabla = document.createElement("table");
  tabla.id = id;
  tabla.classList.add("matriz");

  for (let i = 0; i < filas; i++) {
    let fila = document.createElement("tr");
    fila.classList.add("fila");

    for (let j = 0; j < columnas; j++) {
      let celda = document.createElement("td");
      celda.classList.add("celdas");

      let input = document.createElement("input");
      input.type = "text";
      input.classList.add("celda", "form-control");

      input.addEventListener("input", () => validarInput(input));

      celda.appendChild(input);
      fila.appendChild(celda);
    }
    tabla.appendChild(fila);
  }

  return tabla;
}

function validarInput(input) {
  let regex = /^-?\d+\/[1-9]\d*$/;  // Expresión para validar formato correcto

  let valor = input.value;

  // Permitir temporalmente valores parciales correctos
  if (
      valor === "" ||                   // Vacío (para permitir edición)
      valor === "-" ||                  // Solo un "-"
      /^-?\d+$/.test(valor) ||          // Solo números sin "/"
      /^-?\d+\/?$/.test(valor)          // Número seguido de "/"
  ) {
      input.style.border = "1px solid #ced4da";
  } else if (!regex.test(valor)) {
      // Si el formato es inválido, mostrar alerta y limpiar
      Swal.fire({
          icon: "error",
          toast: true,
          position: "top-end",
          title: "Entrada inválida",
          text: "Debe ser de la forma '-n/m' o 'n/m', con m distinto de 0.",
          showConfirmButton: false,
          timer: 3000,
          timerProgressBar: true,
          background: "#f8d7da",
      });

      input.value = "";
      input.focus();
  }
}

function mostrarCuadroDialogo(matriz, datos) {

  const titulos = {
    "multiplicar-escalar": "Multiplicación por Escalar",
    "suma": "Suma de Matrices",
    "resta": "Resta de Matrices",
    "matriz-transpuesta": "Matriz Transpuesta",
  }
  // Crear etiqueta <dialog>
  const modal = document.createElement("dialog");
  modal.id = "modal";
  modal.className = "themodal";
  modal.setAttribute("role", "dialog");
  modal.setAttribute("aria-modal", "true");

  // Construcción del contenido del modal
  const tituloModal = document.createElement("div");
  tituloModal.className = "titulo-modal";
  tituloModal.innerHTML = `
        <h3>${
          titulos[datos.operacion]
        }</h3>
        <button class="closemodal btn btn-danger">x</button>
    `;

  modal.appendChild(tituloModal);
  modal.appendChild(matriz)
  // const bodyModal = document.createElement("div");
  // bodyModal.id = "body-modal";
  // bodyModal.appendChild(matriz);

  const footerModal = document.createElement("div");
  footerModal.className = "footer-modal";
  footerModal.innerHTML = `
        <button id="close-modal" class="btn btn-sm btn-danger">Cerrar</button>
        <button id="calcular" class="btn btn-sm btn-primary">Calcular</button>
    `;

  modal.appendChild(footerModal);
  // Agregar contenido al modal
  
  // modal.appendChild(bodyModal);

  // Agregar modal al body
  document.getElementById("contenido").appendChild(modal);

  // Asegurar que los eventos de cierre se asignen
  modal
    .querySelector(".closemodal")
    .addEventListener("click", () => modal.close());
  modal
    .querySelector("#close-modal")
    .addEventListener("click", () => modal.close());

  // Mostrar el modal
  modal.showModal();

  // Evento para eliminar el modal cuando se cierre
  modal.addEventListener("close", () => modal.remove());
}
export function calcularResultado() {
  // Detectar qué operación se está realizando
  const operacion = document
    .querySelector(".body-modal")
    .getAttribute("data-operacion");

  let matrizA, matrizB, escalar, resultado;
  let contenidoHTML = "";

  if (operacion === "suma" || operacion === "resta") {
    matrizA = obtenerMatrizDesdeDOM("matrizA");
    matrizB = obtenerMatrizDesdeDOM("matrizB");

    resultado = operacion === "suma"
      ? sumarMatrices(matrizA, matrizB)
      : restarMatrices(matrizA, matrizB);

    contenidoHTML += mostrarResultado("Matriz A", matrizA);
    contenidoHTML += mostrarResultado("Matriz B", matrizB);
  } 
  else if (operacion === "multiplicar-escalar") {
    escalar = parseFloat(document.querySelector("#escalar").value);
    matrizA = obtenerMatrizDesdeDOM("matriz");

    resultado = multiplicarEscalar(matrizA, escalar);

    contenidoHTML += mostrarResultado("Matriz A", matrizA);
    contenidoHTML += `<h4>Escalar: ${escalar}</h4>`;
  } 
  else if (operacion === "matriz-transpuesta") {
    matrizA = obtenerMatrizDesdeDOM("matriz");

    resultado = matrizTranspuesta(matrizA);

    contenidoHTML += mostrarResultado("Matriz Original", matrizA);
  }

  // Agregar tabla de resultado
  contenidoHTML += mostrarResultado("Resultado", resultado);

  // Insertar contenido en el modal
  document.querySelector(".body-modal").innerHTML = contenidoHTML;
  document.querySelector("#calcular").remove();
}

// export function calcularResultado() {
//   // Detectar qué operación se está realizando
//   const operacion = document
//     .querySelector(".body-modal")
//     .getAttribute("data-operacion");
 
//   // Obtener los datos necesarios para la operación
//   let resultado;

//   if (operacion === "suma") {
//     let matrizA = obtenerMatrizDesdeDOM("matrizA");
//     let matrizB = obtenerMatrizDesdeDOM("matrizB");
//     resultado = sumarMatrices(matrizA, matrizB);
//     console.log(resultado);
//   } else if (operacion === "resta") {
//     let matrizA = obtenerMatrizDesdeDOM("matrizA");
//     let matrizB = obtenerMatrizDesdeDOM("matrizB");
//     resultado = restarMatrices(matrizA, matrizB);
//   } else if (operacion === "multiplicar-escalar") {
//     const escalar = parseFloat(document.querySelector("#escalar").value)
//     let matriz = obtenerMatrizDesdeDOM("matriz");
//     resultado = multiplicarEscalar(matriz, escalar);
//   } else if (operacion === "matriz-transpuesta") {
//     let matriz = obtenerMatrizDesdeDOM("matriz");
//     resultado = matrizTranspuesta(matriz);
//   }

//   // Mostrar el resultado en el modal
//   mostrarResultadoEnModal(resultado);
// }



// Función para obtener una matriz desde el DOM
function obtenerMatrizDesdeDOM(id) {
  const tabla = document.getElementById(id);
  if (!tabla) return null;

  const filas = tabla.querySelectorAll("tr");
  let matriz = [];

  filas.forEach((fila) => {
    let filaArray = [];
    const celdas = fila.querySelectorAll("input");

    celdas.forEach((celda) => {
      filaArray.push(parseFloat(celda.value) || 0); // Convertir a número, si está vacío usa 0
    });

    matriz.push(filaArray);
  });

  return matriz;
}

// Función para mostrar el resultado en el modal
function mostrarResultado(titulo, matriz) {
  if (!matriz) return "";

  let tablaHTML = `<h3>${titulo}:</h3><table class='table table-bordered'><tbody>`;

  matriz.forEach((fila) => {
    tablaHTML += "<tr>";
    fila.forEach((valor) => {
      tablaHTML += `<td>${valor}</td>`;
    });
    tablaHTML += "</tr>";
  });

  tablaHTML += "</tbody></table>";

  return tablaHTML;
}
