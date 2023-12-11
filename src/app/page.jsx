"use client";

// Importación de librerías y componentes
import { useState,useEffect,useContext } from 'react'
import { useFetch } from '@/components/hooks/useFetch'
import { useRouter } from 'next/navigation'
import { BsSearch } from "react-icons/bs"
import { useSession } from 'next-auth/react'
import { OrdersContext } from '@/context/OrdersContext'
import CardOrder from '@/components/card-order'
import FormPedidos from '@/components/form-pedidos'
import CardButton from '@/components/card-button'
import Popup from '@/components/popup'
import Testing from '@/components/testing';
import FetchTesting from '../components/fetch-testing'
import { FaWpforms } from "react-icons/fa6";

import './styles/main-page.css'

// Componente principal de la página de inicio
export default function Home() {
    // Estados para controlar la visibilidad de los popups
    const [showPopup, setShowPopup] = useState(false);
    const [showNewOrder,setShowNewOrder] = useState(false);
    const [showAllOrders,setAllOrders] = useState(false);

    // Estado para almacenar la lista de pedidos
    const [allOrders,setOrders] = useState([])

    // Hook para obtener los pedidos almacenados.
    const { data,isLoading,error } = useFetch("http://localhost:5000/pedidos")

    // Hook de Next.js para la navegación
    const router = useRouter()
    
    // Contexto para los platos (¿está definido en otro lugar?)
    const platos = useContext(OrdersContext)

    // Hook para obtener la sesión del usuario
    const { data:session,status } = useSession();

    // Función para mostrar u ocultar el popup
    const ifShowPopup = (validation) => {
        setShowPopup(validation);
    }

    // Función para obtener los pedidos del usuario
    const getOrders = ()=> {
        if(!error){
            const orders = data.filter(item => item.idUser === session?.user.id)
            setOrders(orders)
        } else {
            console.log("Hubo un error.")
        }
    }

    // Función para enviar un pedido
    const sendInOrder = (id)=> {
        const item = localStorage.getItem("Order")
        const data = JSON.parse(item)
        data.idOrder = id
        localStorage.setItem('Order',JSON.stringify(data))
        router.push(`pedidos/${id}`)
    }

    // Efecto para obtener los pedidos cuando se carga la sesión
    useEffect(()=> {
        getOrders()
    },[session && isLoading])

    return (
        <>
            {/* Sección de bienvenida */}
            <div className='m-28'>
                <h1 className='text-3xl'>¡Bienvenido de nuevo!</h1>
                <h2>Señor@ {session?.user.name} {session?.user.lastName}</h2>
            </div>

            {/* Barra de búsqueda */}
            <div className="input-container px-6 py-2 mx-60 flex items-center rounded-full ">
                <span className="search-icon"><BsSearch /></span>
                <input className="w-full ml-6 outline-none bg-transparent" placeholder="Buscar"></input>
            </div>

            {/* Sección de pedidos */}
            <section className="order-section m-28 grid gap-24">
                {/* Renderizar los pedidos */}
                {platos.map((item)=> (
                    <CardOrder
                        key={item.id}
                        id={item.id}
                        name={item.name}
                        image={item.image}
                        qualification={item.qualification}
                        validate={ifShowPopup}
                        price={item.price}
                        category={item.category}
                    />
                ))}
            </section>

            {/* Popup de opciones */}
            <Popup
            ifShow={showPopup}
            bgColor="[#22222298]"
            onClickButton={() => setShowPopup(false)}
            onClickBackground={() => setShowPopup(false)}>
                {/* Contenido del Popup */}
                <CardButton
                    onClick={() => {
                        setShowPopup(false)
                        setShowNewOrder(true)
                    }}
                    url="https://gerente.com/co/wp-content/uploads/sites/16/2018/10/COMIDAS-RÁPIDAS-Y-RESTAURANTES.jpg"
                    primaryText="Añadir a nuevo pedido"
                    secondaryText="Crea un pedido nuevo"
                />

                <CardButton 
                    onClick={()=> {
                        setShowPopup(false)
                        setAllOrders(true)
                    }}
                    url="https://cloudfront-us-east-1.images.arcpublishing.com/infobae/42Q6QIMLB5F3JPEXQWI6VV7PQ4.jpg"
                    primaryText="Añadir a un pedido tuyo"
                    secondaryText="Incluyelo en un pedido existent"
                />
            </Popup>

            {/* Popup de nuevo pedido */}
            <Popup
            ifShow={showNewOrder}
            bgColor="[#22222298]"
            onClickButton={() => setShowNewOrder(false)}
            onClickBackground={() => setShowNewOrder(false)}>
                {/* Contenido del Popup de Nuevo Pedido */}
                <div className="z-50 shadow-[0_0_20px_#a9a9a9] w-[650px] h-[500px] flex 
                flex-col justify-center items-center bg-[#f4ece6] font-mono rounded-md over">
                    <FormPedidos />
                    <div className='w-full h-[10%] bg-white self-baseline flex justify-center items-center'>
                        <FaWpforms size={30} />
                    </div>
                </div>
            </Popup>

            {/* Popup de todos los pedidos */}
            <Popup
            ifShow={showAllOrders}
            bgColor="[#22222298]"
            onClickButton={() => setAllOrders(false)}
            onClickBackground={()=> setAllOrders(false)}>
                {/* Contenido del Popup de Todos los Pedidos */}
                <div className="z-50 shadow-[0_0_20px_#a9a9a9] w-[650px] h-[500px] flex 
                flex-col justify-center items-center bg-[#f4ece6] rounded-md">
                    <div className='w-full h-[10%] flex justify-center items-center'>
                        <h1 className=''>PEDIDOS</h1>
                    </div>

                    <div className='w-full h-[90%] flex justify-center items-center'>
                        <ul>
                            {/* Renderizar la lista de pedidos */}
                            {isLoading ?
                            <h2>Loading...</h2> :
                            allOrders.map((item) => (
                                <li key={item.id}>
                                    <button className='bg-slate-50 p-3 rounded-2xl border-2 hover:border-green-400 
                                    w-[150px] mb-2' onClick={() => sendInOrder(item.id)}>
                                        {item.name}
                                    </button>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </Popup>
        </>
    );
}
