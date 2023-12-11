import { useEffect,useRef } from 'react'
import { TiDelete } from 'react-icons/ti'
import { FaCheckCircle } from 'react-icons/fa'
import EditButton from './edit-button'

export default function DinamicInputText({show,ifShow,loading,value,clickEdit,submit,hidde,inputName,inputValue,putValues,
clickDelete}) {
    const refer = useRef(null)

    useEffect(()=> {
        if(show) refer.current.focus()
    },[show])

    return (
        <>
            <div className={`flex ${show ? 'hidden' : ''}`}>
                <h2 className={`text-2xl ${ifShow ? 'w-[calc(100%-16px)]' : 'mr-4'}`}>
                    {loading ? 'Loading...' : value}
                </h2>
                <EditButton onClick={clickEdit} textColor="green-800" hoverTextColor="green-900"/>
            </div>
            <form onSubmit={submit} className={`${show ? '' : 'hidden'} flex ${ifShow ? 'justify-between' : ''}`}
            onKeyDown={hidde}>
                <input ref={refer} className={`text-2xl 
                    ${ifShow ? 'w-[calc(100%-50px)]' : ''} `}
                    name={inputName} value={inputValue}
                    onChange={putValues}
                    placeholder={value}
                    maxLength={25}
                />
                <span className='text-3xl text-red-600 hover:text-red-500 cursor-pointer' onClick={clickDelete}>
                    <TiDelete />
                </span>
                <button className='text-[20px] text-green-600 hover:text-green-500'>
                    <FaCheckCircle />
                </button>
            </form>
        </>
    )
}