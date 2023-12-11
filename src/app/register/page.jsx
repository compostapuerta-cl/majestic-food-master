"use client"

import { useDataForm } from '@/components/hooks/useDataForm'
import { useRouter } from 'next/navigation'
import { signIn } from 'next-auth/react'
import { useState } from 'react'
import {v4 as uuid} from 'uuid'

export default function Register() {
    const router = useRouter()
    
    const [profileImage,setProfileImage] = useState({})

    const { email,password,name,lastName,putDates } = useDataForm({
        email: '',
        password: '',
        name: '',
        lastName: ''
    })
    
    const sendUser = async(evt)=> {
        evt.preventDefault()

        const form = new FormData()
        form.set('profileImage',profileImage)

        try {
            await fetch('/api/upload',{
                method: 'POST',
                body: form
            })
        } catch(err) {
            console.error(err)
        }
        
        const dataForm = new FormData(evt.target)
        const data = Object.fromEntries(dataForm)
        const image = Object.fromEntries(form)
        data.profileImage = image.profileImage.name
        data.id = uuid()

        try {
            const dataUser = await fetch('http://localhost:5000/usuarios',{
                method: 'POST',
                headers: {'content-type':'application/json'},
                body: JSON.stringify(data)
            }).then(res => res.json());

            console.log(dataUser.email)
            
            const signin = await signIn('credentials',{
                email: dataUser.email,
                password: dataUser.password,
                redirect: false
            }) 

            if(signin?.ok) router.push('/')
        } catch(err) {
            console.error(err)
        }
    }
    
    return (
        <div className="w-full h-screen flex justify-center items-center">
            <form className="grid grid-cols-2 gap-6" onSubmit={sendUser}>
                <div className='col-span-2 flex flex-col'>
                    <label>Imagen de perfil</label>
                    <input 
                    type='file'
                    onChange={(evt)=> {
                        setProfileImage(evt.target.files[0])
                    }}></input>
                </div>
                <div className='col-span-2 flex flex-col'>
                    <label htmlFor="email">Email</label>
                    <input type="email" name="email" onChange={putDates} value={email}></input>
                </div>
                <div className='col-span-2 flex flex-col'>
                    <label  htmlFor="password">Contraseña</label>
                    <input type="password" name="password" onChange={putDates} value={password}></input>
                </div>
                <div className='flex flex-col'>
                    <label htmlFor="name">Nombre</label>
                    <input type="text" name="name" onChange={putDates} value={name}></input>
                </div>
                <div className='flex flex-col'>
                    <label htmlFor="lastName">Apellidos</label>
                    <input type="text" name="lastName" onChange={putDates} value={lastName}></input>
                </div>
                <button className="col-span-2">Crear cuenta</button>
            </form>
        </div>
    )
}
