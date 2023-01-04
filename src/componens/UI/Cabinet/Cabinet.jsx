import React, { useState, useRef } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import cl from './Cabinet.module.css';
import axios from "axios";
import MyModal from "../MyModal/MyModal";
import jwt_decode from "jwt-decode";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import MyButton from '../../MyButton/MyButton'
import Adm from "../../../http/Adm";
import MySelect from "../../MySelect/MySelect";
import { Api } from "../../../API/PostService";


const Cabinet = () =>{
    document.title="Кабинет"
    const api = new Api()
    const dispatch = useDispatch()
    const user = useSelector(state=> state.user.user)
    const [content, setContent] = useState( '' )
    const [contentArray, setContentArray] = useState([])
    const fetchUserOne = async ()=>{
        const response = await axios.get('http://localhost:5001/api/user/getone?email='+jwt_decode(localStorage.getItem('token')).email)
        
        
           dispatch({type:'FIND_USER', payload: response.data.user})
        
    }

    let state = 'В обработке'
    const deletes = useRef('')
    let r = []

    const fetchOrder = async ()=>{
        const response = await axios.get('http://localhost:5001/api/buy/orderget?login='+jwt_decode(localStorage.getItem('token')).email,
        {headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
            }})
        r = (response.data.order);
        console.log(r);
        setContent(
            <>
                {
                    r?.map((post, index)=>(
                        <div key={index} className={cl.infOrder}>Номер заказа: {post.id}
                            <br/>
                            
                            {r[index].buyProducts.map((post)=>(
                                <>
                                <div className={cl.infOrder__count}>
                                    <p>Товар: {post.name}</p>
                                    <p>Цена: {post.price}₽</p>
                                    <p>Количество: {post.count}</p>
                                    <p>Сумма: {post.priceSumm}₽</p>
                                </div>
                                
                                </>
                            ))
                            }
                            
                            
                        </div>
                    ))
                }
            </>)
        
    }
    const deleteOrder= async (id)=>{
        
    const response = await axios.post('http://localhost:5001/api/buy/deleteorder', {
        id:id
        }, {headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
        }}
        )
console.log('f')
    fetchOrderAdm()
}

    const fetchOrderAdm = async ()=>{
        const response = await axios.post('http://localhost:5001/api/buy/ordergetadm', {
            email: 'kto'
            }, {headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
            }}
            )
            r=(response.data.order);
            r.sort((a, b)=>{
                return b.id-a.id
            })
            console.log(response.data.order);
            setContent(
                <>
                    {
                r?.map((post, index)=>(
                    <div key={index} className={cl.infOrder}>
                        <p>Номер заказа: {post.id}</p>
                        <p>Логин заказчика: {post.login}</p>
                        <p>Заказчик: {r[index].buyProducts[0]?.firstName}  {r[index].buyProducts[0]?.lastName}</p>
                        <p>Номер телефона: {r[index].buyProducts[0]?.phone}</p>
                        <p>Состояние: {post.state}</p>
                        <p>Адрес: {r[index]?.buyProducts[0]?.address}</p>
                        <br/>
                        
                        {r[index].buyProducts.map((post)=>(
                            <>
                            <div className={cl.infOrder__count}>
                                <p>Товар: {post.name}</p>
                                <p>Цена: {post.price}₽</p>
                                <p>Количество: {post.count}</p>
                                <p>Сумма: {post.priceSumm}₽</p>
                                
                            </div>
                            
                            </>
                        ))
                        }
                         <select onChange={(e)=>state=e.target.value}  name="select">
                        <option value="В обработке"  selected>В обработке</option>
                        <option value="В пути">В пути</option>
                        <option value="Заказ прибыл" >Заказ прибыл</option>
                        </select>
                        <br/>
                        <MyButton color={'blue'} onClick={async ()=>{await api.editOrder(post.id,state, localStorage.getItem('token'))
                    fetchOrderAdm();
                    }}>Сохранить</MyButton>
                        <MyButton style={{marginTop: 20}} color={'red'} onClick={()=>deleteOrder(post.id)}>Удалить</MyButton>
                    </div>
                ))
            }
                </>)
        }

    useEffect(()=>{
        fetchUserOne()
        fetchOrder()
    },[])
    let arrType=[]

    return (
        <div className={cl.mainCabinet}>
        <div className={cl.mainCabinet__menu}>
            
            <div className={cl.menu_conteinerButton}>
            <p className={cl.menu__name}>Логин: {user.email}</p>
                <Link className={cl.links} to='/basket'>
                <p className={cl.menu__button}>Корзина</p></Link>
                <p className={cl.menu__button} onClick={()=>{
                    fetchOrder()
                    }}>Ваши заказы</p>
                {(localStorage.getItem('token')) && jwt_decode(localStorage.getItem('token')).role=="ADMIN" ?<> <p className={cl.menu__button} onClick={()=>{
                    setContent(<Adm></Adm>
                        
                    )
                }}>Добавить товар</p> 
                <p className={cl.menu__button} onClick={()=>{
                    setContent(
                    <div>
                    <input placeholder="Номер товара" ref={deletes}></input>
                    <MyButton color={'red'} style={{width:150, marginTop: 20}} onClick={()=>api.deleteDevice(deletes.current.value)} >Удалить товар</MyButton>
                    </div>  
                    )
                }}>Удалить товар</p> 
                <p className={cl.menu__button} onClick={async ()=>{
                    arrType=await api.fetchType()
                    console.log(arrType);
                    setContent(
                    <div>
                        <select >
                            {arrType.data?.map((type)=>(
                                <option key={type.id} value={type.name}>{type.id} {type.name}</option>
                            ))}
                        </select>
                    <input placeholder="Название типа товара" ref={deletes}></input>
                    <MyButton color={'red'} style={{width:150, marginTop: 20}} onClick={async ()=>setContentArray(await api.deleteType(deletes.current.value))} >Удалить тип</MyButton>
                    <MyButton style={{width:150, marginTop: 20}} onClick={async ()=>setContentArray(await api.addType(deletes.current.value))} >Добавить тип</MyButton>
                    
                    </div>  
                    )
                }}>Добавить/удалить тип товара</p>
                </>
                : ''}
                {(localStorage.getItem('token')) && jwt_decode(localStorage.getItem('token')).role=="ADMIN" ? <p className={cl.menu__button} onClick={()=>{
                    fetchOrderAdm()
                   
                        }}>Все заказы</p> : ''}
                
            </div>
        </div>
        <div className={cl.mainCabinet__content}>
            <div className={cl.content__input}>
                {content}
            </div>
        </div>
        </div>
    )
}

export default Cabinet