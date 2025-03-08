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
  // Guardamos el signo y trabajamos con el valor absoluto
  let signo = decimal < 0 ? -1 : 1;
  decimal = Math.abs(decimal);

  // Usamos toPrecision(17) para aprovechar la precisión completa de los números en doble precisión
  let str = decimal.toPrecision(17);
  // Eliminamos ceros finales innecesarios en la parte fraccional
  str = str.replace(/(\.\d*?[1-9])0+$/, "$1").replace(/\.0+$/, "");

  // Si no hay parte decimal, es un entero
  if (!str.includes(".")) {
    return `${signo * parseInt(str, 10)}/1`;
  }

  let [integerPart, fracPart] = str.split(".");

  // Función para detectar un patrón repetitivo en la parte fraccional
  function detectarRepeticion(s) {
    let len = s.length;
    // Se prueba para cada posición de inicio (m) y para cada longitud de bloque (r)
    for (let m = 0; m < len; m++) {
      for (let r = 1; r <= len - m; r++) {
        let patron = s.substring(m, m + r);
        let valido = true;
        let fallos = 0;
        // Desde la posición m hasta el final se debe repetir el patrón
        for (let i = m; i < len; i++) {
          let expected = patron[(i - m) % r];
          if (s[i] !== expected) {
            fallos++;
            // Permitimos un fallo únicamente en la última posición (posible error de redondeo)
            if (i < len - 1 || fallos > 1) {
              valido = false;
              break;
            }
          }
        }
        if (valido) {
          return { nonRepeating: s.substring(0, m), repeating: patron };
        }
      }
    }
    return null;
  }

  let patrones = detectarRepeticion(fracPart);

  if (patrones && patrones.repeating !== "") {
    // Se ha detectado un patrón periódico en la parte decimal
    let { nonRepeating, repeating } = patrones;
    let m = nonRepeating.length;
    let r = repeating.length;

    // A: parte entera; B: parte no periódica de la parte decimal; C: bloque periódico
    let A = parseInt(integerPart, 10);
    let B = nonRepeating === "" ? 0 : parseInt(nonRepeating, 10);
    let C = parseInt(repeating, 10);

    // Denominador: 10^m * (10^r - 1)
    let D = Math.pow(10, m) * (Math.pow(10, r) - 1);
    // Numerador: A * D + [(B*10^r + C) - B]
    let numerator = A * D + ((B * Math.pow(10, r) + C) - B);

    // Simplificar la fracción con el máximo común divisor (MCD)
    let gcd = (a, b) => (b ? gcd(b, a % b) : a);
    let divisor = gcd(numerator, D);
    numerator /= divisor;
    D /= divisor;

    return `${signo * numerator}/${D}`;
  } else {
    // Si no se detecta un patrón periódico, usamos el algoritmo de fracción continua
    // que suele ser más robusto ante imprecisiones de coma flotante.
    let tolerance = 1e-12;
    let h1 = 1, h2 = 0;
    let k1 = 0, k2 = 1;
    let b = decimal;
    let h, k;
    while (true) {
      let a = Math.floor(b);
      h = a * h1 + h2;
      k = a * k1 + k2;
      if (Math.abs(decimal - h / k) < tolerance) {
        let gcd = (a, b) => (b ? gcd(b, a % b) : a);
        let divisor = gcd(h, k);
        h /= divisor;
        k /= divisor;
        return `${signo * h}/${k}`;
      }
      h2 = h1;
      h1 = h;
      k2 = k1;
      k1 = k;
      b = 1 / (b - a);
    }
  }
}
