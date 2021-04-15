import { useState } from "react";
import "./App.css";

function App() {
  const items = ["1200 MXN", " 998.90 $", "2.440,50", "34000,00"];
  const [cantidades, setCantidades] = useState([]);
  const [totalCantidades, setTotalCantidades] = useState(null);

  // Funcion que da formato a cualquier numero
  const formater = (num, opciones) => {
    opciones = opciones || {};
    opciones.simbolo = opciones.simbolo || "$";
    opciones.moneda = opciones.moneda || " MXN";
    opciones.separadorDecimal = opciones.separadorDecimal || ".";
    opciones.separadorMiles = opciones.separadorMiles || ",";
    opciones.numeroDeDecimales =
      opciones.numeroDeDecimales >= 0 ? opciones.numeroDeDecimales : 2;

    const CIFRAS_MILES = 3;

    // establece numero de decimales
    let numeroComoCadena = num.toFixed(opciones.numeroDeDecimales);
    // inidca la posicion del punto
    let posicionDelSeparador = numeroComoCadena.indexOf(
      opciones.separadorDecimal
    );

    if (posicionDelSeparador === -1)
      posicionDelSeparador = numeroComoCadena.length;

    let formateadoSinDecimales = "",
      indice = posicionDelSeparador;

    while (indice >= 0) {
      let limiteInferior = indice - CIFRAS_MILES;
      formateadoSinDecimales =
        (limiteInferior > 0 ? opciones.separadorMiles : "") +
        numeroComoCadena.substring(limiteInferior, indice) +
        formateadoSinDecimales;
      indice -= CIFRAS_MILES;
    }

    let formateadoSinSimbolo = `${formateadoSinDecimales}${numeroComoCadena.substr(
      posicionDelSeparador,
      opciones.numeroDeDecimales + 1
    )}`;
    return opciones.simbolo + formateadoSinSimbolo + opciones.moneda;
  };

  const opcionesPesosMexicanos = {
      numeroDeDecimales: 2,
      separadorDecimal: ".",
      separadorMiles: ",",
      simbolo: "$ ",
    },
    opcionesDolares = {
      numeroDeDecimales: 2,
      moneda: " USD",
      separadorDecimal: ".",
      separadorMiles: ",",
      simbolo: "$ ",
    };

  const handleConverter = () => {
    const cantidadesFormateadas = [];
    const cantidadesSinFormato = [];

    items.forEach((item) => {
      const originalItem = item;
      // Elimina cualquier moneda en MXN
      const newWord = originalItem.replace(/MXN$/, " ");

      // Crea arreglo de numeros
      const float = parseFloat(newWord);
      cantidadesSinFormato.push(float);

      // Genera el formato correcto
      const result = formater(float, opcionesPesosMexicanos);
      cantidadesFormateadas.push(result);
    });

    // Suma de del arreglo
    let totalCantidades = cantidadesSinFormato.reduce((a, b) => a + b, 0);
    const totalFormateado = formater(totalCantidades, opcionesPesosMexicanos);

    // Guarda resultados en un state
    setTotalCantidades(totalFormateado);
    setCantidades(cantidadesFormateadas);
  };

  return (
    <>
      <header>
        <h1>Prueba Momiji</h1>
      </header>
      <main id="container">
        <section id="datos">
          <table border="1">
            <caption>Cantidades</caption>
            <thead>
              <tr>
                <th>Cantidad</th>
                <th>Nombre de producto</th>
                <th>Stock</th>
                <th>Precio Unitario</th>
                <th>Subtotal</th>
              </tr>
            </thead>
            <tbody>
              {items.map((cantidad, i) => (
                <tr key={i}>
                  <th>1</th>
                  <th>Producto {i + 1} </th>
                  <th>1</th>
                  <th className="text-cantidad">{cantidad}</th>
                  <th className="text-cantidad">{cantidad}</th>
                </tr>
              ))}
            </tbody>
            <tfoot>
              <tr>
                <th colSpan="5" className="text-total">
                  Total: 38,639.4
                </th>
              </tr>
            </tfoot>
          </table>
          <button className="btn" onClick={() => handleConverter()}>
            Convertir
          </button>
        </section>
        <section id="resultado">
          <table border="1">
            {totalCantidades && (
              <>
                <caption>Cantidades Formateadas</caption>
                <thead>
                  <tr>
                    <th>Cantidad</th>
                    <th>Nombre de producto</th>
                    <th>Stock</th>
                    <th>Precio Unitario</th>
                    <th>Subtotal</th>
                  </tr>
                </thead>
              </>
            )}
            <tbody>
              {cantidades.map((cantidad, i) => (
                <tr key={i}>
                  <th>1</th>
                  <th>Producto {i + 1} </th>
                  <th>1</th>
                  <th className="text-cantidad">{cantidad}</th>
                  <th className="text-cantidad">{cantidad}</th>
                </tr>
              ))}
            </tbody>
            <tfoot>
              {totalCantidades && (
                <tr>
                  <th colSpan="5" className="text-total">
                    Total: {totalCantidades}
                  </th>
                </tr>
              )}
            </tfoot>
          </table>
        </section>
      </main>
    </>
  );
}

export default App;
