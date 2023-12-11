"use client"

import { useState,useEffect } from 'react'
import { useSession,signOut } from 'next-auth/react'
import { useRouter,usePathname } from 'next/navigation'
import { IoExit } from "react-icons/io5"
import Link from 'next/link'
import Image from 'next/image'

import './styles/navbar.css'

export default function NavBar() {
    const [showProfileOptions,setProfileOptions] = useState(false)
    const [showNavbar,setNavbar] = useState(false)

    const { data:session,status } = useSession();
    const router = useRouter()
    const currentPath = usePathname();
    
    const hiddenProfileOptions = ()=> {
        const body = document.querySelector("body");
        body.addEventListener("click",()=> {
            setProfileOptions(setProfileOptions)
        })
    }

    const hiddeNavbar = ()=> {
        if (currentPath == '/register' || currentPath == '/login') setNavbar(true)
        else setNavbar(false)
    }

    useEffect(()=> {
        hiddeNavbar()
    },[currentPath])

    return (
        <nav className={`w-screen fixed bg-transparent z-30 ${showNavbar ? 'hidden' : ''}`} >
            <div className="nav-styles flex p-2 mx-10 rounded-b-[15px] shadow-lg">
                <h2 className='nav-brand m-auto ml-1 mr-[120px]'>Majestic Food</h2>
                <ul className='flex'>
                    <li className='m-auto'>
                        <Link href='/' className='nav-item mr-5'>
                            <span></span>
                            <span>Inicio</span>
                        </Link>
                    </li>
                    <li className='m-auto'>
                        <Link href='/tienda' className='nav-item mr-5'>
                            <span></span>
                            <span>Tienda</span>
                        </Link>
                    </li>
                </ul>
                <div className='ml-auto flex w-[100px] relative'>
                    <div className="img-profile w-[55px] h-[55px] absolute rounded-full shadow-lg object-cover 
                    hover:cursor-pointer" 
                    onClick={()=> {
                        hiddenProfileOptions()
                        setProfileOptions(!showProfileOptions)
                    }}>
                        <Image src={`/assets/images/${session?.user.profileImage}`} className="rounded-full object-cover" 
                        layout="fill" alt="profile"/>
                        <div className={`profile-options flex absolute top-[120%] flex-col ${!showProfileOptions ? 'hidden' : ''}`}>
                            <button className="mt-4"
                            onClick={()=> {
                                router.push(`/profile/${session?.user.id}`)
                            }}>Perfil</button>
                            <button className="mt-4" onClick={() => {
                                router.push('/user-pedidos')
                                setProfileOptions(!showProfileOptions)
                            }}>Pedidos</button>
                        </div>
                    </div>
                    <button className='ml-auto' onClick={()=> {
                        router.push("/login")
                        signOut({
                            redirect: false,
                        })
                    }}>
                        <span className="icon-setting text-3xl"><IoExit /></span>
                    </button>
                </div>
            </div>
        </nav>
    )
}
