import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getDetail, getDogs } from "../actions"
import { Link, useHistory } from "react-router-dom"
import "./Detail.css";

export default function Detail(props){
const dispatch = useDispatch();

useEffect(()=>{
    dispatch(getDetail(props.match.params.id));
    dispatch(loading())
},[dispatch]);
const myDog = useSelector((state)=> state.dogDetail);
const history = useHistory();
function handleButtonBack(e){
e.preventDefault();
history.push("/home");
};


return (
     <div className="container">
        <button onClick={(e)=>handleButtonBack(e)}>Back</button>
        <div className="cardContainer">
            { myDog.length>0 
            ?<div>
            {myDog[0].origin?<h5>{myDog[0].origin}</h5>:null}
            <h5> Weight: {myDog[0].weight_min !== "Not found" ? myDog[0].weight_max !== "Not found" ? myDog[0].weight_min+"kg - "+myDog[0].weight_max+"kg":myDog[0].weight_min+"kg":"Not found"} </h5> 
            <h5>Height: {myDog[0].height_min !== "Not found" ? myDog[0].height_max !== "Not found"? myDog[0].height_min+"cm - "+myDog[0].height_max+"cm":myDog[0].height_min+"cm":"Not found" }</h5>
            {myDog[0].life_span_max?<h5>Life span: {myDog[0].life_span_min+ " - " + myDog[0].life_span_max} years</h5>:<h5>Life span: {myDog[0].life_span_min} years</h5>}
            <div className="divImg">
                <h3 className="name">{myDog.length>0 ? myDog[0].name : null}</h3>
                <img className="img" src={myDog[0].img} alt="img not found"/>  
            </div>
            { 
            myDog[0].temps 
            ? <div className="divTempss">{myDog[0].temps.split(", ").map((t)=> <h3 className="tempsh3">{t}</h3> )}</div>
            : <h5 className="divTempss">This dog doesn't have temperaments</h5>
            } 
            </div>
            : null
            }
        </div>
    </div>
    ) 
}; 