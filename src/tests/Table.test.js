import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import mockApi from './moks/mockApi';
import App from '../App';

describe('Testando o component Table', () => {
  beforeEach(async () => {
    global.fetch = jest.fn().mockResolvedValue({
      json: jest.fn().mockResolvedValue({ results: mockApi }),
    });
    render(<App />);
    await waitFor(() => expect(fetch).toHaveBeenCalled());
  });

  test('se filtra pelo nome do planeta', async () => {
    const nameFilter = screen.getByTestId('name-filter');
    userEvent.type(nameFilter, 'Tatoo');
    expect(screen.getByRole('columnheader', {
      name: /tatooine/i
    })).toBeInTheDocument();
  });

    test('Testando se existe todos os botões', () => {
      render(<App />);
    setTimeout(() => {
      const comparison = screen.getByTestId("comparison-filter");
      expect(comparison).toBeInTheDocument();
      const inputValueFilter = screen.getByTestId("value-filter");
      expect(inputValueFilter).toBeInTheDocument();
      const btnFilter = screen.getByTestId("button-filter");
      expect(btnFilter).toBeInTheDocument();
  }, 1000);
  });
  test('Testando se os botões de filtro funcionam', () => {
    render(<App />);
  setTimeout(() => {
    const inputValueFilter = screen.getByTestId("value-filter");
    userEvent.type(inputValueFilter, 5000000000);
    const btnFilter = screen.getByTestId("button-filter");
    userEvent.click(btnFilter);
    console.log(screen.logTestingPlaygroundURL());
    // const inputValueFilter = screen.getAllByRole("value-filter");
    expect()
}, 1000);
});
});
