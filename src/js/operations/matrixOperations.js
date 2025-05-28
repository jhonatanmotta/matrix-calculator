export function sumarMatrices(A, B) {
    return A.map((fila, i) => fila.map((val, j) => val + B[i][j]));
}

export function restarMatrices(A, B) {
    return A.map((fila, i) => fila.map((val, j) => val - B[i][j]));
}

export function multiplicarEscalar(A, escalar) {
    return A.map(fila => fila.map(val => val * escalar));
}

export function matrizTranspuesta(A) {
    return A[0].map((_, j) => A.map(fila => fila[j]));
}

export function multiplicarMatrices(A, B) {
    return A.map((fila, i) => B[0].map((_, j) => fila.reduce((sum, val, k) => sum + val * B[k][j], 0)));
}

export function potenciaMatriz(A, n) {
  console.log(n);
  console.log(A);

  if (!Array.isArray(A) || !Array.isArray(A[0])) {
    throw new Error("La matriz A no es válida.");
}
    if (n === 0) {
        return A.map((fila, i) => fila.map((val, j) => (i === j ? 1 : 0))); // Matriz identidad
    }
    if (n === 1) {
        return A;
    }
    let resultado = A;
    for (let i = 2; i <= n; i++) {
        resultado = multiplicarMatrices(resultado, A);
    }
    return resultado;
}

export function calcularDeterminante(matriz) {
    const n = matriz.length;
    
    if (n === 1) {
        return matriz[0][0];
    }
    if (n === 2) {
        return matriz[0][0] * matriz[1][1] - matriz[0][1] * matriz[1][0];
    }
    let det = 0;
    for (let i = 0; i < n; i++) {
        const submatriz = matriz.slice(1).map(fila => fila.filter((_, j) => j !== i));
        det += ((i % 2 === 0 ? 1 : -1) * matriz[0][i] * calcularDeterminante(submatriz));
    }
    return det;
}

export function calcularInversa(matriz) {
  const n = matriz.length;
  
  const det = calcularDeterminante(matriz);
  if (det === 0) {
    Swal.fire({
      icon: "error",
      toast: true,
      position: "top-end",
      title: "Matriz no invertible",
      text: "Determinante cero",
      showConfirmButton: false,
      timer: 3000,
      timerProgressBar: true,
      background: "#f8d7da",
    });
    throw new Error("La matriz no es invertible (determinante cero).");
  }

  // Calcular la matriz de cofactores (adjunta sin transponer aún)
  const cofactores = matriz.map((fila, i) =>
    fila.map((_, j) => {
      const submatriz = matriz
        .filter((_, k) => k !== i)
        .map(f => f.filter((_, l) => l !== j));
      const cofactor = calcularDeterminante(submatriz);
      return ((i + j) % 2 === 0 ? 1 : -1) * cofactor;
    })
  );

  // Transponer la matriz de cofactores (adjunta)
  const adjunta = matrizTranspuesta(cofactores);

  // Dividir cada elemento de la adjunta por el determinante
  const inversa = adjunta.map(fila => fila.map(valor => valor / det));

  return inversa;
}