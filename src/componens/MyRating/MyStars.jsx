import React, { useState, useMemo } from "react";
import { useRef } from "react";
import cl from "./MyRating.module.css"
import {useDispatch, useSelector} from "react-redux"
console.log('render');
const MyStars = ({rait}) =>{
    let [stars, setStars] = useState();
    if(rait==0){
        stars=<div className={cl.ratingResult}>
        <span ></span>	
        <span ></span>    
        <span ></span>  
        <span></span>    
        <span></span>
        </div> 
    }else if(rait==2){
        stars=<div className={cl.ratingResult}>
    <span className={cl.active}></span>	
    <span className={cl.active}></span>    
    <span ></span>  
    <span></span>    
    <span></span>
    </div> 
    
    }
    else if(rait==3){
        stars=<div className={cl.ratingResult}>
            <span className={cl.active}></span>	
            <span className={cl.active}></span>    
            <span className={cl.active}></span>  
            <span ></span>    
            <span></span>
            </div> 
    
    }
    else if(rait==4){
        stars=<div className={cl.ratingResult}>
            <span className={cl.active}></span>	
            <span className={cl.active}></span>    
            <span className={cl.active}></span>  
            <span className={cl.active}></span>    
            <span></span>
            </div> 
    
    }
    else if(rait==5){
        stars=<div className={cl.ratingResult}>
            <span className={cl.active}></span>	
            <span className={cl.active}></span>    
            <span className={cl.active}></span>  
            <span className={cl.active}></span>    
            <span className={cl.active}></span>
            </div>  
    
    }
    return(
    <>
        {stars}
        
    </>
    )
}

export default MyStars;