import {
  sumarMatrices,
  restarMatrices,
  multiplicarEscalar,
  multiplicarMatrices,
  potenciaMatriz,
  calcularInversa,
  calcularDeterminante,
  matrizTranspuesta,
  parseFraccion,
  decimalAFraccion,
} from "./operations.js";

export function cargarSeccion(seccion) {
  const contenido = document.querySelector("#contenido");
  
  if (seccion === "sumar-restar") {
    contenido.innerHTML = `
        <section>

        <h2 class="text-center">Sumar/Restar Matrices</h2>
            <form id="formSumarRestar" class="formsumares">
                <label class="text-center">Dimensión de la matriz A:</label>
                <div class="tablafc">
                    <div>
                        <label class="form-label">Filas:</label>
                        <input class="form-control" type="number" inputmode="numeric" id="filasA" min="1" max="99" value="1">
                    </div>
                    <div>
                        <label class="form-label">Columnas:</label>
                        <input class="form-control" type="number" inputmode="numeric" id="columnasA" min="1" max="99" value="1">
                    </div>
                </div>
            
                <label class="text-center">Dimensión de la matricez B:</label>
                <div class="tablafc">
                    <div>
                        <label class="form-label">Filas:</label>
                        <input id="filasB" class="form-control" type="number" inputmode="numeric" min="1" max="99" value="1">
                    </div>
                    <div>
                        <label class="form-label">Columnas:</label>
                        <input id="columnasB" class="form-control" type="number" inputmode="numeric" min="1" max="99" value="1">
                    </div>
                </div>

                <label class="text-left">Operación:</label>
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
                    <input class="form-control" type="number" inputmode="numeric" id="filasA" min="1" max="99" value="1">
                    </div>

                    <div>
                    <label class="form-label">Columnas:</label>
                    <input class="form-control" type="number" inputmode="numeric" id="columnasA" min="1" max="99" value="1">
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
                        <input class="form-control" type="number" inputmode="numeric" id="filasA" min="1" max="99" value="1">
                    </div>
                    <div>
                        <label class="form-label">Columnas:</label>
                        <input class="form-control" type="number" inputmode="numeric" id="columnasA" min="1" max="99" value="1">
                    </div>
                </div>
                
                <button type="submit" id="generarBtn" class="btn btn-primary">Establecer Matriz</button>

            </form>
        </section>
    `;
  } else if (seccion === "multiplicar-matrices") {
    contenido.innerHTML = `
        <section>

        <h2 class="text-center">Multiplicación de Matrices</h2>
            <form id="formMultiplicarMatrices" class="formsumares">
                <label class="text-center">Dimensión de la matricez A:</label>
                <div class="tablafc">
                    <div>
                        <label class="form-label">Filas:</label>
                        <input  id="filasA" class="form-control" type="number" inputmode="numeric" min="1" max="99" value="1">
                    </div>
                    <div>
                        <label class="form-label">Columnas:</label>
                        <input  id="columnasA" class="form-control" type="number" inputmode="numeric" min="1" max="99" value="1">
                    </div>
                </div>

                <label class="text-center">Dimensión de la matricez B:</label>
                <div class="tablafc">
                    <div>
                        <label class="form-label">Filas:</label>
                        <input id="filasB" class="form-control" type="number" inputmode="numeric" min="1" max="99" value="1">
                    </div>
                    <div>
                        <label class="form-label">Columnas:</label>
                        <input id="columnasB" class="form-control" type="number" inputmode="numeric" min="1" max="99" value="1">
                    </div>
                </div>

                <button type="submit" id="generarBtn" class="btn btn-primary">Establecer Matrices</button>

            </form>

        </section>
    `;
  } else if (seccion === "potencia") {
    contenido.innerHTML = `
        <section>

        <h2 class="text-center">Potencia de una Matriz</h2>
            <form id="formPotencia" class="formsumares">
                <label class="text-center">Dimensión de la matricez A:</label>
                <div class="tablafc">
                    <div>
                        <label class="form-label">Filas:</label>
                        <input  id="filasA" class="form-control" type="number" inputmode="numeric" min="1" max="99" value="1">
                    </div>
                    <div>
                        <label class="form-label">Columnas:</label>
                        <input  id="columnasA" class="form-control" type="number" inputmode="numeric" min="1" max="99" value="1">
                    </div>
                </div>

                <label class="text-left">Grado:</label>
                <select id="grado" class="form-select">
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                </select>

                <button type="submit" id="generarBtn" class="btn btn-primary">Establecer Matriz</button>

            </form>

        </section>
    `;
  } else if (seccion === "inversa") {
    contenido.innerHTML = `
        <section>

        <h2 class="text-center">Inversa de una Matriz</h2>
            <form id="formInversa" class="formsumares">
                <label class="text-center">Dimensión de la matricez A:</label>
                <div class="tablafc">
                    <div>
                        <label class="form-label">Filas:</label>
                        <input  id="filasA" class="form-control" type="number" inputmode="numeric" min="1" max="99" value="1">
                    </div>
                    <div>
                        <label class="form-label">Columnas:</label>
                        <input  id="columnasA" class="form-control" type="number" inputmode="numeric" min="1" max="99" value="1">
                    </div>
                </div>

                <button type="submit" id="generarBtn" class="btn btn-primary">Establecer Matriz</button>

            </form>

        </section>
    `;
  } else if (seccion === "determinante") {
    contenido.innerHTML = `
        <section>

        <h2 class="text-center">Determinante de una Matriz</h2>
            <form id="formDeterminante" class="formsumares">
                <label class="text-center">Dimensión de la matricez A:</label>
                <div class="tablafc">
                    <div>
                        <label class="form-label">Filas:</label>
                        <input  id="filasA" class="form-control" type="number" inputmode="numeric" min="1" max="99" value="1">
                    </div>
                    <div>
                        <label class="form-label">Columnas:</label>
                        <input  id="columnasA" class="form-control" type="number" inputmode="numeric" min="1" max="99" value="1">
                    </div>
                </div>

                <button type="submit" id="generarBtn" class="btn btn-primary">Establecer Matriz</button>

            </form>

        </section>
    `;
  }
}

