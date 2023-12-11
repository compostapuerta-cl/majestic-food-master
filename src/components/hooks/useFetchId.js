"use client"

import { useState,useEffect } from 'react'
import fetchDataId from '@/components/helpers/fetchDataId'

export const useFetchId = (url,id) => {
    const [dataId,setData] = useState({})   
    const [isLoadingId,setIsLoading] = useState(true)
    const [errorId,setError] = useState(false)

    const getData = async()=> {
        const { dataId,isLoadingId,errorId } = await fetchDataId(url,id)
        setData(dataId)
        setIsLoading(isLoadingId)
        setError(errorId)
    }

    useEffect(()=> {
        getData()
    },[id])

    return {
        dataId,
        isLoadingId,
        errorId
    }
}
