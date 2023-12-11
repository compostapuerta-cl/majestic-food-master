"use client"

import { useState } from 'react'

export default function Testing() {
    const [array,setArray] = useState({
        name:"Deimer",
        lastName: "Roncancio"
    })
    
    const click = ()=> {
        setArray({
            ...array,
            lastName: "Roncancio Avila"
        })
        console.log(array)
    }
    
    return (
        <button onClick={click}>
            Click
        </button>
    )
}