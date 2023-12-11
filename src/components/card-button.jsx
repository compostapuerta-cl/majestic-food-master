export default function CardButton({onClick,url,primaryText,secondaryText}) {
    return (
        <button className="z-50 w-56 h-56 m-10 shadow-[0_0_20px_#222222b4]  rounded-2xl
        hover:scale-105 transition"
        onClick={onClick}>
            <div className='w-full h-full bg-cover rounded-2xl' style={{backgroundImage: `url(${url})`}}>
                <div className='w-full h-full p-4 rounded-2xl bg-gradient-to-b from-transparent to-[#131313d0] flex flex-col items-start justify-end'>
                    <h2 className='text-[#5bcc60] text-md font-medium'>{primaryText}</h2>
                    <p className='text-xs text-white font-extralight'>{secondaryText}</p>
                </div>
            </div>
        </button>
    )
}
