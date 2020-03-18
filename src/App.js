import React from 'react';
import { Switch, Route } from 'react-router-dom'
import './App.css';

import Homepage from './pages/homepage/homepage.component'

const HatsPage = () => {
  return <div>
  <h1> Hats Page
  </h1></div>
}

function App() {
  return (
    <div className="App">
      <Switch>
        <Route path="/hats" component={HatsPage}/>
        <Route exact path="/" component={Homepage}/>
      </Switch>
    </div>
  );
}

export default App;
