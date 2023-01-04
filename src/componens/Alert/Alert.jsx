import React from "react";
import cl from './Alert.module.css'

const Alert = ({state})=>{
    const a = [cl.alert]
    if(state){
        a.push(cl.alertNone)
    }
    return(    
    <div className={a.join(' ')}>
        Товар добавлен
    </div>
    )
}

export default Alert