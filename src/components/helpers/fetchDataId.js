const fetchDataId = async(url,id)=> {
    try {
        const dataId = await fetch(`${url}/${id}`).then(res => res.json())
        return {
            dataId,
            isLoadingId: false,
            errorId: false
        }
    } catch (err) {
        return {
            errorId: true
        }
    }
}

export default fetchDataId