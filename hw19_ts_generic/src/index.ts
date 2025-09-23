// Задание 1
// Напишите стрелочную функцию `sumEvenNumbers`, которая принимает массив чисел и возвращает сумму всех четных чисел.
const sumEvenNumbers = (nums: number[]): number => {
  return nums.reduce((prev, item) => {
    if (item % 2) return prev;
    return prev + item;
  }, 0);
};

const nums = [1, 2, 3, 4, 5, 6, 7, 8, 9];
console.log(sumEvenNumbers(nums));

// Задание 2
// Определите интерфейс `StringToBooleanFunction` для функции, которая принимает строку и возвращает `boolean`
// (например, проверяет, является ли строка пустой). Реализуйте такую функцию.
interface StringToBooleanFunction {
  (str: string): boolean;
}

const stringToBooleanFunction: StringToBooleanFunction = (
  str: string
): boolean => {
  if (str.length < 1) return false;
  return true;
};

console.log(stringToBooleanFunction(""));
console.log(stringToBooleanFunction("5345"));

// Задание 3
// Создайте тип `CompareStrings` для функции, принимающей две строки и возвращающей `boolean` (например, для проверки равенства строк).
// Напишите функцию, соответствующую этому типу.

type CompareStrings = (str1: string, str2: string) => boolean;

const compareStrings: CompareStrings = (
  str1: string,
  str2: string
): boolean => {
  return str1 === str2;
};

console.log(compareStrings("str1", "str2"));
console.log(compareStrings("str1", "str1"));

// Задание 4
// Напишите обобщенную функцию `getLastElement`, которая принимает массив любого типа и возвращает последний элемент этого массива.
const getLastElement = <T>(arr: T[]): T | undefined => {
  if (arr.length < 1) {
    return undefined;
  }
  return arr[arr.length - 1];
};
console.log(getLastElement([]));
console.log(getLastElement([1, 2, 3, 4, 5, 6]));
console.log(getLastElement(["1", "2", "r", "hgf"]));
console.log(getLastElement([true, false, true]));
console.log(getLastElement([null]));

// Задание 5
// Создайте обобщенную функцию `make Triple`, которая принимает три аргумента одного типа и возвращает массив из этих трёх элементов.
const makeTriple = <T>(arg1: T, arg2: T, arg3: T): T[] => {
  return Array.of(arg1, arg2, arg3);
};

console.log(makeTriple(1, 2, 3));
console.log(makeTriple(true, false, true));
console.log(makeTriple("1", "2", "3"));
