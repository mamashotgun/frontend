import "./navbarStyle.css";
import React from "react";

export default function NavBar({ name }) {
  return (
    <div className="navbar">
      <h1>Shotgun</h1>
      <h2>{name}</h2>
    </div>
  );
}
