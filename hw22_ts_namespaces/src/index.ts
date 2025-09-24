// Задание 1
// Модули для работы со строками
// 1. Создайте файл \`stringUtils.ts\`, в котором определите функции:
// \`capitalize\`, которая делает первую букву строки заглавной.
// \`reverseString\`, которая переворачивает строку задом наперед.
// 2. В файле \`main.ts\` импортируйте эти функции и протестируйте их на примерах строк.

import { capitalize, reverseString } from "./stringUtils";

console.log(capitalize("some string"));
console.log(reverseString("some string"));

// Задание 2
// Пространства имен для финансовых операций
// Создайте файл `finance.ts`, в котором определите пространство имен `Finance`.
// Внутри него создайте классы:
// `LoanCalculator`, который рассчитывает ежемесячные платежи по кредиту по формуле аннуитета.
// `TaxCalculator`, который рассчитывает налог на доход.
// Используйте эти классы в файле `main.ts` для расчета платежей по кредиту и налога на примерных данных.

import { Finance } from "./finance";

const principalAmount = 100000; // Сумма кредита
const interestRate = 0.1; // Годовая процентная ставка (10%)
const termInYears = 5; // Срок кредита в годах

try {
  const calculator = new Finance.LoanCalculator(
    principalAmount,
    interestRate,
    termInYears
  );

  const monthlyPayment = calculator.calculateMonthlyPayment();
  const totalInterest = calculator.calculateTotalInterestPaid();

  console.log(`Сумма кредита: ${principalAmount.toFixed(2)}`);
  console.log(`Годовая процентная ставка: ${interestRate * 100}%`);
  console.log(`Срок кредита: ${termInYears} лет`);
  console.log(`Ежемесячный платеж: ${monthlyPayment.toFixed(2)}`);
  console.log(`Общая переплата: ${totalInterest.toFixed(2)}`);
} catch (error: any) {
  console.error("Ошибка при расчете:", error.message);
}

// Пример использования класса
const calculator = new Finance.TaxCalculator();

// Пример расчета для дохода менее 5 млн руб.
const income1 = 3600000; // 3,6 млн руб.
const tax1 = calculator.calculateTax(income1);
console.log(
  `При доходе ${income1} руб. налог составит: ${tax1} руб. (ставка: ${
    calculator.getTaxRate(income1) * 100
  }%)`
);

// Пример расчета для дохода более 5 млн руб.
const income2 = 5400000; // 5,4 млн руб.
const tax2 = calculator.calculateTax(income2);
console.log(
  `При доходе ${income2} руб. налог составит: ${tax2} руб. (ставка: ${
    calculator.getTaxRate(income2) * 100
  }%)`
);

// Пример расчета для дохода более 5 млн руб. (точная граница)
const income3 = 5000000; // 5 млн руб.
const tax3 = calculator.calculateTax(income3);
console.log(
  `При доходе ${income3} руб. налог составит: ${tax3} руб. (ставка: ${
    calculator.getTaxRate(income3) * 100
  }%)`
);

// Задание 3
// Вложенные пространства имен для управления пользователями
// 1. Создайте файл \`userManagement.ts\`, в котором определите пространство имен \`UserManagement\`.
// 2. Внутри него создайте вложенное пространство имен \`Admin\`. Внутри \`Admin\` создайте класс \`AdminUser\`, который будет иметь свойства для имени,
// email и прав доступа (например, \`isSuperAdmin\`).
// 3. Также создайте методы для изменения прав доступа.
// 4. Используйте этот класс в файле \`main.ts\` для создания администратора и изменения его прав.

import { UserManagement } from "./userManagement";

const admin = new UserManagement.Admin.AdminUser(
  "Some name",
  "email@email.com",
  false
);
admin.setToSuperAdmin();
console.log(admin);
admin.unsetToSuperAdmin();
console.log(admin);

// Задание 4
// Модули для работы с числовыми последовательностями
// 1. Создайте файл \`sequenceUtils.ts\`, в котором определите функции:
// \`generateFibonacci\`, которая генерирует последовательность Фибоначчи до указанного числа.
// \`generatePrimeNumbers\`, которая генерирует простые числа до указанного числа.
// 2. В файле \`main.ts\` импортируйте эти функции и протестируйте их на примерах.

import { generateFibonacci, generateFibonacciRec, generatePrimeNumbers } from "./sequenceUtils";

console.log(generateFibonacci(8));
console.log(generateFibonacciRec(8));
console.log(generatePrimeNumbers(8));
console.log(generatePrimeNumbers(800));
