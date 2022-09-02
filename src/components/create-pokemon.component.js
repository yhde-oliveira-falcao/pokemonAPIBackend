import React, { Component } from 'react';
import axios from 'axios';
import { useState } from "react";

//import DatePicker from 'react-datepicker';
//import "react-datepicker/dist/react-datepicker.css";

export default class CreatePokemon extends Component {
  constructor(props) {
    super(props);

    this.onChangeUsername = this.onChangeUsername.bind(this);
    this.onChangeDescription = this.onChangeDescription.bind(this);
    this.onChangePokemonName = this.onChangePokemonName(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.onSubmit2 = this.onSubmit2.bind(this);

    //this.displayPokemon = this.displayPokemon.bind(this);

    this.state = {
      username: '',
      description: '',
      users: [],
      pokemonName: '',
      species: "", 
      img: "", 
      hp: "",
      attack: "",
      defense: "",
      type: "",
      pokemonChosen: false
    }
  }

  componentDidMount() {
    axios.get('http://localhost:5000/users/')
      .then(response => {
        if (response.data.length > 0) {
          this.setState({
            users: response.data.map(user => user.username),
            username: response.data[0].username
          })
        }
      })
      .catch((error) => {
        console.log(error);
      })

  }
    

  onChangePokemonName(e) {
    this.setState({pokemonName: e.target.value})
  };

  onChangeUsername(e) {
    this.setState({ username: e.target.value })  }

  onChangeDescription(e) {
    this.setState({ description: e.target.value }) };
  


  onSubmit(e) {
    e.preventDefault();
    const pokemon = {
      username: this.state.username,
      description: this.state.description,
    }
    console.log(pokemon);
    axios.post('http://localhost:5000/exercises/add', pokemon)
      .then(res => console.log(res.data));
    window.location = '/pokemonList';
  }


  onSubmit2(e) {
    e.preventDefault();   
    axios.get(`https://pokeapi.co/api/v2/pokemon/${this.state.pokemonName}`).then(
      (response) => {        
        console.log(response)
        this.setState({pokemonName: this.state.pokemonName});
        this.setState({species: response.data.species.name});
        this.setState({img: response.data.sprites.front_default});
        this.setState({hp: response.data.stats[0].base_stat});
          this.setState({attack: response.data.stats[1].base_stat});
          this.setState({defense: response.data.stats[2].base_stat});
          this.setState({type: response.data.types[0].type.pokemonName});
        this.setState({pokemonChosen: true});
      }).then(res => console.log(res.data));
  }

  render() {
    return (
    <div>
      <h3>Enter New Pokemon to List</h3>
      <form onSubmit={this.onSubmit}>
        <div className="form-group"> 
          <label>Username: </label>
          <select ref="userInput"
              required
              className="form-control"
              value={this.state.username}
              onChange={this.onChangeUsername}>
              {
                this.state.users.map(function(user) {
                  return <option 
                    key={user}
                    value={user}>{user}
                    </option>;
                })
              }
          </select>
        </div>


        <div className="form-group"> 
          <label>Pokemon Name:</label>
          <input  type="text"
              required
              className="form-control"
              value={this.state.description}
              />
        </div>
        
        <div className="form-group">
          <input type="submit" value="Enter Pokemon to List" className="btn btn-primary" />
        </div>
      </form>



      <form onSubmit={this.onSubmit2}>
      <div className="form-group"> 
          <label>Search Pokemon Name:</label>
          <input  type="text"
              className="form-control"
              value={this.state.pokemonName}
              onChange={this.onChangePokemonName}
              />
        </div>

       <div className="form-group">
          <input type="submit" value="Select Pokemon" className="btn btn-primary" />
        </div>

        <div className="displaySection">{
                !this.state.pokemonChosen ? (
                    <h1>Select Pokemon</h1>
                ) : (
                    <>
                    <h1>{this.state.pokemonName}</h1>
                    <img src={this.state.img} />
                    <h3>Species: {this.state.species}</h3>
                    <h3>Type: {this.state.type}</h3>


                    </>
                    )}
                
            </div>

      </form>
    </div>
    )
  }
}