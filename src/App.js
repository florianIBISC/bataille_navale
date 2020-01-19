import React from 'react';
import { Switch,Route } from 'react-router-dom';  //Navigation
import Connection from './Authentification/Connexion';
import Compte from './Authentification/Compte'
import Menu from './Authentification/Menu'
import Jeu from './Jeu/Play';

import './App.css';

function App() {
  return (
    <React.Fragment>
      <Switch>
        <Route exact path='/' component={Connection}/>
        <Route path='/menu' component={Menu}/>
        <Route path='/compte' component={Compte}/>
        <Route path='/jeu' component={Jeu}/>
      </Switch>
    </React.Fragment>
  );
}

export default App;