export function establecerContenidoMatriz(datos) {
  let contenido = document.createElement("div"); // Un contenedor para las matrices
  let matit1 = document.createElement("div"); // Un contenedor para las matriz y titulo 1
  let matit2 = document.createElement("div"); // Un contenedor para las matriz y titulo 2
  let overf1 = document.createElement("div"); // Un contenedor para las matriz 1
  let overf2 = document.createElement("div"); // Un contenedor para las matriz 2
  
  contenido.classList.add("body-modal");
  matit1.classList.add("matit1");
  matit2.classList.add("matit2");
  overf1.classList.add("overf1");
  overf2.classList.add("overf2");
  contenido.dataset.operacion = datos.operacion;

  if (
    datos.operacion === "suma" ||
    datos.operacion === "resta" ||
    datos.operacion === "multiplicar-matrices"
  ) {
    let tituloA = document.createElement("h3");
    tituloA.classList.add("text-center");
    tituloA.textContent = "Matriz A";

    let tituloB = document.createElement("h3");
    tituloB.classList.add("text-center");
    tituloB.textContent = "Matriz B";

    matit1.appendChild(tituloA);
    overf1.appendChild(generarMatriz(datos.filasA, datos.columnasA, "matrizA"));
    matit2.appendChild(tituloB);
    overf2.appendChild(generarMatriz(datos.filasB, datos.columnasB, "matrizB"));
    matit1.appendChild(overf1);
    matit2.appendChild(overf2);
    
    contenido.appendChild(matit1);
    contenido.appendChild(matit2);
  } else if (
    datos.operacion === "matriz-transpuesta" ||
    datos.operacion === "potencia" ||
    datos.operacion === "inversa" ||
    datos.operacion === "determinante"
  ) {
    let titulo = document.createElement("h3");
    titulo.textContent = "Matriz";
    matit1.appendChild(titulo);
    overf1.appendChild(generarMatriz(datos.filasA, datos.columnasA, "matrizA"));
    matit1.appendChild(overf1);
    contenido.appendChild(matit1);
  } else if (datos.operacion === "multiplicar-escalar") {
    let titulo = document.createElement("h3");
    titulo.textContent = "Matriz";
    let escalar = document.createElement("h4");
    escalar.textContent = `Escalar: ${datos.escalar}`;
    matit1.appendChild(escalar);
    matit1.appendChild(titulo);
    overf1.appendChild(generarMatriz(datos.filasA, datos.columnasA, "matrizA"));
    matit1.appendChild(overf1);
    contenido.appendChild(matit1);
  }
  
  if (
    datos.operacion === "suma" ||
    datos.operacion === "resta" ||
    datos.operacion === "multiplicar-matrices" ||
    datos.operacion === "potencia" ||
    datos.operacion === "inversa" ||
    datos.operacion === "determinante"
  ) {
    if (validarTamanoMatriz(
      [datos.filasA, datos.filasB],
      [datos.columnasA, datos.columnasB],
      datos.operacion
    ))
    {
      
      mostrarCuadroDialogo(contenido, datos);
    }
  } else {
    mostrarCuadroDialogo(contenido, datos);
  }
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
      input.classList.add("celda");

      input.addEventListener("input", () => validarInput(input));

      celda.appendChild(input);
      fila.appendChild(celda);
    }
    tabla.appendChild(fila);
  }
  return tabla;
}

