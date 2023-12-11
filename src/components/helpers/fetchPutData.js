const fetchPut = async(url,body)=> {
    try {
        await fetch(url,{
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(body)
        })

        return {
            error: false
        }
    } catch(err) {
        return {
            error: true
        }
    }
}

export default fetchPut