"use client"

import { useSession,signOut } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'

export default function Profile() {
    const { data:session,status } = useSession()
    const router = useRouter()
    
    return(
        <div className="w-full h-[calc(100vh-46px)] flex flex-col justify-center items-center">
            <div className='w-[200px] h-[200px] m-4 relative'>
                <Image src={`/assets/images/${session?.user.profileImage}`} className="rounded-full object-cover" layout="fill" alt="profile" /> 
            </div>
            <h1 className='text-4xl'>{session?.user.name} {session?.user.lastName}</h1>
            <h2 className='text-xl'>{session?.user.email}</h2>
            <button className="bg-red-400 hover:bg-red-500 transition duration-300 p-1 px-14 m-5 text-white rounded-sm" 
            onClick={()=> {
                router.push('/login')
                signOut({
                    redirect: false,
                })
            }}>Salir</button>
        </div>
    )
}
