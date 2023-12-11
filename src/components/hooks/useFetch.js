"use client"

import { useState,useEffect } from 'react'
import fetchData from '@/components/helpers/fetchData'

export const useFetch = (url) => {
    const [data,setData] = useState([])   
    const [isLoading,setIsLoading] = useState(true)
    const [error,setError] = useState(false)

    const getData = async()=> {
        const { data,isLoading,error } = await fetchData(url)
        setData(data)
        setIsLoading(isLoading)
        setError(error)
    }

    useEffect(()=> {
        getData()
    },[url])

    return {
        data,
        isLoading,
        error
    }
}