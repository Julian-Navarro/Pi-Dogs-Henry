import React from "react";
import "./DogCards.css"
import DogCard from "./DogCard";



export default function DogCards ({dogs}) {
    return (
        <div className="dogs">
            { dogs.map((dog) => <DogCard key={dog.id} id={dog.id}name={dog.name} img={dog.img} weight_min={dog.weight_min} weight_max={dog.weight_max} height_min={dog.height_min} height_max={dog.height_max} life_span_min={dog.life_span_min} life_span_max={dog.life_span_max} temps={dog.temps} origin={dog.origin}/>) }
        </div>
            
    )
}