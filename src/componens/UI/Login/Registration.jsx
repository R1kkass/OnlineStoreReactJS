import React from "react";
import { useState } from "react";
import axios from 'axios'
import cl from "../../../http/User.module.css"
import cl2 from './Login.module.css'
import jwt_decode from "jwt-decode";
import {Link} from "react-router-dom"

const Login = () => {
    const [error, setError] = useState('')
    const [login, setLogin] = useState('')
    const [password, setPassword] = useState('')
    const [role, setRole] = useState('USER')

    document.title="Регистрация"
    function validateEmail(login) {
        var re = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
        return re.test(String(login).toLowerCase());
      }

    async function registration() {
        console.log(validateEmail(login));
        if(password.length>=8 && login.length>=8 && validateEmail(login)){
            const response = await axios.post('http://localhost:5001/api/user/registration',{
                email:login, 
                password: password,
                role: role
            })
            .then(function (response, config) {
                setError('')
                console.log('fd')
                document.location.href = '/login'
                return jwt_decode(response.data.token)
                
              })
              .catch(function () {
                setError('Неверный E-Mail или пароль')
            })  
        }else{
            setError('Неверный E-Mail или пароль')
        }

    } 
    
    // console.log(jwt_decode(localStorage.getItem('token')))
    
    if (localStorage.getItem('token')==null){
    return(
        <div className={cl.user}>
            <div className={cl2.windowsLogin}>
                <div className={cl2.window}>
                    <h1>Регистрация</h1>
                    <input type="email" placeholder="E-Mail" className={cl2.inp} onChange={(e)=>{
                        setLogin(e.target.value)
                    }}></input>
                    <br></br>
                    <input placeholder="Пароль" className={cl2.inp} onChange={(e)=>{
                        setPassword(e.target.value)
                    }}></input>
                    <br></br>
                    <button onClick={registration} className={cl2.btn}>Зарегестрироваться</button>
                    <div>{error}</div>
                </div>
            </div>
        </div>
    )
}
else{
    return(
        <div className={cl.user}>
        <div className={cl.windowsLogin}>
            <div className={cl.window}>
                <br></br>
                <h1>Вы аторизованы</h1>
                <h1><Link className={cl.Link} to="/">Вернуться на главную</Link></h1>
            </div>
        </div>
    </div>
    )
}
}

export default Login