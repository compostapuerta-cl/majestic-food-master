import { useRef,useEffect } from 'react'
import { TiDelete } from 'react-icons/ti'
import { FaCheckCircle } from 'react-icons/fa'
import EditButton from '@/components/edit-button'

export default function DinamicInputDate({show,clickEdit,value,submit,hidde,inputDateName,inputDateValue,putValues,
clickDelete}) {
    const refer = useRef()
    
    useEffect(()=> {
        refer.current.focus()
    },[show])
    
    return (
        <>
            <div className='flex'>
                <h3 className='mr-2 text-green-800'>Fecha de entrega</h3>
                <EditButton onClick={clickEdit} textColor="green-800" hoverTextColor="green-900" />
            </div>
            <h3 className={`text-sm ${show ? 'hidden' : ''}`}>
                {value}
            </h3>
            <form onSubmit={submit} className={`flex ${show ? '' : 'hidden'}`} onKeyDown={hidde}>
                <input ref={refer} type="datetime-local" name={inputDateName} value={inputDateValue} onChange={putValues} />
                <span className='text-3xl text-red-600 hover:text-red-500 cursor-pointer' onClick={clickDelete}>
                    <TiDelete />
                </span>
                <button className='text-[20px] ml-[5px] text-green-600 hover:text-green-500'>
                    <FaCheckCircle />
                </button>
            </form>
        </>
    )
}