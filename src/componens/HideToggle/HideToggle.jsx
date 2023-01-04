import React from 'react';
import { useState } from 'react';
import cl from './HideToggle.module.css';
import MyButton from '../MyButton/MyButton';

const HideToggle = ({children}) =>{
const rootClasses = [cl.myVision]

const [visible, setVisible] = useState(false)

if(visible){
rootClasses.push(cl.active)
}

const Status = () =>{
if (visible){
setVisible(false)
rootClasses.push(cl.active)
}else{
setVisible(true)

}
}

return (
<div >
<MyButton onClick={Status}>Нажми</MyButton>
<div className={rootClasses.join(' ')}>
{children}
</div>
</div>
)
}

export default HideToggle