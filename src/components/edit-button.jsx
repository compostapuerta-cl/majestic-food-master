import { FaEdit } from 'react-icons/fa'

export default function EditButton({ onClick,textColor,hoverTextColor }) {
    return (
        <button onClick={onClick}>
            <span className={`text-${textColor} hover:text-${hoverTextColor}`}>
                <FaEdit />
            </span>
        </button>
    )
}