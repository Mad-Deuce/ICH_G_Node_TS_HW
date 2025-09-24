// \`capitalize\`, которая делает первую букву строки заглавной.
export const capitalize = (str: string): string => {
  return str.charAt(0).toUpperCase() + str.substring(1);
};

// \`reverseString\`, которая переворачивает строку задом наперед.
export const reverseString = (str: string): string => {
  return str.split("").reverse().join("");
};
