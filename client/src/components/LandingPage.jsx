import React from "react";
import { Link } from "react-router-dom";
import "./LandingPage.css"

export default function LandingPage(){
    return (
        <div className="divContainer">
            <Link  className="linkButton" to="/home">
                <button className="buttonIn">Go there!</button>
            </Link>
            <h2 className="description">Welcome! on this app you can find all your favorites races of dogs, see info about them, you can create a dog too and it will be shown on the list</h2>
        </div>
    )
};