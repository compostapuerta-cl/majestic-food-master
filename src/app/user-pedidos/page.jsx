"use client"

import { useEffect,useState } from 'react'
import { useRouter } from 'next/navigation'
import { useSession } from 'next-auth/react'

export default function UserOrders() {
    const { data:session,status } = useSession()
    const [res,setRes] = useState([])
    const router = useRouter()

    const getData = async () => {
        try {
            const response = await fetch('http://localhost:5000/pedidos').then(res => res.json())
            const orders = response.filter(item => item.idUser === session?.user.id)
            setRes(orders)
        } catch (err) {
            console.error(err)
        }
    }

    useEffect(()=> {
        getData()
    },[session])

    return (
        <div className="mt-14 m-28">
            <h1 className="text-3xl">Estos son tus pedidos</h1>
            <div className="my-14 grid gap-14 grid-cols-[repeat(auto-fill,minmax(250px,1fr))]">
                {
                    res.map(item => (
                        <div className="p-5 bg-white shadow-[0_0_12px_#9b9b9b] rounded-2xl">
                            <h2 className='text-lg'>{item.name}</h2>
                            <p className="text-sm text-green-500 mb-4">
                                {
                                    item.date.day + '/' + item.date.month + '/' + item.date.year + ' - ' + 
                                    item.date.hours + ':' + item.date.minutes
                                }
                            </p>
                            <p className="text-xs">{item.description}</p>
                            <button className="p-2 w-full mt-6 bg-green-500 rounded-md text-white hover:bg-green-600
                            transition duration-300" onClick={()=> {
                                router.push(`http://localhost:3000/pedidos/${item.id}`)
                            }}>Ir al pedido</button>
                        </div>
                    ))
                }
            </div>
        </div>
    )
}
