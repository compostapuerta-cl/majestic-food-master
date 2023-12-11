const fetchDelete = async(url)=> {
    try {
        await fetch(url,{
            method: "DELETE"
        }).then(res => res.json())

        return {
            error: false
        }
    } catch(err) {
        return {
            error: true
        }
    }
}

export default fetchDelete