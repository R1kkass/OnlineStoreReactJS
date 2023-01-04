import React, {useState} from "react"
import cl from "./Slider.module.css"

const SliderHome = ({img, children}) =>{
    const [moveSlider, setMoveSlider] = useState(0) 


    return( 
    <>
        <div>
        {img?.map((img, index) => (
                 
                 <img key={index} onMouseMove={()=>{
                    if(moveSlider!=index*-400){
                    setMoveSlider(index*-400)
                    }
                 }} className={cl.imgBlock} src={"http://localhost:5001/"+img.nameImg} alt="" />
                
                 
        ))}
        </div>
        <div className={cl.conteinerHome }>
            <div className={cl.slider +' ' + cl.SliderHome} style={{marginLeft: moveSlider+'px', transition: '0.3s all ease'}}>

{children}
            </div>
            <button className={cl.btn} onClick={()=>{
            if(0<=moveSlider){
            setMoveSlider((img.length-1)*400*-1)
            }else{
            setMoveSlider(moveSlider+400)
            }
        }
        }>Лево</button>
        <button className={cl.btnRHome} onClick={()=>{
             if((img.length-1)*400*-1>=moveSlider){
                setMoveSlider(0)
            }else{
                setMoveSlider(moveSlider-400)
            }
        }}>Право</button>
        </div>



    </>)
}

export default SliderHome