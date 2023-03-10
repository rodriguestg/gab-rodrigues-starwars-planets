import React, { useContext, useEffect, useState } from 'react';
import WARSContext from '../context/WARSContext';

function Table() {
  const { planets } = useContext(WARSContext);
  const { results } = planets;

  const colunsTable = ['Name', 'Rotation Period', 'Orbital Period',
    'Diameter', 'Climate', 'Gravity', 'Terrain', 'Surface Water',
    'Population', 'Films', 'Created', 'Edited', 'URL'];
  // const columnsOptions = ['population', 'orbital_period',
  //   'diameter', 'rotation_period', 'surface_water'];

  // useStates():
  const [resultsPlanets, setResultsPlanets] = useState([]);
  const [planetNameSearch, setPlanetName] = useState({
    filterByName: { name: '' } });
  const [numberSearch, setNumberSearch] = useState({ filterByNumericValues: [{
    column: 'population', comparison: 'maior que', value: 0 }] });
  const [columnsOptions, setColumnsOptions] = useState(['population', 'orbital_period',
    'diameter', 'rotation_period', 'surface_water']);
  const [filtersList, setFiltersList] = useState([]);

  // Subindo resultados da API no hook useState
  useEffect(() => { if (results) { setResultsPlanets(results); } }, [results]);

  // Filtrando por nome
  useEffect(() => {
    if (results) {
      const filterNamePlanets = results.filter((result) => result.name.toLowerCase()
        .includes(planetNameSearch.filterByName.name.toLowerCase()));
      setResultsPlanets(filterNamePlanets);
    }
  }, [planetNameSearch]);

  const { value: numberFil, column, comparison } = numberSearch.filterByNumericValues[0];
  const valueNumber = parseFloat(numberFil);
  let resultsComparisons = results;

  const resultsFilter = () => {
    filtersList.forEach((filter) => {
      if (filter.comparison === 'maior que') {
        const mapResults = resultsComparisons.filter((resultComparison) => (
          parseFloat(resultComparison[`${filter.column}`]) > filter.valueNumber));
        resultsComparisons = mapResults;
      }
      if (filter.comparison === 'menor que') {
        const mapResults = resultsComparisons.filter((resultComparison) => (
          parseFloat(resultComparison[`${filter.column}`]) < filter.valueNumber));
        resultsComparisons = mapResults;
      }
      if (filter.comparison === 'igual a') {
        const mapResults = resultsComparisons.filter((resultComparison) => (
          parseFloat(resultComparison[`${filter.column}`]) === filter.valueNumber));
        resultsComparisons = mapResults;
      }
    });
    setResultsPlanets(resultsComparisons);
  };

  useEffect(() => {
    if (results) {
      resultsFilter();
    }
  }, [filtersList]);

  // Eliminando op????o de filtro
  const romoveFilterOption = (columnRemove) => {
    const removeColumn = columnsOptions
      .filter((columnOption) => columnOption !== columnRemove);
    setColumnsOptions(removeColumn);
  };

  // Reseta o state de colunas
  useEffect(() => {
    if (results) {
      setNumberSearch({ filterByNumericValues: [{
        column: columnsOptions[0], comparison: 'maior que', value: 0 }] });
    }
  }, [columnsOptions]);

  // ------- HANDLECLICKS
  // Remove op????o de filtro utilizada e adiciona filtro no state.
  const handleClick = () => {
    setFiltersList([...filtersList, { column, comparison, valueNumber }]);
    romoveFilterOption(column);
  };

  // Remove todos os filtros.
  const handleClickRemoveFilters = () => {
    setFiltersList([]);
  };

  // Remove filtro.
  const handleClickRemoveFilterId = ({ target }) => {
    const removendoUmFiltro = filtersList.filter((filter) => filter.column !== target.id);
    setFiltersList(removendoUmFiltro);
  };

  // HANDLECHANGE
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
                value={ column }
              >
                Coluna
                {
                  columnsOptions.map((key) => <option key={ key }>{ key }</option>)
                }
              </select>
              <select
                name="comparison"
                onChange={ handleChange }
                data-testid="comparison-filter"
                value={ comparison }
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
                value={ numberFil }
              />
              <button type="button" data-testid="button-filter" onClick={ handleClick }>
                Filtrar
              </button>
            </form>
            {
              !filtersList.length === 0 ? <p>Sem filtros</p>
                : filtersList.map((filter) => (
                  <div key={ filter.column } data-testid="filter">
                    <p>
                      { `${filter.column} ${filter.comparison} ${filter.valueNumber}` }
                    </p>
                    <button
                      id={ filter.column }
                      type="button"
                      onClick={ handleClickRemoveFilterId }
                    >
                      X
                    </button>
                  </div>
                ))
            }
            <button
              type="button"
              data-testid="button-remove-filters"
              onClick={ handleClickRemoveFilters }
            >
              Remover todas filtragens
            </button>
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
