// Objetivo: Utilizar callbacks para hacer peticiones a una API
// Utiliza: XMLHTTPRequest
// Notas: XMLHTTPRequest es una API que permite hacer peticiones HTTP desde JavaScript, Es una API que se utiliza mucho, pero no es muy amigable, por lo que se recomienda utilizar librerías como Axios o Fetch API.

const XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
const API = "https://api.escuelajs.co/api/v1";

/**
 * @param {String} urlApi - url de la api a la que se va a hacer la petición.
 * @param {Callback} callback - función que se va a ejecutar cuando la petición se resuelva.
 * @returns {Callback} - callback(error, data)
 * @returns {Error} - error
 */
function fetchData(urlApi, callback) {
  // Instancia del objeto XMLHttpRequest
  let xhttp = new XMLHttpRequest();

  // Abrir una conexión con el método, la ruta y si es asincrono
  xhttp.open("GET", urlApi, true);

  // Escuchar lo que hace la conexión
  xhttp.onreadystatechange = function (event) {
    // Estados de la petición
    // 0: inicializado
    // 1: cargando
    // 2: ya se cargó
    // 3: ya hay información
    // 4: solicitud completa

    // Códigos de estado http
    // 200: OK
    // 201: Created
    // 400: Bad Request
    // 401: Unauthorized
    // 403: Forbidden
    // 404: Not Found
    // 500: Internal Server Error
    // 503: Service Unavailable
    // 504: Gateway Timeout

    // Validar el estado en el que se encuentra la petición
    if (xhttp.readyState === 4) {
      // Validar el status de la petición
      if (xhttp.status === 200) {
        // Ejecutar el callback con el resultado de la petición
        // null: no hay error
        // JSON.parse(xhttp.responseText): respuesta de la petición
        callback(null, JSON.parse(xhttp.responseText));
      } else {
        // Si no es 200, ejecutar el callback con el error
        const error = new Error("Error " + urlApi);
        return callback(error, null);
      }
    }
  };

  // Enviar la solicitud
  xhttp.send();
}

// Hacer la petición a la API
fetchData(`${API}/products`, function (error1, data1) {
  if (error1) return console.error(error1);

  fetchData(`${API}/products/${data1[0].id}`, function (error2, data2) {
    if (error2) return console.error(error2);

    fetchData(
      `${API}/categories/${data2?.category?.id}`,
      function (error3, data3) {
        if (error3) return console.error(error3);

        console.log(data1[0]);
        console.log("Product Title:", data2.title);
        console.log("Category Name:", data3.name);
      }
    );
  });
});
