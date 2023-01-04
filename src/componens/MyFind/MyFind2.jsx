import React, { useState } from "react";
import cl from './MyFind.module.css'
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { red } from '@mui/material/colors';
import SearchIcon from '@mui/icons-material/Search';
import { Button } from "@mui/material";
import { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

const MyFind2 = ({onclick})=>{
    const color=red[500]
    const dispatch = useDispatch()
    const cash = useSelector(state => state.find.find)
    const [find, setFind] = useState('')
    const find2 = useRef('')
    const addFind =async ()=>{
        dispatch({type:'ADD_FIND', payload: find})
        onclick(find)
    }
    return (
        <div>
            
        <TextField id="outlined-basic" ref={find2} onChange={(e)=>setFind(e.target.value)} sx={{border: '10px green', width: '500px', marginBottom:'20px', height: '60px'}} color='success' label="Поиск" variant="outlined" />
        <Link to='/device'>
        <Button onClick={()=>addFind()} variant="contained" color='success' sx={{background: 'rgb(4,244,4)', height: '55px'}} >
            <SearchIcon sx={{fontSize: '43px'}}/>
        </Button>
        </Link>
        </div>
    )
}

export default MyFind2