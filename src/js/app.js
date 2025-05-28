import {
  cargarSeccion,
  generateMatrixInputUI,
  handleCalculation,
  generarFormularioSistemaEcuaciones,
} from "./ui/index.js";

import { formularios } from "./config.js";

import { parseFraccion } from "./utils/fractions.js";

export const inicializarApp = () => {
  const botonesNavegacion = document.querySelectorAll(".nav-button");
  let seccion = null;
  let datos = null;

  botonesNavegacion.forEach((boton) => {
    boton.addEventListener("click", (event) => {
      seccion = event.target.dataset.seccion;
      cargarSeccion(seccion);

      if (seccion === "sistema-ecuaciones") {
        generarFormularioSistemaEcuaciones(2); // por defecto 2 incógnitas

        // Conectar el evento despues de que el DOM haya sido actualizado
        requestAnimationFrame(() => {
          const selectIncognitas = document.querySelector("#numIncognitas");

          if (selectIncognitas) {
            // Generar los inputs correctos al cargar la sección según el valor actual
            generarFormularioSistemaEcuaciones(
              parseInt(selectIncognitas.value)
            );

            // Añadir listener para reaccionar a futuros cambios
            selectIncognitas.addEventListener("change", (e) => {
              generarFormularioSistemaEcuaciones(parseInt(e.target.value));
            });
          }
        });
      }

      const formulario = document.querySelector(formularios[seccion] || null);

      if (formulario) {
        formulario.addEventListener("submit", (event) => {
          event.preventDefault(); // Evitar el envío del formulario
          if (seccion === "sistema-ecuaciones") {
            datos = recolectarDatosFormulario(seccion, formulario);
          } else {
            datos = recolectarDatosFormulario(seccion);
            if (datos) generateMatrixInputUI(datos);
          }
        });
      }
    });
  });

  document.addEventListener("click", (event) => {
    if (event.target && event.target.id === "calcular") {
      event.preventDefault();
      // Recolectar datos nuevamente antes de calcular
      if (seccion === "sistema-ecuaciones") {
        const formulario = document.querySelector("#formSistemaEcuaciones");
        datos = recolectarDatosFormulario(seccion, formulario);
      }
      handleCalculation(datos);
    }
  });
};

function recolectarDatosFormulario(seccion, formulario = null) {
  let datos;
  // Si el formulario es null, significa que estamos en una sección diferente a "sistema-ecuaciones"
  // y por lo tanto, recolectamos los datos de la sección actual
  
  if (!formulario) {
    datos = {
      filasA: parseInt(document.querySelector("#filasA")?.value || 0),
      columnasA: parseInt(document.querySelector("#columnasA")?.value || 0),
      filasB: parseInt(document.querySelector("#filasB")?.value || 0),
      columnasB: parseInt(document.querySelector("#columnasB")?.value || 0),
      operacion: seccion,
    };
  } else {

    const { A, B } = recolectarDatosSistemaEcuaciones(formulario);
    // Si el formulario no es null, significa que estamos en la sección "sistema-ecuaciones"
    datos = {
      matrizCoeficientes: A,
      vectorResultados: B,
      operacion: seccion
    };
  }

  if (seccion === "sumar-restar") {
    datos.operacion = document.querySelector("#operacion").value;
  } else if (seccion === "multiplicar-escalar") {
    datos.escalar = parseInt(document.querySelector("#escalar").value);
  } else if (seccion === "potencia") {
    datos.grado = parseInt(document.querySelector("#grado").value);
  }

  return datos;
}

function recolectarDatosSistemaEcuaciones(formulario) {
  // Solo seleccionar las filas que contienen ecuaciones (excluyendo el contenedor de botones)
  const filas = formulario.querySelectorAll("#formSistemaEcuaciones > div:not(.d-flex)");
  const A = []; // Matriz de coeficientes
  const B = []; // Vector de resultados

  filas.forEach((fila) => {
    const inputs = fila.querySelectorAll("input"); // solo selecciona los inputs, ignora los span
    const filaA = [];

    inputs.forEach((input, idx) => {
      const valorTexto = input.value.trim() === "" ? "0" : input.value;
      const valor = parseFraccion(valorTexto);

      // Si es el último input, es el término independiente
      if (idx === inputs.length - 1) {
        B.push(valor);
      } else {
        filaA.push(valor);
      }
    });

    if (filaA.length > 0) { // Solo agregar si la fila tiene coeficientes
      A.push(filaA);
    }
  });

  console.log("Matriz A:", A); // Para depuración
  console.log("Vector B:", B); // Para depuración

  return { A, B };
}
