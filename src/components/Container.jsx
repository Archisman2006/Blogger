import React from 'react'
import { Link,NavLink } from 'react-router-dom'
export function Container({children,className=''}){
    console.log("in container");
    
    return (
        <div className={`pb-5 ${className}`}>
        {children}
        </div>
    )
}