import axios from "axios";
import React, { useEffect, useMemo,useState, useRef, memo } from "react";
import { useParams } from "react-router";
import cl from "./device.module.css"
import MyModal from "../MyModal/MyModal"
import MyInput from "../Input/MyInput";
import Slider from "../../slider/Slider";
import MyButton from "../../MyButton/MyButton";
import jwt_decode from 'jwt-decode'
import MyRating from "../../MyRating/MyRating";
import {useDispatch, useSelector} from "react-redux"
import MyStars from "../../MyRating/MyStars";
import { Api } from "../../../API/PostService";
import Alert from "../../Alert/Alert";


const MyStar = memo(MyStars)

const DeviceInfo = () =>{
    

    const [modal, setModal] = useState('')
    const [nameModal, setNameModal] = useState('')
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [address, setAddress] = useState('')
    const [phone, setPhone] = useState('')
    const [count, setCount] = useState('')
    const [deviceInfo, setDeviceInfo] = useState([])
    const [img, setImg] = useState([])
    const [tog, setTog] = useState([])
    const [counts, setCounts] = useState([])


    const params = useParams()
    const [device, setDevice] = useState({
        id: 1, name: 'xiaomi', price: 5000, rating: 0, img: '6f966c74-b530-44bc-afc1-90fc5c277efd.jpg'
    })

    const api = new Api()

    document.title=device.name
    const [contents, setContents] = useState([])

    const textFeedback = useRef()
    const [rait, setRait] = useState(0)
    const raits= useSelector(state=> state.cash.cash)
    let contents2=[]
    const fetchFeedback = async (page) =>{
        const response = await axios.post('http://localhost:5001/api/feedback/fetch', {
            deviceId: device.id,
            page: page,
            limit: 10
        })
        .then(function (response) {
            console.log(page);
            setTypeD('block')
            contents2=[]
            for (let i = 0; i < response.data.count/10; i++) {
                contents2.push(<div className={cl.pagination} onClick = {(
                    
                )=>{
                    fetchFeedback(i+1)
                }}>{i+1}</div>);
            }
            setContents(contents2)
            setTog(<>
            <div>
            <p style={{fontSize: '24px', fontWeight: '500', margin: '0 auto', borderBottom: 'solid 2px black', width: '200px', textAlign: 'center' }}>????????????</p>
                {response.data?.rows?.map((feedBack, index)=>(
                    <div className={cl.feedback}>
                        <p>
                            {feedBack.login}
                            <MyStar rait={feedBack.rating}></MyStar>
                        </p>
                        <div>
                        <p>
                            {feedBack.text}
                        </p>
                        {localStorage.getItem('token') && jwt_decode(localStorage.getItem('token')).role==="ADMIN"? <MyButton onClick={async ()=>{
                            await api.deleteFeedback(feedBack.id)
                            fetchFeedback(1)
                        }} color={'red'}>?????????????? ??????????</MyButton> : ""}
                    </div>

                    </div>           
        ))}
            </div>
            
            </>
        )})
          .catch(function (e) {
            console.log(e)
        })  
    }



    const toggle = (val)=>{
        if(val=="feedback"){
        fetchFeedback(1)
        
        }else{
            setTypeD('none')
            setTog(<>

            <p style={{fontSize: '24px', fontWeight: '500', margin: '0 auto', borderBottom: 'solid 2px black', width: '200px', textAlign: 'center' }}>????????????????????????????</p>
            {deviceInfo?.map((img, index) => (
                <div key={index} className={cl.table}>
                    <p className={cl.inf__p}>{img.title}</p>
                    <p >{img.description}</p>
                </div>
        ))}
        </>)
        setContents('')
        }
    }

    useEffect(()=>{
        selectDevice()
        
      }, [params.id]
    
    )
    
      async function selectDevice(){
        const response = await axios.get('http://localhost:5001/api/devices/'+ params.id)
        .then(response=>{
        setImg(response.data.img );
        setDevice(response.data.device)
        setDeviceInfo(response.data.deviceInfo)
        setTog(<><p style={{fontSize: '24px', fontWeight: '500', margin: '0 auto', borderBottom: 'solid 2px black', width: '200px', textAlign: 'center' }}>????????????????????????????</p>{response.data.deviceInfo?.map((img, index) => (
            <div key={index} className={cl.table}>
                
                <p className={cl.inf__p}>{img.title}</p>
                <p >{img.description}</p>
            </div>
    ))}</>)
        }
        ).catch(err=>{
            console.log(err)
        }
        )
    }

    const addBuy = async () => {
        const response = await axios.post('http://localhost:5001/api/buy', {
            name: device.name,
            firstName: firstName,
            lastName: lastName,
            count: count,
            address: address,
            phone: phone,
            price: device.price,
            login: jwt_decode(localStorage.getItem('token')).email || 'net'
        })
        .then(function () {
            
          })
          .catch(function () {
            
        })  
    }

    const addBasket = async () =>{
        const response = await axios.post('http://localhost:5001/api/basket', {
            login: jwt_decode(localStorage.getItem('token')).email,
            count: 1,
            deviceName: device.name,
            price: device.price, 
            img: device.img,
            deviceId: device.id
        })
        setSt(true)
        setTimeout(()=>{
            setSt(false)
        },4000)
    }

        
    
    
    const [typeD, setTypeD] = useState('none')

    const addFeedback = async ()=>{
        console.log(rait)
        const response = await axios.post('http://localhost:5001/api/feedback', {
            login: jwt_decode(localStorage.getItem('token')).email,
            text: textFeedback.current.value,
            rating: raits || 5,
            deviceId: device.id
        })
        fetchFeedback(1)
    }

    const [st, setSt] = useState(false)

    return(
        <div >
            <Alert state={st}></Alert>
        <div style={{paddingTop: '80px'}}>
            <div className={cl.deviceInfo}>
        <Slider img={img}></Slider>

            <div style={{marginLeft:'20px'}}>
            <div>{device.name}</div>
            <br></br>
            <div>????????: {device.price}</div>
            <br/>
            <div style={{display: 'flex'}}>
            <MyModal  click={()=>{setModal(true)
setNameModal('Modal2')}}
nameButton={"????????????"} inf={nameModal} 
visible={modal} setVisible={setModal} nameModal={'Modal2'} >
            <div className={cl.modal}>
                <div  className={cl.modal}>
                    <p>???????????????????? ????????????</p>
            <MyInput placeholder={"??????"} onChange = {(e)=>{
                setFirstName(e.target.value)
            }} />
            <br></br>
            <MyInput placeholder={"??????????????"} onChange = {(e)=>{
                setLastName(e.target.value)
            }} />
            <br></br>
            <MyInput placeholder={"??????????"} onChange = {(e)=>{
                setAddress(e.target.value)
            }} />
           <br></br>
            <MyInput placeholder={"??????????????"} onChange = {(e)=>{
                setPhone(e.target.value)
            }} />
            <br></br>
            <MyInput type={"number"} placeholder={"????????????????????"} onChange = {(e)=>{
                setCount(e.target.value)
            }} />
            <br></br>
            <MyButton  onClick={addBuy}>????????</MyButton>
            </div>
            </div>
    </MyModal>
    {localStorage.getItem('token') ?
    <MyButton onClick={addBasket}>?? ??????????????</MyButton>
    : ''
    }
    </div>
            </div>
            </div>
            
        </div>
            <div className={cl.main}>
                <div className={cl.btns}>
                    <div>
                        <button onClick={()=>toggle('info')}>????????????????????????????</button>
                        <button onClick={()=>toggle('feedback')}>????????????</button>
                    </div>
                </div>
                <div className={cl.inf}>
                    <div className={cl.inf__div}>
                        {localStorage.getItem('token') ?
                        <MyModal click={()=>{setModal(true)
        setNameModal('Modal3')}}
        nameButton={"???????????????? ??????????"} style={{display: typeD}} inf={nameModal} 
        visible={modal} setVisible={setModal} nameModal={'Modal3'}>
                        
                                <p style={{fontSize: '24px', fontWeight: '500', margin: '0 auto', borderBottom: 'solid 2px black', width: '200px', textAlign: 'center' }}>???????????????? ??????????</p>
                                <textarea size='25' rows="3" column='20' ref={textFeedback} type="text"/>
                                
                    
                        <MyRating />
                        <MyButton  onClick={()=>addFeedback()}>???????????????? ??????????</MyButton>
                        </MyModal>
                        : 
                        ''
}
                        {tog}
                        <div style={{display:'flex', width:'80%', margin:'0 auto', flexWrap:'wrap'}}>
                        {contents}
                        </div>
                    </div>
                </div>
            </div>
            
        </div>
    )
}

export default DeviceInfo