import React, { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { postDog, getTemps } from "../actions"
import "./Form.css"

export default function Form() {
    const dispatch = useDispatch();
    const history = useHistory()
    const temps = useSelector((state)=>state.temps);
    const [ input, setInput ] = useState({
        race: "",
        weight_min: "",
        weight_max: "",
        height_min: "",
        height_max: "",
        origin: "",
        life_span_min: "",
        life_span_max: "",
        img: "",
        temps: "",
        allTemps: []
    });
    useEffect(()=>{
        dispatch(getTemps())

    }, [dispatch]);

    const handleChange = (e)=>{
        setInput({
            ...input,
            [e.target.name]: e.target.value
        })
    }

    const handleTemps = (e)=>{
    const defaultValue = "Select Temperaments";

    e.target.value !== defaultValue && !input.allTemps.includes(e.target.value)
    ?setInput({
         ...input,
        allTemps: [...input.allTemps, e.target.value]
    })
    : null
    e.target.value = defaultValue
    };
    
    useEffect(()=>{

    }, [input]);

const handleSubmit = (e)=>{
    e.preventDefault();
    input.temps = input.allTemps.join(", ")
    console.log(input);
    dispatch(postDog(input))
    setInput({
        race: "",
        weight_min: "",
        weight_max: "",
        height_min: "",
        height_max: "",
        origin: "",
        life_span_min: "",
        life_span_max: "",
        img: "",
        temps: "",
        allTemps: []
    })
    history.push("/home")
}
const handleDeleteTemps = (e)=>{
    e.preventDefault;
    setInput({
        ...input,
        allTemps: input.allTemps.filter((temp)=>{ return temp !== e.target.value})
    })
}
    return (
<div className="container">
        <h1 className="title">Create your dog!</h1>
        
        <Link className="Link" to="/home"><button className="buttonBack">Back</button></Link>

    <div className="divContainer">
       
        <form onSubmit={(e)=>handleSubmit(e)} >
         <div className="divForm">
            <div className="formContainer"><label>Name: </label><input onChange={(e)=>handleChange(e)} type="text" name="name" value={input.name} placeholder="Affenpinscher..."/></div>
            <div className="formContainer"><label>Weight min: </label><input onChange={(e)=>handleChange(e)} type="text" name="weight_min" value={input.weight_min} placeholder="3..." /></div>
            <div className="formContainer"><label>Weight max: </label><input onChange={(e)=>handleChange(e)} type="text" name="weight_max" value={input.weight_max} placeholder="6..." /></div>
            <div className="formContainer"><label>Height min: </label><input onChange={(e)=>handleChange(e)} type="text" name="height_min" value={input.height_min} placeholder="23..." /> </div>
            <div className="formContainer"><label>Height max: </label><input onChange={(e)=>handleChange(e)} type="text" name="height_max" value={input.height_max} placeholder="29..." /></div>
            <div className="formContainer"><label>Origin: </label><input onChange={(e)=>handleChange(e)} type="text" name="origin" value={input.origin} placeholder="Germany, France..." /></div>
            <div className="formContainer"><label>Life span min: </label><input onChange={(e)=>handleChange(e)} type="text" name="life_span_min" value={input.life_span_min} placeholder="10..." /></div>
            <div className="formContainer"><label>Life span max: </label><input onChange={(e)=>handleChange(e)} type="text" name="life_span_max" value={input.life_span_max} placeholder="14..." /> </div>
            <div className="formContainer"><label>Img: </label><input onChange={(e)=>handleChange(e)} type="text" name="img" value={input.img} placeholder="http://img.png..." /> </div>
         </div>
            <button className="buttonSubmit" type="submit" >Submit</button>
        </form>
       
        <select className="selectTemps" onChange={(e)=>handleTemps(e)}>
            <option value="Select Temperaments" key="selectTemps">Select Temperaments</option>
            {
                temps.map((t)=>(
                    <option value={t.name} key={t.id}>{t.name}</option>
                ))
            }
        </select>
        <div className="tempsSelected">
    {
       input.allTemps.map((temp)=><div className="divTemps"> <span className="spanTemps">{"♥"+temp}</span> <div className="buttonTempHover"><button  value={temp} onClick={(e)=>{handleDeleteTemps(e)}}>x</button></div> </div>)
    }
        </div>
    </div>
    </div>
    )
}