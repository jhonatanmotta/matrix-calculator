import { calcularDeterminante } from "./matrixOperations.js";

export function resolverSistemaEcuaciones(matrizCoeficientes, vectorResultados) {
  const n = matrizCoeficientes.length;
  let soluciones = [];
  let tipo = "";

  if (n !== 2 && n !== 3) {
    tipo = "Solo se soportan sistemas 2x2 o 3x3";
    soluciones = null;
    return { soluciones, tipo };
  }

  const det = calcularDeterminante(matrizCoeficientes);

  if (det !== 0) {
    // Sistema compatible determinado - usar Cramer
    tipo = "Compatible determinado";
    const solucionesTemp = [];

    for (let i = 0; i < n; i++) {
      const matrizXi = matrizCoeficientes.map((fila, filaIdx) =>
        fila.map((val, colIdx) => (colIdx === i ? vectorResultados[filaIdx] : val))
      );
      const detXi = calcularDeterminante(matrizXi);
      solucionesTemp.push(detXi / det);
    }
    soluciones = solucionesTemp;
  } else {
    // Si el determinante es cero, debemos analizar el sistema ampliado
    const matrizAmpliada = matrizCoeficientes.map((fila, i) => [...fila, vectorResultados[i]]);
    
    // Verificar si las filas son proporcionales entre sí
    const esIncompatible = verificarIncompatibilidad(matrizAmpliada);
    
    if (esIncompatible) {
      tipo = "Sistema incompatible";
    } else {
      tipo = "Compatible indeterminado";
    }
    soluciones = null;
  }

  return { soluciones, tipo };
}

function verificarIncompatibilidad(matrizAmpliada) {
  const n = matrizAmpliada.length;
  const m = matrizAmpliada[0].length;

  for (let i = 0; i < n; i++) {
    for (let j = i + 1; j < n; j++) {
      let factor = null;
      let esFilaProporcional = true;

      // Encontrar el primer par de elementos no nulos para calcular el factor
      for (let k = 0; k < m - 1; k++) {
        if (matrizAmpliada[i][k] !== 0 && matrizAmpliada[j][k] !== 0) {
          factor = matrizAmpliada[i][k] / matrizAmpliada[j][k];
          break;
        }
      }

      if (factor === null) continue;

      // Verificar si todos los coeficientes mantienen la misma proporción
      for (let k = 0; k < m - 1; k++) {
        if (matrizAmpliada[i][k] !== 0 || matrizAmpliada[j][k] !== 0) {
          if (Math.abs(matrizAmpliada[i][k] - factor * matrizAmpliada[j][k]) > 1e-10) {
            esFilaProporcional = false;
            break;
          }
        }
      }

      // Si los coeficientes son proporcionales pero los términos independientes no,
      // el sistema es incompatible
      if (esFilaProporcional) {
        const ultimoIndice = m - 1;
        if (Math.abs(matrizAmpliada[i][ultimoIndice] - factor * matrizAmpliada[j][ultimoIndice]) > 1e-10) {
          return true; // Sistema incompatible
        }
      }
    }
  }
  return false;
}