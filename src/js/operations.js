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