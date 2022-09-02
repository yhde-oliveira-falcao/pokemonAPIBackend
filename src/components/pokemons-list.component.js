import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Pokemon = props => (
  <tr>
    <td>{props.pokemon.username}</td>
    <td>{props.pokemon.description}</td>
    
    <td>
      <Link to={"/edit/"+props.pokemon._id}>edit</Link> | <a href="#" onClick={() => { props.deletePokemon(props.exercise._id) }}>delete</a>
    </td>
  </tr>
)

export default class pokemonsList extends Component {
  constructor(props) {
    super(props);

    this.deletePokemon = this.deletePokemon.bind(this)

    this.state = {pokemons: []};
  }

  componentDidMount() {
    axios.get('http://localhost:5000/pokemons/')
      .then(response => {
        this.setState({ pokemons: response.data })
      })
      .catch((error) => {
        console.log(error);
      })
  }

  deletePokemon(id) {
    axios.delete('http://localhost:5000/pokemons/'+id)
      .then(response => { console.log(response.data)});

    this.setState({
      pokemons: this.state.pokemons.filter(el => el._id !== id)
    })
  }

  pokemonList() {
    return this.state.pokemons.map(currentpokemon => {
      return <Pokemon exercise={currentpokemon} deletePokemon={this.deletePokemon} key={currentpokemon._id}/>;
    })
  }

  render() {
    return (
      <div>
        <h3>Logged Pokemons</h3>
        <table className="table">
          <thead className="thead-light">
            <tr>
              <th>Username</th>
              <th>Pokemon Name</th>
              {/* <th>Duration</th>
              <th>Date</th> */}
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            { this.pokemonList() }
          </tbody>
        </table>
      </div>
    )
  }
}