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

export function parseFraccion (valor) {
    if (valor.includes("/")) {
      let [num, den] = valor.split("/").map(Number);
      return num / den; // Devuelve el número decimal
    }
    return parseFloat(valor); // Si no es fracción, devolver como número normal
}

export function decimalAFraccion(decimal) {
    console.log(decimal);
    
    let precision = 1e-6; // Precisión para evitar errores de coma flotante
    let signo = decimal < 0 ? -1 : 1;
    decimal = Math.abs(decimal);
    
    let numerador = decimal;
    let denominador = 1;
  
    while (Math.abs(numerador - Math.round(numerador)) > precision) {
      numerador *= 10;
      denominador *= 10;
    }
  
    let gcd = (a, b) => (b ? gcd(b, a % b) : a); // Máximo común divisor
    let divisor = gcd(Math.round(numerador), denominador);
  
    return `${signo * Math.round(numerador / divisor)}/${denominador / divisor}`;
}