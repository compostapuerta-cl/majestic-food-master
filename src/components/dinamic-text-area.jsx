import { useRef,useEffect } from 'react'
import { FaCheckCircle } from 'react-icons/fa'
import { TiDelete } from 'react-icons/ti'
import EditButton from '@/components/edit-button'

export default function DinamicTextArea({show,value,clickEdit,hidde,areaName,areaValue,putValues,submit,clickDelete}) {
    const refer = useRef(null)
    
    useEffect(()=> {
        if(show) refer.current.focus()
    },[show])
    
    return (
        <>
            <div className='flex'>
                <h3 className='text-green-800 mr-2'>Descripción</h3>
                <EditButton onClick={clickEdit} textColor="green-800" hoverTextColor="green-900" />
            </div>
            <p className={`text-sm ${show ? 'hidden' : ''}`}>{value}</p>
            <form onSubmit={submit} className={`flex ${show ? '' : 'hidden'}`} onKeyDown={hidde}>
                <textarea ref={refer} name={areaName} value={areaValue}
                onChange={putValues} placeholder={value}></textarea>
                <div>
                    <span className='text-3xl text-red-600 hover:text-red-500 cursor-pointer' onClick={clickDelete}>
                        <TiDelete />
                    </span>
                    <button className='text-[20px] ml-[5px] text-green-600 hover:text-green-500'>
                        <FaCheckCircle />
                    </button>
                </div>
            </form>
        </>
    )
}