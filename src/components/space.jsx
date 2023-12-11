"use client"

import { useState,useEffect } from 'react'
import { usePathname } from 'next/navigation'

export default function Space({height}) {
    const [showSpace,setSpace]  = useState(false)
    
    const currentPath = usePathname()

    const hiddenSpace = ()=> {
        if (currentPath == '/register' || currentPath == '/login') setSpace(true)
        else setSpace(false)
    }

    useEffect(()=> {
        hiddenSpace()
    },[currentPath])

    return (
        <div className={`space w-full h-[46px] ${showSpace ? 'hidden' : ''}`}></div>
    )
}