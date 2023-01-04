import axios from "axios";
import React from "react";
import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import cl from "./header.module.css";


const Header = ({children}) =>{

const [auth, setAuth] = useState('')
const location = useLocation('')
const localhost = new URLSearchParams(location.search).get('location')
const [btn, setBtn] = useState('')
const exit = () =>{
localStorage.clear()
}

let div;
let [local, setLocal] = useState(localStorage.getItem('token'))

const check = async ()=>{

const response = await axios.post('http://localhost:5001/api/user/authcheck', {
email: 'kto'
}, {headers: {
Authorization: `Bearer ${localStorage.getItem('token')}`
}}
)
.catch(()=>{
    setAuth(<div><Link to="/login">Войти</Link></div>)
})
if(response.data.message=='ura'){
setAuth( 
    <>
    <div><Link to='/cabinet'>Кабинет</Link></div>
    <div><Link to='/basket'>Корзина</Link></div>
    <div className={cl.exit}>
    <img src="https://cdn-icons-png.flaticon.com/512/876/876779.png" onClick={()=>{
    exit()
    check()
    }} style={{height: '30px', marginTop: '-10px', marginRight: '20px'}}/>
    </div>
    </>)
}else{
setAuth(<div><Link to="/login">Войти</Link></div>)
localStorage.removeItem('token')
}

}

useEffect(()=>{
check()
}, [location])


return(
<>

<div className={cl.content}>
<div style={{display: 'flex'}} className={cl.header}>


<div>
<Link to="/">Главная</Link>
</div>
<div>

<Link to="/device">Каталог</Link>
</div>


{auth}
{btn}
</div>

{children}
</div>
<div className={cl.footer}>О нас</div>
</>
)
}

export default Header