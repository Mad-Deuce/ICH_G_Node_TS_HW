// Задание 1
// Абстрактный класс Animal
// Создайте абстрактный класс `Animal` с абстрактным методом `makeSound()`.
// Затем создайте классы `Dog` и `Cat`, которые наследуют `Animal` и реализуют метод `makeSound()` по-своему (`Dog` должен возвращать "Bark", а `Cat` — "Meow").
// Создайте массив типа `Animal[]`, включающий объекты `Dog` и `Cat`, и вызовите метод `makeSound()` для каждого элемента массива.

abstract class Animal {
  abstract makeSound(): string;
}

class Dog extends Animal {
  makeSound(): string {
    return "Bark";
  }
}
class Cat extends Animal {
  makeSound(): string {
    return "Meow";
  }
}

const animals: Animal[] = [new Dog(), new Cat(), new Dog()];
animals.forEach((item) => console.log(item.makeSound()));

// Задание 2
// Абстрактный класс Shape с цветом
// Создайте абстрактный класс `ColoredShape`, который наследует `Shape` (из задания 4 на уроке) и добавляет абстрактное поле `color`.
// Реализуйте классы `ColoredCircle` и `ColoredRectangle`, которые наследуют `ColoredShape`, задают `color` и реализуют метод `calculateArea()`.
// Выведите площадь и цвет для каждого объекта.

abstract class Shape {
  abstract name: string;
  abstract calculateArea(): number;
}

abstract class ColoredShape extends Shape {
  abstract color: string;
}

class ColoredCircle extends ColoredShape {
  color: string;
  name: string;
  radius: number;
  constructor(color: string, name: string, radius: number) {
    super();
    this.color = color;
    this.name = name;
    this.radius = radius;
  }
  calculateArea(): number {
    return this.radius ** 2 * Math.PI;
  }
}

class ColoredRectangle extends ColoredShape {
  color: string;
  name: string;
  height: number;
  width: number;
  constructor(color: string, name: string, height: number, width: number) {
    super();
    this.color = color;
    this.name = name;
    this.height = height;
    this.width = width;
  }
  calculateArea(): number {
    return this.height * this.width;
  }
}

const coloredCircle: ColoredCircle = new ColoredCircle("red", "circle1", 10);
const coloredRectangle: ColoredRectangle = new ColoredRectangle(
  "red",
  "circle1",
  2,
  5
);
console.log(coloredCircle.calculateArea());
console.log(coloredRectangle.calculateArea());

// Задание 3
// Абстрактный класс Appliance
// Создайте абстрактный класс `Appliance` с абстрактными методами `turnOn()` и `turnOff()`.
// Затем создайте классы `WashingMachine` и `Refrigerator`, которые наследуют `Appliance` и реализуют методы `turnOn()` и `turnOff()`, выводя соответствующие сообщения.
// Создайте массив типа `Appliance[]`, добавьте в него объекты `WashingMachine` и `Refrigerator`, и вызовите методы `turnOn()` и `turnOff()` для каждого элемента.

abstract class Appliance {
  abstract turnOn(): void;
  abstract turnOff(): void;
}

class WashingMachine extends Appliance {
  turnOn(): void {
    console.log("WashingMachine turn On");
  }
  turnOff(): void {
    console.log("WashingMachine turn Off");
  }
}

class Refrigerator extends Appliance {
  turnOn(): void {
    console.log("Refrigerator turn On");
  }
  turnOff(): void {
    console.log("Refrigerator turn Off");
  }
}

const appliances: Appliance[] = [
  new Refrigerator(),
  new WashingMachine(),
  new WashingMachine(),
];

appliances.forEach((item) => {
  item.turnOn();
  item.turnOff();
});

// Задание 4
// Абстрактный класс Account
// Создайте абстрактный класс `Account` с абстрактными методами `deposit(amount: number)` и `withdraw(amount: number)`.
// Реализуйте классы `SavingsAccount` и `CheckingAccount`, которые наследуют `Account`.
// В классе `SavingsAccount` добавьте логику для начисления процентов на остаток.
// В классе `CheckingAccount` реализуйте снятие средств с учетом комиссии.
// Проверьте работу методов на объектах обоих классов.

abstract class Account {
  abstract deposit(amount: number): void;
  abstract withdraw(amount: number): void;
}

class SavingsAccount extends Account {
  private balance: number;
  private interestRate: number;

  constructor(initialBalance: number, interestRate: number) {
    super();
    this.balance = initialBalance;
    this.interestRate = interestRate;
  }

  deposit(amount: number): void {
    if (amount <= 0) {
      console.log("Deposit amount must be positive.");
      return;
    }
    this.balance += amount;
    console.log(`Deposited ${amount}. New balance: ${this.balance}`);
  }

  withdraw(amount: number): void {
    if (amount <= 0) {
      console.log("Withdraw amount must be positive.");
      return;
    }
    if (amount > this.balance) {
      console.log("Insufficient funds.");
      return;
    }
    this.balance -= amount;
    console.log(`Withdrew ${amount}. New balance: ${this.balance}`);
  }

  addInterest(): void {
    const interest = this.balance * this.interestRate;
    this.balance += interest;
    console.log(`Interest added: ${interest}. New balance: ${this.balance}`);
  }
}

class CheckingAccount extends Account {
  private balance: number;
  private fee: number;

  constructor(initialBalance: number, fee: number) {
    super();
    this.balance = initialBalance;
    this.fee = fee;
  }

  deposit(amount: number): void {
    if (amount <= 0) {
      console.log("Deposit amount must be positive.");
      return;
    }
    this.balance += amount;
    console.log(`Deposited ${amount}. New balance: ${this.balance}`);
  }

  withdraw(amount: number): void {
    const totalAmount = amount + this.fee;
    if (amount <= 0) {
      console.log("Withdraw amount must be positive.");
      return;
    }
    if (totalAmount > this.balance) {
      console.log("Insufficient funds (including fee).");
      return;
    }
    this.balance -= totalAmount;
    console.log(
      `Withdrew ${amount} with fee ${this.fee}. New balance: ${this.balance}`
    );
  }
}

const savingsAccount: SavingsAccount = new SavingsAccount(100, 0.05);
savingsAccount.addInterest();
const checkingAccount: CheckingAccount = new CheckingAccount(100, 0.01);
checkingAccount.withdraw(10);

// Задание 5
// Абстрактный класс Media
// Создайте абстрактный класс `Media` с абстрактным методом `play()`.
// Затем создайте классы `Audio` и `Video`, которые наследуют `Media` и реализуют метод `play()` по-своему (например, `Audio` выводит "Playing audio", а `Video` — "Playing video").
// Создайте массив типа `Media[]`, включающий объекты `Audio` и `Video`, и вызовите метод `play()` для каждого элемента массива.

abstract class Media {
  abstract play(): void;
}

class Audio extends Media {
  play(): void {
    console.log("Playing audio");
  }
}

class Video extends Media {
  play(): void {
    console.log("Playing video");
  }
}

const medias: Media[] = [new Audio(), new Video(), new Audio()];
medias.forEach((item) => item.play());
