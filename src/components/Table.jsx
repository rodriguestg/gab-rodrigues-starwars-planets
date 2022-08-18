import React, { useContext, useEffect, useState } from 'react';
import WARSContext from '../context/WARSContext';

function Table() {
  const { planets } = useContext(WARSContext);
  const { results } = planets;

  const coluns = ['Name', 'Rotation Period', 'Orbital Period',
    'Diameter', 'Climate', 'Gravity', 'Terrain', 'Surface Water',
    'Population', 'Films', 'Created', 'Edited', 'URL'];

  const [resultsPlanets, setResultsPlanets] = useState([]);
  const [planetSearch, setPlanetSearch] = useState({ filterByName: { name: '' } });
  const handleChange = ({ target }) => {
    console.log(target.value);
    setPlanetSearch({ ...planetSearch,
      filterByName: { name: target.value } });
  };

  useEffect(() => {
    if (results) {
      const filterPlanets = results.filter((result) => result.name.toLowerCase()
        .includes(planetSearch.filterByName.name.toLowerCase()));
      setResultsPlanets(filterPlanets);
    }
  }, [planetSearch, results]);

  return (
    <div>
      { !results ? <p>Carregando...</p>
        : (
          <div>
            <input type="text" onChange={ handleChange } data-testid="name-filter" />
            <table>
              <thead>
                <tr>
                  {
                    coluns.map((key) => <th key={ key }>{ key }</th>)
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
