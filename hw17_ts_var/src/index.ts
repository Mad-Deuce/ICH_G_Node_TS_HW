// Задание 1
// Типизация функции с несколькими параметрами
// Напишите функцию `calculateTotal`, которая принимает три параметра:
// `price` (число)
// `quantity` (число)
// `discount` (число, по умолчанию равен 0)
// Функция должна возвращать общую стоимость товаров с учетом скидки. Если скидка не указана, она считается равной нулю.

const calculateTotal = (
  price: number,
  quantity: number,
  discount: number = 0
): number => {
  let result: number = price * quantity;
  if (discount) {
    return result * (1 - discount / 100);
  }
  return result;
};
console.log(calculateTotal(5, 15, 20));
console.log(calculateTotal(5, 15));

// Задание 2
// Использование Union типов
// Создайте переменную `id`, которая может быть либо строкой, либо числом.
// Напишите функцию `displayId`, которая принимает эту переменную и выводит сообщение, содержащее значение ID.
// Если `id` — строка, выведите её в верхнем регистре. Если `id` — число, умножьте его на 10 перед выводом.

let id: number | string;
const displayId = (id: number | string): void => {
  if (typeof id === "string") return console.log(id.toUpperCase());
  console.log(id * 10);
};
id = 10;
displayId(id);
id = "10";
displayId(id);
id = "fsdfsgh";
displayId(id);

// Задание 3
// Объявление и типизация массивов объектов
// Создайте массив объектов `orders`, где каждый объект описывает заказ и содержит следующие свойства:
// `orderId` (строка)
// `amount` (число)
// `status` (строка, может принимать значения "pending", "shipped" или "delivered")
// Напишите функцию `filterOrdersByStatus`, которая принимает этот массив и строку `status`, и возвращает массив заказов, соответствующих указанному статусу.
enum Status {
  Pending = "pending",
  Shipped = "shipped",
  Delivered = "delivered",
}

interface Order {
  orderId: string;
  amount: number;
  status: Status;
}

const orders: Order[] = [
  { orderId: "id1", amount: 2, status: Status.Pending },
  { orderId: "id2", amount: 3, status: Status.Shipped },
  { orderId: "id3", amount: 6, status: Status.Pending },
  { orderId: "id4", amount: 8, status: Status.Delivered },
];

const filterOrdersByStatus = (orders: Order[], status: Status): Order[] =>
  orders.filter((item) => item.status === status);

console.log(filterOrdersByStatus(orders, Status.Pending));
console.log(filterOrdersByStatus(orders, Status.Shipped));
console.log(filterOrdersByStatus(orders, Status.Delivered));

// Задание 4
// Работа с кортежами и объектами
// Создайте кортеж `productInfo`, который содержит:
// название товара (строка)
// его цену (число)
// количество на складе (число)
// Напишите функцию `updateStock`, которая принимает объект `inventory`
// (где ключ — это название товара, а значение — количество на складе)
// и кортеж `productInfo`, обновляет количество товара в объекте `inventory` и возвращает обновленный объект.

let productInfo: [string, number, number] = ["product name 1", 25.5, 10];
const updateStock = (
  inventory: { productName: string; quantity: number },
  productInfo: [string, number, number]
): { productName: string; quantity: number } => {
  inventory.productName = productInfo[0];
  inventory.quantity = productInfo[2];
  return inventory;
};

console.log(updateStock({productName: "", quantity:0}, productInfo));
