// Importar la función `v4` de la librería UUID para generar identificadores únicos
import { v4 as uuid } from 'uuid'

// Importar el hook personalizado `useDataForm` para gestionar datos de formularios
import { useDataForm } from './hooks/useDataForm'

// Importar el hook `useSession` de NextAuth para obtener información de la sesión del usuario
import { useSession } from 'next-auth/react'

// Importar el hook `useRouter` de Next.js para manejar la navegación
import { useRouter } from 'next/navigation'

// Importar funciones de ayuda
import fetchPost from '@/components/helpers/fetchPostData'
import getDataForm from './helpers/getFormData'
import getStorage from './helpers/getLocalStorage'
import getDate from './helpers/getDate'

// Componente de formulario para la creación de pedidos
export default function FormPedidos() {
    // Obtener la información de la sesión del usuario
    const { data:session,status } = useSession()

    // Obtener el router de Next.js
    const router = useRouter();

    // Utilizar el hook `useDataForm` para gestionar el estado del formulario
    const {name,description,date,putDates} = useDataForm({
        name: '',
        description: '',
        date: ''
    });

    // Función para manejar el envio de los datos del formulario
    const readForm = async(evt)=> {
        // Evitar el comportamiento predeterminado del formulario
        evt.preventDefault();

        // Obtener los datos del formulario
        const allData = getDataForm(evt.target)
        // Generar un identificador único para el pedido
        allData.id = uuid();
        // Agregar el ID de usuario a los datos del formulario
        allData.idUser = session?.user.id

        // Obtener los datos almacenados en el localStorage
        const dataStorage = getStorage("Order")
        // Asignar el ID del pedido a los datos almacenados
        dataStorage.idOrder = allData.id;

        // Formatear la fecha
        allData.date = getDate(allData.date)

        // Actualizar los datos en el localStorage
        localStorage.setItem("Order",JSON.stringify(dataStorage));

        // Enviar los datos del formulario al servidor mediante una solicitud POST
        const { data,isLoading,error } = await fetchPost("http://localhost:5000/pedidos",allData)

        // Redirigir a la página del nuevo pedido en caso de éxito
        if(!error) {
            router.push(`/pedidos/${data.id}`)
        } else {
            console.log("Ha habido un error.")
        }
    }

    // Renderizar el formulario de creación de pedidos
    return (
        <form className="flex flex-col h-[90%] justify-center items-center" onSubmit={readForm}>
            <div className='flex flex-col'>
                <h1 className='self-center font-mono text-xl'>CREAR PEDIDO</h1>

                {/* Campo para el nombre del pedido */}
                <label className='m-2 ' htmlFor='nameOrder'>Nombre del pedido:</label>
                <input 
                    id="nameOrder" name="name" className="m-2 bg-zinc-100 p-2 rounded-md border-b-2 
                    focus:border-green-500 outline-none" type="text" placeholder="Nombre del pedido" 
                    value={name} onChange={putDates} 
                />

                {/* Campo para la descripción del pedido */}
                <label className='m-2' htmlFor='descriptionOrder'>Descripción</label>
                <textarea 
                    id='descriptionOrder' name='description' className='m-2 bg-zinc-100 p-2 rounded-md 
                    border-b-2 focus:border-green-500 outline-none' placeholder="Descripción" 
                    value={description} onChange={putDates}
                />

                {/* Campo para la fecha de entrega del pedido */}
                <label className='m-2' htmlFor='dateOrder'>Fecha de entrega</label>
                <input 
                    id='dateOrder' name='date' className='m-2 bg-zinc-100 p-2 rounded-md border-b-2 
                    focus:border-green-500 outline-none' type="datetime-local" value={date} onChange={putDates}
                />

                {/* Botón para enviar el formulario */}
                <button className="m-2 p-2 bg-green-500 rounded-md">
                    Crear
                </button>
            </div>
        </form>
    )
}