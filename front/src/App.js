import React from 'react';
import { Switch,Route } from 'react-router-dom';  //Navigation
import Connection from './Authentification/Connexion';
import Compte from './Authentification/Compte'

import Intialisation from './Jeu/Initialisation'
import Jeu from './Jeu/Jeu';
import './App.css';

function App() {
  return (
    <React.Fragment>
      <Switch>
        <Route exact path='/' component={Connection}/>
        <Route path='/compte' component={Compte}/>
        <Route path='/initalisation' component={Intialisation}/>
        <Route path='/jeu' component={Jeu}/>
      </Switch>
    </React.Fragment>
  );
}

export default App;
