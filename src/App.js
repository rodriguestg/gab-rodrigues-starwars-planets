import React from 'react';
import './App.css';
import Table from './components/Table';
import WARSProvider from './context/WARSProvider';

function App() {
  return (
    <WARSProvider>
      <span>Hello, App!!</span>
      <Table />
    </WARSProvider>
  );
}

export default App;
