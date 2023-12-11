"use client"

// Importar el hook `useDataForm` para gestionar el estado del formulario
import { useDataForm } from '@/components/hooks/useDataForm'

// Importar la función `signIn` de NextAuth para realizar la autenticación
import { signIn } from 'next-auth/react'

// Importar el hook `useRouter` de Next.js para manejar la navegación
import { useRouter } from 'next/navigation'

// Importar el componente `Link` de Next.js para manejar la navegación entre páginas
import Link from 'next/link'

// Componente de página de inicio de sesión
export default function Login() {
    // Obtener el router de Next.js
    const router = useRouter()

    // Utilizar el hook `useDataForm` para gestionar el estado del formulario
    const { email,password,putDates } = useDataForm({
        email: '',
        password: ''
    })

    // Función para manejar el envío del formulario de inicio de sesión
    const sendUser = async(evt)=> {
        // Evitar el comportamiento predeterminado del formulario
        evt.preventDefault()

        // Crear un objeto FormData para obtener los datos del formulario
        const dataForm = new FormData(evt.target)

        // Realizar la autenticación mediante la función `signIn` de NextAuth
        const signin = await signIn('credentials',{
            email: dataForm.get("email"),
            password: dataForm.get("password"),
            redirect: false
        })

        // Redirigir al usuario a la página principal si la autenticación es exitosa
        if(signin.ok) return router.push('/')
    }

    // Renderizar el formulario de inicio de sesión y enlace para registrarse
    return (
        <div className="w-full h-screen flex flex-col justify-center items-center">
            <form className="grid grid-cols-2 gap-6" onSubmit={sendUser}>
                {/* Campo de entrada para el email */}
                <div className='col-span-2 flex flex-col'>
                    <label htmlFor="email">Email</label>
                    <input type="email" name="email" onChange={putDates} value={email}></input>
                </div>
                
                {/* Campo de entrada para la contraseña */}
                <div className='col-span-2 flex flex-col'>
                    <label  htmlFor="password">Contraseña</label>
                    <input type="password" name="password" onChange={putDates} value={password}></input>
                </div>

                {/* Botón para iniciar sesión */}
                <button className="col-span-2">Iniciar sesión</button>
            </form>

            {/* Enlace para registrarse */}
            <div className='flex'>
                <h4 className='mr-2'>¿Aun no tienes cuenta?</h4>
                <Link href='/register'>
                    <h4 className='text-green-700'>¡Registrate!</h4>
                </Link>
            </div>
        </div>
    )
}