function validarInput(input) {
  let regex = /^-?\d+\/[1-9]\d*$/; // Expresión para validar formato correcto

  let valor = input.value;

  // Permitir temporalmente valores parciales correctos
  if (
    valor === "" || // Vacío (para permitir edición)
    valor === "-" || // Solo un "-"
    /^-?\d+$/.test(valor) || // Solo números sin "/"
    /^-?\d+\/?$/.test(valor) // Número seguido de "/"
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

function validarTamanoMatriz(filas, columnas, operacion) {
  // Validar tamaño de matrices para suma y resta
  if (operacion === "suma" || operacion === "resta") {
    if (filas[0] !== filas[1] || columnas[0] !== columnas[1]) {
      Swal.fire({
        icon: "error",
        toast: true,
        position: "top-end",
        title: "Dimensiones incompatibles",
        text: "Las matrices deben tener el mismo tamaño para sumar o restar.",
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        background: "#f8d7da",
      });
      return false;
    } else {
      return true;
    }
  }
  // Validar tamaño de matrices para multiplicación
  if (operacion === "multiplicar-matrices") {
    if (columnas[0] !== filas[1]) {
      Swal.fire({
        icon: "error",
        toast: true,
        position: "top-end",
        title: "Dimensiones incompatibles",
        text: "El número de columnas de la matriz A debe ser igual al número de filas de la matriz B.",
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        background: "#f8d7da",
      });
      return false;
    } else {
      return true;
    }
  }
  // Validar tamaño de matriz para potencia, inversa y determinante
  if (operacion === "potencia" || operacion === "inversa" || operacion === "determinante") {
    if (filas[0] !== columnas[0]) {
      Swal.fire({
        icon: "error",
        toast: true,
        position: "top-end",
        title: "Dimensiones incompatibles",
        text: `La matriz debe ser cuadrada para calcular su ${operacion}.`,
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        background: "#f8d7da",
      });
      return false;
    } else {
      return true;
    }
  }
}

function mostrarCuadroDialogo(matriz, datos) {
  const titulos = {
    "multiplicar-escalar": "Multiplicación por Escalar",
    "suma": "Suma de Matrices",
    "resta": "Resta de Matrices",
    "matriz-transpuesta": "Matriz Transpuesta",
    "multiplicar-matrices": "Multiplicar Matrices",
    "potencia": "Potencia de una Matriz",
    "inversa": "Inversa de una Matriz",
    "determinante": "Determinante de una Matriz",
  };
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
    <div class="titulo">
        <h3>${titulos[datos.operacion]}</h3>
    </div>
    <div class="cerrar-modal">
        <button class="closemodal btn btn-danger">x</button>
    </div>
    `;

  modal.appendChild(tituloModal);
  modal.appendChild(matriz);
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

  let matrizA, matrizB, escalar, grado, resultado;
  let contenidoHTML = "";

  if (operacion === "suma" || operacion === "resta") {
    matrizA = obtenerMatrizDesdeDOM("matrizA");
    matrizB = obtenerMatrizDesdeDOM("matrizB");

    resultado =
      operacion === "suma"
        ? sumarMatrices(matrizA, matrizB)
        : restarMatrices(matrizA, matrizB);

    contenidoHTML += mostrarResultado("Matriz A", matrizA);
    contenidoHTML += mostrarResultado("Matriz B", matrizB);
  } 
  else if (operacion === "multiplicar-escalar") {
    escalar = parseFloat(document.querySelector("#escalar").value);
    matrizA = obtenerMatrizDesdeDOM("matrizA");

    resultado = multiplicarEscalar(matrizA, escalar);

    contenidoHTML += mostrarResultado("Matriz A", matrizA);
    contenidoHTML += `<h4>Escalar: ${escalar}</h4>`;
  } else if (operacion === "matriz-transpuesta") {
    matrizA = obtenerMatrizDesdeDOM("matrizA");

    resultado = matrizTranspuesta(matrizA);

    contenidoHTML += mostrarResultado("Matriz Original", matrizA);
  } else if (operacion === "multiplicar-matrices") {
    matrizA = obtenerMatrizDesdeDOM("matrizA");
    matrizB = obtenerMatrizDesdeDOM("matrizB");

    resultado = multiplicarMatrices(matrizA, matrizB);

    contenidoHTML += mostrarResultado("Matriz A", matrizA);
    contenidoHTML += mostrarResultado("Matriz B", matrizB);
  } else if (operacion === "potencia") {
    matrizA = obtenerMatrizDesdeDOM("matrizA");
    grado = parseInt(document.querySelector("#grado").value);
    console.log("hola", matrizA);
    
    resultado = potenciaMatriz(matrizA, grado);

    contenidoHTML += mostrarResultado("Matriz A", matrizA);
  } else if (operacion === "inversa") {

    matrizA = obtenerMatrizDesdeDOM("matrizA");

    resultado = calcularInversa(matrizA);
    contenidoHTML += mostrarResultado("Matriz A", matrizA);
  } else if (operacion === "determinante") {

    matrizA = obtenerMatrizDesdeDOM("matrizA");

    resultado = calcularDeterminante(matrizA);
    contenidoHTML += mostrarResultado("Matriz A", matrizA);
  }
  

  // Agregar tabla de resultado
  contenidoHTML += mostrarResultado("Resultado", resultado);

  // Insertar contenido en el modal
  document.querySelector(".body-modal").innerHTML = contenidoHTML;
  document.querySelector("#calcular").remove();
}

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
      filaArray.push(parseFraccion(celda.value) || 0); // Convertir a número, si está vacío usa 0
    });

    matriz.push(filaArray);
  });

  return matriz;
}

// Función para mostrar el resultado en el modal
function mostrarResultado(titulo, matriz) {
  if (!matriz && matriz !== 0) return ""; // <-- permitir mostrar 0

  
  if (typeof matriz === "number") {
    let resultadoFinal = Number.isInteger(matriz) || matriz === 0
      ? matriz
      : decimalAFraccion(matriz);
    return `
      <div>
        <h3>${titulo}:</h3>
        <div class="tableover">
          <table class='table table-bordered tableover'>
            <tbody>
              <tr><td>${resultadoFinal}</td></tr>
            </tbody> 
          </table>
        </div>
      </div>`;
  }
  let tablaHTML = `<div><h3>${titulo}:</h3> <div class="tableover"><table class='table table-bordered tableover'><tbody>`;

  matriz.forEach((fila) => {
    tablaHTML += "<tr>";
    fila.forEach((valor) => {
      let resultadoFinal = Number.isInteger(valor)
        ? valor
        : decimalAFraccion(valor);
      tablaHTML += `<td>${resultadoFinal}</td>`;
    });
    tablaHTML += "</tr>";
  });

  tablaHTML += "</tbody></table></div></div>";

  return tablaHTML;
}
