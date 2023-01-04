import React from "react";
import { Link } from "react-router-dom";

import cl from  "../UI/Home/home.module.css"

const Order = ({children, price, src, id}) =>{
    return(
    <div className={cl.orders}>
    <Link to={'/device/'+id} className="group shadow">
        <div className="aspect-w-1 aspect-h-1 w-full  overflow-hidden rounded-lg bg-gray-200 xl:aspect-w-7 xl:aspect-h-8">
          <img src={src} />
        </div>
        <h3 className="mt-4 text-sm text-gray-700">{children}</h3>
        <p className="mt-1 text-lg font-medium text-gray-900">{price}₽</p>
      </Link>
      </div>
    )
}

export default Order