// Importar la librería de React
import { useState } from 'react'

// Hook personalizado para manejar datos de formularios
export function useDataForm(order = {}) {
    // Estado para almacenar los datos del formulario mandados por prop
    const [dataOrder,setDataOrder] = useState(order);
    
    // Función que recibe el objeto "target" del input para actualizar los datos del formulario 
    const putDates = ({target})=> {
        // Saca los atributos "name" y "value" del objeto "target"
        const {name,value} = target;
        // Setea todos los elementos anteriores y el "name" y el "value" del elemento actual
        setDataOrder({
            ...dataOrder,
            [name]: value
        });
    }
    
    // Devolver los datos del formulario y la función para actualizarlos
    return {
        ...dataOrder,
        dataOrder,
        setDataOrder,
        putDates
    };
}
