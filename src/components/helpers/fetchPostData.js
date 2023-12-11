const fetchPost = async(url,body)=> {
    try {
        const data = await fetch(url,{
            method: 'POST',
            headers: {'content-type':'application/json'},
            body: JSON.stringify(body)
        }).then(res => res.json());

        return {
            data,
            isLoading: false,
            error: false
        }
    } catch(err) {
        return {
            error: true
        }
    }
}

export default fetchPost