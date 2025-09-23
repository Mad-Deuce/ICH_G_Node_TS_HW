// Задание 1
// Объединение и пересечение типов
// Создайте два типа: `Admin` и `User`.
// Тип `Admin` должен включать поля `name` (строка) и `permissions` (массив строк), а тип `User` должен включать поля `name` (строка) и `email` (строка).
// Создайте тип `AdminUser`, который объединяет свойства обоих типов, и создайте объект этого типа.

type Admin = { name: string; permissions: string[] };
type User = { name: string; email: string };
type AdminUser = Admin & User;

const adminUser: AdminUser = {
  name: "Some Name",
  email: "email@email.com",
  permissions: ["user", "admin"],
};

// Задание 2
// Вложенные объекты и опциональные поля
// Создайте объект `Car` с полями `make` (строка), `model` (строка), и вложенным объектом `engine`, который имеет поля `type` (строка) и `horsepower` (число).
// Добавьте опциональное поле `year` (число) для года выпуска машины.
// Напишите функцию, которая выводит информацию о машине.

interface Car {
  make: string;
  model: string;
  engine: { type: string; horsepower: number };
  year?: number;
  info: { (): string };
}

const car: Car = {
  make: "gfdgkhlgh",
  model: "some model",
  engine: { type: "domeEngineType", horsepower: 1000 },
  info: function (): string {
    return `car info: make-${this.make}; model-${this.model}; engine type-${this.engine.type}; engine horsepower-${this.engine.horsepower}`;
  },
};
console.log(car.info());

// Задание 3
// Интерфейс для функции с объектом
// Создайте интерфейс для функции `calculateDiscount`, которая принимает объект `Product` с полями `name` (строка) и `price` (число), а также параметр `discount` (число).
// Функция должна возвращать новую цену продукта с учетом скидки.

interface Product {
  name: string;
  price: number;
}

interface CalculateDiscount {
  (product: Product, discount: number): number;
}
const calculateDiscount: CalculateDiscount = (
  product: Product,
  discount: number
): number => {
  return product.price * (1 - discount / 100);
};

const product: Product = { name: "some product name", price: 99.99 };

console.log(calculateDiscount(product, 20));

// Задание 4
// Массив объектов и функции
// Создайте интерфейс `Employee`, который включает поля `name` (строка) и `salary` (число).
// Создайте массив объектов `Employee`, затем напишите функцию, которая принимает этот массив и возвращает массив зарплат всех сотрудников.

interface Employee {
  name: string;
  salary: number;
}

const getSalarys = (employees: Employee[]): number[] => {
  return employees.map((item) => item.salary);
};

const employees: Employee[] = [
  { name: "name1", salary: 5 },
  { name: "name2", salary: 7 },
  { name: "name4", salary: 6 },
  { name: "name8", salary: 10 },
];

console.log(getSalarys(employees));

// Задание 5
// Наследование интерфейсов и работа с объектами
// Создайте интерфейс `Person` с полями `firstName` (строка) и `lastName` (строка).
// Создайте интерфейс `Student`, который наследует `Person` и добавляет поле `grade` (число).
// Создайте объект `student` этого типа и напишите функцию, которая выводит полное имя студента и его оценку.

interface Person {
  firstName: string;
  lastName: string;
}

interface Student extends Person {
  grade: number;
}

const student: Student = {
  firstName: "firstName1",
  lastName: "lastName1",
  grade: 12,
};

const studentInfo = (student: Student): void => {
  console.log(`${student.firstName} ${student.lastName} - ${student.grade}`);
};

studentInfo(student);

// Задание 6
// Интерфейс для функции с несколькими параметрами
// Создайте интерфейс для функции `concatStrings`, которая принимает два параметра: `str1` и `str2` (оба строки) и возвращает их объединение.
// Реализуйте эту функцию и протестируйте её.

interface ConcatStrings {
  (str1: string, str2: string): string;
}

const concatStrings: ConcatStrings = (str1: string, str2: string) =>
  str1 + str2;

console.log(concatStrings("sdfsdgs", "sdfsdhyty"));
