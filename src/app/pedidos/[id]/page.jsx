"use client"

import { v4 as uuid } from 'uuid'
import { useState,useEffect,useRef } from 'react'
import { useFetchId } from '@/components/hooks/useFetchId'
import { useRouter } from 'next/navigation'
import { useSession } from 'next-auth/react'
import { useFetch } from '@/components/hooks/useFetch'
import { useDataForm } from '@/components/hooks/useDataForm'
import { useUpdateInfo } from '@/components/hooks/useUpdateInfo'
import { FaEdit } from "react-icons/fa";
import { AiOutlinePlus } from 'react-icons/ai'
import getStorage from '@/components/helpers/getLocalStorage'
import fetchPost from '@/components/helpers/fetchPostData'
import fetchDelete from '@/components/helpers/fetchDeleteData'
import fetchPut from '@/components/helpers/fetchPutData'
import DicamicInputText from '@/components/dinamic-input'
import DinamicTextArea from '@/components/dinamic-text-area'
import DinamicInputDate from '@/components/dinamic-input-date'
import PlatePresentation from '@/components/plate-presentation'
import EditButton from '@/components/edit-button'
import Button from '@/components/button'
import Plate from '@/components/plate'

export default function Pedidos({ params }) {
    const { data:session } = useSession()
    const router = useRouter()
    
    const [showInfo,setShowInfo] = useState(true);
    const [showPopupCategories,setPopupCategories] = useState(false)
    const [showName,setShowName] = useState(false)
    const [showDescription,setDescription] = useState(false)
    const [showDate,setDate] = useState(false);
    const [allPlates,setAllPlates] = useState([])
    const [cantProducts,setCantProducts] = useState()
    const [price,setPrice] = useState()
    const { dataId,isLoadingId,errorId } = useFetchId("http://localhost:5000/pedidos",params.id)
    const { data,isLoading,error } = useFetch("http://localhost:5000/platos")
    const { updateData } = useUpdateInfo({
        url: "http://localhost:5000/pedidos",
        id: params.id,
        urlPut: `http://localhost:5000/pedidos/${params.id}`
    })
    const {name,description,date,putDates,dataOrder,setDataOrder} = useDataForm({
        name:'',
        description: '',
        date: ''
    })
    
    const order = getStorage("Order");

    const closeOperation = ()=> {
        order.idOrder = ''
        localStorage.setItem("Order",JSON.stringify(order));
        setShowInfo(false)
    }

    const setPlate = async(evt,itemCategory)=> {
        evt.preventDefault()

        order.categoria = itemCategory
        order.id = uuid()

        const { data,error } = await fetchPost("http://localhost:5000/platos",order);
        
        if(!error) {
            setAllPlates([...allPlates,data]);
        } else {
            console.log("Hubo un error.")
        }

        setPopupCategories(false)
        closeOperation()
    }

    const getPlates = ()=> {
        if (!error) {
            const arrayElements = data.filter(item => item.idOrder === params.id)
            arrayElements.sort((a, b) => {
                if (a.categoria === 'Plato principal') {
                    return -1
                }
                if (b.categoria === 'Plato secundario') {
                    return 0
                }
                if (a.categoria === 'Postre') {
                    return 1
                }
            })
            setAllPlates(arrayElements)
        }
        else {
            console.log("No se pudieron resivir los platos.")
        }
    }

    const getValues = ()=> {
        let sum = 0
        let cantProds = 0
        allPlates.forEach((item)=> {
            sum += parseInt(item.price)
            cantProds += 1
        })
        setPrice(sum)
        setCantProducts(cantProds)
    }

    const deleteOrder = async()=> {
        allPlates.forEach(async(item)=> {
            const { error } = await fetchDelete(`http://localhost:5000/platos/${item.id}`)

            if(!error) {
                const { error } = await fetchDelete(`http://localhost:5000/pedidos/${params.id}`)
                if(error) return console.log("Hubo un error.")
            } else {
                return console.log(`Hubo un error en el item: ${item.id}`)
            }
        })
    }

    const hideForm = (evt)=> {
        if(evt.key == "Escape") {
            setShowName(false)
            setDescription(false)
            setDate(false)
            setDataOrder({...dataOrder,
                name:'',
                description: ''
            })
        }
    }

    useEffect(()=> {
        if(errorId) {
            console.log("Ha ocurrido un error.")
        }
        getPlates()
    },[data])

    useEffect(()=> {
        getValues()
    },[getValues])

    return (
        <>
            <div className="w-[110%] h-[550px] bg-[#76ed78] rounded-b-[50%] top-[-100px] left-[-5%] absolute z-0"></div>
            <div className="z-20 p-28 pt-14 relative">
                <div className='w-full flex flex-col items-center'>
                    <div className={`${params.id === order.idOrder && showInfo ? 'w-[$610px]' : 'w-full'}`}>
                        <DicamicInputText
                            show={showName} 
                            ifShow={params.id === order.idOrder && showInfo}
                            loading={isLoadingId} 
                            value={dataId.name} 
                            clickEdit={()=> setShowName(true)}
                            submit={updateData} 
                            hidde={hideForm} 
                            inputName="name"
                            inputValue={name}
                            putValues={putDates} 
                            clickDelete={()=> {setShowName(false); setDataOrder({...dataOrder,name:''})}}
                        />
                        <h3>
                            {session?.user.name == undefined ? 
                            'Loading...' :  
                            session?.user.name + ' ' + session?.user.lastName}
                        </h3>

                        <div className={`flex w-full justify-center flex-col mt-10
                        ${params.id === order.idOrder && showInfo  ? '' : 'hidden' }`}>
                            <PlatePresentation />
                            <div className='flex justify-between mt-14'>
                                <Button 
                                    textContent="Añadir al pedido"
                                    bgColor="#3ea440"
                                    bgColorHover="#348935"
                                    width='45%'
                                    textColor='white'
                                    handleClick={()=> setPopupCategories(true)}
                                />

                                <Button 
                                    textContent="Cancelar operación"
                                    bgColor="white"
                                    bgColorHover="rgb(252 165 165)"
                                    width='45%'
                                    textColor='black'
                                    handleClick={closeOperation}
                                />
                            </div>
                        </div>
                    </div>

                    <div className="flex w-full pt-14 flex-col">
                        <h2 className="text-xl">Detalles del pedido</h2>
                        <div className='flex'>
                            <div className='max-w-[50%] mr-14'>
                                <DinamicTextArea 
                                    show={showDescription}
                                    value={dataId.description}
                                    clickEdit={() => setDescription(true)}
                                    hidde={hideForm}
                                    areaName="description"
                                    areaValue={description}
                                    putValues={putDates}
                                    submit={updateData}
                                    clickDelete={()=> {setDescription(false); setDataOrder({...dataOrder,description:''})}}
                                />
                            </div>
                            <div>
                                <DinamicInputDate 
                                    show={showDate}
                                    clickEdit={() => setDate(true)}
                                    value={dataId.date?.day + '/' + dataId.date?.month + '/' + dataId.date?.year + ' - ' +
                                    dataId.date?.hours + ':' + dataId.date?.minutes}
                                    submit={updateData}
                                    hidde={hideForm}
                                    inputDateName="date"
                                    inputDateValue={date}
                                    putValues={putDates}
                                    clickDelete={()=> setDate(false)}
                                />
                            </div>
                        </div>
                        <h2 className='text-xl mt-4'>Platos del pedido</h2>
                        <div className="grid grid-cols-3 gap-14 mt-9">
                            {
                                isLoading ?
                                'Loading...' :
                                allPlates.map((item) => (
                                    <Plate 
                                        key={item.id}
                                        nombre={item.nombre} 
                                        precio={item.price} 
                                        categoria={item.categoria}
                                        imagen={item.imagen}
                                        id={item.id}
                                    />
                                ))
                            }

                            <button className="flex p-4 bg-white shadow-[0_0_10px_#a9a9a9] rounded-xl"
                            onClick={()=> {
                                router.push('/')
                            }}>
                                <div className="flex w-[40%] flex-col justify-between">
                                    <h3>Añadir Articulo</h3>
                                </div>
                                
                                <div className='flex w-[60%] h-[120px] relative justify-center'>
                                    <AiOutlinePlus className='w-full h-full text-[#a3a3a3]' />
                                </div>
                            </button>
                        </div>
                    </div>
                </div>

                <div className='flex mt-14'>
                    <div className='flex'>
                        <h2>Cantidad de productos:</h2><h2 className='text-[#3da443] ml-2'>{cantProducts}</h2>
                    </div>
                    <div className='flex ml-14'>
                        <h2>Valor del pedido:</h2><h2 className='text-[#3da443] ml-2'>${price}</h2>
                    </div>
                </div>

                <div className='flex'>
                    <div className='my-14 mr-4'>
                        <button className="bg-[#3ea440] transition duration-[0.3s] hover:bg-[#348935]
                            w-[100%] p-1 px-10 text-lg rounded-full shadow-[0_2px_4px_#a9a9a9] text-white"
                            onClick={() => {
                                alert("Tu pedido sera enviado, muchas gracias por comprar!")
                                router.push("/")
                                closeOperation()
                                deleteOrder()
                            }}>
                            Enviar pedido
                        </button>
                    </div>

                    <div className='my-14 ml-4'>
                        <button className="bg-red-300 transition duration-[0.3s] hover:bg-red-400
                            w-[100%] p-1 px-10 text-lg rounded-full shadow-[0_2px_4px_#a9a9a9] text-black"
                            onClick={()=> {
                                closeOperation()
                                deleteOrder()
                                router.push("/user-pedidos")
                            }}>
                            Eliminar
                        </button>
                    </div>
                </div>
            </div>

            <div className={`fixed top-0 lef-0 w-full h-full ${showPopupCategories ? '' : 'hidden'} flex
            justify-center items-center backdrop-blur-[2px] transition z-50`}>
                <button className="z-50 absolute top-0 right-0 m-10 p-4 bg-red-600 text-white rounded-xl"
                onClick={() => setPopupCategories(false)}>
                    X
                </button>

                <button className={`z-50 w-52 h-52 p-2 m-10 bg-white shadow-[0_0_20px_#a9a9a9] rounded-2xl hover:scale-105
                transition`} onClick={(evt)=> setPlate(evt,"Plato principal")}>
                    Plato principal
                </button>

                <button className={`z-50 w-52 h-52 p-2 m-10 bg-white shadow-[0_0_20px_#a9a9a9] rounded-2xl hover:scale-105
                transition`} onClick={(evt)=> setPlate(evt,"Plato secundario")}>
                    Plato secundario
                </button>

                <button className={`z-50 w-52 h-52 p-2 m-10 bg-white shadow-[0_0_20px_#a9a9a9] rounded-2xl hover:scale-105
                transition`} onClick={(evt)=> setPlate(evt,"Bebida")}>
                    Bebida
                </button>

                <button className={`z-50 w-52 h-52 p-2 m-10 bg-white shadow-[0_0_20px_#a9a9a9] rounded-2xl hover:scale-105
                transition`} onClick={(evt)=> setPlate(evt,"Postre")}>
                    Postre
                </button>

                <div className="w-full h-full absolute z-0" onClick={()=> setPopupCategories(false)}></div>
            </div>
        </>
    )
}
