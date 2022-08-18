import React, { useContext, useEffect } from 'react';
import WARSContext from '../context/WARSContext';

function Table() {
  const { planets } = useContext(WARSContext);
  const { results } = planets;

  useEffect(() => {
    console.log(results);
  }, [results]);

  const coluns = ['Name', 'Rotation Period', 'Orbital Period',
    'Diameter', 'Climate', 'Gravity', 'Terrain', 'Surface Water',
    'Population', 'Films', 'Created', 'Edited', 'URL'];

  return (
    <div>
      { !results ? <p>Carregando...</p>
        : (
          <table>
            <tr>
              {
                coluns.map((key) => <th key={ key }>{ key }</th>)
              }
            </tr>
            {
              results.map((result) => (
                <tr key={ result.name }>
                  {/* <div key={ result.name }> */}
                  <td>{ result.name }</td>
                  <td>{ result.rotation_period }</td>
                  <td>{ result.orbital_period }</td>
                  <td>{ result.diameter }</td>
                  <td>{ result.climate }</td>
                  <td>{ result.gravity }</td>
                  <td>{ result.terrain }</td>
                  <td>{ result.surface_water }</td>
                  <td>{ result.population }</td>
                  <td>{ result.films.map((film) => <p key={ film }>{ film }</p>) }</td>
                  <td>{ result.created }</td>
                  <td>{ result.edited }</td>
                  <td>{ result.url }</td>
                  {/* </div> */}
                </tr>
              ))
            }
          </table>
        )}
    </div>
  );
}

export default Table;
