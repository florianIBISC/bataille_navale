import React from 'react';
import { Switch,Route } from 'react-router-dom';  //Navigation
//import Grille2 from './Jeu/Grille2';
//import GrilleTest from './Jeu/GrilleTest'
//import Compte from './Jeu/Compte'
import './App.css';
import Grille from './Jeu/Grille';

function App() {
  return (
    <React.Fragment>
      <Grille/>
      <Switch>
        <Route path='/compte' component={Grille}/>
      </Switch>
    </React.Fragment>
  );
}

export default App;
