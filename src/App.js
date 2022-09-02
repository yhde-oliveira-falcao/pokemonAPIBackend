import React from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Route} from "react-router-dom";

import Navbar from "./components/navbar.component"
import pokemonList from "./components/pokemons-list.component";
import EditPokemon from "./components/edit-pokemon.component";
import CreatePokemon from "./components/create-pokemon.component";
import CreateUser from "./components/create-user.component";

function App() {
  return (
    <Router>
      <div className="container">
      <Navbar />
      <br/>
      <Route path="/" exact component={CreateUser} />
      <Route path="/edit/:id" component={EditPokemon} />
      <Route path="/create" component={CreatePokemon} />
      <Route path="/pokemonList" component={pokemonList} />
      </div>
    </Router>
  );
}

export default App;
