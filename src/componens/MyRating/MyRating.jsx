import React, { useState, useMemo } from "react";
import { useRef } from "react";
import cl from "./MyRating.module.css"
import {useDispatch, useSelector} from "react-redux"

const MyRating = () =>{
    const dispatch = useDispatch()
    const cash = useSelector(state => state.cash)

    const addRating =async (rait)=>{
        console.log(rait+" " + "rait");
        dispatch({type:'ADD_CASH', payload: rait})
        console.log(cash+' '+ 'redux');
    }
    return(
    <div className={cl.ratingArea}>
        <input onClick={()=>addRating(5)} type="radio" id="star-5" name="rating" value="5"/>
        <label for="star-5" title="Оценка «5»"></label>	
        <input type="radio" id="star-4" name="rating" onClick={()=>addRating(4)} value="4"/>
        <label for="star-4" title="Оценка «4»"></label>    
        <input type="radio" id="star-3" name="rating" onClick={()=>addRating(3)} value="3"/>
        <label for="star-3" title="Оценка «3»"></label>  
        <input type="radio" id="star-2" name="rating" onClick={()=>addRating(2)} value="2"/>
        <label for="star-2" title="Оценка «2»"></label>    
        <input type="radio" id="star-1" name="rating" onClick={()=>addRating(1)} value="1"/>
        <label for="star-1" title="Оценка «1»"></label>
    </div>
    )
}

export default MyRating;