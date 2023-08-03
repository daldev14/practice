import fetch from "node-fetch";

const API = "https://api.escuelajs.co/api/v1";

/** @function fnAsync - Async function */
const fnAsync = () => {
  return new Promise((resolve, reject) => {
    true
      ? setTimeout(() => resolve("Async!!"), 2000)
      : reject(new Error("Error!"));
  });
};

/** @function anotherFn - Async function */
const anotherFn = async () => {
  const something = await fnAsync();
  console.log(something);
  console.log("Hello!");
};

console.log("Before");
anotherFn();
console.log("After");

/**
 *
 * @param {String} urlApi - API URL
 * @returns {Promise} - Promise with the data
 */
async function fetchData(urlApi) {
  const response = await fetch(urlApi);
  const data = await response.json();
  return data;
}

/**
 *
 * @param {String} urlApi - API URL
 * @returns {Promise} - Promise with the data
 */
const anotherFunction = async (urlApi) => {
  try {
    const products = await fetchData(`${urlApi}/products`);
    const product = await fetchData(`${urlApi}/products/${products[0].id}`);
    const category = await fetchData(
      `${urlApi}/categories/${product.category.id}`
    );

    console.log(products);
    console.log(product);
    console.log(product.title);
    console.log(category.name);
  } catch (error) {
    console.log(new Error(error));
  }
};

anotherFunction(API);
