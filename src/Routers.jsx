import Device from "./componens/UI/Device/device";
import Header from "./componens/UI/Header/Header";
import Home from "./componens/UI/Home/home";
import Login from "./http/Login"
import User from "./http/User"
import Adm from "./http/Adm";
import Registration from "./http/Registration"
import DeviceInfo from "./componens/UI/Device/deviceInfo";
import axios from "axios";
import React, { useMemo,useEffect, useState } from "react";
import {Routes, Route, useParams, Link, BrowserRouter} from "react-router-dom"
import Basket from "./componens/UI/Basket/Basket";

const Routers = () =>{
        
        
        <>
            <Route path="/" element={<Home />} />
            <Route path="device" element={<Device />} />
            <Route path="user" element={<User />} />
            <Route path="login" element={<Login />} />
            <Route path="device/:id" element={<DeviceInfo/>}/>
            <Route path="adm" element={<Adm/>}/>
            <Route path="registration" element={<Registration />} />
            <Route path="basket" element={<Basket />} />
            <Route path="basket" element={<Basket />} />
  
            </>
        
        

}
export default Routers        