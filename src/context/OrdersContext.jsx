"use client"

import  { createContext } from 'react'

export const OrdersContext = createContext()

export const OrdersProvider = ({children})=> {
    const platos = [
        {
            name: "Hamburguesa clasica",
            image: "burguer.png",
            qualification: 4.2,
            price: "5000",
            category: [
                "plato-principal",
                "plato-secundario"
            ],
            id: 1
        },
        {
            name: "Empanada",
            image: "empanadas.webp",
            qualification: 3.2,
            price: "5000",
            category: [
                "plato-principal",
                "plato-secundario"
            ],
            id: 2
        },
        {
            name: "Coca Cola",
            image: "cocacola.png",
            qualification: 4.2,
            price: "3500",
            category: [
                "bebida"
            ],
            id: 3
        },
        {
            name: "Bandeja Paisa",
            image: "bandeja-paisa.png",
            qualification: 4.8,
            price: "18500",
            category: [
                "plato-principal"
            ],
            id: 4
        },
        {
            name: "Arroz con pollo",
            image: "arroz-con-pollo.png",
            qualification: 4.8,
            price: "15500",
            category: [
                "plato-principal"
            ],
            id: 12
        }
    ]
    
    return (
        <OrdersContext.Provider value={platos}>
            {children}
        </OrdersContext.Provider>
    )
}
