import React from "react";
import { Link } from "react-router-dom";
import "./LandingPage.css"

export default function LandingPage(){
    return (
        <div className="divContainer">
            <h1> Componente LandingPage </h1>
            <Link to="/home">
            <button>Ingresar</button>
            </Link>
        </div>
    )
};