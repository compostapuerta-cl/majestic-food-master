const getStorage = (storage) => {
    const item = localStorage.getItem(storage);
    const data = JSON.parse(item);

    return data
}

export default getStorage