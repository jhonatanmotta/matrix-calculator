export function parseFraccion (valor) {
    if (valor.includes("/")) {
      let [num, den] = valor.split("/").map(Number);
      return num / den; // Devuelve el número decimal
    }
    if (valor.includes(",")) {
      valor = valor.replace(",", "."); // Reemplaza la coma por un punto
    }    
    return parseFloat(valor); // Si no es fracción, devolver como número normal
}

export function decimalAFraccion(decimal) { 
  let signo = decimal < 0 ? -1 : 1;
  decimal = Math.abs(decimal);

  if (Number.isInteger(decimal)) {
    return `${signo * decimal}/1`;
  }

  // Convertimos el decimal a una precisión fija
  let str = decimal.toFixed(12); // Ajustar precisión ayuda a evitar errores de redondeo
  let [integerPart, fracPart] = str.split(".");

  // Casos básicos conocidos
  let simples = { "5": "1/2", "25": "1/4", "75": "3/4", "33": "1/3", "666": "2/3" };
  if (simples[fracPart]) {
    let [num, den] = simples[fracPart].split("/").map(Number);
    return `${signo * (integerPart * den + num)}/${den}`;
  }

  // Algoritmo de fracción continua para casos generales
  let tolerance = 1e-10;
  let h1 = 1, h2 = 0, k1 = 0, k2 = 1;
  let b = decimal;
  let h, k;

  while (true) {
    let a = Math.floor(b);
    h = a * h1 + h2;
    k = a * k1 + k2;

    if (Math.abs(decimal - h / k) < tolerance) {
      let gcd = (a, b) => (b ? gcd(b, a % b) : a);
      let divisor = gcd(h, k);
      return `${signo * (h / divisor)}/${k / divisor}`;
    }

    h2 = h1; h1 = h;
    k2 = k1; k1 = k;
    b = 1 / (b - a);
  }
}