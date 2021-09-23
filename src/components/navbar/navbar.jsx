import './navbarStyle.css';
import React from "react";
import ReactDOM from "react-dom";
import { useState } from "react";
import { render } from "preact";

export default class Navbar extends React.Component {
  render() {
    return (
      <div className='navbar'>
        <h1>Shotgun</h1>
        <h2>profile</h2>
      </div>
    );
  }
}
