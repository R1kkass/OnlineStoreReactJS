import React from "react";
import cl from '../UI/Home/home.module.css'
import { Link } from "react-router-dom";
import MyButton from "../MyButton/MyButton";

const Landing = ()=>{
    return(            
        <div className={cl.main_home}>
        <div className={cl.main_home__first}>
        <h1 className="text-4xl m-auto font-bold tracking-tight text-gray-900 sm:text-5xl md:text-6xl">
            <span className="block xl:inline">Интернет-магазин по продаже</span>{' '}
            <span className="block xl:inline" style={{color: 'rgb(4,244,4'}}>Мёда</span>
            <br></br>
            <Link to='device'>
            <MyButton style={{width: 140, height: 50, fontSize: '1.3rem', fontWeight: 500}}>
              В каталог
            </MyButton>
            </Link>

          </h1>
          
                     
        
    <div>
    
    </div>
              
        </div>
              
        <div><img></img></div>      
        </div>
        )
}

export default Landing