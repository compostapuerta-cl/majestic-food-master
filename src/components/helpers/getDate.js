const getDate = (date) => {
    const dateTarget = new Date(date)

    const dateOrder = {
        year: dateTarget.getFullYear(),
        month: dateTarget.getMonth() + 1,
        day: dateTarget.getDate(),
        hours: dateTarget.getHours(),
        minutes: dateTarget.getMinutes()
    }

    return dateOrder
}

export default getDate