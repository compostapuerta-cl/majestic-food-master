import fetchPut from '@/components/helpers/fetchPutData'
import fetchDataId from '@/components/helpers/fetchDataId'
import getDate from '@/components/helpers/getDate'

export function useUpdateInfo({url,id,urlPut}) {
    const updateData = async(evt)=> {
        evt.preventDefault();

        const { dataId } = await fetchDataId(url,id)

        console.log(evt.target[0].type)
        
        if(evt.target[0].type === "text" || evt.target[0].type === "textarea") {
            const newData = evt.target[0].value
            dataId[evt.target[0].name] = newData
        } else if(evt.target[0].type === "datetime-local") {
            const newData = getDate(evt.target[0].value)
            dataId[evt.target[0].name] = newData
        }

        const { error } = await fetchPut(urlPut, dataId)
        if (error) return console.log("Hubo un error al cambiar el nombre del pedido.")
    }
    
    return {
        updateData
    }
}