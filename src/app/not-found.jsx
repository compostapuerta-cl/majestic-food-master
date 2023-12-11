import Link from 'next/link';

export default function NotFound() {
    return(
        <>
            <h2>404</h2>
            <h2>Pagina no encontrada</h2>
            <button >
                <Link className="not-found-button-styles" href="/">Volver</Link>
            </button>
        </>
    )
}
