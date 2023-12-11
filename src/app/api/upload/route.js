import { writeFile } from 'fs/promises'
import path from 'path'

export async function POST(request) {
    const data = await request.formData()
    const file = data.get('profileImage')

    const bytes = await file.arrayBuffer()
    const buffer = Buffer.from(bytes)

    const filePath = path.join(process.cwd(),'public/assets/images',file.name)
    writeFile(filePath,buffer)
    
    return new Response(JSON.stringify("Imagen subida"))
}
