"use client"

import { useEffect, useState } from "react";

export default function FetchTesting() {
    const [data,setData] = useState({})

    const fetching = async()=> {
        // evt.preventDefault();

        try {
            const response = await fetch("http://localhost:5000/pedidos",{
                method: 'POST',
                headers: {"content-type":"application/json"},
                body: JSON.stringify({
                    nombre:"Deimer"
                })
            }).then(res => res.json());
            setData(response);
        } catch(err) {
            console.log(err);
        }
    }

    const callFetch = async() => {
        fetching();
    }

    useEffect(()=> {
        fetching()
    },[])

    return (
        <>
            <h2>{data.nombre}</h2>
        </>
    )
}
