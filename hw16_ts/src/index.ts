// Задание 1
// Функция приветствия
// Напишите функцию `greetUser`, которая принимает имя пользователя (строка)
// и выводит приветственное сообщение в консоль: `"Привет, <name>!"`.
// Используйте строгую типизацию.

const greetUser = (username: string): void => {
  console.log(`Hello, ${username}`);
};
greetUser("Some Name");

// Задание 2
// Типизация функции с объектом в качестве параметра
// Создайте интерфейс `Person`, который описывает человека с полями `name`, `age`, и `city`.
// Напишите функцию `printPersonInfo`, которая принимает объект типа `Person`
// и выводит информацию о человеке в формате: `"Имя: <name>, Возраст: <age>, Город: <city>"`.

interface Person {
  name: string;
  age: number;
  city: string;
}

const printPersonInfo = (person: Person): void => {
  console.log(
    `Имя: ${person.name}, Возраст: ${person.age}, Город: ${person.city}`
  );
};

printPersonInfo({ name: "Some Name", age: 34, city: "Some City" });

// Задание 3
// Простая типизация для числового параметра
// Напишите функцию `squareNumber`, которая принимает число и возвращает его квадрат.
// Используйте строгую типизацию.

const squareNumber = (num: number): number => num ** 2;

console.log(squareNumber(1));
console.log(squareNumber(0.5));
console.log(squareNumber(-0.5));

// Задание 4
// Типизация функции с boolean
// Напишите функцию `isEven`, которая принимает число и возвращает `true`, если число четное, и `false`, если нечетное.
// Используйте строгую типизацию.

const isEven = (num: number): boolean => {
  if (num % 2) return false;
  return true;
};

console.log(isEven(1));
console.log(isEven(4));
console.log(isEven(3.6));

// Задание 5
// Создание интерфейса для объекта
// Создайте интерфейс `Student`, который описывает студента с полями `name` (строка) и `grade` (число).
// Напишите функцию `printStudentInfo`, которая принимает объект типа `Student`
// и выводит информацию о студенте в формате: `"Студент: <name>, Оценка: <grade>"`.

interface Student {
  name: string;
  grade: number;
}

const printStudentInfo = (student: Student): void => {
  console.log(`Студент: ${student.name}, Оценка: ${student.grade}`);
};
printStudentInfo({ name: "Some Name", grade: 5 });

// Задание 6
// Функция с типом `void`
// Напишите функцию `logMessage`, которая принимает строку и выводит её в консоль без возвращаемого значения. Используйте тип `void`.

const logMessage = (str: string): void => console.log(str);
logMessage("some string 1");
logMessage("some string 2");
