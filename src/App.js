import React from 'react';
import './App.css';
import Form from './components/Form';
import GridContainer from './containers/GridContainer';

const App = () => {
  return (
    <div className="App">
      <GridContainer />
      <Form />
    </div>
  );
}

export default App;
