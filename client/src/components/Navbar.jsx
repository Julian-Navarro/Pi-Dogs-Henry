import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { filterDogsOrigin, orderWeight, refreshDogs, orderAlf, searchByRace, getTemps, filterTemps, deleteTemp, resetTempsToFilter } from "../actions";
import "./Navbar.css"
// let getTemps = async()=>{
//     const temperaments = await axios.get("http://localhost:3001/temperaments");
//     return temperaments.data
// }
// let temps = getTemps()
// console.log(temps);
export default function Navbar ({ setCurrentPage }){
const dispatch = useDispatch()
const temps = useSelector((state)=>state.temps);
const tempsToFilter = useSelector((state)=> state.tempsToFilter)
const [ race, setRace ] = useState("")
const defaultValue = "Select Temperaments";

function handleClick(e){
    e.preventDefault();
    dispatch(refreshDogs());
    dispatch(resetTempsToFilter());
}
function handleSubmit(e) {
e.preventDefault;
dispatch(searchByRace(race))
}
function handleInputChange(e){
    e.preventDefault();
    setRace(e.target.value)
}
   useEffect(()=>{
        dispatch(getTemps())

    }, [dispatch]);

function handleFilterTemps(e) {
    e.preventDefault;   
    tempsToFilter.includes(e.target.value) 
    ? null 
    : tempsToFilter.push(e.target.value);
    dispatch(filterTemps(tempsToFilter))
    e.target.value = defaultValue
}
function handleDelete(e) {
    e.preventDefault;
    dispatch(deleteTemp(e))
}

    return (
            <div>
                <div>
                    <input type="text" placeholder="Search race.." onChange={(e)=>handleInputChange(e)}/>
                    <button type="submit" onClick={(e)=>{ handleSubmit(e); setCurrentPage(1) } } >Search</button>
                </div> 
                <button onClick={(e)=>{handleClick(e); setCurrentPage(1)}}>Refresh Dogs</button>
                <button onClick={()=>{dispatch(filterDogsOrigin(true)); setCurrentPage(1)} }>Filter Db Dogs</button>
                <button onClick={()=>{dispatch(filterDogsOrigin(false)); setCurrentPage(1)} }  >Filter Api Dogs</button>
                <select onChange={(e)=> {handleFilterTemps(e)}} name="" id="" >
                     <option value="Select Temperaments">Select Temperaments</option>
                    {
                        temps.map((t)=>( <option key={t.id} value={t.name}>{t.name}</option> ))
                    }
                </select>
                <select name="" id="" onChange={(e)=> {dispatch(orderAlf(e.target.value)); setCurrentPage(1)}}>
                    <option value="ASC">A-Z ++</option>
                    <option value="DESC">A-Z --</option>
                </select>
                <select name="" id="" onChange={(e)=> {dispatch(orderWeight(e.target.value)); setCurrentPage(1)} }>
                    <option value="Default">Weight: Default</option>
                    <option value="ASC">Weight: Asc</option> 
                    <option value="DESC">Weight: Desc</option> 
                </select> 
            </div>
        )
}