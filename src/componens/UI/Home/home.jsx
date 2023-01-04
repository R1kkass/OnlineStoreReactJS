import React, { useState } from "react";
import cl from  "./home.module.css"
import Order from "../../Order/Order";
import MyFind2 from "../../MyFind/MyFind2";
import Landing from "../../Landing/Landing";
import { useEffect } from "react";
import {Api} from '../../../API/PostService'


const Home = () => {
    document.title="Главная"
    const [page, setPage] = useState(1)
    const [post, setPost] = useState([])
    
      const api = new Api('')

      const a = async ()=>{
        setPost(await api.fetchPosts());
      }

      useEffect(()=>{
        a()
      },[])

    return(
        <div className={cl.home}>
          <Landing></Landing>
            <div>
            <div>
            <MyFind2 />
            </div> 
                <h1 className="text-center">
                Каталог
                </h1>
            </div>
            <div className="bg-white">
  <div className="mx-auto max-w-2xl py-16 px-4 lg:max-w-7xl lg:px-8">
    <h2 className="sr-only">Products</h2>
    <div className="grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
      {
        post?.map((post)=>(
          <Order src={'http://localhost:5001/'+post.img} key={post.id} id={post.id} price={post.price}>{post.name}</Order>
        ))
      }
      </div>
  </div>
</div>
</div>
    )
}

export default Home