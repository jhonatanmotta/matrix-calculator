import {
  cargarSeccion,
  establecerContenidoMatriz,
  calcularResultado,
} from "./ui.js";

export const formularios = {
  "multiplicar-escalar": "#formMultiplicarEscalar", //ya está lista
  "sumar-restar": "#formSumarRestar",//ya está lista
  "matriz-transpuesta": "#formMatrizTranspuesta",//ya está lista
  "multiplicar-matrices": "#formMultiplicarMatrices", 
  "potencia": "#formPotencia",
  "inversa": "#formInversa",
  "determinante": "#formDeterminante",
};

document.addEventListener("DOMContentLoaded", () => {
  const botonesNavegacion = document.querySelectorAll(".nav-button");
  let seccion = null;

  botonesNavegacion.forEach((boton) => {
    boton.addEventListener("click", (event) => {
      seccion = event.target.dataset.seccion;
      cargarSeccion(seccion);

      const formulario = document.querySelector(formularios[seccion] || null);

      if (formulario) {
        formulario.addEventListener("submit", (event) => {
          event.preventDefault();

          const filasA = parseInt(document.querySelector("#filasA").value);
          const columnasA = parseInt(document.querySelector("#columnasA").value);
          const filasB = parseInt(document.querySelector("#filasB")?.value || 0);
          const columnasB = parseInt(document.querySelector("#columnasB")?.value || 0);          
          let datos = { filasA, columnasA, filasB, columnasB, operacion: seccion};

          if (seccion === "sumar-restar") {
            datos.operacion = document.querySelector("#operacion").value;
          } else if (seccion === "multiplicar-escalar") {
            datos.escalar = parseInt(document.querySelector("#escalar").value);
          } else if (seccion === "potencia") {
            datos.grado = parseInt(document.querySelector("#grado").value);
          }

          establecerContenidoMatriz(datos);
        });
      }
    });
  });

  document.addEventListener("click", (event) => {
    if (event.target && event.target.id === "calcular") {
      calcularResultado();
    }
  });
  
});
