import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class Navbar extends Component {

  render() {
    return (
      <nav className="navbar navbar-dark bg-dark navbar-expand-lg">
        <Link to="/" className="navbar-brand">Pokemon App</Link>
        <div className="collpase navbar-collapse">
        <ul className="navbar-nav mr-auto">
          <li className="navbar-item">
          <Link to="/" className="nav-link">Create User</Link>
          </li>
          <li className="navbar-item">
          <Link to="/create" className="nav-link">Enter Pokemon to List</Link>
          </li>
          <li className="navbar-item">
          <Link to="/pokemonList" className="nav-link">Pokemon List</Link>
          </li>
        </ul>
        </div>
      </nav>
    );
  }
}