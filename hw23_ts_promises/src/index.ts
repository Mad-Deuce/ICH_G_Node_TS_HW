// Задание 1
// Обработка цепочки промисов с `async/await`
// Создайте несколько функций, которые возвращают промисы с разным временем выполнения.
// Напишите функцию, которая вызывает эти промисы поочерёдно, используя `await`, и обрабатывает результаты каждой операции.
// Убедитесь, что цепочка промисов выполняется последовательно.

const getPromise = (delayMs: number): Promise<string> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve("delay: " + delayMs);
    }, delayMs);
  });
};

const promises: Promise<string>[] = [
  getPromise(2000),
  getPromise(500),
  getPromise(1000),
];

const callPromises1 = (promises: Promise<any>[]) => {
  for (const item of promises) {
    item.then((result) => console.log(result));
  }
};

const callPromises2 = (promises: Promise<any>[]) => {
  for (const item of promises) {
    (async () => {
      const result = await item;
      console.log(result);
    })();
  }
};

const callPromises3 = async (promises: Promise<any>[]) => {
  for (const item of promises) {
    const result = await item;
    console.log(result);
  }
};

// callPromises1(promises);
// callPromises2(promises);
// callPromises3(promises);

// Задание 2
// Асинхронная обработка данных из массива
// Напишите функцию, которая принимает массив строк.
// Каждая строка будет асинхронно обрабатываться (например, преобразовываться в верхний регистр с задержкой).
// Используйте `Promise.all` для выполнения всех операций параллельно и вывода всех результатов.

const processStringAsync = (str: string) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const result = str.toUpperCase();
      resolve(result);
    }, 500);
  });
};

const processAllStrings = async (arr: string[]) => {
  const promises = arr.map((s) => processStringAsync(s));
  const results = await Promise.all(promises);
  return results;
};

const input = ["hello", "world", "foo", "bar"];
processAllStrings(input)
  .then((res) => {
    console.log(res);
  })
  .catch((err) => {
    console.error("error: ", err);
  });

// Задание 3
// Обработка ошибки в параллельных промисах
// Напишите функцию, которая вызывает три промиса параллельно с помощью `Promise.all`.
// Один из промисов должен намеренно завершиться с ошибкой через `reject`.
// Обработайте эту ошибку с использованием `try/catch` и выведите соответствующее сообщение.

const processAllPromises = async (promises: Promise<string>[]) => {
  try {
    const results = await Promise.all(promises);
    console.log("result: ", results);
    return results;
  } catch (error) {
    console.log("error: ", error);
  }
};

const promise1 = Promise.resolve("resolved1");
const promise2 = Promise.reject("rejected");
const promise3 = Promise.resolve("resolved2");

processAllPromises([promise1, promise2, promise3]);

// Задание 4
// Асинхронная функция с динамическим временем выполнения
// Напишите асинхронную функцию, которая принимает массив чисел.
// Для каждого числа создайте промис, который будет завершаться через количество миллисекунд, равное значению числа.
// Используйте `Promise.all` для ожидания завершения всех промисов и вывода результатов в консоль.

processAllPromises(promises);
