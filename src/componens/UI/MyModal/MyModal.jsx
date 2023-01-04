import React from 'react';
import cl from './MyModal.module.css';

console.log('render');

const MyModal = ({style, children, visible, setVisible, nameModal, inf, click, nameButton}) => {

const rootClasses = [cl.myModal]
if(visible && nameModal==inf){
rootClasses.push(cl.active)
}

return (
<>
<button style={style} className={cl.button} onClick={click}>{nameButton}</button>
<div className={rootClasses.join(' ')} onClick={()=>setVisible(false)}>
<div className={cl.myModalContent} onClick={(e)=>e.stopPropagation()}>
{children}
</div>
</div>
</>
);
};

export default React.memo(MyModal);