export default function Popup({children,ifShow,bgColor,onClickButton,onClickBackground}) {
    return (
        <div className={`fixed flex top-0 left-0 w-full h-full ${ifShow ? '' : 'hidden'} 
            backdrop-blur-[2px] justify-center items-center z-50 bg-${bgColor}`}>
            <button
                className="absolute top-0 right-0 m-10 z-50 p-4 bg-red-600 text-white rounded-xl"
                onClick={onClickButton}>
                X
            </button>
            {children}

            <div className="w-full h-full absolute z-0" onClick={onClickBackground}></div>
        </div>
    )
}
