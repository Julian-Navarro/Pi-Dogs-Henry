import React from "react";
import "./DogCard.css"
import { Link } from "react-router-dom";

export default function DogCard({ id, name, img, weight_min, weight_max, height_min, height_max, life_span_min, life_span_max, temps, origin }){
         return (
           <div className="divCard">
              <div className="dogCard">
                <Link to={`/home/${id}`}>
                <h3>{name}</h3>
                </Link>
                <div className="card">
                  <div>
                    {origin?<h5>{origin}</h5>:null}
              
                  <h5> Weight: {weight_min !== "Not found" ? weight_max !== "Not found" ? weight_min+"kg - "+weight_max+"kg":weight_min+"kg":"Not found"} </h5> 
                  <h5>Height: {height_min !== "Not found" ? height_max !== "Not found"? height_min+"cm - "+height_max+"cm":height_min+"cm":"Not found" }</h5>
                  <h5>Life span: {life_span_min+ " - " + life_span_max}</h5>
                  </div>
                <img src={img} alt="img not found" width="200px" height="250px"/>
                </div>
        {   
         temps ? (<h5>{ temps }</h5>) : <h5>This dog doesn't have temperaments</h5>
        } 
              
              </div> 
          </div>
         )
}