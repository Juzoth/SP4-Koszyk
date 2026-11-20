import { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.css';

function App() {

  const produkty = [
    { id: 1, nazwa: "Notes", cena: 12.50 },
    { id: 2, nazwa: "Długopis", cena: 3.20 },
    { id: 3, nazwa: "Plecak", cena: 89.00 },
    { id: 4, nazwa: "Kalkulator", cena: 45.90 },
    { id: 5, nazwa: "Zakreślacz", cena: 4.75 }
  ];

  const [koszyk, setKoszyk] = useState([]);

  const sumaKoszyka = koszyk.reduce(
    (suma, produkt) => suma + produkt.cena * produkt.ilosc,
    0
  );

  const pokazPodsumowanie = (nowyKoszyk) => {
    const suma = nowyKoszyk.reduce(
      (wartosc, produkt) =>
        wartosc + produkt.cena * produkt.ilosc,
      0
    );

    console.log(
      `Koszyk: ${nowyKoszyk.length} pozycji; suma: ${suma.toFixed(2)}`
    );
  };

  const dodajDoKoszyka = (produkt) => {
    const istnieje = koszyk.some(
      (element) => element.id === produkt.id
    );

    let nowyKoszyk;

    if (istnieje) {
      nowyKoszyk = koszyk.map((element) =>
        element.id === produkt.id
          ? { ...element, ilosc: element.ilosc + 1 }
          : element
      );
    } else {
      nowyKoszyk = [
        ...koszyk,
        {
          id: produkt.id,
          nazwa: produkt.nazwa,
          cena: produkt.cena,
          ilosc: 1
        }
      ];
    }

    setKoszyk(nowyKoszyk);
    pokazPodsumowanie(nowyKoszyk);
  };

  const usunZKoszyka = (id) => {
    const nowyKoszyk = koszyk.filter(
      (produkt) => produkt.id !== id
    );

    setKoszyk(nowyKoszyk);
    pokazPodsumowanie(nowyKoszyk);
  };



  return (
    <div className="container mt-4">
      <h2>Sklepik szkolny</h2>

      <ul className="list-group mb-4">
        {produkty.map((produkt) => (
          <li
            key={produkt.id}
            className="list-group-item d-flex justify-content-between align-items-center"
          >
            <span>
              {produkt.nazwa} - {produkt.cena.toFixed(2)} zł
            </span>

            <button
              type="button"
              className="btn btn-sm btn-primary"
              onClick={() => dodajDoKoszyka(produkt)}
            >
              Do koszyka
            </button>
          </li>
        ))}
      </ul>

      <h3>Koszyk ({koszyk.length} pozycji)</h3>

      {koszyk.length === 0 ? (
        <div className="alert alert-info">
          Koszyk jest pusty
        </div>
      ) : (
        <div>
          <table className="table">
            <thead>
              <tr>
                <th scope="col">Produkt</th>
                <th scope="col">Ilość</th>
                <th scope="col">Cena</th>
                <th scope="col">Suma</th>
                <th scope="col">Akcja</th>
              </tr>
            </thead>

            <tbody>
              {koszyk.map((produkt) => (
                <tr key={produkt.id}>
                  <td>{produkt.nazwa}</td>
                  <td>{produkt.ilosc}</td>
                  <td>{produkt.cena.toFixed(2)} zł</td>
                  <td>
                    {(produkt.cena * produkt.ilosc).toFixed(2)} zł
                  </td>
                  <td>
                    <button
                      type="button"
                      className="btn btn-sm btn-outline-danger"
                      onClick={() => usunZKoszyka(produkt.id)}
                    >
                      Usuń
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <p>
            <strong>
              Suma: {sumaKoszyka.toFixed(2)} zł
            </strong>
          </p>
        </div>
      )}
    </div>
  );
}

export default App;
