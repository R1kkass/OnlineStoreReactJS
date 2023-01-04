import React from "react";
import { useState } from "react";
import axios from 'axios'
import cl from "../../../http/User.module.css"
import cl2 from './Login.module.css'
import { useEffect } from "react";
import jwt_decode from "jwt-decode";
import {Link} from "react-router-dom"
import MyInput from '../Input/MyInput'

const Login = () => {
    const [error, setError] = useState('')
    const [login, setLogin] = useState('')
    const [lg, setLg] = useState('')
    const [password, setPassword] = useState('')
    const [krut, setKrut] = useState({page: '', inf: 'a'})
    document.title="Авторизация"

    
    async function auth() {
        const response = await axios.post('http://localhost:5001/api/user/login',{
            email:login, 
            password: password
        })
        .then(function (response, config) {
            setError('')
            localStorage.setItem('token', response.data.token)
            console.log('fd')
            document.location.href = '/'
            return jwt_decode(response.data.token)
            
          })
          .catch(function () {
            setError('Неверный логин или пароль')
        })  
    } 

   

    async function check() {
    
        const response = await axios.get('http://localhost:5001/api/user/auth',{
                headers: {
                  'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
        }
        )
        .then(function () {
            setError(true)
            
          })
          .catch(function () {
            setError(false)
        })  
    } 



    // console.log(jwt_decode(localStorage.getItem('token')))
    useEffect(()=>{
        check()
        console.log(localStorage.getItem('token'))
      }, [lg])
    if (!(localStorage.getItem('token'))){
    return(
        <div className={cl.user}>
            <div className={cl2.windowsLogin}>
                <div className={cl2.window}>
                    <h1>Вход</h1>
                    <input placeholder="Логин" className={cl2.inp} onChange={(e)=>{
                        setLogin(e.target.value)
                    }}></input>
                    <br></br>
                    <input placeholder="Пароль" type='password' className={cl2.inp} onChange={(e)=>{
                        setPassword(e.target.value)
                    }}></input>
                    <br></br>
                    <button onClick={()=>{
                    auth()
                    }} className={cl2.btn}>Авторизоваться</button>
                    <div>{error}</div>
                    <Link className={cl.Link} to="/registration">Регистрация</Link>
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