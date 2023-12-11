import { useState } from 'react'

export default function Button({textContent,bgColor,bgColorHover,width,textColor,handleClick}) {
    const [hover,setHover] = useState(false)
    
    const handleMouse = ()=> {
        setHover(!hover)
    }

    const backgroundColor = !hover ? `${bgColor}` : `${bgColorHover}`
    
    return (
        <button className="transition duration-[0.3s] p-2 text-xl rounded-full shadow-[0_2px_4px_#a9a9a9]"
        style={{
            width: `${width}`,
            backgroundColor: backgroundColor,
            color: `${textColor}`
        }}
        onMouseEnter={handleMouse}
        onMouseLeave={handleMouse}
        onClick={handleClick}>
            {textContent}
        </button>
    )
}