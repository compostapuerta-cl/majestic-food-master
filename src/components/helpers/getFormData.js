const getDataForm = (target)=> {
    const dataForm = new FormData(target)
    const data = Object.fromEntries(dataForm)

    return data
}

export default getDataForm