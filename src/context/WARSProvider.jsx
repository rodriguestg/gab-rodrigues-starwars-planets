import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import WARSContext from './WARSContext';
// Aqui mora o estado mais relevante;

function WARSProvider({ children }) {
  const [resultsPlanets, setPlanets] = useState({});
  const fetchPlanets = async () => {
    const ENDPOINT = 'https://swapi-trybe.herokuapp.com/api/planets/';
    const response = await fetch(ENDPOINT);
    const data = await response.json();
    const { results } = data;
    results.map((planet) => delete planet.residents);
    setPlanets(data);
  };
  useEffect(() => {
    fetchPlanets();
  }, []);

  const { Provider } = WARSContext;
  return (
    <Provider
      value={ {
        planets: resultsPlanets,
      } }
    >
      {children}
    </Provider>
  );
}

WARSProvider.propTypes = {
  children: PropTypes.arrayOf(PropTypes.arrayOf).isRequired,
};

export default WARSProvider;
