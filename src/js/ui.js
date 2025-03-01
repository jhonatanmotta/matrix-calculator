import { sumarMatrices, restarMatrices, multiplicarEscalar, matrizTranspuesta } from "./operations.js";
import { formularios } from "./app.js";

export function cargarSeccion(seccion) {
    const contenido = document.querySelector("#contenido");

    if (seccion === "sumar-restar") {
        contenido.innerHTML = `
        <section>

           

            <form id="formSumarRestar" class="formsumares">
                <h2 class="text-center">Sumar / Restar \n Matrices</h2>
                <label>Dimensión de las matrices:</label>
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

            <h2>Multiplicar por Escalar</h2>

            <form id="formMultiplicarEscalar">

                <label>Escalar (k):</label>
                <input type="number" inputmode="numeric" id="escalar" min="1" max="99" value="1">

                <span>Dimensión de la matriz:</span>
                
                <label>Filas:</label>
                <input type="number" inputmode="numeric" id="filas" min="1" max="99" value="1">
                
                <label>Columnas:</label>
                <input type="number" inputmode="numeric" id="columnas" min="1" max="99" value="1">

                <button type="submit" id="generarBtn">Establecer Matriz</button>

            </form>

        </section>
    `;
    } else if (seccion === "matriz-transpuesta") {
        contenido.innerHTML = `
        <section>

            <h2>Matriz Transpuesta</h2>

            <form id="formMatrizTranspuesta">

                <span>Dimensión de la matriz:</span>
                <div class="tablafc">
                    <div>
                        <label>Filas:</label>
                        <input type="number" inputmode="numeric" id="filas" min="1" max="99" value="1">
                    </div>
                    <div>
                        <label>Columnas:</label>
                        <input type="number" inputmode="numeric" id="columnas" min="1" max="99" value="1">
                    </div>
                </div>
                
                <button type="submit" id="generarBtn">Establecer Matricez</button>

            </form>

        </section>
    `;
    }
}

export function establecerContenidoMatriz (datos) {

    let matrizHTML = "";

    if (datos.operacion === "suma" || datos.operacion === "resta") {
        matrizHTML += `<h3 class="text-center">Matriz A</h3>${generarMatriz(datos.filas, datos.columnas, "matrizA")}`;
        matrizHTML += `<h3 class="text-center">Matriz B</h3>${generarMatriz(datos.filas, datos.columnas, "matrizB")}`;
    } else if (datos.operacion === "multiplicar-escalar") {
        matrizHTML += `<h3>Matriz</h3>${generarMatriz(datos.filas, datos.columnas, "matriz")}`;
    } else if (datos.operacion === "matriz-transpuesta") {
        matrizHTML += `<h3>Matriz</h3>${generarMatriz(datos.filas, datos.columnas, "matriz")}`;
    }
    
    mostrarCuadroDialogo(matrizHTML, datos);
}

function generarMatriz(filas, columnas, id) {
    let matriz = `<table id="${id}" class="matriz">`;
    for (let i = 0; i < filas; i++) {
        matriz += `<tr class="fila">`;
        for (let j = 0; j < columnas; j++) {
            matriz += `<td class="celdas"><input type="number" class="celda form-control"></td>`;
        }
        matriz += "</tr>";
    }
    matriz += "</table>";
    return matriz;
}

function mostrarCuadroDialogo (htmlContent, datos) {

    // Crear etiqueta "dialog"
    const modal = document.createElement("dialog");
    // Dar id a modal
    modal.id = "modal";
    modal.className = "themodal";

    // Insertar el contenido dentro del <dialog>
    modal.innerHTML = `
            <div class="titulomodal">
                <div><h3>${datos.operacion.charAt(0).toUpperCase() + datos.operacion.slice(1)}</h3></div>
                <div class="closemodal btn btn-danger text-center">x</div>
            </div>
            <div id="body-modal">${htmlContent}</div>
            <div class="footer-modal">
                <button id="close-modal" class="btn btn-sm btn-danger">Cerrar</button>
                <button id="calcular" class="btn btn-sm btn-primary">Calcular</button>
            </div>
    `;

    // Agregar modal al body
    document.body.appendChild(modal);

    // Mostrar modal
    modal.showModal();

    // Cerrar modal al hacer clic en la "X" o en el botón "Cerrar"
    modal.querySelector(".closemodal").addEventListener("click", () => modal.close());
    modal.querySelector("#close-modal").addEventListener("click", () => modal.close());

    // Eliminar el modal del DOM cuando se cierre
    modal.addEventListener("close", () => modal.remove());
}

export function calcularResultado () {
    
    // Detectar qué operación se está realizando
    const operacion = document.querySelector("#modal-body").getAttribute("data-operacion");
    
    // Obtener las matrices desde el modal
    const matrizA = obtenerMatrizDesdeDOM("matrizA");
    const matrizB = obtenerMatrizDesdeDOM("matrizB");
    const escalar = document.querySelector("#escalar") ? parseFloat(document.querySelector("#escalar").value) : null;

    let resultado;
    
    if (operacion === "suma") {
        resultado = sumarMatrices(matrizA, matrizB);
    } else if (operacion === "resta") {
        resultado = restarMatrices(matrizA, matrizB);
    } else if (operacion === "multiplicar-escalar") {
        resultado = multiplicarEscalar(matrizA, escalar);
    } else if (operacion === "matriz-transpuesta") {
        resultado = matrizTranspuesta(matrizA);
    }

    // Mostrar el resultado en el modal
    mostrarResultadoEnModal(resultado);
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
            filaArray.push(parseFloat(celda.value) || 0); // Convertir a número, si está vacío usa 0
        });

        matriz.push(filaArray);
    });

    return matriz;
}

// Función para mostrar el resultado en el modal
function mostrarResultadoEnModal(resultado) {
    let resultadoHTML = "<h3>Resultado:</h3>";

    resultado.forEach((fila) => {
        resultadoHTML += "<p>" + fila.join(" ") + "</p>";
    });

    document.querySelector("#modal-body").innerHTML += resultadoHTML;
} 

