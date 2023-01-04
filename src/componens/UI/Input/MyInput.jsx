import React from "react";
import cl from "./MyInput.module.css"

const MyInput = ({placeholder, type, onChange, ref}) => {
    return(  
        <input type={type} placeholder={placeholder} ref={ref} onChange={onChange} className={cl.myInput}/>
    )

}

export default MyInput