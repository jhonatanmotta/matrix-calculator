import {
  cargarSeccion,
  establecerContenidoMatriz,
  calcularResultado,
} from "./ui.js";

export const formularios = {
  "multiplicar-escalar": "#formMultiplicarEscalar",
  "sumar-restar": "#formSumarRestar",
  "matriz-transpuesta": "#formMatrizTranspuesta",
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

          const filas = parseInt(document.querySelector("#filas").value);
          const columnas = parseInt(document.querySelector("#columnas").value);
          let datos = { filas, columnas, operacion: seccion };

          if (seccion === "sumar-restar") {
            datos.operacion = document.querySelector("#operacion").value;
          } else if (seccion === "multiplicar-escalar") {
            datos.escalar = parseInt(document.querySelector("#escalar").value);
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
