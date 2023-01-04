import axios from 'axios'
import React from 'react'
import { useEffect } from 'react'
import { useState, useRef } from 'react'
import MyButton from '../../MyButton/MyButton'
import MyModal from '../MyModal/MyModal'
import cl from './Basket.module.css'
import jwt_decode from 'jwt-decode'
import {Link} from 'react-router-dom'
import MyInput from '../Input/MyInput'

const Basket = () =>{
    const [modal, setModal] = useState('')
    const [nameModal, setNameModal] = useState('')
    const [basket, setBasket] = useState([])
    const [counter, setCounter] = useState('')
    const summ = basket?.reduce((previousValue, currentValue)=>{
        return previousValue + Number(currentValue.priceSumm)
    },0)

    const count = basket?.reduce((previousValue, currentValue)=>{
        return previousValue + Number(currentValue.count)
    },0)

    useEffect(()=>{
        responseBasket()

    },[counter])
    
console.log(jwt_decode(localStorage.getItem('token')).email);
    const responseBasket = async ()=>{
        const response = await axios.post('http://localhost:5001/api/basket/find',{
            login: jwt_decode(localStorage.getItem('token')).email || 'null'
        })
        .then(response=>{
            console.log(response.data);
            response.data.sort((a,b)=>{
                return a.id-b.id
            })
            setBasket(response.data)
        })
        .catch(e=>{
            console.log(e);
        })
    }

    const deleteBasket = async (id)=>{
        const response = await axios.post('http://localhost:5001/api/basket/delete',{
            login: jwt_decode(localStorage.getItem('token')).email,
            id: id
        })
        .then(response=>{
            responseBasket()
        })
        .catch(e=>{
            console.log(e);
        })
    }

    const plusCount = async (id, count, price)=>{
        console.log(count);
        const response = await axios.post('http://localhost:5001/api/basket/pluscount',{
            login: jwt_decode(localStorage.getItem('token')).email,
            id: id,
            count: count,
            price: price
        })
        .then(response=>{
            responseBasket()
        })
        .catch(e=>{
            console.log(e);
        })
    }

    const formData = new FormData()
    const address = useRef('')
    const firstName = useRef('')
    const lastName = useRef('')
    const phone =useRef('')
    const createAll = async ()=>{
        formData.append('info', JSON.stringify(basket))
        formData.append('firstName', firstName.current.value)
        formData.append('lastName', lastName.current.value)
        formData.append('address', address.current.value)
        formData.append('phone', phone.current.value)
        formData.append('login', jwt_decode(localStorage.getItem('token')).email)

        console.log(address.current.value);
        console.log(formData.getAll('info'))
        const response = await axios
    ({
        method: 'post',
        url: 'http://localhost:5001/api/buy/all',
        data: formData,
        headers: {
            'Content-Type': `multipart/form-data;`,
        },
    })
    .then(function () {
        console.log(response)
        formData.delete('info')
        formData.delete('firstName')
        formData.delete('lastName')
        formData.delete('address')
        formData.delete('phone')
        formData.delete('login')
        
      })
      .catch(function (e) {
        console.log(e)
        formData.delete('info')
        formData.delete('firstName')
        formData.delete('lastName')
        formData.delete('address')
        formData.delete('phone')
        formData.delete('login')
    })  
    responseBasket()
    }

    console.log(basket);
    document.title='Корзина'
    return(
    <div className={cl.basketMain}>
        <div className={cl.basketMain__device}>
            {basket?.map(basket=>
                <div className={cl.basketMain__devices}>
                    
                    <div>
                        
                    <img style={{width: '150px'}} src={"http://localhost:5001/"+basket.img}></img>
                    
                    </div>
                    
                    <div className={cl.basketMain__message}>
                    <p><Link to={"/device/"+basket.deviceId}>{basket.deviceName}</Link></p>
                    <p>Количество: 
                    <button 
                            className={cl.counter__button}
                             onClick={()=>{plusCount(basket.id,Number(basket.count)-1, basket.price)
                                responseBasket()
                            }}
                            >-</button> 
                            
                            <span className={cl.spn}>
                                {basket.count} 
                            </span>
                             <button className={cl.counter__button}
                            onClick={()=>{plusCount(basket.id,Number(basket.count)+1, basket.price)
                                responseBasket()
                            }}
                            >+</button>
                        <div className={cl.basketMain__counter}>
                           
                            
                        </div>
                    </p>
                    <p>Цена: {basket.priceSumm}</p>
                </div>
                
                <MyButton color={'red'} onClick={()=>deleteBasket(basket.id)}>Удалить</MyButton>
                
                </div>
                )}
        </div>
        
        <div className={cl.basketMain__inf}>
            <div className={cl.basketMain__inf_div}>
            <p>Сумма заказа: {summ}</p>
            <p>Количество: {count}</p>
            {count>0 ? 
            <MyModal click={()=>{
            setModal(true)
            setNameModal('Modal3')}}
            nameButton={"Купить"}
            inf={nameModal} 
            visible={modal}
            setVisible={setModal}
            nameModal={'Modal3'}>
                <div style={{display:"grid", margin:'0 auto', justifyContent:'center'}}>
                <input ref={firstName} placeholder={'Имя'} className={cl.inp}/>
                <br />
                <input ref={lastName} className={cl.inp} placeholder={'Фамилия'} />
                <br />
                <input ref={address} className={cl.inp} placeholder={'Адрес'} />
                <br />
                <input ref={phone} className={cl.inp} placeholder={'Номер телефона'} />
                <br/>
                 
                <MyButton style={{width:'100%'}} onClick={()=>createAll()}>Купить</MyButton>
                </div>
            </MyModal>
        : ''    
        }
                </div>
        </div>
    </div>
    )
}

export default Basket