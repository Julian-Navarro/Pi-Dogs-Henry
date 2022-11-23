import React from "react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getDogs } from "../actions";
import DogCards from "./DogCards.jsx";
import Navbar from "./Navbar.jsx"
import Paginate  from "./Paginate.jsx";
import "./Home.css"

export default function Home(){
    const dispatch = useDispatch();
    const allDogs = useSelector((state)=> state.dogs);
    const [currentPage, setCurrentPage] = useState(1);
    const [dogsPerPage, setDogsPerPage] = useState(8)
    const indexOfLastDog = currentPage * dogsPerPage;
    const indexOfFirstDog = indexOfLastDog - dogsPerPage
    const currentDogs = allDogs.slice(indexOfFirstDog, indexOfLastDog)
    const paginate = (pageNumber) => {
        setCurrentPage(pageNumber)
    }

    useEffect(()=>{
        dispatch(getDogs());

    },[dispatch])

    useEffect(()=>{

    },[allDogs])
 
    return (
        <div>
            <Link className="linkCreate" to="/dogsCreate">Create Dog</Link>
            <Navbar setCurrentPage={setCurrentPage}/>
            <Paginate dogsPerPage={dogsPerPage} allDogs={allDogs.length} paginate={paginate} currentPage={currentPage}/>
            <DogCards dogs={currentDogs}/>
        </div>
    )

}