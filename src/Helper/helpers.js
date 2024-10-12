export const getCurrentDates = () => {
  
    const currYear = new Date().getFullYear()
    //January is 0
    const currMonth = new Date().getMonth()
    const month = currMonth < 9 ? `0${currMonth + 1}` : `${currMonth + 1}`
    return `${currYear}-${month}`
}