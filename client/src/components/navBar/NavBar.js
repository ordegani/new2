import React, { Component } from "react";
import { Link } from "react-router-dom";
import "./navBar.css";

export default class Navbar extends Component {
  render() {
    return (
      <nav className="navbar">
        <div className="collpase navbar-collapse">
          <ul className="navbar-items">
            {/* TODO about page */}
            <Link to="/about" className="navbar-brand">
              ArtNotes
            </Link>
            <li className="navbar-item">
              <Link to="/search" className="nav-link">
                Search
              </Link>
            </li>
            <li className="navbar-item">
              <Link to="/" className="nav-link">
                Discover
              </Link>
            </li>
            <li className="navbar-item">
              <Link to="/create" className="nav-link">
                Create Note
              </Link>
            </li>
            <li className="navbar-item">
              <Link to="/list" className="nav-link">
                Notes List
              </Link>
            </li>
          </ul>
        </div>
      </nav>
    );
  }
}
