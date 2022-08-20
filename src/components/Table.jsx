import React, { useContext, useEffect, useState } from 'react';
import WARSContext from '../context/WARSContext';

function Table() {
  const { planets } = useContext(WARSContext);
  const { results } = planets;

  const colunsTable = ['Name', 'Rotation Period', 'Orbital Period',
    'Diameter', 'Climate', 'Gravity', 'Terrain', 'Surface Water',
    'Population', 'Films', 'Created', 'Edited', 'URL'];
  const colunsOptions = ['population', 'orbital_period',
    'diameter', 'rotation_period', 'surface_water'];

  // useStates():
  const [resultsPlanets, setResultsPlanets] = useState([]);
  const [planetNameSearch, setPlanetName] = useState({
    filterByName: { name: '' } });
  const [numberSearch, setNumberSearch] = useState({ filterByNumericValues: [{
    column: 'population', comparison: 'maior que', value: 0 }] });

  // Subindo resultados da API no hook useState
  useEffect(() => {
    if (results) {
      setResultsPlanets(results);
    }
  }, [results]);

  // Filtrando por nome
  useEffect(() => {
    if (results) {
      const filterNamePlanets = results.filter((result) => result.name.toLowerCase()
        .includes(planetNameSearch.filterByName.name.toLowerCase()));
      setResultsPlanets(filterNamePlanets);
    }
  }, [planetNameSearch]);

  // Filtrando por comparação
  // func handleClick
  const handleClick = () => {
    const { value, column, comparison } = numberSearch.filterByNumericValues[0];
    const valueNumber = parseFloat(value);
    if (results) {
      const searchFilterNumber = results.filter((result) => {
        if (comparison === 'maior que') {
          return parseFloat(result[`${column}`]) > valueNumber;
        }
        if (comparison === 'menor que') {
          return parseFloat(result[`${column}`]) < valueNumber;
        }
        return parseFloat(result[`${column}`]) === valueNumber;
      });
      return setResultsPlanets(searchFilterNumber);
    }
  };

  // func handleChange
  const handleChange = ({ target }) => {
    const { name, value } = target;
    if (name === 'nameFilter') {
      setPlanetName({ ...planetNameSearch,
        filterByName: { name: value } });
    } else {
      setNumberSearch({ ...numberSearch,
        filterByNumericValues: [{ ...numberSearch.filterByNumericValues[0],
          [name]: value }] });
    }
  };

  const { value } = numberSearch.filterByNumericValues[0];
  return (
    <div>
      { !results ? <p>Carregando...</p>
        : (
          <div>
            <input
              type="text"
              name="nameFilter"
              onChange={ handleChange }
              data-testid="name-filter"
            />
            <form>
              <select
                onChange={ handleChange }
                data-testid="column-filter"
                name="column"
              >
                Coluna
                {
                  colunsOptions.map((key) => <option key={ key }>{ key }</option>)
                }
              </select>
              <select
                name="comparison"
                onChange={ handleChange }
                data-testid="comparison-filter"
              >
                Operador
                <option>maior que</option>
                <option>menor que</option>
                <option>igual a</option>
              </select>
              <input
                onChange={ handleChange }
                type="number"
                data-testid="value-filter"
                name="value"
                value={ value }
              />
              <button type="button" data-testid="button-filter" onClick={ handleClick }>
                Filtrar
              </button>
            </form>
            <table>
              <thead>
                <tr>
                  {
                    colunsTable.map((key) => <th key={ key }>{ key }</th>)
                  }
                </tr>
              </thead>
              <tbody>
                {
                  resultsPlanets.map((result) => (
                    <tr key={ result.name }>
                      <td>{ result.name }</td>
                      <td>{ result.rotation_period }</td>
                      <td>{ result.orbital_period }</td>
                      <td>{ result.diameter }</td>
                      <td>{ result.climate }</td>
                      <td>{ result.gravity }</td>
                      <td>{ result.terrain }</td>
                      <td>{ result.surface_water }</td>
                      <td>{ result.population }</td>
                      <td>
                        { result.films.map((film) => <p key={ film }>{ film }</p>) }
                      </td>
                      <td>{ result.created }</td>
                      <td>{ result.edited }</td>
                      <td>{ result.url }</td>
                    </tr>
                  ))
                }
              </tbody>
            </table>
          </div>
        )}
    </div>
  );
}

export default Table;
