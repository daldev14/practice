const promise = new Promise(function (resolve, reject) {
  if (true) resolve("Hey!");
  else reject("Ups!");
});

promise
  .then((response) => console.log(response))
  .catch((error) => console.error(error));

const cows = 15;
const countCows = new Promise(function (resolve, reject) {
  if (cows > 10) resolve(`We have ${cows} cows on the farm`);
  else reject("There is no cows on the farm");
});

countCows
  .then((response) => console.log(response))
  .catch((error) => console.error(error));

const allPromise = Promise.allSettled([promise, countCows]);

allPromise
  .then((response) => console.log(response))
  .catch((error) => console.error(error))
  .finally(() => console.log("All promises are done"));

function delay(time, message) {
  return new Promise(function (resolve, reject) {
    setTimeout(function () {
      if (message !== "") resolve(message);
      else reject("No hay mensaje");
    }, time);
  });
}

delay(2000, "Hola 👾")
  .then((response) => console.log(response))
  .catch((error) => console.error(error));
