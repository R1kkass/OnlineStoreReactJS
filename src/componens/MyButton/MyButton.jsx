import React from 'react'
import cl from './MyButton.module.css'

const MyButton = ({children, onClick, color, style}) => {
    const styles=[cl.button]
    if(color==='red'){
        styles.push(cl.red)
    }else if(color==='blue'){
        styles.push(cl.blue)
    }

    return(
        <>
            <button onClick={onClick} style={style} className={styles.join(' ')}>{children}</button>
        </>
    )
}

export default MyButton