import axios from "axios";
import React, { useMemo,useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import cl from "./device.module.css";
import { Link } from "react-router-dom"
import MyButton from "../../MyButton/MyButton";
import jwt_decode from "jwt-decode";
import MyFind from "../../MyFind/MyFind";
import { useDispatch, useSelector } from "react-redux";
import { Api } from "../../../API/PostService";

const Device = () => {
    document.title="Каталог"
    const [post, setPost] = useState([]);
    let location = useLocation()
    // const [brandId, setBrandId] = useState(new URLSearchParams(location.search).get("brandId"))
    const [brandId, setBrandId] = useState([])
    // const [typeId, setTypeId] = useState(new URLSearchParams(location.search).get("typeId"))
    const [typeId, setTypeId] = useState([])
    const [page, setPage] = useState(1)
    const [count, setCount] = useState('')
    let contents =[]
    let query3 = useSelector(state=>state.find.find)
    
const api = new Api()
const [arrType, setType] = useState([])

const a =async ()=>{
    setType(await api.fetchType())
    console.log(arrType);
}
    useEffect(()=>{
        a()
      fetchPosts()
    }, [brandId, typeId, page])
    
    for (let i = 0; i < count; i++) {
        contents.push(<div className={cl.pagination} onClick = {(
            
        )=>{
            setPage(i+1)
        }}>{i+1}</div>);
    }
    
    const dispatch = useDispatch()
    const query = useSelector(state=>state.find.find)
    const fetchPosts = async (query1)=> {
        for (let i = 0; i < count; i++) {
            
            contents.push(<div className={cl.pagination} onClick = {(
                
            )=>{
                setPage(i+1)
            }}>{i+1}</div>);
        }
        const query = query1 || query3 ||' '
        
        if (!brandId && !typeId){
            const response = await axios.get('http://localhost:5001/api/devices'+'?page='+page+'&query='+query)
            setCount(Math.ceil(response.data.count/9));
            setPost(response.data.rows);
            
        }if(brandId && typeId){

      const response = await axios.get('http://localhost:5001/api/devices?brandId='+brandId+'&typeId='+typeId+'&page='+page+'&query='+query)
      setPost(response.data.rows);
      setCount(Math.ceil(response.data.count/9));
        }if(!brandId && typeId){
            const response = await axios.get('http://localhost:5001/api/devices?&typeId='+typeId+'&page='+page+'&query='+query)
            setCount(Math.ceil(response.data.count/9));
            setPost(response.data.rows);
        }if(brandId && !typeId){
            const response = await axios.get('http://localhost:5001/api/devices?brandId='+brandId+'&page='+page)
            setPost(response.data.rows);
            setCount(Math.ceil(response.data.count/9));
              }
              dispatch({type:'ADD_FIND', payload: ''})
    }

    const addBasket = async (device) =>{
        const response = await axios.post('http://localhost:5001/api/basket', {
            login: jwt_decode(localStorage.getItem('token')).email,
            count: 1,
            deviceName: device.name,
            price: device.price, 
            img: device.img,
            deviceId: device.id
        })
    }


    return(
        
        <div className={cl.device}>
        <title>Каталог</title>
        <div className={cl.filter}>
            <h3>Тип продукта</h3>
            {
                arrType?.data?.map((type)=>(
                    <>
                    <input id={"detail-"+type.id} type="checkbox" value="" onClick={()=>{
                        if(typeId.indexOf(type.id)>-1){
                            typeId.splice(typeId.indexOf(type.id), typeId.indexOf(type.id)+1)
                            setTypeId([...typeId])
                        }else{
                            setTypeId([...typeId, type.id])
                        }
            }}/>
            <label for={"detail-"+type.id}>{type.name}</label>
            
            <br></br>
            </>
                ))
                
            }
           
        </div>
        
        <div className={cl.content}>
        <MyFind onclick={fetchPosts}></MyFind>
      {post.map(post => (
      <div key={post.id} className={cl.deviceAll}>
            
            <Link className={cl.Link} to={"/device/"+post.id}>
            <div style={{display:'flex'}}>
                <img src={'http://localhost:5001/'+post.img}/>
                <div style={{marginLeft:50}}>
                {post.name}
                <br></br>
                Цена: {post.price}
                </div>
            </div>
                    
            
            <div>{localStorage.getItem('token') ? 
                <MyButton onClick={(e)=>{addBasket(post)
                e.preventDefault()
                }}>В корзину</MyButton> : ''}
            </div>
            </Link>
        </div>
        ))}
        <div className={cl.pag}>
    {contents}
    </div>
      </div>
        </div>
    )
}

export default Device