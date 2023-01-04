import React, {useState, useRef} from "react";
import axios from "axios"
import MyModal from "../componens/UI/MyModal/MyModal";
import MyButton from "../componens/MyButton/MyButton";
import { useEffect } from "react";
import { Api } from "../API/PostService";
import cl from './User.module.css'


const Adm = () => {

    const [modal, setModal] = useState('')
    const [nameModal, setNameModal] = useState('')
    const [brandId, setBrandId] = useState('')
    const [typeId, setTypeId] = useState('')
    const [price, setPrice] = useState('')
    const [name, setName] = useState('')
    const [info, setInfo] = useState('')
    const nameInf = useRef('')
    const nameTitle = useRef('')
    const [img, setImg] = useState(null)
    const [arrInf, setArrInf] = useState([])
    let formData = new FormData();

    
    console.log('render');
async function addDevice() {
    
    formData.append('typeId', typeId)
    formData.append('brandId', 9)
    formData.append('price', Number(price))
    formData.append('name', name)
    let y =0
    for(let i= 0; i<img.length; i++) {
        formData.append('img', img[i])
        y = formData.getAll('img')
        console.log(y)
    }  
    formData.append('info', JSON.stringify(arrInf))
    // for (const value of formData.values()) {
    //     console.log(value);
    // }
    const response = await axios
    ({
        method: 'post',
        url: 'http://localhost:5001/api/devices',
        data: formData,
        headers: {
            'Authorization': 'Bearer ' + localStorage.getItem('token'),
            'Content-Type': `multipart/form-data;`,
        },
    })
    .then(function () {
        console.log(response)
        
        formData.delete('info')
        formData.delete('name')
        formData.delete('typeId')
        formData.delete('brandId')
        formData.delete('price')
        formData.delete('img')

      })
      .catch(function (e) {
        console.log(e)
        formData.delete('img')
        formData.delete('info')
        formData.delete('name')
        formData.delete('typeId')
        formData.delete('brandId')
        formData.delete('price')
    })  
} 
const api = new Api()
const [arr,setArr]=useState('')
let [arrType, setType]=useState('')

const a =async ()=>{
    setType(await api.fetchType())
    console.log(arrType);
}

useEffect(()=>{
    a()
},[])

    return(
        <>

            <div>
            <br />
            <label>Тип товара</label>
            <br></br>
            <select label="Тип товара" className={cl.select} onChange={(e)=> setTypeId(e.target.value)}>
                            {arrType.data?.map((type)=>(
                                <option value={type.id}>{type.id} {type.name}</option>
                            ))}
            </select>
            <br />
            
            <input placeholder="Цена" onChange = {(e)=>{
                setPrice(e.target.value)
                
            }} type="text" />
            <br />
            <input placeholder="Название товара" onChange = {(e)=>{
                setName(e.target.value)

            }} type="text" />
            
            <br />
            <input style={{width: '45%'}} ref={nameTitle} placeholder="title" type="text" onChange={()=>{
            }} />
            <input style={{width: '45%'}} ref={nameInf} placeholder="инфа" type="text" onChange={()=>{
            }} />
            <div>{arr}</div>
            <MyButton style={{marginTop:'20px'}} onClick={()=>{
                arrInf.push({title: nameTitle.current.value, description: nameInf.current.value})
                
                setArr(<>
                    {arrInf.map((arrInf)=>(
                        <div>
                            {arrInf.title} {arrInf.description}
                        </div>
                    ))
                    
                    }
                </>)
                console.log(arr);
                nameTitle.current.value=''
                nameInf.current.value=''
                
            }}>add</MyButton>
            <br />
            <input multiple onChange = {(e)=>{
                setImg(e.target.files)
            }} type="file" accept=".jpg, .jpeg, .png, .jfif"></input>
            <br/>
            <MyButton style={{marginTop:'20px', width: '150px'}} onClick={addDevice}>Добавить товар</MyButton>
            </div>
        </>
    )
}

export default Adm