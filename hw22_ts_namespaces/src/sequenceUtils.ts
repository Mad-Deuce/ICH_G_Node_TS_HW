export const generateFibonacci = (n: number): number[] => {
  if (n === 0) return [0];
  if (n === 1) return [0, 1];
  let res = [0, 1];
  for (let index: number = 2; index <= n - 1; index++) {
    res.push((res[index - 1] as number) + (res[index - 2] as number));
  }
  return res;
};

export const generateFibonacciRec = (n: number): number[] => {
  if (n <= 0) return [];
  if (n === 1) return [0];
  if (n === 2) return [0, 1];
  const prev = generateFibonacciRec(n - 1);
  const last = prev[prev.length - 1];
  const secondLast = prev[prev.length - 2];
  if (last !== undefined && secondLast !== undefined) {
    prev.push(last + secondLast);
  }
  return prev;
};

function isPrime(num: number): boolean {
  if (num <= 1) return false; // 1 и меньшие числа не являются простыми
  for (let i = 2; i <= Math.sqrt(num); i++) {
    // Проверяем делимость до корня из числа
    if (num % i === 0) return false; // Если есть делитель, число не простое
  }
  return true; // Если делителей нет, число простое
}

export const generatePrimeNumbers = (n: number): number[] => {
  if (n <= 1) throw Error("arg < 0");
  let res: number[] = [];
  for (let k = 1; k <= n; k++) {
    if (isPrime(k)) res.push(k);
  }

  return res;
};
